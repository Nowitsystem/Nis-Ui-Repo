import { motion } from 'framer-motion';
import { Mic, FileText, Globe, Video, Languages, Zap, Monitor, MessageSquare, Shield } from 'lucide-react';

const features = [
    {
        title: 'Real-Time Transcription',
        description: 'Convert speech to accurate text instantly during meetings with ultra-low latency.',
        icon: Mic,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10'
    },
    {
        title: 'AI Meeting Summaries',
        description: 'Automatically generate key points, decisions, and action items using advanced LLMs.',
        icon: FileText,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10'
    },
    {
        title: 'Live Translation',
        description: 'Understand conversations across 50+ languages with real-time audio translation.',
        icon: Globe,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10'
    },
    {
        title: 'Meeting Recording',
        description: 'Record high-quality video and audio meetings and access transcripts anytime.',
        icon: Video,
        color: 'text-pink-400',
        bg: 'bg-pink-400/10'
    },
    {
        title: 'Multi-language Support',
        description: 'Supports multiple global languages, regional accents, and dialects seamlessly.',
        icon: Languages,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10'
    },
    {
        title: 'Works Everywhere',
        description: 'Compatible with Zoom, Google Meet, Teams, and standard browser audio.',
        icon: Monitor,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10'
    },
];

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative p-8 rounded-2xl glass-dark border border-white/5 hover:border-primary-500/30 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
        </motion.div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-24 bg-[#050510] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4 block"
                    >
                        Capabilities
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Supercharge Your Meeting Workflow
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-gray-400 text-lg"
                    >
                        Streamline your productivity with AI-driven insights and real-time collaboration tools.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
