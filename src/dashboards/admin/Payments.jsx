// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import axiosSecure from "../../api/axiosSecure";


// const Payments = () => {
//   const [filters, setFilters] = useState({
//     type: "",
//     startDate: "",
//     endDate: "",
//   });

//   // Fetch All Payments
//   const { data: payments, isLoading } = useQuery({
//     queryKey: ["admin-payments", filters],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/api/admin/payments", {
//         params: filters,
//       });
//       return res.data;
//     },
//   });
  

//   // Fetch Payment Stats for Chart
//   const { data: paymentStats } = useQuery({
//     queryKey: ["payment-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/api/admin/payments/stats");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   // Calculate totals
//   const totalAmount = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
//   const premiumPayments = payments?.filter((p) => p.type === "premium") || [];
//   const boostPayments = payments?.filter((p) => p.type === "boost") || [];

//   // Chart Data
//   const chartData = {
//     labels:
//       paymentStats?.map(
//         (stat) => `${stat._id.year}-${String(stat._id.month).padStart(2, "0")}`
//       ) || [],
//     datasets: [
//       {
//         label: "Revenue (TK)",
//         data: paymentStats?.map((stat) => stat.total) || [],
//         backgroundColor: "rgba(59, 130, 246, 0.5)",
//         borderColor: "rgba(59, 130, 246, 1)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Monthly Revenue",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
//           <p className="text-gray-600">View all payment transactions</p>
//         </div>
//         <div className="badge badge-lg badge-success">
//           Total Revenue: {totalAmount} TK
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-100 text-sm">Total Revenue</p>
//                 <h2 className="text-4xl font-bold">{totalAmount} TK</h2>
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
//                     d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-yellow-100 text-sm">Premium Subscriptions</p>
//                 <h2 className="text-4xl font-bold">{premiumPayments.length}</h2>
//               </div>
//               <div className="bg-white/20 p-4 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 16 16"
//                   className="w-8 h-8"
//                 >
//                   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-purple-100 text-sm">Issue Boosts</p>
//                 <h2 className="text-4xl font-bold">{boostPayments.length}</h2>
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
//       </div>

//       {/* Chart */}
//       {paymentStats && paymentStats.length > 0 && (
//         <div className="card bg-white shadow-lg">
//           <div className="card-body">
//             <h3 className="card-title text-xl mb-4">Revenue Trend</h3>
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="card bg-white shadow-lg">
//         <div className="card-body">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <select
//               className="select select-bordered"
//               value={filters.type}
//               onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//             >
//               <option value="">All Types</option>
//               <option value="premium">Premium Subscription</option>
//               <option value="boost">Issue Boost</option>
//             </select>

//             <input
//               type="date"
//               className="input input-bordered"
//               value={filters.startDate}
//               onChange={(e) =>
//                 setFilters({ ...filters, startDate: e.target.value })
//               }
//               placeholder="Start Date"
//             />

//             <input
//               type="date"
//               className="input input-bordered"
//               value={filters.endDate}
//               onChange={(e) =>
//                 setFilters({ ...filters, endDate: e.target.value })
//               }
//               placeholder="End Date"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Payments Table */}
//       <div className="card bg-white shadow-lg">
//         <div className="card-body p-0">
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th>Transaction ID</th>
//                   <th>User</th>
//                   <th>Type</th>
//                   <th>Amount</th>
//                   <th>Issue</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments?.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center py-8 text-gray-500">
//                       No payments found
//                     </td>
//                   </tr>
//                 ) : (
//                   payments?.map((payment) => (
//                     <tr key={payment._id} className="hover">
//                       <td>
//                         <div className="font-mono text-sm">
//                           {payment.txnId || payment._id.slice(-8)}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="flex items-center gap-2">
//                           <div className="avatar">
//                             <div className="w-8 h-8 rounded-full">
//                               <img
//                                 src={
//                                   payment.user?.photo
                                  
//                                 }
//                                 alt={payment.user?.name}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className="font-medium text-sm">
//                               {payment.user?.name}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {payment.user?.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             payment.type === "premium"
//                               ? "badge-warning"
//                               : "badge-accent"
//                           }`}
//                         >
//                           {payment.type === "premium" ? "Premium" : "Boost"}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="font-bold text-green-600">
//                           {payment.amount} TK
//                         </span>
//                       </td>
//                       <td>
//                         {payment.issue ? (
//                           <div className="text-sm max-w-xs truncate">
//                             {payment.issue.title}
//                           </div>
//                         ) : (
//                           <span className="text-gray-400 text-sm">N/A</span>
//                         )}
//                       </td>
//                       <td>
//                         <div className="text-sm text-gray-600">
//                           {new Date(payment.createdAt).toLocaleString()}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="card bg-white shadow-lg">
//         <div className="card-body">
//           <h3 className="card-title text-xl mb-4">Payment Summary</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="p-4 bg-yellow-50 rounded-lg">
//               <p className="text-sm text-gray-600">Premium Revenue</p>
//               <p className="text-2xl font-bold text-yellow-600">
//                 {premiumPayments.reduce((sum, p) => sum + p.amount, 0)} TK
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 {premiumPayments.length} transactions
//               </p>
//             </div>
//             <div className="p-4 bg-purple-50 rounded-lg">
//               <p className="text-sm text-gray-600">Boost Revenue</p>
//               <p className="text-2xl font-bold text-purple-600">
//                 {boostPayments.reduce((sum, p) => sum + p.amount, 0)} TK
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 {boostPayments.length} transactions
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;


import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";

const Payments = () => {
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });

  // Fetch All Payments
  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/payments", {
        params: filters,
      });
      return res.data;
    },
  });

  // ✅ Extract payments array from response
  const payments = data?.payments || [];
  // const totalCount = data?.total || 0;

  // Fetch Payment Stats for Chart
  const { data: paymentStats } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/payments/stats");
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

  // Calculate totals
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const premiumPayments = payments.filter((p) => p.type === "premium");
  const boostPayments = payments.filter((p) => p.type === "boost");

  // Chart Data
  const chartData = {
    labels:
      paymentStats?.map(
        (stat) => `${stat._id.year}-${String(stat._id.month).padStart(2, "0")}`
      ) || [],
    datasets: [
      {
        label: "Revenue (TK)",
        data: paymentStats?.map((stat) => stat.total) || [],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-600">View all payment transactions</p>
        </div>
        <div className="badge badge-lg badge-success">
          Total Revenue: {totalAmount} TK
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Revenue</p>
                <h2 className="text-4xl font-bold">{totalAmount} TK</h2>
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

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Premium Subscriptions</p>
                <h2 className="text-4xl font-bold">{premiumPayments.length}</h2>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-8 h-8"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Issue Boosts</p>
                <h2 className="text-4xl font-bold">{boostPayments.length}</h2>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      {paymentStats && paymentStats.length > 0 && (
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Revenue Trend</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="select select-bordered"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="premium">Premium Subscription</option>
              <option value="boost">Issue Boost</option>
            </select>

            <input
              type="date"
              className="input input-bordered"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              placeholder="Start Date"
            />

            <input
              type="date"
              className="input input-bordered"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Issue</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment._id} className="hover">
                      <td>
                        <div className="font-mono text-sm">
                          {payment.txnId || payment._id.slice(-8)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                              <img
                                src={
                                  payment.user?.photo ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={payment.user?.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {payment.user?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {payment.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            payment.type === "premium"
                              ? "badge-warning"
                              : "badge-accent"
                          }`}
                        >
                          {payment.type === "premium" ? "Premium" : "Boost"}
                        </span>
                      </td>
                      <td>
                        <span className="font-bold text-green-600">
                          {payment.amount} TK
                        </span>
                      </td>
                      <td>
                        {payment.issue ? (
                          <div className="text-sm max-w-xs truncate">
                            {payment.issue.title}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                      </td>
                      <td>
                        <div className="text-sm text-gray-600">
                          {new Date(payment.createdAt).toLocaleString()}
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

      {/* Summary */}
      <div className="card bg-white shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-xl mb-4">Payment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Premium Revenue</p>
              <p className="text-2xl font-bold text-yellow-600">
                {premiumPayments.reduce((sum, p) => sum + p.amount, 0)} TK
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {premiumPayments.length} transactions
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Boost Revenue</p>
              <p className="text-2xl font-bold text-purple-600">
                {boostPayments.reduce((sum, p) => sum + p.amount, 0)} TK
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {boostPayments.length} transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;