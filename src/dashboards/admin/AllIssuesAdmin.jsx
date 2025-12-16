import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import { Link } from "react-router";


const AllIssuesAdmin = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    search: "",
    page: 1,
    limit: 10,
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Fetch All Issues
  const { data, isLoading } = useQuery({
    queryKey: ["admin-all-issues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/issues", {
        params: filters,
      });
      return res.data;
    },
  });

  // Fetch All Staff
  const { data: staffList } = useQuery({
    queryKey: ["all-staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/staff");
      return res.data;
    },
  });

  // Assign Staff Mutation
  const assignStaffMutation = useMutation({
    mutationFn: async ({ issueId, staffId }) => {
      const res = await axiosSecure.patch(
        `/api/admin/issues/${issueId}/assign`,
        {
          staffId,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-all-issues"]);
      setShowAssignModal(false);
      setSelectedIssue(null);
      Swal.fire({
        icon: "success",
        title: "Staff Assigned!",
        text: "Staff has been successfully assigned to this issue.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to assign staff.",
      });
    },
  });

  // Reject Issue Mutation
  const rejectIssueMutation = useMutation({
    mutationFn: async (issueId) => {
      const res = await axiosSecure.patch(
        `/api/admin/issues/${issueId}/reject`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-all-issues"]);
      Swal.fire({
        icon: "success",
        title: "Issue Rejected!",
        text: "The issue has been rejected.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to reject issue.",
      });
    },
  });

  // Handle Assign Staff
  const handleAssignStaff = (issue) => {
    setSelectedIssue(issue);
    setShowAssignModal(true);
  };

  // Handle Submit Assignment
  const handleSubmitAssignment = (staffId) => {
    if (!staffId) {
      Swal.fire({
        icon: "warning",
        title: "Select Staff",
        text: "Please select a staff member",
      });
      return;
    }

    assignStaffMutation.mutate({
      issueId: selectedIssue._id,
      staffId,
    });
  };

  // Handle Reject
  const handleReject = (issueId) => {
    Swal.fire({
      title: "Reject This Issue?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject It!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectIssueMutation.mutate(issueId);
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

  const issues = data?.issues || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Issues</h1>
          <p className="text-gray-600">Manage and assign issues to staff</p>
        </div>
        <div className="badge badge-lg badge-primary">
          Total: {data?.total || 0}
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
            />

            <select
              className="select select-bordered"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value, page: 1 })
              }
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>

            <select
              className="select select-bordered"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value, page: 1 })
              }
            >
              <option value="">All Categories</option>
              <option value="Road">Road</option>
              <option value="Garbage">Garbage</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
            </select>

            <select
              className="select select-bordered"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value, page: 1 })
              }
            >
              <option value="">All Priority</option>
              <option value="high">High Priority</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned Staff</th>
                  <th>Reporter</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No issues found
                    </td>
                  </tr>
                ) : (
                  issues.map((issue) => (
                    <tr key={issue._id} className="hover">
                      <td>
                        <div className="font-medium max-w-xs truncate">
                          {issue.title}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-outline">
                          {issue.category}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            issue.status === "pending"
                              ? "badge-warning"
                              : issue.status === "in-progress"
                              ? "badge-info"
                              : issue.status === "resolved"
                              ? "badge-success"
                              : issue.status === "rejected"
                              ? "badge-error"
                              : "badge-neutral"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            issue.priority === "high"
                              ? "badge-error"
                              : "badge-ghost"
                          }`}
                        >
                          {issue.priority === "high" ? "🔥 High" : "Normal"}
                        </span>
                      </td>
                      <td>
                        {issue.assignedStaff ? (
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="w-8 h-8 rounded-full">
                                <img
                                  src={issue.assignedStaff.photo}
                                  alt={issue.assignedStaff.name}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              {issue.assignedStaff.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium">
                            {issue.reporter?.name}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {issue.reporter?.email}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {/* Assign Staff Button */}
                          {!issue.assignedStaff && (
                            <button
                              onClick={() => handleAssignStaff(issue)}
                              className="btn btn-xs btn-primary"
                              disabled={assignStaffMutation.isPending}
                            >
                              Assign Staff
                            </button>
                          )}

                          {/* Reject Button */}
                          {issue.status === "pending" && (
                            <button
                              onClick={() => handleReject(issue._id)}
                              className="btn btn-xs btn-error"
                              disabled={rejectIssueMutation.isPending}
                            >
                              Reject
                            </button>
                          )}

                          {/* View Details */}
                          <Link
                            to={`/issue-details/${issue._id}`}
                            className="btn btn-xs btn-ghost"
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
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              disabled={filters.page === 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`join-item btn ${
                  filters.page === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => setFilters({ ...filters, page: index + 1 })}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={filters.page === totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Assign Staff Modal */}
      {showAssignModal && (
        <dialog
          open
          className="modal"
          onClick={() => setShowAssignModal(false)}
        >
          <div
            className="modal-box max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-2xl mb-4">Assign Staff</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Issue:</p>
                <p className="font-semibold">{selectedIssue?.title}</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Select Staff Member
                  </span>
                </label>
                <select
                  id="staff-select"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a staff member
                  </option>
                  {staffList?.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.name} - {staff.email}
                    </option>
                  ))}
                </select>
              </div>

              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm">
                  The selected staff will be notified and can start working on
                  this issue.
                </span>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const staffId =
                      document.getElementById("staff-select").value;
                    handleSubmitAssignment(staffId);
                  }}
                  disabled={assignStaffMutation.isPending}
                >
                  {assignStaffMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Assigning...
                    </>
                  ) : (
                    "Assign Staff"
                  )}
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowAssignModal(false)}
                  disabled={assignStaffMutation.isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllIssuesAdmin;
