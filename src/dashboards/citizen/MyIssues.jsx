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
  const [editingIssue, setEditingIssue] = useState(null);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10">
        <div className="alert alert-warning max-w-md">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              Authentication Required
            </h3>
            <div className="text-xs sm:text-sm">
              Please login to view your issues
            </div>
          </div>
        </div>
        <Link to="/login" className="btn btn-primary mt-4 btn-sm sm:btn-md">
          Go to Login
        </Link>
      </div>
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["my-issues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/issues/user", {
        params: filters,
      });
      return res.data.issues;
    },
  });

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
      <div className="p-4 sm:p-6 lg:p-10">
        <div className="alert alert-error text-sm sm:text-base">
          <span>Error: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">My Issues</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Logged in as:{" "}
          <span className="font-semibold break-all">{user?.email}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <select
          className="select select-bordered select-sm sm:select-md w-full"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          value={filters.status}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="select select-bordered select-sm sm:select-md w-full"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          value={filters.category}
        >
          <option value="">All Categories</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Streetlights">Streetlights</option>
          <option value="Electricity">Electricity</option>
          <option value="Traffic">Traffic</option>
          <option value="Safety">Safety</option>
          <option value="Health">Health</option>
          <option value="Public Services">Public Services</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered input-sm sm:input-md w-full sm:col-span-2 lg:col-span-1"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          value={filters.search}
        />
      </div>

      {/* Table - Mobile Optimized */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table table-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-sm lg:text-base">Title</th>
                <th className="text-sm lg:text-base">Status</th>
                <th className="text-sm lg:text-base">Category</th>
                <th className="text-sm lg:text-base">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300"
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
                      <p className="text-base lg:text-lg font-semibold">
                        No issues found
                      </p>
                      <p className="text-sm">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.map((issue) => (
                  <tr key={issue._id} className="hover">
                    <td className="font-medium text-sm lg:text-base">
                      {issue.title}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm lg:badge-md ${
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
                      <span className="badge badge-outline badge-sm lg:badge-md">
                        {issue.category}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {issue.status === "pending" && (
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => setEditingIssue(issue)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="btn btn-sm btn-error"
                          disabled={deleteMutation.isPending}
                        >
                          Delete
                        </button>
                        <Link
                          className="btn btn-sm btn-info"
                          to={`/issue-details/${issue._id}`}
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {data?.length === 0 ? (
            <div className="text-center py-8 text-gray-500 px-4">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-3"
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
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            data?.map((issue) => (
              <div key={issue._id} className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-base mb-2">
                    {issue.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`badge badge-sm ${
                        issue.status === "pending"
                          ? "badge-warning"
                          : issue.status === "in-progress"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {issue.status}
                    </span>
                    <span className="badge badge-outline badge-sm">
                      {issue.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {issue.status === "pending" && (
                    <button
                      className="btn btn-xs btn-warning flex-1"
                      onClick={() => setEditingIssue(issue)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="btn btn-xs btn-error flex-1"
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-xs btn-info flex-1"
                    to={`/issue-details/${issue._id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <dialog open className="modal" onClick={() => setEditingIssue(null)}>
          <div
            className="modal-box max-w-full sm:max-w-lg mx-3 space-y-3 sm:space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg sm:text-xl mb-4">Edit Issue</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">Title</span>
              </label>
              <input
                type="text"
                value={editingIssue.title}
                className="input input-bordered input-sm sm:input-md w-full"
                onChange={(e) =>
                  setEditingIssue({ ...editingIssue, title: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm sm:text-base">
                  Description
                </span>
              </label>
              <textarea
                value={editingIssue.description}
                className="textarea textarea-bordered textarea-sm sm:textarea-md w-full h-24 sm:h-32"
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
                <span className="label-text text-sm sm:text-base">
                  Category
                </span>
              </label>
              <select
                value={editingIssue.category}
                className="select select-bordered select-sm sm:select-md w-full"
                onChange={(e) =>
                  setEditingIssue({
                    ...editingIssue,
                    category: e.target.value,
                  })
                }
              >
                <option value="Road">Road</option>
                <option value="Garbage">Garbage</option>
                <option value="Water">Water</option>
                <option value="Streetlights">Streetlights</option>
                <option value="Electricity">Electricity</option>
                <option value="Traffic">Traffic</option>
                <option value="Safety">Safety</option>
                <option value="Health">Health</option>
                <option value="Public Services">Public Services</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="modal-action flex-col sm:flex-row gap-2">
              <button
                className="btn btn-primary btn-sm sm:btn-md flex-1 sm:flex-none"
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                className="btn btn-ghost btn-sm sm:btn-md flex-1 sm:flex-none"
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