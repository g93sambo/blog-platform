// User Types
export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  followers?: number;
  following?: number;
  posts?: number;
  createdAt?: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Post Types
export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  description?: string;
  author: User;
  banner?: string;
  bannerColor?: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  saved?: boolean;
  likedByCurrentUser?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface AnalyticsSummary {
  totalViews: number;
  uniqueReaders: number;
  avgReadTime: string;
  newFollowers: number;
  totalViewsChange: string;
  uniqueReadersChange: string;
  avgReadTimeChange: string;
  newFollowersChange: string;
}

export interface AnalyticsChart {
  date: string;
  views: number;
}

export interface TopPost extends Post {
  ctr: string; // Click-through rate
}

export interface AnalyticsData {
  summary: AnalyticsSummary;
  viewsTrend: AnalyticsChart[];
  topPosts: TopPost[];
}

// Notification Types
export interface NotificationSettings {
  emailNewFollowers: boolean;
  emailNewComments: boolean;
  emailNewLikes: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  likedByCurrentUser?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
