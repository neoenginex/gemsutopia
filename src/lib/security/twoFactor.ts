// Two-Factor Authentication using EMAIL (FREE - no SMS costs)
interface TwoFactorCode {
  code: string;
  email: string;
  expiresAt: number;
  attempts: number;
  ip: string;
}

const pendingCodes = new Map<string, TwoFactorCode>();
const CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes
const MAX_CODE_ATTEMPTS = 3;

// Generate 6-digit verification code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate secure token for code verification
function generateCodeToken(): string {
  return crypto.randomUUID();
}

// Send verification code via email (using your existing EmailJS setup)
export async function sendVerificationCode(email: string, ip: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const code = generateCode();
    const token = generateCodeToken();
    const expiresAt = Date.now() + CODE_EXPIRY;
    
    // Store the pending code
    pendingCodes.set(token, {
      code,
      email,
      expiresAt,
      attempts: 0,
      ip
    });
    
    // Clean up expired codes
    cleanupExpiredCodes();
    
    // Send email with verification code
    await sendCodeEmail(email, code);
    
    return { success: true, token };
  } catch (error) {
    console.error('Failed to send verification code:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
}

// Verify the code entered by user
export function verifyCode(token: string, inputCode: string, ip: string): { 
  success: boolean; 
  error?: string; 
  remainingAttempts?: number;
} {
  const pendingCode = pendingCodes.get(token);
  
  if (!pendingCode) {
    return { success: false, error: 'Invalid or expired verification token' };
  }
  
  // Check expiration
  if (Date.now() > pendingCode.expiresAt) {
    pendingCodes.delete(token);
    return { success: false, error: 'Verification code expired' };
  }
  
  // Check IP (prevent token stealing)
  if (pendingCode.ip !== ip) {
    pendingCodes.delete(token);
    return { success: false, error: 'Security violation detected' };
  }
  
  // Check attempts
  if (pendingCode.attempts >= MAX_CODE_ATTEMPTS) {
    pendingCodes.delete(token);
    return { success: false, error: 'Too many failed attempts' };
  }
  
  // Verify code
  if (pendingCode.code !== inputCode.trim()) {
    pendingCode.attempts++;
    const remaining = MAX_CODE_ATTEMPTS - pendingCode.attempts;
    
    if (remaining === 0) {
      pendingCodes.delete(token);
      return { success: false, error: 'Too many failed attempts' };
    }
    
    return { 
      success: false, 
      error: `Invalid code. ${remaining} attempts remaining.`,
      remainingAttempts: remaining
    };
  }
  
  // Success! Clean up the used code
  pendingCodes.delete(token);
  
  return { success: true };
}

// Send verification code via email
async function sendCodeEmail(email: string, code: string): Promise<void> {
  // This will integrate with your existing EmailJS setup
  // For now, we'll log it (you can integrate with EmailJS later)
  
  console.log('🔐 2FA CODE EMAIL:', {
    to: email,
    code,
    subject: 'Gemsutopia Admin - Security Code',
    message: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.`
  });
  
  // TODO: Integrate with EmailJS
  // You can use the same EmailJS service you have for contact forms
}

// Clean up expired codes (run periodically)
function cleanupExpiredCodes(): void {
  const now = Date.now();
  
  for (const [token, codeData] of pendingCodes.entries()) {
    if (now > codeData.expiresAt) {
      pendingCodes.delete(token);
    }
  }
}

// Admin function: Get 2FA stats
export function getTwoFactorStats() {
  const now = Date.now();
  const active = Array.from(pendingCodes.values()).filter(code => now <= code.expiresAt);
  
  return {
    activeCodes: active.length,
    totalPendingCodes: pendingCodes.size
  };
}

// Revoke all pending codes for security (admin emergency function)
export function revokeAllCodes(): number {
  const count = pendingCodes.size;
  pendingCodes.clear();
  return count;
}