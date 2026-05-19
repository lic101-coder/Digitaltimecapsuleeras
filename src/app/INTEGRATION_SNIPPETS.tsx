// ============================================================================
// COPY-PASTE INTEGRATION SNIPPETS
// ============================================================================

// -----------------------------------------------------------------------------
// OPTION 1: Add Store Tab to Bottom Navigation
// -----------------------------------------------------------------------------

// 1. Import at top of App.tsx:
import { Store } from './components/Store';
import { Sparkles } from 'lucide-react';

// 2. Add to your nav state:
const [currentView, setCurrentView] = useState<'home' | 'compose' | 'store' | 'profile'>('home');

// 3. Add Store tab to your bottom navigation JSX:
<button
  onClick={() => setCurrentView('store')}
  className={currentView === 'store' ? 'active-tab' : ''}
>
  <Sparkles className="w-6 h-6" />
  <span>Store</span>
</button>

// 4. Add Store render in your content area:
{currentView === 'store' && (
  <Store 
    onClose={() => setCurrentView('home')} 
    userId={user?.id || ''} 
  />
)}

// -----------------------------------------------------------------------------
// OPTION 2: Open Store as Modal/Overlay from Settings
// -----------------------------------------------------------------------------

// 1. Import at top:
import { Store } from './components/Store';

// 2. Add state:
const [showStore, setShowStore] = useState(false);

// 3. Add button in Settings:
<button onClick={() => setShowStore(true)}>
  Theme Store
</button>

// 4. Add render:
{showStore && (
  <Store 
    onClose={() => setShowStore(false)} 
    userId={user?.id || ''} 
  />
)}

// -----------------------------------------------------------------------------
// OPTION 3: Quick Test with Test Harness (Temporary)
// -----------------------------------------------------------------------------

// In App.tsx:
import { StoreTestHarness } from './components/StoreTestHarness';

// Add anywhere in JSX (creates floating test button):
<StoreTestHarness />

// Remove this after testing and use Option 1 or 2 above

// -----------------------------------------------------------------------------
// BOTTOM NAV COMPLETE EXAMPLE
// -----------------------------------------------------------------------------

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'compose' | 'store' | 'profile'>('home');
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'home' && <UnifiedHome />}
        {currentView === 'compose' && <CreateCapsule />}
        {currentView === 'store' && (
          <Store 
            onClose={() => setCurrentView('home')} 
            userId={user?.id || ''} 
          />
        )}
        {currentView === 'profile' && <Settings />}
      </div>

      {/* Bottom Navigation */}
      <nav className="border-t border-slate-700 bg-slate-900 p-2 flex justify-around">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentView === 'home' 
              ? 'text-purple-400 bg-purple-400/10' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => setCurrentView('compose')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentView === 'compose' 
              ? 'text-purple-400 bg-purple-400/10' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <PenLine className="w-6 h-6" />
          <span className="text-xs">Compose</span>
        </button>

        <button
          onClick={() => setCurrentView('store')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentView === 'store' 
              ? 'text-amber-400 bg-amber-400/10' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-6 h-6" />
          <span className="text-xs">Store</span>
          {/* Optional: Add glow effect when active */}
          {currentView === 'store' && (
            <motion.div
              className="absolute -bottom-1 w-8 h-1 bg-amber-400 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentView === 'profile' 
              ? 'text-purple-400 bg-purple-400/10' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SETTINGS LINK EXAMPLE
// -----------------------------------------------------------------------------

// In Settings.tsx, add Store link:
<button
  onClick={() => {
    // Close settings
    onClose?.();
    // Open store (assuming you have a way to trigger it)
    window.dispatchEvent(new CustomEvent('openStore'));
  }}
  className="w-full flex items-center gap-3 p-4 hover:bg-slate-800 rounded-lg transition-colors"
>
  <Sparkles className="w-5 h-5 text-purple-400" />
  <div className="flex-1 text-left">
    <div className="font-medium text-white">Theme Store</div>
    <div className="text-sm text-slate-400">Unlock premium themes</div>
  </div>
  <ChevronRight className="w-5 h-5 text-slate-400" />
</button>

// Then in App.tsx, listen for the event:
useEffect(() => {
  const handleOpenStore = () => setCurrentView('store');
  window.addEventListener('openStore', handleOpenStore);
  return () => window.removeEventListener('openStore', handleOpenStore);
}, []);

// -----------------------------------------------------------------------------
// THEME SELECTOR LINK (Future Integration)
// -----------------------------------------------------------------------------

// In ThemeSelector.tsx, when user taps locked theme:
<button
  onClick={() => {
    // Open Store directly
    onOpenStore?.();
    // OR navigate to store
    setCurrentView?.('store');
  }}
  className="locked-theme-card"
>
  <Lock className="w-5 h-5" />
  <span>{theme.name}</span>
  <span>${theme.price}</span>
</button>

// -----------------------------------------------------------------------------
// REQUIRED IMPORTS FOR ALL OPTIONS
// -----------------------------------------------------------------------------

import { Store } from './components/Store';
import { Sparkles, Home, PenLine, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './contexts/AuthContext';

// ============================================================================
// DONE! Choose one option above and integrate. The Store is ready to go! 🚀
// ============================================================================
