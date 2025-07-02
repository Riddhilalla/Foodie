const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const ensureAuthenticated = require("../middlewares/Auth");
const recipeController = require("../controllers/recipecontroller");

router.post(
   "/",
   ensureAuthenticated,
   upload.single("image"),
   recipeController.createRecipe
);
router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.put(
   "/:id",
   ensureAuthenticated,
   upload.single("image"),
   recipeController.updateRecipe
);
router.post("/:id/like", ensureAuthenticated, recipeController.likeRecipe);
router.post("/:id/save", ensureAuthenticated, recipeController.saveRecipe);
router.post(
   "/:id/comment",
   ensureAuthenticated,
   recipeController.commentOnRecipe
);
router.delete("/:id", ensureAuthenticated, recipeController.deleteRecipe);

module.exports = router;
