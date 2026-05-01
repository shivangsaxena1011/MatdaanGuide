import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, MapPin, Calendar, MessageSquare,
  ChevronRight, Shield, Award, Users, AlertTriangle,
  Menu, X, Search, Vote, Home, BookOpen, Globe
} from 'lucide-react';
import Timeline from './components/Timeline.jsx';
import BoothLocator from './components/BoothLocator.jsx';
import Quiz from './components/Quiz.jsx';

// Language Context & Hook (Simplified for this file)
const translations = {
  en: {
    heroTitle: "Your Vote. Your Voice.",
    heroSubtitle: "The simplest guide to understanding elections, checking eligibility, and making your vote count.",
    getStarted: "Start Guide",
    askAssistant: "Ask AI Assistant",
    navHome: "Home",
    navGuide: "Guide",
    navBooth: "Locate Booth",
    navTimeline: "Timeline",
    navLogin: "Login"
  },
  hi: {
    heroTitle: "आपका वोट। आपकी आवाज़।",
    heroSubtitle: "चुनावों को समझने, पात्रता जांचने और अपने वोट को सार्थक बनाने के लिए सबसे सरल मार्गदर्शिका।",
    getStarted: "गाइड शुरू करें",
    askAssistant: "AI असिस्टेंट से पूछें",
    navHome: "होम",
    navGuide: "मार्गदर्शक",
    navBooth: "बूथ खोजें",
    navTimeline: "समयरेखा",
    navLogin: "लॉग इन"
  }
};

// Components
const Navbar = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  return (
    <nav className="fixed w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Vote className="h-8 w-8 text-brand-500" />
            <span className="font-bold text-xl tracking-tight text-white">MatdaanGuide</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.navHome}</Link>
              <Link to="/guide" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.navGuide}</Link>
              <Link to="/locator" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.navBooth}</Link>
              <Link to="/timeline" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.navTimeline}</Link>

              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Globe className="h-4 w-4" />
                {lang === 'en' ? 'HI' : 'EN'}
              </button>

              <Link to="/login" className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                {t.navLogin}
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-x-0 rounded-none">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.navHome}</Link>
            <Link to="/guide" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.navGuide}</Link>
            <Link to="/locator" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.navBooth}</Link>
            <Link to="/timeline" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.navTimeline}</Link>
            <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t.navLogin}</Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Switch to {lang === 'en' ? 'Hindi' : 'English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const HomePage = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center mt-8 md:mt-0">
      <div className="text-center relative">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 text-brand-400 text-sm font-semibold mb-6 border border-brand-500/20">
            For First-Time Voters & Citizens
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            {t.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto mb-10">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/onboarding" className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-brand-600 rounded-full overflow-hidden transition-all hover:bg-brand-500 hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              {t.getStarted}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/chat" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-gray-300 glass-panel hover:text-white hover:bg-gray-800 transition-all">
              <MessageSquare className="mr-2 h-5 w-5" />
              {t.askAssistant}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Feature grid */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Shield, title: "Check Eligibility", desc: "Instantly know if you can vote and what you need.", link: "/onboarding" },
          { icon: MapPin, title: "Find Polling Booth", desc: "Locate your nearest voting center accurately.", link: "/locator" },
          { icon: BookOpen, title: "Learn the Process", desc: "Step-by-step guidance for voting day.", link: "/guide" },
          { icon: Award, title: "Myths vs Facts", desc: "Test your knowledge about the election process.", link: "/quiz" }
        ].map((feature, idx) => (
          <Link to={feature.link} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="glass-panel p-6 hover:border-brand-500/30 transition-colors group h-full cursor-pointer"
            >
              <feature.icon className="h-10 w-10 text-brand-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ age: '', state: '', citizenship: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    setError('');
    if (step === 1 && (!data.age || isNaN(data.age))) {
      setError('Please enter a valid age.');
      return;
    }
    if (step === 2 && !data.state) {
      setError('Please select your state.');
      return;
    }
    if (step === 3 && !data.citizenship) {
      setError('Please select your citizenship status.');
      return;
    }

    if (step < 3) setStep(step + 1);
    else navigate('/guide', { state: data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full max-w-md p-8 relative overflow-hidden"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
          <motion.div
            className="h-full bg-brand-500"
            initial={{ width: `${((step - 1) / 3) * 100}%` }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white">Let's personalize your guide</h2>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">{error}</div>}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">How old are you?</label>
              <input
                type="number"
                value={data.age}
                onChange={e => setData({ ...data, age: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. 18"
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select your State</label>
              <select
                value={data.state}
                onChange={e => setData({ ...data, state: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select state...</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="delhi">Delhi</option>
                <option value="karnataka">Karnataka</option>
                {/* Add more */}
              </select>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">Are you a citizen of India?</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setData({ ...data, citizenship: 'yes' })}
                  className={`flex-1 py-3 rounded-xl border ${data.citizenship === 'yes' ? 'bg-brand-600/20 border-brand-500 text-brand-400' : 'bg-gray-800/50 border-gray-700 text-gray-400'}`}
                >Yes</button>
                <button
                  onClick={() => setData({ ...data, citizenship: 'no' })}
                  className={`flex-1 py-3 rounded-xl border ${data.citizenship === 'no' ? 'bg-brand-600/20 border-brand-500 text-brand-400' : 'bg-gray-800/50 border-gray-700 text-gray-400'}`}
                >No</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(step > 1 ? step - 1 : 1)}
            className={`px-4 py-2 text-gray-400 hover:text-white ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors"
          >
            {step === 3 ? 'Show My Guide' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const GuideFlow = () => {
  const location = useLocation();
  const userData = location.state || { age: 18, state: '', citizenship: 'yes' };

  const age = parseInt(userData.age, 10) || 18;
  const isCitizen = userData.citizenship !== 'no';

  let steps = [];
  if (!isCitizen) {
    steps = [
      { id: 1, title: "Eligibility Notice", icon: AlertTriangle, content: "Only Indian citizens are eligible to register and vote in Indian elections. Non-citizens cannot participate in the electoral process." },
      { id: 2, title: "Learn More", icon: BookOpen, content: "You can still browse our website to learn about the democratic process." }
    ];
  } else if (age < 17) {
    steps = [
      { id: 1, title: "Not Yet Eligible", icon: CheckCircle, content: `You must be 18 to vote. Since you are ${age}, you are not yet eligible to register.` },
      { id: 2, title: "Advance Application", icon: Calendar, content: "You can apply in advance when you turn 17. Check back then!" },
      { id: 3, title: "Civic Knowledge", icon: BookOpen, content: "In the meantime, explore our quizzes and learn about how elections work in India." }
    ];
  } else if (age === 17) {
    steps = [
      { id: 1, title: "Advance Registration", icon: CheckCircle, content: "Great news! Since you are 17, you can apply in advance using Form 6 on the NVSP portal (https://voters.eci.gov.in). Your name will be added when you turn 18." },
      { id: 2, title: "Prepare Documents", icon: Shield, content: "Keep your Age Proof (Birth Certificate/10th Marksheet) and Address Proof ready for the application." }
    ];
  } else {
    steps = [
      { id: 1, title: "Registration (Form 6)", icon: CheckCircle, content: `You are eligible! Register online using Form 6 on the official Voter's Service Portal (https://voters.eci.gov.in) for ${userData.state || 'your state'}.` },
      { id: 2, title: "Verify & Track Status", icon: Search, content: "Track your application status online. Once approved, verify your name is on the electoral roll." },
      { id: 3, title: "Know Your Booth", icon: MapPin, content: "Your polling booth is assigned based on your address. You can find it using the Electoral Search online." },
      { id: 4, title: "Voting Day", icon: Vote, content: "Carry your EPIC (Voter ID) or an approved alternative ID (like Aadhaar or PAN). Press the button against your chosen candidate, wait for the beep." },
    ];
  }

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Election Journey</h1>
      <p className="text-gray-400 mb-10">Follow these steps to cast your vote successfully.</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Stepper Navigation */}
        <div className="md:w-1/3">
          <div className="glass-panel p-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all mb-1 ${activeStep === step.id ? 'bg-brand-500/10 border border-brand-500/30 text-brand-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'}`}
              >
                <step.icon className={`h-5 w-5 ${activeStep === step.id ? 'text-brand-400' : ''}`} />
                <span className="font-medium text-sm">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-8"
            >
              <div className="h-12 w-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-6">
                {React.createElement(steps[activeStep - 1].icon, { className: "h-6 w-6 text-brand-400" })}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{steps[activeStep - 1].title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{steps[activeStep - 1].content}</p>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h4 className="flex items-center gap-2 font-semibold text-brand-400 mb-2">
                  <AlertTriangle className="h-4 w-4" /> Pro Tip
                </h4>
                <p className="text-sm text-gray-400">Always keep a digital copy of your documents on DigiLocker for easy access.</p>
              </div>

              <div className="mt-8 flex justify-between items-center border-t border-gray-800 pt-6">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={activeStep === steps.length}
                  onClick={() => setActiveStep(prev => prev + 1)}
                  className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your MatdaanGuide AI assistant. How can I help you with your voting queries today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { role: 'user', content: input };
    setMessages([...messages, newMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "To register to vote, you need to fill Form 6. You can do this online on the Voter's Service Portal or offline at your local ERO office. You'll need proof of age and proof of residence."
      }]);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-8 px-4 max-w-3xl mx-auto h-screen flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brand-500 p-2 rounded-lg">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Election Assistant
            <span className="text-xs font-semibold bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full border border-brand-500/30">Demo</span>
          </h1>
          <p className="text-sm text-brand-400">Ask me anything in English or Hindi</p>
        </div>
      </div>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900/80 border-t border-gray-800">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What documents do I need?"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-5 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white rounded-full p-3 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


const Login = () => (
  <div className="pt-32 pb-12 px-4 max-w-md mx-auto min-h-screen">
    <div className="glass-panel p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Login / Register</h2>
      <p className="text-gray-400 mb-8 text-sm">This is a mock login page. In a real application, you would connect this to an authentication service.</p>
      <input type="text" placeholder="Email or Mobile" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white mb-4 outline-none focus:border-brand-500 transition-colors" />
      <button className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors">Send OTP</button>
    </div>
  </div>
);

function App() {
  const [lang, setLang] = useState('en');

  return (
    <Router>
      <div className="min-h-screen selection:bg-brand-500/30">
        <Navbar lang={lang} setLang={setLang} />
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/guide" element={<GuideFlow />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/locator" element={<BoothLocator />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<HomePage lang={lang} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
