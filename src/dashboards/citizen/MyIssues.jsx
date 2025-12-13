// // src/dashboards/citizen/MyIssues.jsx
// import React, { useState, useMemo } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axiosSecure from "../../api/axiosSecure";
// import { useNavigate } from "react-router";

// const MyIssues = () => {
//   const qc = useQueryClient();
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState({ status: "all", category: "all" });
//   const [editing, setEditing] = useState(null); // issue object
//   const { data: issues = [], isLoading } = useQuery({
//     queryKey: ["my-issues"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/issues/my");
//       return res.data;
//     },
//   });

//   const filtered = useMemo(() => {
//     return issues.filter((i) => {
//       if (filter.status !== "all" && i.status !== filter.status) return false;
//       if (filter.category !== "all" && i.category !== filter.category)
//         return false;
//       return true;
//     });
//   }, [issues, filter]);

//   const deleteMutation = useMutation(
//     async (id) => {
//       await axiosSecure.delete(`/issues/${id}`);
//       return id;
//     },
//     {
//       onSuccess: (_, id) => {
//         qc.invalidateQueries(["my-issues"]);
//       },
//     }
//   );

//   const updateMutation = useMutation(
//     async ({ id, payload }) => {
//       const form = new FormData();
//       Object.keys(payload).forEach((k) => {
//         if (payload[k] !== undefined && payload[k] !== null)
//           form.append(k, payload[k]);
//       });
//       const res = await axiosSecure.patch(`/issues/${id}`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return res.data;
//     },
//     {
//       onSuccess: () => qc.invalidateQueries(["my-issues"]),
//     }
//   );

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">My Issues</h2>

//       {/* Filters */}
//       <div className="flex gap-2 mb-4 items-center">
//         <select
//           value={filter.status}
//           onChange={(e) => setFilter((s) => ({ ...s, status: e.target.value }))}
//           className="input"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="resolved">Resolved</option>
//         </select>
//         <select
//           value={filter.category}
//           onChange={(e) =>
//             setFilter((s) => ({ ...s, category: e.target.value }))
//           }
//           className="input"
//         >
//           <option value="all">All Categories</option>
//           <option value="road">Road</option>
//           <option value="water">Water</option>
//           <option value="electricity">Electricity</option>
//           <option value="garbage">Garbage</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* List */}
//       {filtered.length === 0 ? (
//         <p>No issues found.</p>
//       ) : (
//         <div className="space-y-3">
//           {filtered.map((issue) => (
//             <div
//               key={issue._id}
//               className="bg-white p-4 rounded shadow flex justify-between"
//             >
//               <div>
//                 <div className="font-semibold">{issue.title}</div>
//                 <div className="text-sm text-gray-500">
//                   {issue.category} • {issue.status}
//                 </div>
//                 <div className="text-sm mt-1">
//                   {issue.description.slice(0, 120)}...
//                 </div>
//               </div>
//               <div className="flex flex-col gap-2 items-end">
//                 <button
//                   className="btn"
//                   onClick={() => navigate(`/issue/${issue._id}`)}
//                 >
//                   View
//                 </button>

//                 <div className="flex gap-2">
//                   {/* Edit allowed only if pending */}
//                   <button
//                     disabled={issue.status !== "pending"}
//                     className={`btn ${
//                       issue.status !== "pending"
//                         ? "opacity-50 cursor-not-allowed"
//                         : ""
//                     }`}
//                     onClick={() => setEditing(issue)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-ghost"
//                     onClick={() => {
//                       if (confirm("Delete this issue?"))
//                         deleteMutation.mutate(issue._id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editing && (
//         <EditModal
//           issue={editing}
//           onClose={() => setEditing(null)}
//           onSave={(payload) => {
//             updateMutation.mutate({ id: editing._id, payload });
//             setEditing(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// function EditModal({ issue, onClose, onSave }) {
//   const [title, setTitle] = useState(issue.title);
//   const [description, setDescription] = useState(issue.description);
//   const [category, setCategory] = useState(issue.category);
//   const [imageFile, setImageFile] = useState(null);

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//       <div className="bg-white p-4 w-full max-w-xl rounded">
//         <h3 className="font-bold mb-2">Edit Issue</h3>
//         <input
//           className="input w-full mb-2"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="input w-full mb-2"
//           rows={4}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <select
//           className="input w-full mb-2"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="road">Road</option>
//           <option value="water">Water</option>
//           <option value="electricity">Electricity</option>
//           <option value="garbage">Garbage</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           type="file"
//           onChange={(e) => setImageFile(e.target.files[0])}
//           className="mb-2"
//         />
//         <div className="flex gap-2 justify-end">
//           <button className="btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="btn-primary"
//             onClick={() =>
//               onSave({ title, description, category, image: imageFile })
//             }
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyIssues;



import useAuth from "../../hook/useAuth";

import { Link } from "react-router";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosSecure from "../../api/axiosSecure";

const MyIssues = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    search: "",
  });

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10">
        <div className="alert alert-warning max-w-md">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Authentication Required</h3>
            <div className="text-xs">Please login to view your issues</div>
          </div>
        </div>
        <Link to="/login" className="btn btn-primary mt-4">
          Go to Login
        </Link>
      </div>
    );
  }

  // Fetch Issues
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-issues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/issues/user", {
        params: filters,
      });
      return res.data.issues;
    },
  });

  // Delete Issue
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/api/issues/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-issues"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Issue has been deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete issue.",
      });
    },
  });

  // Update Issue
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }) =>
      await axiosSecure.put(`/api/issues/${id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-issues"]);
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

  // Edit Modal State
  const [editingIssue, setEditingIssue] = useState(null);

  // Handle Delete with Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Handle Update with Validation
  const handleUpdate = () => {
    if (!editingIssue.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Title cannot be empty!",
      });
      return;
    }

    if (!editingIssue.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Description cannot be empty!",
      });
      return;
    }

    updateMutation.mutate({
      id: editingIssue._id,
      formData: editingIssue,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10">
        <div className="alert alert-error">
          <span>Error: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* User Info */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Issues</h2>
          <p className="text-sm text-gray-600">
            Logged in as: <span className="font-semibold">{user?.email}</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="select select-bordered"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          value={filters.status}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          value={filters.category}
        >
          <option value="">All Categories</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          value={filters.search}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-semibold">No issues found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              data?.map((issue) => (
                <tr key={issue._id}>
                  <td className="font-medium">{issue.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        issue.status === "pending"
                          ? "badge-warning"
                          : issue.status === "in-progress"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {issue.category}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {/* Edit */}
                    {issue.status === "pending" && (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => setEditingIssue(issue)}
                      >
                        Edit
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="btn btn-xs btn-error"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>

                    {/* Details */}
                    <Link
                      className="btn btn-xs btn-info"
                      to={`/issue-details/${issue._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <dialog open className="modal" onClick={() => setEditingIssue(null)}>
          <div
            className="modal-box space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">Edit Issue</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={editingIssue.title}
                className="input input-bordered w-full"
                onChange={(e) =>
                  setEditingIssue({ ...editingIssue, title: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={editingIssue.description}
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
                <span className="label-text">Category</span>
              </label>
              <select
                value={editingIssue.category}
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
                {updateMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => setEditingIssue(null)}
                disabled={updateMutation.isPending}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyIssues;