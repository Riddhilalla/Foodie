import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RecipesPage() {
   const [recipes, setRecipes] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchRecipes = async () => {
      try {
         const url = `${import.meta.env.VITE_SERVER_URL}/recipes`;
         const res = await fetch(url);
         if (res.status === 200) {
            const data = await res.json();
            setRecipes(data);
         } else {
            toast.error(data.message || "Failed to fetch recipes");
         }
      } catch (err) {
         toast.error("Error fetching recipes");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRecipes();
   }, []);

   if (loading) {
      return <div className="p-10 text-center text-lg">Loading recipes...</div>;
   }

   return (
      <div className="min-h-screen bg-[#fff9f4] font-body px-4 sm:px-6 md:px-10 py-10">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#ff4d00] mb-10">
               Explore Delicious Recipes
            </h1>

            {recipes?.length === 0 ? (
               <div className="text-center text-gray-600 text-lg">
                  No recipes found.
               </div>
            ) : (
               <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {recipes?.map((recipe) => (
                     <Link
                        to={`/recipe/${recipe._id}`}
                        key={recipe._id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col"
                     >
                        <img
                           src={recipe.image}
                           alt={recipe.name}
                           className="h-48 w-full object-cover rounded-t-2xl"
                        />
                        <div className="flex-grow p-4 flex flex-col justify-between">
                           <h2 className="text-lg font-semibold text-[#ff4d00] mb-2">
                              {recipe.name}
                           </h2>
                           <p className="text-sm text-gray-600 flex-grow">
                              {recipe.description?.slice(0, 80)}...
                           </p>
                           <button className="mt-4 inline-block px-3 py-1 bg-[#ff4d00] text-white rounded-full text-xs hover:bg-orange-600 transition">
                              View Recipe
                           </button>
                        </div>
                     </Link>
                  ))}
               </div>
            )}
         </div>

         <ToastContainer />
      </div>
   );
}

export default RecipesPage;
