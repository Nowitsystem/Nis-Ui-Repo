import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Home as HomeIcon, 
  Monitor, 
  Mic, 
  FileText, 
  Briefcase, 
  Bot, 
  Zap, 
  Download,
  CheckCircle2,
  Cpu,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Play,
  CreditCard,
  Trophy,
  Target,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

// Actions
import { fetchCurrentSubscription, fetchPlans } from "../store/slices/subscriptionSlice";
import { fetchPaymentHistory, fetchInvoice, clearInvoice } from "../store/slices/billingSlice";
import { cancelSubscription } from "../store/slices/paymentSlice";

// Components
import SubscriptionCard from "../components/SubscriptionCard";
import BillingHistory from "../components/BillingHistory";
import InvoiceTable from "../components/InvoiceTable";
import Pricing from "../components/Pricing";

const SidebarItem = ({ icon: Icon, label, active = false, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${active ? 'text-primary-400' : 'group-hover:text-white transition-colors'}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-500 rounded uppercase tracking-wider">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ icon: Icon, label, value, trend, colorClass = "text-primary-400" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex-1 min-w-[200px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-primary-500/30 transition-all duration-300"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all ${colorClass}`}>
      <Icon className="w-10 h-10" />
    </div>
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end gap-3">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      {trend && (
        <span className="text-xs font-bold text-green-500 mb-1">
          {trend}
        </span>
      )}
    </div>
  </motion.div>
);

const MeetingRow = ({ meeting }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center border border-primary-500/20">
        <Bot className="w-6 h-6 text-primary-400" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{meeting.title}</h4>
        <p className="text-xs text-gray-500">{new Date(meeting.startTime).toLocaleDateString()} • {meeting.duration || 0} min</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
        meeting.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
      }`}>
        {meeting.status}
      </span>
      <button className="p-2 text-gray-500 hover:text-white transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux states
  const { currentSubscription, plans, loading: subscriptionLoading } = useSelector(state => state.subscription);
  const { history, invoice, loading: billingLoading, invoiceLoading } = useSelector(state => state.billing);
  const { cancelLoading } = useSelector(state => state.payment);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    }

    const storedToken = localStorage.getItem("token");
    if (!storedToken && !token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${storedToken || token}`,
      };

      try {
        // Fetch Profile
        const profileRes = await fetch("http://localhost:5000/api/auth/profile", { headers });
        if (profileRes.ok) {
          const userData = await profileRes.json();
          setUser(userData);
        } else {
          throw new Error("Session expired");
        }

        // Fetch Stats
        const statsRes = await fetch("http://localhost:5000/api/dashboard", { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch Meetings
        const meetingsRes = await fetch("http://localhost:5000/api/meetings", { headers });
        if (meetingsRes.ok) {
          const meetingsData = await meetingsRes.json();
          setMeetings(meetingsData);
        }

        // Dispatch Redux updates
        dispatch(fetchCurrentSubscription());
        dispatch(fetchPlans());
        dispatch(fetchPaymentHistory());

      } catch (err) {
        console.error("Data fetch failed", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, navigate, dispatch]);

  const handleSignOut = async () => {
    localStorage.removeItem("token");
    try {
      await fetch("http://localhost:5000/api/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    }
    navigate("/login");
  };

  const handleCancelAutoRenewal = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription auto-renewal? You will keep your benefits until the end of the current billing cycle.")) {
      try {
        const result = await dispatch(cancelSubscription()).unwrap();
        if (result.success) {
          alert("Auto-renewal has been successfully cancelled.");
          dispatch(fetchCurrentSubscription());
        }
      } catch (err) {
        alert(err || "Failed to cancel renewal");
      }
    }
  };

  const handleOpenInvoice = async (paymentId) => {
    try {
      await dispatch(fetchInvoice(paymentId)).unwrap();
      setIsInvoiceOpen(true);
    } catch (err) {
      alert("Failed to load invoice details");
    }
  };

  const handleCloseInvoice = () => {
    setIsInvoiceOpen(false);
    dispatch(clearInvoice());
  };

  const activePlanName = currentSubscription?.planId?.name || "Trial Plan";

  return (
    <div className="min-h-screen bg-[#050510] text-white flex font-inter relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-900/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 right-1/4 w-1/4 h-1/4 bg-purple-900/5 blur-[100px] rounded-full" />
      </div>

      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 flex flex-col h-screen sticky top-0 bg-[#050510]/50 backdrop-blur-xl z-10">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/30">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NIS AI</span>
          </Link>

          <nav className="space-y-1">
            <SidebarItem icon={HomeIcon} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <SidebarItem icon={Monitor} label="Interview Sessions" active={activeTab === 'sessions'} onClick={() => setActiveTab('sessions')} />
            <SidebarItem icon={CreditCard} label="Billing & Plan" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
            <SidebarItem icon={User} label="Profile Details" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-6">
          {/* Interview Credits Card */}
          <div className="bg-[#0c0c1e] border border-primary-500/30 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-600/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-bold">Interview Credits</h4>
            </div>
            <p className="text-[11px] text-gray-400 mb-4 leading-normal">
              Credits reset automatically based on subscription type.
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Tier Limit:</span>
                <span className="text-green-400 font-bold">
                  {currentSubscription?.planId?.price > 0 ? "Unlimited" : "10 min/session"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Active Plan:</span>
                <span className="text-primary-400 font-medium capitalize">{activePlanName}</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('billing')}
              className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
            >
              Manage Plan
            </button>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between group cursor-pointer" onClick={() => setActiveTab('profile')}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{activePlanName}</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-red-400/60 hover:text-red-400 transition-colors w-fit px-2 py-1 rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto z-10">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-end bg-[#050510]/50 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 text-sm font-bold bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center gap-2">
              Start Free Session
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'home' && (
            <div>
              {/* Greeting */}
              <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Hi, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
              </div>

              {/* Analytics Overview */}
              <div className="flex flex-wrap gap-6 mb-12">
                <StatCard icon={Target} label="Total Meetings" value={stats?.totalMeetings || 0} trend="+12%" />
                <StatCard icon={Monitor} label="Interview Hours" value={`${stats?.totalHours || 0}h`} colorClass="text-blue-400" />
                <StatCard icon={Zap} label="Hours Saved" value={`${stats?.hoursSaved || 0}h`} colorClass="text-orange-400" />
                <StatCard icon={Trophy} label="Monthly Goal" value={`${Math.min(100, ((stats?.meetingsThisMonth || 0) / 10) * 100)}%`} colorClass="text-purple-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Recent Meetings */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Play className="w-5 h-5 text-primary-400" />
                      Recent Activity
                    </h2>
                    <button className="text-xs text-primary-400 hover:underline">View All</button>
                  </div>
                  
                  <div className="space-y-4">
                    {meetings.length > 0 ? (
                      meetings.slice(0, 5).map(m => (
                        <MeetingRow key={m._id} meeting={m} />
                      ))
                    ) : (
                      <div className="p-8 text-center bg-white/5 border border-white/5 rounded-3xl border-dashed">
                        <p className="text-gray-500 text-sm">No recent meetings found. Start a session to see activity.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary-400" />
                    AI Insights
                  </h2>
                  <div className="bg-gradient-to-br from-primary-600/20 to-blue-600/20 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      Based on your last interviews, your communication clarity is optimal. Keep practicing to hit your targets!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-10">
              <div>
                <h1 className="text-3xl font-black mb-2 text-white">Billing & Plan Control</h1>
                <p className="text-sm text-gray-400">View active subscription details, invoices, and billing history.</p>
              </div>

              {/* Active subscription card */}
              <div className="max-w-4xl">
                <h2 className="text-lg font-bold text-gray-400 mb-4 uppercase tracking-widest">Active Plan</h2>
                <SubscriptionCard 
                  subscription={currentSubscription} 
                  plans={plans} 
                  onCancel={handleCancelAutoRenewal} 
                  cancelLoading={cancelLoading} 
                />
              </div>

              {/* Payment logs history */}
              <div className="max-w-6xl">
                <h2 className="text-lg font-bold text-gray-400 mb-4 uppercase tracking-widest">Transaction History</h2>
                <BillingHistory 
                  history={history} 
                  loading={billingLoading} 
                  onOpenInvoice={handleOpenInvoice} 
                />
              </div>

              {/* Available Plans / Upgrade section */}
              <div className="pt-6">
                <h2 className="text-lg font-bold text-gray-400 mb-6 uppercase tracking-widest text-center">Available Upgrade Tiers</h2>
                <Pricing />
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-10 max-w-3xl">
              <div>
                <h1 className="text-3xl font-black mb-2 text-white">Profile Details</h1>
                <p className="text-sm text-gray-400">Review your registered profile details and security logs.</p>
              </div>

              <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-3xl font-black text-primary-400">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 capitalize">Role: {user?.role || 'user'}</p>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Email Address</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{user?.email}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Phone Number</p>
                    <p className="text-white font-medium">{user?.phoneNumber || 'Not Provided'}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Location</p>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{user?.location || 'Not Provided'}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Country</p>
                    <p className="text-white font-medium">{user?.country || 'Not Provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Invoice Details Modal */}
      <InvoiceTable 
        isOpen={isInvoiceOpen} 
        onClose={handleCloseInvoice} 
        invoice={invoice} 
      />
    </div>
  );
}
