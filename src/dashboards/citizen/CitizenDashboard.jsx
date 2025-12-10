// // src/dashboards/citizen/CitizenDashboard.jsx

// import { useQuery } from "@tanstack/react-query";
// import axiosSecure from "../../api/axiosSecure";

// const CitizenDashboard = () => {
//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["citizen-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/issues/citizen-stats");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <StatCard title="Total Submitted" value={stats.totalIssues || 0} />
//         <StatCard title="Pending" value={stats.pending || 0} />
//         <StatCard title="In Progress" value={stats.inProgress || 0} />
//         <StatCard title="Resolved" value={stats.resolved || 0} />
//         <StatCard title="Payments" value={stats.payments || 0} />
//       </div>

//       <div className="mt-6 bg-white p-4 rounded shadow">
//         {/* Put a chart component here (Recharts / Chart.js) */}
//         <p className="text-gray-500">
//           Chart placeholder — integrate recharts as needed
//         </p>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-4 rounded shadow">
//     <div className="text-sm text-gray-500">{title}</div>
//     <div className="text-2xl font-bold">{value}</div>
//   </div>
// );

// export default CitizenDashboard;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const CitizenDashboard = () => {
  const { user } = useAuth();

  // Fetch stats
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["citizen-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/issues/citizen-stats/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    retry: 1,
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
          <span>
            Error: {error?.message || "Failed to load dashboard stats"}
          </span>
        </div>
      </div>
    );
  }

  // No Data State
  if (!stats) {
    return (
      <div className="p-10">
        <div className="alert alert-warning">
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
          <span>No stats available</span>
        </div>
      </div>
    );
  }

  // Chart Data
  const chartData = {
    labels: ["Pending", "In-Progress", "Resolved"],
    datasets: [
      {
        data: [stats.pending || 0, stats.inProgress || 0, stats.resolved || 0],
        backgroundColor: ["#fbbf24", "#60a5fa", "#34d399"],
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
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = stats.totalIssues || 0;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
        <p className="text-gray-600">Overview of your reported issues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Issues */}
        <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl p-6">
          <div className="stat-figure text-white opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="stat-title text-white opacity-80">Total Issues</div>
          <div className="stat-value">{stats.totalIssues || 0}</div>
        </div>

        {/* Pending */}
        <div className="stat bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg rounded-xl p-6">
          <div className="stat-figure text-white opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="stat-title text-white opacity-80">Pending</div>
          <div className="stat-value">{stats.pending || 0}</div>
        </div>

        {/* In Progress */}
        <div className="stat bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg rounded-xl p-6">
          <div className="stat-figure text-white opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="stat-title text-white opacity-80">In Progress</div>
          <div className="stat-value">{stats.inProgress || 0}</div>
        </div>

        {/* Resolved */}
        <div className="stat bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg rounded-xl p-6">
          <div className="stat-figure text-white opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="stat-title text-white opacity-80">Resolved</div>
          <div className="stat-value">{stats.resolved || 0}</div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Issue Status Distribution
        </h3>

        {stats.totalIssues > 0 ? (
          <div className="max-w-md mx-auto">
            <Pie data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="text-center py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-4 text-gray-500">No issues reported yet</p>
            <p className="text-sm text-gray-400">
              Start reporting issues to see statistics
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
