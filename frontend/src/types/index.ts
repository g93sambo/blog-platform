// ============================================================
// Global TypeScript type definitions for the Blog Platform
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  published: boolean;
  likes: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  post: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  createdAt: string;
}

export interface PaginatedPosts {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
