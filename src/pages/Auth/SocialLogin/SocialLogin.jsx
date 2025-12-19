import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axiosSecure from "../../../api/axiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Google Sign-In (works for all roles)
      const result = await signInGoogle();

      console.log("Google sign-in successful:", result);
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

      Swal.fire({
        title: "Success!",
        text: "Logged in successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate based on role
      const userRole = result.user.role;

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);

      let errorMessage = "Google sign-in failed. Please try again.";

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in cancelled";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked. Please allow popups for this site.";
      } else if (error.code === "auth/cancelled-popup-request") {
        errorMessage = "Sign-in cancelled";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 bg-white text-black hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Signing in...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Login with Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;