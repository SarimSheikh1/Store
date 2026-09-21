'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { BUSINESS_CONFIG } from '../lib/config.js';

// Create App Context
const AppContext = createContext();

// App Provider Component
export function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    isOnline: true,
    isLoading: false,
    currentUser: null,
    searchQuery: '',
    viewMode: 'grid', // 'grid' or 'list'
    currency: BUSINESS_CONFIG.currency,
    notifications: [],
    theme: 'light'
  });

  // Check online status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setAppState(prev => ({
        ...prev,
        isOnline: navigator.onLine
      }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Load user preferences from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('fourPartnersTheme');
      const savedViewMode = localStorage.getItem('fourPartnersViewMode');
      
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setAppState(prev => ({ ...prev, theme: savedTheme }));
      }
      
      if (savedViewMode && ['grid', 'list'].includes(savedViewMode)) {
        setAppState(prev => ({ ...prev, viewMode: savedViewMode }));
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('fourPartnersTheme', appState.theme);
      
      // Apply theme class to document
      document.documentElement.setAttribute('data-theme', appState.theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [appState.theme]);

  // Save view mode to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('fourPartnersViewMode', appState.viewMode);
    } catch (error) {
      console.error('Error saving view mode:', error);
    }
  }, [appState.viewMode]);

  // Update loading state
  const setLoading = (isLoading) => {
    setAppState(prev => ({
      ...prev,
      isLoading
    }));
  };

  // Update search query
  const setSearchQuery = (query) => {
    setAppState(prev => ({
      ...prev,
      searchQuery: query
    }));
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setAppState(prev => ({
      ...prev,
      viewMode: prev.viewMode === 'grid' ? 'list' : 'grid'
    }));
  };

  // Set view mode
  const setViewMode = (mode) => {
    if (['grid', 'list'].includes(mode)) {
      setAppState(prev => ({
        ...prev,
        viewMode: mode
      }));
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setAppState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  // Set theme
  const setTheme = (theme) => {
    if (['light', 'dark'].includes(theme)) {
      setAppState(prev => ({
        ...prev,
        theme
      }));
    }
  };

  // Add notification
  const addNotification = (notification) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newNotification = {
      id,
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setAppState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications]
    }));

    return id;
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setAppState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    }));
  };

  // Remove notification
  const removeNotification = (notificationId) => {
    setAppState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(
        notification => notification.id !== notificationId
      )
    }));
  };

  // Clear all notifications
  const clearNotifications = () => {
    setAppState(prev => ({
      ...prev,
      notifications: []
    }));
  };

  // Set current user (for future authentication)
  const setCurrentUser = (user) => {
    setAppState(prev => ({
      ...prev,
      currentUser: user
    }));
  };

  // Get unread notifications count
  const getUnreadNotificationsCount = () => {
    return appState.notifications.filter(n => !n.read).length;
  };

  // Business hours utilities
  const isBusinessOpen = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Simple check - assume business hours are 8 AM to 10 PM
    // In production, this would use proper time parsing
    return currentHour >= 8 && currentHour < 22;
  };

  // Format price with currency
  const formatCurrency = (amount) => {
    return `${appState.currency.symbol}${Number(amount).toLocaleString('en-PK')}`;
  };

  // Check if delivery is available
  const isDeliveryAvailable = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Delivery available during business hours
    return currentHour >= 9 && currentHour < 21;
  };

  // Context value
  const contextValue = {
    // State
    ...appState,
    
    // Actions
    setLoading,
    setSearchQuery,
    setViewMode,
    toggleViewMode,
    setTheme,
    toggleTheme,
    setCurrentUser,
    
    // Notifications
    addNotification,
    markNotificationAsRead,
    removeNotification,
    clearNotifications,
    getUnreadNotificationsCount,
    
    // Utilities
    isBusinessOpen,
    isDeliveryAvailable,
    formatCurrency,
    
    // Business config
    businessConfig: BUSINESS_CONFIG
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use App Context
export function useApp() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}