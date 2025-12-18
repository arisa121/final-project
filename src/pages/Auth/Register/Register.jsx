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
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  // Watch password for confirmation validation
  const password = watch("password");

  const handleRegisterUser = async (data) => {
    console.log("Registration attempt:", data.email);
    setLoading(true);

    try {
      // ✅ Register with Firebase + Backend sync
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

      // ✅ Navigate to dashboard (citizens default to /dashboard)
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
    <div className="container-responsive min-h-screen flex items-center justify-between px-16">
      {/* LEFT FORM */}
      <div className="w-1/2 pr-10">
        <h1 className="text-4xl font-bold mb-3">Sign Up</h1>
        <p className="text-gray-600 mb-8">
          Create your account and start your journey with us.
        </p>

        <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("firstName", {
                required: "Full Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <input
              type="url"
              placeholder="Photo URL"
              {...register("photo", {
                required: "Photo URL is required",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                  message: "Invalid image URL",
                },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])/,
                  message:
                    "Password must contain uppercase and lowercase letters",
                },
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="divider my-6">OR</div>

        {/* Google Sign-in */}
        <SocialLogin />

        <p className="mt-5 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-400 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="w-1/2 flex justify-center">
        <img
          src="/signup-illustration.png"
          className="w-4/5"
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
};

export default Register;
