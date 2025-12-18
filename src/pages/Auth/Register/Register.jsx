import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  // Watch password for confirmation validation
  const password = watch("password");

  const handleRegisterUser = async (data) => {
    console.log("Registration attempt:", data.email);
    setLoading(true);

    try {
      // Register with Firebase + Backend sync
      const result = await registerUser(
        data.email,
        data.password,
        data.firstName,
        data.photo
      );

      console.log("Registration successful:", result.user);

      Swal.fire({
        title: "Success!",
        text: "You have registered successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      //  Navigate to dashboard (citizens default to /dashboard)
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      // Firebase errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Use at least 6 characters.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Email/password accounts are not enabled";
      } else if (error.response?.data?.message) {
        // Backend errors
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
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
          Sign Up
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Create your account and start your journey with us.
        </p>

        <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("firstName", {
                required: "Full Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

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

          <div>
            <input
              type="url"
              placeholder="Photo URL"
              {...register("photo", { required: "Photo URL is required" })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500"
            >
              {showPassword ? (
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
                    d="M3 3l18 18M10.73 10.73a3 3 0 104.24 4.24"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.88 9.88L15 15M2.458 12C3.732 7.943 7.523 5 12 5c1.2 0 2.35.207 3.41.588"
                  />
                </svg>
              ) : (
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
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500"
            >
              {showConfirmPassword ? (
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
                    d="M3 3l18 18M10.73 10.73a3 3 0 104.24 4.24"
                  />
                </svg>
              ) : (
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="divider my-6">OR</div>
        <SocialLogin />

        <p className="mt-5 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-400 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
