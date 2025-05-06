// context/AuthContext.tsx
import api, { setAuthToken } from "@/utils/api";
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
  const fetchCurrentUser = async (bearerToken: string) => {
    try {
      console.log("Fetching current user with token:", bearerToken.substring(0, 10) + "...");
      setAuthToken(bearerToken);
      
      const resp = await api.get<User>("/users/me");
      console.log("User data received:", JSON.stringify(resp.data, null, 2));
      
      if (!resp.data || !resp.data.user_type) {
        throw new Error("Invalid user data received from server");
      }

      setUser(resp.data);
      await AsyncStorage.setItem("user", JSON.stringify(resp.data));
    } catch (err: any) {
      console.error("Failed to fetch current user:", err);
      if (err.response?.status === 404) {
        console.log("Clearing stale user data due to 404 error");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("access_token");
        setUser(null);
        setToken(null);
        throw new Error("User profile not found. Please try logging in again.");
      }
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Clear any existing data before login
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("access_token");
      setUser(null);
      setToken(null);

      console.log("Attempting login with email:", email);
      
      // For Hugging Face Spaces, we'll use a mock token for now
      // In a real app, you would validate credentials with your backend
      const mockToken = "mock_token_" + Date.now();
      
      // Store the token
      setToken(mockToken);
      await AsyncStorage.setItem("access_token", mockToken);

      // Mock user data based on email
      const mockUser: User = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        user_type: email.includes('patient') ? 'patient' : 'doctor',
        ...(email.includes('doctor') ? { license_number: 'LIC123456' } : {}),
        ...(email.includes('patient') ? { age: 25, gender: 'Male' } : {})
      };

      setUser(mockUser);
      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.message === "Network Error") {
        throw new Error("No internet connection");
      } else if (error.response?.status === 401) {
        throw new Error("Invalid email or password");
      } else if (error.response?.status === 404) {
        throw new Error("API endpoint not found");
      } else {
        throw new Error(error.message || "An unexpected error occurred");
      }
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
      const storedUser = await AsyncStorage.getItem("user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
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
