import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Shield, 
  Zap, 
  Code, 
  Server, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  CheckCircle2, 
  Menu, 
  X,
  Cpu,
  Activity,
  Lock,
  Search,
  ShoppingCart,
  Check,
  Globe,
  Database,
  Users,
  Command,
  CreditCard,
  User,
  LogOut,
  Loader2,
  Github,
  Twitter,
  Disc,
  Mail,
  ExternalLink,
  Key,
  Download,
  Clock,
  AlertCircle,
  FileCode,
  Bug,
  HelpCircle
} from 'lucide-react';

// --- Data Constants ---

const ALL_PRODUCTS = [
  { id: 'surv-core', title: "Survival Core v4", type: "Server Setup", price: 24.99, icon: Server, isNew: true, category: "Optimization", stats: [{ label: "Performance", value: "20.0 TPS" }, { label: "Memory", value: "2GB Rec." }] },
  { id: 'ac-matrix', title: "Anti-Cheat Matrix", type: "Configuration", price: 14.50, icon: Shield, isNew: false, category: "Security", stats: [{ label: "Checks", value: "150+" }, { label: "False Pos", value: "< 0.1%" }] },
  { id: 'lobby-ess', title: "Lobby Essentials", type: "Visual Setup", price: 9.99, icon: Zap, isNew: false, category: "Cosmetics", stats: [{ label: "Themes", value: "12 Dark" }, { label: "NPCs", value: "Included" }] },
  { id: 'admin-web', title: "Admin Panel Web", type: "Web Tool", price: 49.00, icon: Code, isNew: true, category: "Tools", stats: [{ label: "Stack", value: "React/Node" }, { label: "Auth", value: "Discord" }] },
  { id: 'sky-orig', title: "Skyblock Origin", type: "Full Setup", price: 35.00, icon: Server, isNew: false, category: "Optimization", stats: [{ label: "Islands", value: "Procedural" }, { label: "Economy", value: "Balanced" }] },
  { id: 'bot-pro', title: "Discord Bot Pro", type: "Integration", price: 19.99, icon: Terminal, isNew: false, category: "Tools", stats: [{ label: "Uptime", value: "99.9%" }, { label: "Cmds", value: "Slash" }] },
  { id: 'rank-yaml', title: "Rank System YAML", type: "Configuration", price: 4.99, icon: Activity, isNew: false, category: "Optimization", stats: [{ label: "Groups", value: "15" }, { label: "Colors", value: "Hex" }] },
  { id: 'bungee', title: "BungeeCord Proxy", type: "Network", price: 12.99, icon: Globe, isNew: false, category: "Optimization", stats: [{ label: "Servers", value: "Unlimited" }, { label: "Filter", value: "DDoS" }] },
  { id: 'mysql', title: "MySQL Database", type: "Integration", price: 8.99, icon: Database, isNew: true, category: "Tools", stats: [{ label: "Tables", value: "Auto-sync" }, { label: "Backup", value: "Hourly" }] },
];

// --- Helpers ---

const openExternal = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// --- Shared Components ---

// Force Tailwind to generate classes for dynamic themes
const TailwindSafelist = () => (
  <div className="hidden">
    <div className="text-emerald-400 bg-emerald-500 border-emerald-500 hover:bg-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5 shadow-emerald-500/20 from-emerald-400 to-emerald-600 bg-emerald-500/5 selection:bg-emerald-500/30"></div>
    <div className="text-blue-400 bg-blue-500 border-blue-500 hover:bg-blue-400 hover:text-blue-300 hover:border-blue-500/30 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5 shadow-blue-500/20 from-blue-400 to-blue-600 bg-blue-500/5 selection:bg-blue-500/30"></div>
    <div className="text-violet-400 bg-violet-500 border-violet-500 hover:bg-violet-400 hover:text-violet-300 hover:border-violet-500/30 bg-violet-500/10 border-violet-500/20 shadow-violet-500/5 shadow-violet-500/20 from-violet-400 to-violet-600 bg-violet-500/5 selection:bg-violet-500/30"></div>
    <div className="text-rose-400 bg-rose-500 border-rose-500 hover:bg-rose-400 hover:text-rose-300 hover:border-rose-500/30 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5 shadow-rose-500/20 from-rose-400 to-rose-600 bg-rose-500/5 selection:bg-rose-500/30"></div>
  </div>
);

const Navbar = ({ activePage, navigate, openLogin, isLoggedIn, user, logout, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Tools' },
    { id: 'resources', label: 'Resources' },
    { id: 'pricing', label: 'Pricing' }
  ];

  if (isLoggedIn) {
    if (!navLinks.find(l => l.id === 'dashboard')) {
        // Just for mobile menu rendering convenience
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`backdrop-blur-xl bg-[#0b0e11]/90 border border-white/5 rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-${theme}-500/5 transition-all ${isScrolled ? 'mx-0' : 'mx-0 lg:mx-8'}`}>
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className={`w-8 h-8 rounded-lg bg-${theme}-500/10 border border-${theme}-500/20 flex items-center justify-center group-hover:bg-${theme}-500/20 transition-colors`}>
              <Terminal size={18} className={`text-${theme}-400`} />
            </div>
            <span className="text-white font-bold tracking-tight text-lg">
              SAMPLES<span className={`text-${theme}-400`}>LAB</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => navigate(link.id)}
                className={`hover:text-${theme}-400 transition-colors relative group ${activePage === link.id ? `text-${theme}-400` : ''}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-${theme}-500 transition-all ${activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`}></span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                 <button 
                    onClick={() => navigate('dashboard')}
                    className="text-sm font-medium text-gray-300 flex items-center gap-2 hover:text-white transition-colors"
                 >
                    <div className={`w-2 h-2 rounded-full bg-${theme}-500`}></div>
                    {user}
                 </button>
                 <button onClick={logout} className="text-gray-500 hover:text-white transition-colors" title="Logout">
                    <LogOut size={18} />
                 </button>
              </div>
            ) : (
              <button 
                onClick={openLogin}
                className={`text-sm font-medium text-${theme}-400 hover:text-${theme}-300 transition-colors`}
              >
                Login
              </button>
            )}
            
            <button 
              onClick={() => navigate('console')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all group ${
                activePage === 'console' 
                  ? `bg-${theme}-500/20 border-${theme}-500 text-${theme}-400` 
                  : `border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-${theme}-500/30`
              }`}
            >
              <span className={`w-2 h-2 rounded-full bg-${theme}-500 ${activePage === 'console' ? '' : 'animate-pulse'}`}></span>
              Console
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-4 bg-[#111418] border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4 z-50">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { navigate(link.id); setMobileMenuOpen(false); }} 
              className={`text-left font-medium py-2 px-2 hover:bg-white/5 rounded-lg transition-colors ${activePage === link.id ? `text-${theme}-400` : 'text-gray-300'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-1"></div>
          {isLoggedIn ? (
             <button 
              onClick={() => { navigate('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-2 text-gray-300 hover:text-${theme}-400 font-medium`}
            >
              Dashboard ({user})
            </button>
          ) : (
             <button 
              onClick={() => { openLogin(); setMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-2 text-gray-300 hover:text-${theme}-400 font-medium`}
            >
              Login
            </button>
          )}
          <button 
            onClick={() => { navigate('console'); setMobileMenuOpen(false); }}
            className={`w-full py-3 bg-${theme}-500/10 text-${theme}-400 border border-${theme}-500/20 rounded-lg font-bold`}
          >
            Access Console
          </button>
        </div>
      )}
    </nav>
  );
};

const ActivityTicker = ({ theme }) => {
  const [messages, setMessages] = useState([
    "User_8492 deployed Survival Core v4",
    "Hyp3rNetwork purchased Anti-Cheat Matrix",
    "Server_Titan upgraded to Enterprise Plan",
    "New Asset: Skyblock Origin v2 released",
    "System Status: All systems operational",
    "User_DevOps connected via API"
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="bg-[#0b0e11] border-t border-white/5 py-2 px-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-mono overflow-hidden">
      <div className={`flex items-center gap-2 text-${theme}-400 whitespace-nowrap`}>
        <Activity size={14} className="animate-pulse" />
        <span className="font-bold">LIVE FEED</span>
      </div>
      <div className="h-4 w-px bg-white/10"></div>
      <div className="text-gray-500 animate-in slide-in-from-bottom-2 fade-in duration-500 key={index}">
        {messages[index]}
      </div>
    </div>
  );
};

const Footer = ({ navigate, theme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#020203] border-t border-white/5 pt-16 text-sm mt-auto flex flex-col">
      <div className="max-w-7xl mx-auto px-6 w-full pb-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('home')}
            >
              <Terminal size={18} className={`text-${theme}-400`} />
              <span className="text-white font-bold tracking-tight">
                SAMPLES<span className={`text-${theme}-400`}>LAB</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Premium digital assets for the modern creator economy. Built by developers, for developers.
            </p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => openExternal('https://github.com')} className="text-gray-600 hover:text-white transition-colors"><Github size={20} /></button>
              <button onClick={() => openExternal('https://twitter.com')} className="text-gray-600 hover:text-white transition-colors"><Twitter size={20} /></button>
              <button onClick={() => openExternal('https://discord.com')} className="text-gray-600 hover:text-white transition-colors"><Disc size={20}/></button>
            </div>
          </div>
          
          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-500">
              <li><button onClick={() => navigate('tools')} className={`hover:text-${theme}-400 transition-colors`}>Browse Assets</button></li>
              <li><button onClick={() => navigate('pricing')} className={`hover:text-${theme}-400 transition-colors`}>Pricing Plans</button></li>
              <li><button onClick={() => navigate('console')} className={`hover:text-${theme}-400 transition-colors`}>System Console</button></li>
              <li><button onClick={() => navigate('resources')} className={`hover:text-${theme}-400 transition-colors`}>Documentation</button></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li><button onClick={() => navigate('resources')} className={`hover:text-${theme}-400 transition-colors`}>Help Center</button></li>
              <li><button onClick={() => openExternal('https://discord.com/invite/placeholder')} className={`hover:text-${theme}-400 transition-colors`}>Join Discord</button></li>
              <li><button onClick={() => openExternal('https://status.io')} className={`hover:text-${theme}-400 transition-colors`}>API Status</button></li>
              <li><button onClick={() => openExternal('https://github.com/issues')} className={`hover:text-${theme}-400 transition-colors`}>Report Bug</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className={`bg-[#111418] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-${theme}-500 w-full`} 
              />
              <button 
                onClick={handleSubscribe}
                className={`border border-${theme}-500/20 px-4 py-2 rounded-lg transition-all ${subscribed ? `bg-${theme}-500 text-black` : `bg-${theme}-500/10 text-${theme}-400 hover:bg-${theme}-500 hover:text-black`}`}
              >
                {subscribed ? <Check size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
            <p className="text-gray-600 text-xs mt-3">
              Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600">&copy; 2026 SamplesLab Inc. All rights reserved.</div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-[#111418] border border-white/5 cursor-pointer hover:border-${theme}-500/30 transition-colors`} onClick={() => navigate('console')}>
            <span className={`w-2 h-2 rounded-full bg-${theme}-500 animate-pulse`}></span>
            <span className="text-xs font-mono text-gray-400">All Systems Operational</span>
          </div>
        </div>
      </div>
      
      {/* Activity Ticker - Pinned to bottom of footer */}
      <ActivityTicker theme={theme} />
    </footer>
  );
};

const ProductCard = ({ product, onBuy, theme }) => {
  const { title, type, price, stats, icon: Icon, isNew } = product;
  return (
    <div className={`group relative bg-[#111418] rounded-xl border border-white/5 hover:border-${theme}-500/30 transition-all duration-300 overflow-hidden hover:-translate-y-1 h-full flex flex-col`}>
      <div className={`absolute inset-0 bg-gradient-to-b from-${theme}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className="p-5 relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-10 h-10 rounded-lg bg-[#0b0e11] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-${theme}-400 group-hover:border-${theme}-500/30 transition-all`}>
            <Icon size={20} />
          </div>
          {isNew && (
            <span className={`px-2 py-0.5 rounded-full bg-${theme}-500/10 border border-${theme}-500/20 text-[10px] font-bold text-${theme}-400 uppercase tracking-wider`}>
              v4.2 Update
            </span>
          )}
        </div>

        <h3 className={`text-white font-bold text-lg mb-1 group-hover:text-${theme}-400 transition-colors`}>{title}</h3>
        <p className="text-gray-500 text-xs font-mono mb-4 flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full bg-${theme}-500`}></span>
          {type}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#050608] rounded border border-white/5 p-2">
              <div className="text-[10px] text-gray-600 uppercase font-semibold">{stat.label}</div>
              <div className="text-xs text-gray-300 font-mono">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className={`text-${theme}-400 font-bold font-mono text-lg`}>${price.toFixed(2)}</div>
          <button 
            onClick={() => onBuy(product)}
            className={`p-2 rounded-lg bg-white/5 hover:bg-${theme}-500 hover:text-black text-gray-400 transition-all`}
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Modals ---

const PurchaseModal = ({ isOpen, onClose, product, theme }) => {
  const [license, setLicense] = useState('standard'); 
  const [support, setSupport] = useState('none'); 
  const [loading, setLoading] = useState(false);

  if (!isOpen || !product) return null;

  const basePrice = product.price;
  const licenseCost = license === 'extended' ? 25 : 0;
  const supportCost = support === 'priority' ? 15 : 0;
  const total = basePrice + licenseCost + supportCost;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      openExternal('https://stripe.com/checkout/placeholder');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-[#0b0e11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#111418] px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white font-bold flex items-center gap-2">
            <ShoppingCart size={18} className={`text-${theme}-400`} /> 
            Checkout
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-[#050608] border border-white/10 flex items-center justify-center text-emerald-400">
              <product.icon size={28} className={`text-${theme}-400`} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{product.title}</h4>
              <p className="text-sm text-gray-500">{product.type}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">License Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setLicense('standard')}
                  className={`p-3 rounded-lg border text-sm text-left transition-all ${license === 'standard' ? `bg-${theme}-500/10 border-${theme}-500 text-${theme}-400` : 'bg-[#050608] border-white/10 text-gray-400 hover:border-white/20'}`}
                >
                  <div className="font-bold">Standard</div>
                  <div className="text-xs opacity-70">Single Server</div>
                </button>
                <button 
                  onClick={() => setLicense('extended')}
                  className={`p-3 rounded-lg border text-sm text-left transition-all ${license === 'extended' ? `bg-${theme}-500/10 border-${theme}-500 text-${theme}-400` : 'bg-[#050608] border-white/10 text-gray-400 hover:border-white/20'}`}
                >
                  <div className="font-bold">Extended</div>
                  <div className="text-xs opacity-70">Commercial Use (+$25)</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Support Plan</label>
              <div 
                onClick={() => setSupport(support === 'none' ? 'priority' : 'none')}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${support === 'priority' ? `bg-${theme}-500/10 border-${theme}-500` : 'bg-[#050608] border-white/10 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center ${support === 'priority' ? `bg-${theme}-500 border-${theme}-500` : 'border-gray-600'}`}>
                      {support === 'priority' && <Check size={12} className="text-black" />}
                   </div>
                   <div>
                     <div className={`text-sm font-bold ${support === 'priority' ? `text-${theme}-400` : 'text-gray-300'}`}>Priority Support + Installation</div>
                     <div className="text-xs text-gray-500">Jump the queue & get setup help</div>
                   </div>
                </div>
                <div className="text-sm text-gray-400">+$15.00</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
             <div>
               <div className="text-xs text-gray-500">Total Due</div>
               <div className="text-2xl font-bold text-white">${total.toFixed(2)}</div>
             </div>
             <button 
               onClick={handleCheckout}
               disabled={loading}
               className={`bg-${theme}-500 hover:bg-${theme}-400 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
             >
               {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
               {loading ? "Processing..." : "Secure Checkout"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin, theme }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email.split('@')[0] || 'User');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-sm bg-[#0b0e11] border border-white/10 rounded-2xl shadow-2xl p-8 animate-in zoom-in-95">
        <div className="text-center mb-6">
           <div className={`w-12 h-12 bg-${theme}-500/10 rounded-xl border border-${theme}-500/20 flex items-center justify-center mx-auto mb-4 text-${theme}-400`}>
             <User size={24} />
           </div>
           <h3 className="text-xl font-bold text-white">Welcome Back</h3>
           <p className="text-sm text-gray-500">Access your dashboard and purchases</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-[#050608] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-${theme}-500 transition-colors`}
              placeholder="dev@sampleslab.com" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Password</label>
            <input 
              type="password" 
              className={`w-full bg-[#050608] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-${theme}-500 transition-colors`}
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-${theme}-500 hover:bg-${theme}-400 text-black font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2`}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={18} /></button>
      </div>
    </div>
  );
};

// --- Pages ---

const DashboardPage = ({ theme, user }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const assets = [
    { name: "Survival Core v4", purchased: "2 days ago", version: "4.2.1", key: "XXXX-XXXX-XXXX-8821", icon: Server },
    { name: "Anti-Cheat Matrix", purchased: "1 week ago", version: "1.0.5", key: "XXXX-XXXX-XXXX-1092", icon: Shield }
  ];

  const licenses = [
    { id: 'L-8821', product: "Survival Core v4", key: "8821-9928-1120-KD92", status: "Active", ip: "45.22.19.11" },
    { id: 'L-1092', product: "Anti-Cheat Matrix", key: "1092-LL29-0092-MM21", status: "Unbound", ip: "N/A" }
  ];

  const invoices = [
    { id: 'INV-2024-001', date: 'Feb 2, 2026', amount: '$24.99', status: 'Paid', method: 'PayPal' },
    { id: 'INV-2024-002', date: 'Jan 25, 2026', amount: '$14.50', status: 'Paid', method: 'Credit Card' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#111418] p-6 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs uppercase font-bold mb-2">Active Services</div>
                <div className="text-3xl font-bold text-white">2</div>
              </div>
              <div className="bg-[#111418] p-6 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs uppercase font-bold mb-2">Total Spent</div>
                <div className={`text-3xl font-bold text-${theme}-400`}>$39.49</div>
              </div>
              <div className="bg-[#111418] p-6 rounded-2xl border border-white/5">
                <div className="text-gray-500 text-xs uppercase font-bold mb-2">Support Tickets</div>
                <div className="text-3xl font-bold text-white">0</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Recent Purchases</h3>
            <div className="space-y-4">
              {assets.map((asset, idx) => (
                <div key={idx} className="bg-[#111418] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`w-10 h-10 rounded-lg bg-${theme}-500/10 flex items-center justify-center text-${theme}-400`}>
                      <asset.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{asset.name}</h4>
                      <p className="text-xs text-gray-500">Purchased {asset.purchased} • v{asset.version}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-[#050608] px-3 py-2 rounded-lg border border-white/10 text-xs font-mono text-gray-400 flex items-center gap-2">
                      <Key size={12} />
                      {asset.key}
                    </div>
                    <button onClick={() => openExternal('#')} className={`p-2 rounded-lg bg-${theme}-500 hover:bg-${theme}-400 text-black transition-colors`}>
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'my assets':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Your Product Library</h3>
                <div className="flex gap-2">
                   <input type="text" placeholder="Filter assets..." className="bg-[#111418] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/20"/>
                </div>
             </div>
             <div className="grid gap-4">
                {assets.map((asset, idx) => (
                   <div key={idx} className="bg-[#111418] border border-white/5 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                         <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-${theme}-500/10 flex items-center justify-center text-${theme}-400 border border-${theme}-500/20`}>
                               <asset.icon size={24} />
                            </div>
                            <div>
                               <h4 className="text-lg font-bold text-white">{asset.name}</h4>
                               <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                  <span>v{asset.version}</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                  <span className={`text-${theme}-400`}>Supported</span>
                               </div>
                            </div>
                         </div>
                         <button className="text-gray-500 hover:text-white"><ExternalLink size={18} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                         <button className={`w-full py-2 bg-${theme}-500 hover:bg-${theme}-400 text-black font-bold rounded-lg flex items-center justify-center gap-2 text-sm`}>
                            <Download size={16} /> Download
                         </button>
                         <button className="w-full py-2 bg-[#050608] border border-white/10 hover:border-white/20 text-white font-medium rounded-lg text-sm">
                            View Docs
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        );

      case 'licenses':
        return (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xl font-bold text-white mb-4">License Management</h3>
              <div className="bg-[#111418] border border-white/5 rounded-xl overflow-hidden">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-[#0b0e11] text-gray-500 font-medium">
                       <tr>
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">License Key</th>
                          <th className="px-6 py-4">IP Address</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {licenses.map((lic, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                             <td className="px-6 py-4 font-medium text-white">{lic.product}</td>
                             <td className="px-6 py-4 font-mono text-gray-400">{lic.key}</td>
                             <td className="px-6 py-4 text-gray-400">{lic.ip}</td>
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${lic.status === 'Active' ? `bg-${theme}-500/10 text-${theme}-400 border border-${theme}-500/20` : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                   <div className={`w-1.5 h-1.5 rounded-full ${lic.status === 'Active' ? `bg-${theme}-500` : 'bg-yellow-500'}`}></div>
                                   {lic.status}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button className="text-gray-500 hover:text-white">Manage</button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        );

      case 'billing':
         return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <h3 className="text-xl font-bold text-white mb-4">Billing History</h3>
               <div className="space-y-4">
                  {invoices.map((inv, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-[#111418] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-full bg-${theme}-500/10 flex items-center justify-center text-${theme}-400`}>
                              <CreditCard size={18} />
                           </div>
                           <div>
                              <div className="text-white font-bold">{inv.amount}</div>
                              <div className="text-xs text-gray-500">{inv.id} • {inv.date}</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">{inv.status}</span>
                           <button className="text-gray-500 hover:text-white"><Download size={16}/></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         );

      case 'settings':
         return (
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div>
                  <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
                  <div className="bg-[#111418] border border-white/5 rounded-xl p-6 space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Display Name</label>
                        <input type="text" defaultValue={user} className="w-full bg-[#050608] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/20" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                        <input type="email" defaultValue={`${user.toLowerCase()}@sampleslab.dev`} className="w-full bg-[#050608] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/20" />
                     </div>
                     <button className={`px-6 py-2 bg-${theme}-500 text-black font-bold rounded-lg hover:bg-${theme}-400 transition-colors`}>Save Changes</button>
                  </div>
               </div>
               
               <div>
                  <h3 className="text-xl font-bold text-white mb-4">Danger Zone</h3>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 flex items-center justify-between">
                     <div>
                        <div className="text-red-400 font-bold mb-1">Delete Account</div>
                        <p className="text-xs text-red-400/70">Once you delete your account, there is no going back. Please be certain.</p>
                     </div>
                     <button className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-bold transition-colors">Delete</button>
                  </div>
               </div>
            </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 min-h-[70vh]">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div className="p-6 bg-[#111418] border border-white/5 rounded-2xl mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-${theme}-500 flex items-center justify-center text-black font-bold text-xl`}>
                {user.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-white font-bold">{user}</h3>
                <p className="text-xs text-gray-500">Developer Account</p>
              </div>
            </div>
            <div className={`text-xs text-${theme}-400 font-mono`}>ID: 882910-X</div>
          </div>

          {['Overview', 'My Assets', 'Licenses', 'Billing', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item.toLowerCase())}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.toLowerCase() 
                  ? `bg-${theme}-500/10 text-${theme}-400 border border-${theme}-500/20` 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Activity className={`text-${theme}-400`} />
            Dashboard / {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const HeroMockInterface = ({ theme }) => {
  const [ram, setRam] = useState(85);
  const [platform, setPlatform] = useState('Paper/Purpur');
  const [optimizerEnabled, setOptimizerEnabled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [applyState, setApplyState] = useState('idle'); 

  const platforms = ['Paper/Purpur', 'Spigot/Bukkit', 'Vanilla', 'Fabric', 'Velocity Proxy'];

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    setApplyState('loading');
    setTimeout(() => {
      setApplyState('success');
      setTimeout(() => setApplyState('idle'), 2000);
    }, 1500);
  };

  return (
    <div className="relative group w-full max-w-md mx-auto lg:mr-0 select-none">
      <div className={`absolute -inset-1 bg-gradient-to-r from-${theme}-500 to-teal-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
      <div className="relative bg-[#0b0e11] border border-white/10 rounded-xl overflow-visible shadow-2xl">
        <div className="bg-[#151921] px-4 py-3 border-b border-white/5 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className={`w-2.5 h-2.5 rounded-full bg-${theme}-500/20 border border-${theme}-500/50`}></div>
            </div>
            <span className="ml-2 text-xs font-mono text-gray-500">config.yml — server-setup</span>
          </div>
          <div className={`px-2 py-0.5 rounded bg-${theme}-500/10 text-${theme}-400 text-[10px] font-bold border border-${theme}-500/20`}>
            EDITABLE
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between relative z-20">
            <div>
              <div className="text-sm font-medium text-gray-200">System Optimizer</div>
              <div className="text-xs text-gray-500">Auto-tune garbage collection</div>
            </div>
            <div 
              onClick={() => setOptimizerEnabled(!optimizerEnabled)}
              className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${optimizerEnabled ? `bg-${theme}-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]` : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 bottom-1 w-3 bg-white rounded-full shadow-sm transition-all duration-300 ${optimizerEnabled ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs uppercase tracking-wider font-semibold text-gray-500">
              <span>RAM Allocation</span>
              <span className={`font-mono transition-colors ${ram > 1024 ? 'text-red-400' : `text-${theme}-400`}`}>{(ram / 10).toFixed(1)}GB</span>
            </div>
            <div className="relative h-6 flex items-center">
                <div className="absolute left-0 right-0 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 bottom-0 left-0 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-75 ${ram > 1024 ? 'bg-red-500' : `bg-${theme}-500`}`} 
                    style={{ width: `${(ram / 1280) * 100}%` }}
                  ></div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1280" 
                  value={ram} 
                  onChange={(e) => setRam(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 margin-0" 
                />
            </div>
          </div>

          <div className="space-y-2 relative z-10">
            <label className="text-xs uppercase tracking-wider font-semibold text-gray-500">Server Platform</label>
            <div className="relative">
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#111418] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Server size={14} className={`text-${theme}-500`} />
                  {platform}
                </span>
                <ChevronDown size={14} className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#151921] border border-white/10 rounded-lg shadow-xl z-20 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {platforms.map(p => (
                    <div 
                      key={p} 
                      onClick={() => { setPlatform(p); setIsDropdownOpen(false); }}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-white/5 flex items-center justify-between ${platform === p ? `text-${theme}-400` : 'text-gray-400'}`}
                    >
                      {p}
                      {platform === p && <Check size={12} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#050608] rounded-lg p-3 border border-white/5 font-mono text-[10px] text-gray-500 leading-relaxed relative group/code">
            <div 
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-1.5 bg-white/10 rounded hover:bg-${theme}-500 hover:text-white cursor-pointer transition-all text-gray-400`}
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
            </div>
            <p><span className="text-purple-400">server-ip</span>: <span className={`text-${theme}-400`}>0.0.0.0</span></p>
            <p><span className="text-purple-400">view-distance</span>: <span className="text-orange-400">10</span></p>
            <p><span className="text-purple-400">network-compression</span>: <span className="text-orange-400">256</span></p>
            <p className="text-gray-700 animate-pulse">_</p>
          </div>
          <button 
            onClick={handleApply}
            disabled={applyState !== 'idle'}
            className={`w-full py-2 border rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
              ${applyState === 'success' 
                ? `bg-${theme}-500/20 border-${theme}-500 text-${theme}-400` 
                : applyState === 'loading'
                ? 'bg-white/5 border-white/10 text-gray-400 cursor-wait'
                : `bg-white/5 border-white/10 hover:border-${theme}-500/50 hover:bg-${theme}-500/10 hover:text-${theme}-400 text-gray-300`
              }`}
          >
            {applyState === 'idle' && <><Zap size={14} /> Apply Configuration</>}
            {applyState === 'loading' && <><Loader2 size={14} className="animate-spin" /> Saving...</>}
            {applyState === 'success' && <><CheckCircle2 size={14} /> Applied!</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ navigate, onBuy, theme }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [openFAQ, setOpenFAQ] = useState(0);

  const categories = ['All', 'Optimization', 'Security', 'Cosmetics', 'Tools'];
  
  const featuredProducts = ALL_PRODUCTS.slice(0, 6);

  const filteredProducts = activeTab === 'All' 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category === categories.find(c => c === activeTab) || p.category === activeTab);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-${theme}-500/5 rounded-full blur-[120px] pointer-events-none`}></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-${theme}-400 mb-2`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${theme}-400 opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-${theme}-500`}></span>
              </span>
              v2.0 Systems Online
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              THE <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${theme}-400 to-${theme}-600`}>ULTIMATE</span><br />
              UTILITY BELT.
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Optimized server assets, high-performance configurations, and premium web templates. Deployed to your production environment in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => navigate('tools')} className={`px-8 py-4 bg-${theme}-500 text-black font-bold rounded-lg hover:bg-${theme}-400 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]`}>
                <Search size={20} />
                Browse Assets
              </button>
              <button onClick={() => navigate('resources')} className="px-8 py-4 bg-[#111418] text-white font-medium rounded-lg border border-white/10 hover:border-white/30 hover:bg-[#1a1f26] transition-all flex items-center justify-center gap-2">
                View Documentation
              </button>
            </div>

            <div className="flex items-center gap-6 pt-8 text-gray-500 text-sm font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className={`text-${theme}-500`} />
                <span>Instant API Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className={`text-${theme}-500`} />
                <span>24/7 Creator Support</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <HeroMockInterface theme={theme} />
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-white/5 bg-[#0b0e11]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === cat
                    ? `bg-${theme}-500/10 border-${theme}-500 text-${theme}-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]`
                    : 'bg-[#111418] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050608]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Modules</h2>
              <p className="text-gray-500">Hand-picked resources for modern infrastructures.</p>
            </div>
            <button onClick={() => navigate('tools')} className={`hidden md:flex items-center gap-2 text-${theme}-400 hover:text-${theme}-300 transition-colors font-medium`}>
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onBuy={onBuy} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0b0e11] skew-y-3 transform origin-bottom-left -z-10 scale-110"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Engineered for Performance</h2>
            <p className="text-gray-400">Our assets are rigorously tested to ensure zero impact on your server's TPS while delivering maximum utility.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureMetric theme={theme} label="Lag Elimination" value="0%" sub="Reduction in tick latency on average" icon={Cpu} />
            <FeatureMetric theme={theme} label="Delivery Speed" value="<1s" sub="Instant automated deployment via API" icon={Zap} />
            <FeatureMetric theme={theme} label="Secure Tx" value="256-bit" sub="End-to-end encrypted payment processing" icon={Lock} />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050608]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Knowledge Base</h2>
          <div className="space-y-4">
            {[
              { q: "Do these configurations work on Modded servers?", a: "Yes, our configurations are built with universal compatibility in mind. We explicitly test on Paper, Purpur, Fabric, and Forge environments." },
              { q: "How do I receive updates?", a: "Updates are pushed automatically to your user dashboard. You can choose to auto-deploy or manually review changes via our diff tool." },
              { q: "Is there a refund policy?", a: "We offer a 7-day guarantee if the product is technically defective and our support team cannot resolve the issue within 48 hours." },
              { q: "Can I resell these assets?", a: "Standard licenses are for single-use only. For commercial resale rights or enterprise usage, please contact our sales team for an Extended License." }
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} isOpen={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)} theme={theme} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ToolsPage = ({ onBuy, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = ALL_PRODUCTS.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Assets Library</h1>
        <p className="text-gray-400 mb-8">Browse our complete collection of developer-grade tools.</p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search for setups, configs, or scripts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full bg-[#111418] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-${theme}-500 transition-colors`}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool) => (
          <ProductCard key={tool.id} product={tool} onBuy={onBuy} theme={theme} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No assets found matching your search.
        </div>
      )}
    </div>
  );
};

const PricingPage = ({ theme }) => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePlanSelect = (idx) => {
    setSelectedPlan(idx);
    setLoadingPlan(idx);
    setTimeout(() => {
      setLoadingPlan(null);
      openExternal('https://stripe.com/checkout/placeholder-plan');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-400">Choose a plan or buy assets individually.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-center">
        {[
          { name: "Starter", price: "0", desc: "Pay per asset", features: ["Access to free tools", "Community Support", "Standard License"] },
          { name: "Developer", price: "29", desc: "Monthly Subscription", features: ["20% Discount on all assets", "Priority Support", "Private GitHub Access", "Monthly Bonus Asset"] },
          { name: "Enterprise", price: "99", desc: "Monthly Subscription", features: ["50% Discount on all assets", "Dedicated Account Manager", "Custom Implementation", "Extended License Included"] }
        ].map((plan, idx) => {
          const isActive = idx === selectedPlan;
          const isBestValue = idx === 1; // Always show Best Value on Developer plan
          
          return (
            <div key={idx} className={`relative p-8 rounded-2xl border ${isActive ? `bg-[#111418] border-${theme}-500 shadow-2xl shadow-${theme}-500/10 scale-105 z-10` : 'bg-[#0b0e11] border-white/5'} transition-all duration-300`}>
              {isBestValue && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-${theme}-500 text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider shadow-lg shadow-${theme}-500/20`}>
                  Best Value
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-white mb-2">${plan.price}<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <p className="text-gray-500 text-sm mb-8">{plan.desc}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className={isActive ? `text-${theme}-400` : "text-gray-600"} />
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePlanSelect(idx)}
                disabled={loadingPlan === idx}
                className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${isActive ? `bg-${theme}-500 text-black hover:bg-${theme}-400` : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                {loadingPlan === idx ? <Loader2 size={18} className="animate-spin" /> : `Choose ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ConsolePage = ({ theme, setTheme }) => {
  const [lines, setLines] = useState([
    { text: "SamplesLab CLI v2.4.0", color: "text-gray-500" },
    { text: "Copyright (c) 2026 SamplesLab Inc.", color: "text-gray-500" },
    { text: "", color: "text-white" },
    { text: "Initializing secure connection...", color: "text-white" },
    { text: "Verifying handshake...", color: "text-gray-400" },
    { text: "Connection established.", color: `text-${theme}-500` },
    { text: "Type 'help' for available commands.", color: "text-gray-400" },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const addOutput = (newLines) => {
    setLines(prev => [...prev, ...newLines]);
  };

  const handleCommand = async (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim();
      if (!fullCmd) return;
      
      const [cmd, ...args] = fullCmd.toLowerCase().split(' ');
      
      // Add user input line immediately
      setLines(prev => [...prev, { text: `> ${fullCmd}`, color: "text-white" }]);
      setInput('');

      // Processing
      if (cmd === 'help') {
         addOutput([
             { text: "Available commands:", color: `text-${theme}-400` },
             { text: "  sysinfo    Display system information", color: "text-gray-400" },
             { text: "  ls         List directory contents", color: "text-gray-400" },
             { text: "  theme [c]  Change system theme (green, blue, purple, red)", color: `text-${theme}-400 font-bold` },
             { text: "  cat [file] Read file content", color: "text-gray-400" },
             { text: "  ping [ip]  Test network connection", color: "text-gray-400" },
             { text: "  deploy     Initialize deployment sequence", color: "text-gray-400" },
             { text: "  clear      Clear terminal", color: "text-gray-400" },
             { text: "  whoami     Display current user", color: "text-gray-400" },
         ]);
      } 
      else if (cmd === 'theme') {
          const color = args[0];
          const validColors = {
              green: 'emerald',
              emerald: 'emerald',
              blue: 'blue',
              cyan: 'blue',
              purple: 'violet',
              violet: 'violet',
              red: 'rose',
              rose: 'rose'
          };

          if (validColors[color]) {
              addOutput([{ text: `Switching system theme to ${color}...`, color: "text-white" }]);
              await delay(500);
              setTheme(validColors[color]);
              addOutput([{ text: "Theme updated successfully.", color: `text-${validColors[color]}-400` }]);
          } else {
              addOutput([{ text: "Invalid theme color. Try: green, blue, purple, red", color: "text-red-400" }]);
          }
      }
      else if (cmd === 'sysinfo' || cmd === 'neofetch') {
          addOutput([
              { text: "   _____                 ", color: `text-${theme}-500` },
              { text: "  / ___/____ _____ ___   ", color: `text-${theme}-500` },
              { text: "  \\__ \\/ __ `/ __ `__ \\  ", color: `text-${theme}-500` },
              { text: " ___/ / /_/ / / / / / /  ", color: `text-${theme}-500` },
              { text: "/____/\\__,_/_/ /_/ /_/   ", color: `text-${theme}-500` },
              { text: "", color: "text-white" },
              { text: "OS: SamplesOS v4.2 (Linux)", color: "text-white" },
              { text: "Kernel: 6.8.0-generic", color: "text-white" },
              { text: "Uptime: 42 days, 6 hours", color: "text-white" },
              { text: "CPU: Virtual Core i9 (128 Cores)", color: "text-white" },
              { text: "Memory: 64GB / 128GB", color: "text-white" },
          ]);
      }
      else if (cmd === 'ls' || cmd === 'll') {
          addOutput([
              { text: "drwxr-xr-x  2 root root 4096 Feb 02 14:00 .", color: "text-blue-400" },
              { text: "drwxr-xr-x  4 root root 4096 Feb 01 10:00 ..", color: "text-blue-400" },
              { text: "-rw-r--r--  1 user user 2450 Jan 28 09:30 config.yml", color: "text-white" },
              { text: "-rw-r--r--  1 user user 8192 Jan 29 11:20 server.properties", color: "text-white" },
              { text: "-rwxr-x---  1 user user 1024 Feb 02 13:45 deploy.sh", color: `text-${theme}-400` },
              { text: "drwxr-xr-x  2 user user 4096 Jan 30 16:00 logs", color: "text-blue-400" },
          ]);
      }
      else if (cmd === 'cat') {
          const file = args[0];
          if (!file) {
              addOutput([{ text: "Usage: cat <filename>", color: "text-yellow-400" }]);
          } else if (file === 'config.yml') {
              addOutput([
                  { text: "# Main Configuration", color: "text-gray-500" },
                  { text: "server-name: Production-1", color: "text-white" },
                  { text: "max-players: 2000", color: "text-white" },
                  { text: "view-distance: 10", color: "text-white" },
                  { text: "network-compression-threshold: 256", color: "text-white" },
              ]);
          } else if (file === 'deploy.sh') {
              addOutput([{ text: `#!/bin/bash\necho 'Starting deployment...'`, color: `text-${theme}-400` }]);
          } else {
              addOutput([{ text: `cat: ${file}: No such file or directory`, color: "text-red-400" }]);
          }
      }
      else if (cmd === 'ping') {
          const host = args[0] || '1.1.1.1';
          addOutput([{ text: `PING ${host} (${host}) 56(84) bytes of data.`, color: "text-white" }]);
          await delay(500); addOutput([{ text: `64 bytes from ${host}: icmp_seq=1 ttl=58 time=14.2 ms`, color: "text-white" }]);
          await delay(500); addOutput([{ text: `64 bytes from ${host}: icmp_seq=2 ttl=58 time=13.8 ms`, color: "text-white" }]);
          await delay(500); addOutput([{ text: `64 bytes from ${host}: icmp_seq=3 ttl=58 time=14.1 ms`, color: "text-white" }]);
          addOutput([{ text: `--- ${host} ping statistics ---`, color: "text-white" }]);
      }
      else if (cmd === 'deploy') {
          addOutput([{ text: "[INFO] Initializing deployment matrix...", color: "text-blue-400" }]);
          await delay(800);
          addOutput([{ text: "[INFO] Compiling assets...", color: "text-blue-400" }]);
          await delay(1200);
          addOutput([{ text: "[WARN] Optimization required for 'assets/textures'. Auto-fixing...", color: "text-yellow-400" }]);
          await delay(800);
          addOutput([{ text: "[SUCCESS] Deployment complete. Service restarting.", color: `text-${theme}-400` }]);
      }
      else if (cmd === 'clear') {
          setLines([]);
      }
      else if (cmd === 'whoami') {
          addOutput([{ text: "root", color: `text-${theme}-400` }]);
      }
      else if (cmd === 'sudo') {
          addOutput([{ text: "user is not in the sudoers file. This incident will be reported.", color: "text-red-500" }]);
      }
      else {
          addOutput([{ text: `Command not found: ${cmd}. Type 'help' for a list of commands.`, color: "text-red-400" }]);
      }
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto h-screen flex flex-col">
      <div className="flex-1 bg-[#050608] border border-white/10 rounded-xl p-6 font-mono text-sm overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className={`w-3 h-3 rounded-full bg-${theme}-500/20 border border-${theme}-500/50`}></div>
          <span className="ml-2 text-gray-500">guest@sampleslab-terminal:~</span>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2"
        >
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} whitespace-pre-wrap break-words`}>{line.text}</div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
          <span className={`text-${theme}-500 font-bold`}>{'>'}</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700"
            placeholder="Enter command..."
          />
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = ({ theme }) => {
  const [activeDoc, setActiveDoc] = useState('intro');
  const [filter, setFilter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CodeBlock = ({ code, language = "bash" }) => (
    <div className="relative group mt-4 mb-6">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => handleCopy(code)}
          className={`p-1.5 rounded-md bg-white/10 hover:bg-${theme}-500 hover:text-black text-gray-400 transition-colors`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="bg-[#050608] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
        <div className="flex gap-1.5 mb-3 opacity-50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <pre>{code}</pre>
      </div>
    </div>
  );

  const docs = {
    intro: {
      title: "Introduction to SamplesLab",
      category: "Getting Started",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-400 leading-relaxed text-lg">
            Welcome to the official documentation for SamplesLab assets. Our goal is to provide high-performance, developer-friendly resources for your Minecraft servers and web infrastructure.
          </p>
          
          <div className={`p-6 bg-${theme}-500/5 border border-${theme}-500/10 rounded-xl flex gap-4`}>
            <div className={`mt-1 text-${theme}-400 shrink-0`}><Zap size={24} /></div>
            <div>
              <h4 className={`text-${theme}-400 font-bold mb-2`}>The Zero-Lag Philosophy</h4>
              <p className="text-sm text-gray-400">
                All assets are rigorously tested on production environments with 500+ concurrent players. We prioritize TPS (Ticks Per Second) above all else.
              </p>
            </div>
          </div>

          <div className="bg-[#050608] rounded-xl p-6 border border-white/10">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Server size={18} className="text-gray-500"/> System Prerequisites</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400"><Check size={16} className={`text-${theme}-500`} /> Java 21 (Temurin or GraalVM recommended)</li>
              <li className="flex items-center gap-3 text-gray-400"><Check size={16} className={`text-${theme}-500`} /> Minimum 4GB RAM (8GB+ for 1.20+)</li>
              <li className="flex items-center gap-3 text-gray-400"><Check size={16} className={`text-${theme}-500`} /> Paper, Purpur, or Folia Server Software</li>
            </ul>
          </div>
        </div>
      )
    },
    install: {
      title: "Installation Guide",
      category: "Getting Started",
      content: (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-400">Follow these steps to deploy any SamplesLab server setup to your production environment.</p>
          
          <div className="space-y-8">
            <div className="relative pl-8 border-l border-white/10 space-y-2">
              <span className={`absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#111418] border border-${theme}-500 flex items-center justify-center text-xs font-bold text-${theme}-400`}>1</span>
              <h4 className="text-white font-bold">Prepare Environment</h4>
              <p className="text-sm text-gray-500">Ensure you are starting with a fresh directory to avoid file conflicts.</p>
              <CodeBlock code="mkdir my-server && cd my-server" />
            </div>

            <div className="relative pl-8 border-l border-white/10 space-y-2">
              <span className={`absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#111418] border border-${theme}-500 flex items-center justify-center text-xs font-bold text-${theme}-400`}>2</span>
              <h4 className="text-white font-bold">Download & Extract</h4>
              <p className="text-sm text-gray-500">Download the artifact from your dashboard and extract it to the root.</p>
              <CodeBlock code="unzip survival-core-v4.zip" />
            </div>

            <div className="relative pl-8 border-l border-white/10 space-y-2">
              <span className={`absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#111418] border border-${theme}-500 flex items-center justify-center text-xs font-bold text-${theme}-400`}>3</span>
              <h4 className="text-white font-bold">Accept EULA & Launch</h4>
              <p className="text-sm text-gray-500">You must accept the Mojang EULA before the server can start.</p>
              <CodeBlock code={'echo "eula=true" > eula.txt\njava -Xms4G -Xmx4G -jar server.jar'} />
            </div>
          </div>
        </div>
      )
    },
    config: {
      title: "Configuration & Optimization",
      category: "Getting Started",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm flex gap-3">
            <AlertCircle className="shrink-0" size={18} />
            <div>
              <strong>Warning:</strong> Always backup your configuration files before making bulk edits.
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">Recommended Startup Flags (Aikar's)</h4>
            <p className="text-sm text-gray-500 mb-4">Use these flags to minimize GC pauses and improve tick consistency.</p>
            <CodeBlock code="java -Xms8G -Xmx8G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -jar server.jar" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
             <div className="bg-[#050608] border border-white/10 p-4 rounded-xl">
                <div className="text-white font-bold mb-1">spigot.yml</div>
                <div className="text-xs text-gray-500 font-mono">
                   view-distance: 8<br/>
                   entity-tracking-range: 48
                </div>
             </div>
             <div className="bg-[#050608] border border-white/10 p-4 rounded-xl">
                <div className="text-white font-bold mb-1">paper.yml</div>
                <div className="text-xs text-gray-500 font-mono">
                   max-auto-save-chunks-per-tick: 24<br/>
                   optimize-explosions: true
                </div>
             </div>
          </div>
        </div>
      )
    },
    survival: {
      title: "Survival Core Documentation",
      category: "Server Setups",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-400">The Survival Core setup is designed for SMP (Survival Multiplayer) communities. It includes a balanced economy, land claiming, and player progression systems.</p>
          
          <h4 className="text-white font-bold mt-8 mb-4">Key Features</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Economy", desc: "Vault-based with ShopGUI+" },
              { title: "Protection", desc: "GriefPrevention + Claims" },
              { title: "Crates", desc: "4 Tiers (Vote, Rare, Epic, Leg)" },
              { title: "Ranks", desc: "5 Donor + 4 Staff Groups" }
            ].map((f, i) => (
              <div key={i} className="p-4 bg-[#050608] border border-white/10 rounded-lg">
                <h5 className={`text-${theme}-400 font-bold mb-1`}>{f.title}</h5>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    skyblock: {
      title: "Skyblock Origin Documentation",
      category: "Server Setups",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-400">Skyblock Origin focuses on a classic yet modern Skyblock experience using IridiumSkyblock or BSkyBlock.</p>
          
          <div className="mt-6">
            <h4 className="text-white font-bold mb-2">Adding Custom Islands</h4>
            <p className="text-gray-500 text-sm mb-4">To add custom schematics, place your <code>.schem</code> files in the directory below and reload the configuration.</p>
            <CodeBlock code="/plugins/IridiumSkyblock/schematics/" />
          </div>
        </div>
      )
    },
    bungee: {
      title: "BungeeCord / Velocity Proxy",
      category: "Server Setups",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-gray-400">Our proxy setup handles the handshake between players and your backend servers (Survival, Skyblock, Hub).</p>
          
          <div className="mt-6">
            <h4 className="text-white font-bold mb-2">Configuring Forwarding</h4>
            <p className="text-gray-500 text-sm mb-4">You must enable IP forwarding to ensure players retain their skins and UUIDs.</p>
            
            <div className="space-y-4">
               <div>
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">velocity.toml</div>
                  <CodeBlock code="player-info-forwarding-mode = 'modern'" language="toml"/>
               </div>
               <div>
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">spigot.yml (Backend Servers)</div>
                  <CodeBlock code="bungeecord: true" language="yaml"/>
               </div>
            </div>
          </div>
        </div>
      )
    },
    errors: {
      title: "Common Errors & Fixes",
      category: "Support",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
           <div className="space-y-4">
              <div className="bg-[#050608] border border-white/10 rounded-xl p-4">
                 <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                    <Bug size={16} /> java.net.BindException: Address already in use
                 </div>
                 <p className="text-sm text-gray-400 mb-2">This means the port you are trying to use (usually 25565) is already occupied by another server.</p>
                 <div className="text-xs bg-white/5 p-2 rounded text-gray-300 font-mono">Fix: Change 'server-port' in server.properties or kill the old process.</div>
              </div>

              <div className="bg-[#050608] border border-white/10 rounded-xl p-4">
                 <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                    <Bug size={16} /> Unsupported Java Version
                 </div>
                 <p className="text-sm text-gray-400 mb-2">Minecraft 1.20+ requires Java 21. You are likely running Java 8 or 17.</p>
                 <div className="text-xs bg-white/5 p-2 rounded text-gray-300 font-mono">Fix: Update your Java runtime environment.</div>
              </div>
           </div>
        </div>
      )
    },
    api: {
      title: "Developer API Reference",
      category: "Support",
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
           <p className="text-gray-400">Automate your server deployments using the SamplesLab CLI or REST API.</p>
           
           <div>
              <h4 className="text-white font-bold mb-2">Authentication</h4>
              <p className="text-sm text-gray-500 mb-4">Include your API key in the header of all requests.</p>
              <CodeBlock code="Authorization: Bearer sl_live_882910..." />
           </div>

           <div>
              <h4 className="text-white font-bold mb-2">Endpoints</h4>
              <div className="bg-[#050608] border border-white/10 rounded-xl overflow-hidden text-sm">
                 <div className="flex border-b border-white/10 p-3">
                    <span className="text-emerald-400 font-bold w-20">GET</span>
                    <span className="text-gray-300 font-mono">/v1/assets</span>
                 </div>
                 <div className="flex border-b border-white/10 p-3">
                    <span className="text-blue-400 font-bold w-20">POST</span>
                    <span className="text-gray-300 font-mono">/v1/deploy/{'{asset_id}'}</span>
                 </div>
                 <div className="flex p-3">
                    <span className="text-red-400 font-bold w-20">DELETE</span>
                    <span className="text-gray-300 font-mono">/v1/licenses/{'{key}'}</span>
                 </div>
              </div>
           </div>
        </div>
      )
    }
  };

  const navItems = [
    { cat: "Getting Started", icon: Command, items: [{id: 'intro', label: 'Introduction'}, {id: 'install', label: 'Installation'}, {id: 'config', label: 'Configuration'}] },
    { cat: "Server Setups", icon: Server, items: [{id: 'survival', label: 'Survival Core'}, {id: 'skyblock', label: 'Skyblock Origin'}, {id: 'bungee', label: 'BungeeCord Proxy'}] },
    { cat: "Support", icon: AlertCircle, items: [{id: 'errors', label: 'Common Errors'}, {id: 'api', label: 'Developer API'}] }
  ];

  // Filtering logic
  const filteredNavItems = navItems.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.label.toLowerCase().includes(filter.toLowerCase()) || 
      section.cat.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 min-h-[80vh]">
       <div className="grid lg:grid-cols-4 gap-8">
         {/* Sidebar */}
         <div className="lg:col-span-1 space-y-8">
           {/* Search Input */}
           <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder="Search docs..." 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className={`w-full bg-[#111418] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-${theme}-500 transition-colors`}
             />
           </div>

           <div className="space-y-6">
             {filteredNavItems.length > 0 ? filteredNavItems.map((section, idx) => (
               <div key={idx}>
                 <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                   {section.cat}
                 </h3>
                 <ul className="space-y-1 text-sm border-l border-white/5 pl-4">
                   {section.items.map(item => (
                     <li 
                      key={item.id}
                      onClick={() => { setActiveDoc(item.id); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                      className={`pl-4 py-1.5 cursor-pointer transition-all border-l ${activeDoc === item.id ? `text-${theme}-400 border-${theme}-500 -ml-[17px] font-medium` : 'text-gray-500 border-transparent -ml-[17px] hover:text-white hover:border-white/20'}`}
                     >
                       {item.label}
                     </li>
                   ))}
                 </ul>
               </div>
             )) : (
                <div className="text-gray-500 text-sm italic">No topics found.</div>
             )}
           </div>
           
           <div className={`p-4 bg-gradient-to-br from-${theme}-500/10 to-transparent border border-${theme}-500/20 rounded-xl mt-8 sticky top-24`}>
             <h4 className="text-white font-bold text-sm mb-2">Need personal help?</h4>
             <p className="text-xs text-gray-400 mb-3">Our support team is available 24/7 on Discord.</p>
             <button 
               onClick={() => openExternal('https://discord.com/invite/placeholder')}
               className={`w-full py-2 bg-${theme}-500 hover:bg-${theme}-400 text-black text-xs font-bold rounded-lg transition-colors`}
             >
               Open Ticket
             </button>
           </div>
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3">
           <div className="bg-[#111418] border border-white/5 rounded-2xl p-8 lg:p-12 min-h-[600px] relative overflow-hidden">
             <div className={`absolute top-0 right-0 w-64 h-64 bg-${theme}-500/5 blur-[100px] rounded-full pointer-events-none`}></div>
             
             {docs[activeDoc] ? (
               <>
                 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${theme}-500/10 text-${theme}-400 text-xs font-bold mb-6`}>
                   <FileCode size={14} /> Documentation v2.4
                 </div>
                 
                 <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{docs[activeDoc].title}</h1>
                 <p className="text-sm text-gray-500 mb-8 font-mono flex items-center gap-2">
                    {docs[activeDoc].category} <ChevronRight size={12}/> {activeDoc}
                 </p>
                 
                 <div className="border-t border-white/5 pt-8">
                    {docs[activeDoc].content}
                 </div>

                 <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-4">
                   <span>Last updated: Feb 2, 2026</span>
                   <div className="flex gap-6">
                     <button onClick={() => openExternal('https://github.com/edit')} className={`hover:text-${theme}-400 cursor-pointer flex items-center gap-2 transition-colors`}><Github size={16} /> Edit on GitHub</button>
                     <button onClick={() => openExternal('https://github.com/issues')} className={`hover:text-${theme}-400 cursor-pointer flex items-center gap-2 transition-colors`}><Bug size={16} /> Report Issue</button>
                   </div>
                 </div>
               </>
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                   <FileCode size={48} className="mb-4 opacity-50"/>
                   <p>Document not found.</p>
                </div>
             )}
           </div>
         </div>
       </div>
    </div>
  );
};

const FeatureMetric = ({ label, value, sub, icon: Icon, theme }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#111418]/50 border border-white/5">
    <div className={`w-12 h-12 rounded-full bg-[#050608] border border-white/10 flex items-center justify-center text-${theme}-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
      <Icon size={24} />
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className={`text-${theme}-400 font-medium text-sm mb-2`}>{label}</div>
    <div className="text-gray-500 text-xs max-w-[200px]">{sub}</div>
    <div className="w-full max-w-[150px] h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
      <div className={`h-full bg-${theme}-500 w-full animate-pulse`}></div>
    </div>
  </div>
);

const FAQItem = ({ q, a, isOpen, onClick, theme }) => (
  <div 
    className={`border rounded-2xl transition-all duration-300 mb-4 overflow-hidden ${
      isOpen 
        ? `bg-[#111418] border-${theme}-500 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]` 
        : 'bg-[#111418]/60 border-white/5 hover:border-white/10 hover:bg-[#111418]'
    }`}
  >
    <button 
      className="w-full py-5 px-6 flex items-center justify-between text-left group outline-none" 
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
         <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isOpen ? `bg-${theme}-500 scale-125` : 'bg-gray-600 group-hover:bg-gray-500'}`}></div>
         <span className={`font-bold text-lg transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
            {q}
         </span>
      </div>
      <div className={`p-2 rounded-lg border transition-all duration-300 ${isOpen ? `border-${theme}-500/30 bg-${theme}-500/10 text-${theme}-400 rotate-180` : 'border-white/5 bg-white/5 text-gray-500 group-hover:border-white/10 group-hover:text-white'}`}>
        <ChevronDown size={18} />
      </div>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 pb-6 pt-0 ml-6">
        <p className={`text-gray-400 text-sm leading-relaxed border-l-2 border-${theme}-500/20 pl-4 py-1`}>
          {a}
        </p>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [theme, setTheme] = useState('emerald'); // emerald, blue, violet, rose

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsPurchaseOpen(true);
  };

  const handleLogin = (username) => {
    setUser(username);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
  };

  return (
    <div className={`min-h-screen bg-[#050608] text-white font-sans selection:bg-${theme}-500/30 flex flex-col`}>
      <TailwindSafelist /> {/* Ensures classes are generated by JIT */}
      <Navbar 
        activePage={activePage} 
        navigate={setActivePage} 
        openLogin={() => setIsLoginOpen(true)}
        isLoggedIn={!!user}
        user={user}
        logout={handleLogout}
        theme={theme}
      />

      <main className="flex-grow">
        {activePage === 'home' && <HomePage navigate={setActivePage} onBuy={handleBuy} theme={theme} />}
        {activePage === 'tools' && <ToolsPage onBuy={handleBuy} theme={theme} />}
        {activePage === 'resources' && <ResourcesPage theme={theme} />}
        {activePage === 'pricing' && <PricingPage theme={theme} />}
        {activePage === 'console' && <ConsolePage theme={theme} setTheme={setTheme} />}
        {activePage === 'dashboard' && <DashboardPage theme={theme} user={user} />}
      </main>

      {/* Extracted Footer Component */}
      <Footer navigate={setActivePage} theme={theme} />

      {/* Global Modals */}
      <PurchaseModal 
        isOpen={isPurchaseOpen} 
        onClose={() => setIsPurchaseOpen(false)} 
        product={selectedProduct} 
        theme={theme}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        theme={theme}
      />
    </div>
  );
}