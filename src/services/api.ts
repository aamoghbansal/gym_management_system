import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Unable to connect to server. Please ensure the backend is running.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw error;
  }
);

// API interface types
export interface Member {
  id?: number;
  name: string;
  age: number;
  gender?: 'Male' | 'Female' | 'Other';
  phone?: string;
  email?: string;
  weight?: number;
  membership_plan: string;
  joining_date: string;
  duration_months: number;
  payment_status?: 'Paid' | 'Pending';
  total_price: number;
  amount_paid?: number;
  balance_amount?: number;
  membership_status?: 'Active' | 'Expiring' | 'Expired';
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

// Member API functions
export const memberApi = {
  // Get all members
  getAll: async (): Promise<Member[]> => {
    const response = await api.get<ApiResponse<Member[]>>('/members');
    return response.data.data || [];
  },

  // Get member by ID
  getById: async (id: number): Promise<Member> => {
    const response = await api.get<ApiResponse<Member>>(`/members/${id}`);
    if (!response.data.data) {
      throw new Error('Member not found');
    }
    return response.data.data;
  },

  // Create new member
  create: async (memberData: Omit<Member, 'id'>): Promise<Member> => {
    const response = await api.post<ApiResponse<Member>>('/members', memberData);
    if (!response.data.data) {
      throw new Error('Failed to create member');
    }
    return response.data.data;
  },

  // Update member
  update: async (id: number, memberData: Partial<Member>): Promise<Member> => {
    const response = await api.put<ApiResponse<Member>>(`/members/${id}`, memberData);
    if (!response.data.data) {
      throw new Error('Failed to update member');
    }
    return response.data.data;
  },

  // Delete member
  delete: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`);
  },
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch {
    return false;
  }
};

export default api;