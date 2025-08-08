// Email notifications for login events (FREE - no SMS costs)
import { NextRequest } from 'next/server';


// Get IP address from request
export function getClientIP(request: NextRequest): string {
  // Try various headers for IP (works with Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || cfIP || (request as { ip?: string }).ip || 'unknown';
}

// Get basic location info from IP (free service)
async function getLocationFromIP(ip: string): Promise<string> {
  try {
    // Using free ipapi.co service (no API key needed)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    if (data.city && data.country) {
      return `${data.city}, ${data.country}`;
    }
    return data.country || 'Unknown';
  } catch (error) {
    console.error('Location lookup failed:', error);
    return 'Unknown';
  }
}

// Send email notification using EmailJS (FREE)
export async function sendLoginNotification(
  request: NextRequest,
  email: string,
  success: boolean,
  reason?: string
): Promise<void> {
  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const timestamp = new Date();
    const location = await getLocationFromIP(ip);
    

    // Send to your admin email
    
    // For now, log the event (you can integrate with EmailJS later)
    console.log('🔐 LOGIN EVENT:', {
      type: success ? 'SUCCESS' : 'FAILED',
      email,
      ip,
      location,
      userAgent: userAgent.substring(0, 100),
      timestamp: timestamp.toISOString(),
      reason
    });

    // TODO: Integrate with EmailJS to send actual emails
    // This would use your existing EmailJS setup from the contact form
    
  } catch (error) {
    console.error('Failed to send login notification:', error);
  }
}

// Check if login is from suspicious location/device
export function detectSuspiciousLogin(
  email: string,
  currentIP: string,
  currentUserAgent: string
): boolean {
  // Simple suspicious activity detection
  // In production, you'd store user login history
  
  // For now, just flag if user agent contains suspicious keywords
  const suspiciousKeywords = ['bot', 'crawler', 'spider', 'scraper'];
  const lowerUA = currentUserAgent.toLowerCase();
  
  return suspiciousKeywords.some(keyword => lowerUA.includes(keyword));
}