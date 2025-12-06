import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
const SocialLogin = () => {
    return (
        
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
    );
};

export default SocialLogin;