import { motion } from "framer-motion";
import { UserPlus, Mic2, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Join Your Meeting",
    description:
      "Simply add NIS AI to your Zoom, Teams, or Google Meet call with one click.",
    icon: UserPlus,
  },
  {
    title: "AI Listens & Transcribes",
    description:
      "Our advanced AI captures every word, identifies speakers, and processes intent in real-time.",
    icon: Mic2,
  },
  {
    title: "Get Instant Insights",
    description:
      "Receive a professional summary, key action items, and full transcript as soon as you finish.",
    icon: FileText,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden bg-gradient-mesh"
    >
      <div className="absolute inset-0 bg-[#050510]/80 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Set up in minutes and start saving hours of manual note-taking every
            week.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connection lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-primary-600/20 to-transparent -translate-y-1/2 pointer-events-none" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-primary-600/10 border border-primary-600/20 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-primary-600/5 blur-xl group-hover:bg-primary-600/10 transition-all" />
                <step.icon className="w-10 h-10 text-primary-400 relative" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#050510] border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  0{index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
