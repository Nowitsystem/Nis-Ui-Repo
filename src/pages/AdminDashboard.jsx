import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Users, 
  Settings, 
  LogOut, 
  Cpu, 
  BarChart3, 
  ShieldCheck,
  TrendingUp,
  Mail,
  UserPlus,
  RefreshCw,
  Search,
  Check,
  Zap,
  CreditCard,
  Calendar,
  AlertTriangle,
  SlidersHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";

// Actions
import { fetchAdminPayments, fetchAdminSubscriptions } from "../store/slices/billingSlice";

const AdminStatCard = ({ icon: Icon, label, value, subtext, colorClass = "text-primary-400" }) => (
  <div className="flex-1 min-w-[240px] bg-[#0c0c1e] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-primary-500/20 transition-all duration-300">
    <div className={`absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all ${colorClass}`}>
      <Icon className="w-16 h-16" />
    </div>
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{label}</p>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-xs text-gray-400">{subtext}</p>
  </div>
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Filters State
  const [paymentPlanFilter, setPaymentPlanFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [paymentSearch, setPaymentSearch] = useState('');
  
  const [subscriptionPlanFilter, setSubscriptionPlanFilter] = useState('all');
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState('all');
  const [subscriptionSearch, setSubscriptionSearch] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Admin Data
  const { adminPayments, adminSubscriptions, adminLoading } = useSelector(state => state.billing);

  const fetchAdminData = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${storedToken}` };

    try {
      const statsRes = await fetch("http://localhost:5000/api/admin/stats", { headers });
      if (statsRes.status === 403) {
         navigate("/dashboard"); // Not an admin
         return;
      }
      const statsData = await statsRes.json();
      setStats(statsData);

      const usersRes = await fetch("http://localhost:5000/api/admin/users", { headers });
      const usersData = await usersRes.json();
      setUsers(usersData);

      const plansRes = await fetch("http://localhost:5000/api/plans");
      const plansData = await plansRes.json();
      setAllPlans(plansData);

      // Dispatch Redux Admin lists
      dispatch(fetchAdminPayments());
      dispatch(fetchAdminSubscriptions());
    } catch (err) {
      console.error("Admin data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/admin", { replace: true });
    }

    const storedToken = localStorage.getItem("token");
    if (!storedToken && !token) {
      navigate("/login");
      return;
    }

    fetchAdminData();
  }, [navigate, location, dispatch]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filtered lists computation
  const filteredPayments = adminPayments.filter(p => {
    const matchesPlan = paymentPlanFilter === 'all' || 
      (p.planId?.name || '').toLowerCase() === paymentPlanFilter.toLowerCase();
    const matchesStatus = paymentStatusFilter === 'all' || p.status === paymentStatusFilter;
    const matchesSearch = !paymentSearch || 
      (p.userId?.name || '').toLowerCase().includes(paymentSearch.toLowerCase()) ||
      (p.userId?.email || '').toLowerCase().includes(paymentSearch.toLowerCase()) ||
      (p.invoiceNo || '').toLowerCase().includes(paymentSearch.toLowerCase());
    return matchesPlan && matchesStatus && matchesSearch;
  });

  const filteredSubscriptions = adminSubscriptions.filter(s => {
    const matchesPlan = subscriptionPlanFilter === 'all' || 
      (s.planId?.name || '').toLowerCase() === subscriptionPlanFilter.toLowerCase();
    const matchesStatus = subscriptionStatusFilter === 'all' || s.status === subscriptionStatusFilter;
    const matchesSearch = !subscriptionSearch || 
      (s.userId?.name || '').toLowerCase().includes(subscriptionSearch.toLowerCase()) ||
      (s.userId?.email || '').toLowerCase().includes(subscriptionSearch.toLowerCase());
    return matchesPlan && matchesStatus && matchesSearch;
  });

  const activeSubscriptionsCount = adminSubscriptions.filter(s => s.status === 'active').length;
  const failedPaymentsCount = adminPayments.filter(p => p.status === 'failed').length;

  return (
    <div className="min-h-screen bg-[#050510] text-white flex font-inter">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col h-screen sticky top-0 bg-[#050510]/50 backdrop-blur-xl z-20">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/30">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NIS ADMIN</span>
          </Link>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-medium">Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">User Management</span>
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'payments' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-medium">Payment Monitor</span>
            </button>
            <button 
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'subscriptions' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Subscriptions</span>
            </button>
            <button 
              onClick={() => setActiveTab('plans')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'plans' ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Pricing Plans</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-red-400/60 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Admin Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#050510]/50 sticky top-0 z-10 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Control Center</h2>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase border border-green-500/20">System Online</div>
             <button onClick={fetchAdminData} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <RefreshCw className="w-5 h-5 text-gray-400" />
             </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'overview' ? (
            <div className="space-y-10">
              <div className="flex flex-wrap gap-6">
                <AdminStatCard icon={Users} label="Total Users" value={stats?.totalUsers || 0} subtext="System Registered" />
                <AdminStatCard icon={TrendingUp} label="Total Revenue" value={`₹${stats?.revenue || 0}`} subtext="Completed Paid Transactions" colorClass="text-green-400" />
                <AdminStatCard icon={Calendar} label="Active Subscriptions" value={activeSubscriptionsCount} subtext="Currently Active plans" colorClass="text-primary-400" />
                <AdminStatCard icon={AlertTriangle} label="Failed Payments" value={failedPaymentsCount} subtext="Transaction Fail Logs" colorClass="text-orange-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl p-8">
                  <h3 className="text-lg font-bold mb-6">Recent Signups</h3>
                  <div className="space-y-4">
                    {users.slice(0, 5).map(u => (
                      <div key={u._id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center text-xs font-bold text-primary-400">
                             {u.name?.charAt(0) || 'U'}
                           </div>
                           <div>
                             <p className="text-sm font-bold">{u.name || 'Anonymous'}</p>
                             <p className="text-[10px] text-gray-500">{u.email}</p>
                           </div>
                        </div>
                        <span className="text-[10px] text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl p-8">
                   <h3 className="text-lg font-bold mb-6">Recent Payments</h3>
                   <div className="space-y-4">
                      {adminPayments.slice(0, 5).map(p => (
                        <div key={p._id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                          <div>
                            <p className="text-sm font-bold text-white">{p.userId?.name || 'Unknown User'}</p>
                            <p className="text-[10px] text-gray-500 uppercase">{p.planId?.name || 'Premium Plan'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-primary-400">₹{p.amount}</p>
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${p.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{p.status}</span>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'payments' ? (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Payment Monitoring</h2>
                  <p className="text-xs text-gray-500 mt-1">Review all user transaction logs, invoice numbers, and payment status details.</p>
                </div>
                
                {/* Search & Filters */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search user or invoice..." 
                      value={paymentSearch}
                      onChange={(e) => setPaymentSearch(e.target.value)}
                      className="bg-transparent border-none text-xs focus:outline-none text-white w-44" 
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl text-xs">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                    <select 
                      value={paymentPlanFilter} 
                      onChange={(e) => setPaymentPlanFilter(e.target.value)}
                      className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Plans</option>
                      {allPlans.map(p => <option key={p._id} value={p.name} className="bg-[#0c0c1e]">{p.name}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl text-xs">
                    <select 
                      value={paymentStatusFilter} 
                      onChange={(e) => setPaymentStatusFilter(e.target.value)}
                      className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice No</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount Paid</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Razorpay ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map(p => (
                        <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition-all text-xs text-gray-300">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white">{p.userId?.name || 'Unknown User'}</p>
                            <p className="text-[10px] text-gray-500">{p.userId?.email}</p>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-white">{p.invoiceNo || 'N/A'}</td>
                          <td className="px-6 py-4 font-bold text-white">{p.planId?.name || 'Premium'}</td>
                          <td className="px-6 py-4">₹{p.amount} <span className="text-[10px] text-gray-500">{p.currency}</span></td>
                          <td className="px-6 py-4 font-mono text-[10px] text-gray-500">{p.razorpayPaymentId || p.razorpayOrderId || 'N/A'}</td>
                          <td className="px-6 py-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.status === 'completed' ? 'bg-green-500/10 text-green-500' : p.status === 'failed' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredPayments.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center py-10 text-gray-500">No payment logs found matching selected filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'subscriptions' ? (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">User Subscriptions</h2>
                  <p className="text-xs text-gray-500 mt-1">Monitor users active plans, start and expiration timelines, and cancellation indicators.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search user..." 
                      value={subscriptionSearch}
                      onChange={(e) => setSubscriptionSearch(e.target.value)}
                      className="bg-transparent border-none text-xs focus:outline-none text-white w-44" 
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl text-xs">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                    <select 
                      value={subscriptionPlanFilter} 
                      onChange={(e) => setSubscriptionPlanFilter(e.target.value)}
                      className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Plans</option>
                      {allPlans.map(p => <option key={p._id} value={p.name} className="bg-[#0c0c1e]">{p.name}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0c0c1e] border border-white/5 px-3 py-1.5 rounded-xl text-xs">
                    <select 
                      value={subscriptionStatusFilter} 
                      onChange={(e) => setSubscriptionStatusFilter(e.target.value)}
                      className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plan Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">StartDate</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">EndDate</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Auto-Renew</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubscriptions.map(s => (
                        <tr key={s._id} className="border-b border-white/5 hover:bg-white/5 transition-all text-xs text-gray-300">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white">{s.userId?.name || 'Unknown User'}</p>
                            <p className="text-[10px] text-gray-500">{s.userId?.email}</p>
                          </td>
                          <td className="px-6 py-4 font-bold text-white capitalize">{s.planId?.name || 'Starter Plan'}</td>
                          <td className="px-6 py-4">{new Date(s.startDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{new Date(s.endDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${!s.cancelAtPeriodEnd ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'}`}>
                              {!s.cancelAtPeriodEnd ? 'ON' : 'OFF'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredSubscriptions.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-10 text-gray-500">No subscriptions found matching selected filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'plans' ? (
            <div className="space-y-6">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Pricing Plans</h2>
                  <button className="flex items-center gap-2 bg-primary-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-500 transition-all">
                     <UserPlus className="w-4 h-4" /> Add Plan
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPlans.map(p => (
                    <div key={p._id} className="bg-[#0c0c1e] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                       <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-white">{p.name}</h3>
                          <span className="text-primary-400 font-bold">${p.price}</span>
                       </div>
                       <p className="text-xs text-gray-400 mb-6">{p.description}</p>
                       <div className="space-y-2 mb-6">
                          {p.features?.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] text-gray-500">
                               <Check className="w-3 h-3 text-green-500" />
                               {f}
                            </div>
                          ))}
                       </div>

                       <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold transition-all">Edit</button>
                          <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-[10px] font-bold transition-all">Disable</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Search users..." className="bg-transparent border-none text-sm focus:outline-none" />
                     </div>
                     <button className="flex items-center gap-2 bg-primary-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-500 transition-all">
                        <UserPlus className="w-4 h-4" /> Add User
                     </button>
                  </div>
               </div>

               <div className="bg-[#0c0c1e] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-9 h-9 rounded-full bg-primary-600/20 flex items-center justify-center text-sm font-bold text-primary-400">
                                 {u.name?.charAt(0) || 'U'}
                               </div>
                               <div>
                                 <p className="text-sm font-bold">{u.name || 'Anonymous'}</p>
                                 <p className="text-[10px] text-gray-500">{u.email}</p>
                               </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-gray-500/20 text-gray-400'}`}>
                               {u.role}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-400">
                             {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-xs font-bold text-primary-400 hover:underline">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
