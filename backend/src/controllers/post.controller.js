import Post from '../models/Post.model.js';
import Comment from '../models/Comment.model.js';

// @desc    Get all published posts (with pagination & filter)
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search, category } = req.query;
    const query = { published: true };

    if (tag) query.tags = tag;
    if (category && category !== 'All') query.category = category;
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];

    const posts = await Post.find(query)
      .populate('author', 'fullName username avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'fullName username avatar bio');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, category, description, tags, coverImage, published, readTime } = req.body;

    const post = await Post.create({
      title,
      content,
      category: category || 'General',
      description: description || '',
      tags: tags || [],
      coverImage: coverImage || '',
      readTime: readTime || '1m',
      published: published ?? false,
      author: req.user._id,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (author only)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, category, description, tags, coverImage, published, readTime } = req.body;
    Object.assign(post, { title, content, category, description, tags, coverImage, published, readTime });
    await post.save();

    res.json({ message: 'Post updated', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (author or admin)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    await Comment.deleteMany({ post: req.params.id });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like / Unlike a post
// @route   POST /api/posts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id.toString();
    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get posts by the logged-in user
// @route   GET /api/posts/my-posts
// @access  Private
export const getMyPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments({ author: req.user._id });

    res.json({
      data: posts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a post
// @route   POST /api/posts/:id/save
// @access  Private
export const savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id.toString();
    if (!post.savedBy.some((id) => id.toString() === userId)) {
      post.savedBy.push(req.user._id);
      await post.save();
    }

    res.json({ message: 'Post saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unsave a post
// @route   POST /api/posts/:id/unsave
// @access  Private
export const unsavePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.savedBy = post.savedBy.filter((id) => id.toString() !== req.user._id.toString());
    await post.save();

    res.json({ message: 'Post unsaved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get saved posts for current user
// @route   GET /api/posts/saved
// @access  Private
export const getSavedPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const posts = await Post.find({ savedBy: req.user._id, published: true })
      .populate('author', 'fullName username avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments({ savedBy: req.user._id, published: true });

    res.json({
      data: posts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats for current user
// @route   GET /api/posts/dashboard-stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
    const recentPosts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      totalPosts,
      totalViews,
      totalLikes,
      followers: 0,
      recentPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
