import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section id="cta" className="py-24 bg-[#050510] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl glass border border-white/10 p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-blue-600/5 to-primary-600/5 animate-pulse" />

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 relative"
          >
            Start capturing{" "}
            <span className="text-gradient">smarter meetings</span> today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto italic"
          >
            Join thousands of teams who have reclaimed their time and focus. Get
            started for free, no credit card required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="btn-primary px-10 py-4 text-lg flex items-center gap-2 group/btn">
              Try NIS AI{" "}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary px-10 py-4 text-lg">
              Book a Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
