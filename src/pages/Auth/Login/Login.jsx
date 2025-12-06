
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";

const Login = () => {
  
  const { signInUser } = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm();
  

  const handleLogIn = (data) => {
    console.log(data)
    signInUser(data.email, data.password)
      .then(result => {
      console.log(result.user);
      })
      .catch(error => {
      console.log(error);
    })
    
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl w-full max-w-md p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <Link
            to="/register"
            className="px-6 py-2 rounded-l-xl bg-gray-200 hover:bg-gray-300"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 rounded-r-xl bg-black text-white"
          >
            Sign in
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
          <label className="input input-bordered w-full flex items-center gap-2">
            <span className="text-gray-500">
              <MdOutlineMail />
            </span>
            <input
              type="email"
              {...register("email", { required: true })}
              className="grow"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500" role="alert">
                Email is required
              </p>
            )}
          </label>

          <label className="input input-bordered w-full flex items-center gap-2">
            <span className="text-gray-500">
              <TbLockPassword />
            </span>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                  message:
                    "Password must contain uppercase, lowercase ,a symbol & min 6 charecters",
                },
              })}
              className="grow flex flex-col"
              placeholder="Password"
            />
            {errors.password && (
              <div className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded">
                {errors.password.message}
              </div>
            )}
          </label>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span>Remember me</span>
            </label>

            <a className="link text-sm">Forgot password?</a>
          </div>

          <button className="btn btn-neutral w-full text-white">Sign in</button>
        </form>

        <p className="text-center text-gray-500 my-4">or sign in with</p>

        {/* Social */}
        <div className="grid grid-cols-3 gap-4">
          <button className="btn">
            <FcGoogle className="text-xl" />
          </button>
          <button className="btn">
            <FaApple className="text-xl" />
          </button>
          <button className="btn">
            <FaGithub className="text-xl" />
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link className="link" to="/register">
            <span className="text-blue-600">Create Account</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
