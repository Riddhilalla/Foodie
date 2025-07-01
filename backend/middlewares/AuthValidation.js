const Joi = require('joi');

// Middleware for signup validation
const signupValidation = (req, res, next) => {
    console.log(req.body); // Log the incoming request body

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        avatar: Joi.string().uri(),
        bio: Joi.string().max(200),
        city: Joi.string(),           
  country: Joi.string(),
        favoriteCuisines: Joi.array().items(Joi.string())
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.error(error); // Log the validation error
        return res.status(400).json({ message: "Bad Request", error: error.details });
    }
    next();
};

// Middleware for login validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error: error.details });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
};
