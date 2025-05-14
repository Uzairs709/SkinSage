// context/AuthContext.tsx
import axios from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
  id: number;
  email: string;
  name: string;
  user_type: "doctor" | "patient";
  license_number?: string;
  age?: number;
  gender?: string;
  doc_designation?: string;
  doc_specialization?: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch /users/me and persist
  const fetchCurrentUser = async (JwtToken: string) => {
    try {
      const resp = await axios.get<User>("/users/me", {
        headers: { "X-User-Token": JwtToken, },
      });
      setUser(resp.data);
      console.log(resp.data);
      await AsyncStorage.setItem("user", JSON.stringify(resp.data));
    } catch (err) {
      
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("access_token");
    setUser(null);
    setToken(null);
    try {
      // 1) get JWT
      const { data: tokenResp } = await axios.post<{
        access_token: string;
        token_type: string;
      }>("/token", { email, password });
      // 2) persist token
      setToken(tokenResp.access_token);
      await AsyncStorage.setItem("access_token", tokenResp.access_token);

      // 3) fetch full user profile
      await fetchCurrentUser(tokenResp.access_token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("user");
  };

  // On startup, restore token + user
  const checkAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
        await fetchCurrentUser(storedToken);
      }
    } catch (err) {
      console.error("Error restoring auth:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};