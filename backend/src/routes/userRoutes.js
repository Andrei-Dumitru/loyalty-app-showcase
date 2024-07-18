const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId, 'businessPoints');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.businessPoints);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;