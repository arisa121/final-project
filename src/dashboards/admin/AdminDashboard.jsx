import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Pie} from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const AdminDashboard = () => {
  // Fetch Admin Stats
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

  // Chart Data - Issue Status
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

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Admin Dashboard 👋
        </h1>
        <p className="text-blue-100">
          Monitor and manage the infrastructure reporting system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Issues */}
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Issues</p>
                <h2 className="text-4xl font-bold">
                  {stats?.totalIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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

        {/* Resolved Issues */}
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Resolved</p>
                <h2 className="text-4xl font-bold">
                  {stats?.resolvedIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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

        {/* Pending Issues */}
        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <h2 className="text-4xl font-bold">
                  {stats?.pendingIssues || 0}
                </h2>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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

        {/* Total Revenue */}
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Revenue</p>
                <h2 className="text-4xl font-bold">
                  {stats?.totalRevenue || 0} TK
                </h2>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Status Chart */}
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">
              Issue Status Distribution
            </h3>
            <div className="max-w-sm mx-auto">
              <Pie data={issueChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Quick Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Total Issues</span>
                <span className="font-bold text-blue-600">
                  {stats?.totalIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Resolved</span>
                <span className="font-bold text-green-600">
                  {stats?.resolvedIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Pending</span>
                <span className="font-bold text-yellow-600">
                  {stats?.pendingIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700">Rejected</span>
                <span className="font-bold text-red-600">
                  {stats?.rejectedIssues || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
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
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-xl">Latest Issues</h3>
            <Link to="/admin/all-issues" className="btn btn-sm btn-primary">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
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
                    <td className="font-medium">{issue.title}</td>
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
                            : issue.status === "resolved"
                            ? "badge-success"
                            : "badge-info"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td>{issue.reporter?.name}</td>
                    <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Payments & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Payments */}
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title text-xl">Latest Payments</h3>
              <Link to="/admin/payments" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {latestPayments?.map((payment) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-medium">{payment.user?.name}</p>
                    <p className="text-sm text-gray-600">{payment.type}</p>
                  </div>
                  <span className="font-bold text-green-600">
                    {payment.amount} TK
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Latest Users */}
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title text-xl">Latest Users</h3>
              <Link to="/admin/manage-users" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {latestUsers?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={user.photo || "https://via.placeholder.com/150"}
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  {user.isPremium && (
                    <span className="badge badge-warning badge-sm">
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
