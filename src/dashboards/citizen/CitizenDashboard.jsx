// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hook/useAuth";
// import { Pie } from "react-chartjs-2";
// import "chart.js/auto";
// import axiosSecure from "../../api/axiosSecure";

// const CitizenDashboard = () => {
//   const { user } = useAuth();

//   // Fetch stats
//   const {
//     data: stats,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["citizen-stats", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/api/issues/citizen-stats/${user.email}`
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//     retry: 1,
//   });

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   // Error State
//   if (isError) {
//     return (
//       <div className="p-10">
//         <div className="alert alert-error">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current shrink-0 h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>
//             Error: {error?.message || "Failed to load dashboard stats"}
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // No Data State
//   if (!stats) {
//     return (
//       <div className="p-10">
//         <div className="alert alert-warning">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current shrink-0 h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//             />
//           </svg>
//           <span>No stats available</span>
//         </div>
//       </div>
//     );
//   }

//   // Chart Data
//   const chartData = {
//     labels: ["Pending", "In-Progress", "Resolved"],
//     datasets: [
//       {
//         data: [stats.pending || 0, stats.inProgress || 0, stats.resolved || 0],
//         backgroundColor: ["#fbbf24", "#60a5fa", "#34d399"],
//         borderWidth: 2,
//         borderColor: "#fff",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           padding: 20,
//           font: {
//             size: 12,
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || "";
//             const value = context.parsed || 0;
//             const total = stats.totalIssues || 0;
//             const percentage =
//               total > 0 ? ((value / total) * 100).toFixed(1) : 0;
//             return `${label}: ${value} (${percentage}%)`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
//         <p className="text-gray-600">Overview of your reported issues</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//         {/* Total Issues */}
//         <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl p-4 sm:p-6">
//           <div className="stat-figure text-white opacity-20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-6 h-6 sm:w-8 sm:h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//           </div>
//           <div className="stat-title text-white opacity-80">Total Issues</div>
//           <div className="stat-value">{stats.totalIssues || 0}</div>
//         </div>

//         {/* Pending */}
//         <div className="stat bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg rounded-xl p-6">
//           <div className="stat-figure text-white opacity-20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-6 h-6 sm:w-8 sm:h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <div className="stat-title text-white opacity-80">Pending</div>
//           <div className="stat-value">{stats.pending || 0}</div>
//         </div>

//         {/* In Progress */}
//         <div className="stat bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg rounded-xl p-6">
//           <div className="stat-figure text-white opacity-20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-6 h-6 sm:w-8 sm:h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//           </div>
//           <div className="stat-title text-white opacity-80">In Progress</div>
//           <div className="stat-value text-2xl sm:text-3xl lg:text-4xl">
//             {stats.inProgress || 0}
//           </div>
//         </div>

//         {/* Resolved */}
//         <div className="stat bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg rounded-xl p-6">
//           <div className="stat-figure text-white opacity-20">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-6 h-6 sm:w-8 sm:h-8 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <div className="stat-title text-white opacity-80">Resolved</div>
//           <div className="stat-value">{stats.resolved || 0}</div>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-white p-4 sm:p-6 shadow-lg rounded-xl">
//         <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
//           Issue Status Distribution
//         </h3>

//         {stats.totalIssues > 0 ? (
//           <div className="max-w-full sm:max-w-md mx-auto">
//             <Pie data={chartData} options={chartOptions} />
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//               />
//             </svg>
//             <p className="mt-4 text-gray-500">No issues reported yet</p>
//             <p className="text-sm text-gray-400">
//               Start reporting issues to see statistics
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CitizenDashboard;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const CitizenDashboard = () => {
  const { user } = useAuth();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6 lg:p-10">
        <div className="alert alert-error">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm sm:text-base">
            Error: {error?.message || "Failed to load dashboard stats"}
          </span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 sm:p-6 lg:p-10">
        <div className="alert alert-warning">
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
          <span className="text-sm sm:text-base">No stats available</span>
        </div>
      </div>
    );
  }

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
          padding: 15,
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          My Dashboard
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Overview of your reported issues
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Issues */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg rounded-xl p-4 sm:p-5 lg:p-6 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs sm:text-sm text-purple-100 mb-1">
                Total Issues
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {stats.totalIssues || 0}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-30"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg rounded-xl p-4 sm:p-5 lg:p-6 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs sm:text-sm text-yellow-100 mb-1">Pending</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {stats.pending || 0}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-30"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg rounded-xl p-4 sm:p-5 lg:p-6 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs sm:text-sm text-blue-100 mb-1">
                In Progress
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {stats.inProgress || 0}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-30"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg rounded-xl p-4 sm:p-5 lg:p-6 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs sm:text-sm text-green-100 mb-1">Resolved</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {stats.resolved || 0}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-30"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg rounded-xl">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
          Issue Status Distribution
        </h3>

        {stats.totalIssues > 0 ? (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <Pie data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="text-center py-8 sm:py-10">
            <svg
              className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400"
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
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 font-medium">
              No issues reported yet
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Start reporting issues to see statistics
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;