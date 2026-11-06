/** Minimal Supabase types for RogueAXF — expand when schema is fully wired */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  is_verified: boolean;
  is_private: boolean;
  google_drive_connected: boolean;
  two_factor_enabled: boolean;
  phone: string | null;
  telegram_id: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
};

export type PostRow = {
  id: string;
  user_id: string;
  type: "post" | "reel" | "article";
  caption: string | null;
  location: string | null;
  article_title: string | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  views_count: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type PostMedia = {
  id: string;
  post_id: string;
  type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  text: string;
  likes_count: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string; username: string }; Update: Partial<Profile> };
      posts: { Row: PostRow; Insert: Partial<PostRow> & { user_id: string }; Update: Partial<PostRow> };
      post_media: { Row: PostMedia; Insert: Partial<PostMedia> & { post_id: string; url: string }; Update: Partial<PostMedia> };
      comments: { Row: Comment; Insert: Partial<Comment> & { post_id: string; user_id: string; text: string }; Update: Partial<Comment> };
    };
  };
};
