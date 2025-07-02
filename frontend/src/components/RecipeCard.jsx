import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
   return (
      <Link
         to={`/recipe/${recipe._id}`}
         className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
      >
         <img
            src={recipe.image}
            alt={recipe.name}
            className="h-56 w-full object-cover transform group-hover:scale-105 transition duration-300"
         />
         <div className="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 w-full">
            <h4 className="text-lg font-bold text-white">{recipe.name}</h4>
            <p className="text-sm text-gray-200 line-clamp-2">
               {recipe.description || "No description available"}
            </p>
         </div>
      </Link>
   );
}

export default RecipeCard;
