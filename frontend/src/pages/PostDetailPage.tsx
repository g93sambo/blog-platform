import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostBySlug, fetchComments, addComment, toggleLike, deletePost } from '../api';
import { useAuth } from '../context/AuthContext';
import type { Post, Comment } from '../types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetchPostBySlug(slug!),
          fetchComments(''), // will update after post loads
        ]);
        setPost(postRes.data);
        // Load comments by post id
        const cRes = await fetchComments(postRes.data._id);
        setComments(cRes.data);
      } catch {
        toast.error('Post not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, navigate]);

  const handleLike = async () => {
    if (!post) return;
    try {
      await toggleLike(post._id);
      setPost((prev) =>
        prev
          ? {
              ...prev,
              likes: prev.likes.includes(user!.id)
                ? prev.likes.filter((id) => id !== user!.id)
                : [...prev.likes, user!.id],
            }
          : prev
      );
    } catch {
      toast.error('Please login to like posts');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await addComment(post!._id, commentText);
      setComments((prev) => [data, ...prev]);
      setCommentText('');
      toast.success('Comment added!');
    } catch {
      toast.error('Login to comment');
    }
  };

  const handleDelete = async () => {
    if (!post || !confirm('Delete this post?')) return;
    try {
      await deletePost(post._id);
      toast.success('Post deleted');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  if (loading) return <div className="loading-spinner">Loading post...</div>;
  if (!post) return null;

  const isAuthor = user?.id === (post.author as unknown as { id: string })?.id;

  return (
    <main className="post-detail">
      {post.coverImage && (
        <div className="post-hero-image">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <article className="post-content">
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span>By <strong>{post.author.name}</strong></span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>· 👁 {post.views} views</span>
        </div>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="post-actions">
          <button
            id="like-btn"
            onClick={handleLike}
            className={`btn-like ${user && post.likes.includes(user.id) ? 'liked' : ''}`}
          >
            ❤️ {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </button>
          {isAuthor && (
            <>
              <Link to={`/write?edit=${post._id}`} className="btn-edit">Edit Post</Link>
              <button id="delete-post-btn" onClick={handleDelete} className="btn-danger">Delete</button>
            </>
          )}
        </div>
      </article>

      {/* Comments */}
      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>

        {user ? (
          <form className="comment-form" onSubmit={handleComment}>
            <textarea
              id="comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <button type="submit" id="submit-comment-btn">Post Comment</button>
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Login</Link> to leave a comment.
          </p>
        )}

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-author">
                <span className="avatar-placeholder">{comment.author?.name?.[0]}</span>
                <strong>{comment.author?.name}</strong>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostDetailPage;
