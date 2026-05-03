import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import PostCard from '../components/PostCard';
import type { Post } from '../types';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchPosts({ page, search: query });
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <h1>Welcome to BlogCraft</h1>
        <p>Discover stories, ideas, and thoughts from writers everywhere.</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            id="search-input"
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" id="search-btn">Search</button>
        </form>
      </section>

      {/* Posts Grid */}
      <section className="posts-section">
        <h2>{query ? `Results for "${query}"` : 'Latest Posts'}</h2>
        {loading ? (
          <div className="loading-spinner">Loading posts...</div>
        ) : posts.length === 0 ? (
          <p className="empty-state">No posts found. Be the first to write one!</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              id="prev-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              id="next-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
