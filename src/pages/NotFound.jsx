import React from "react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6 text-center">
      <div className="flex items-center justify-center relative">
        <h1 className="text-8xl font-bold text-primary">4</h1>
        <div className="mx-4">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20"></div>
            <div className="absolute w-32 h-32 rounded-full bg-base-100 flex items-center justify-center border-4 border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-20 h-20 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 10 5.65 5.65a7.5 7.5 0 0011 11z"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="text-8xl font-bold text-primary">4</h1>
      </div>

      <h2 className="text-3xl font-bold mt-8">Oops! This Page is Not Found.</h2>
      <p className="mt-2 text-gray-600">The requested page does not exist.</p>

      <Link to="/" className="btn btn-primary mt-6 rounded-full px-8">
        Back to Home
      </Link>
    </div>
  );
}
