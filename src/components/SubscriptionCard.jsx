import React from "react";
import { motion } from "framer-motion";
import { Zap, Calendar, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

export default function SubscriptionCard({ subscription, plans, onCancel, cancelLoading }) {
  if (!subscription) {
    return (
      <div className="bg-[#0c0c1e] border border-white/5 p-8 rounded-3xl text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Active Subscription</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
          You are currently on the trial plan. Select a premium tier to unlock advanced AI interview capabilities.
        </p>
      </div>
    );
  }

  const activePlan = plans.find(
    (p) => p._id === (subscription.planId?._id || subscription.planId)
  );

  const isFree = activePlan?.price === 0 || subscription.paymentMethod === "free";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0c0c1e] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-primary-500/20 transition-all duration-300"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

      {/* Plan Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-xs font-bold border border-primary-500/20 uppercase tracking-widest">
              {activePlan?.name || "Premium"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                subscription.status === "active"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {subscription.status}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {isFree ? "Free Account" : `$${activePlan?.price || 0}`}
            {!isFree && (
              <span className="text-sm text-gray-500 font-medium">
                /{activePlan?.billingCycle === "monthly" ? "mo" : "yr"}
              </span>
            )}
          </h3>
        </div>

        {!isFree && subscription.status === "active" && !subscription.cancelAtPeriodEnd && (
          <button
            onClick={onCancel}
            disabled={cancelLoading}
            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            {cancelLoading ? "Cancelling..." : "Cancel Auto-Renewal"}
          </button>
        )}
      </div>

      <div className="h-px bg-white/5 w-full my-6" />

      {/* Timeline info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Start Date</p>
            <p className="text-sm font-bold text-white">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              {subscription.cancelAtPeriodEnd ? "Expires At" : "Next Renewal Date"}
            </p>
            <p className="text-sm font-bold text-white">
              {isFree ? "Never" : new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {subscription.cancelAtPeriodEnd && (
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 p-4 rounded-2xl text-xs mb-6 leading-relaxed">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            You have cancelled auto-renewal. Access to premium tools will end on{" "}
            <strong>{new Date(subscription.endDate).toLocaleDateString()}</strong>.
          </span>
        </div>
      )}

      {/* Plan Benefits */}
      <div>
        <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
          Active Plan Benefits:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activePlan?.features?.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{feat}</span>
            </li>
          )) || (
            <li className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>10 min free trial interviews</span>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
}
