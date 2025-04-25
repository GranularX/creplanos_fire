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
  signup: (full_name: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, otp: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
  getCsrfToken: () => string | null;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async (email: string, password: string) => false,
  logout: async () => {},
  signup: async (full_name: string, email: string, password: string) => false,
  verifyEmail: async (email: string, otp: string) => false,
  checkAuthStatus: async () => {},
  getCsrfToken: () => null,
});

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API base URL
  const API_URL = "https://one-for-all.grayengines.com/app/v1";

  // Function to get CSRF token from cookies
  const getCsrfToken = (): string | null => {
    const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
    return match ? match[1] : null;
  };

  // Configure axios to automatically include CSRF token in headers for state-changing methods
  useEffect(() => {
    // Add request interceptor to automatically include CSRF token
    const interceptor = axios.interceptors.request.use((config) => {
      // Only add CSRF token for state-changing methods
      if (["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")) {
        const token = getCsrfToken();
        if (token) {
          config.headers["X-CSRF-Token"] = token;
        }
      }
      return config;
    });

    // Clean up interceptor on unmount
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

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

      if (response.data?.status_code === 200) {
        const userData = {
          email: response.data?.data?.email,
          id: response.data?.data?.id,
          name: response.data?.data?.full_name || "Unknown",
          role: "user"
        };
        setUser(userData);
        setIsAuthenticated(true);
        
        // Persist user details in local storage
        if (response.data?.data?.uns) {
          localStorage.setItem("uns", JSON.stringify(response.data.data.uns));
        }
        if (response.data?.data?.verse_id) {
          localStorage.setItem("verse_id", JSON.stringify(response.data.data.verse_id));
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setError(null);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      // Don't set error here as it's not a user-facing error
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
  
    const payload = {
      data: {
        email,
        password
      }
    };
  
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin/creplanos`,
        payload,
        { withCredentials: true }
      );
  
      const status_code = response?.data?.status_code ?? null;
      const status = response?.data?.status ?? null;
  
      if (status_code === 200 || status === "SUCCESS") {
        const userData = {
          email: response.data?.data?.email,
          id: response.data?.data?.id,
          name: response.data?.data?.full_name || "Unknown", // Default to "Unknown" if name is not provided
          role: "user"
        };
        setUser(userData);
        setIsAuthenticated(true);
  
        if (response.data?.data?.uns) {
          localStorage.setItem("uns", JSON.stringify(response.data.data.uns));
        }
        if (response.data?.data?.verse_id) {
          localStorage.setItem("verse_id", JSON.stringify(response.data.data.verse_id));
        }
  
        return true;
      }
  
      return false;
  
    } catch (err: unknown) {
      setUser(null);
      setIsAuthenticated(false);
  
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        console.error("Unhandled login error:", err);
        setError("Login failed. Please check your credentials and try again.");
      }
  
      return false;
  
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (full_name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const payload = {
      data: {
        full_name: full_name,
        email: email,
        password: password
      }
    }
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup/creplanos`,
        payload,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setError(null);
        return true;
      }
      return false;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again later.");
      }
      return false;
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
        `${API_URL}/auth/verify-email/creplanos`,
        { email, otp },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setError(null);
        return true;
      }
      return false;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Email verification failed. Please try again.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/auth/signout/creplanos`,
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
        setError("Logout failed. Please try again.");
      }
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
    getCsrfToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};