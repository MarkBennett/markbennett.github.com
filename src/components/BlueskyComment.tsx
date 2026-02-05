interface Author {
  avatar?: string;
  displayName?: string;
  handle: string;
}

interface Record {
  text: string;
}

interface BlueskyCommentProps {
  author: Author;
  record: Record;
}

export default function BlueskyComment({
  author,
  record,
}: BlueskyCommentProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start gap-3 mb-3">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.displayName || author.handle}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-heading">
            {author.displayName || author.handle}
          </div>
          <div className="text-sm text-muted">@{author.handle}</div>
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap">{record.text}</p>
      </div>
    </div>
  );
}
