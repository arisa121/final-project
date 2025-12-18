import { useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AssignedIssues = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["assigned-issues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/staff/assigned-issues", {
        params: filters,
      });
      return res.data;
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: async ({ issueId, status }) => {
      const res = await axiosSecure.patch(
        `/api/staff/issues/${issueId}/status`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-issues"]);
      queryClient.invalidateQueries(["staff-stats"]);
      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: "Issue status has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to update status.",
      });
    },
  });

  const handleStatusChange = (issue, newStatus) => {
    const statusLabels = {
      "in-progress": "In Progress",
      working: "Working",
      resolved: "Resolved",
      closed: "Closed",
    };

    Swal.fire({
      title: "Change Status?",
      html: `
        <p>Change status of <strong>"${issue.title}"</strong></p>
        <p class="text-sm text-gray-600 mt-2">From: <span class="badge badge-warning">${issue.status}</span></p>
        <p class="text-sm text-gray-600">To: <span class="badge badge-info">${statusLabels[newStatus]}</span></p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusMutation.mutate({
          issueId: issue._id,
          status: newStatus,
        });
      }
    });
  };

  const getNextStatuses = (currentStatus) => {
    const transitions = {
      pending: ["in-progress"],
      "in-progress": ["working"],
      working: ["resolved"],
      resolved: ["closed"],
      closed: [],
    };
    return transitions[currentStatus] || [];
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Assigned Issues
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and update your assigned issues
          </p>
        </div>
        <div className="badge badge-lg badge-primary">
          Total: {data?.total || 0}
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered input-sm sm:input-md w-full"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
            />

            <select
              className="select select-bordered select-sm sm:select-md w-full"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value, page: 1 })
              }
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="working">Working</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              className="select select-bordered select-sm sm:select-md w-full sm:col-span-2 lg:col-span-1"
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

      {/* Issues - Desktop Table */}
      <div className="hidden lg:block card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-sm lg:table-md">
              <thead className="bg-gray-50">
                <tr>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Reporter</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <p className="text-lg font-semibold">
                          No issues assigned
                        </p>
                        <p className="text-sm">
                          You don't have any assigned issues yet
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  issues.map((issue) => {
                    const nextStatuses = getNextStatuses(issue.status);
                    return (
                      <tr key={issue._id} className="hover">
                        <td>
                          <div className="max-w-xs">
                            <div className="font-medium truncate text-sm">
                              {issue.title}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {issue.description?.substring(0, 50)}...
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-outline badge-sm">
                            {issue.category}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              issue.status === "pending"
                                ? "badge-warning"
                                : issue.status === "in-progress"
                                ? "badge-info"
                                : issue.status === "working"
                                ? "badge-primary"
                                : issue.status === "resolved"
                                ? "badge-success"
                                : "badge-neutral"
                            }`}
                          >
                            {issue.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-sm ${
                              issue.priority === "high"
                                ? "badge-error"
                                : "badge-ghost"
                            }`}
                          >
                            {issue.priority === "high" ? "🔥 High" : "Normal"}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="w-8 h-8 rounded-full">
                                <img
                                  src={issue.reporter?.photo}
                                  alt={issue.reporter?.name}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-xs">
                                {issue.reporter?.name}
                              </div>
                              <div className="text-[10px] text-gray-500 truncate max-w-[100px]">
                                {issue.reporter?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-xs">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            {nextStatuses.length > 0 && (
                              <div className="dropdown dropdown-end">
                                <button
                                  tabIndex={0}
                                  className="btn btn-xs btn-primary"
                                  disabled={changeStatusMutation.isPending}
                                >
                                  {changeStatusMutation.isPending ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                  ) : (
                                    <>
                                      Status
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </>
                                  )}
                                </button>
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-52 border"
                                >
                                  {nextStatuses.map((status) => (
                                    <li key={status}>
                                      <button
                                        onClick={() =>
                                          handleStatusChange(issue, status)
                                        }
                                        className="text-xs"
                                      >
                                        {status === "in-progress" &&
                                          "Mark as In Progress"}
                                        {status === "working" &&
                                          "Mark as Working"}
                                        {status === "resolved" &&
                                          "Mark as Resolved"}
                                        {status === "closed" &&
                                          "Mark as Closed"}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <Link
                              to={`/issue-details/${issue._id}`}
                              className="btn btn-xs btn-info"
                            >
                              View
                            </Link>

                            {issue.status === "closed" && (
                              <span className="badge badge-success badge-xs gap-1">
                                ✓
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issues - Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-3">
        {issues.length === 0 ? (
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-8 text-gray-500">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-base font-semibold">No issues assigned</p>
              <p className="text-sm mt-1">
                You don't have any assigned issues yet
              </p>
            </div>
          </div>
        ) : (
          issues.map((issue) => {
            const nextStatuses = getNextStatuses(issue.status);
            return (
              <div key={issue._id} className="card bg-white shadow-lg">
                <div className="card-body p-4 space-y-3">
                  {/* Title & Description */}
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base mb-2">
                      {issue.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge badge-outline badge-xs sm:badge-sm">
                      {issue.category}
                    </span>
                    <span
                      className={`badge badge-xs sm:badge-sm ${
                        issue.status === "pending"
                          ? "badge-warning"
                          : issue.status === "in-progress"
                          ? "badge-info"
                          : issue.status === "working"
                          ? "badge-primary"
                          : issue.status === "resolved"
                          ? "badge-success"
                          : "badge-neutral"
                      }`}
                    >
                      {issue.status}
                    </span>
                    <span
                      className={`badge badge-xs sm:badge-sm ${
                        issue.priority === "high"
                          ? "badge-error"
                          : "badge-ghost"
                      }`}
                    >
                      {issue.priority === "high" ? "🔥" : "📋"}
                    </span>
                  </div>

                  {/* Reporter & Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-6 h-6 rounded-full">
                          <img
                            src={issue.reporter?.photo}
                            alt={issue.reporter?.name}
                          />
                        </div>
                      </div>
                      <span className="truncate max-w-[120px]">
                        {issue.reporter?.name}
                      </span>
                    </div>
                    <span>
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {nextStatuses.length > 0 && (
                      <div className="dropdown dropdown-end flex-1">
                        <button
                          tabIndex={0}
                          className="btn btn-xs sm:btn-sm btn-primary w-full"
                          disabled={changeStatusMutation.isPending}
                        >
                          {changeStatusMutation.isPending ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Change Status"
                          )}
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-full border mt-1"
                        >
                          {nextStatuses.map((status) => (
                            <li key={status}>
                              <button
                                onClick={() =>
                                  handleStatusChange(issue, status)
                                }
                                className="text-xs sm:text-sm"
                              >
                                {status === "in-progress" && "In Progress"}
                                {status === "working" && "Working"}
                                {status === "resolved" && "Resolved"}
                                {status === "closed" && "Closed"}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      to={`/issue-details/${issue._id}`}
                      className="btn btn-xs sm:btn-sm btn-info flex-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={filters.page === 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            >
              «
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum =
                totalPages <= 5
                  ? index + 1
                  : Math.max(
                      1,
                      Math.min(filters.page - 2 + index, totalPages - 4 + index)
                    );
              return (
                <button
                  key={pageNum}
                  className={`join-item btn btn-sm ${
                    filters.page === pageNum ? "btn-active" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, page: pageNum })}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="join-item btn btn-sm"
              disabled={filters.page === totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Status Workflow Info */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
            Status Workflow
          </h3>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap text-xs sm:text-sm">
            <div className="badge badge-warning badge-xs sm:badge-sm">
              Pending
            </div>
            <span className="text-gray-400">→</span>
            <div className="badge badge-info badge-xs sm:badge-sm">
              In Progress
            </div>
            <span className="text-gray-400">→</span>
            <div className="badge badge-primary badge-xs sm:badge-sm">
              Working
            </div>
            <span className="text-gray-400">→</span>
            <div className="badge badge-success badge-xs sm:badge-sm">
              Resolved
            </div>
            <span className="text-gray-400">→</span>
            <div className="badge badge-neutral badge-xs sm:badge-sm">
              Closed
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-3">
            You can only change status to the next step in the workflow.
            Timeline will be automatically updated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignedIssues;