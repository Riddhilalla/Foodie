const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Usermodel = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const Signup = async (req, res) => {
    try {
        const { name, email, password, avatar, bio, city, country, favoriteCuisines } = req.body;

        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new Usermodel({
            name,
            email,
            password: hashedPassword,
            avatar,
            bio,
            location: {
                city: city || '',
                country: country || ''
            },
            favoriteCuisines,
        });

        await userModel.save();
        res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        const errorMssg = 'Email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMssg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMssg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Login successful", success: true, jwtToken, email, name: user.name, _id: user._id, avatar: user.avatar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, sub: googleId } = ticket.getPayload();

        let user = await Usermodel.findOne({ email });

        if (!user) {

            user = new Usermodel({
                name,
                email,
                googleId,
            });
            await user.save();
        }


        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Google Login successful", success: true, jwtToken, email, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Invalid Google token", success: false });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await Usermodel.findById(req.user._id).select("name likedRecipes savedRecipes");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    Signup,
    login,
    googleLogin,
    getMe,
};
