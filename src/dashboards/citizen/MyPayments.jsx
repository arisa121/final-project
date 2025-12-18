import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const MyPayments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payments/my-payments");
      return res.data;
    },
  });

  const handleDownloadInvoice = async (paymentId) => {
    try {
      const res = await axiosSecure.get(`/api/payments/invoice/${paymentId}`);
      const invoice = res.data;

      Swal.fire({
        title: "Invoice",
        html: `
          <div class="text-left text-xs sm:text-sm">
            <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Date:</strong> ${new Date(
              invoice.date
            ).toLocaleDateString()}</p>
            <p><strong>Customer:</strong> ${invoice.customer.name}</p>
            <p><strong>Description:</strong> ${invoice.items[0].description}</p>
            <p><strong>Amount:</strong> ${invoice.total} TK</p>
            <p><strong>TXN ID:</strong> ${invoice.txnId}</p>
          </div>
        `,
        icon: "info",
        confirmButtonText: "Close",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load invoice",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { payments, summary } = data || {};

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">My Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <p className="text-blue-100 text-xs sm:text-sm">Total Spent</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {summary?.totalSpent || 0} TK
            </h2>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <p className="text-yellow-100 text-xs sm:text-sm">
              Premium Subscriptions
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {summary?.premiumPayments || 0}
            </h2>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
          <div className="card-body p-4 sm:p-5 lg:p-6">
            <p className="text-purple-100 text-xs sm:text-sm">Issue Boosts</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {summary?.boostPayments || 0}
            </h2>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card bg-white shadow-lg">
        <div className="card-body p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-sm lg:text-base">Transaction ID</th>
                  <th className="text-sm lg:text-base">Type</th>
                  <th className="text-sm lg:text-base">Description</th>
                  <th className="text-sm lg:text-base">Amount</th>
                  <th className="text-sm lg:text-base">Date</th>
                  <th className="text-sm lg:text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        <p className="font-semibold">No payments yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  payments?.map((payment) => (
                    <tr key={payment._id} className="hover">
                      <td className="font-mono text-xs sm:text-sm">
                        {payment.txnId}
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            payment.type === "premium"
                              ? "badge-warning"
                              : "badge-accent"
                          }`}
                        >
                          {payment.type}
                        </span>
                      </td>
                      <td className="text-sm">
                        {payment.type === "premium"
                          ? "Premium Subscription"
                          : payment.issue?.title || "Issue Boost"}
                      </td>
                      <td className="font-bold text-green-600 text-sm">
                        {payment.amount} TK
                      </td>
                      <td className="text-xs">
                        {new Date(payment.createdAt).toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDownloadInvoice(payment._id)}
                          className="btn btn-xs btn-ghost"
                        >
                          <th>Invoice</th>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {payments?.length === 0 ? (
              <div className="text-center py-8 text-gray-500 px-4">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <p className="font-semibold text-lg">No payments yet</p>
              </div>
            ) : (
              payments?.map((payment) => (
                <div key={payment._id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-gray-500 truncate">
                        {payment.txnId}
                      </p>
                      <p className="font-medium text-sm mt-1">
                        {payment.type === "premium"
                          ? "Premium Subscription"
                          : payment.issue?.title || "Issue Boost"}
                      </p>
                    </div>
                    <span
                      className={`badge badge-sm ${
                        payment.type === "premium"
                          ? "badge-warning"
                          : "badge-accent"
                      }`}
                    >
                      {payment.type}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-green-600 text-lg">
                        {payment.amount} TK
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownloadInvoice(payment._id)}
                      className="btn btn-xs btn-ghost"
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPayments;