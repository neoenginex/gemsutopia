// Rate limiter to prevent brute force attacks
interface AttemptRecord {
  attempts: number;
  firstAttempt: number;
  bannedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const BAN_DURATION = 15 * 60 * 1000; // 15 minutes
const RESET_WINDOW = 10 * 60 * 1000; // 10 minutes to reset counter

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts?: number; bannedUntil?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  // No previous attempts
  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if ban has expired
  if (record.bannedUntil && now > record.bannedUntil) {
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Currently banned
  if (record.bannedUntil && now <= record.bannedUntil) {
    return { allowed: false, bannedUntil: record.bannedUntil };
  }

  // Check if attempts should be reset (10 min window)
  if (now - record.firstAttempt > RESET_WINDOW) {
    loginAttempts.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if max attempts reached
  if (record.attempts >= MAX_ATTEMPTS) {
    record.bannedUntil = now + BAN_DURATION;
    return { allowed: false, bannedUntil: record.bannedUntil };
  }

  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - record.attempts };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    loginAttempts.set(ip, {
      attempts: 1,
      firstAttempt: now
    });
  } else {
    // Check if we should reset the window
    if (now - record.firstAttempt > RESET_WINDOW) {
      loginAttempts.set(ip, {
        attempts: 1,
        firstAttempt: now
      });
    } else {
      record.attempts++;
      if (record.attempts >= MAX_ATTEMPTS) {
        record.bannedUntil = now + BAN_DURATION;
      }
    }
  }
}

export function recordSuccessfulLogin(ip: string): void {
  // Clear failed attempts on successful login
  loginAttempts.delete(ip);
}

export function getRemainingBanTime(bannedUntil: number): number {
  return Math.max(0, bannedUntil - Date.now());
}