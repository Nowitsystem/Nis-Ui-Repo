import React from "react";
import { Download, AlertCircle, FileText } from "lucide-react";

export default function BillingHistory({ history, loading, onOpenInvoice }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-primary-500 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="p-8 text-center bg-white/5 border border-white/5 rounded-3xl border-dashed">
        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-sm font-semibold">No Billing History Available</p>
        <p className="text-xs text-gray-500 mt-1">Once you upgrade or purchase a plan, logs will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Invoice</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Plan</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Amount Paid</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Method</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {history.map((payment) => {
              const dateStr = new Date(payment.createdAt || payment.purchasedAt).toLocaleDateString();
              const isSuccess = payment.status === "completed";
              const isFailed = payment.status === "failed";

              return (
                <tr
                  key={payment._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all text-sm text-gray-300"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-white">
                    {payment.invoiceNo || `TX-${payment._id.substring(0, 8).toUpperCase()}`}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {payment.planId?.name || "Premium Plan"}
                  </td>
                  <td className="px-6 py-4">
                    ₹{payment.amount} <span className="text-[10px] text-gray-500 uppercase">{payment.currency}</span>
                  </td>
                  <td className="px-6 py-4 uppercase text-xs tracking-wider">
                    {payment.paymentMethod || "Razorpay"}
                  </td>
                  <td className="px-6 py-4">{dateStr}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isSuccess
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : isFailed
                          ? "bg-red-500/10 text-red-500 border border-red-500/20"
                          : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isSuccess && (
                      <button
                        onClick={() => onOpenInvoice(payment._id)}
                        className="p-2 text-primary-400 hover:text-white bg-primary-600/10 hover:bg-primary-600 rounded-xl transition-all inline-flex items-center gap-1.5 text-xs font-bold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
