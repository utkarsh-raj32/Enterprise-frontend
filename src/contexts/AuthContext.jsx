import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [user, setUser] = useState(null);

  // In a real app, you'd decode the JWT or fetch /api/v1/auth/me here
  // For this demo, we'll extract a basic user object if a token exists
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt_token', token);
      // Mock decoding - assuming a valid token means user is logged in
      setUser({
        username: 'Admin User',
        role: 'ADMIN' // or read from decoded JWT claims
      });
    } else {
      localStorage.removeItem('jwt_token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // Connect to the Render API!
      const response = await fetch('https://enterprise-7txq.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.data && data.data.accessToken) {
        setToken(data.data.accessToken);
        return { success: true };
      } else {
        // If it's a validation error, data.data contains a map of field errors
        let errorMsg = data.message || 'Login failed';
        if (data.data && typeof data.data === 'object' && !data.data.accessToken) {
          const fieldErrors = Object.values(data.data);
          if (fieldErrors.length > 0) {
            errorMsg = fieldErrors.join(', ');
          }
        }
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      return { success: false, message: 'Network error connecting to API' };
    }
  };

  const registerUser = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch('https://enterprise-7txq.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'ADMIN' })
      });
      
      const data = await response.json();
      
      if (response.ok && data.data && data.data.accessToken) {
        setToken(data.data.accessToken);
        return { success: true };
      } else {
        // If it's a validation error, data.data contains a map of field errors
        let errorMsg = data.message || 'Registration failed';
        if (data.data && typeof data.data === 'object' && !data.data.accessToken) {
          const fieldErrors = Object.values(data.data);
          if (fieldErrors.length > 0) {
            errorMsg = fieldErrors.join(', ');
          }
        }
        return { success: false, message: errorMsg };
      }
    } catch (error) {
      return { success: false, message: 'Network error connecting to API' };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, registerUser, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
