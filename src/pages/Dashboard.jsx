import React from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Monitor, 
  Mic, 
  FileText, 
  Briefcase, 
  Bot, 
  BookOpen, 
  Zap, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Download,
  CheckCircle2,
  Cpu,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Upload,
  Play,
  CreditCard,
  Trophy,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, active = false, badge }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-primary-600/10 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${active ? 'text-primary-400' : 'group-hover:text-white transition-colors'}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-500 rounded uppercase tracking-wider">
        {badge}
      </span>
    )}
  </div>
);

const StepCard = ({ step, title, description, action, icon: Icon, disabled = false, secondaryAction, colorClass = "text-white" }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5 }}
    className="flex-1 min-w-[250px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-primary-500/30 transition-all duration-300 shadow-xl shadow-black/20"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all duration-500 ${colorClass}`}>
      <Icon className="w-12 h-12" />
    </div>
    <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-2 block">{step}</span>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{description}</p>
    
    <div className="space-y-3">
      <button 
        disabled={disabled}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          disabled 
          ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
          : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/20'
        }`}
      >
        {action}
        {!disabled && <ChevronRight className="w-4 h-4" />}
      </button>
      {secondaryAction && (
        <button className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors">
          {secondaryAction}
        </button>
      )}
    </div>
  </motion.div>
);

export default function Dashboard() {
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
            <SidebarItem icon={Home} label="Home" active />
            <SidebarItem icon={Monitor} label="Interview Sessions" />
            <SidebarItem icon={Mic} label="Voice Interview" />
            <SidebarItem icon={FileText} label="CVs / Resumes" />
            <SidebarItem icon={Briefcase} label="Jobs for You" badge="NEW" />
            <SidebarItem icon={Bot} label="Instructions for NIS AI" />
            <SidebarItem icon={BookOpen} label="How to Use" />
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
              10 min free per use. Resets 12 min after exhausting. Upgrade for more time.
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Free session:</span>
                <span className="text-green-400 font-bold">10 / 10 min</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Voice trial:</span>
                <span className="text-primary-400 font-medium">Available</span>
              </div>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20">
              Get Credits
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <Download className="w-3 h-3" />
              <span>Desktop App</span>
            </div>
            <span className="text-green-500 hover:underline cursor-pointer">Download</span>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">rahul</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">free plan</p>
              </div>
            </div>
            <Settings className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          </div>
          
          <button className="flex items-center gap-2 text-xs text-red-400/60 hover:text-red-400 transition-colors w-fit px-2 py-1 rounded-lg hover:bg-red-500/10">
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto z-10">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#050510]/50 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl w-80">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none text-sm focus:outline-none w-full text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="px-5 py-2 text-sm font-bold bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center gap-2">
              Start Free Session (10 min)
            </button>
            <button className="px-5 py-2 text-sm font-bold bg-white/5 text-gray-500 rounded-xl border border-white/5 cursor-not-allowed">
              Start Session (Upgrade Required)
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Announcement */}
          <div className="mb-8 p-3 bg-primary-600/5 border border-primary-500/20 rounded-xl text-center">
            <p className="text-xs text-gray-400">
              <span className="text-primary-400 font-bold">New! Desktop App v3 is here</span> — 
              Now undetectable in Task Manager, alternate question detection & auto-updates.{" "}
              <a href="#" className="text-primary-400 hover:underline">See what's new →</a>
            </p>
          </div>

          {/* Greeting */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Hi, rahul 👋</h1>
          </div>

          {/* Steps */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-wrap gap-6 mb-12"
          >
            <StepCard 
              step="Optional: Resume"
              title="Resume Boost"
              description="Upload your resume so NIS AI can generate custom answers to the job interview questions."
              action="Upload Resume"
              icon={Upload}
              colorClass="text-blue-400"
            />
            <div className="hidden lg:flex items-center text-gray-700">
              <ChevronRight className="w-6 h-6" />
            </div>
            <StepCard 
              step="Step 1: Free Session"
              title="Practice Round"
              description="See how easy NIS AI is to use. Free Sessions are free and limited to 10 minutes."
              action="Create Session"
              icon={Target}
              colorClass="text-rose-400"
            />
             <div className="hidden lg:flex items-center text-gray-700">
              <ChevronRight className="w-6 h-6" />
            </div>
            <StepCard 
              step="Step 2: Buy Credits"
              title="Go Unlimited"
              description="Buy credits to use for the real interview. No subscription required!"
              action="Get Credits"
              icon={CreditCard}
              colorClass="text-emerald-400"
            />
             <div className="hidden lg:flex items-center text-gray-700">
              <ChevronRight className="w-6 h-6" />
            </div>
            <StepCard 
              step="Step 3: Real Interview"
              title="Ace the Job"
              description="Use NIS AI for a real interview to get the job you have always dreamed of."
              action="Start [Upgrade Required]"
              icon={Trophy}
              disabled
              colorClass="text-amber-400"
            />
          </motion.div>

          {/* At a Glance */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 relative overflow-hidden shadow-xl shadow-black/20">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-600/5 blur-[100px] rounded-full" />
             
             <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold">NIS AI at a Glance</h2>
             </div>
             <p className="text-gray-400 mb-8 max-w-2xl">
                Your real-time AI interview assistant that is <span className="text-white font-bold">completely invisible and stealth</span> — interviewers cannot see it.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {[
                  "100% undetectable — invisible to interviewers, screen shares, and screenshots",
                  "Listens to interview questions and gives you instant answers on your screen",
                  "Works with any type of interview — behavioral, coding, system design, HR, and more",
                  "Captures LeetCode-style coding questions being screen shared with you",
                  "Works with Zoom, Google Meet, Microsoft Teams, and more",
                  "50+ languages supported — Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, Urdu + 43 more",
                  "Available on Desktop App, Web app, and Mobile"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
             </div>

             <button className="mt-10 text-sm font-bold text-primary-400 hover:text-primary-300 flex items-center gap-2 group transition-all">
                Learn how to use <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          {/* Desi Mode */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300 shadow-xl shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 group-hover:via-orange-500/10 transition-all duration-1000" />
            
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
               <div className="h-1/3 bg-[#FF9933] flex items-center justify-center text-[10px] font-bold text-white">NIS</div>
               <div className="h-1/3 bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border border-blue-900" />
               </div>
               <div className="h-1/3 bg-[#138808]" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h3 className="text-xl font-bold">Desi Mode</h3>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-500 text-[10px] font-bold rounded uppercase">New</span>
              </div>
              <p className="text-gray-400">Get AI answers the way <span className="text-white font-bold">you</span> would actually speak in an interview. Simple, direct, desi style.</p>
            </div>

            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/5 shrink-0 relative z-10">
              Try Desi Mode
            </button>
          </div>
        </div>

        {/* Feedback FAB */}
        <button className="fixed bottom-8 right-8 px-6 py-3 bg-orange-600/90 hover:bg-orange-600 text-white rounded-2xl font-bold shadow-2xl backdrop-blur-md transition-all flex items-center gap-2 group z-30">
          Feedback
        </button>
      </main>
    </div>
  );
}
