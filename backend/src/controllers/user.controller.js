import User from '../models/User.model.js';
import Post from '../models/Post.model.js';

// @desc    Get public profile of a user
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update current user profile
// @route   PUT /api/users/me
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts by a specific user
// @route   GET /api/users/:id/posts
// @access  Public
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id, published: true })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
