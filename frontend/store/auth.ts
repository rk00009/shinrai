import { create } from 'zustand';
import { User, AuthState, UserRole } from '@/types';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
  setLoading: (loading: boolean) => void;
  hasRole: (role: UserRole) => boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  department?: string;
}

// Mock user data for development
const getMockUser = (email: string, role: UserRole = 'student'): User => {
  const mockNames = {
    student: 'Rajesh Kumar',
    faculty: 'Dr. Priya Singh',
    operational: 'Amit Sharma',
    admin: 'Admin User',
  };

  return {
    id: `user-${role}-${Date.now()}`,
    email,
    name: mockNames[role as keyof typeof mockNames] || 'User',
    role,
    department: role !== 'student' ? 'Academic Affairs' : undefined,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    verified: true,
    createdAt: new Date(),
  };
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setToken: (token) => {
    set({ token });
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    } else if (!token && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  login: async (email: string, password: string, role: UserRole = 'student') => {
    set({ isLoading: true });
    try {
      // For development: Use mock login if API is not available
      // In Phase 4, this will connect to actual backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      if (apiUrl) {
        // Production: Call actual API
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) throw new Error('Login failed');
        
        const data = await response.json();
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', data.token);
        }
      } else {
        // Development: Mock login
        const mockUser = getMockUser(email, role);
        const mockToken = `token-${mockUser.id}-${Date.now()}`;
        
        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', mockToken);
          localStorage.setItem('authUser', JSON.stringify(mockUser));
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (signupData: SignupData) => {
    set({ isLoading: true });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      if (apiUrl) {
        // Production: Call actual API
        const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData),
        });
        
        if (!response.ok) throw new Error('Signup failed');
        
        const data = await response.json();
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', data.token);
        }
      } else {
        // Development: Mock signup
        const mockUser = getMockUser(signupData.email, signupData.role);
        const mockToken = `token-${mockUser.id}-${Date.now()}`;
        
        set({
          user: mockUser,
          token: mockToken,
          isAuthenticated: true,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', mockToken);
          localStorage.setItem('authUser', JSON.stringify(mockUser));
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  hasRole: (role: UserRole) => {
    const state = get();
    return state.user?.role === role;
  },
}));
