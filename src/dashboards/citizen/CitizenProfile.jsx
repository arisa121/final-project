import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const CitizenProfile = () => {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => (await axiosSecure.get("/api/auth/me")).data,
  });
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const update = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.patch("/api/auth/me", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth-me"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Profile updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update profile.",
      });
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/api/payments/subscribe", {
        amount: 1000,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["auth-me"]);
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        html: `
        <div class="text-left">
            <p class="mb-2">Your premium subscription is now active!</p>
            <ul class="list-disc list-inside text-sm text-gray-600">
              <li>Unlimited issue reports</li>
              <li>Priority support</li>
              <li>Exclusive features</li>
            </ul>
            <p class="mt-3 text-sm">Transaction ID: <strong>${data.payment.txnId}</strong></p>
          </div>
        `,
        confirmButtonText: "Awesome!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          error.response?.data?.message || "Failed to process subscription.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-10">
        <div className="alert alert-error">
          <span className="text-sm sm:text-base">
            Error: {error?.message || "Failed to load profile"}
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 sm:p-6 lg:p-10">
        <div className="alert alert-warning">
          <span className="text-sm sm:text-base">
            User data not available. Please login again.
          </span>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name cannot be empty!",
      });
      return;
    }
    update.mutate({ name });
    setEditing(false);
  };

  const handleSubscribe = () => {
    Swal.fire({
      title: "Subscribe to Premium?",
      text: "You will be charged 1000 BDT",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Subscribe!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        subscribeMutation.mutate();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
        My Profile
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
            {/* Profile Image */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <img
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                {user?.isPremium && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl flex items-center justify-center gap-2 flex-wrap">
                {user?.name || "Unknown User"}
                {user?.isPremium && (
                  <span className="badge badge-warning gap-1 text-xs sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    Premium
                  </span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 break-all px-2">
                {user?.email}
              </p>
            </div>

            {/* Blocked Warning */}
            {user?.isBlocked && (
              <div className="alert alert-error mb-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your account is blocked. Contact admin.</span>
              </div>
            )}

            {/* Edit Form */}
            {editing ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm sm:text-base">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex gap-2 justify-end flex-wrap">
                  <button
                    className="btn btn-ghost btn-sm sm:btn-md"
                    onClick={() => setEditing(false)}
                    disabled={update.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-sm sm:btn-md"
                    onClick={handleSave}
                    disabled={update.isPending}
                  >
                    {update.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-outline btn-primary w-full btn-sm sm:btn-md"
                onClick={() => {
                  setName(user?.name || "");
                  setEditing(true);
                }}
                disabled={user?.isBlocked}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span className="text-sm sm:text-base">Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Premium Subscription Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-full">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Subscription</h3>

            {user?.isPremium ? (
              <div className="space-y-4">
                <div className="alert alert-success text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">
                      Premium Member
                    </h3>
                    <div className="text-xs">
                      Unlimited access to all features!
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">
                    Premium Benefits:
                  </h4>
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-700">
                    <li>✓ Unlimited issue reports</li>
                    <li>✓ Priority support</li>
                    <li>✓ Exclusive features</li>
                    <li>✓ Advanced analytics</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm sm:text-base mb-2">
                    Upgrade to Premium
                  </h4>
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-700 mb-3">
                    <li>✓ Unlimited issue reports</li>
                    <li>✓ Priority support</li>
                    <li>✓ Exclusive features</li>
                    <li>✓ Advanced analytics</li>
                  </ul>
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600">
                    ৳1,000
                  </div>
                </div>

                <button
                  onClick={handleSubscribe}
                  className="btn btn-warning w-full gap-2 btn-sm sm:btn-md"
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <span className="text-sm sm:text-base">
                        Subscribe Now
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;