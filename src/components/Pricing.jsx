import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Building2 } from 'lucide-react';

const plans = [
    {
        name: 'Free Plan',
        price: '0',
        description: 'Perfect for individuals and small startups just getting started.',
        features: ['5 meetings per month', '30-minute transcription', 'Basic AI summaries', 'Zoom & Google Meet only'],
        icon: Zap,
        button: 'Get Started'
    },
    {
        name: 'Pro Plan',
        price: '29',
        description: 'Advanced features for professionals and growing teams.',
        features: ['Unlimited meetings', 'Unlimited transcription', 'Advanced LLM summaries', 'All platforms supported', 'Priority support'],
        icon: Sparkles,
        button: 'Start Free Trial',
        highlight: true
    },
    {
        name: 'Team Plan',
        price: '99',
        description: 'The ultimate collaboration tool for large organizations.',
        features: ['Up to 10 users', 'SSO Integration', 'Custom AI fine-tuning', 'Dedicated account manager', '99.9% SLA'],
        icon: Building2,
        button: 'Contact Sales'
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-[#050510] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400 text-lg">Choose the perfect plan for your meeting workflow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl relative overflow-hidden flex flex-col h-full ${plan.highlight ? 'bg-primary-600/10 border-2 border-primary-500 shadow-2xl shadow-primary-600/10' : 'glass-dark border border-white/5'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 py-1.5 px-4 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                                    <plan.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.highlight ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                                {plan.button}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
