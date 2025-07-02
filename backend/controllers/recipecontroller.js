const Recipe = require("../models/recipe");
const User = require("../models/user");
const {
   uploadOnCloudinary,
   deleteFromCloudinary,
} = require("../utils/cloudinary");

// Create a new recipe
const createRecipe = async (req, res) => {
   try {
      const {
         name,
         description,
         ingredients,
         instructions,
         cookingTime,
         preparationTime,
         servings,
         cuisine,
         difficultyLevel,
         tags,
         nutritionInfo,
      } = req.body;

      const parsedIngredients =
         typeof ingredients === "string"
            ? JSON.parse(ingredients)
            : ingredients;

      const parsedNutrition =
         typeof nutritionInfo === "string"
            ? JSON.parse(nutritionInfo)
            : nutritionInfo;

      const parsedInstructions =
         typeof instructions === "string"
            ? JSON.parse(instructions)
            : instructions;

      let imageUrl;
      if (req.file) {
         const cloudinaryResult = await uploadOnCloudinary(req.file.path);
         if (!cloudinaryResult) {
            return res
               .status(500)
               .json({ message: "Failed to upload image to Cloudinary" });
         }
         imageUrl = cloudinaryResult.secure_url;
      }

      const newRecipe = new Recipe({
         name,
         description,
         ingredients: parsedIngredients,
         instructions: parsedInstructions,
         cookingTime,
         preparationTime,
         servings,
         cuisine,
         difficultyLevel,
         tags,
         image: imageUrl,
         nutritionInfo: parsedNutrition,
         author: req.user._id,
      });

      const savedRecipe = await newRecipe.save();

      await User.findByIdAndUpdate(
         req.user._id,
         { $push: { uploadedRecipes: savedRecipe._id } },
         { new: true }
      );

      res.status(201).json(savedRecipe);
   } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Server error creating recipe" });
   }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
   try {
      const recipes = await Recipe.find().populate("comments");
      res.json(recipes);
   } catch (error) {
      console.error("Error getting recipes:", error);
      res.status(500).json({ message: "Server error getting recipes" });
   }
};

// Get single recipe by ID
const getRecipeById = async (req, res) => {
   try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id)
         .populate("comments")
         .populate("author", "name _id");
      if (!recipe) {
         return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
   } catch (error) {
      console.error("Error getting recipe:", error);
      res.status(500).json({ message: "Server error getting recipe" });
   }
};

// Update a recipe
const updateRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id);
      if (!recipe) {
         return res.status(404).json({ message: "Recipe not found" });
      }

      // Optional: enforce author ownership
      if (recipe.author !== req.user.id) {
         return res.status(403).json({ message: "Forbidden: Not the author" });
      }

      const updates = req.body;

      // If there's a new image file, upload to Cloudinary
      if (req.file) {
         if (recipe.image) {
            await deleteFromCloudinary("foodie", recipe.image);
         }
         const cloudinaryResult = await uploadOnCloudinary(req.file.path);
         if (!cloudinaryResult) {
            return res
               .status(500)
               .json({ message: "Failed to upload new image" });
         }
         updates.image = cloudinaryResult.secure_url;
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, {
         new: true,
      });
      res.json(updatedRecipe);
   } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Server error updating recipe" });
   }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      const recipe = await Recipe.findById(id);
      if (!recipe) {
         return res.status(404).json({ message: "Recipe not found" });
      }

      // Optional: enforce author ownership
      if (recipe.author !== req.user.id) {
         return res.status(403).json({ message: "Forbidden: Not the author" });
      }

      // Delete image from Cloudinary if exists
      if (recipe.image) {
         await deleteFromCloudinary("foodie", recipe.image);
      }

      await Recipe.findByIdAndDelete(id);
      res.json({ message: "Recipe deleted successfully" });
   } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ message: "Server error deleting recipe" });
   }
};

// Like a recipe
const likeRecipe = async (req, res) => {
   try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const recipeId = req.params.id;
      if (user.likedRecipes.includes(recipeId)) {
         user.likedRecipes.pull(recipeId);
         await user.save();
         return res.json({ liked: false });
      } else {
         user.likedRecipes.push(recipeId);
         await user.save();
         return res.json({ liked: true });
      }
   } catch (err) {
      res.status(500).json({ message: "Error liking recipe" });
   }
};

// Save a recipe
const saveRecipe = async (req, res) => {
   try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const recipeId = req.params.id;
      if (user.savedRecipes.includes(recipeId)) {
         user.savedRecipes.pull(recipeId);
         await user.save();
         return res.json({ saved: false });
      } else {
         user.savedRecipes.push(recipeId);
         await user.save();
         return res.json({ saved: true });
      }
   } catch (err) {
      res.status(500).json({ message: "Error saving recipe" });
   }
};

// Comment on a recipe
const commentOnRecipe = async (req, res) => {
   try {
      const { id } = req.params;
      const { comment } = req.body;

      if (!comment || comment.trim() === "") {
         return res.status(400).json({ message: "Comment cannot be empty" });
      }

      const recipe = await Recipe.findById(id);
      if (!recipe) {
         return res.status(404).json({ message: "Recipe not found" });
      }

      const newComment = {
         user: req.user._id,
         content: comment.trim(),
         datePosted: new Date(),
      };

      recipe.comments.push(newComment);
      await recipe.save();

      res.status(201).json(newComment);
   } catch (error) {
      console.error("Error commenting on recipe:", error);
      res.status(500).json({ message: "Server error commenting on recipe" });
   }
};

module.exports = {
   createRecipe,
   getAllRecipes,
   getRecipeById,
   updateRecipe,
   deleteRecipe,
   likeRecipe,
   saveRecipe,
   commentOnRecipe,
};
