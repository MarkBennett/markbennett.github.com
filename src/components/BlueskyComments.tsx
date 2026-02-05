import { useState, useEffect } from "react";
import BlueskyComment from "./BlueskyComment";

interface Author {
  avatar?: string;
  displayName?: string;
  handle: string;
}

interface Record {
  text: string;
}

interface Post {
  author: Author;
  record: Record;
}

interface Reply {
  post?: Post;
}

interface BlueskyCommentsProps {
  postUrl: string;
}

// Convert Bluesky web URL to AT URI
async function webUrlToAtUri(url: string): Promise<string | null> {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter((p) => p);

    // Expected format: /profile/{handle}/post/{postId}
    if (
      pathParts.length !== 4 ||
      pathParts[0] !== "profile" ||
      pathParts[2] !== "post"
    ) {
      return null;
    }

    const handle = pathParts[1];
    const postId = pathParts[3];

    // Resolve handle to DID
    const resolveUrl = `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`;
    const resolveResponse = await fetch(resolveUrl);

    if (!resolveResponse.ok) {
      return null;
    }

    const resolveData = await resolveResponse.json();
    const did = resolveData.did;

    if (!did) {
      return null;
    }

    return `at://${did}/app.bsky.feed.post/${postId}`;
  } catch (e) {
    console.error("Error converting URL to AT URI:", e);
    return null;
  }
}

export default function BlueskyComments({ postUrl }: BlueskyCommentsProps) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const atUri = await webUrlToAtUri(postUrl);

        if (!atUri) {
          throw new Error("Invalid URL format");
        }

        const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(atUri)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const fetchedReplies = data.thread?.replies || [];

        setReplies(fetchedReplies);
        setLoading(false);
      } catch (err) {
        console.error("Error loading Bluesky comments:", err);
        setError(true);
        setLoading(false);
      }
    }

    loadComments();
  }, [postUrl]);

  return (
    <div className="mt-12 pt-8 border-t border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-heading">Comments</h2>

      <div className="mb-6">
        <a
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer hover:no-underline hover:text-white"
          href={postUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Reply on Bluesky
        </a>
      </div>

      <div>
        {loading && <p className="text-muted">Loading comments...</p>}

        {error && (
          <div>
            <p className="text-muted mb-4">Comments are hosted on Bluesky.</p>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View conversation on Bluesky →
            </a>
          </div>
        )}

        {!loading && !error && replies.length === 0 && (
          <p className="text-muted">
            No comments yet. Be the first to reply on Bluesky!
          </p>
        )}

        {!loading && !error && replies.length > 0 && (
          <div className="space-y-6">
            {replies.map((reply, index) => {
              const author = reply.post?.author;
              const record = reply.post?.record;

              if (!author || !record) return null;

              return (
                <BlueskyComment key={index} author={author} record={record} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
