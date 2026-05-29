'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { apiClient } from '@/lib/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');

        if (storedToken && storedUser) {
          try {
            const user = JSON.parse(storedUser);
            setState({
              user,
              token: storedToken,
              isLoading: false,
              error: null,
              isAuthenticated: true,
            });
          } catch (error) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            setState({
              user: null,
              token: null,
              isLoading: false,
              error: null,
              isAuthenticated: false,
            });
          }
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TESTING MODE: Accept any credentials
      // Remove this section when connecting to real backend
      const fakeUser: User = {
        id: '1',
        fullName: 'Test User',
        username: 'testuser',
        email: email,
        bio: 'This is a test account for preview purposes',
        followers: 234,
        following: 123,
        posts: 45,
      };

      const fakeToken = 'fake-jwt-token-' + Math.random().toString(36).substr(2, 9);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      localStorage.setItem('auth_token', fakeToken);
      localStorage.setItem('auth_user', JSON.stringify(fakeUser));

      setState({
        user: fakeUser,
        token: fakeToken,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });

      // UNCOMMENT BELOW WHEN YOU HAVE A REAL BACKEND:
      /*
      const response = await apiClient.login(email, password);

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Login failed');
      }

      const { user, token } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      setState({
        user,
        token,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
      */
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState({
        user: null,
        token: null,
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
      });
      throw error;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    username: string
  ) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await apiClient.register({
        fullName,
        email,
        password,
        username,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Registration failed');
      }

      const { user, token } = response.data;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));

      setState({
        user,
        token,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setState({
        user: null,
        token: null,
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
      });
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');

      setState({
        user: null,
        token: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    }
  };

  const setUser = (user: User | null) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: user !== null,
    }));
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        setUser,
      }}
    >
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
