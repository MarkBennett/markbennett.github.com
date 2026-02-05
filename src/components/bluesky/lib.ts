// BlueSky utility functions

/**
 * Extract post ID from AT-URI
 * Format: at://did:plc:abc123/app.bsky.feed.post/xyz456
 */
export function extractPostId(atUri: string): string | null {
  const match = atUri.match(/app\.bsky\.feed\.post\/([^\/]+)$/);
  return match ? match[1] : null;
}

/**
 * Extract handle and post ID from BlueSky web URL
 * Format: https://bsky.app/profile/{handle}/post/{postId}
 */
export function parseBlueskyUrl(
  url: string,
): { handle: string; postId: string } | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p);

    if (
      pathParts.length !== 4 ||
      pathParts[0] !== "profile" ||
      pathParts[2] !== "post"
    ) {
      return null;
    }

    return {
      handle: pathParts[1],
      postId: pathParts[3],
    };
  } catch {
    return null;
  }
}

/**
 * Construct BlueSky profile URL from handle
 */
export function getProfileUrl(handle: string): string {
  return `https://bsky.app/profile/${handle}`;
}

/**
 * Construct BlueSky post URL from handle and AT-URI
 */
export function getPostUrl(handle: string, atUri: string): string | null {
  const postId = extractPostId(atUri);
  if (!postId) return null;
  return `https://bsky.app/profile/${handle}/post/${postId}`;
}

/**
 * Resolve a BlueSky handle to a DID (Decentralized Identifier)
 */
export async function resolveHandle(handle: string): Promise<string | null> {
  try {
    const resolveUrl = `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`;
    const response = await fetch(resolveUrl);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.did || null;
  } catch (error) {
    console.error("Error resolving handle:", error);
    return null;
  }
}

/**
 * Convert BlueSky web URL to AT-URI format
 */
export async function webUrlToAtUri(url: string): Promise<string | null> {
  const parsed = parseBlueskyUrl(url);
  if (!parsed) return null;

  const did = await resolveHandle(parsed.handle);
  if (!did) return null;

  return `at://${did}/app.bsky.feed.post/${parsed.postId}`;
}

/**
 * Format timestamp for display
 * - Recent (< 1h): "45m"
 * - Today (< 24h): "3h"
 * - This week (< 7d): "Feb 4"
 * - Older: "Feb 4, 2026"
 */
export function formatTimestamp(isoTimestamp: string): string {
  try {
    const date = new Date(isoTimestamp);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    // Less than 1 hour: "45m"
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    }

    // Less than 24 hours: "3h"
    if (diffHours < 24) {
      return `${diffHours}h`;
    }

    // Less than 7 days: "Feb 4"
    if (diffDays < 7) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
    }

    // Older: "Feb 4, 2026"
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "";
  }
}
