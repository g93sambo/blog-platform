import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyPosts, deletePost } from '../api';
import { useAuth } from '../context/AuthContext';
import type { Post } from '../types';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchMyPosts();
        setPosts(data);
      } catch {
        toast.error('Failed to load your posts');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p className="dashboard-welcome">Welcome back, {user?.name} 👋</p>
        </div>
        <Link to="/write" id="new-post-btn" className="btn-primary">
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading your posts...</div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <p>You haven't written any posts yet.</p>
          <Link to="/write" className="btn-primary">Write your first post</Link>
        </div>
      ) : (
        <div className="dashboard-posts">
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Total Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.filter((p) => p.published).length}</span>
              <span className="stat-label">Published</span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.filter((p) => !p.published).length}</span>
              <span className="stat-label">Drafts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.reduce((sum, p) => sum + p.likes.length, 0)}</span>
              <span className="stat-label">Total Likes</span>
            </div>
          </div>

          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td>
                    <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>❤️ {post.likes.length}</td>
                  <td>👁 {post.views}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <Link to={`/write?edit=${post._id}`} className="btn-edit-sm">Edit</Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn-danger-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
