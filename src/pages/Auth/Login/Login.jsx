import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import axiosSecure from "../../../api/axiosSecure";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const handleLogIn = async (data) => {
    setLoading(true);

    try {
      // Login with Firebase (works for all roles)
      const result = await signInUser(data.email, data.password);

      console.log("Login successful:", result);
      const { email, uid, displayName, photoURL } = result.user;
      // Backend sync
      await axiosSecure.post(
        "https://final-project-server-side-pi.vercel.app/api/auth/register-or-login",
        {
          email,
          uid,
          name: displayName,
          photo: photoURL,
        }
      );
      // Success message
      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate based on role
      const userRole = result.user.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "staff") {
        navigate("/staff");
      } else {
        navigate("/citizen");
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Invalid email or password";

      // Firebase errors
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Account has been disabled";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
          Log In
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter your personal details and start journey with us.
        </p>

        <form onSubmit={handleSubmit(handleLogIn)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />

            {/* Show / Hide Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500"
            >
              {showPassword ? (
                // Eye Off
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.963 9.963 0 012.929-7.071M9.88 9.88a3 3 0 104.24 4.24M15 12a3 3 0 00-3-3M3 3l18 18"
                  />
                </svg>
              ) : (
                // Eye
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="divider my-6">OR</div>

        {/* Google Sign-in */}
        <SocialLogin />

        <p className="mt-5 text-gray-700 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
