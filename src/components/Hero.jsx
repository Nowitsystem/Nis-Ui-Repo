import { motion } from "framer-motion";
import { Play, ArrowRight, Zap, Target, Globe } from "lucide-react";

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

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            damping: 20,
          }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative p-2 rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/5 to-transparent pointer-events-none" />
            <div className="rounded-xl overflow-hidden bg-[#0A0A0F] aspect-[16/9] border border-white/5 flex">
              {/* Mock UI */}
              <div className="w-1/4 border-r border-white/5 p-4 hidden md:block">
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 rounded-lg bg-white/5 animate-pulse"
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="w-48 h-6 rounded-lg bg-white/5 animate-pulse" />
                  <div className="w-24 h-6 rounded-lg bg-primary-600/20 border border-primary-600/30" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="p-4 rounded-xl glass border border-white/5 space-y-3">
                      <div className="w-full h-3 rounded bg-white/5" />
                      <div className="w-3/4 h-3 rounded bg-white/5" />
                      <div className="w-1/2 h-3 rounded bg-white/5" />
                    </div>
                    <div className="p-4 rounded-xl glass border border-white/5 space-y-3">
                      <div className="w-4/5 h-3 rounded bg-white/5" />
                      <div className="w-full h-3 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-full rounded-xl bg-primary-600/5 border border-primary-600/10 flex items-center justify-center">
                      <div className="text-primary-400 flex flex-col items-center gap-2">
                        <Target className="w-8 h-8 opacity-50" />
                        <span className="text-[10px] font-medium tracking-widest uppercase opacity-40">
                          AI Summary
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 hidden lg:block p-4 rounded-xl glass-dark border border-white/10 shadow-2xl backdrop-blur-xl max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-xs font-semibold text-white">
                Live Translation
              </span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Spanish to English transcription active (98% confidence)
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-10 -left-10 hidden lg:block p-4 rounded-xl glass-dark border border-white/10 shadow-2xl backdrop-blur-xl max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-xs font-semibold text-white">
                Auto-Summary
              </span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              3 action items identified from the last 15 minutes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
