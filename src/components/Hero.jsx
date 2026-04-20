import { motion } from "framer-motion";
import { Play, ArrowRight, Zap, Globe } from "lucide-react";
import heroImg from "../assets/hero1.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-mesh"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-primary-400 text-xs font-semibold mb-6 tracking-wide uppercase"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Empowering 500+ Teams Worldwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          >
            <span className="text-gradient">NIS AI</span>
            <br />
            Your AI Meeting Assistant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            NIS AI listens to your meetings, converts speech to text, summarizes
            conversations, and translates languages in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button className="btn-primary flex items-center gap-2 w-full sm:w-auto px-8">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary flex items-center gap-2 w-full sm:w-auto px-8">
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview - Compact Professional Refinement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: 1500 }}
        >
          {/* Backlight Glow */}
          <div className="absolute inset-20 bg-primary-500/15 rounded-full blur-[100px] -z-10" />

          <motion.div
            initial={{ rotateX: 10 }}
            animate={{ rotateX: 5 }}
            whileHover={{ rotateX: 0 }}
            transition={{ duration: 0.8 }}
            className="relative p-1.5 rounded-2xl glass border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Browser Header Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-black/30 border border-white/5 w-1/2 justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-gray-500 font-medium tracking-tight">app.nowitsys.ai/dashboard</span>
              </div>
            </div>

            <div className="rounded-b-xl overflow-hidden bg-[#0A0A0F] relative">
              <img 
                src={heroImg} 
                alt="NIS AI Dashboard" 
                className="w-full h-[380px] md:h-[480px] object-cover object-top hover:scale-[1.02] transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Floating Cards - Refined positioning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-6 -right-6 hidden lg:block p-4 rounded-xl glass-dark border border-white/10 shadow-2xl backdrop-blur-xl max-w-[200px] z-20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-white">Live Translation</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Real-time analysis active in 3 languages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-6 -left-6 hidden lg:block p-4 rounded-xl glass-dark border border-white/10 shadow-2xl backdrop-blur-xl max-w-[200px] z-20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-xs font-semibold text-white">Auto-Summary</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Key action items captured successfully.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
