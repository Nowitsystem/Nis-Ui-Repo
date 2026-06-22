import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, ShieldCheck, Mail, Globe } from "lucide-react";

export default function InvoiceTable({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 print:hidden"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl relative z-10 bg-[#0e0e24] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-white print:border-none print:shadow-none print:bg-white print:text-black print:rounded-none print:max-h-none print:w-full print:p-8"
        >
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-8 print:hidden">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" /> Payment Receipt
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/5"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Invoice Header Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5 print:border-gray-200">
            <div>
              <h2 className="text-2xl font-black text-white print:text-black mb-1">
                {invoice.company?.name || "NIS AI SaaS Technologies"}
              </h2>
              <p className="text-xs text-gray-400 print:text-gray-600 leading-normal max-w-xs">
                {invoice.company?.address || "Suite 404, Tech Park, Bangalore, KA, India"}
              </p>
              <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-500 print:text-gray-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {invoice.company?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {invoice.company?.website}
                </span>
              </div>
            </div>

            <div className="md:text-right">
              <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-1">Invoice Number</h4>
              <p className="font-mono text-sm font-bold text-white print:text-black mb-4">
                {invoice.invoiceNo}
              </p>
              <div className="space-y-1 text-xs text-gray-400 print:text-gray-600">
                <p>
                  Date Purchased:{" "}
                  <span className="font-bold text-white print:text-black">
                    {new Date(invoice.purchasedAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Expiration Date:{" "}
                  <span className="font-bold text-white print:text-black">
                    {new Date(invoice.expiresAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Billed To / Billing details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5 print:border-gray-200">
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Billed To</h4>
              <h5 className="font-bold text-white print:text-black">{invoice.customer?.name}</h5>
              <p className="text-xs text-gray-400 print:text-gray-600 mt-1">{invoice.customer?.email}</p>
            </div>
            <div className="md:text-right">
              <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Payment Details</h4>
              <p className="text-xs text-gray-400 print:text-gray-600">
                Method:{" "}
                <span className="font-semibold text-white print:text-black uppercase">
                  {invoice.paymentDetails?.paymentMethod || "card"}
                </span>
              </p>
              <p className="text-[10px] text-gray-500 print:text-gray-600 mt-1 font-mono">
                Order ID: {invoice.paymentDetails?.razorpayOrderId}
              </p>
              <p className="text-[10px] text-gray-500 print:text-gray-600 font-mono">
                Payment ID: {invoice.paymentDetails?.razorpayPaymentId}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="mb-8">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 print:border-gray-300 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="py-3">Description</th>
                  <th className="py-3">Billing Cycle</th>
                  <th className="py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 print:border-gray-200 text-gray-300 print:text-black font-medium">
                  <td className="py-4">
                    <p className="text-white print:text-black font-bold">{invoice.item?.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">NIS AI SaaS Platform Subscription</p>
                  </td>
                  <td className="py-4 capitalize">{invoice.item?.billingCycle}</td>
                  <td className="py-4 text-right font-bold text-white print:text-black">
                    ${invoice.item?.price}.00 USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cost Summary */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-3 text-sm">
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>Subtotal (USD):</span>
                <span>${invoice.item?.price}.00 USD</span>
              </div>
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>Taxes & Fees:</span>
                <span>$0.00 USD</span>
              </div>
              <div className="h-px bg-white/10 print:bg-gray-300 my-2" />
              <div className="flex justify-between text-base font-black text-white print:text-black">
                <span>Total Paid (INR):</span>
                <span className="text-primary-400 print:text-black">
                  ₹{invoice.paymentDetails?.amountPaid}.00 INR
                </span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center text-xs text-gray-500 print:text-gray-600 border-t border-white/5 print:border-gray-200 pt-6">
            <p>Thank you for choosing NIS AI as your platform partner.</p>
            <p className="mt-1 text-[10px] text-gray-600 print:text-gray-400">
              This is a computer-generated transaction record. No physical signature is required.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
