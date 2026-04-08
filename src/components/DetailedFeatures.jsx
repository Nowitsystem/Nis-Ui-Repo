import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import transcriptionImg from '../assets/transcription.png';
import translationImg from '../assets/translation.png';
import summaryImg from '../assets/summary.png';
import chatImg from '../assets/chat.png';

const featureData = [
  {
    title: "Real-time Transcription",
    description: "Get accurate text in real-time, as you speak. Frees you up to focus on the discussion, not note-taking.",
    points: [
      "No AI bot joins your meeting",
      "Speaker labels & timestamps",
      "Supports 27+ languages & accents"
    ],
    image: transcriptionImg,
    imageLeft: false,
    color: "from-blue-600/20 to-indigo-600/20"
  },
  {
    title: "Live Translation",
    description: "See translated captions live. Language barriers dissolve, letting global teams collaborate with native-language ease.",
    points: [
      "On-screen original & translated captions",
      "14+ languages & accents supported",
      "One-click language switch for viewers"
    ],
    image: translationImg,
    imageLeft: true,
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    title: "AI Summary",
    description: "One-click meeting recaps. Automatically captures the core: key points, decisions, and next steps — so you can wrap your mind around it in minutes.",
    points: [
      "Instant recap right after every session",
      "Highlights decisions, risks & open questions",
      "Action items grouped by owner & due date"
    ],
    image: summaryImg,
    imageLeft: false,
    color: "from-emerald-600/20 to-teal-600/20"
  },
  {
    title: "AI Chat",
    description: "Give your conversations a lasting memory and turn them into a searchable knowledge base. Ask your Cheetu AI about past calls, meetings, or lectures, and instantly find answers in your personal, searchable conversation archive.",
    points: [
      "Ask questions in plain language",
      "Search across all past calls & notes",
      "Get answers with source context"
    ],
    image: chatImg,
    imageLeft: true,
    color: "from-orange-600/20 to-red-600/20"
  }
];

const FeatureSection = ({ feature, index }) => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${feature.imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: feature.imageLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                {feature.description}
              </p>
            </div>

            <ul className="space-y-4">
              {feature.points.map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 group"
            >
              Start for free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: feature.imageLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className={`absolute -inset-4 bg-gradient-to-tr ${feature.color} blur-3xl opacity-30 rounded-full`} />
            <div className="relative glass-dark p-2 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
              <motion.img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DetailedFeatures = () => {
  return (
    <div className="bg-[#050510] relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-24 pb-12">
        <div className="container mx-auto px-6 text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            The Complete Toolkit for <span className="text-gradient">Clearer Conversations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to capture, understand, and recall every detail of your important discussions.
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
