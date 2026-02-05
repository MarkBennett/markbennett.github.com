// Shared BlueSky type definitions

export interface Author {
  avatar?: string;
  displayName?: string;
  handle: string;
  did?: string;
}

export interface Record {
  text: string;
  createdAt: string; // ISO 8601 timestamp
}

export interface Post {
  author: Author;
  record: Record;
  uri: string; // AT-URI format
  likeCount?: number;
  replyCount?: number;
  repostCount?: number;
}

export interface Reply {
  post?: Post;
}

export interface BlueskyCommentProps {
  author: Author;
  record: Record;
  uri: string;
  likeCount?: number;
}

export interface BlueskyCommentsProps {
  postUrl: string; // Web URL format
}
