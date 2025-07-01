const { types } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, maxLength: 200, default: '' },

  location: {
    city: { type: String, default: '' },
    country: { type: String, default: '' },
  },

  favoriteCuisines: {
    type: [String],
    default: [],
  },


  uploadedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
  likedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
  commentedRecipes: [
    {
      recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
      comment: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
  recommendedRecipes: [
    {
      recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
      recommendedAt: { type: Date, default: Date.now },
    },
  ],
  recipeReviews: [
    {
      recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],


  communities: {
    joined: [{ type: Schema.Types.ObjectId, ref: 'Community', default: [] }],
    created: [{ type: Schema.Types.ObjectId, ref: 'Community', default: [] }],
  },


  hireChefDetails: [
    {
      isHired: { type: Boolean, default: false },
      chefId: { type: Schema.Types.ObjectId, ref: 'Chef' },
      cuisine: { type: String },
      reasonForHiring: { type: String },
      review: {
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
      hiredAt: { type: Date, default: Date.now },
    },
  ],


  notifications: [
    {
      message: String,
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  lastActiveAt: { type: Date, default: Date.now },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

