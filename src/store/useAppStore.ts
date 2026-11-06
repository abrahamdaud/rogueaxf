"use client";

import { create } from "zustand";
import type { Post, User, Story, Conversation, Comment } from "@/types";
import {
  posts as mockPosts,
  stories as mockStories,
  conversations as mockConversations,
} from "@/lib/mock-data";

const LOCAL_POSTS_KEY = "rogueaxf_local_posts_v1";

function loadLocalPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_POSTS_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}

function saveLocalPosts(posts: Post[]) {
  if (typeof window === "undefined") return;
  const localOnly = posts.filter((p) => p.id.startsWith("local-"));
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(localOnly.slice(0, 50)));
}

function isLocalId(id: string) {
  return id.startsWith("local-") || id.startsWith("mock-") || id.startsWith("temp-");
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showLoadingScreen: boolean;
  authChecked: boolean;
  posts: Post[];
  stories: Story[];
  conversations: Conversation[];
  feedLoading: boolean;
  feedError: string | null;
  activeTab: "home" | "explore" | "create" | "reels" | "profile" | "messages";
  isStoryViewerOpen: boolean;
  activeStoryIndex: number;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => Promise<void>;
  setLoading: (v: boolean) => void;
  setShowLoadingScreen: (v: boolean) => void;
  setActiveTab: (tab: AppState["activeTab"]) => void;
  setAuthChecked: (v: boolean) => void;
  ensureGuestUser: () => User;
  loadFeed: (opts?: { silent?: boolean }) => Promise<void>;
  loadStories: () => Promise<void>;
  addLocalPost: (post: Post) => void;
  toggleLike: (postId: string) => Promise<void>;
  toggleSave: (postId: string) => Promise<void>;
  toggleRepost: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
  openStoryViewer: (index: number) => void;
  closeStoryViewer: () => void;
  markStoryViewed: (storyId: string) => void;
  markConversationRead: (convId: string) => void;
  sendMessage: (convId: string, text: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  showLoadingScreen: true,
  authChecked: false,
  posts: [],
  stories: [],
  conversations: mockConversations,
  feedLoading: false,
  feedError: null,
  activeTab: "home",
  isStoryViewerOpen: false,
  activeStoryIndex: 0,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: (user) => set({ user, isAuthenticated: true, showLoadingScreen: false }),
  logout: async () => {
    try {
      const { clearLocalAuth } = await import("@/lib/local-auth");
      clearLocalAuth();
    } catch { /* ignore */ }
    set({ user: null, isAuthenticated: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setShowLoadingScreen: (showLoadingScreen) => set({ showLoadingScreen }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setAuthChecked: (authChecked) => set({ authChecked }),

  ensureGuestUser: () => {
    const existing = get().user;
    if (existing) return existing;
    const guest: User = {
      id: "guest-local",
      username: "tamu_rogue",
      fullName: "Tamu RogueAXF",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rogueaxf",
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      bio: "Mode tamu",
    };
    set({ user: guest, isAuthenticated: true });
    return guest;
  },

  loadFeed: async (opts) => {
    if (!opts?.silent) set({ feedLoading: true, feedError: null });
    const local = loadLocalPosts();
    const merged =
      local.length > 0
        ? local
        : mockPosts.map((p) => ({ ...p, id: p.id.startsWith("mock-") ? p.id : `mock-${p.id}` }));
    set({ posts: merged, feedLoading: false, feedError: null });
  },

  loadStories: async () => {
    set({ stories: mockStories });
  },

  addLocalPost: (post) => {
    set((state) => {
      const posts = [post, ...state.posts];
      saveLocalPosts(posts);
      return { posts };
    });
  },

  toggleLike: async (postId) => {
    set({
      posts: get().posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likesCount: p.isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            }
          : p
      ),
    });
    if (isLocalId(postId)) saveLocalPosts(get().posts);
  },

  toggleSave: async (postId) => {
    set({
      posts: get().posts.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      ),
    });
    if (isLocalId(postId)) saveLocalPosts(get().posts);
  },

  toggleRepost: async (postId) => {
    set({
      posts: get().posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              isReposted: !p.isReposted,
              sharesCount: p.isReposted
                ? Math.max(0, p.sharesCount - 1)
                : p.sharesCount + 1,
            }
          : p
      ),
    });
    if (isLocalId(postId)) saveLocalPosts(get().posts);
  },

  addComment: async (postId, text) => {
    let user = get().user;
    if (!user) user = get().ensureGuestUser();
    if (!text.trim()) return;
    const optimistic: Comment = {
      id: `temp-${Date.now()}`,
      user,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };
    set({
      posts: get().posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentsCount: p.commentsCount + 1,
              comments: [...p.comments, optimistic],
            }
          : p
      ),
    });
    if (isLocalId(postId)) saveLocalPosts(get().posts);
  },

  openStoryViewer: (index) =>
    set({ isStoryViewerOpen: true, activeStoryIndex: index }),
  closeStoryViewer: () => set({ isStoryViewerOpen: false }),
  markStoryViewed: (storyId) =>
    set((state) => ({
      stories: state.stories.map((s) =>
        s.id === storyId ? { ...s, viewed: true } : s
      ),
    })),
  markConversationRead: (convId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === convId ? { ...c, unreadCount: 0 } : c
      ),
    })),
  sendMessage: (convId, text) => {
    if (!text.trim()) return;
    const user = get().user ?? get().ensureGuestUser();
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: {
                id: `m-${Date.now()}`,
                senderId: user.id,
                text: text.trim(),
                createdAt: new Date().toISOString(),
                isRead: true,
                isOwn: true,
              },
            }
          : c
      ),
    }));
  },
}));
