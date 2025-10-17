import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: Log user data changes
  useEffect(() => {
    if (user) {
      console.log('User data updated:', user);
    }
  }, [user]);

  // Debug: Log loading state changes
  useEffect(() => {
    console.log('User loading state:', loading);
  }, [loading]);

  const value = {
    user,
    setUser,
    loading,
    setLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};