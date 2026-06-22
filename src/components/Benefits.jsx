import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Target, Rocket, Users, CheckCircle2, ChevronRight, Zap, Shield, BarChart3, Slack, MessageSquare } from "lucide-react";

const AnimatedIcon = ({ icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600/20 group-hover:border-primary-600/30 transition-all duration-500`}
  >
    <Icon className={`w-7 h-7 text-primary-400`} />
  </motion.div>
);

const BenefitVisual = ({ type }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] relative overflow-hidden h-[220px] flex flex-col justify-center shadow-inner group/sim">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      {renderVisualContent(type, index)}
      
      {/* Bottom Status Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
         <div className="flex gap-1">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-1 h-1 rounded-full ${i === index ? 'bg-primary-500' : 'bg-white/10'}`} />
            ))}
         </div>
         <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">System Processing</span>
      </div>
    </div>
  );
};

const renderVisualContent = (type, index) => {
  switch (type) {
    case "clock":
      return (
        <div className="relative flex flex-col items-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
            
            {/* Spinning Radar Sweep */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center bg-gradient-to-t from-primary-500/20 to-transparent rounded-full"
              style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}
            />

            {/* Progress Percentage */}
            <div className="relative z-10 flex flex-col items-center">
               <motion.span 
                 animate={{ scale: [1, 1.1, 1] }}
                 className="text-3xl font-bold text-white"
               >
                 90<span className="text-primary-500">%</span>
               </motion.span>
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Time Saved</span>
            </div>

            {/* Floating Data Bits */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ 
                  y: [-20, -40], 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                className="absolute top-0 text-[10px] text-primary-400 font-mono"
                style={{ left: `${30 + i * 20}%` }}
              >
                +{(i + 1) * 15}m
              </motion.div>
            ))}
          </div>
        </div>
      );
    case "target":
      return (
        <div className="space-y-4">
          <div className="relative h-24 w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
             {/* Sonar Grid */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
             
             {/* Radar Sweep */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-full origin-center scale-150"
             />

             {/* Detection Hit */}
             <motion.div 
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="relative z-10 flex flex-col items-center gap-1"
             >
                <div className="w-12 h-12 rounded-full border border-primary-500/50 flex items-center justify-center bg-primary-500/5 backdrop-blur-sm">
                   <Target className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-[9px] text-white font-bold bg-primary-500 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(139,92,246,0.5)]">ACTION DETECTED</span>
             </motion.div>
          </div>
          
          <div className="flex gap-2">
             {["Speaker Intent", "Sentiment", "Key Topics"].map((tag, i) => (
               <motion.div 
                 key={tag}
                 animate={{ opacity: index === i ? 1 : 0.3, y: index === i ? -2 : 0 }}
                 className={`flex-1 py-2 rounded-lg border text-[9px] font-bold text-center uppercase tracking-tighter ${index === i ? 'bg-primary-500/10 border-primary-500 text-primary-400 font-bold' : 'bg-white/5 border-white/5 text-gray-500'}`}
               >
                 {tag}
               </motion.div>
             ))}
          </div>
        </div>
      );
    case "rocket":
      return (
        <div className="space-y-4">
          <div className="relative h-28 bg-black/20 rounded-xl border border-white/5 p-4 flex flex-col justify-end overflow-hidden">
             {/* Trend Line (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                <motion.path 
                   d="M 10 90 Q 50 80, 100 60 T 200 10 L 300 10"
                   fill="transparent"
                   stroke="rgba(139, 92, 246, 0.5)"
                   strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 3, repeat: Infinity }}
                />
             </svg>

             {/* Rising Bars */}
             <div className="flex items-end justify-between gap-2 z-10 relative">
               {[40, 55, 45, 85, 100].map((h, i) => (
                 <div key={i} className="flex-1">
                   <motion.div 
                     initial={{ height: 0 }}
                     whileInView={{ height: `${h}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className={`w-full rounded-t-sm relative ${i === 4 ? 'bg-primary-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'bg-primary-500/20'}`}
                   >
                      {/* Rising Particles */}
                      {index === i && (
                        <motion.div 
                          animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-400"
                        />
                      )}
                   </motion.div>
                 </div>
               ))}
             </div>
          </div>
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Velocity Surge</span>
             </div>
             <div className="text-sm font-black text-white italic">+12X</div>
          </div>
        </div>
      );
    case "users":
      return (
        <div className="relative w-full h-40 flex items-center justify-center">
          {/* Animated Background Rings */}
          {[1, 2].map(i => (
             <motion.div 
               key={i}
               animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
               transition={{ duration: 3, delay: i * 1.5, repeat: Infinity }}
               className="absolute w-20 h-20 border border-primary-500/30 rounded-full"
             />
          ))}

          {/* Central Hub */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            className="relative z-20 w-16 h-16 rounded-full bg-primary-600/20 border border-primary-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-sm"
          >
            <Users className="w-8 h-8 text-primary-100" />
          </motion.div>

          {/* Peripheral Icons (Floating) */}
          {[
            { Icon: Slack, color: "text-orange-400", angle: 0 },
            { Icon: MessageSquare, color: "text-blue-400", angle: 120 },
            { Icon: Shield, color: "text-green-400", angle: 240 }
          ].map((app, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [0, -10, 0],
                 rotate: [0, 10, -10, 0]
               }}
               transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
               className="absolute w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
               style={{ 
                 transform: `rotate(${app.angle}deg) translate(75px) rotate(-${app.angle}deg)` 
               }}
             >
               <app.Icon className={`w-5 h-5 ${app.color}`} />
             </motion.div>
          ))}

          {/* Connection Particles */}
          {[0, 120, 240].map((angle, i) => (
             <motion.div 
               key={`p-${i}`}
               animate={{ 
                 x: [20, 55],
                 opacity: [0, 1, 0]
               }}
               transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
               className="absolute h-0.5 w-4 bg-primary-400/40 rounded-full origin-left"
               style={{ transform: `rotate(${angle}deg) translate(20px)` }}
             />
          ))}
        </div>
      );
    default:
      return null;
  }
};

const benefits = [
  {
    title: "Save Time on Note-Taking",
    description: "Reduce manual transcription and summarization by up to 90%, focus on the ideas.",
    icon: Clock,
    variant: "clock",
    features: ["Automated drafts", "One-click export", "Smart timestamping"],
  },
  {
    title: "Never Miss Critical Details",
    description: "Our AI captures every nuance, including speaker intent and emotional context.",
    icon: Target,
    variant: "target",
    features: ["Action item identification", "Keyword highlighting", "Sentiment analysis"],
  },
  {
    title: "Skyrocket Productivity",
    description: "Convert hour-long meetings into 5-minute actionable summaries instantly.",
    icon: Rocket,
    variant: "rocket",
    features: ["Team synchronization", "Priority tagging", "Deadline tracking"],
  },
  {
    title: "Seamless Collaboration",
    description: "Share transcripts and insights across Slack, Teams, and shared drives instantly.",
    icon: Users,
    variant: "users",
    features: ["Role-based access", "Interactive comments", "Version history"],
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-32 bg-[#050510] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block"
          >
            Efficiency Redefined
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight"
          >
            Built for the Speed of <span className="text-gradient">Modern Teams</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl max-w-2xl leading-relaxed"
          >
            Focus on the people and the ideas, not the typing. NIS AI handles the complex logistics of meeting intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] glass-dark border border-white/5 hover:border-primary-500/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex-grow">
                <div className="flex items-center gap-6 mb-8">
                  <AnimatedIcon icon={benefit.icon} />
                  <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors">
                    {benefit.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-md">
                  {benefit.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefit.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unique Visual Representation for each Benefit */}
              <BenefitVisual type={benefit.variant} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
