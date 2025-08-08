// IP Allowlisting for ADMIN PANEL ONLY (optional maximum security)
interface IPRule {
  ip: string;
  description: string;
  addedBy: string;
  addedAt: number;
  active: boolean;
}

// This would be stored in environment variables in production
const allowedIPs: Map<string, IPRule> = new Map();
let allowlistEnabled = false; // Disabled by default

// Initialize with admin IPs if provided in environment
function initializeAllowlist(): void {
  const adminIPs = process.env.ADMIN_ALLOWED_IPS?.split(',').filter(ip => ip.trim()) || [];
  
  adminIPs.forEach((ip, index) => {
    const cleanIP = ip.trim();
    if (cleanIP) {
      allowedIPs.set(cleanIP, {
        ip: cleanIP,
        description: `Admin IP ${index + 1} (from environment)`,
        addedBy: 'system',
        addedAt: Date.now(),
        active: true
      });
    }
  });
  
  // Only enable allowlist if IPs were actually provided (not just empty string)
  allowlistEnabled = adminIPs.length > 0;
}

// Check if IP is allowed to access admin panel
export function isIPAllowed(ip: string): boolean {
  // If allowlist is disabled, allow all IPs
  if (!allowlistEnabled) {
    return true;
  }
  
  // Check exact match
  if (allowedIPs.has(ip)) {
    const rule = allowedIPs.get(ip)!;
    return rule.active;
  }
  
  // Check for subnet matches (basic CIDR support)
  for (const [allowedIP, rule] of allowedIPs.entries()) {
    if (rule.active && isIPInSubnet(ip, allowedIP)) {
      return true;
    }
  }
  
  return false;
}

// Basic subnet checking (supports /24, /16, etc.)
function isIPInSubnet(ip: string, subnet: string): boolean {
  if (!subnet.includes('/')) {
    return ip === subnet;
  }
  
  const [networkIP, cidr] = subnet.split('/');
  const cidrBits = parseInt(cidr);
  
  // Simple IPv4 subnet checking
  const ipParts = ip.split('.').map(Number);
  const networkParts = networkIP.split('.').map(Number);
  
  const mask = (0xFFFFFFFF << (32 - cidrBits)) >>> 0;
  
  const ipInt = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
  const networkInt = (networkParts[0] << 24) + (networkParts[1] << 16) + (networkParts[2] << 8) + networkParts[3];
  
  return (ipInt & mask) === (networkInt & mask);
}

// Add IP to allowlist (admin function)
export function addIPToAllowlist(ip: string, description: string, addedBy: string): boolean {
  if (allowedIPs.has(ip)) {
    return false; // Already exists
  }
  
  allowedIPs.set(ip, {
    ip,
    description,
    addedBy,
    addedAt: Date.now(),
    active: true
  });
  
  return true;
}

// Remove IP from allowlist (admin function)
export function removeIPFromAllowlist(ip: string): boolean {
  return allowedIPs.delete(ip);
}

// Toggle IP rule active status
export function toggleIPRule(ip: string): boolean {
  const rule = allowedIPs.get(ip);
  if (!rule) return false;
  
  rule.active = !rule.active;
  return true;
}

// Get all allowlist rules (admin dashboard)
export function getAllowlistRules(): IPRule[] {
  return Array.from(allowedIPs.values());
}

// Enable/disable allowlist (admin function)
export function setAllowlistEnabled(enabled: boolean): void {
  allowlistEnabled = enabled;
}

// Check if allowlist is enabled
export function isAllowlistEnabled(): boolean {
  return allowlistEnabled;
}

// Get allowlist stats
export function getAllowlistStats() {
  const rules = Array.from(allowedIPs.values());
  return {
    enabled: allowlistEnabled,
    totalRules: rules.length,
    activeRules: rules.filter(r => r.active).length,
    inactiveRules: rules.filter(r => !r.active).length
  };
}

// Emergency function: Add current IP (if admin gets locked out)
export function addCurrentIPEmergency(ip: string, addedBy: string): void {
  addIPToAllowlist(ip, `Emergency access - ${new Date().toISOString()}`, addedBy);
  setAllowlistEnabled(true);
}

// Initialize allowlist on module load
initializeAllowlist();