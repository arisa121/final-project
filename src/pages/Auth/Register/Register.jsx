

import { Link } from "react-router";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";


const Register = () => {
  const {register,formState:{errors},handleSubmit } = useForm();

  const { registerUser } = useAuth();
  const handleRegisterUser = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
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
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl w-full max-w-xl p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <Link
            to="/register"
            className="px-6 py-2 rounded-l-xl bg-black text-white"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 rounded-r-xl bg-gray-200 hover:bg-gray-300"
          >
            Sign in
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Create an account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="input input-bordered w-full"
            />
          </div>

          <label className="input input-bordered w-full flex items-center gap-2">
            <span className="text-gray-500">
              <MdOutlineMail />
            </span>
            <input
              type="email"
              className="grow"
              placeholder="Your email"
              {...register("email", { required: true })}
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
              className="grow"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox" />
            <span>Sign up for newsletter</span>
          </label>

          <button className="btn btn-neutral w-full text-white">
            Create an account
          </button>
        </form>

        <p className="text-center text-gray-500 my-4">or sign in with</p>

       

        <p className="text-center text-sm mt-6 text-gray-600">
          By creating an account, you agree to our{" "}
          <a className="link">Terms & Service</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
