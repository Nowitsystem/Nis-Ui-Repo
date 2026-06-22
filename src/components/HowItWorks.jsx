import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { UserPlus, Mic2, FileText, Share2, Sparkles, Slack, MessageSquare, Shield } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Connect your meeting",
    description:
      "Add NIS AI to Zoom, Google Meet, or Teams with one click. No bots, no friction — it works silently in the background.",
  },
  {
    icon: Mic2,
    title: "AI listens & captures",
    description:
      "Every word, speaker, and emotion is captured in real time. Action items are detected the moment they're spoken.",
  },
  {
    icon: FileText,
    title: "Get instant insights",
    description:
      "The moment your meeting ends, a professional summary, full transcript, and action list is ready instantly.",
  },
  {
    icon: Share2,
    title: "Share & collaborate",
    description:
      "Export to Slack, Notion, or email in one click. Your team stays aligned even if they missed the call.",
  },
];

const MeetingSimCard = () => {
  const [step, setStep] = useState(0);
  
  const messages = [
    {
      init: "S",
      name: "Sarah",
      grad: "from-violet-600 to-purple-500",
      text: "We're targeting $2M ARR by Q3 end. Thoughts on the timeline?",
    },
    {
      init: "J",
      name: "James",
      grad: "from-emerald-600 to-teal-500",
      text: "Doable if we prioritize the enterprise pipeline. We need 3 more closings.",
    },
    {
      init: "M",
      name: "Maya",
      grad: "from-pink-600 to-rose-500",
      text: "I'll set up demo calls with the top 5 leads by Thursday.",
    },
  ];

  const outcomes = [
    "Goal: $2M ARR milestone by Q3",
    "Maya to initiate 5 high-priority calls",
    "Scale enterprise pipeline for 3 closings",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden group min-h-[550px] flex flex-col glass-dark">
      {/* Simulation Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] group-hover:bg-primary-500/15 transition-all duration-700" />
      
      <div className="text-[12px] md:text-sm text-gray-500 mb-10 flex items-center gap-3 relative z-10 font-mono tracking-widest uppercase opacity-70">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        Live Meeting Intelligence Engaged
      </div>

      <div className="space-y-8 mb-10 flex-grow relative z-10">
        <AnimatePresence mode="popLayout">
          {messages.slice(0, step > 3 ? 3 : step + 1).map((msg, i) => (
            <motion.div 
              key={msg.init} 
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
              className="flex gap-5 items-start"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${msg.grad} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg border border-white/10`}
              >
                {msg.init}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-primary-400/70 mb-1.5 font-bold uppercase tracking-widest">{msg.name}</div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-none px-5 py-4 text-sm md:text-base text-gray-300 leading-relaxed shadow-sm backdrop-blur-sm group-hover:border-white/20 transition-all">
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* High-Tech Thinking / Sonar Scan */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-24 bg-primary-500/5 rounded-3xl border border-primary-500/10 flex items-center justify-center overflow-hidden"
          >
            {/* Scan Beam */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent rounded-full origin-center scale-[2.5]"
              style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}
            />
            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="flex gap-2">
                 {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ delay: i * 0.2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-primary-400"
                    />
                 ))}
               </div>
               <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] shadow-sm">NIS AI is thinking</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Summary Section - Appears after "thinking" */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-primary-950/20 border border-primary-500/20 rounded-3xl p-6 md:p-8 relative mt-auto backdrop-blur-xl group/summary"
          >
            {/* Background Data Flow particles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-full h-32 overflow-hidden pointer-events-none opacity-20">
               {[0, 1, 2].map(i => (
                 <motion.div 
                    key={i}
                    animate={{ y: [0, 100], x: [i * 50, i * 50 + 10], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    className="absolute top-0 w-[1px] h-12 bg-primary-400"
                 />
               ))}
            </div>

            <div className="absolute top-0 right-0 p-6 opacity-[0.15]">
              <Sparkles className="w-16 h-16 text-primary-400" />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_15px_rgba(139,92,246,0.6)] shrink-0" />
              <span className="text-xs md:text-sm font-black text-primary-400 uppercase tracking-[0.2em]">
                NIS AI Executive Summary
              </span>
            </div>
            
            <div className="space-y-4">
              {outcomes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4 text-sm md:text-base text-gray-200 group/item"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary-500 group-hover/item:text-white transition-all">
                     <span className="text-[10px] font-black">✓</span>
                  </div>
                  <span className="leading-relaxed opacity-90">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Export Quick-Tabs */}
            <div className="flex gap-2 mt-8 pt-6 border-t border-white/5">
                <div className="px-3 py-1.5 bg-white/5 rounded-md border border-white/10 text-[9px] text-gray-500 hover:text-white transition-colors cursor-pointer uppercase font-bold tracking-widest">Share to Slack</div>
                <div className="px-3 py-1.5 bg-white/5 rounded-md border border-white/10 text-[9px] text-gray-500 hover:text-white transition-colors cursor-pointer uppercase font-bold tracking-widest">Send to Notion</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="py-32 bg-[#050510] relative overflow-hidden"
    >
      {/* Background Section Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-24 lg:mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-[0.4em] uppercase text-primary-400 mb-6 block"
          >
            Process Workflow
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 tracking-tight leading-tight"
          >
            Intelligence at the <span className="text-gradient">Speed of Thought</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl leading-relaxed"
          >
            We've eliminated the friction between capture and collaboration. Set up once, and let AI handle the documentation for every meeting.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* MeetingSimCard — Right Column on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 w-full lg:sticky lg:top-32"
          >
            <MeetingSimCard />
          </motion.div>

          {/* Timeline — Left Column on Desktop */}
          <div 
            ref={containerRef}
            className="order-2 lg:order-1 relative pl-16 md:pl-24"
          >
            {/* Vertical connecting line (Background) */}
            <div
              className="absolute left-[34px] md:left-[40px] top-6 bottom-6 w-[2px] bg-white/[0.03]"
            />
            
            {/* Vertical connecting line (Animated Progress) */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-[34px] md:left-[40px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary-500 via-primary-300 to-blue-500 z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            />
            <div className="absolute left-[34px] md:left-[40px] bottom-6 w-3 h-3 -translate-x-1.5 rounded-full bg-blue-500 blur-sm animate-pulse z-10" />

            {steps.map((step, index) => {
              const threshold = index / (steps.length - 1);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-20 md:mb-32 last:mb-0 group"
                >
                  {/* Numbered dot with scroll-triggered highlight */}
                  <motion.div 
                    style={{
                      borderColor: useTransform(scrollYProgress, [threshold - 0.1, threshold], ["rgba(255, 255, 255, 0.05)", "#8b5cf6"]),
                      backgroundColor: useTransform(scrollYProgress, [threshold - 0.1, threshold], ["rgba(5, 5, 16, 1)", "#8b5cf6"]),
                      boxShadow: useTransform(scrollYProgress, [threshold - 0.1, threshold], ["0 0 0 rgba(139,92,246,0)", "0 0 30px rgba(139,92,246,0.5)"])
                    }}
                    className="absolute -left-[58px] md:-left-[88px] top-2 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500"
                  >
                    <span className="text-xl md:text-2xl font-black text-white">
                      {index + 1}
                    </span>
                  </motion.div>

                  <div className="relative">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mb-6">
                      {step.description}
                    </p>

                    {/* Step 4 Special: App Integration Icons */}
                    {index === 3 && (
                       <div className="flex gap-4 mt-8">
                         {[Slack, MessageSquare, Shield].map((App, i) => (
                           <motion.div 
                             key={i}
                             animate={{ y: [0, -5, 0] }}
                             transition={{ delay: i * 0.2, repeat: Infinity, duration: 3 }}
                             className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/50 transition-all cursor-pointer"
                           >
                             <App className="w-6 h-6" />
                           </motion.div>
                         ))}
                       </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
