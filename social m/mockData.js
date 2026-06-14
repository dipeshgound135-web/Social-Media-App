export const initialData = {
  currentUser: {
    name: "Alex Rivera",
    username: "alexrivera",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop",
    bio: "Senior Creative Designer & UI Architect. Building interfaces that tell stories. 🚀 Minimalist enthusiast, coffee lover, and tech explorer.",
    followingCount: 482,
    followersCount: 1258,
    postsCount: 142,
    bookmarks: ["post-2"],
    joinedDate: "Joined March 2024"
  },
  users: [
    {
      id: "user-1",
      name: "Marcus Chen",
      username: "marcus_codes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      bio: "Fullstack Engineer | Rust & TypeScript | Open Source Contributor. Let's make things scale.",
      isFollowing: true
    },
    {
      id: "user-2",
      name: "Elena Rostova",
      username: "elena_design",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      bio: "Product Designer @Figma. Obsessed with micro-interactions, dark mode aesthetics, and human-centered design.",
      isFollowing: false
    },
    {
      id: "user-3",
      name: "Leo Brooks",
      username: "leo_wild",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      bio: "Travel photographer and storyteller. Capturing quiet moments in loud cities around the globe 📸",
      isFollowing: false
    }
  ],
  posts: [
    {
      id: "post-1",
      author: {
        name: "Elena Rostova",
        username: "elena_design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
      },
      content: "Just finalized the design tokens for our new dark mode design system. The glowing borders and glassmorphism effects are starting to look absolutely stunning. What do you think about using slightly purple-tinted shadows for depth? 🟣✨ #design #uidesign #webdev #darkmode",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      likes: ["alexrivera", "marcus_codes"],
      comments: [
        {
          id: "comment-1",
          author: {
            name: "Marcus Chen",
            username: "marcus_codes",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
          },
          content: "Love the purple shadow approach. Adds a cosmic depth that pure black or grey shadows just can't match. 🌌 Let's build a component library for this!",
          timestamp: "2 hours ago"
        },
        {
          id: "comment-2",
          author: {
            name: "Alex Rivera",
            username: "alexrivera",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
          },
          content: "This is beautiful, Elena. The gradients are so smooth. I can help prototype some of these interactive buttons!",
          timestamp: "1 hour ago"
        }
      ],
      tags: ["design", "uidesign", "webdev", "darkmode"],
      timestamp: "3 hours ago"
    },
    {
      id: "post-2",
      author: {
        name: "Marcus Chen",
        username: "marcus_codes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      },
      content: "Spending my Sunday rewriting my blog's API in Rust. The speedup is mind-blowing compared to my old Node instance. 🦀 Here is my workspace setup today. Clean desk, clean code. #rustlang #developer #backend #codinglife",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      likes: ["elena_design"],
      comments: [
        {
          id: "comment-3",
          author: {
            name: "Elena Rostova",
            username: "elena_design",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
          },
          content: "That desk setup is extremely clean! Where is the desk mat from?",
          timestamp: "4 hours ago"
        }
      ],
      tags: ["rustlang", "developer", "backend", "codinglife"],
      timestamp: "5 hours ago"
    },
    {
      id: "post-3",
      author: {
        name: "Leo Brooks",
        username: "leo_wild",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
      },
      content: "Woke up at 4:30 AM to catch the morning mist rolling off the valleys of Switzerland. Worth every freezing second. 🏔️ Nature never fails to reset my creative mind. #travel #photography #mountains #inspiration",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
      likes: ["alexrivera", "elena_design", "marcus_codes"],
      comments: [],
      tags: ["travel", "photography", "mountains", "inspiration"],
      timestamp: "1 day ago"
    }
  ],
  chats: {
    "marcus_codes": [
      { sender: "marcus_codes", text: "Hey Alex! Are you attending the Web Dev meetup tomorrow?", timestamp: "Yesterday, 4:15 PM" },
      { sender: "alexrivera", text: "Hey Marcus! Yes, absolutely. Planning to catch the keynote at 10 AM.", timestamp: "Yesterday, 4:22 PM" },
      { sender: "marcus_codes", text: "Awesome, let's grab a coffee before it starts. I want to show you the new Rust server framework I am building.", timestamp: "Yesterday, 4:25 PM" },
      { sender: "alexrivera", text: "Sounds like a plan! See you there. ☕", timestamp: "Yesterday, 4:30 PM" }
    ],
    "elena_design": [
      { sender: "elena_design", text: "Hey! Loved your feedback on the dark mode post.", timestamp: "10:30 AM" },
      { sender: "alexrivera", text: "Of course! Let's schedule a call this week to review the prototype.", timestamp: "10:35 AM" },
      { sender: "elena_design", text: "Perfect! How about Thursday afternoon?", timestamp: "10:40 AM" }
    ]
  },
  trending: [
    { tag: "#rustlang", count: 1249 },
    { tag: "#uidesign", count: 843 },
    { tag: "#glassmorphism", count: 712 },
    { tag: "#ai", count: 2410 },
    { tag: "#webdev", count: 1845 }
  ],
  notifications: [
    {
      id: "notif-1",
      type: "like",
      user: {
        name: "Elena Rostova",
        username: "elena_design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
      },
      targetId: "post-3",
      timestamp: "10m ago",
      read: false
    },
    {
      id: "notif-2",
      type: "comment",
      user: {
        name: "Marcus Chen",
        username: "marcus_codes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      },
      targetId: "post-1",
      text: "commented: 'Love the purple shadow approach. Adds a cosmic depth...'",
      timestamp: "2h ago",
      read: false
    },
    {
      id: "notif-3",
      type: "follow",
      user: {
        name: "Leo Brooks",
        username: "leo_wild",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
      },
      timestamp: "1d ago",
      read: true
    }
  ]
};
