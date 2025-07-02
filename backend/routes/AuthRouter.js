const {
   Signup,
   login,
   googleLogin,
   getMe,
} = require("../controllers/AuthController");
const ensureAuthenticated = require("../middlewares/Auth");
const {
   signupValidation,
   loginValidation,
} = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, Signup);
router.post("/google-login", googleLogin);

router.get("/me", ensureAuthenticated, getMe);

module.exports = router;
