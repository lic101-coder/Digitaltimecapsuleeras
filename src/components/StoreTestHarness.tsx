import React, { useState } from 'react';
import { Store } from './Store';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

/**
 * STORE TEST HARNESS
 * 
 * Quick way to test the Store component without integrating into main app.
 * 
 * Usage:
 * 1. Import this component in App.tsx temporarily
 * 2. Render it anywhere: <StoreTestHarness />
 * 3. Click "Open Store" to preview
 * 4. Remove when done testing
 */

export function StoreTestHarness() {
  const [showStore, setShowStore] = useState(false);
  
  // Mock user ID for testing - replace with real user ID
  const mockUserId = 'test-user-123';

  if (showStore) {
    return (
      <Store 
        onClose={() => setShowStore(false)} 
        userId={mockUserId}
      />
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setShowStore(true)}
        className="bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all"
        size="lg"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Open Store (Test)
      </Button>
    </div>
  );
}

/**
 * QUICK TEST INSTRUCTIONS:
 * 
 * In App.tsx, add:
 * 
 * import { StoreTestHarness } from './components/StoreTestHarness';
 * 
 * Then in your JSX:
 * 
 * <StoreTestHarness />
 * 
 * This will add a floating button to open the Store for testing.
 * Once you're happy with it, integrate it properly into your navigation.
 */
