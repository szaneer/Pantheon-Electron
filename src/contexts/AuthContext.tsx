import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  uid: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-sign in with generated device ID
    const autoSignIn = async () => {
      console.log('🔑 Starting auto-signin process...');
      // Check for saved user/auth or generate new
      let savedUserId = await window.electronAPI?.getStoreValue('currentUserId');
      const savedAuthKey = await window.electronAPI?.getStoreValue('authKey') || import.meta.env.VITE_AUTH_KEY;
      console.log('🔑 Retrieved from store - userId:', savedUserId, 'authKey:', savedAuthKey ? 'present' : 'missing');
      
      if (!savedUserId) {
        savedUserId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await window.electronAPI?.setStoreValue('currentUserId', savedUserId);
      }
      
      if (savedAuthKey) {
        await window.electronAPI?.setStoreValue('authKey', savedAuthKey);
      }
      
      const user = { uid: savedUserId };
      setUser(user);
      localStorage.setItem('currentUserId', savedUserId);
      
      // Initialize P2P service
      try {
        console.log('🌐 Auto-connecting to P2P network...');
        console.log('🔑 Passing to P2P service - userId:', savedUserId, 'authKey:', savedAuthKey ? `${savedAuthKey.substring(0, 5)}...` : 'undefined');
        const result = await window.electronAPI?.p2p?.setCurrentUserId(savedUserId, savedAuthKey || undefined);
        console.log('✅ Connected to P2P network, result:', result);
        
        // Check if auto-start hosting is enabled
        const autoStartHosting = await window.electronAPI?.getStoreValue('autoStartHosting');
        console.log('🚀 Auto-start hosting preference:', autoStartHosting);
        
        if (autoStartHosting) {
          console.log('🚀 Auto-starting model hosting...');
          try {
            // Wait a moment for P2P connection to stabilize
            await new Promise(resolve => setTimeout(resolve, 1000));
            await window.electronAPI?.p2p?.enableHosting();
            console.log('✅ Model hosting auto-started successfully');
          } catch (hostingError) {
            console.error('❌ Failed to auto-start hosting:', hostingError);
          }
        }
      } catch (error) {
        console.error('❌ Failed to connect to P2P network:', error);
      }
      
      setLoading(false);
    };
    
    autoSignIn();
  }, []);


  const value = {
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 