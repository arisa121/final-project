import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axiosSecure from "../../api/axiosSecure";
import InvoiceDownload from "../../components/pdf/InvoiceDownload";

const Payments = () => {
  const [filters, setFilters] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/payments", {
        params: filters,
      });
      return res.data;
    },
  });

  const payments = data?.payments || [];

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

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const premiumPayments = payments.filter((p) => p.type === "premium");
  const boostPayments = payments.filter((p) => p.type === "boost");

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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: window.innerWidth < 640 ? "bottom" : "top",
        labels: {
          font: { size: window.innerWidth < 640 ? 10 : 12 },
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        font: { size: window.innerWidth < 640 ? 14 : 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Payments
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            View all payment transactions
          </p>
        </div>
        <div className="badge badge-lg badge-success text-xs sm:text-sm">
          Total Revenue: {totalAmount} TK
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">
                  Total Revenue
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {totalAmount} TK
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

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs sm:text-sm">
                  Premium Subscriptions
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {premiumPayments.length}
                </h2>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 lg:p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 sm:w-7 sm:w-7 lg:w-8 lg:h-8"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl sm:col-span-2 lg:col-span-1">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">
                  Issue Boosts
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {boostPayments.length}
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
      </div>

      {/* Chart */}
      {paymentStats && paymentStats.length > 0 && (
        <div className="card bg-white shadow-lg">
          <div className="card-body p-4 sm:p-6">
            <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
              Revenue Trend
            </h3>
            <div className="w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <select
              className="select select-bordered select-sm sm:select-md w-full"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="premium">Premium Subscription</option>
              <option value="boost">Issue Boost</option>
            </select>

            <input
              type="date"
              className="input input-bordered input-sm sm:input-md w-full"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              placeholder="Start Date"
            />

            <input
              type="date"
              className="input input-bordered input-sm sm:input-md w-full sm:col-span-2 lg:col-span-1"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block card bg-white shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-sm lg:table-md">
              <thead className="bg-gray-50">
                <tr>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Issue</th>
                  <th>Date</th>
                  <th>Invoice</th>
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
                        <div className="font-mono text-xs sm:text-sm">
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
                            <div className="font-medium text-xs">
                              {payment.user?.name}
                            </div>
                            <div className="text-[10px] text-gray-500 truncate max-w-[100px]">
                              {payment.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            payment.type === "premium"
                              ? "badge-warning"
                              : "badge-accent"
                          }`}
                        >
                          {payment.type === "premium" ? "Premium" : "Boost"}
                        </span>
                      </td>
                      <td>
                        <span className="font-bold text-green-600 text-sm">
                          {payment.amount} TK
                        </span>
                      </td>
                      <td>
                        {payment.issue ? (
                          <div className="text-xs max-w-xs truncate">
                            {payment.issue.title}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td>
                        <div className="text-xs text-gray-600">
                          {new Date(payment.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td>
                        <InvoiceDownload payment={payment} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {payments.length === 0 ? (
          <div className="card bg-white shadow-lg">
            <div className="card-body text-center py-8 text-gray-500">
              <p className="text-base">No payments found</p>
            </div>
          </div>
        ) : (
          payments.map((payment) => (
            <div key={payment._id} className="card bg-white shadow-lg">
              <div className="card-body p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={
                            payment.user?.photo ||
                            "https://via.placeholder.com/150"
                          }
                          alt={payment.user?.name}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {payment.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {payment.user?.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge badge-sm ${
                      payment.type === "premium"
                        ? "badge-warning"
                        : "badge-accent"
                    }`}
                  >
                    {payment.type === "premium" ? "Premium" : "Boost"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-bold text-green-600 text-lg">
                      {payment.amount} TK
                    </p>
                  </div>
                  {payment.issue && (
                    <div className="text-right flex-1 min-w-0 ml-2">
                      <p className="text-xs text-gray-500">Issue</p>
                      <p className="text-xs font-medium truncate">
                        {payment.issue.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span className="font-mono">
                    {payment.txnId || payment._id.slice(-8)}
                  </span>
                  <span>
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-2 border-t flex justify-end">
                  <InvoiceDownload payment={payment} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-base sm:text-lg lg:text-xl mb-4">
            Payment Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600">
                Premium Revenue
              </p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                {premiumPayments.reduce((sum, p) => sum + p.amount, 0)} TK
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {premiumPayments.length} transactions
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600">Boost Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
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