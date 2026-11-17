import { useState, useRef, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

const QUICK_TICKERS = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'GOOGL', 'AMZN'];

function Navbar({ userEmail, onLogout, activeTab, setActiveTab, onSelectTicker }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center shadow-lg border border-white/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                StockonGo
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 font-semibold tracking-wider">
                AI TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Llama 3.3 70B &bull; Live Market Link</span>
            </div>
          </div>
        </div>

        {/* Quick Ticker Shortcuts */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0e0e0e] border border-white/[0.08] rounded-xl p-1">
          <span className="text-xs font-semibold text-zinc-400 px-2 uppercase tracking-wider">Fast Pick:</span>
          {QUICK_TICKERS.map(t => (
            <button
              key={t}
              onClick={() => onSelectTicker(t)}
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/[0.06] hover:border-white/20 transition-all duration-200"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#0e0e0e] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Research
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Reports
          </button>
        </nav>

        {/* User Status & Logout */}
        <div className="flex items-center gap-3">
          {userEmail && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
              <div className="w-6 h-6 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-800 flex items-center justify-center font-bold text-[10px] text-white">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <span className="font-mono text-[11px] truncate max-w-[130px]">{userEmail}</span>
            </div>
          )}
          <button
            onClick={onLogout}
            title="Log out of terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.email || email);
        onLogin(data.token, data.email || email);
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (err) {
      alert(`Could not connect to server at ${API_URL}. Please ensure the server is running on port 3000.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.06),rgba(5,5,5,0))] text-white px-4">
      <div className="w-full max-w-md p-8 glass-panel border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle top white ambient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center shadow-lg border border-white/20">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            StockonGo Terminal
          </h1>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">
            Autonomous Financial Equity Research Graph
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <input 
              type="email" 
              placeholder="analyst@firm.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-[#0e0e0e] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 p-3 rounded-xl text-white outline-none transition-all placeholder:text-zinc-600 text-sm" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-[#0e0e0e] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 p-3 rounded-xl text-white outline-none transition-all placeholder:text-zinc-600 text-sm" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="premium-btn-primary mt-2 py-3 text-sm font-bold tracking-wide uppercase shadow-lg shadow-white/5"
          >
            {isRegister ? 'Create Analyst Account' : 'Authenticate & Enter'}
          </button>
          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-xs text-zinc-400 hover:text-white transition-colors mt-2 text-center"
          >
            {isRegister ? 'Already have credentials? Sign In' : 'Need terminal access? Register here'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Controls({ ticker, setTicker, question, setQuestion, onRun, isStreaming }) {
  const PRESET_QUERIES = [
    { label: "Core Fundamentals", q: `Analyse ${ticker}: give me its ROE, free cash flow, and 1-year price range.` },
    { label: "Valuation & DCF", q: `Evaluate ${ticker}: compute DCF fair value using current operating cash flows.` },
    { label: "Price Momentum", q: `Review ${ticker}: what is the 52-week high, low, and recent period return?` }
  ];

  return (
    <div className="glass-panel p-6 mb-8 w-full border border-white/[0.08] relative overflow-hidden">
      {/* Top subtle white gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-3">
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Research Parameters
          </h2>
          <p className="text-xs text-zinc-400">Configure target equity symbol and research instructions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-zinc-300">GRAPH READY</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
            Equity Ticker Symbol
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-mono font-bold text-sm">$</span>
            <input 
              type="text" 
              value={ticker} 
              onChange={e => setTicker(e.target.value.toUpperCase())}
              placeholder="AAPL, MSFT, NVDA..."
              className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white font-mono font-bold text-base focus:border-white/30 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all placeholder:text-zinc-600"
              disabled={isStreaming}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
              Analyst Research Question
            </label>
            <div className="flex gap-1.5">
              {PRESET_QUERIES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuestion(p.q)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.06] transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <textarea 
            value={question} 
            onChange={e => setQuestion(e.target.value)}
            placeholder="Analyse AAPL: give me its ROE, free cash flow, and 1-year price range."
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-white/30 focus:ring-1 focus:ring-white/20 focus:outline-none transition-all min-h-[90px] placeholder:text-zinc-600"
            disabled={isStreaming}
          />
        </div>

        <button 
          onClick={onRun} 
          disabled={isStreaming || !ticker || !question}
          className="premium-btn-primary w-full mt-2 py-3 flex justify-center items-center gap-2.5 text-sm font-bold tracking-wide uppercase"
        >
          {isStreaming ? (
            <>
              <svg className="animate-spin w-4 h-4 text-black" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Agents Executing Research Graph...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Dispatch Research Agents</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function EventLog({ events }) {
  if (events.length === 0) return null;
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  return (
    <div className="glass-panel p-6 mb-8 w-full border border-white/[0.08]">
      <div className="flex items-center justify-between mb-4 border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></div>
          <h3 className="text-sm font-mono font-bold tracking-wider text-zinc-200 uppercase">
            Live Agent Execution Trace
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">{events.length} events logged</span>
      </div>
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2 font-mono text-xs">
        {events.map((ev, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#0e0e0e] border border-white/[0.06]">
            <span className="text-zinc-400 font-bold mt-0.5">&gt;</span>
            <div className="flex-1 flex items-center justify-between">
              <span className="font-bold text-white uppercase tracking-wide">{ev.node}</span>
              <span className="text-zinc-400 ml-2 text-[11px]">{ev.summary || 'Executing'}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function MemoView({ draft, isFinal, onResume, isStreaming }) {
  if (!draft) return null;
  let parsed = draft;
  if (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { parsed = { thesis: parsed }; }
  }

  return (
    <div className="glass-panel p-8 w-full mb-12 relative overflow-hidden border border-white/10 shadow-2xl">
      {/* Top Banner for approval status */}
      {!isFinal ? (
        <div className="absolute top-0 left-0 w-full bg-white/[0.05] border-b border-white/10 text-zinc-300 text-center py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          Draft Pending Analyst Approval &bull; Critic Verified Numbers
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full bg-emerald-950/40 border-b border-emerald-500/30 text-emerald-300 text-center py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Final Approved Investment Memo &bull; Compliance Signed Off
        </div>
      )}

      <div className={!isFinal ? 'mt-8' : 'mt-2'}>
        <div className="text-center mb-8 pb-6 border-b border-white/[0.08]">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Investment Research Memo
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
            Deterministic DCF &bull; Multi-Agent Consensus &bull; Zero Hallucination Audit
          </p>
        </div>
        
        <div className="space-y-6 text-zinc-300">
          {/* Thesis Card */}
          <section className="p-5 rounded-xl bg-[#0e0e0e] border border-white/10 shadow-md">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Core Investment Thesis</span>
            </div>
            <p className="leading-relaxed text-zinc-100 font-medium text-base">{parsed.thesis}</p>
          </section>

          {/* Strengths & Risks */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="p-5 rounded-xl bg-[#0e0e0e] border border-white/[0.08] shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Fundamental Strengths</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                {(parsed.strengths || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-5 rounded-xl bg-[#0e0e0e] border border-white/[0.08] shadow-md">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Key Investment Risks</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                {(parsed.risks || []).map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-zinc-500 font-bold">&bull;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Valuation Summary Card */}
          <section className="p-5 rounded-xl bg-[#0e0e0e] border border-white/10 shadow-md">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="6" x2="12" y2="12"></line>
                <line x1="12" y1="12" x2="16" y2="14"></line>
              </svg>
              <span>Valuation & DCF Overview</span>
            </div>
            <p className="leading-relaxed text-zinc-200 text-sm">{parsed.valuation_summary}</p>
          </section>

          {/* Numbers Used Audited */}
          {parsed.numbers_used && parsed.numbers_used.length > 0 && (
            <div className="p-4 rounded-xl bg-[#0e0e0e] border border-white/[0.08]">
              <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Critic Audited Figures ({parsed.numbers_used.length} Verified Claims)
              </div>
              <div className="flex flex-wrap gap-2">
                {parsed.numbers_used.map((n, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-200 border border-white/10">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isFinal && (
          <div className="mt-10 flex flex-wrap gap-4 justify-center border-t border-white/[0.08] pt-6">
            <button 
              onClick={() => onResume('approve')} 
              disabled={isStreaming}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Approve Memo
            </button>
            <button 
              onClick={() => onResume('reject')} 
              disabled={isStreaming}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 2v6h6"></path>
                <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                <path d="M21 22v-6h-6"></path>
                <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
              </svg>
              Request Changes
            </button>
          </div>
        )}

        <footer className="mt-8 pt-4 border-t border-white/[0.08] text-center text-[11px] font-mono text-zinc-500">
          STOCKONGO COMPLIANCE GUARANTEE &bull; NOT DIRECT FINANCIAL ADVICE &bull; {new Date().toLocaleString()}
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token');
    return (saved && saved !== 'undefined' && saved !== 'null') ? saved : null;
  });
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');

  const [activeTab, setActiveTab] = useState('research');
  const [ticker, setTicker] = useState('AAPL');
  const [question, setQuestion] = useState('Analyse AAPL: give me its ROE, free cash flow, and 1-year price range.');
  
  const [activeReportId, setActiveReportId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [events, setEvents] = useState([]);
  const [draft, setDraft] = useState(null);
  const [isFinal, setIsFinal] = useState(false);
  const [history, setHistory] = useState([]);
  const memoRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  useEffect(() => {
    if (draft && memoRef.current) {
      memoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [draft]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUserEmail('');
    setHistory([]);
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/reports`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!res.ok) {
        if (res.status === 401) {
          logout();
        }
        return;
      }
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setHistory([]);
    }
  };

  if (!token) {
    return <LoginScreen onLogin={(newToken, email) => { setToken(newToken); setUserEmail(email); }} />;
  }

  const readStream = async (response, reportId) => {
    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';

      for (const part of parts) {
        if (part.startsWith('data: ')) {
          try {
            const data = JSON.parse(part.slice(6));
            
            if (data.type === 'node') {
              setEvents(prev => [...prev, data]);
            } else if (data.type === 'interrupt') {
              let parsedDraft = data.draft;
              if (typeof parsedDraft === 'string') {
                try { parsedDraft = JSON.parse(parsedDraft); } catch(e) {}
              }
              setDraft(parsedDraft);
              setIsStreaming(false);
              fetchHistory();
              return;
            } else if (data.type === 'final') {
              let parsedMemo = data.memo;
              if (typeof parsedMemo === 'string') {
                try { parsedMemo = JSON.parse(parsedMemo); } catch(e) {}
              }
              setDraft(parsedMemo);
              setIsFinal(true);
              setIsStreaming(false);
              fetchHistory();
              return;
            } else if (data.type === 'error') {
              setEvents(prev => [...prev, { node: 'Error', summary: data.message }]);
              setIsStreaming(false);
              fetchHistory();
              return;
            }
          } catch (err) {
            console.error('JSON Parse error', err, part);
          }
        }
      }
    }
    setIsStreaming(false);
    fetchHistory();
  };

  const startResearch = async () => {
    setIsStreaming(true);
    setEvents([]);
    setDraft(null);
    setIsFinal(false);
    setActiveReportId(null);
    
    try {
      const res = await fetch(`${API_URL}/research`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ ticker, question })
      });
      await readStream(res, null);
    } catch (err) {
      console.error(err);
      setIsStreaming(false);
    }
  };

  const handleResume = async (decision) => {
    if (!activeReportId) {
      alert("Please select a report from the history to resume.");
      return;
    }
    setIsStreaming(true);
    setDraft(null); 
    setEvents(prev => [...prev, { node: 'human_approval', summary: `Decision: ${decision}` }]);

    try {
      const res = await fetch(`${API_URL}/research/${activeReportId}/approve`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ decision })
      });
      await readStream(res, activeReportId);
    } catch (err) {
      console.error(err);
      setIsStreaming(false);
    }
  };

  const loadReport = (rep) => {
    setActiveReportId(rep._id);
    setTicker(rep.ticker);
    setQuestion(rep.question);
    
    if (rep.status === 'complete') {
      setIsFinal(true);
      setDraft(rep.memo);
      setEvents([{ node: 'System', summary: 'Loaded completed report from history' }]);
    } else if (rep.status === 'awaiting_approval') {
      setIsFinal(false);
      setDraft(rep.memo);
      setEvents([{ node: 'System', summary: 'Loaded draft awaiting approval from history' }]);
    } else {
      setIsFinal(false);
      setDraft(null);
      setEvents([{ node: 'System', summary: `Report status is ${rep.status}` }]);
    }
  };

  const handleSelectQuickTicker = (sym) => {
    setTicker(sym);
    setQuestion(`Analyse ${sym}: give me its ROE, free cash flow, and 1-year price range.`);
    setActiveTab('research');
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.06),rgba(5,5,5,0))] text-zinc-100 flex flex-col font-sans">
      {/* Top Navigation Header */}
      <Navbar 
        userEmail={userEmail} 
        onLogout={logout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSelectTicker={handleSelectQuickTicker} 
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar History Column */}
        <aside className="w-80 bg-[#080808]/90 border-r border-white/[0.08] p-4 flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <h3 className="font-bold text-sm tracking-wider uppercase text-zinc-300">Report Archive</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/10">
              {history.length} Saved
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1.5">
            {(Array.isArray(history) ? history : []).map(rep => {
              const isSelected = activeReportId === rep._id;
              return (
                <div 
                  key={rep._id} 
                  onClick={() => loadReport(rep)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all duration-200 ${
                    isSelected 
                      ? 'bg-white/[0.08] border-white/30 text-white shadow-lg' 
                      : 'bg-[#0d0d0d] border-white/[0.06] hover:bg-[#141414] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-white tracking-wide">${rep.ticker}</span>
                    <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md border ${
                      rep.status === 'complete' 
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20' 
                        : rep.status === 'awaiting_approval' 
                        ? 'bg-amber-950/40 text-amber-300 border-amber-500/20' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-700/40'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-1.5 flex items-center justify-between">
                    <span>{new Date(rep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>{new Date(rep.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              );
            })}
            {(!Array.isArray(history) || history.length === 0) && (
              <div className="text-center py-12 text-zinc-600 text-xs font-mono">
                No archived reports found.
                <div className="mt-2 text-zinc-500">Run a research query to save memos here.</div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Research Content Column */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto">
            <Controls 
              ticker={ticker} setTicker={setTicker}
              question={question} setQuestion={setQuestion}
              onRun={startResearch} isStreaming={isStreaming}
            />
            
            <EventLog events={events} />
            
            <div ref={memoRef}>
              <MemoView draft={draft} isFinal={isFinal} onResume={handleResume} isStreaming={isStreaming} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
