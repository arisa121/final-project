import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import LoginOrRegister from "../../../assets/LoginOrRegister.jpg"
const Login = () => {
  const [loading, setLoading] = useState(false);
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
      // ✅ Login with Firebase (works for all roles)
      const result = await signInUser(data.email, data.password);

      console.log("Login successful:", result);

      // Success message
      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ Navigate based on role
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
    <div className=" container-responsive min-h-screen flex items-center justify-between px-16">
      {/* LEFT FORM */}
      <div className="w-1/2 pr-10">
        <h1 className="text-4xl font-bold mb-3">Log In</h1>
        <p className="text-gray-600 mb-8">
          Enter your personal details and start journey with us.
        </p>

        <form onSubmit={handleSubmit(handleLogIn)} className="space-y-5">
          {/* Email */}
          <div className="grid grid-cols-2 gap-4">
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-0"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

        <p className="mt-5 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="w-1/2 flex justify-center">
        <img src={LoginOrRegister} className="w-full h-full" alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
