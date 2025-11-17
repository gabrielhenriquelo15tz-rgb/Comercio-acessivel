"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  isLoggedIn: boolean;
  role: 'guest' | 'user' | 'admin';
  name: string | null;
}

interface AuthContextType {
  user: User;
  login: (email: string, role: 'user' | 'admin', name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : { isLoggedIn: false, role: 'guest', name: null };
    }
    return { isLoggedIn: false, role: 'guest', name: null };
  });

  useEffect(() => {
    // Save to localStorage whenever user state changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }, [user]);

  const login = (email: string, role: 'user' | 'admin', name: string) => {
    setUser({ isLoggedIn: true, role, name });
    // Redirect based on role after login
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    setUser({ isLoggedIn: false, role: 'guest', name: null });
    navigate('/auth'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};