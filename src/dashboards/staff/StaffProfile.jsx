// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import axiosSecure from "../../api/axiosSecure";
// import useAuth from "../../hook/useAuth";


// const StaffProfile = () => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     photo: user?.photo || "",
//   });

//   // Update Profile Mutation
//   const updateMutation = useMutation({
//     mutationFn: async (data) => {
//       const res = await axiosSecure.patch("/api/auth/me", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["auth-me"]);
//       setEditing(false);
//       Swal.fire({
//         icon: "success",
//         title: "Profile Updated!",
//         text: "Your profile has been updated successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to update profile.",
//       });
//     },
//   });

//   const handleUpdate = () => {
//     if (!formData.name.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Name cannot be empty!",
//       });
//       return;
//     }

//     updateMutation.mutate(formData);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user?.name || "",
//       photo: user?.photo || "",
//     });
//     setEditing(false);
//   };

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
//         <p className="text-gray-600">View and update your staff information</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Profile Card */}
//         <div className="lg:col-span-1">
//           <div className="card bg-gradient-to-br from-green-600 to-teal-600 text-white shadow-xl">
//             <div className="card-body items-center text-center">
//               <div className="avatar mb-4">
//                 <div className="w-32 h-32 rounded-full ring ring-white ring-offset-4 ring-offset-green-600">
//                   <img
//                     src={user.photo }
//                     alt={user.name}
                    
//                   />
//                 </div>
//               </div>
//               <h2 className="card-title text-2xl">{user.name}</h2>
//               <p className="text-green-100">{user.email}</p>
//               <div className="badge badge-success gap-2 mt-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   />
//                 </svg>
//                 Staff Member
//               </div>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="card bg-white shadow-xl mt-6">
//             <div className="card-body">
//               <h3 className="card-title text-lg mb-4">Account Info</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Role:</span>
//                   <span className="font-semibold capitalize">{user.role}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Status:</span>
//                   <span className="badge badge-success">Active</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Member Since:</span>
//                   <span className="text-sm">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Form */}
//         <div className="lg:col-span-2">
//           <div className="card bg-white shadow-xl">
//             <div className="card-body">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="card-title text-xl">Profile Details</h3>
//                 {!editing && (
//                   <button
//                     onClick={() => setEditing(true)}
//                     className="btn btn-primary btn-sm gap-2"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                       />
//                     </svg>
//                     Edit Profile
//                   </button>
//                 )}
//               </div>

//               {editing ? (
//                 <div className="space-y-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Full Name
//                       </span>
//                     </label>
//                     <input
//                       type="text"
//                       className="input input-bordered"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                     />
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text font-semibold">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       className="input input-bordered"
//                       value={user.email}
//                       disabled
//                     />
//                     <label className="label">
//                       <span className="label-text-alt text-gray-500">
//                         Email cannot be changed
//                       </span>
//                     </label>
//                   </div>

//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text font-semibold">
//                         Photo URL
//                       </span>
//                     </label>
//                     <input
//                       type="url"
//                       className="input input-bordered"
//                       value={formData.photo}
//                       onChange={(e) =>
//                         setFormData({ ...formData, photo: e.target.value })
//                       }
//                       placeholder="https://example.com/photo.jpg"
//                     />
//                   </div>

//                   {/* Preview */}
//                   {formData.photo && (
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text font-semibold">
//                           Preview
//                         </span>
//                       </label>
//                       <div className="avatar">
//                         <div className="w-24 h-24 rounded-full">
//                           <img
//                             src={formData.photo}
//                             alt="Preview"
                           
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex gap-3 mt-6">
//                     <button
//                       className="btn btn-primary flex-1"
//                       onClick={handleUpdate}
//                       disabled={updateMutation.isPending}
//                     >
//                       {updateMutation.isPending ? (
//                         <>
//                           <span className="loading loading-spinner loading-sm"></span>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M5 13l4 4L19 7"
//                             />
//                           </svg>
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                     <button
//                       className="btn btn-ghost flex-1"
//                       onClick={handleCancel}
//                       disabled={updateMutation.isPending}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm text-gray-500">Full Name</label>
//                     <p className="text-lg font-semibold">{user.name}</p>
//                   </div>

//                   <div>
//                     <label className="text-sm text-gray-500">
//                       Email Address
//                     </label>
//                     <p className="text-lg font-semibold">{user.email}</p>
//                   </div>

//                   <div>
//                     <label className="text-sm text-gray-500">Role</label>
//                     <p className="text-lg font-semibold capitalize">
//                       {user.role}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="text-sm text-gray-500">Phone</label>
//                     <p className="text-lg font-semibold">
//                       {user.phone || (
//                         <span className="text-gray-400">Not provided</span>
//                       )}
//                     </p>
//                   </div>

//                   <div>
//                     <label className="text-sm text-gray-500">
//                       Account Status
//                     </label>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="badge badge-success">Active</span>
//                       <span className="text-sm text-gray-600">
//                         Authorized to manage issues
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Help Section */}
//           <div className="alert alert-info mt-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="stroke-current shrink-0 w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//             <div>
//               <h3 className="font-bold">Need Help?</h3>
//               <div className="text-xs">
//                 Contact the administrator if you need to update your email,
//                 phone number, or require additional permissions.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffProfile;

import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hook/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StaffProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch("/api/auth/me", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["auth-me"]);
      setEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
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

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name cannot be empty!",
      });
      return;
    }

    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      photo: user?.photo || "",
    });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          View and update your staff information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <div className="card bg-gradient-to-br from-green-600 to-teal-600 text-white shadow-xl">
            <div className="card-body items-center text-center p-4 sm:p-6">
              <div className="avatar mb-3 sm:mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full ring ring-white ring-offset-4 ring-offset-green-600">
                  <img src={user.photo} alt={user.name} />
                </div>
              </div>
              <h2 className="card-title text-xl sm:text-2xl">{user.name}</h2>
              <p className="text-xs sm:text-sm text-green-100 break-all px-2">
                {user.email}
              </p>
              <div className="badge badge-success gap-2 mt-2 text-xs sm:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Staff Member
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card bg-white shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <h3 className="card-title text-base sm:text-lg mb-3 sm:mb-4">
                Account Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-semibold capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Status:</span>
                  <span className="badge badge-success badge-sm">Active</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="text-xs sm:text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="card bg-white shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="card-title text-base sm:text-lg lg:text-xl">
                  Profile Details
                </h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                    <span className="hidden sm:inline">Edit Profile</span>
                    <span className="sm:hidden">Edit</span>
                  </button>
                )}
              </div>

              {editing ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm sm:text-base">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm sm:input-md"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm sm:text-base">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered input-sm sm:input-md"
                      value={user.email}
                      disabled
                    />
                    <label className="label">
                      <span className="label-text-alt text-xs text-gray-500">
                        Email cannot be changed
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-sm sm:text-base">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered input-sm sm:input-md"
                      value={formData.photo}
                      onChange={(e) =>
                        setFormData({ ...formData, photo: e.target.value })
                      }
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  {/* Preview */}
                  {formData.photo && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-sm sm:text-base">
                          Preview
                        </span>
                      </label>
                      <div className="avatar">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring ring-green-500 ring-offset-2">
                          <img src={formData.photo} alt="Preview" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                    <button
                      className="btn btn-primary btn-sm sm:btn-md flex-1"
                      onClick={handleUpdate}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <>
                          <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-ghost btn-sm sm:btn-md flex-1"
                      onClick={handleCancel}
                      disabled={updateMutation.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">
                      Full Name
                    </label>
                    <p className="text-base sm:text-lg font-semibold">
                      {user.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">
                      Email Address
                    </label>
                    <p className="text-base sm:text-lg font-semibold break-all">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">
                      Role
                    </label>
                    <p className="text-base sm:text-lg font-semibold capitalize">
                      {user.role}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">
                      Phone
                    </label>
                    <p className="text-base sm:text-lg font-semibold">
                      {user.phone || (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">
                      Account Status
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge badge-success badge-sm">
                        Active
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Authorized to manage issues
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="alert alert-info text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Need Help?</h3>
              <div className="text-xs">
                Contact the administrator if you need to update your email,
                phone number, or require additional permissions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;