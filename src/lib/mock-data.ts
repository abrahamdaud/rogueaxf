import type { Post, Story, Conversation, NotificationItem, User } from "@/types";

const u = (id: string, username: string, name: string): User => ({
  id,
  username,
  fullName: name,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
  followersCount: 1200,
  followingCount: 340,
  postsCount: 42,
  bio: "RogueAXF creator",
  isVerified: true,
});

export const currentUser = u("u1", "abraham_daud01", "Abraham Daud");

export const posts: Post[] = [
  {
    id: "p1",
    user: currentUser,
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      },
    ],
    caption: "RogueAXF is live. #RogueAXF #startup",
    hashtags: ["rogueaxf", "startup"],
    mentions: [],
    likesCount: 128,
    commentsCount: 12,
    sharesCount: 4,
    isLiked: false,
    isSaved: false,
    comments: [],
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    type: "post",
  },
  {
    id: "p2",
    user: u("u2", "rogue_arf", "Rogue ARF"),
    media: [
      {
        id: "m2",
        type: "image",
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      },
    ],
    caption: "Building in public. Startup by Rogue — ARF",
    hashtags: ["buildinpublic"],
    mentions: [],
    likesCount: 89,
    commentsCount: 5,
    sharesCount: 2,
    isLiked: true,
    isSaved: false,
    comments: [],
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    type: "post",
  },
];

export const stories: Story[] = [
  {
    id: "s1",
    user: u("u2", "rogue_arf", "Rogue ARF"),
    media: [
      {
        id: "sm1",
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      },
    ],
    createdAt: new Date().toISOString(),
    viewed: false,
  },
  {
    id: "s2",
    user: u("u3", "designlab", "Design Lab"),
    media: [
      {
        id: "sm2",
        type: "image",
        url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80",
      },
    ],
    createdAt: new Date().toISOString(),
    viewed: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    user: u("u2", "rogue_arf", "Rogue ARF"),
    lastMessage: {
      id: "msg1",
      senderId: "u2",
      text: "Selamat datang di RogueAXF!",
      createdAt: new Date().toISOString(),
      isRead: false,
      isOwn: false,
    },
    unreadCount: 1,
    isOnline: true,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    type: "like",
    user: u("u2", "rogue_arf", "Rogue ARF"),
    post: posts[0],
    createdAt: new Date(Date.now() - 1800_000).toISOString(),
    isRead: false,
  },
  {
    id: "n2",
    type: "follow",
    user: u("u3", "designlab", "Design Lab"),
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    isRead: false,
  },
];
