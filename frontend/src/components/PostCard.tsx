import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { slug, title, excerpt, tags, author, createdAt, likes, views, coverImage } = post;

  return (
    <article className="post-card">
      {coverImage && (
        <div className="post-card-image">
          <img src={coverImage} alt={title} />
        </div>
      )}
      <div className="post-card-body">
        <div className="post-card-tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="post-card-title">
          <Link to={`/post/${slug}`}>{title}</Link>
        </h2>
        <p className="post-card-excerpt">{excerpt}</p>
        <div className="post-card-meta">
          <span className="post-card-author">
            {author?.avatar ? (
              <img src={author.avatar} alt={author.name} className="avatar-sm" />
            ) : (
              <span className="avatar-placeholder">{author?.name?.[0]}</span>
            )}
            {author?.name}
          </span>
          <span className="post-card-date">
            {new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="post-card-stats">❤️ {likes.length} · 👁 {views}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
