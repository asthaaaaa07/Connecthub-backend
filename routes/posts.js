const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/posts
 * @desc    Create a new post (text or image or both)
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { content, image } = req.body;

    // ✅ Ensure at least one field is provided
    if ((!content || content.trim().length === 0) && !image) {
      return res
        .status(400)
        .json({ success: false, message: 'Post must contain either text or image' });
    }

    // ✅ Optional: limit text length
    if (content && content.length > 1000) {
      return res
        .status(400)
        .json({ success: false, message: 'Post content cannot exceed 1000 characters' });
    }

    // ✅ Create post
    const post = new Post({
      user: req.user._id,
      content: content ? content.trim() : '',
      image: image || null,
    });

    await post.save();
    await post.populate('user', 'name email');

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post,
    });

  } catch (error) {
    console.error('❌ Create post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating post',
    });
  }
});

/**
 * @route   GET /api/posts
 * @desc    Get all posts (public feed)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: 'Posts fetched successfully',
      posts,
      count: posts.length,
    });

  } catch (error) {
    console.error('❌ Fetch posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
    });
  }
});

/**
 * @route   GET /api/posts/user/:userId
 * @desc    Get all posts created by a specific user
 * @access  Private
 */
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: 'User posts fetched successfully',
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('❌ Fetch user posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching user posts',
    });
  }
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post (only by owner)
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    const { id } = req.params;

    if ((!content || content.trim().length === 0) && !image) {
      return res.status(400).json({ success: false, message: 'Post must contain text or image' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // ✅ Ensure only the owner can edit
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this post' });
    }

    post.content = content ? content.trim() : post.content;
    post.image = image || post.image;
    await post.save();
    await post.populate('user', 'name email');

    return res.json({
      success: true,
      message: 'Post updated successfully',
      post,
    });

  } catch (error) {
    console.error('❌ Update post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating post',
    });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post (only by owner)
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // ✅ Ensure only the owner can delete
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    return res.json({
      success: true,
      message: 'Post deleted successfully',
    });

  } catch (error) {
    console.error('❌ Delete post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting post',
    });
  }
});

module.exports = router;
