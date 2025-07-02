import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeFormModal from "./RecipeFormModal"; 
import RecipeCard from "../RecipeCard";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/dashboard`;
      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const result = await response.json();
          console.log("Dashboard Data:", result);
        setDashboardData(result);
      } else {
        toast.error("Failed to fetch dashboard data");
      }
    } catch (err) {
      toast.error(`Error occurred: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedinUser");
    toast.success("Logout successful!");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (!dashboardData) return <div className="p-10">Loading...</div>;

  const {
    name,
    email,
    avatar,
    bio,
    location = {},
    favoriteCuisines,
    uploadedRecipes,
    savedRecipes,
  } = dashboardData;

  const city = location?.city || "Unknown";
const country = location?.country || "Unknown";

  return (
    <div className="min-h-screen bg-[#fdfbf6] font-body px-6 py-10 space-y-12">
      {/* Create Recipe Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#ff4d00] hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          + Create Recipe
        </button>
      </div>
      <section className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-orange-300 shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#ff4d00]">{name}</h2>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm italic text-gray-500">{bio}</p>
            <p className="text-sm mt-1">
              📍 {city || "Unknown"}, {country || "Unknown"}
            </p>
            <p className="text-sm mt-1 text-orange-600">
              Favorite Cuisines: {favoriteCuisines?.join(", ")}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 md:mt-0 px-5 py-2 bg-[#ff4d00] text-white rounded hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </section>

      {/* Section 2: Uploaded Recipes */}
      <section>
        <h3 className="text-xl font-headings font-semibold mb-4 text-[#ff4d00]">
          Uploaded Recipes
        </h3>
        {uploadedRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadedRecipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No uploaded recipes yet.</p>
        )}
      </section>

      {/* Section 3: Saved Recipes */}
      <section>
        <h3 className="text-xl font-headings font-semibold mb-4 text-[#ff4d00]">
          Saved Recipes
        </h3>
        {savedRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedRecipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No saved recipes yet.</p>
        )}
      </section>

      {/* Section 4: Liked Recipes */}
      <section>
        <h3 className="text-xl font-headings font-semibold mb-4 text-[#ff4d00]">
          Liked Recipes
        </h3>
        {dashboardData?.likedRecipes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dashboardData.likedRecipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No liked recipes yet.</p>
        )}
      </section>


      {/* Modal for Recipe Form */}
      <RecipeFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
