import { ApiResponse, PaginatedResponse, Post, User, AnalyticsData, NotificationSettings } from '@/types';

// In production this is set via Vercel's NEXT_PUBLIC_API_URL environment variable.
// In development it falls back to localhost.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:5000/api');

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth token if it exists
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // AUTH ENDPOINTS
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    fullName: string;
    email: string;
    password: string;
    username: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // USER ENDPOINTS
  async getProfile(): Promise<ApiResponse<User>> {
    return this.request('/users/me');
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.request('/users/me/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async updateNotificationSettings(settings: NotificationSettings): Promise<ApiResponse<void>> {
    return this.request('/users/notifications', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    return this.request('/users/notifications');
  }

  // POST ENDPOINTS
  async getPosts(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return this.request(`/posts?page=${page}&limit=${limit}`);
  }

  async getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${slug}`);
  }

  async createPost(postData: Partial<Post>): Promise<ApiResponse<Post>> {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id: string, postData: Partial<Post>): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyPosts(page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return this.request(`/posts/my-posts?page=${page}&limit=${limit}`);
  }

  async getDashboardStats(): Promise<ApiResponse<{ totalPosts: number; totalViews: number; totalLikes: number; followers: number; recentPosts: Post[] }>> {
    return this.request('/posts/dashboard-stats');
  }

  async toggleLikePost(id: string): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${id}/like`, {
      method: 'POST',
    });
  }

  async getSavedPosts(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return this.request(`/posts/saved?page=${page}&limit=${limit}`);
  }

  async savePost(id: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${id}/save`, {
      method: 'POST',
    });
  }

  async unsavePost(id: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${id}/unsave`, {
      method: 'POST',
    });
  }

  // ANALYTICS ENDPOINTS
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    return this.request('/analytics');
  }

  async getAnalyticsSummary(): Promise<ApiResponse<AnalyticsData['summary']>> {
    return this.request('/analytics/summary');
  }

  async getAnalyticsChart(): Promise<ApiResponse<AnalyticsData['viewsTrend']>> {
    return this.request('/analytics/chart');
  }

  async getTopPosts(): Promise<ApiResponse<AnalyticsData['topPosts']>> {
    return this.request('/analytics/top-posts');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
