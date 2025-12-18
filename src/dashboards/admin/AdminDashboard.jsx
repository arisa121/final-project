import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { stats, latestIssues, latestPayments, latestUsers } = data || {};

  const issueChartData = {
    labels: ["Pending", "In Progress", "Resolved", "Rejected"],
    datasets: [
      {
        data: [
          stats?.pendingIssues || 0,
          stats?.inProgressIssues || 0,
          stats?.resolvedIssues || 0,
          stats?.rejectedIssues || 0,
        ],
        backgroundColor: ["#fbbf24", "#60a5fa", "#34d399", "#f87171"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: { size: window.innerWidth < 640 ? 10 : 12 },
        },
      },
    },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          Welcome to Admin Dashboard 👋
        </h1>
        <p className="text-sm sm:text-base text-blue-100">
          Monitor and manage the infrastructure reporting system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Total Issues</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.totalIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 lg:p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Resolved</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.resolvedIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 lg:p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs sm:text-sm">Pending</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.pendingIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 lg:p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
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
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">Revenue</p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {stats?.totalRevenue || 0} TK
                </h2>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 lg:p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
              Issue Status Distribution
            </h3>
            <div className="w-full max-w-xs sm:max-w-sm mx-auto">
              <Pie data={issueChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
              Quick Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg text-sm sm:text-base">
                <span className="text-gray-700">Total Issues</span>
                <span className="font-bold text-blue-600">
                  {stats?.totalIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg text-sm sm:text-base">
                <span className="text-gray-700">Resolved</span>
                <span className="font-bold text-green-600">
                  {stats?.resolvedIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-yellow-50 rounded-lg text-sm sm:text-base">
                <span className="text-gray-700">Pending</span>
                <span className="font-bold text-yellow-600">
                  {stats?.pendingIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-red-50 rounded-lg text-sm sm:text-base">
                <span className="text-gray-700">Rejected</span>
                <span className="font-bold text-red-600">
                  {stats?.rejectedIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg text-sm sm:text-base">
                <span className="text-gray-700">Total Revenue</span>
                <span className="font-bold text-purple-600">
                  {stats?.totalRevenue || 0} TK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Issues */}
      <div className="card bg-white shadow-xl">
        <div className="card-body p-0">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h3 className="card-title text-base sm:text-lg lg:text-xl">
              Latest Issues
            </h3>
            <Link
              to="/admin/all-issues"
              className="btn btn-xs sm:btn-sm btn-primary"
            >
              View All
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-sm lg:table-md">
              <thead className="bg-gray-50">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Reporter</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {latestIssues?.map((issue) => (
                  <tr key={issue._id} className="hover">
                    <td className="font-medium text-sm">{issue.title}</td>
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
                            : issue.status === "resolved"
                            ? "badge-success"
                            : "badge-info"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="text-sm">{issue.reporter?.name}</td>
                    <td className="text-xs">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {latestIssues?.map((issue) => (
              <div key={issue._id} className="p-4 space-y-2">
                <div className="font-medium text-sm truncate">
                  {issue.title}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge badge-outline badge-xs">
                    {issue.category}
                  </span>
                  <span
                    className={`badge badge-xs ${
                      issue.status === "pending"
                        ? "badge-warning"
                        : issue.status === "resolved"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{issue.reporter?.name}</span>
                  <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Payments & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Latest Payments */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title text-base sm:text-lg lg:text-xl">
                Latest Payments
              </h3>
              <Link
                to="/admin/payments"
                className="btn btn-xs sm:btn-sm btn-primary"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {latestPayments?.map((payment) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {payment.user?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {payment.type}
                    </p>
                  </div>
                  <span className="font-bold text-green-600 text-sm sm:text-base whitespace-nowrap ml-2">
                    {payment.amount} TK
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Users */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title text-base sm:text-lg lg:text-xl">
                Latest Users
              </h3>
              <Link
                to="/admin/manage-users"
                className="btn btn-xs sm:btn-sm btn-primary"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {latestUsers?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="avatar">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                      <img
                        src={user.photo || "https://via.placeholder.com/150"}
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {user.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  {user.isPremium && (
                    <span className="badge badge-warning badge-xs sm:badge-sm whitespace-nowrap">
                      Premium
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
