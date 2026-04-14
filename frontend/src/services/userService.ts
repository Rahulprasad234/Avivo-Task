import axios from 'axios';
import { User } from '../types/User';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  /**
   * Fetch all users from the API
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<{ users: User[]; total: number }>('/users');
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users from API');
    }
  },

  /**
   * Fetch a single user by ID
   */
  async getUserById(id: number): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
  },

  /**
   * Health check for the API
   */
  async checkHealth(): Promise<boolean> {
    try {
      await apiClient.get('/health');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};
