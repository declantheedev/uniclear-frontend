import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';
import { useUser } from './UserContext';

// Configuration
const BASE_URL =  import.meta.env.VITE_BASE_URL
const LOGIN_ENDPOINT = '/user_profile_api/auth/token/';
const REFRESH_ENDPOINT = '/user_profile_api/auth/token/refresh/';
const USER_DASHBOARD_ENDPOINT = '/user_profile_api/dashboard/';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState(null);
  const { setUser, setLoading: setUserLoading } = useUser();

  // Check if user is authenticated
  const isAuthenticated = !!accessToken;

  // Initialize auth state from sessionStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedAccessToken = sessionStorage.getItem('accessToken');
        const storedRefreshToken = sessionStorage.getItem('refreshToken');
        
        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          // Note: We're not fetching user data here anymore to prevent premature API calls
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up refresh timer
  useEffect(() => {
    if (refreshToken) {
      // Clear existing timer
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
      
      // Set new timer to refresh token every 14 minutes (840 seconds)
      const timer = setInterval(() => {
        refreshAccessToken(refreshToken);
      }, 14 * 60 * 1000);
      
      setRefreshTimer(timer);
      
      // Clean up timer on unmount or when refreshToken changes
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [refreshToken]);

  // Fetch user data from the dashboard endpoint
  const fetchUserData = async (token) => {
    // Only fetch user data if we have a valid token
    if (!token) {
      console.log('No token provided, skipping user data fetch');
      return;
    }
    
    setUserLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${USER_DASHBOARD_ENDPOINT}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // Debug: Log user data to console when logged in
        console.log('User Data:', userData);
        
        return userData;
      } else {
        // If we get a 401, try to refresh the token
        if (response.status === 401 && refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            // Only retry if we got a new token
            if (newAccessToken) {
              // Retry the request with new token
              const retryResponse = await fetch(`${BASE_URL}${USER_DASHBOARD_ENDPOINT}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${newAccessToken}`,
                  'Content-Type': 'application/json',
                },
              });
              
              if (retryResponse.ok) {
                const userData = await retryResponse.json();
                setUser(userData);
                
                // Debug: Log user data to console when logged in
                console.log('User Data (after token refresh):', userData);
                
                return userData;
              } else {
                throw new Error('Failed to fetch user data after token refresh');
              }
            }
          } catch (refreshError) {
            console.error('Token refresh error:', refreshError);
            // If refresh fails, logout user
            logout();
            throw refreshError;
          }
        }
        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
      throw error;
    } finally {
      setUserLoading(false);
    }
  };

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access, refresh } = data;
        setAccessToken(access);
        setRefreshToken(refresh);
        
        // Store tokens in sessionStorage
        sessionStorage.setItem('accessToken', access);
        sessionStorage.setItem('refreshToken', refresh);
        
        // Fetch user data after successful login
        await fetchUserData(access);
        
        // Debug: Log successful login
        console.log('Login successful. Access token:', access);
        
        return data;
      } else {
        throw new Error(data.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    
    // Remove tokens from sessionStorage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    
    // Debug: Log logout
    console.log('User logged out');
    
    // Clear refresh timer
    if (refreshTimer) {
      clearInterval(refreshTimer);
      setRefreshTimer(null);
    }
  }, [refreshTimer]);

  // Refresh access token
  const refreshAccessToken = async (currentRefreshToken) => {
    try {
      const response = await fetch(`${BASE_URL}${REFRESH_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: currentRefreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access } = data;
        setAccessToken(access);
        sessionStorage.setItem('accessToken', access);
        
        // Debug: Log token refresh
        console.log('Token refreshed. New access token:', access);
        
        return access;
      } else {
        console.error('Token refresh failed:', data);
        // If refresh fails, logout user
        logout();
        return null;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return null;
    }
  };

  // Authenticated fetch wrapper
  const fetchWithAuth = async (url, options = {}) => {
    // Add authorization header
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    try {
      // Make the request
      let response = await fetch(url, authOptions);
      
      // If we get a 401, try to refresh the token and retry once
      if (response.status === 401 && refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          
          // Only retry if we got a new token
          if (newAccessToken) {
            // Retry the request with new token
            const retryOptions = {
              ...authOptions,
              headers: {
                ...authOptions.headers,
                'Authorization': `Bearer ${newAccessToken}`,
              },
            };
            
            response = await fetch(url, retryOptions);
          }
        } catch (refreshError) {
          // If refresh fails, logout and re-throw error
          logout();
          throw refreshError;
        }
      }
      
      return response;
    } catch (error) {
      console.error('Fetch with auth error:', error);
      throw error;
    }
  };

  // Context value
  const value = {
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAccessToken,
    fetchWithAuth,
    fetchUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};