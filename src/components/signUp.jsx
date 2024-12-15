import  { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const navigation = useNavigate();

  const handleNavigateUser = (route) => {
    navigation(route);
  };

  const handlePostRequest = async () => {
    setIsLoading(true);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNameError(false);

    const requestData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        requestData
      );
      console.log("Response:", response.data);
      setIsLoading(false);
      toast.success(response?.data?.message || "Succesfully Submitted!");
      navigation("/login");
    } catch (err) {
      setIsLoading(false);

      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message || "Something went wrong!");
      }
      console.error("Error:", err);
      // setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNameError(false);

    let isValid = true;

    if (!name) {
      setNameError(true);
      toast.error("Name is required!");
      isValid = false;
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      toast.error("Passwords do not match!");
      isValid = false;
    }

    if (isValid) {
      handlePostRequest();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-extrabold">LOGO</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mt-12">
          Create an Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Please fill in the form to create a new account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div
              className={`flex items-center border p-3 mt-2 rounded-lg transition-all duration-200 ${
                nameError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full outline-none text-gray-700 text-sm bg-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {nameError && (
              <p className="text-red-500 text-xs mt-1">Name is required.</p>
            )}
          </div>

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

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div
              className={`flex items-center border p-3 mt-2 rounded-lg transition-all duration-200 ${
                confirmPasswordError ? "border-red-500" : "border-gray-300"
              }`}
            >
              <AiOutlineLock className="text-gray-500 text-xl mr-3" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full outline-none text-gray-700 text-sm bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
          >
            {isLoading ? "Submitting..." : "SIGNUP"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <div
            onClick={() => handleNavigateUser("/login")}
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </div>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
