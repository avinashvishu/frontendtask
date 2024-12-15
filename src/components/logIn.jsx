import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigation = useNavigate();

  const handleNavigateUser = (route) => {
    navigation(route);
  };

  // Regex validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePostRequest = async () => {
    setIsLoading(true);
    setEmailError(false);
    setPasswordError(false);

    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/loginUser`,
        requestData
      );
      console.log("Response:", response.data);
      setIsLoading(false);
      toast.success(response?.data?.message || "Successfully Submitted!");
      navigation("/login");
    } catch (err) {
      setIsLoading(false);
      console.log(err)
      // Improved error handling with toast
      toast.error(err?.response?.data?.errorMessage  || "Something went wrong!");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError(false);
    setPasswordError(false);

    // Validation
    let isValid = true;

    if (!email) {
      setEmailError(true);
      toast.error("Email is required!");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Please enter a valid email address!");
      isValid = false;
    }

    if (!password) {
      setPasswordError(true);
      toast.error("Password is required!");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(true);
      toast.error(
        "Password must be at least 8 characters, include 1 letter and 1 number!"
      );
      isValid = false;
    }

    if (isValid) {
      handlePostRequest();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
        {/* Branding */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-extrabold">LOGO</span>
        </div>

        {/* Form */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-12">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Please login to your account
        </p>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div
              className={`flex items-center border p-3 mt-2 rounded-lg transition-all duration-200 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <AiOutlineMail className="text-gray-500 text-xl mr-3" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none text-gray-700 text-sm bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                {email
                  ? "Please enter a valid email address."
                  : "Email is required."}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div
              className={`flex items-center border p-3 mt-2 rounded-lg transition-all duration-200 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <AiOutlineLock className="text-gray-500 text-xl mr-3" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none text-gray-700 text-sm bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="text-gray-500 ml-3 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                {password
                  ? "Password must be at least 8 characters, include 1 letter and 1 number."
                  : "Password is required."}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end items-center mb-6">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
          >
            LOGIN
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <div
            onClick={() => handleNavigateUser("/signup")}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </div>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
