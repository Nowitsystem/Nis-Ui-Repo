import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Shield, AlertCircle, RefreshCw } from "lucide-react";

export default function PaymentModal({ isOpen, onClose, plan, onPay, loading, error }) {
  if (!isOpen || !plan) return null;

  // Assume conversion rate is 83 INR per USD
  const inrAmount = Math.round(plan.price * 83);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* Backdrop anim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-md relative z-10 glass-dark border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden text-white"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary-600/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600/20 rounded-2xl flex items-center justify-center border border-primary-500/20">
              <Sparkles className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Subscription Checkout</h3>
              <p className="text-xs text-gray-400">Secure payment via Razorpay</p>
            </div>
          </div>

          {/* Plan Summary */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{plan.name} Plan</h4>
                <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white">${plan.price}</span>
                <span className="text-xs text-gray-500">/{plan.billingCycle === "monthly" ? "mo" : "yr"}</span>
              </div>
            </div>

            <div className="h-px bg-white/5 my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${plan.price}.00 USD</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Total in INR (approx):</span>
                <span className="text-primary-400">₹{inrAmount}.00 INR</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-400 leading-normal">{error}</p>
            </div>
          )}

          {/* Details & Security */}
          <div className="flex items-center justify-center gap-2 mb-6 text-center text-xs text-gray-500 font-medium">
            <Shield className="w-4 h-4 text-green-500" />
            <span>256-bit SSL encrypted. 100% Secure.</span>
          </div>

          {/* Actions */}
          <button
            onClick={() => onPay(plan._id)}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <span>Proceed to Pay ₹{inrAmount}</span>
            )}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
