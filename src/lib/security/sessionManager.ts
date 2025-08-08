// Advanced session management and security
interface SessionData {
  email: string;
  ip: string;
  userAgent: string;
  loginTime: number;
  lastActivity: number;
  sessionId: string;
}

interface SecuritySettings {
  maxSessionDuration: number; // 24 hours default
  inactivityTimeout: number;  // 30 minutes default
  allowMultipleSessions: boolean;
  requireReauthForSensitive: boolean;
}

const activeSessions = new Map<string, SessionData>();
const userSessions = new Map<string, Set<string>>(); // email -> set of session IDs

const DEFAULT_SETTINGS: SecuritySettings = {
  maxSessionDuration: 24 * 60 * 60 * 1000, // 24 hours
  inactivityTimeout: 30 * 60 * 1000,       // 30 minutes
  allowMultipleSessions: false,              // Only one session per user
  requireReauthForSensitive: true           // Re-auth for sensitive actions
};

// Generate secure session ID
function generateSessionId(): string {
  return crypto.randomUUID() + '-' + Date.now().toString(36);
}

// Create new session
export function createSession(email: string, ip: string, userAgent: string): string {
  const sessionId = generateSessionId();
  const now = Date.now();
  
  // Check if multiple sessions are allowed
  if (!DEFAULT_SETTINGS.allowMultipleSessions) {
    terminateAllUserSessions(email);
  }
  
  const sessionData: SessionData = {
    email,
    ip,
    userAgent,
    loginTime: now,
    lastActivity: now,
    sessionId
  };
  
  activeSessions.set(sessionId, sessionData);
  
  // Track user sessions
  if (!userSessions.has(email)) {
    userSessions.set(email, new Set());
  }
  userSessions.get(email)!.add(sessionId);
  
  return sessionId;
}

// Validate session
export function validateSession(sessionId: string, currentIP: string, currentUserAgent: string): {
  valid: boolean;
  email?: string;
  reason?: string;
  requiresReauth?: boolean;
} {
  const session = activeSessions.get(sessionId);
  
  if (!session) {
    return { valid: false, reason: 'Session not found' };
  }
  
  const now = Date.now();
  
  // Check session expiration
  if (now - session.loginTime > DEFAULT_SETTINGS.maxSessionDuration) {
    terminateSession(sessionId);
    return { valid: false, reason: 'Session expired' };
  }
  
  // Check inactivity timeout
  if (now - session.lastActivity > DEFAULT_SETTINGS.inactivityTimeout) {
    terminateSession(sessionId);
    return { valid: false, reason: 'Session timed out due to inactivity' };
  }
  
  // Check for session hijacking (IP change)
  if (session.ip !== currentIP) {
    terminateSession(sessionId);
    return { valid: false, reason: 'Suspicious activity: IP address changed' };
  }
  
  // Check for session hijacking (User Agent change)
  if (session.userAgent !== currentUserAgent) {
    terminateSession(sessionId);
    return { valid: false, reason: 'Suspicious activity: Browser/device changed' };
  }
  
  // Update last activity
  session.lastActivity = now;
  
  return { valid: true, email: session.email };
}

// Terminate specific session
export function terminateSession(sessionId: string): boolean {
  const session = activeSessions.get(sessionId);
  if (!session) return false;
  
  // Remove from user sessions
  const userSessionSet = userSessions.get(session.email);
  if (userSessionSet) {
    userSessionSet.delete(sessionId);
    if (userSessionSet.size === 0) {
      userSessions.delete(session.email);
    }
  }
  
  activeSessions.delete(sessionId);
  return true;
}

// Terminate all sessions for a user
export function terminateAllUserSessions(email: string): number {
  const userSessionSet = userSessions.get(email);
  if (!userSessionSet) return 0;
  
  let terminated = 0;
  for (const sessionId of userSessionSet) {
    if (activeSessions.delete(sessionId)) {
      terminated++;
    }
  }
  
  userSessions.delete(email);
  return terminated;
}

// Clean up expired sessions (run periodically)
export function cleanupExpiredSessions(): number {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [sessionId, session] of activeSessions.entries()) {
    const sessionAge = now - session.loginTime;
    const inactiveTime = now - session.lastActivity;
    
    if (sessionAge > DEFAULT_SETTINGS.maxSessionDuration || 
        inactiveTime > DEFAULT_SETTINGS.inactivityTimeout) {
      terminateSession(sessionId);
      cleaned++;
    }
  }
  
  return cleaned;
}

// Get active sessions for user (admin view)
export function getUserSessions(email: string): SessionData[] {
  const userSessionSet = userSessions.get(email);
  if (!userSessionSet) return [];
  
  const sessions: SessionData[] = [];
  for (const sessionId of userSessionSet) {
    const session = activeSessions.get(sessionId);
    if (session) {
      sessions.push(session);
    }
  }
  
  return sessions;
}

// Get security stats (for admin dashboard)
export function getSecurityStats() {
  return {
    activeSessions: activeSessions.size,
    activeUsers: userSessions.size,
    settings: DEFAULT_SETTINGS
  };
}

// Update security settings (admin only)
export function updateSecuritySettings(newSettings: Partial<SecuritySettings>): void {
  Object.assign(DEFAULT_SETTINGS, newSettings);
}