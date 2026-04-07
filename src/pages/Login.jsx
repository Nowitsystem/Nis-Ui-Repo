import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-16 bg-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center"
        >
          <img
            src="/dashboard-preview.png"
            alt="dashboard"
            className="rounded-xl shadow-lg mb-10"
          />

          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            From Voice to Transcript, Knowledge, and Value
          </h2>

          <p className="text-slate-600 leading-relaxed">
            Real-time transcription, live translation and AI summaries for
            meetings, lectures and videos. Capture ideas instantly and transform
            conversations into knowledge.
          </p>

          <p className="text-sm text-slate-500 mt-6">
            No Download · No Setup · Instant Web Access
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl rounded-2xl p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-lg text-slate-900">CHEETU AI</h1>

            <select className="text-sm border border-slate-300 rounded-md px-2 py-1 bg-white">
              <option>English</option>
            </select>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-slate-900 text-center mb-2">
            Sign up for Cheetu AI
          </h2>

          <p className="text-sm text-center text-slate-600 mb-6">
            Get 360 minutes of transcription every month
          </p>

          {/* Google */}
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2 mb-3 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Apple */}
          <button className="flex items-center justify-center gap-3 w-full border border-slate-300 rounded-lg py-2 mb-5 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <FaApple size={18} />
            Continue with Apple
          </button>

          {/* Divider */}
          <div className="flex items-center mb-5">
            <div className="flex-grow h-px bg-slate-300"></div>
            <span className="px-3 text-sm text-slate-500">or</span>
            <div className="flex-grow h-px bg-slate-300"></div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Sign Up */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 mt-5">
            Already a member?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
              Sign in
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
