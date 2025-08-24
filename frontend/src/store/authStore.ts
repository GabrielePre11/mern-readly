import { create } from "zustand";
import axios from "axios";

interface User {
  email: string;
  name: string;
  role: "admin" | "user";
  isVerified: boolean;
}

type signupPOSTData = {
  email: string;
  name: string;
  password: string;
};

interface Response {
  success: boolean;
  message?: string;
  user?: User;
  users?: User[];
  admins?: User[];
  totalUsers?: number;
  totalAdmins?: number;
}

interface authStore {
  //============= Variables =============//
  user: User | null;
  users: User[] | null;
  admins: User[] | null;
  isAuthenticated: boolean;
  errorState: string | null;
  loadingState: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  totalUsers: number;
  totalAdmins: number;

  //============= Functions =============//
  signup: ({ email, name, password }: signupPOSTData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<Response>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  getTotalUsers: () => Promise<void>;
  getTotalAdmins: () => Promise<void>;
}

const API_URL = import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://mern-readly.onrender.com/";
axios.defaults.withCredentials = true;

export const useAuthStore = create<authStore>((set) => ({
  user: null,
  users: null,
  admins: null,
  isAuthenticated: false,
  errorState: null,
  loadingState: false,
  isCheckingAuth: true,
  message: null,
  totalUsers: 0,
  totalAdmins: 0,

  //============= Sign Up Function =============//
  signup: async ({ email, name, password }: signupPOSTData) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.post<Response>(`${API_URL}/auth/signup`, {
        email,
        name,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Login Function =============//
  login: async (email: string, password: string) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.post<Response>(`${API_URL}/auth/login`, {
        email,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Logout =============//
  logout: async () => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.post<Response>(`${API_URL}/auth/logout`);
      set({ user: null, message: response.data.message });
    } catch (error) {
      set({ errorState: null, isAuthenticated: false });
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Verify Email Function =============//
  verifyEmail: async (code: string) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.post<Response>(
        `${API_URL}/auth/verify-email`,
        {
          code,
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Check Authentication Function =============//
  checkAuth: async () => {
    set({ isCheckingAuth: true, errorState: null });

    try {
      const response = await axios.get<Response>(`${API_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error: unknown) {
      set({ errorState: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //============= Forgot Password Function =============//
  forgotPassword: async (email: string) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await await axios.post<Response>(
        `${API_URL}/auth/forgot-password`,
        { email }
      );
      set({ loadingState: false, message: response.data.message });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Reset Password Function =============//
  resetPassword: async (token: string, password: string) => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.post<Response>(
        `${API_URL}/auth/reset-password/${token}`,
        { password }
      );
      set({ loadingState: false, message: response.data.message });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ errorState: error.response.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ errorState: error.message });
      } else {
        set({ errorState: "An unknown error occurred." });
      }
      throw error;
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Get Total Users =============//
  getTotalUsers: async () => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.get<Response>(`${API_URL}/auth/users`);
      set({ users: response.data.users, totalUsers: response.data.totalUsers });
    } catch (error: unknown) {
      set({ errorState: null });
    } finally {
      set({ loadingState: false });
    }
  },

  //============= Get Total Admins =============//
  getTotalAdmins: async () => {
    set({ loadingState: true, errorState: null });

    try {
      const response = await axios.get<Response>(`${API_URL}/auth/admins`);
      set({
        admins: response.data.admins,
        totalAdmins: response.data.totalAdmins,
      });
    } catch (error: unknown) {
      set({ errorState: null });
    } finally {
      set({ loadingState: false });
    }
  },
}));
