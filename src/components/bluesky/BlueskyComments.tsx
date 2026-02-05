import { useQuery } from "@tanstack/react-query";
import BlueskyComment from "./BlueskyComment";
import type { Reply, BlueskyCommentsProps } from "./types";
import { webUrlToAtUri } from "./lib";

// Polling interval in milliseconds (60 seconds = 1 minute)
const COMMENT_POLL_INTERVAL = 60000;

async function fetchBlueskyComments(postUrl: string): Promise<Reply[]> {
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
  return data.thread?.replies || [];
}

export default function BlueskyComments({ postUrl }: BlueskyCommentsProps) {
  const {
    data: replies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bluesky-comments", postUrl],
    queryFn: () => fetchBlueskyComments(postUrl),
    refetchInterval: COMMENT_POLL_INTERVAL, // Poll every 60 seconds (1 minute)
    refetchOnWindowFocus: true, // Refetch when tab regains focus
  });

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
        {isLoading && <p className="text-muted">Loading comments...</p>}

        {isError && (
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

        {!isLoading && !isError && replies.length === 0 && (
          <p className="text-muted">
            No comments yet. Be the first to reply on Bluesky!
          </p>
        )}

        {!isLoading && !isError && replies.length > 0 && (
          <div className="space-y-6">
            {replies.map((reply, index) => {
              const post = reply.post;

              if (!post || !post.author || !post.record) return null;

              return (
                <BlueskyComment
                  key={post.uri || index}
                  author={post.author}
                  record={post.record}
                  uri={post.uri}
                  likeCount={post.likeCount}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
