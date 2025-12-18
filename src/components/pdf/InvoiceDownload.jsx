import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

const InvoiceDownload = ({ payment }) => {
  return (
    <PDFDownloadLink
      document={<InvoicePDF payment={payment} />}
      fileName={`invoice-${payment._id}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <button className="btn btn-xs sm:btn-sm btn-disabled w-full sm:w-auto">
            <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
            <span className="hidden sm:inline">Generating...</span>
            <span className="sm:hidden">...</span>
          </button>
        ) : (
          <button className="btn btn-xs sm:btn-sm btn-outline btn-primary w-full sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">Download Invoice</span>
            <span className="sm:hidden">Invoice</span>
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default InvoiceDownload;
