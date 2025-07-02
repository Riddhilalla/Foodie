import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const avatarOptions = [
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Max",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Charlie",
];

const cities = ["Mumbai", "Delhi", "Bangalore"];
const countries = ["India", "USA", "UK"];

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    bio: "",
    city: "",
    country: "",
    favoriteCuisines: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      favoriteCuisines: value.split(",").map((c) => c.trim()),
    }));
  };

  const validatePassword = (password) => {
    const firstChar = password.charAt(0);
    const hasUpper = firstChar === firstChar.toUpperCase();
    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    return hasUpper && hasMinLength && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password } = formData;
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters, start with a capital letter and contain a number."
      );
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const error = await response.json();
        toast.error(error.error[0]?.message || "Signup failed");
      }
    } catch (err) {
      toast.error(`Error occurred: ${err.message}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdfbf6] font-body">
      {/* Left: Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 p-10 flex flex-col justify-center"
      >
        <h1 className="text-4xl font-bold text-[#ff4d00] mb-6 font-headings">Create Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded shadow-sm"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded shadow-sm"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-3 rounded shadow-sm"
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex gap-4 justify-around">
                {avatarOptions.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt={`Avatar ${idx}`}
                    className={`w-16 h-16 rounded-full border-4 cursor-pointer ${
                      formData.avatar === avatar ? "border-[#ff4d00]" : "border-transparent"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, avatar }))}
                  />
                ))}
              </div>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short bio (max 200 characters)"
                className="w-full border p-3 rounded shadow-sm"
                maxLength={200}
              ></textarea>
              <input
                type="text"
                name="favoriteCuisines"
                placeholder="Favorite cuisines (comma separated)"
                onChange={handleCuisineChange}
                className="w-full border p-3 rounded shadow-sm"
              />
            </>
          )}

          {step === 3 && (
            <>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-3 rounded shadow-sm"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-3 rounded shadow-sm"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-[#ff4d00] hover:bg-[#e54300] text-white p-3 rounded font-semibold"
              >
                Submit
              </button>
            </>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-white font-body font-medium px-4 py-2 bg-btnColor border-none rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="text-white font-medium px-4 py-2 bg-btnColor border-none rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-[#ff4d00] font-medium">Login</Link>
          </p>
        </form>
        <ToastContainer />
      </motion.div>

      
      <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  className="hidden md:flex w-1/2 bg-cover bg-center relative shadow-inner"
  style={{
    backgroundImage:
      'url(https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGZvb2R8ZW58MHx8MHx8fDA%3D)',
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
    <p className="text-2xl font-bold font-headings mb-4">Already have an account?</p>
    <div
      className="book-flip cursor-pointer hover:scale-110 transition"
      onClick={() => navigate("/login")}
    >
      <img src="/right-arrow.png" alt="arrow"  className="w-10" />
      
    </div>
  </div>
</motion.div>

    </div>
  );
};

export default Signup;