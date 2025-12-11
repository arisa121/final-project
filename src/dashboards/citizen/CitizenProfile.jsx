// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axiosSecure from "../../api/axiosSecure";

// const CitizenProfile = () => {
//   const qc = useQueryClient();
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["auth-me"],
//     queryFn: async () => (await axiosSecure.get("/auth/me")).data,
//   });
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("");

//   const update = useMutation({
//     mutationFn: async (payload) => {
//       const res = await axiosSecure.patch("/auth/me", payload);
//       return res.data;
//     },
//     onSuccess: () => qc.invalidateQueries(["auth-me"]),
//   });

//   const subscribeMutation = useMutation({
//     mutationFn: async () => {
//       // ideally integrate payment gateway
//       // mock: call server endpoint to mark premium after payment success
//       const res = await axiosSecure.post("/payments/subscribe", {
//         amount: 1000,
//       });
//       return res.data;
//     },
//     onSuccess: () => qc.invalidateQueries(["auth-me"]),
//   });

//   if (isLoading) return <p>Loading...</p>;

//   const handleSave = () => {
//     update.mutate({ name });
//     setEditing(false);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//       <div className="bg-white p-4 rounded shadow max-w-md">
//         <img
//           src={user.photoURL}
//           alt="avatar"
//           className="w-24 h-24 rounded-full mb-2"
//         />
//         <div className="font-bold text-xl">
//           {user.name}{" "}
//           {user.isPremium && (
//             <span className="text-sm bg-yellow-200 px-2 rounded ml-2">
//               Premium
//             </span>
//           )}
//         </div>
//         <div className="text-sm text-gray-500">{user.email}</div>
//         {user.isBlocked && (
//           <div className="bg-red-100 p-2 rounded mt-2">
//             Your account is blocked. Contact admin.
//           </div>
//         )}

//         {editing ? (
//           <div className="mt-3">
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="input w-full mb-2"
//             />
//             <div className="flex gap-2 justify-end">
//               <button className="btn" onClick={() => setEditing(false)}>
//                 Cancel
//               </button>
//               <button className="btn-primary" onClick={handleSave}>
//                 Save
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-3 flex gap-2">
//             <button
//               className="btn"
//               onClick={() => {
//                 setName(user.name);
//                 setEditing(true);
//               }}
//             >
//               Edit Profile
//             </button>
//             {!user.isPremium ? (
//               <button
//                 className="btn-primary"
//                 onClick={() => subscribeMutation.mutate()}
//               >
//                 Subscribe (1000 BDT)
//               </button>
//             ) : null}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CitizenProfile;
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const CitizenProfile = () => {
  const qc = useQueryClient();
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
      qc.invalidateQueries(["auth-me"]);
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
      // ideally integrate payment gateway
      // mock: call server endpoint to mark premium after payment success
      const res = await axiosSecure.post("/api/payments/subscribe", {
        amount: 1000,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["auth-me"]);
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "You are now a Premium member!",
        timer: 3000,
        showConfirmButton: false,
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

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-10">
        <div className="alert alert-error">
          <span>Error: {error?.message || "Failed to load profile"}</span>
        </div>
      </div>
    );
  }

  // User not found
  if (!user) {
    return (
      <div className="p-10">
        <div className="alert alert-warning">
          <span>User data not available. Please login again.</span>
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL }
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>

        {/* User Info */}
        <div className="text-center mb-4">
          <div className="font-bold text-2xl flex items-center justify-center gap-2">
            {user?.name || "Unknown User"}
            {user?.isPremium && (
              <span className="badge badge-warning gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-4 h-4"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                Premium
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 mt-1">{user?.email}</div>
        </div>

        {/* Blocked Warning */}
        {user?.isBlocked && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
          <div className="mt-4 space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="btn btn-ghost"
                onClick={() => setEditing(false)}
                disabled={update.isPending}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={update.isPending}
              >
                {update.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() => {
                setName(user?.name || "");
                setEditing(true);
              }}
              disabled={user?.isBlocked}
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>

            {!user?.isPremium && (
              <button
                className="btn btn-warning w-full"
                onClick={handleSubscribe}
                disabled={subscribeMutation.isPending || user?.isBlocked}
              >
                {subscribeMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    Subscribe Premium (1000 BDT)
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenProfile;