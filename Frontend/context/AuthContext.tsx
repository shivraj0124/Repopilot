"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "@/lib/axios";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
  setIsLoggedIn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  refreshUser: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [user, setUser] =
    useState<User | null>(null);

  const refreshUser = async () => {
    try {
      setIsLoading(true);

      const response =
        await api.get("/auth/me");

      setUser(response.data.user);
      console.log("User refreshed:", response.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,
        setIsLoggedIn,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}