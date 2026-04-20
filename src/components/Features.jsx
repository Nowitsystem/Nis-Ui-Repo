import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, Globe, Video, Languages, Zap, Monitor, MessageSquare, Shield, Sparkles } from 'lucide-react';

const AnimatedIcon = ({ icon: Icon, variant, color }) => {
    switch (variant) {
        case 'mic':
            return (
                <div className="relative">
                    <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-current opacity-20"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Icon className={`w-7 h-7 ${color}`} />
                    </motion.div>
                </div>
            );
        case 'text':
            return (
                <div className="relative overflow-hidden group/icon">
                    <Icon className={`w-7 h-7 ${color}`} />
                    <motion.div
                        animate={{ y: [-20, 20] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                </div>
            );
        case 'globe':
            return (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <Icon className={`w-7 h-7 ${color}`} />
                </motion.div>
            );
        case 'video':
            return (
                <div className="relative">
                    <Icon className={`w-7 h-7 ${color}`} />
                    <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                    />
                </div>
            );
        case 'languages':
            return (
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotateY: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon className={`w-7 h-7 ${color}`} />
                </motion.div>
            );
        case 'monitor':
            return (
                <div className="relative">
                    <Icon className={`w-7 h-7 ${color}`} />
                    <motion.div
                        animate={{ 
                            scale: [0.8, 1.2],
                            opacity: [0.5, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        className="absolute -top-1 -left-1 -right-1 h-3 border-t-2 border-current rounded-t-full opacity-0"
                    />
                </div>
            );
        default:
            return <Icon className={`w-7 h-7 ${color}`} />;
    }
};

const features = [
    {
        title: 'Real-Time Transcription',
        description: 'Convert speech to accurate text instantly during meetings with ultra-low latency.',
        icon: Mic,
        variant: 'mic',
        color: 'text-blue-400',
        bg: 'bg-blue-400/10'
    },
    {
        title: 'AI Meeting Summaries',
        description: 'Automatically generate key points, decisions, and action items using advanced LLMs.',
        icon: FileText,
        variant: 'text',
        color: 'text-purple-400',
        bg: 'bg-purple-400/10'
    },
    {
        title: 'Live Translation',
        description: 'Understand conversations across 50+ languages with real-time audio translation.',
        icon: Globe,
        variant: 'globe',
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10'
    },
    {
        title: 'Meeting Recording',
        description: 'Record high-quality video and audio meetings and access transcripts anytime.',
        icon: Video,
        variant: 'video',
        color: 'text-pink-400',
        bg: 'bg-pink-400/10'
    },
    {
        title: 'Multi-language Support',
        description: 'Supports multiple global languages, regional accents, and dialects seamlessly.',
        icon: Languages,
        variant: 'languages',
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10'
    },
    {
        title: 'Works Everywhere',
        description: 'Compatible with Zoom, Google Meet, Teams, and standard browser audio.',
        icon: Monitor,
        variant: 'monitor',
        color: 'text-orange-400',
        bg: 'bg-orange-400/10'
    },
];

const FeaturePreview = ({ variant }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const fullText = "NIS AI is accurately transcribing this meeting in real-time...";

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Typing effect for Transcription
    useEffect(() => {
        if (variant === 'mic') {
            let i = 0;
            const timer = setInterval(() => {
                setText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) i = 0;
            }, 50);
            return () => clearInterval(timer);
        }
    }, [variant]);

    const renderSimulation = () => {
        switch (variant) {
            case 'mic':
                return (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-[11px] text-gray-500 uppercase font-bold tracking-widest">Audio Stream</span>
                        </div>
                        <p className="text-sm text-blue-400 font-mono leading-relaxed min-h-[48px]">
                            {text}<span className="animate-pulse">|</span>
                        </p>
                    </div>
                );
            case 'text':
                const bullets = [
                    "✓ Project timeline approved",
                    "✓ Budget increased by 15%",
                    "✓ Action: Maya to send docs"
                ];
                return (
                    <div className="space-y-3">
                        <span className="text-[11px] text-purple-400 uppercase font-bold tracking-widest">AI Insights</span>
                        <div className="space-y-2">
                            {bullets.slice(0, (index % 3) + 1).map((b, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-xs text-gray-300"
                                >
                                    {b}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            case 'globe':
                const translations = { en: "Hello, meeting starts now", es: "Hola, la reunión comienza ahora", fr: "Bonjour, la réunion commence maintenant" };
                const langs = ['en', 'es', 'fr'];
                const labels = { en: 'English', es: 'Spanish', fr: 'French' };
                const currentLang = langs[index % 3];
                return (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] text-cyan-400 uppercase font-bold tracking-widest">Live Translation</span>
                            <span className="text-[10px] text-gray-500 italic">{labels[currentLang]}</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentLang}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-white"
                                >
                                    {translations[currentLang]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                );
            case 'video':
                return (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                <span className="text-[11px] text-red-500 font-bold uppercase tracking-widest">Recording</span>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">00:43:{index < 10 ? `0${index}` : index}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ width: ['20%', '80%'] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="h-full bg-red-500/50"
                            />
                        </div>
                    </div>
                );
            case 'languages':
                const langList = ["English", "Spanish", "French", "German", "Japanese", "Hindi"];
                return (
                    <div className="flex flex-wrap gap-2.5">
                        {langList.map((l, i) => (
                            <motion.span
                                key={l}
                                animate={{ 
                                    opacity: i === (index % 6) ? 1 : 0.3,
                                    scale: i === (index % 6) ? 1.05 : 1
                                }}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${i === (index % 6) ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-white/5 text-gray-500'}`}
                            >
                                {l}
                            </motion.span>
                        ))}
                    </div>
                );
            case 'monitor':
                const apps = [
                    { name: "Zoom", status: "Connected" },
                    { name: "Teams", status: "Standby" },
                    { name: "Meet", status: "Active" }
                ];
                const activeApp = apps[index % 3];
                return (
                    <div className="space-y-3">
                        <span className="text-[11px] text-orange-400 uppercase font-bold tracking-widest">Platform Sync</span>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                            <span className="text-sm text-white font-medium">{activeApp.name}</span>
                            <span className="flex items-center gap-2 text-[10px] text-orange-400 font-bold">
                                <div className="w-1 h-1 rounded-full bg-orange-400" />
                                {activeApp.status}
                            </span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mt-8 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] min-h-[120px] flex flex-col justify-center relative overflow-hidden">
            {renderSimulation()}
            {/* Ambient background glow for simulation box */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </div>
    );
};

const FeatureCard = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative p-10 rounded-3xl glass-dark border border-white/5 hover:border-primary-500/30 transition-all duration-300 flex flex-col"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-grow">
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 shadow-xl`}>
                    <AnimatedIcon 
                        icon={feature.icon} 
                        variant={feature.variant} 
                        color={feature.color} 
                    />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary-400 transition-colors">{feature.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed max-w-[280px]">{feature.description}</p>
            </div>

            {/* Live Demo Preview Section */}
            <FeaturePreview variant={feature.variant} />
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
