import User from '../models/User.model.js';
import Post from '../models/Post.model.js';

// @desc    Get current user OR public profile
// @route   GET /api/users/me  |  GET /api/users/:id
// @access  Private (me) / Public (:id)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id === 'me' || !req.params.id ? req.user?._id : req.params.id;
    const user = await User.findById(userId).select('-password');
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
    const { fullName, bio, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, bio, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change password
// @route   PUT /api/users/me/password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user || !(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
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
      .populate('author', 'fullName username avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
