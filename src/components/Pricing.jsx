import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Building2, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentOrder, verifyPaymentSignature, resetPaymentState } from '../store/slices/paymentSlice';
import { fetchCurrentSubscription } from '../store/slices/subscriptionSlice';
import PaymentModal from './PaymentModal';

const Pricing = () => {
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [plansError, setPlansError] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    
    // Payment Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkoutPlan, setCheckoutPlan] = useState(null);
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentSubscription } = useSelector((state) => state.subscription);
    const { loading: paymentLoading, error: paymentError } = useSelector((state) => state.payment);

    useEffect(() => {
        const fetchPlansData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/plans');
                if (!res.ok) throw new Error('Failed to fetch pricing plans');
                const data = await res.json();
                setPlans(data);
                
                const pro = data.find(p => p.name.toLowerCase().includes('pro'));
                if (pro) setSelectedPlanId(pro._id);
                else if (data.length > 0) setSelectedPlanId(data[0]._id);
            } catch (err) {
                console.error(err);
                setPlansError(err.message);
            } finally {
                setLoadingPlans(false);
            }
        };
        fetchPlansData();

        // If logged in, fetch profile & current subscription
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchCurrentSubscription());
            fetch('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error("Failed to load profile", err));
        }
    }, [dispatch]);

    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('pro')) return Sparkles;
        if (n.includes('team') || n.includes('enterprise')) return Building2;
        return Zap;
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSelectPlan = (plan) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        dispatch(resetPaymentState());
        setCheckoutPlan(plan);
        setIsModalOpen(true);
    };

    const handlePay = async (planId) => {
        try {
            const orderResult = await dispatch(createPaymentOrder(planId)).unwrap();
            
            // If the plan is free, the backend auto-activates it without hitting Razorpay APIs
            if (orderResult.isFree) {
                alert("Free Plan Activated Successfully!");
                setIsModalOpen(false);
                dispatch(fetchCurrentSubscription());
                navigate('/dashboard');
                return;
            }

            // Load Razorpay Checkout Widget
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                alert("Failed to load payment checkout SDK. Please check your network connection.");
                return;
            }

            const options = {
                key: orderResult.keyId,
                amount: orderResult.amount,
                currency: orderResult.currency,
                name: "NIS AI SaaS Technologies",
                description: `Purchase: ${checkoutPlan?.name} Plan`,
                order_id: orderResult.orderId,
                handler: async function (response) {
                    try {
                        const verifyResult = await dispatch(verifyPaymentSignature({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        })).unwrap();

                        if (verifyResult.success) {
                            alert("Payment Verified! Subscription Activated.");
                            setIsModalOpen(false);
                            dispatch(fetchCurrentSubscription());
                            navigate('/dashboard');
                        } else {
                            alert("Verification failed. Please contact support.");
                        }
                    } catch (err) {
                        alert(err || "Verification failed");
                    }
                },
                prefill: {
                    name: profile?.name || '',
                    email: profile?.email || '',
                    contact: profile?.phoneNumber || '',
                },
                theme: {
                    color: '#2563EB',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (resp) {
                alert(`Payment failed: ${resp.error.description}`);
            });
            rzp.open();
        } catch (err) {
            console.error("Initiation failed", err);
        }
    };

    if (loadingPlans) return (
        <div className="py-24 bg-[#050510] flex items-center justify-center font-inter">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    if (plansError) return (
        <div className="py-24 bg-[#050510] flex flex-col items-center justify-center text-gray-400 font-inter">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4"
            >
                <AlertCircle className="w-8 h-8 text-red-500" />
            </motion.div>
            <p className="text-lg font-medium text-white">Unable to load pricing plans</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-primary-400 hover:underline">Try Again</button>
        </div>
    );

    return (
        <section id="pricing" className="py-32 bg-[#050510] relative overflow-hidden font-inter">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/30 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary-400 text-sm font-bold uppercase tracking-[0.2em] mb-4 block"
                    >
                        Pricing Plans
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight"
                    >
                        Choose Your <span className="text-gradient">Advantage</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Simple, flexible pricing designed to scale with your productivity needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                    {plans.map((plan, index) => {
                        const Icon = getIcon(plan.name);
                        const isPro = plan.name.toLowerCase().includes('pro');
                        const isSelected = selectedPlanId === plan._id;
                        
                        // Check if this plan is the user's active subscription
                        const isActiveSubscription = currentSubscription && 
                            (currentSubscription.planId?._id === plan._id || currentSubscription.planId === plan._id) &&
                            currentSubscription.status === 'active';

                        return (
                            <motion.div
                                key={plan._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedPlanId(plan._id)}
                                whileHover={{ 
                                    y: -15,
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                                className={`group p-10 rounded-[2.5rem] relative flex flex-col h-full transition-all duration-500 cursor-pointer ${
                                    isSelected
                                    ? 'bg-[#0a0a25] border-2 border-primary-500 shadow-[0_0_60px_-12px_rgba(59,130,246,0.5)] z-20 scale-105' 
                                    : isPro
                                        ? 'bg-[#0a0a20] border border-primary-500/30 shadow-xl'
                                        : 'bg-[#080818] border border-white/5 hover:border-white/10 shadow-xl'
                                }`}
                            >
                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${isPro ? 'from-primary-600/10' : 'from-white/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]`} />

                                {(isPro || isSelected || isActiveSubscription) && (
                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 py-2 px-6 bg-gradient-to-r ${isActiveSubscription ? 'from-green-500 to-emerald-500' : isSelected ? 'from-primary-500 to-blue-500' : 'from-primary-600 to-blue-600'} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-20`}>
                                        {isActiveSubscription ? 'Your Active Plan' : isSelected ? 'Selected Plan' : 'Most Popular'}
                                    </div>
                                )}

                                <div className="mb-10 relative z-10">
                                    <motion.div 
                                        animate={{ 
                                            rotate: hoveredIndex === index ? 15 : 0,
                                            scale: hoveredIndex === index ? 1.1 : 1
                                        }}
                                        className={`w-16 h-16 rounded-2xl ${isPro || isSelected ? 'bg-primary-600' : 'bg-white/5'} flex items-center justify-center mb-8 shadow-xl`}
                                    >
                                        <Icon className={`w-8 h-8 ${isPro || isSelected ? 'text-white' : 'text-primary-400'}`} />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{plan.name}</h3>
                                    <p className="text-gray-400 text-base leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="mb-10 relative z-10">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white tracking-tighter">${plan.price}</span>
                                        <span className="text-gray-500 font-medium text-lg tracking-tight">/{plan.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>
                                </div>

                                <div className="h-px bg-white/5 w-full mb-10" />

                                <ul className="space-y-5 mb-12 flex-1 relative z-10 font-inter">
                                    {plan.features?.map((feat, i) => (
                                        <motion.li 
                                            key={i} 
                                            className="flex items-start gap-4 text-gray-300 group/item"
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full ${isSelected || isPro ? 'bg-primary-500/20' : 'bg-white/5'} flex items-center justify-center`}>
                                                <Check className={`w-3 h-3 ${isSelected || isPro ? 'text-primary-400' : 'text-primary-500'}`} />
                                            </div>
                                            <span className="text-sm font-medium tracking-tight group-hover/item:text-white transition-colors leading-relaxed">{feat}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelectPlan(plan)}
                                    disabled={isActiveSubscription}
                                    className={`relative z-10 w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isActiveSubscription
                                        ? 'bg-green-600/20 border border-green-500/35 text-green-400 cursor-default shadow-none'
                                        : isSelected || isPro 
                                            ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-xl shadow-primary-600/20' 
                                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                    }`}
                                >
                                    {isActiveSubscription ? 'Active Subscribed' : isSelected ? 'Buy Selected Plan' : (isPro ? 'Start Free Trial' : (plan.price === 0 ? 'Get Started Free' : 'Select Plan'))}
                                    {!isActiveSubscription && <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />}
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-gray-500 mt-20 text-sm tracking-tight font-medium"
                >
                    All plans include 256-bit SSL encryption and SOC2 compliance. Need a custom plan? <a href="#" className="text-primary-400 hover:underline">Contact Sales</a>
                </motion.p>
            </div>

            {/* Payment checkout modal */}
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={checkoutPlan}
                onPay={handlePay}
                loading={paymentLoading}
                error={paymentError}
            />
        </section>
    );
};

export default Pricing;
