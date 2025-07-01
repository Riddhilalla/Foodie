const { Signup, login,googleLogin } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation,login);

router.post('/signup', signupValidation,Signup);
router.post("/google-login", googleLogin);

module.exports = router;