export type MediaType = "image" | "video" | "carousel";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  website?: string;
  isVerified?: boolean;
  isPrivate?: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  location?: string;
  googleDriveConnected?: boolean;
  twoFactorEnabled?: boolean;
}

export interface Story {
  id: string;
  user: User;
  media: MediaItem[];
  createdAt: string;
  viewed: boolean;
  isCloseFriend?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  user: User;
  media: MediaItem[];
  caption: string;
  hashtags: string[];
  mentions: string[];
  location?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isReposted?: boolean;
  comments: Comment[];
  createdAt: string;
  type: "post" | "reel" | "article";
  articleTitle?: string;
  articleBlocks?: ArticleBlock[];
}

export type TextAlign = "left" | "center" | "right";
export type FontWeight = "normal" | "medium" | "semibold" | "bold";

export interface ArticleBlock {
  id: string;
  type: "text" | "image" | "heading";
  content?: string;
  mediaUrl?: string;
  align?: TextAlign;
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight?: FontWeight;
  color?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  media?: MediaItem;
  createdAt: string;
  isRead: boolean;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: Message;
  unreadCount: number;
  isOnline?: boolean;
}

export interface NotificationItem {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "repost" | "story_view";
  user: User;
  post?: Post;
  text?: string;
  createdAt: string;
  isRead: boolean;
}
