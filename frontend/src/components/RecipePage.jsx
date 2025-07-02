import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
   FaThumbsUp,
   FaRegThumbsUp,
   FaBookmark,
   FaRegBookmark,
   FaEdit,
   FaTrash,
} from "react-icons/fa";

function RecipePage() {
   const { id } = useParams();
   const navigate = useNavigate();

   const [recipe, setRecipe] = useState(null);
   const [liked, setLiked] = useState(false);
   const [saved, setSaved] = useState(false);
   const [comment, setComment] = useState("");
   const [isAuthor, setIsAuthor] = useState(false);
   const [user, setUser] = useState(null);

   const token = localStorage.getItem("token");
   const userId = localStorage.getItem("LoggedinUser");

   // LOAD USER + RECIPE ONCE
   useEffect(() => {
      const fetchData = async () => {
         try {
            const recipeRes = await fetch(
               `${import.meta.env.VITE_SERVER_URL}/recipes/${id}`
            );
            if (!recipeRes.ok) throw new Error("Failed to fetch recipe");
            const recipeData = await recipeRes.json();

            setRecipe(recipeData);

            if (
               userId &&
               recipeData.author &&
               recipeData.author._id === userId
            ) {
               setIsAuthor(true);
            }

            if (token) {
               const userRes = await fetch(
                  `${import.meta.env.VITE_SERVER_URL}/auth/me`,
                  { headers: { Authorization: token } }
               );
               if (userRes.ok) {
                  const userData = await userRes.json();
                  setUser(userData);
                  setLiked(userData.likedRecipes.includes(recipeData._id));
                  setSaved(userData.savedRecipes.includes(recipeData._id));
               }
            }
         } catch (err) {
            console.error(err);
            toast.error("Error loading recipe.");
         }
      };

      fetchData();
   }, [id, token]);

   // LIKE / SAVE ACTIONS
   const handleLike = async () => {
      if (!token) {
         toast.error("Please login to like");
         return;
      }

      try {
         const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/recipes/${id}/like`,
            {
               method: "POST",
               headers: { Authorization: token },
            }
         );

         if (res.ok) {
            setLiked((prev) => !prev);
         } else {
            toast.error("Error liking recipe.");
         }
      } catch {
         toast.error("Error liking recipe.");
      }
   };

   const handleSave = async () => {
      if (!token) {
         toast.error("Please login to save");
         return;
      }

      try {
         const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/recipes/${id}/save`,
            {
               method: "POST",
               headers: { Authorization: token },
            }
         );

         if (res.ok) {
            setSaved((prev) => !prev);
         } else {
            toast.error("Error saving recipe.");
         }
      } catch {
         toast.error("Error saving recipe.");
      }
   };

   // COMMENT ACTION
   const handleComment = async () => {
      if (!comment.trim()) {
         toast.error("Comment cannot be empty");
         return;
      }

      try {
         const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/recipes/${id}/comment`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
               },
               body: JSON.stringify({ comment: comment.trim() }),
            }
         );

         const result = await res.json();

         if (res.ok) {
            toast.success("Comment added!");
            setComment("");
            setRecipe((prev) => ({
               ...prev,
               comments: [...prev.comments, result],
            }));
         } else {
            toast.error(result.message || "Error adding comment");
         }
      } catch (err) {
         toast.error("Error adding comment");
      }
   };

   // UPDATE / DELETE
   const handleDelete = async () => {
      if (!window.confirm("Are you sure you want to delete this recipe?"))
         return;

      try {
         const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/recipes/${id}`,
            {
               method: "DELETE",
               headers: { Authorization: token },
            }
         );

         if (res.ok) {
            toast.success("Recipe deleted");
            navigate("/recipes");
         } else {
            const result = await res.json();
            toast.error(result.message || "Failed to delete");
         }
      } catch (err) {
         toast.error("Error deleting recipe");
      }
   };

   const handleUpdate = () => {
      // Navigate to an edit page you create separately:
      navigate(`/recipes/${id}/edit`);
   };

   if (!recipe)
      return <div className="p-10 text-center text-lg">Loading...</div>;

   return (
      <div className="min-h-screen bg-[#fff9f4] font-body px-4 sm:px-6 md:px-10 py-10">
         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
            <img
               src={recipe.image}
               alt={recipe.name}
               className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
            />

            <div className="flex justify-between items-center mb-4">
               <h1 className="text-3xl sm:text-4xl font-bold text-[#ff4d00]">
                  {recipe.name}
               </h1>
               {isAuthor ? (
                  <div className="flex gap-2">
                     <button
                        onClick={handleUpdate}
                        className="p-2 rounded-full bg-yellow-500 text-white hover:opacity-90 transition"
                        title="Edit"
                     >
                        <FaEdit />
                     </button>
                     <button
                        onClick={handleDelete}
                        className="p-2 rounded-full bg-red-600 text-white hover:opacity-90 transition"
                        title="Delete"
                     >
                        <FaTrash />
                     </button>
                  </div>
               ) : null}
            </div>

            <p className="text-gray-700 mb-6 text-base sm:text-lg">
               {recipe.description}
            </p>

            <div className="flex gap-3 mb-6">
               <button
                  onClick={handleLike}
                  className={`p-2 rounded-full text-white ${
                     liked ? "bg-green-600" : "bg-gray-400"
                  } hover:opacity-90 transition`}
                  title={liked ? "Unlike" : "Like"}
               >
                  {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
               </button>

               <button
                  onClick={handleSave}
                  className={`p-2 rounded-full text-white ${
                     saved ? "bg-blue-600" : "bg-gray-400"
                  } hover:opacity-90 transition`}
                  title={saved ? "Unsave" : "Save"}
               >
                  {saved ? <FaBookmark /> : <FaRegBookmark />}
               </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-700 mb-6">
               <span>🕒 Cooking: {recipe.cookingTime} min</span>
               <span>⏱️ Prep: {recipe.preparationTime} min</span>
               <span>🍽️ Servings: {recipe.servings}</span>
               <span>🌎 Cuisine: {recipe.cuisine}</span>
               <span>⚡ Difficulty: {recipe.difficultyLevel}</span>
               {recipe.tags?.length > 0 && recipe.tags[0] !== "[]" && (
                  <span>🏷️ Tags: {recipe.tags.join(", ")}</span>
               )}
            </div>

            <h2 className="text-2xl font-semibold text-[#ff4d00] mb-3">
               Ingredients
            </h2>
            <ul className="list-disc pl-6 mb-6 space-y-1">
               {recipe.ingredients?.map((ing, idx) => (
                  <li key={idx}>
                     <span className="font-medium">{ing.quantity}</span>{" "}
                     {ing.name}
                  </li>
               ))}
            </ul>

            <h2 className="text-2xl font-semibold text-[#ff4d00] mb-3">
               Instructions
            </h2>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
               {recipe.instructions?.map((step, idx) => (
                  <li key={idx}>{step}</li>
               ))}
            </ol>

            <h2 className="text-2xl font-semibold text-[#ff4d00] mb-3">
               Nutrition Info
            </h2>
            <ul className="list-disc pl-6 mb-6">
               <li>Calories: {recipe.nutritionInfo?.calories}</li>
               <li>Protein: {recipe.nutritionInfo?.protein}</li>
               <li>Carbs: {recipe.nutritionInfo?.carbs}</li>
               <li>Fats: {recipe.nutritionInfo?.fats}</li>
            </ul>

            <div className="text-sm text-gray-500 mt-4">
               <p>Posted by: {recipe.author?.name}</p>
               <p>
                  Posted on: {new Date(recipe.datePosted).toLocaleDateString()}
               </p>
            </div>

            <div className="mt-10">
               <h2 className="text-2xl font-semibold text-[#ff4d00] mb-3">
                  Comments
               </h2>
               <div className="space-y-3">
                  {recipe.comments && recipe.comments.length > 0 ? (
                     recipe.comments.map((c) => (
                        <div key={c._id} className="border p-2 rounded mb-2">
                           <p className="text-sm">{c.content}</p>
                           <p className="text-xs text-gray-500">
                              Posted on{" "}
                              {new Date(c.datePosted).toLocaleDateString()}
                           </p>
                        </div>
                     ))
                  ) : (
                     <p className="text-gray-500">No comments yet.</p>
                  )}
               </div>
               <div className="mt-4 flex gap-2">
                  <input
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                     placeholder="Write a comment..."
                  />
                  <button
                     onClick={handleComment}
                     className="px-4 py-2 bg-[#ff4d00] text-white rounded hover:bg-orange-600 transition"
                  >
                     Post
                  </button>
               </div>
            </div>

            <Link
               to="/recipes"
               className="inline-block mt-8 px-5 py-2 bg-[#ff4d00] text-white rounded-full hover:bg-orange-600 transition"
            >
               Back to Recipes
            </Link>
         </div>

         <ToastContainer />
      </div>
   );
}

export default RecipePage;
