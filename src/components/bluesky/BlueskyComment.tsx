import type { BlueskyCommentProps } from "./types";
import { getProfileUrl, getPostUrl, formatTimestamp } from "./lib";

export default function BlueskyComment({
  author,
  record,
  uri,
  likeCount = 0,
}: BlueskyCommentProps) {
  const profileUrl = getProfileUrl(author.handle);
  const postUrl = getPostUrl(author.handle, uri);
  const formattedTime = formatTimestamp(record.createdAt);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar - clickable to profile */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.displayName || author.handle}
              className="w-10 h-10 rounded-full hover:opacity-90 transition-opacity"
            />
          )}
        </a>

        <div className="flex-1 min-w-0">
          {/* Author info */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-heading hover:underline"
            >
              {author.displayName || author.handle}
            </a>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:underline"
            >
              @{author.handle}
            </a>
            {formattedTime && (
              <>
                <span className="text-muted">·</span>
                {/* Timestamp - clickable to post */}
                {postUrl ? (
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:underline"
                    title={new Date(record.createdAt).toLocaleString()}
                  >
                    {formattedTime}
                  </a>
                ) : (
                  <span
                    className="text-sm text-muted"
                    title={new Date(record.createdAt).toLocaleString()}
                  >
                    {formattedTime}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Comment text */}
      <div className="prose prose-sm max-w-none mb-3">
        <p className="whitespace-pre-wrap">{record.text}</p>
      </div>

      {/* Engagement metrics */}
      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
        {/* Heart/Like button - clickable to post */}
        {postUrl ? (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </a>
        ) : (
          <div className="flex items-center gap-1.5 text-muted">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </div>
        )}

        {/* Link to view on BlueSky */}
        {postUrl && (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-primary ml-auto"
          >
            View on BlueSky →
          </a>
        )}
      </div>
    </div>
  );
}
