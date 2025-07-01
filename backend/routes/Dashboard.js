const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/Auth');
const User = require('../models/user'); 

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
       location: user.location || { city: '', country: '' },
      favoriteCuisines: user.favoriteCuisines,
      uploadedRecipes: user.uploadedRecipes || [],
      savedRecipes: user.savedRecipes || []
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
