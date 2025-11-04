import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

/**
 * AuthProvider component that holds the authentication state.
 * It provides the current user's role and a function to set the role.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 */
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('admin'); // Default role is 'admin'

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 * @returns {object} The context value with role and setRole.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};