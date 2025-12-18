// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import axiosSecure from "../../api/axiosSecure";


// const StaffDashboard = () => {
//   // Fetch Staff Stats
//   const { data: stats, isLoading: statsLoading } = useQuery({
//     queryKey: ["staff-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/api/staff/stats");
//       return res.data;
//     },
//   });

//   // Fetch Recent Assigned Issues
//   const { data: recentIssues, isLoading: issuesLoading } = useQuery({
//     queryKey: ["recent-assigned-issues"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/api/staff/assigned-issues", {
//         params: { limit: 5 },
//       });
//       return res.data.issues;
//     },
//   });

//   if (statsLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   // Chart Data - Issue Status Distribution
//   const statusChartData = {
//     labels: ["Pending", "In Progress", "Resolved"],
//     datasets: [
//       {
//         data: [
//           stats?.pendingCount || 0,
//           stats?.inProgressCount || 0,
//           stats?.resolvedIssuesCount || 0,
//         ],
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
//           padding: 15,
//           font: { size: 12 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome Back, Staff Member! 👋
//         </h1>
//         <p className="text-green-100">
//           Manage your assigned issues and track your progress
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total Assigned */}
//         <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm">Total Assigned</p>
//                 <h2 className="text-4xl font-bold">
//                   {stats?.assignedIssuesCount || 0}
//                 </h2>
//               </div>
//               <div className="bg-white/20 p-4 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
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
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resolved */}
//         <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100 text-sm">Resolved</p>
//                 <h2 className="text-4xl font-bold">
//                   {stats?.resolvedIssuesCount || 0}
//                 </h2>
//               </div>
//               <div className="bg-white/20 p-4 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* In Progress */}
//         <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-yellow-100 text-sm">In Progress</p>
//                 <h2 className="text-4xl font-bold">
//                   {stats?.inProgressCount || 0}
//                 </h2>
//               </div>
//               <div className="bg-white/20 p-4 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Today's Tasks */}
//         <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm">Today's Tasks</p>
//                 <h2 className="text-4xl font-bold">
//                   {stats?.todaysTasks || 0}
//                 </h2>
//               </div>
//               <div className="bg-white/20 p-4 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Status Distribution Chart */}
//         <div className="card bg-white shadow-xl">
//           <div className="card-body">
//             <h3 className="card-title text-xl mb-4">Status Distribution</h3>
//             <div className="max-w-sm mx-auto">
//               <Doughnut data={statusChartData} options={chartOptions} />
//             </div>
//           </div>
//         </div>

//         {/* Performance Overview */}
//         <div className="card bg-white shadow-xl">
//           <div className="card-body">
//             <h3 className="card-title text-xl mb-4">Performance Overview</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                 <span className="text-gray-700">Total Assigned</span>
//                 <span className="font-bold text-blue-600">
//                   {stats?.assignedIssuesCount || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
//                 <span className="text-gray-700">Resolved</span>
//                 <span className="font-bold text-green-600">
//                   {stats?.resolvedIssuesCount || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
//                 <span className="text-gray-700">In Progress</span>
//                 <span className="font-bold text-yellow-600">
//                   {stats?.inProgressCount || 0}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
//                 <span className="text-gray-700">Pending</span>
//                 <span className="font-bold text-red-600">
//                   {stats?.pendingCount || 0}
//                 </span>
//               </div>
//               <div className="divider"></div>
//               <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
//                 <span className="text-gray-700 font-semibold">
//                   Success Rate
//                 </span>
//                 <span className="font-bold text-purple-600">
//                   {stats?.assignedIssuesCount > 0
//                     ? Math.round(
//                         (stats.resolvedIssuesCount /
//                           stats.assignedIssuesCount) *
//                           100
//                       )
//                     : 0}
//                   %
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Assigned Issues */}
//       <div className="card bg-white shadow-xl">
//         <div className="card-body">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="card-title text-xl">Recent Assigned Issues</h3>
//             <Link
//               to="/staff/assigned-issues"
//               className="btn btn-sm btn-primary"
//             >
//               View All
//             </Link>
//           </div>

//           {issuesLoading ? (
//             <div className="flex justify-center py-8">
//               <span className="loading loading-spinner loading-md"></span>
//             </div>
//           ) : recentIssues?.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400 mb-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                 />
//               </svg>
//               <p>No issues assigned yet</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Category</th>
//                     <th>Status</th>
//                     <th>Priority</th>
//                     <th>Reporter</th>
//                     <th>Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentIssues?.map((issue) => (
//                     <tr key={issue._id} className="hover">
//                       <td className="font-medium max-w-xs truncate">
//                         {issue.title}
//                       </td>
//                       <td>
//                         <span className="badge badge-outline">
//                           {issue.category}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             issue.status === "pending"
//                               ? "badge-warning"
//                               : issue.status === "in-progress" ||
//                                 issue.status === "working"
//                               ? "badge-info"
//                               : issue.status === "resolved"
//                               ? "badge-success"
//                               : "badge-neutral"
//                           }`}
//                         >
//                           {issue.status}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             issue.priority === "high"
//                               ? "badge-error"
//                               : "badge-ghost"
//                           }`}
//                         >
//                           {issue.priority === "high" ? "🔥 High" : "Normal"}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="flex items-center gap-2">
//                           <div className="avatar">
//                             <div className="w-8 h-8 rounded-full">
//                               <img
//                                 src={
//                                   issue.reporter?.photo
                                 
//                                 }
//                                 alt={issue.reporter?.name}
//                               />
//                             </div>
//                           </div>
//                           <span className="text-sm">
//                             {issue.reporter?.name}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="text-sm text-gray-600">
//                         {new Date(issue.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link
//           to="/staff/assigned-issues"
//           className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
//         >
//           <div className="card-body">
//             <div className="flex items-center gap-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//                 />
//               </svg>
//               <div>
//                 <h3 className="font-bold text-lg">View All Issues</h3>
//                 <p className="text-sm text-blue-100">Manage assigned issues</p>
//               </div>
//             </div>
//           </div>
//         </Link>

//         <Link
//           to="/staff/profile"
//           className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow"
//         >
//           <div className="card-body">
//             <div className="flex items-center gap-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//               <div>
//                 <h3 className="font-bold text-lg">My Profile</h3>
//                 <p className="text-sm text-green-100">
//                   Update your information
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>

//         <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
//           <div className="card-body">
//             <div className="flex items-center gap-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//               <div>
//                 <h3 className="font-bold text-lg">Performance</h3>
//                 <p className="text-sm text-purple-100">
//                   {stats?.assignedIssuesCount > 0
//                     ? Math.round(
//                         (stats.resolvedIssuesCount /
//                           stats.assignedIssuesCount) *
//                           100
//                       )
//                     : 0}
//                   % Success Rate
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const StaffDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["staff-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/staff/stats");
      return res.data;
    },
  });

  const { data: recentIssues, isLoading: issuesLoading } = useQuery({
    queryKey: ["recent-assigned-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/staff/assigned-issues", {
        params: { limit: 5 },
      });
      return res.data.issues;
    },
  });

  if (statsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const statusChartData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: [
          stats?.pendingCount || 0,
          stats?.inProgressCount || 0,
          stats?.resolvedIssuesCount || 0,
        ],
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
          font: { size: window.innerWidth < 640 ? 10 : 12 },
        },
      },
    },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          Welcome Back, Staff Member! 👋
        </h1>
        <p className="text-sm sm:text-base text-green-100">
          Manage your assigned issues and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Assigned */}
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">
                  Total Assigned
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.assignedIssuesCount || 0}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Resolved */}
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Resolved</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.resolvedIssuesCount || 0}
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

        {/* In Progress */}
        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs sm:text-sm">
                  In Progress
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.inProgressCount || 0}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">
                  Today's Tasks
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats?.todaysTasks || 0}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Status Distribution Chart */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
              Status Distribution
            </h3>
            <div className="w-full max-w-xs sm:max-w-sm mx-auto">
              <Doughnut data={statusChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
              Performance Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">
                  Total Assigned
                </span>
                <span className="font-bold text-blue-600 text-sm sm:text-base">
                  {stats?.assignedIssuesCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">
                  Resolved
                </span>
                <span className="font-bold text-green-600 text-sm sm:text-base">
                  {stats?.resolvedIssuesCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">
                  In Progress
                </span>
                <span className="font-bold text-yellow-600 text-sm sm:text-base">
                  {stats?.inProgressCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700 text-sm sm:text-base">
                  Pending
                </span>
                <span className="font-bold text-red-600 text-sm sm:text-base">
                  {stats?.pendingCount || 0}
                </span>
              </div>
              <div className="divider my-2"></div>
              <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-semibold text-sm sm:text-base">
                  Success Rate
                </span>
                <span className="font-bold text-purple-600 text-sm sm:text-base">
                  {stats?.assignedIssuesCount > 0
                    ? Math.round(
                        (stats.resolvedIssuesCount /
                          stats.assignedIssuesCount) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assigned Issues */}
      <div className="card bg-white shadow-xl">
        <div className="card-body p-0">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h3 className="card-title text-base sm:text-lg lg:text-xl">
              Recent Assigned Issues
            </h3>
            <Link
              to="/staff/assigned-issues"
              className="btn btn-xs sm:btn-sm btn-primary"
            >
              View All
            </Link>
          </div>

          {issuesLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : recentIssues?.length === 0 ? (
            <div className="text-center py-8 text-gray-500 px-4">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-2"
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
              <p className="text-sm sm:text-base">No issues assigned yet</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table table-sm lg:table-md">
                  <thead className="bg-gray-50">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Reporter</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentIssues?.map((issue) => (
                      <tr key={issue._id} className="hover">
                        <td className="font-medium max-w-xs truncate text-sm">
                          {issue.title}
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
                                : issue.status === "in-progress" ||
                                  issue.status === "working"
                                ? "badge-info"
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
                            <span className="text-sm">
                              {issue.reporter?.name}
                            </span>
                          </div>
                        </td>
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
                {recentIssues?.map((issue) => (
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
                            : issue.status === "in-progress" ||
                              issue.status === "working"
                            ? "badge-info"
                            : issue.status === "resolved"
                            ? "badge-success"
                            : "badge-neutral"
                        }`}
                      >
                        {issue.status}
                      </span>
                      <span
                        className={`badge badge-xs ${
                          issue.priority === "high"
                            ? "badge-error"
                            : "badge-ghost"
                        }`}
                      >
                        {issue.priority === "high" ? "🔥" : "📋"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{issue.reporter?.name}</span>
                      <span>
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Link
          to="/staff/assigned-issues"
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  View All Issues
                </h3>
                <p className="text-xs sm:text-sm text-blue-100">
                  Manage assigned issues
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/staff/profile"
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-base sm:text-lg">My Profile</h3>
                <p className="text-xs sm:text-sm text-green-100">
                  Update your information
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Performance</h3>
                <p className="text-xs sm:text-sm text-purple-100">
                  {stats?.assignedIssuesCount > 0
                    ? Math.round(
                        (stats.resolvedIssuesCount /
                          stats.assignedIssuesCount) *
                          100
                      )
                    : 0}
                  % Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
