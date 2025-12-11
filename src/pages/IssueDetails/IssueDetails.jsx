import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hook/useAuth";
import Timeline from "../../components/Timeline";
import Modal from "../../components/Modal";


const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingIssue, setEditingIssue] = useState(null);

  // Fetch Issue Details with Timeline
  const { data, isLoading, isError } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/issues/${id}`);
      return res.data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async () => await axiosSecure.delete(`/api/issues/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Issue has been deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/my-issues");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete issue.",
      });
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ formData }) =>
      await axiosSecure.put(`/api/issues/${id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["issue-details", id]);
      setEditingIssue(null);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Issue has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update issue.",
      });
    },
  });

  // Boost Mutation
  const boostMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post(`/api/issues/${id}/boost`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issue-details", id]);
      Swal.fire({
        icon: "success",
        title: "Boosted!",
        text: "Your issue has been boosted to high priority!",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to boost issue.",
      });
    },
  });

  // Upvote Mutation
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post(`/api/issues/${id}/upvote`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issue-details", id]);
      Swal.fire({
        icon: "success",
        title: "Upvoted!",
        text: "Your upvote has been recorded.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to upvote",
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

  const handleUpdate = () => {
    if (!editingIssue.title.trim() || !editingIssue.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Title and description cannot be empty!",
      });
      return;
    }
    updateMutation.mutate({ formData: editingIssue });
  };

  const handleBoost = () => {
    Swal.fire({
      title: "Boost This Issue?",
      html: `
        <p>Boosting will:</p>
        <ul style="text-align: left; margin: 10px 40px;">
          <li>Set priority to HIGH</li>
          <li>Move issue to top of list</li>
          <li>Cost: 100 TK</li>
        </ul>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Boost It!",
    }).then((result) => {
      if (result.isConfirmed) {
        boostMutation.mutate();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-10">
        <div className="alert alert-error">
          <span>Failed to load issue details</span>
        </div>
      </div>
    );
  }

  const { issue, timeline } = data;
  const isOwner =
    issue.reporter._id === user?._id || issue.reporter.email === user?.email;
  const canEdit = isOwner && issue.status === "pending";
  const canBoost = isOwner && issue.priority !== "high" && !issue.isBoosted;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm mb-4"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Header Card */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {issue.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-outline badge-lg">
                  {issue.category}
                </span>
                <span
                  className={`badge badge-lg ${
                    issue.status === "pending"
                      ? "badge-warning"
                      : issue.status === "in-progress"
                      ? "badge-info"
                      : issue.status === "resolved"
                      ? "badge-success"
                      : "badge-neutral"
                  }`}
                >
                  {issue.status}
                </span>
                <span
                  className={`badge badge-lg ${
                    issue.priority === "high" ? "badge-error" : "badge-ghost"
                  }`}
                >
                  {issue.priority === "high" ? "🔥 High Priority" : "Normal"}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span>
                  {issue.location?.address ||
                    issue.location ||
                    "Location not specified"}
                </span>
              </div>

              {/* Image */}
              {issue.images && issue.images.length > 0 && (
                <div className="mb-4">
                  <img
                    src={issue.images[0]}
                    alt={issue.title}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/800x400")
                    }
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {issue.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span className="text-lg font-semibold">
                    {issue.upvotes || 0} Upvotes
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                {!isOwner && (
                  <button
                    onClick={() => upvoteMutation.mutate()}
                    className="btn btn-primary"
                  >
                    Upvote
                  </button>
                )}
                {canEdit && (
                  <button
                    onClick={() => setEditingIssue(issue)}
                    className="btn btn-warning"
                  >
                    Edit Issue
                  </button>
                )}
                {isOwner && (
                  <button onClick={handleDelete} className="btn btn-error">
                    Delete
                  </button>
                )}
                {canBoost && (
                  <button onClick={handleBoost} className="btn btn-accent">
                    Boost Priority (100 TK)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Section - Using Your Component */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Issue Timeline</h2>
              <Timeline timeline={timeline} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Reporter Info */}
          <div className="card bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Reported By</h3>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-white ring-offset-2">
                    <img
                      src={
                        issue.reporter.photo ||
                        "https://via.placeholder.com/150"
                      }
                      alt={issue.reporter.name}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {issue.reporter.name}
                    {issue.reporter.isPremium && (
                      <span className="badge badge-warning badge-sm ml-2">
                        Premium
                      </span>
                    )}
                  </p>
                  <p className="text-sm opacity-90">{issue.reporter.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Staff */}
          {issue.assignedStaff && (
            <div className="card bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Assigned To</h3>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-white ring-offset-2">
                      <img
                        src={
                          issue.assignedStaff.photo ||
                          "https://via.placeholder.com/150"
                        }
                        alt={issue.assignedStaff.name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {issue.assignedStaff.name}
                    </p>
                    <p className="text-sm opacity-90">
                      {issue.assignedStaff.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Quick Stats */}
          <div className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold capitalize">
                    {issue.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Priority:</span>
                  <span className="font-semibold capitalize">
                    {issue.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold">{issue.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upvotes:</span>
                  <span className="font-semibold">{issue.upvotes || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-sm">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal - Using Your Component */}
      <Modal
        isOpen={!!editingIssue}
        onClose={() => setEditingIssue(null)}
        title="Edit Issue"
      >
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              value={editingIssue?.title || ""}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditingIssue({ ...editingIssue, title: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              value={editingIssue?.description || ""}
              className="textarea textarea-bordered w-full h-32"
              onChange={(e) =>
                setEditingIssue({
                  ...editingIssue,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              value={editingIssue?.category || ""}
              className="select select-bordered w-full"
              onChange={(e) =>
                setEditingIssue({ ...editingIssue, category: e.target.value })
              }
            >
              <option value="Road">Road</option>
              <option value="Garbage">Garbage</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => setEditingIssue(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default IssueDetails;


// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useParams, useNavigate, Link } from "react-router";
// import { useState } from "react";
// import Swal from "sweetalert2";
// import axiosSecure from "../../api/axiosSecure";
// import useAuth from "../../hook/useAuth";

// const IssueDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [editingIssue, setEditingIssue] = useState(null);

//   // Fetch Issue Details with Timeline
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["issue-details", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/api/issues/${id}`);
//       return res.data;
//     },
//   });

//   // Delete Mutation
//   const deleteMutation = useMutation({
//     mutationFn: async () => await axiosSecure.delete(`/api/issues/${id}`),
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Issue has been deleted successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       navigate("/my-issues");
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to delete issue.",
//       });
//     },
//   });

//   // Update Mutation
//   const updateMutation = useMutation({
//     mutationFn: async ({ formData }) =>
//       await axiosSecure.put(`/api/issues/${id}`, formData),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["issue-details", id]);
//       setEditingIssue(null);
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Issue has been updated successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to update issue.",
//       });
//     },
//   });

//   // Boost Mutation (Payment - Mock for now)
//   const boostMutation = useMutation({
//     mutationFn: async () => {
//       // Mock payment - In real app, integrate payment gateway
//       const res = await axiosSecure.post(`/api/issues/${id}/boost`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["issue-details", id]);
//       Swal.fire({
//         icon: "success",
//         title: "Boosted!",
//         text: "Your issue has been boosted to high priority!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to boost issue.",
//       });
//     },
//   });

//   // Upvote Mutation
//   const upvoteMutation = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.post(`/api/issues/${id}/upvote`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["issue-details", id]);
//       Swal.fire({
//         icon: "success",
//         title: "Upvoted!",
//         text: "Your upvote has been recorded.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to upvote",
//       });
//     },
//   });

//   // Handle Delete
//   const handleDelete = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate();
//       }
//     });
//   };

//   // Handle Update
//   const handleUpdate = () => {
//     if (!editingIssue.title.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Title cannot be empty!",
//       });
//       return;
//     }

//     if (!editingIssue.description.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Description cannot be empty!",
//       });
//       return;
//     }

//     updateMutation.mutate({ formData: editingIssue });
//   };

//   // Handle Boost
//   const handleBoost = () => {
//     Swal.fire({
//       title: "Boost This Issue?",
//       html: `
//         <p>Boosting will:</p>
//         <ul style="text-align: left; margin: 10px 40px;">
//           <li>Set priority to HIGH</li>
//           <li>Move issue to top of list</li>
//           <li>Cost: 100 TK</li>
//         </ul>
//       `,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Boost It!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Mock payment success
//         boostMutation.mutate();
//       }
//     });
//   };

//   // Handle Upvote
//   const handleUpvote = () => {
//     upvoteMutation.mutate();
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <div className="p-10">
//         <div className="alert alert-error">
//           <span>Failed to load issue details</span>
//         </div>
//       </div>
//     );
//   }

//   const { issue, timeline } = data;
//   const isOwner =
//     issue.reporter._id === user?._id || issue.reporter.email === user?.email;
//   const canEdit = isOwner && issue.status === "pending";
//   const canBoost = isOwner && issue.priority !== "high" && !issue.isBoosted;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="btn btn-ghost btn-sm mb-4"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M10 19l-7-7m0 0l7-7m-7 7h18"
//           />
//         </svg>
//         Back
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content - Left Side */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Issue Header Card */}
//           <div className="card bg-white shadow-lg">
//             <div className="card-body">
//               {/* Title & Badges */}
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h1 className="text-3xl font-bold text-gray-800 mb-3">
//                     {issue.title}
//                   </h1>
//                   <div className="flex flex-wrap gap-2">
//                     <span className="badge badge-outline badge-lg">
//                       {issue.category}
//                     </span>
//                     <span
//                       className={`badge badge-lg ${
//                         issue.status === "pending"
//                           ? "badge-warning"
//                           : issue.status === "in-progress"
//                           ? "badge-info"
//                           : issue.status === "resolved"
//                           ? "badge-success"
//                           : "badge-neutral"
//                       }`}
//                     >
//                       {issue.status}
//                     </span>
//                     <span
//                       className={`badge badge-lg ${
//                         issue.priority === "high"
//                           ? "badge-error"
//                           : "badge-ghost"
//                       }`}
//                     >
//                       {issue.priority === "high"
//                         ? "🔥 High Priority"
//                         : "Normal"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="flex items-center gap-2 text-gray-600 mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 <span>
//                   {issue.location?.address ||
//                     issue.location ||
//                     "Location not specified"}
//                 </span>
//               </div>

//               {/* Image Gallery */}
//               {issue.images && issue.images.length > 0 && (
//                 <div className="mb-4">
//                   <img
//                     src={issue.images[0]}
//                     alt={issue.title}
//                     className="w-full h-96 object-cover rounded-lg"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/800x400";
//                     }}
//                   />
//                 </div>
//               )}

//               {/* Description */}
//               <div className="prose max-w-none">
//                 <h3 className="text-xl font-semibold mb-2">Description</h3>
//                 <p className="text-gray-700 whitespace-pre-wrap">
//                   {issue.description}
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-6 mt-6 pt-6 border-t">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-blue-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 15l7-7 7 7"
//                     />
//                   </svg>
//                   <span className="text-lg font-semibold">
//                     {issue.upvotes || 0} Upvotes
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span>
//                     {new Date(issue.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-3 mt-6">
//                 {/* Upvote Button */}
//                 {!isOwner && (
//                   <button
//                     onClick={handleUpvote}
//                     disabled={upvoteMutation.isPending}
//                     className={`btn ${
//                       issue.upvotedBy?.includes(user?._id)
//                         ? "btn-success"
//                         : "btn-primary"
//                     }`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill={
//                         issue.upvotedBy?.includes(user?._id)
//                           ? "currentColor"
//                           : "none"
//                       }
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 15l7-7 7 7"
//                       />
//                     </svg>
//                     {issue.upvotedBy?.includes(user?._id)
//                       ? "Upvoted"
//                       : "Upvote"}
//                   </button>
//                 )}

//                 {/* Edit Button */}
//                 {canEdit && (
//                   <button
//                     onClick={() => setEditingIssue(issue)}
//                     className="btn btn-warning"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
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
//                     Edit Issue
//                   </button>
//                 )}

//                 {/* Delete Button */}
//                 {isOwner && (
//                   <button
//                     onClick={handleDelete}
//                     disabled={deleteMutation.isPending}
//                     className="btn btn-error"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                     Delete
//                   </button>
//                 )}

//                 {/* Boost Button */}
//                 {canBoost && (
//                   <button
//                     onClick={handleBoost}
//                     disabled={boostMutation.isPending}
//                     className="btn btn-accent"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                     Boost Priority (100 TK)
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Timeline Section */}
//           <div className="card bg-white shadow-lg">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-6">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//                 Issue Timeline
//               </h2>

//               {timeline && timeline.length > 0 ? (
//                 <div className="space-y-4">
//                   {timeline.map((entry, index) => (
//                     <div key={entry._id} className="flex gap-4">
//                       {/* Timeline Line */}
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-4 h-4 rounded-full ${
//                             entry.status === "pending"
//                               ? "bg-yellow-500"
//                               : entry.status === "in-progress"
//                               ? "bg-blue-500"
//                               : entry.status === "resolved"
//                               ? "bg-green-500"
//                               : "bg-gray-500"
//                           }`}
//                         ></div>
//                         {index < timeline.length - 1 && (
//                           <div className="w-0.5 h-full bg-gray-300 flex-1 mt-2"></div>
//                         )}
//                       </div>

//                       {/* Timeline Content */}
//                       <div className="flex-1 pb-8">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span
//                             className={`badge ${
//                               entry.status === "pending"
//                                 ? "badge-warning"
//                                 : entry.status === "in-progress"
//                                 ? "badge-info"
//                                 : entry.status === "resolved"
//                                 ? "badge-success"
//                                 : "badge-neutral"
//                             }`}
//                           >
//                             {entry.status}
//                           </span>
//                           <span className="text-sm text-gray-500">
//                             {entry.role}
//                           </span>
//                         </div>
//                         <p className="text-gray-800 font-medium mb-1">
//                           {entry.message}
//                         </p>
//                         <div className="text-sm text-gray-500">
//                           <span>
//                             By:{" "}
//                             {entry.updatedBy?.name ||
//                               entry.updatedBy?.email ||
//                               "System"}
//                           </span>
//                           <span className="mx-2">•</span>
//                           <span>
//                             {new Date(entry.createdAt).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-8">
//                   No timeline entries yet
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar - Right Side */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Reporter Info Card */}
//           <div className="card bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg">
//             <div className="card-body">
//               <h3 className="card-title text-lg mb-4">Reported By</h3>
//               <div className="flex items-center gap-3">
//                 <div className="avatar">
//                   <div className="w-16 h-16 rounded-full ring ring-white ring-offset-2">
//                     <img
//                       src={
//                         issue.reporter.photo ||
//                         "https://via.placeholder.com/150"
//                       }
//                       alt={issue.reporter.name}
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-lg flex items-center gap-2">
//                     {issue.reporter.name}
//                     {issue.reporter.isPremium && (
//                       <span className="badge badge-warning badge-sm">
//                         Premium
//                       </span>
//                     )}
//                   </p>
//                   <p className="text-sm opacity-90">{issue.reporter.email}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Assigned Staff Card */}
//           {issue.assignedStaff && (
//             <div className="card bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg">
//               <div className="card-body">
//                 <h3 className="card-title text-lg mb-4">Assigned To</h3>
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="w-16 h-16 rounded-full ring ring-white ring-offset-2">
//                       <img
//                         src={
//                           issue.assignedStaff.photo ||
//                           "https://via.placeholder.com/150"
//                         }
//                         alt={issue.assignedStaff.name}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/150";
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-lg">
//                       {issue.assignedStaff.name}
//                     </p>
//                     <p className="text-sm opacity-90">
//                       {issue.assignedStaff.email}
//                     </p>
//                     <span className="badge badge-sm mt-1">Staff</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Quick Stats */}
//           <div className="card bg-white shadow-lg">
//             <div className="card-body">
//               <h3 className="card-title text-lg mb-4">Quick Stats</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Status:</span>
//                   <span className="font-semibold capitalize">
//                     {issue.status}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Priority:</span>
//                   <span className="font-semibold capitalize">
//                     {issue.priority}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Category:</span>
//                   <span className="font-semibold">{issue.category}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Upvotes:</span>
//                   <span className="font-semibold">{issue.upvotes || 0}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Created:</span>
//                   <span className="text-sm">
//                     {new Date(issue.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {editingIssue && (
//         <dialog open className="modal" onClick={() => setEditingIssue(null)}>
//           <div
//             className="modal-box max-w-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="font-bold text-2xl mb-6">Edit Issue</h3>

//             <div className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-semibold">Title</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={editingIssue.title}
//                   className="input input-bordered w-full"
//                   onChange={(e) =>
//                     setEditingIssue({ ...editingIssue, title: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-semibold">Description</span>
//                 </label>
//                 <textarea
//                   value={editingIssue.description}
//                   className="textarea textarea-bordered w-full h-32"
//                   onChange={(e) =>
//                     setEditingIssue({
//                       ...editingIssue,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-semibold">Category</span>
//                 </label>
//                 <select
//                   value={editingIssue.category}
//                   className="select select-bordered w-full"
//                   onChange={(e) =>
//                     setEditingIssue({
//                       ...editingIssue,
//                       category: e.target.value,
//                     })
//                   }
//                 >
//                   <option value="Road">Road</option>
//                   <option value="Garbage">Garbage</option>
//                   <option value="Water">Water</option>
//                   <option value="Electricity">Electricity</option>
//                 </select>
//               </div>

//               <div className="modal-action">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleUpdate}
//                   disabled={updateMutation.isPending}
//                 >
//                   {updateMutation.isPending ? (
//                     <>
//                       <span className="loading loading-spinner loading-sm"></span>
//                       Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </button>

//                 <button
//                   className="btn btn-ghost"
//                   onClick={() => setEditingIssue(null)}
//                   disabled={updateMutation.isPending}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default IssueDetails;