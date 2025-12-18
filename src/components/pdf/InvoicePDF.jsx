import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#10B981",
    paddingBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  companyInfo: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10B981",
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1F2937",
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#4B5563",
  },
  value: {
    color: "#1F2937",
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 10,
    fontWeight: "bold",
    borderBottom: 2,
    borderBottomColor: "#10B981",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottom: 1,
    borderBottomColor: "#E5E7EB",
  },
  col1: { width: "60%" },
  col2: { width: "20%", textAlign: "right" },
  col3: { width: "20%", textAlign: "right" },
  totalSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: 2,
    borderTopColor: "#10B981",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10B981",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 10,
    borderTop: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 15,
  },
  badge: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
});

const InvoicePDF = ({ payment }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>CitizenReport</Text>
            <Text>Public Infrastructure Reporting</Text>
            <Text>Sylhet, Bangladesh</Text>
            <Text>support@citizenreport.com</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>INVOICE</Text>
            <Text>Date: {currentDate}</Text>
            <Text>Invoice #: INV-{payment._id.slice(-8).toUpperCase()}</Text>
          </View>
        </View>

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>Payment Receipt</Text>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
            Bill To:
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{payment.user?.name || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{payment.user?.email || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={styles.value}>{payment.txnId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Date:</Text>
            <Text style={styles.value}>
              {new Date(payment.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Description</Text>
            <Text style={styles.col2}>Type</Text>
            <Text style={styles.col3}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col1}>
              {payment.type === "premium"
                ? "Premium Subscription - Unlimited Features"
                : payment.issue?.title || "Issue Boost Payment"}
            </Text>
            <Text style={styles.col2}>
              {payment.type === "premium" ? "Subscription" : "Boost"}
            </Text>
            <Text style={styles.col3}>{payment.amount} TK</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>{payment.amount} TK</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.label}>Tax (0%):</Text>
            <Text style={styles.value}>0 TK</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>{payment.amount} TK</Text>
          </View>
        </View>

        {/* Payment Status */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text
              style={{
                color: "#10B981",
                fontWeight: "bold",
              }}
            >
              ✓ PAID
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>Online Payment</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your payment!</Text>
          <Text>
            This is a computer-generated invoice and does not require a
            signature.
          </Text>
          <Text style={{ marginTop: 5 }}>
            © 2025 CitizenReport. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
