import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Cpu, ArrowLeft } from "lucide-react";
import loginImg from "../assets/login.png";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("India");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";
    const body = isSignUp 
      ? { name, email, password, phoneNumber, location, country }
      : { email, password };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        if (isSignUp) {
          // After signup, switch to login or auto-login
          setIsSignUp(false);
          setError("Account created! Please sign in.");
        } else {
          localStorage.setItem("token", data.token);
          if (data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }
      } else {
        setError(data.message || "Action failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050510] text-white overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* LEFT SIDE - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-16 bg-[#0a0a1a] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-blue-900/20" />
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg text-center relative z-10"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary-500/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <img
              src={loginImg}
              alt="NIS AI platform preview"
              className="rounded-3xl shadow-2xl mb-12 border border-white/5 relative z-10 transform scale-105"
            />
          </div>

          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            The Future of <br />
            <span className="text-gradient">Intelligent Meetings</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
            Experience real-time transcription, live translation, and AI-powered insights that transform every conversation into structured knowledge.
          </p>

          <div className="flex items-center justify-center gap-8 mt-12 opacity-50">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-white">4.9/5</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Rating</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-white">2M+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500">Users</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md glass-dark border border-white/5 shadow-2xl rounded-3xl p-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/30">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">NIS AI</span>
            </div>

            <select className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all cursor-pointer">
              <option className="bg-[#050510]">English</option>
              <option className="bg-[#050510]">Español</option>
              <option className="bg-[#050510]">Français</option>
            </select>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">{isSignUp ? "Join NIS AI" : "Welcome Back"}</h2>
            <p className="text-gray-400">{isSignUp ? "Start your 7-day free trial today" : "Sign in to your NIS AI account"}</p>
          </div>

          {!isSignUp && (
            <div className="space-y-4 mb-8">
              {/* Social Buttons */}
              <button 
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/5 rounded-xl py-3 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group"
              >
                <FcGoogle size={22} />
                <span className="font-medium text-gray-200">Continue with Google</span>
              </button>
            </div>
          )}

          {/* Divider */}
          {!isSignUp && (
            <div className="flex items-center mb-8">
              <div className="flex-grow h-px bg-white/5"></div>
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">or email</span>
              <div className="flex-grow h-px bg-white/5"></div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className={`border text-xs py-2 px-4 rounded-xl text-center ${error.includes('created') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {error}
              </div>
            )}
            
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City"
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                {!isSignUp && <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot?</a>}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg mt-2 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
            </button>
          </form>

          {/* Footer Toggle */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


