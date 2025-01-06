import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Mock API endpoints
export const mockApi = {
  getUserData: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'student'
        });
      }, 500);
    });
  },

  getAssignments: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Matematická úloha 1',
            description: 'Řešení kvadratických rovnic',
            dueDate: '2024-02-01'
          },
          {
            id: '2',
            title: 'Matematická úloha 2',
            description: 'Goniometrické funkce',
            dueDate: '2024-02-15'
          }
        ]);
      }, 500);
    });
  }
};

export default api; 