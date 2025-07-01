import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import '../../App.css';

function Login() {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const firstCap = /^[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return minLength && firstCap && hasNumber;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must start with a capital letter, contain a number, and be at least 6 characters long.");
      return;
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginInfo),
      });

      if (response.ok) {
        const data = await response.json();
        const { jwtToken, name } = data;
        toast.success("Login successful!");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("LoggedinUser", name);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const err = await response.json();
        toast.error(err?.error[0]?.message || "Login failed!");
      }
    } catch (err) {
      toast.error("Network error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center font-body bg-[#fdfbf6]">
<div className="w-1/2 hidden md:flex relative">
  <img
    src="https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop&q=80"
    alt="Cookbook"
    className="object-cover w-full h-screen"
  />

  {/* Overlay at bottom center */}
  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
    <p className="text-2xl font-semibold text-white font-headings mb-1">Don’t have an account?</p>
    <div
      className="book-flip cursor-pointer hover:scale-110 transition"
      onClick={() => navigate("/signup")}
    >
      <img src="/arrow.png" alt="Flip Book" className="w-10 m-auto" />
    </div>
  </div>
</div>


      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-headings font-bold text-center text-[#ff4d00]">
            Welcome Back
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={LoginInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={LoginInfo.password}
                onChange={handleChange}
                placeholder="Password (Cap + Number + 6 char)"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff4d00] hover:bg-orange-600 text-white p-2 rounded-md"
            >
              Login
            </button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                toast.success("Google login triggered");
                // Add logic here
              }}
              onError={() => toast.error("Google Login Failed")}
            />
            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#ff4d00] font-medium">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
