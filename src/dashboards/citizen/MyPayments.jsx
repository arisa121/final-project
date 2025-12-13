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
          <div class="text-left text-sm">
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
          <div className="card-body">
            <p className="text-blue-100 text-sm">Total Spent</p>
            <h2 className="text-4xl font-bold">
              {summary?.totalSpent || 0} TK
            </h2>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
          <div className="card-body">
            <p className="text-yellow-100 text-sm">Premium Subscriptions</p>
            <h2 className="text-4xl font-bold">
              {summary?.premiumPayments || 0}
            </h2>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
          <div className="card-body">
            <p className="text-purple-100 text-sm">Issue Boosts</p>
            <h2 className="text-4xl font-bold">
              {summary?.boostPayments || 0}
            </h2>
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
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No payments yet
                    </td>
                  </tr>
                ) : (
                  payments?.map((payment) => (
                    <tr key={payment._id} className="hover">
                      <td className="font-mono text-sm">{payment.txnId}</td>
                      <td>
                        <span
                          className={`badge ${
                            payment.type === "premium"
                              ? "badge-warning"
                              : "badge-accent"
                          }`}
                        >
                          {payment.type}
                        </span>
                      </td>
                      <td>
                        {payment.type === "premium"
                          ? "Premium Subscription"
                          : payment.issue?.title || "Issue Boost"}
                      </td>
                      <td className="font-bold text-green-600">
                        {payment.amount} TK
                      </td>
                      <td className="text-sm">
                        {new Date(payment.createdAt).toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDownloadInvoice(payment._id)}
                          className="btn btn-xs btn-ghost"
                        >
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPayments;