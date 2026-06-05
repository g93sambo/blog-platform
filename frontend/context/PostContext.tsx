'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Strict type contracts for our global post data models
export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  category: string;
  status: 'Published' | 'Draft' | 'Under Review';
  views: string;
  date: string;
  color: string;
  author: string;
}

interface PostContextType {
  posts: Post[];
  addPost: (newPost: Omit<Post, 'id' | 'views' | 'date' | 'author'>) => void;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    { id: "street-souk", title: "Street Souk: How Lagos Market Culture Is Rewriting Global Fashion Rules", category: "Fashion", status: "Published", views: "2,410", date: "May 6, 2026", color: "#f5c4d1", author: "Ngige N." },
    { id: "gta-vi", title: "GTA VI Finally Drops — Was the Wait Worth It?", category: "Gaming", status: "Published", views: "1,920", date: "May 4, 2026", color: "#c3d2f8", author: "Josh Levi" },
    { id: "met-gala", title: "Rihanna & A$AP Rocky Shut Down the Met Gala — Again", category: "Music", status: "Published", views: "980", date: "May 7, 2026", color: "#f4c0d1", author: "Sofia M." },
    { id: "ai-jobs", title: "AI is eating software jobs. Here's what nobody's saying.", category: "Tech", status: "Draft", views: "—", date: "May 8, 2026", color: "#c0dd97", author: "Ngige N." }
  ]);

  const addPost = (newPostData: Omit<Post, 'id' | 'views' | 'date' | 'author'>) => {
    const newId = newPostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullPost: Post = {
      ...newPostData,
      id: newId,
      views: "—",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: "Kelvin O." // Links dynamically to the active author
    };
    setPosts((prev) => [fullPost, ...prev]);
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be consumed inside a PostProvider configuration tree.');
  return context;
}