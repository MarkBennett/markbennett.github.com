import { useState, useEffect } from "react";
import BlueskyComment from "./BlueskyComment";
import type { Reply, BlueskyCommentsProps } from "./types";
import { webUrlToAtUri } from "./lib";

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
