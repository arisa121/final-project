
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  
  const { signInUser } = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate()

  const handleLogIn = (data) => {
    console.log(data)
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully.",
          icon: "success"
        });
        navigate("/");
      })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-between px-16">
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
          {/* Passwor*/}
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
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
          >
            Log In
          </button>
        </form>
        <div className="divide-accent">
          OR
        </div>
        <SocialLogin></SocialLogin>

        <p className="mt-5 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/register"
            className="text-teal-500 font-semibold cursor-pointer"
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

export default Login;
