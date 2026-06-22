import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Globe, Zap, Shield, Sparkles, MessageSquare, Target } from "lucide-react";

// Detailed Feature Images
import transcription1 from "../assets/transcription.png";
import transcription2 from "../assets/Transciption1.png";
import transcription3 from "../assets/meetingRecording.png";

import translation1 from "../assets/translation.png";
import translation2 from "../assets/translation1.png";
import translation3 from "../assets/Translation2.png";

import summary1 from "../assets/summary.png";
import summary2 from "../assets/meetingnotes.png";
import summary3 from "../assets/All.png";
import summary4 from "../assets/generated-dashboard.png";

import chat1 from "../assets/chat.png";
import chat2 from "../assets/AInotes.png";
import chat3 from "../assets/AInotes1.png";
import chat4 from "../assets/AInotes2.png";
import chat5 from "../assets/AInotes3.png";
import chat6 from "../assets/AInotes4.png";
import chat7 from "../assets/AInotes6.png";
import chat8 from "../assets/Ainotes7.png";
import chat9 from "../assets/Ainotes8.png";

const InsightBadge = ({ icon: Icon, text, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute ${position} z-30 px-4 py-2 rounded-2xl glass-dark border border-white/10 flex items-center gap-2 shadow-2xl backdrop-blur-xl hidden md:flex`}
  >
    <div className="w-5 h-5 rounded-lg bg-primary-500/10 flex items-center justify-center">
      <Icon className="w-3 h-3 text-primary-400" />
    </div>
    <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">{text}</span>
  </motion.div>
);

const BrowserMockup = ({ images, title, badges }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isInView]);

  return (
    <div 
      ref={containerRef}
      className="relative group perspective-1000"
    >
      {/* 3D Perspective Wrapper */}
      <motion.div 
        animate={{ rotateY: 5, rotateX: 2 }}
        className="relative z-10 glass-dark p-2 rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Browser Header */}
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-6 gap-2">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
           </div>
           <div className="flex-1 max-w-[200px] h-5 bg-white/5 rounded-md mx-auto" />
        </div>

        <div className="relative aspect-[4/3] bg-[#050510] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} view`}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Insight Badges */}
      {badges.map((badge, i) => (
        <InsightBadge key={badge.text} {...badge} delay={0.5 + i * 0.2} />
      ))}

      {/* Decorative Glows */}
      <div className="absolute -inset-10 bg-primary-600/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

const featureData = [
  {
    title: "Real-time Transcription",
    description: "Capture every word with surgical precision. Our neural engines distinguish speakers and context the moment it's spoken.",
    points: ["No intrusive AI bots", "Human-level accuracy", "Multi-accent support"],
    images: [transcription1, transcription2, transcription3],
    imageLeft: false,
    color: "from-blue-600/20 to-indigo-600/20",
    badges: [
      { icon: Zap, text: "99.8% Precise", position: "-top-6 -left-12" },
      { icon: Shield, text: "No Meeting Bots", position: "bottom-12 -right-8" }
    ]
  },
  {
    title: "Live Translation",
    description: "Globalize your meetings instantly. Real-time overlays transform language barriers into collaboration bridges.",
    points: ["Instant native captions", "Native accent handling", "One-click switches"],
    images: [translation1, translation2, translation3],
    imageLeft: true,
    color: "from-purple-600/20 to-pink-600/20",
    badges: [
      { icon: Globe, text: "27+ Languages", position: "-top-8 -right-10" },
      { icon: Sparkles, text: "Live Adaptive", position: "bottom-20 -left-12" }
    ]
  },
  {
    title: "AI Synthesis & Insights",
    description: "Go beyond summaries. Our AI synthesizes complex discussions into actionable blueprints, risks, and strategic goals.",
    points: ["Automated action items", "Sentiment & risk tracking", "Strategic goal mapping"],
    images: [summary1, summary2, summary3, summary4],
    imageLeft: false,
    color: "from-emerald-600/20 to-teal-600/20",
    badges: [
      { icon: Target, text: "Goal Tracking", position: "-top-10 -left-6" },
      { icon: Zap, text: "Instant Summaries", position: "top-1/2 -right-12" }
    ]
  },
  {
    title: "Conversational Intelligence",
    description: "Turn your past meetings into your most valuable knowledge base. Search, ask, and retrieve facts instantly.",
    points: ["Semantic search queries", "Source-backed answers", "Unified knowledge hub"],
    images: [chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8, chat9],
    imageLeft: true,
    color: "from-orange-600/20 to-red-600/20",
    badges: [
      { icon: MessageSquare, text: "Instant Knowledge", position: "-top-12 left-10" },
      { icon: Sparkles, text: "LLM Trained", position: "bottom-10 -right-6" }
    ]
  },
];

const FeatureSection = ({ feature, index }) => {
  return (
    <section className="py-24 md:py-40 relative group overflow-hidden">
      {/* Background Section Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${feature.imageLeft ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-20 lg:gap-32`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: feature.imageLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 space-y-12"
          >
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary-400 font-black text-sm uppercase tracking-[0.4em] block"
              >
                Feature 0{index + 1}
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                {feature.title}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                {feature.description}
              </p>
            </div>

            <ul className="space-y-6">
              {feature.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 group/item"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover/item:bg-primary-500 group-hover/item:text-white transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 group-hover/item:text-white transition-colors" />
                  </div>
                  <span className="text-lg text-gray-300 font-medium group-hover/item:text-white transition-colors">{point}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-8 pt-4">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 className="px-8 py-4 rounded-2xl bg-primary-600 text-white font-bold text-lg flex items-center gap-3 shadow-[0_20px_40px_rgba(139,92,246,0.3)] group/btn"
               >
                 Start Free Trial
                 <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
               </motion.button>
               <span className="text-gray-500 font-medium cursor-pointer hover:text-white transition-colors hidden md:block">Full Documentation →</span>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: feature.imageLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 w-full lg:w-auto"
          >
            <BrowserMockup images={feature.images} title={feature.title} badges={feature.badges} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DetailedFeatures = () => {
  return (
    <div className="bg-[#050510] relative">
      {/* Background atmospheric blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-900/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative pt-32 pb-24 lg:pt-48">
        <div className="container mx-auto px-6 text-center mb-32">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-tight"
          >
            The Intelligence <span className="text-gradient">Powerhouse</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Go deep into the platform that turns every conversation into a strategic asset. Built for engineers, founders, and global leaders.
          </motion.p>
        </div>

        {featureData.map((feature, index) => (
          <FeatureSection key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default DetailedFeatures;
