import { store } from './store.js';

// --- SVG Icons Registry ---
const ICONS = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  explore: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  messageSquare: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  share: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`
};

function renderIcon(name, customClass = '') {
  const svg = ICONS[name] || '';
  if (customClass && svg) {
    return svg.replace('<svg', `<svg class="${customClass}"`);
  }
  return svg;
}

// --- Application Controller ---
class AppController {
  constructor() {
    this.currentView = 'home';
    this.activeChatUsername = null;
    this.selectedImageBase64 = null;
    this.searchQuery = '';
    this.activeProfileTab = 'posts';
    this.feedFilter = 'all';
    this.isSimulationActive = true;
    this.simulationIntervalId = null;
    
    // Elements caching
    this.dom = {};
  }

  init() {
    this.cacheElements();
    this.initTheme();
    this.bindEvents();
    this.setupStoreSubscriptions();
    
    // Initial renders
    this.renderSidebarProfile();
    this.renderFeed();
    this.renderExplore();
    this.renderNotifications();
    this.renderChatsSidebar();
    this.renderActiveChatWindow();
    this.renderWidgets();
    this.updateNotificationBadges();

    // Set initial view state
    this.navigateTo(this.currentView);
    this.startSimulation();
  }

  cacheElements() {
    // Nav links
    this.dom.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.dom.views = document.querySelectorAll('.app-view');
    
    // Sidebar User
    this.dom.sidebarAvatar = document.querySelector('.sidebar-footer .avatar');
    this.dom.sidebarName = document.querySelector('.sidebar-footer .user-name');
    this.dom.sidebarUsername = document.querySelector('.sidebar-footer .user-username');
    this.dom.themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Feed Elements
    this.dom.feedPostsContainer = document.getElementById('feed-posts-container');
    this.dom.postTextarea = document.getElementById('post-textarea');
    this.dom.postImageBtn = document.getElementById('post-image-btn');
    this.dom.postImageInput = document.getElementById('post-image-input');
    this.dom.imagePreviewContainer = document.getElementById('image-preview-container');
    this.dom.imagePreviewImg = this.dom.imagePreviewContainer.querySelector('img');
    this.dom.removePreviewBtn = document.getElementById('remove-preview-btn');
    this.dom.submitPostBtn = document.getElementById('submit-post-btn');
    
    // Feed selection filters
    this.dom.feedTabAll = document.getElementById('feed-tab-all');
    this.dom.feedTabFollowing = document.getElementById('feed-tab-following');
    this.dom.postEmojiBtn = document.getElementById('post-emoji-btn');
    this.dom.emojiPicker = document.getElementById('emoji-picker');
    this.dom.charCounter = document.getElementById('char-counter');

    // Widgets Elements
    this.dom.searchInput = document.getElementById('global-search-input');
    this.dom.trendingList = document.getElementById('trending-list');
    this.dom.followList = document.getElementById('follow-list');
    
    // Notifications Elements
    this.dom.notificationsContainer = document.getElementById('notifications-container');
    this.dom.clearNotifsBtn = document.getElementById('clear-notifs-btn');
    
    // Message Elements
    this.dom.chatsListContainer = document.getElementById('chats-list-container');
    this.dom.chatMainWindow = document.getElementById('chat-main-window');
    
    // Profile Elements
    this.dom.profileContainer = document.getElementById('profile-view-container');
    this.dom.profileEditBtn = document.getElementById('profile-edit-btn');
    
    // Settings Elements
    this.dom.settingsExportBtn = document.getElementById('settings-export-btn');
    this.dom.settingsImportTriggerBtn = document.getElementById('settings-import-trigger-btn');
    this.dom.settingsImportFile = document.getElementById('settings-import-file');
    this.dom.settingsResetBtn = document.getElementById('settings-reset-btn');
    this.dom.settingsSimToggle = document.getElementById('settings-sim-toggle');

    // Modals
    this.dom.editProfileModal = document.getElementById('edit-profile-modal');
    this.dom.editProfileForm = document.getElementById('edit-profile-form');
    this.dom.closeProfileModalBtn = document.getElementById('close-profile-modal');
    this.dom.saveProfileBtn = document.getElementById('save-profile-btn');
    this.dom.lightboxModal = document.getElementById('lightbox-modal');
    this.dom.lightboxImg = document.getElementById('lightbox-img');
    this.dom.lightboxClose = document.getElementById('lightbox-close');

    // Edit Profile Inputs
    this.dom.inputName = document.getElementById('edit-name');
    this.dom.inputBio = document.getElementById('edit-bio');
    this.dom.inputAvatarFile = document.getElementById('edit-avatar-file');
    this.dom.inputCoverFile = document.getElementById('edit-cover-file');
    
    // Toast Container
    this.dom.toastContainer = document.getElementById('toast-container');
  }

  // --- Theme Controller ---
  initTheme() {
    const savedTheme = localStorage.getItem('vibesync_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('vibesync_theme', newTheme);
    this.updateThemeButtonIcon(newTheme);
    this.showToast("Theme switched successfully!", "info");
  }

  updateThemeButtonIcon(theme) {
    if (this.dom.themeToggleBtn) {
      this.dom.themeToggleBtn.innerHTML = theme === 'dark' ? renderIcon('sun') : renderIcon('moon');
    }
  }

  // --- Router / Navigation ---
  navigateTo(viewId) {
    this.currentView = viewId;

    // Remove active class from all nav items
    this.dom.navLinks.forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-view');
      if (href === `#${viewId}` || link.getAttribute('data-view') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Toggle views visibility
    this.dom.views.forEach(view => {
      if (view.id === `${viewId}-view`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Special View Triggers
    if (viewId === 'profile') {
      this.renderProfilePage();
    } else if (viewId === 'bookmarks') {
      this.renderBookmarksView();
    } else if (viewId === 'notifications') {
      store.clearNotifications();
    }

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Event Bindings ---
  bindEvents() {
    // Navigation click handler
    this.dom.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = link.getAttribute('data-view') || link.getAttribute('href').replace('#', '');
        this.navigateTo(viewId);
      });
    });

    // Theme toggle
    if (this.dom.themeToggleBtn) {
      this.dom.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // --- Post Creator Event Listeners ---
    this.dom.postImageBtn.addEventListener('click', () => {
      this.dom.postImageInput.click();
    });

    this.dom.postImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.showToast("Image too large. Compressing file...", "info");
        }
        this.compressAndPreviewImage(file);
      }
    });

    this.dom.removePreviewBtn.addEventListener('click', () => {
      this.selectedImageBase64 = null;
      this.dom.imagePreviewContainer.style.display = 'none';
      this.dom.postImageInput.value = '';
    });

    this.dom.submitPostBtn.addEventListener('click', () => {
      const text = this.dom.postTextarea.value.trim();
      if (!text && !this.selectedImageBase64) {
        this.showToast("Cannot create an empty post!", "info");
        return;
      }
      
      if (text.length > 280) {
        this.showToast("Post is too long! Max 280 characters.", "info");
        return;
      }

      store.addPost(text, this.selectedImageBase64);
      
      // Reset inputs
      this.dom.postTextarea.value = '';
      this.selectedImageBase64 = null;
      this.dom.imagePreviewContainer.style.display = 'none';
      this.dom.postImageInput.value = '';
      this.updateCharCounter();
      this.showToast("Post shared with the world! ✨", "success");
    });

    this.dom.postTextarea.addEventListener('input', () => {
      this.updateCharCounter();
    });

    this.dom.postEmojiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = this.dom.emojiPicker.style.display === 'none';
      this.dom.emojiPicker.style.display = isHidden ? 'grid' : 'none';
    });

    this.dom.emojiPicker.querySelectorAll('.emoji-opt').forEach(emojiOpt => {
      emojiOpt.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dom.postTextarea.value += emojiOpt.textContent;
        this.dom.emojiPicker.style.display = 'none';
        this.updateCharCounter();
        this.dom.postTextarea.focus();
      });
    });

    // Close emoji picker on body click
    document.addEventListener('click', () => {
      if (this.dom.emojiPicker) {
        this.dom.emojiPicker.style.display = 'none';
      }
    });

    // --- Home Feed Tab Switchers ---
    this.dom.feedTabAll.addEventListener('click', () => {
      this.dom.feedTabAll.classList.add('active');
      this.dom.feedTabFollowing.classList.remove('active');
      this.feedFilter = 'all';
      this.renderFeed();
    });

    this.dom.feedTabFollowing.addEventListener('click', () => {
      this.dom.feedTabFollowing.classList.add('active');
      this.dom.feedTabAll.classList.remove('active');
      this.feedFilter = 'following';
      this.renderFeed();
    });

    // --- Search input listener ---
    this.dom.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderFeed();
    });

    // --- Clear notifications ---
    if (this.dom.clearNotifsBtn) {
      this.dom.clearNotifsBtn.addEventListener('click', () => {
        store.clearNotifications();
        this.showToast("Cleared all notifications", "info");
      });
    }

    // --- Lightbox Modal ---
    this.dom.lightboxClose.addEventListener('click', () => {
      this.dom.lightboxModal.classList.remove('active');
    });
    this.dom.lightboxModal.addEventListener('click', (e) => {
      if (e.target === this.dom.lightboxModal) {
        this.dom.lightboxModal.classList.remove('active');
      }
    });

    // --- Profile Editing Modals ---
    if (this.dom.profileEditBtn) {
      this.dom.profileEditBtn.addEventListener('click', () => this.openProfileModal());
    }

    this.dom.closeProfileModalBtn.addEventListener('click', () => this.closeProfileModal());
    
    this.dom.editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = this.dom.inputName.value;
      const newBio = this.dom.inputBio.value;
      
      const avatarFile = this.dom.inputAvatarFile.files[0];
      const coverFile = this.dom.inputCoverFile.files[0];

      const saveUpdates = (avatarBase64 = null, coverBase64 = null) => {
        store.updateProfile(newName, newBio, avatarBase64, coverBase64);
        this.closeProfileModal();
        this.showToast("Profile updated successfully!", "success");
      };

      // Load files if selected
      if (avatarFile || coverFile) {
        const promises = [];
        let avatarRes = null;
        let coverRes = null;

        if (avatarFile) {
          promises.push(this.fileToBase64(avatarFile).then(res => avatarRes = res));
        }
        if (coverFile) {
          promises.push(this.fileToBase64(coverFile).then(res => coverRes = res));
        }

        Promise.all(promises).then(() => {
          saveUpdates(avatarRes, coverRes);
        });
      } else {
        saveUpdates();
      }
    });

    // --- Settings Panel Event Listeners ---
    if (this.dom.settingsExportBtn) {
      this.dom.settingsExportBtn.addEventListener('click', () => {
        const dataStr = store.exportData();
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `vibesync_backup_${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        this.showToast("Backup exported successfully! 💾", "success");
      });
    }

    if (this.dom.settingsImportTriggerBtn) {
      this.dom.settingsImportTriggerBtn.addEventListener('click', () => {
        this.dom.settingsImportFile.click();
      });
    }

    if (this.dom.settingsImportFile) {
      this.dom.settingsImportFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const success = store.importData(event.target.result);
          if (success) {
            this.showToast("Data restored successfully! Reloading...", "success");
            setTimeout(() => window.location.reload(), 1500);
          } else {
            this.showToast("Invalid backup file. Could not import.", "info");
          }
        };
        reader.readAsText(file);
      });
    }

    if (this.dom.settingsResetBtn) {
      this.dom.settingsResetBtn.addEventListener('click', () => {
        if (confirm("Reset VibeSync state to initial defaults? All custom posts, edits, and chat logs will be deleted.")) {
          store.resetData();
          this.showToast("App reset successfully! Reloading...", "success");
          setTimeout(() => window.location.reload(), 1500);
        }
      });
    }

    if (this.dom.settingsSimToggle) {
      this.dom.settingsSimToggle.addEventListener('change', (e) => {
        this.isSimulationActive = e.target.checked;
        if (this.isSimulationActive) {
          this.startSimulation();
          this.showToast("Background simulation active", "success");
        } else {
          this.stopSimulation();
          this.showToast("Background simulation paused", "info");
        }
      });
    }

    // --- Post Actions Interaction via Event Delegation ---
    document.addEventListener('click', (e) => {
      // Like Toggle
      const likeBtn = e.target.closest('.like-action-btn');
      if (likeBtn) {
        const postId = likeBtn.getAttribute('data-id');
        store.likePost(postId);
        return;
      }

      // Bookmark Toggle
      const bookmarkBtn = e.target.closest('.bookmark-action-btn');
      if (bookmarkBtn) {
        const postId = bookmarkBtn.getAttribute('data-id');
        store.toggleBookmark(postId);
        return;
      }

      // Comment Toggle view drawer
      const commentToggleBtn = e.target.closest('.comment-action-btn');
      if (commentToggleBtn) {
        const postId = commentToggleBtn.getAttribute('data-id');
        const commentSection = document.getElementById(`comments-section-${postId}`);
        if (commentSection) {
          const isHidden = window.getComputedStyle(commentSection).display === 'none';
          commentSection.style.display = isHidden ? 'flex' : 'none';
        }
        return;
      }

      // Comment Add Button / Input Send
      const commentSendBtn = e.target.closest('.comment-send-btn');
      if (commentSendBtn) {
        const postId = commentSendBtn.getAttribute('data-id');
        const inputEl = document.getElementById(`comment-input-${postId}`);
        if (inputEl) {
          const content = inputEl.value.trim();
          if (content) {
            store.addComment(postId, content);
            inputEl.value = '';
          }
        }
        return;
      }

      // Share Copy Link
      const shareBtn = e.target.closest('.share-action-btn');
      if (shareBtn) {
        const postId = shareBtn.getAttribute('data-id');
        // Generate mock URL link
        const shareUrl = `${window.location.origin}/posts/${postId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          this.showToast("Post link copied to clipboard! 🔗", "info");
        }).catch(err => {
          console.error("Failed to copy link: ", err);
          this.showToast("Mock copied link: " + shareUrl, "info");
        });
        return;
      }

      // Delete Post Button
      const deleteBtn = e.target.closest('.delete-post-btn');
      if (deleteBtn) {
        const postId = deleteBtn.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this post?")) {
          store.deletePost(postId);
          this.showToast("Post deleted successfully", "info");
        }
        return;
      }

      // Expand image full screen in Lightbox
      if (e.target.closest('.post-image img')) {
        const imgSrc = e.target.src;
        this.dom.lightboxImg.src = imgSrc;
        this.dom.lightboxModal.classList.add('active');
        return;
      }

      // Profile tab toggle
      const pTab = e.target.closest('.profile-tab');
      if (pTab) {
        const tabType = pTab.getAttribute('data-tab');
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        pTab.classList.add('active');
        this.activeProfileTab = tabType;
        this.renderProfilePagePosts();
        return;
      }

      // Click trending tag search
      const trendEl = e.target.closest('.trending-item') || e.target.closest('span.hashtag');
      if (trendEl) {
        let tagText = trendEl.getAttribute('data-tag') || trendEl.textContent.trim();
        if (!tagText.startsWith('#')) {
          tagText = `#${tagText}`;
        }
        this.dom.searchInput.value = tagText;
        this.searchQuery = tagText.toLowerCase();
        this.navigateTo('home');
        this.renderFeed();
        return;
      }

      // Chat contact select
      const chatUserEl = e.target.closest('.chat-user-item');
      if (chatUserEl) {
        const username = chatUserEl.getAttribute('data-username');
        this.selectChatUser(username);
        return;
      }

      // Message send button
      const msgSendBtn = e.target.closest('#chat-send-btn');
      if (msgSendBtn) {
        const inputEl = document.getElementById('chat-text-input');
        if (inputEl && this.activeChatUsername) {
          const text = inputEl.value.trim();
          if (text) {
            store.sendMessage(this.activeChatUsername, text);
            inputEl.value = '';
          }
        }
        return;
      }

      // Mobile Chat back button
      const chatBackBtn = e.target.closest('#chat-mobile-back');
      if (chatBackBtn) {
        this.dom.chatMainWindow.classList.remove('active-mobile');
        document.querySelector('.chats-sidebar').classList.remove('hidden-mobile');
        return;
      }

      // Follow widget toggle follow
      const followBtn = e.target.closest('.btn-follow');
      if (followBtn) {
        const userId = followBtn.getAttribute('data-id');
        store.followUser(userId);
        return;
      }
    });

    // Enter press events
    document.addEventListener('keydown', (e) => {
      // Enter on Chat Input
      if (e.target.id === 'chat-text-input' && e.key === 'Enter') {
        const inputEl = e.target;
        if (inputEl.value.trim() && this.activeChatUsername) {
          store.sendMessage(this.activeChatUsername, inputEl.value.trim());
          inputEl.value = '';
        }
      }

      // Enter on Comment Inputs
      if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
        const inputEl = e.target;
        const postId = inputEl.id.replace('comment-input-', '');
        if (inputEl.value.trim()) {
          store.addComment(postId, inputEl.value.trim());
          inputEl.value = '';
        }
      }
    });
  }

  // --- Store Publish-Subscribe Handlers ---
  setupStoreSubscriptions() {
    // Global state updates
    store.subscribe('stateChanged', () => {
      this.renderSidebarProfile();
      this.renderFeed();
      this.renderExplore();
      this.renderNotifications();
      this.renderChatsSidebar();
      this.renderActiveChatWindow();
      this.renderWidgets();
      this.updateNotificationBadges();

      if (this.currentView === 'profile') {
        this.renderProfilePage();
      } else if (this.currentView === 'bookmarks') {
        this.renderBookmarksView();
      }
    });

    // Post added callback
    store.subscribe('postAdded', (newPost) => {
      this.renderFeed();
    });

    // Message sent callback
    store.subscribe('messageSent', ({ username, message }) => {
      this.renderChatsSidebar();
      this.renderActiveChatWindow();
    });

    // Message received callback (from simulated bot delay)
    store.subscribe('messageReceived', ({ username, message }) => {
      this.renderChatsSidebar();
      this.renderActiveChatWindow();
      const botUser = store.getUsers().find(u => u.username === username);
      this.showToast(`New message from ${botUser ? botUser.name : username}!`, "info");
    });
  }

  // --- Template Renders ---

  renderSidebarProfile() {
    const user = store.getCurrentUser();
    this.dom.sidebarAvatar.src = user.avatar;
    this.dom.sidebarName.textContent = user.name;
    this.dom.sidebarUsername.textContent = `@${user.username}`;
  }

  renderFeed() {
    if (this.currentView !== 'home') return;
    
    let posts = store.getPosts(this.feedFilter);

    // Apply filters
    if (this.searchQuery) {
      posts = posts.filter(post => {
        const contentMatch = post.content.toLowerCase().includes(this.searchQuery);
        const authorMatch = post.author.name.toLowerCase().includes(this.searchQuery) ||
                            post.author.username.toLowerCase().includes(this.searchQuery);
        const tagMatch = post.tags.some(t => `#${t}`.toLowerCase() === this.searchQuery || t.toLowerCase() === this.searchQuery.replace('#',''));
        return contentMatch || authorMatch || tagMatch;
      });
    }

    if (posts.length === 0) {
      this.dom.feedPostsContainer.innerHTML = `
        <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-secondary);">
          <p style="font-size: 1.1rem; font-weight: 600;">No posts found match your feed.</p>
          <p style="font-size: 0.88rem; margin-top: 8px;">Try posting a thought or updating your search query!</p>
        </div>
      `;
      return;
    }

    this.dom.feedPostsContainer.innerHTML = posts.map(post => this.generatePostCardHTML(post)).join('');
  }

  renderBookmarksView() {
    const myBookmarks = store.getCurrentUser().bookmarks;
    const bookmarkedPosts = store.getPosts().filter(p => myBookmarks.includes(p.id));
    const container = document.getElementById('bookmarks-posts-container');
    
    if (!container) return;

    if (bookmarkedPosts.length === 0) {
      container.innerHTML = `
        <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-secondary);">
          <p style="font-size: 1.1rem; font-weight: 600;">No bookmarks saved yet.</p>
          <p style="font-size: 0.88rem; margin-top: 8px;">Posts you bookmark will appear here for easy access!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarkedPosts.map(post => this.generatePostCardHTML(post)).join('');
  }

  renderExplore() {
    const postsWithImages = store.getPosts().filter(p => p.image);
    const container = document.getElementById('explore-image-grid');
    if (!container) return;

    if (postsWithImages.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-secondary);">
          <p>No media files shared yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = postsWithImages.map(post => `
      <div class="explore-image-card" data-post-id="${post.id}">
        <img src="${post.image}" alt="Explore item" loading="lazy">
        <div class="explore-image-overlay">
          <span>${renderIcon('heart', 'icon-small')} ${post.likes.length}</span>
          <span>${renderIcon('messageSquare', 'icon-small')} ${post.comments.length}</span>
        </div>
      </div>
    `).join('');
    
    // Bind click explore items to open full lightbox
    container.querySelectorAll('.explore-image-card').forEach(card => {
      card.addEventListener('click', () => {
        const postId = card.getAttribute('data-post-id');
        const post = store.getPostById(postId);
        if (post) {
          this.dom.lightboxImg.src = post.image;
          this.dom.lightboxModal.classList.add('active');
        }
      });
    });
  }

  renderNotifications() {
    const notifications = store.getNotifications();
    if (!this.dom.notificationsContainer) return;

    if (notifications.length === 0) {
      this.dom.notificationsContainer.innerHTML = `
        <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-secondary);">
          <p style="font-size: 1.1rem; font-weight: 600;">All quiet here.</p>
          <p style="font-size: 0.88rem; margin-top: 8px;">When people interact with your profile, you'll see alerts here.</p>
        </div>
      `;
      return;
    }

    this.dom.notificationsContainer.innerHTML = notifications.map(notif => {
      let icon = '';
      let desc = '';
      let extraClass = '';

      if (notif.type === 'like') {
        icon = renderIcon('heart');
        desc = `liked your post.`;
        extraClass = 'like-notif';
      } else if (notif.type === 'comment') {
        icon = renderIcon('messageSquare');
        desc = notif.text || `commented on your post.`;
        extraClass = 'comment-notif';
      } else if (notif.type === 'follow') {
        icon = renderIcon('user');
        desc = `started following you.`;
        extraClass = 'follow-notif';
      } else if (notif.type === 'message') {
        icon = renderIcon('mail');
        desc = notif.text || `sent you a message.`;
        extraClass = 'message-notif';
      }

      return `
        <div class="notification-item ${notif.read ? '' : 'unread'} ${extraClass}">
          <div class="notification-icon-wrapper">
            ${icon}
          </div>
          <img class="avatar" src="${notif.user.avatar}" alt="${notif.user.name}">
          <div class="notification-body">
            <div>
              <a href="#" class="notif-user-bold">${notif.user.name}</a>
              <span class="notification-text"> ${desc}</span>
            </div>
            <div class="notification-time">${notif.timestamp}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderChatsSidebar() {
    if (!this.dom.chatsListContainer) return;
    const users = store.getUsers();
    
    this.dom.chatsListContainer.innerHTML = users.map(user => {
      const chatMessages = store.getChatWithUser(user.username);
      const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].text : "No messages yet.";
      const activeClass = this.activeChatUsername === user.username ? 'active' : '';

      return `
        <div class="chat-user-item ${activeClass}" data-username="${user.username}">
          <img class="avatar" src="${user.avatar}" alt="${user.name}">
          <div class="chat-user-details">
            <div class="chat-user-name">${user.name}</div>
            <div class="chat-last-message">${lastMessage}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  selectChatUser(username) {
    this.activeChatUsername = username;
    this.renderChatsSidebar();
    this.renderActiveChatWindow();
    
    // Mobile responsive drawers toggle
    if (window.innerWidth <= 768) {
      this.dom.chatMainWindow.classList.add('active-mobile');
      document.querySelector('.chats-sidebar').classList.add('hidden-mobile');
    }
  }

  renderActiveChatWindow() {
    const chatContainer = document.getElementById('chat-window-container');
    if (!chatContainer) return;

    if (!this.activeChatUsername) {
      chatContainer.innerHTML = `
        <div class="chat-empty-state">
          ${renderIcon('mail')}
          <h3>Select a Conversation</h3>
          <p>Choose an active conversation from the sidebar to start writing.</p>
        </div>
      `;
      return;
    }

    const user = store.getUsers().find(u => u.username === this.activeChatUsername);
    const messages = store.getChatWithUser(this.activeChatUsername);
    const myUser = store.getCurrentUser();

    const messagesHTML = messages.map(msg => {
      const isOutgoing = msg.sender === myUser.username;
      const bubbleClass = isOutgoing ? 'outgoing' : 'incoming';
      return `
        <div class="message-bubble ${bubbleClass}">
          <div class="message-text">${msg.text}</div>
          <div class="message-time">${msg.timestamp}</div>
        </div>
      `;
    }).join('');

    chatContainer.innerHTML = `
      <div class="chat-main-window">
        <div class="chat-window-header">
          <button id="chat-mobile-back" class="chat-back-btn">
            ${renderIcon('chevronLeft')}
          </button>
          <img class="chat-window-avatar" src="${user.avatar}" alt="${user.name}">
          <div>
            <h4 style="font-weight:700;">${user.name}</h4>
            <span style="font-size:0.75rem; color:var(--success);">● Active Now</span>
          </div>
        </div>
        <div class="chat-messages-area" id="chat-messages-scroll-area">
          ${messagesHTML.length > 0 ? messagesHTML : `
            <div style="text-align:center; color:var(--text-muted); margin-top:20px; font-size:0.9rem;">
              Say hi to start the conversation! Wave 👋
            </div>
          `}
        </div>
        <div class="chat-input-area">
          <input type="text" id="chat-text-input" placeholder="Type a message..." class="chat-text-input">
          <button id="chat-send-btn" class="btn btn-primary btn-icon">
            ${renderIcon('send')}
          </button>
        </div>
      </div>
    `;

    // Auto scroll chat to bottom
    const scrollArea = document.getElementById('chat-messages-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  renderWidgets() {
    // Render Trending hashtags
    const trending = store.getTrending();
    if (this.dom.trendingList) {
      this.dom.trendingList.innerHTML = trending.slice(0, 5).map(trend => `
        <div class="trending-item" data-tag="${trend.tag}">
          <div class="trend-tag">${trend.tag}</div>
          <div class="trend-count">${trend.count.toLocaleString()} posts</div>
        </div>
      `).join('');
    }

    // Render follow list recommendations
    const users = store.getUsers().slice(0, 3);
    if (this.dom.followList) {
      this.dom.followList.innerHTML = users.map(u => {
        const followText = u.isFollowing ? 'Following' : 'Follow';
        const followClass = u.isFollowing ? 'btn-follow following' : 'btn-follow btn-primary';
        return `
          <div class="follow-item">
            <a href="#" class="follow-profile-link">
              <img class="avatar" src="${u.avatar}" alt="${u.name}">
              <div class="user-info">
                <span class="user-name">${u.name}</span>
                <span class="user-username">@${u.username}</span>
              </div>
            </a>
            <button class="btn btn-secondary ${followClass}" data-id="${u.id}">
              ${followText}
            </button>
          </div>
        `;
      }).join('');
    }
  }

  renderProfilePage() {
    const user = store.getCurrentUser();
    if (!this.dom.profileContainer) return;

    this.dom.profileContainer.innerHTML = `
      <div class="profile-card">
        <div class="profile-cover">
          <img src="${user.coverPhoto}" alt="Cover cover">
        </div>
        <div class="profile-details-wrapper">
          <img class="profile-avatar-overlap" src="${user.avatar}" alt="Avatar">
          <div class="profile-actions-row">
            <button id="profile-edit-btn" class="btn btn-secondary btn-icon" title="Edit Profile">
              ${renderIcon('edit')}
            </button>
          </div>
          <div class="profile-name-bio">
            <h2 class="profile-display-name">${user.name}</h2>
            <div class="profile-display-handle">@${user.username}</div>
            <p class="profile-bio">${user.bio}</p>
          </div>
          <div class="profile-stats-row">
            <div class="stat-item">
              <span class="stat-val">${user.postsCount}</span>
              <span class="stat-label">Posts</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">${user.followingCount}</span>
              <span class="stat-label">Following</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">${user.followersCount}</span>
              <span class="stat-label">Followers</span>
            </div>
          </div>
          <div class="profile-tabs-header">
            <div class="profile-tab ${this.activeProfileTab === 'posts' ? 'active' : ''}" data-tab="posts">My Posts</div>
            <div class="profile-tab ${this.activeProfileTab === 'bookmarks' ? 'active' : ''}" data-tab="bookmarks">Bookmarks</div>
          </div>
        </div>
      </div>
      <div id="profile-posts-list" class="posts-feed-container" style="display:flex; flex-direction:column; gap:16px; margin-top:20px;">
        <!-- Posts loaded by sub-render -->
      </div>
    `;

    // Bind edit profile modal open button again since we recreated the HTML
    const editBtn = document.getElementById('profile-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => this.openProfileModal());
    }

    this.renderProfilePagePosts();
  }

  renderProfilePagePosts() {
    const listEl = document.getElementById('profile-posts-list');
    if (!listEl) return;

    const myUsername = store.getCurrentUser().username;
    
    if (this.activeProfileTab === 'posts') {
      const myPosts = store.getPosts().filter(p => p.author.username === myUsername);
      if (myPosts.length === 0) {
        listEl.innerHTML = `
          <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-secondary);">
            <p>You haven't written any posts yet.</p>
          </div>
        `;
        return;
      }
      listEl.innerHTML = myPosts.map(post => this.generatePostCardHTML(post)).join('');
    } else {
      const myBookmarks = store.getCurrentUser().bookmarks;
      const bookmarked = store.getPosts().filter(p => myBookmarks.includes(p.id));
      if (bookmarked.length === 0) {
        listEl.innerHTML = `
          <div class="glass-panel" style="padding: 40px; text-align: center; color: var(--text-secondary);">
            <p>No bookmarked posts.</p>
          </div>
        `;
        return;
      }
      listEl.innerHTML = bookmarked.map(post => this.generatePostCardHTML(post)).join('');
    }
  }

  updateNotificationBadges() {
    const count = store.getUnreadNotificationsCount();
    const badges = document.querySelectorAll('.nav-badge, .mobile-badge');
    
    badges.forEach(badge => {
      if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  // --- Helper HTML Generators ---

  generatePostCardHTML(post) {
    const currentUser = store.getCurrentUser();
    const isLiked = post.likes.includes(currentUser.username);
    const isBookmarked = currentUser.bookmarks.includes(post.id);
    const isOwner = post.author.username === currentUser.username;

    // Convert hashtags to highlighted span links
    let formattedContent = post.content;
    const hashtagRegex = /(#[a-zA-Z0-9_]+)/g;
    formattedContent = formattedContent.replace(hashtagRegex, `<span class="hashtag">$1</span>`);

    // Generate Comments list
    const commentsListHTML = post.comments.map(c => `
      <div class="comment-item">
        <img class="avatar" style="width:32px; height:32px; cursor:pointer;" src="${c.author.avatar}" alt="${c.author.name}" class="profile-link-trigger" data-username="${c.author.username}">
        <div class="comment-content">
          <div>
            <a href="#" class="comment-author profile-link-trigger" data-username="${c.author.username}">${c.author.name}</a>
            <span class="comment-text">${c.content}</span>
          </div>
          <div class="comment-time">${c.timestamp}</div>
        </div>
      </div>
    `).join('');

    return `
      <article class="glass-panel post-card" id="post-card-${post.id}">
        <div class="post-header">
          <a href="#" class="post-author-info profile-link-trigger" data-username="${post.author.username}">
            <img class="avatar" src="${post.author.avatar}" alt="${post.author.name}">
            <div class="post-meta">
              <span class="user-name">${post.author.name}</span>
              <span class="user-username">@${post.author.username}</span>
            </div>
          </a>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="post-time">${post.timestamp}</span>
            ${isOwner ? `
              <button class="btn btn-icon delete-post-btn" data-id="${post.id}" title="Delete Post">
                ${renderIcon('trash')}
              </button>
            ` : ''}
          </div>
        </div>
        
        <div class="post-content">
          <p>${formattedContent}</p>
        </div>

        ${post.image ? `
          <div class="post-image">
            <img src="${post.image}" alt="Post attachment" loading="lazy">
          </div>
        ` : ''}

        <div class="post-footer-actions">
          <button class="action-btn like-action-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}">
            ${renderIcon('heart')}
            <span>${post.likes.length}</span>
          </button>
          
          <button class="action-btn comment-action-btn" data-id="${post.id}">
            ${renderIcon('messageSquare')}
            <span>${post.comments.length}</span>
          </button>

          <button class="action-btn bookmark-action-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${post.id}">
            ${renderIcon('bookmark')}
          </button>

          <button class="action-btn share-action-btn" style="margin-left:auto;" data-id="${post.id}">
            ${renderIcon('share')}
          </button>
        </div>

        <!-- Hidden Comment Drawer -->
        <div class="comments-container" id="comments-section-${post.id}" style="display:none;">
          <div class="comment-input-area">
            <img class="avatar" style="width:32px; height:32px;" src="${currentUser.avatar}" alt="${currentUser.name}">
            <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." class="comment-input">
            <button class="btn btn-primary comment-send-btn" data-id="${post.id}" style="padding:6px 12px; font-size:0.8rem; border-radius:12px;">Reply</button>
          </div>
          <div class="comments-list">
            ${commentsListHTML.length > 0 ? commentsListHTML : `
              <div style="text-align:center; padding:10px; color:var(--text-muted); font-size:0.8rem;">
                No comments yet. Start the conversation!
              </div>
            `}
          </div>
        </div>
      </article>
    `;
  }

  // --- Profile Modal Operations ---
  openProfileModal() {
    const user = store.getCurrentUser();
    this.dom.inputName.value = user.name;
    this.dom.inputBio.value = user.bio;
    this.dom.editProfileModal.classList.add('active');
  }

  closeProfileModal() {
    this.dom.editProfileModal.classList.remove('active');
    this.dom.inputAvatarFile.value = '';
    this.dom.inputCoverFile.value = '';
  }

  // --- Floating Toast Alerts System ---
  showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    
    let icon = renderIcon('check');
    if (type === 'info') {
      icon = renderIcon('explore'); // simple compass or other icon as placeholder
    }

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    this.dom.toastContainer.appendChild(toast);

    // Fade out and remove toast after 3 seconds
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // --- Image compression helper ---
  compressAndPreviewImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Draw image in canvas to downsize and compress
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to 0.7 jpeg quality
        this.selectedImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        // Show preview in DOM
        this.dom.imagePreviewImg.src = this.selectedImageBase64;
        this.dom.imagePreviewContainer.style.display = 'block';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 600; // Profile pics / covers don't need large widths
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = reader.result;
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  updateCharCounter() {
    if (!this.dom.postTextarea || !this.dom.charCounter) return;
    const count = this.dom.postTextarea.value.length;
    this.dom.charCounter.textContent = `${count}/280`;

    if (count > 280) {
      this.dom.charCounter.style.color = 'var(--danger)';
      this.dom.submitPostBtn.disabled = true;
      this.dom.submitPostBtn.style.opacity = '0.5';
    } else {
      this.dom.charCounter.style.color = 'var(--text-muted)';
      this.dom.submitPostBtn.disabled = false;
      this.dom.submitPostBtn.style.opacity = '1';
    }
  }

  startSimulation() {
    this.stopSimulation();
    if (!this.isSimulationActive) return;

    // Run interval to generate dynamic updates
    this.simulationIntervalId = setInterval(() => {
      const chance = Math.random();
      
      if (chance < 0.4) {
        store.generateBotPost();
        const posts = store.getPosts();
        if (posts.length > 0) {
          const newest = posts[0];
          this.showToast(`${newest.author.name} published a new post! 📝`, "info");
        }
      } else if (chance < 0.7) {
        const myPosts = store.getPosts().filter(p => p.author.username === store.getCurrentUser().username);
        if (myPosts.length > 0) {
          const randomPost = myPosts[Math.floor(Math.random() * myPosts.length)];
          const users = store.getUsers();
          const randomUser = users[Math.floor(Math.random() * users.length)];
          
          if (!randomPost.likes.includes(store.getCurrentUser().username)) {
            store.likePost(randomPost.id);
            this.showToast(`${randomUser.name} liked your post! ❤️`, "success");
          }
        }
      } else {
        const unfollowed = store.getUsers().filter(u => !u.isFollowing);
        if (unfollowed.length > 0) {
          const randomUser = unfollowed[Math.floor(Math.random() * unfollowed.length)];
          store.followUser(randomUser.id);
          this.showToast(`${randomUser.name} started following you! 👤`, "success");
        }
      }
    }, 45000);
  }

  stopSimulation() {
    if (this.simulationIntervalId) {
      clearInterval(this.simulationIntervalId);
      this.simulationIntervalId = null;
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  const controller = new AppController();
  controller.init();
});
