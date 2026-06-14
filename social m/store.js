import { initialData } from './mockData.js';

class AppStore {
  constructor() {
    this.storageKey = 'vibesync_state';
    this.state = this.loadState();
    this.listeners = {};
  }

  loadState() {
    const rawData = localStorage.getItem(this.storageKey);
    if (rawData) {
      try {
        return JSON.parse(rawData);
      } catch (e) {
        console.error("Failed to parse local storage state, resetting to mock data.", e);
      }
    }
    // Initialize and persist mock data if nothing exists
    localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    this.emit('stateChanged', this.state);
  }

  // Pub-Sub implementation for reactive UI updates
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error(`Error in event listener for ${event}:`, e);
        }
      });
    }
  }

  // Getters
  getCurrentUser() {
    return this.state.currentUser;
  }

  getPosts(filter = 'all') {
    if (filter === 'following') {
      const myUsername = this.state.currentUser.username;
      const followedUsernames = this.state.users.filter(u => u.isFollowing).map(u => u.username);
      return this.state.posts.filter(p => p.author.username === myUsername || followedUsernames.includes(p.author.username));
    }
    return this.state.posts;
  }

  getPostById(postId) {
    return this.state.posts.find(p => p.id === postId);
  }

  getUserByUsername(username) {
    if (username === this.state.currentUser.username) {
      return this.state.currentUser;
    }
    return this.state.users.find(u => u.username === username);
  }

  getUsers() {
    return this.state.users;
  }

  getTrending() {
    return this.state.trending;
  }

  getNotifications() {
    return this.state.notifications;
  }

  getUnreadNotificationsCount() {
    return this.state.notifications.filter(n => !n.read).length;
  }

  getChats() {
    return this.state.chats;
  }

  getChatWithUser(username) {
    return this.state.chats[username] || [];
  }

  // Actions
  addPost(content, image = null) {
    // Extract hashtags from content
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matchedTags = content.match(hashtagRegex) || [];
    const tags = matchedTags.map(tag => tag.substring(1).toLowerCase());

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: this.state.currentUser.name,
        username: this.state.currentUser.username,
        avatar: this.state.currentUser.avatar
      },
      content,
      image,
      likes: [],
      comments: [],
      tags,
      timestamp: "Just now"
    };

    this.state.posts.unshift(newPost);
    this.state.currentUser.postsCount += 1;

    // Update trending counts for tags
    tags.forEach(tag => {
      const hashTag = `#${tag}`;
      const trend = this.state.trending.find(t => t.tag === hashTag);
      if (trend) {
        trend.count += 1;
      } else {
        this.state.trending.push({ tag: hashTag, count: 1 });
      }
    });
    // Sort trending by count desc
    this.state.trending.sort((a, b) => b.count - a.count);

    this.save();
    this.emit('postAdded', newPost);
  }

  deletePost(postId) {
    const postIndex = this.state.posts.findIndex(p => p.id === postId);
    if (postIndex > -1) {
      const post = this.state.posts[postIndex];
      // Check if current user is owner
      if (post.author.username === this.state.currentUser.username) {
        this.state.posts.splice(postIndex, 1);
        this.state.currentUser.postsCount = Math.max(0, this.state.currentUser.postsCount - 1);
        
        // Remove from bookmarks if bookmarked
        this.state.currentUser.bookmarks = this.state.currentUser.bookmarks.filter(id => id !== postId);
        
        this.save();
      }
    }
  }

  likePost(postId) {
    const post = this.getPostById(postId);
    if (!post) return;

    const myUsername = this.state.currentUser.username;
    const index = post.likes.indexOf(myUsername);

    let isLiked = false;
    if (index === -1) {
      post.likes.push(myUsername);
      isLiked = true;

      // Create a notification for the author of the post (if it's not the current user)
      if (post.author.username !== myUsername) {
        const newNotif = {
          id: `notif-${Date.now()}`,
          type: "like",
          user: {
            name: this.state.currentUser.name,
            username: myUsername,
            avatar: this.state.currentUser.avatar
          },
          targetId: post.id,
          timestamp: "Just now",
          read: false
        };
        this.state.notifications.unshift(newNotif);
      }
    } else {
      post.likes.splice(index, 1);
    }

    this.save();
    this.emit('postLiked', { postId, likesCount: post.likes.length, isLiked });
  }

  addComment(postId, content) {
    const post = this.getPostById(postId);
    if (!post || !content.trim()) return;

    const myUsername = this.state.currentUser.username;
    const newComment = {
      id: `comment-${Date.now()}`,
      author: {
        name: this.state.currentUser.name,
        username: myUsername,
        avatar: this.state.currentUser.avatar
      },
      content: content.trim(),
      timestamp: "Just now"
    };

    post.comments.push(newComment);

    // Create a notification for the author of the post (if it's not the current user)
    if (post.author.username !== myUsername) {
      const truncatedComment = content.length > 30 ? content.substring(0, 30) + "..." : content;
      const newNotif = {
        id: `notif-${Date.now()}`,
        type: "comment",
        user: {
          name: this.state.currentUser.name,
          username: myUsername,
          avatar: this.state.currentUser.avatar
        },
        targetId: post.id,
        text: `commented: '${truncatedComment}'`,
        timestamp: "Just now",
        read: false
      };
      this.state.notifications.unshift(newNotif);
    }

    this.save();
    this.emit('commentAdded', { postId, comment: newComment, commentsCount: post.comments.length });
  }

  toggleBookmark(postId) {
    const index = this.state.currentUser.bookmarks.indexOf(postId);
    let isBookmarked = false;

    if (index === -1) {
      this.state.currentUser.bookmarks.push(postId);
      isBookmarked = true;
    } else {
      this.state.currentUser.bookmarks.splice(index, 1);
    }

    this.save();
    this.emit('bookmarkToggled', { postId, isBookmarked });
  }

  updateProfile(name, bio, avatarUrl = null, coverUrl = null) {
    const user = this.state.currentUser;
    user.name = name.trim() || user.name;
    user.bio = bio.trim() || user.bio;
    if (avatarUrl) user.avatar = avatarUrl;
    if (coverUrl) user.coverPhoto = coverUrl;

    // Update current user's details on their own posts in memory
    this.state.posts.forEach(post => {
      if (post.author.username === user.username) {
        post.author.name = user.name;
        if (avatarUrl) post.author.avatar = user.avatar;
      }
      post.comments.forEach(comment => {
        if (comment.author.username === user.username) {
          comment.author.name = user.name;
          if (avatarUrl) comment.author.avatar = user.avatar;
        }
      });
    });

    this.save();
    this.emit('profileUpdated', user);
  }

  followUser(userId) {
    const targetUser = this.state.users.find(u => u.id === userId);
    if (!targetUser) return;

    targetUser.isFollowing = !targetUser.isFollowing;

    if (targetUser.isFollowing) {
      this.state.currentUser.followingCount += 1;
      // Trigger notification from that user to currentUser (simulating reciprocity/updates)
      const newNotif = {
        id: `notif-${Date.now()}`,
        type: "follow",
        user: {
          name: targetUser.name,
          username: targetUser.username,
          avatar: targetUser.avatar
        },
        timestamp: "Just now",
        read: false
      };
      this.state.notifications.unshift(newNotif);
    } else {
      this.state.currentUser.followingCount = Math.max(0, this.state.currentUser.followingCount - 1);
    }

    this.save();
    this.emit('followToggled', { userId, isFollowing: targetUser.isFollowing, followingCount: this.state.currentUser.followingCount });
  }

  sendMessage(username, text) {
    if (!text.trim()) return;

    if (!this.state.chats[username]) {
      this.state.chats[username] = [];
    }

    const newMessage = {
      sender: this.state.currentUser.username,
      text: text.trim(),
      timestamp: this.getCurrentFormattedTime()
    };

    this.state.chats[username].push(newMessage);
    this.save();
    this.emit('messageSent', { username, message: newMessage });

    // Simulate automatic bot reply for interactive chat
    this.simulateBotReply(username);
  }

  simulateBotReply(username) {
    const targetUser = this.state.users.find(u => u.username === username);
    if (!targetUser) return;

    let botReplies = [
      `Thanks for your message! That sounds super interesting. 🚀`,
      `Oh wow, I was actually just reading about that. We should talk more!`,
      `Interesting point! Let's discuss this further in person.`
    ];

    if (username === 'marcus_codes') {
      botReplies = [
        `Absolutely! Rust's memory safety rules are tough at first, but once you get lifetime concepts down, it's amazing. 🦀`,
        `I'm currently benchmarking our query router. We managed to hit 85k requests per second! Node.js couldn't dream of this.`,
        `Haha, yes! A clean workspace is key. I'll send you the link to that mechanical keyboard later.`,
        `Are you building that in WebAssembly? We should do a quick prototype together. 🚀`
      ];
    } else if (username === 'elena_design') {
      botReplies = [
        `Thanks! I spent hours tweaking the Bezier curves on those transition springs. Design is in the details. ✨`,
        `I've been playing with CSS container queries today. They make modular designs so much easier.`,
        `Oh! The desk mat is from Grovemade, it's the wool felt one. Highly recommend it!`,
        `Let's definitely review the design tokens on Thursday. I want to try out a new neon outline concept. 🟣`
      ];
    } else if (username === 'leo_wild') {
      botReplies = [
        `Switzerland is surreal. You have to visit Lauterbrunnen at least once in your life. 🏔️`,
        `Exactly. Whenever I get developer burnout, I pack a camera bag and head to the hills. Clear air, clear head.`,
        `I'm using a mirrorless Sony a7R V for these landscape shots. The dynamic range is perfect for sunrises.`,
        `Heading to Norway next month to chase the Northern Lights! Want to join the photo trip? 🌌`
      ];
    }

    const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];

    setTimeout(() => {
      const replyMessage = {
        sender: username,
        text: randomReply,
        timestamp: this.getCurrentFormattedTime()
      };

      if (!this.state.chats[username]) {
        this.state.chats[username] = [];
      }

      this.state.chats[username].push(replyMessage);
      this.save();
      this.emit('messageReceived', { username, message: replyMessage });

      // Add to notifications as direct message count badge triggers
      const newNotif = {
        id: `notif-${Date.now()}`,
        type: "message",
        user: {
          name: targetUser.name,
          username: targetUser.username,
          avatar: targetUser.avatar
        },
        text: `sent you a message: "${randomReply.substring(0, 25)}..."`,
        timestamp: "Just now",
        read: false
      };
      this.state.notifications.unshift(newNotif);
      this.save();
      this.emit('notificationReceived', newNotif);
    }, 1500);
  }

  generateBotPost() {
    const bots = [
      {
        name: "Marcus Chen",
        username: "marcus_codes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        posts: [
          { content: "Just open-sourced my new Rust-based routing engine! Tested it on high loads and memory footprint is practically zero. 🦀 Check out the repo. #rustlang #opensource #webdev", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80" },
          { content: "Mechanical keyboard lubing day. Linear switches, brass plate, double-shot keycaps. Typing sounds like rain. ⌨️🌧️ #desksetup #developer #keebs", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80" }
        ]
      },
      {
        name: "Elena Rostova",
        username: "elena_design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        posts: [
          { content: "Redesigning a landing page with a retro-futuristic cyberpunk grid layout. Neon pink borders and dark glass panels. 🌌 What's your take on grids in modern landing headers? #design #webdev #cyberpunk", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80" },
          { content: "Micro-interactions make or break a product. Even a simple checkbox click should feel tactile and satisfying. ✨ Here's a preview of my upcoming animation package. #uidesign #css #animation", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80" }
        ]
      },
      {
        name: "Leo Brooks",
        username: "leo_wild",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        posts: [
          { content: "Standing above the clouds in the Dolomites at dawn. The peak glowing orange. Magic is real if you wake up early enough. 🌄✈️ #travel #adventure #photography #dolomites", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" },
          { content: "Narrow streets, blue shutters, and the smell of fresh baguettes. Guess the city? 🇫🇷🥐 Hint: it's not Paris. #wanderlust #france #travelgram #streetphotography", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80" }
        ]
      }
    ];

    const randomBot = bots[Math.floor(Math.random() * bots.length)];
    const randomContentObj = randomBot.posts[Math.floor(Math.random() * randomBot.posts.length)];
    
    // Check if post already exists in feed
    if (this.state.posts.some(p => p.content === randomContentObj.content)) {
      return;
    }

    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matchedTags = randomContentObj.content.match(hashtagRegex) || [];
    const tags = matchedTags.map(tag => tag.substring(1).toLowerCase());

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: randomBot.name,
        username: randomBot.username,
        avatar: randomBot.avatar
      },
      content: randomContentObj.content,
      image: randomContentObj.image,
      likes: [],
      comments: [],
      tags,
      timestamp: "Just now"
    };

    this.state.posts.unshift(newPost);

    // Update trending counts for tags
    tags.forEach(tag => {
      const hashTag = `#${tag}`;
      const trend = this.state.trending.find(t => t.tag === hashTag);
      if (trend) {
        trend.count += 1;
      } else {
        this.state.trending.push({ tag: hashTag, count: 1 });
      }
    });
    this.state.trending.sort((a, b) => b.count - a.count);

    // Trigger notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: "comment",
      user: {
        name: randomBot.name,
        username: randomBot.username,
        avatar: randomBot.avatar
      },
      targetId: newPost.id,
      text: `published a new post: "${newPost.content.substring(0, 30)}..."`,
      timestamp: "Just now",
      read: false
    };
    this.state.notifications.unshift(newNotif);

    this.save();
    this.emit('botPostAdded', newPost);
  }

  resetData() {
    localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    this.state = JSON.parse(JSON.stringify(initialData));
    this.save();
  }

  exportData() {
    return JSON.stringify(this.state, null, 2);
  }

  importData(jsonData) {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.currentUser && parsed.posts && parsed.users) {
        this.state = parsed;
        this.save();
        return true;
      }
    } catch (e) {
      console.error("Failed to parse imported JSON", e);
    }
    return false;
  }

  clearNotifications() {
    this.state.notifications.forEach(n => n.read = true);
    this.save();
    this.emit('notificationsCleared');
  }

  getCurrentFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }
}

export const store = new AppStore();
