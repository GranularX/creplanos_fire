import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Define the shape of our auth state
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add any other user properties you need
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (phone_number: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async (email: string, password: string) => false,
  logout: async () => {},
  signup: async (phone_number: string, email: string, password: string) => false,
  verifyEmail: async (email: string, otp: string) => false,
  checkAuthStatus: async () => {},
});

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API base URL - Updated to the one-for-all API URL
  const API_URL = "https://one-for-all.grayengines.com/app/v1/";

  // Check auth status on initial load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check auth status by calling the status endpoint
  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // Make the request to check authentication status
      const response = await axios.get(`${API_URL}/auth/status`, {
        withCredentials: true, // Important for sending cookies
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Persist user details in local storage
        localStorage.setItem("uns", JSON.stringify(response.data?.data?.uns));
        localStorage.setItem("verse_id", JSON.stringify(response.data?.data?.verse_id));
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setError(null);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setError("Authentication check failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin/feastflo`,
        { email, password },
        { withCredentials: true }
      );
      await checkAuthStatus();
      return true;
    } catch (err: unknown) {
      setUser(null);
      setIsAuthenticated(false);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
        return false;
      } else {
        setError("Login failed");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (phone_number: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup/feastflo`,
        { phone_number, email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setError(null);
        return true;
      }
      return false;
    } catch (err: unknown) {
      setUser(null);
      setIsAuthenticated(false);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
        return false;
      } else {
        setError("Signup failed");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP function
  const verifyEmail = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/auth/verify-email/feastflo`,
        { email, otp },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setError(null);
        return true;
      }
      return false;
    } catch (err: unknown) {
      setUser(null);
      setIsAuthenticated(false);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
        return false;
      } else {
        setError("Email verification failed");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/auth/logout/feastflo`,
        {},
        { withCredentials: true }
      );
      // Clear user state after logout
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      // Clear user details from local storage
      localStorage.removeItem("uns");
      localStorage.removeItem("verse_id");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Logout failed");
      }
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Provide the context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    signup,
    verifyEmail,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
