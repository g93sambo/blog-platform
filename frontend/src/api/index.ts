import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Auth ----
export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const fetchMe = () => api.get('/auth/me');

// ---- Posts ----
export const fetchPosts = (params?: { page?: number; limit?: number; tag?: string; search?: string }) =>
  api.get('/posts', { params });

export const fetchPostBySlug = (slug: string) => api.get(`/posts/${slug}`);

export const createPost = (data: {
  title: string;
  content: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}) => api.post('/posts', data);

export const updatePost = (id: string, data: Partial<{ title: string; content: string; tags: string[]; published: boolean }>) =>
  api.put(`/posts/${id}`, data);

export const deletePost = (id: string) => api.delete(`/posts/${id}`);

export const toggleLike = (id: string) => api.post(`/posts/${id}/like`);

export const fetchMyPosts = () => api.get('/posts/my-posts');

// ---- Comments ----
export const fetchComments = (postId: string) => api.get(`/comments/${postId}`);

export const addComment = (postId: string, content: string) =>
  api.post(`/comments/${postId}`, { content });

export const deleteComment = (commentId: string) => api.delete(`/comments/${commentId}`);

// ---- Users ----
export const fetchUserProfile = (id: string) => api.get(`/users/${id}`);

export const fetchUserPosts = (id: string) => api.get(`/users/${id}/posts`);

export const updateProfile = (data: { name?: string; bio?: string; avatar?: string }) =>
  api.put('/users/me', data);

export default api;
