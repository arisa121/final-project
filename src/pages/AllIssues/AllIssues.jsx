import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hook/useAuth";

const AllIssues = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priority: "",
    search: "",
    page: 1,
    limit: 12,
  });

  // Fetch All Issues with Filters
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-issues", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/issues", {
        params: filters,
      });
      return res.data;
    },
  });

  // Upvote Mutation
  const upvoteMutation = useMutation({
    mutationFn: async (issueId) => {
      const res = await axiosSecure.post(`/api/issues/${issueId}/upvote`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-issues"]);
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

  // Handle Upvote
  const handleUpvote = (issue) => {
    // Check if user is logged in
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to upvote issues",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Check if user is trying to upvote their own issue
    if (
      issue.reporter._id === user._id ||
      issue.reporter.email === user.email
    ) {
      Swal.fire({
        icon: "warning",
        title: "Cannot Upvote",
        text: "You cannot upvote your own issue",
      });
      return;
    }

    // Check if already upvoted
    if (
      issue.upvotedBy?.includes(user._id) ||
      issue.upvotedBy?.includes(user.email)
    ) {
      Swal.fire({
        icon: "info",
        title: "Already Upvoted",
        text: "You have already upvoted this issue",
      });
      return;
    }

    upvoteMutation.mutate(issue._id);
  };

  // Handle Filter Change
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setFilters({ ...filters, search: searchValue, page: 1 });
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      category: "",
      status: "",
      priority: "",
      search: "",
      page: 1,
      limit: 12,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10">
        <div className="alert alert-error">
          <span>Failed to load issues</span>
        </div>
      </div>
    );
  }

  const issues = data?.issues || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div className="container-responsive px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Issues</h1>
        <p className="text-gray-600">
          Browse and upvote public infrastructure issues
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search by title, category, or location..."
              className="input input-bordered flex-1"
              defaultValue={filters.search}
            />
            <button type="submit" className="btn btn-primary">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </form>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="select select-bordered"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Select Category</option>
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

          <select
            className="select select-bordered"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            className="select select-bordered"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>

          <button onClick={resetFilters} className="btn btn-outline">
            Reset Filters
          </button>
        </div>

        {/* Active Filters Display */}
        {(filters.category ||
          filters.status ||
          filters.priority ||
          filters.search) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active Filters:</span>
            {filters.category && (
              <span className="badge badge-primary">{filters.category}</span>
            )}
            {filters.status && (
              <span className="badge badge-info">{filters.status}</span>
            )}
            {filters.priority && (
              <span className="badge badge-warning">{filters.priority}</span>
            )}
            {filters.search && (
              <span className="badge badge-secondary">"{filters.search}"</span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Showing {issues.length} of {total} issues
      </div>

      {/* Issues Grid */}
      {issues.length === 0 ? (
        <div className="text-center py-20">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Issues Found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow border"
            >
              {/* Priority Badge - Positioned Absolutely */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`badge ${
                    issue.priority === "high" ? "badge-error" : "badge-ghost"
                  } badge-lg`}
                >
                  {issue.priority === "high" ? "🔥 High Priority" : "Normal"}
                </span>
              </div>

              {/* Image */}
              <figure className="h-48 overflow-hidden">
                <img
                  src={issue.images?.[0]}
                  alt={issue.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body">
                <h2 className="card-title text-lg line-clamp-2">
                  {issue.title}
                </h2>

                {/* Category & Status Badges */}
                <div className="flex gap-2 mb-2">
                  <span className="badge badge-outline">{issue.category}</span>
                  <span
                    className={`badge ${
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
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="line-clamp-1">
                    {issue.location || "Location not specified"}
                  </span>
                </div>

                {/* Actions */}
                <div className="card-actions justify-between items-center mt-2">
                  {/* Upvote Button */}
                  <button
                    onClick={() => handleUpvote(issue)}
                    disabled={upvoteMutation.isPending}
                    className={`btn btn-sm ${
                      issue.upvotedBy?.includes(user?._id) ||
                      issue.upvotedBy?.includes(user?.email)
                        ? "btn-success"
                        : "btn-outline"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill={
                        issue.upvotedBy?.includes(user?._id) ||
                        issue.upvotedBy?.includes(user?.email)
                          ? "currentColor"
                          : "none"
                      }
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
                    {issue.upvotes || 0}
                  </button>

                  {/* View Details Button */}
                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
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
    </div>
  );
};

export default AllIssues;
