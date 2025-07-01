// models/recipe.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const nutritionInfoSchema = new mongoose.Schema({
  calories: { type: Number },
  protein: { type: String },
  carbs: { type: String },
  fats: { type: String },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [ingredientSchema],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: {
    type: [String]
  },
  image: {
    type: String // base64 or image URL
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    default: []
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String, // or mongoose.Schema.Types.ObjectId if linked to User model
    required: true
  },
  nutritionInfo: nutritionInfoSchema
});

module.exports = mongoose.model('Recipe', recipeSchema);
