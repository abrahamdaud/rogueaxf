"use client";

import type { Post } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { formatCount, timeAgo, cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Repeat2,
} from "lucide-react";
import { useState } from "react";

export function PostCard({ post }: { post: Post }) {
  const { toggleLike, toggleSave, toggleRepost, addComment } = useAppStore();
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const media = post.media[mediaIndex] ?? post.media[0];

  return (
    <article className="border-b border-zinc-900 pb-3">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <img
          src={post.user.avatar}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{post.user.username}</p>
          {post.location && (
            <p className="truncate text-[11px] text-zinc-500">{post.location}</p>
          )}
        </div>
        <button className="text-white">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {media && (
        <div className="relative aspect-square bg-zinc-900">
          <img
            src={media.url}
            alt=""
            className="h-full w-full object-cover"
            onDoubleClick={() => toggleLike(post.id)}
          />
          {post.media.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {post.media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMediaIndex(i)}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    i === mediaIndex ? "bg-blue-500" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 px-3 pt-2">
        <button onClick={() => toggleLike(post.id)}>
          <Heart
            className={cn(
              "h-6 w-6",
              post.isLiked ? "fill-red-500 text-red-500" : "text-white"
            )}
          />
        </button>
        <button onClick={() => setShowComments((v) => !v)}>
          <MessageCircle className="h-6 w-6 -scale-x-100 text-white" />
        </button>
        <button>
          <Send className="h-6 w-6 text-white" />
        </button>
        <button onClick={() => toggleRepost(post.id)} className="ml-auto">
          <Repeat2
            className={cn(
              "h-6 w-6",
              post.isReposted ? "text-green-400" : "text-white"
            )}
          />
        </button>
        <button onClick={() => toggleSave(post.id)}>
          <Bookmark
            className={cn(
              "h-6 w-6",
              post.isSaved ? "fill-white text-white" : "text-white"
            )}
          />
        </button>
      </div>

      <div className="space-y-1 px-3 pt-2">
        <p className="text-sm font-semibold">{formatCount(post.likesCount)} suka</p>
        <p className="text-sm">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
        {post.commentsCount > 0 && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-zinc-500"
          >
            Lihat semua {post.commentsCount} komentar
          </button>
        )}
        <p className="text-[11px] uppercase text-zinc-600">
          {timeAgo(post.createdAt)}
        </p>
      </div>

      {showComments && (
        <div className="mt-2 space-y-2 border-t border-zinc-900 px-3 pt-2">
          {post.comments.map((c) => (
            <p key={c.id} className="text-sm">
              <span className="font-semibold">{c.user.username}</span> {c.text}
            </p>
          ))}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!comment.trim()) return;
              addComment(post.id, comment);
              setComment("");
            }}
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tambah komentar..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="text-sm font-semibold text-blue-400 disabled:opacity-40"
            >
              Kirim
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
