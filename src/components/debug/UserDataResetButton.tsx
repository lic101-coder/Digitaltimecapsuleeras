/**
 * USER DATA RESET UTILITY
 * 
 * ONLY USE THIS FOR TESTING RECREATED ACCOUNTS
 * 
 * This component provides a button to completely wipe all user data
 * (onboarding state, achievements, titles, profile, purchases, etc.)
 * and start fresh - useful when you've deleted and recreated a test account.
 * 
 * To use:
 * 1. Import this component in App.tsx temporarily
 * 2. Add it to the Settings dropdown menu
 * 3. Click "Reset All Data" button
 * 4. Follow the console instructions
 * 5. Remove this component when done testing
 */

import React, { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Props {
  accessToken: string | undefined;
  onClose?: () => void;
}

export function UserDataResetButton({ accessToken, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleReset = async () => {
    if (!accessToken) {
      alert('No access token - please sign in first');
      return;
    }

    const confirmed = window.confirm(
      '⚠️ WARNING: This will DELETE ALL your data:\n\n' +
      '• Onboarding state\n' +
      '• All achievements & titles\n' +
      '• Profile data\n' +
      '• Theme purchases\n' +
      '• Beneficiary slots\n' +
      '• Stats & progress\n\n' +
      'This action CANNOT be undone!\n\n' +
      'Are you absolutely sure?'
    );

    if (!confirmed) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/debug/reset-user-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        console.log('✅ [Data Reset] Success:', data);
        
        // Execute the localStorage cleanup command
        if (data.instructions?.console_command) {
          console.log('🧹 [Data Reset] Executing localStorage cleanup...');
          eval(data.instructions.console_command);
        }
      } else {
        alert(`❌ Reset failed: ${data.error}\n\n${data.details || ''}`);
        console.error('❌ [Data Reset] Failed:', data);
      }
    } catch (error) {
      console.error('💥 [Data Reset] Error:', error);
      alert('Failed to reset data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-red-500 rounded-lg bg-red-950/20">
      <div className="mb-3">
        <h3 className="text-red-400 font-bold text-lg mb-1">
          🧹 Developer: Reset User Data
        </h3>
        <p className="text-red-300/70 text-sm">
          For testing only - deletes ALL user data from both KV store and Postgres
        </p>
      </div>

      <button
        onClick={handleReset}
        disabled={loading || !accessToken}
        className={`
          px-4 py-2 rounded font-semibold text-sm
          ${loading || !accessToken
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-500 text-white cursor-pointer'
          }
        `}
      >
        {loading ? 'Resetting...' : '🗑️ Reset All Data'}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-green-950/30 border border-green-500 rounded text-sm">
          <p className="text-green-400 font-bold mb-2">✅ {result.message}</p>
          <div className="text-green-300/80 space-y-1">
            <p>• Deleted {result.deleted?.kvKeys || 0} KV keys</p>
            <p>• Cleared {result.deleted?.postgresTables?.length || 0} Postgres tables</p>
            <p className="mt-2 font-semibold">Page will reload automatically...</p>
          </div>
        </div>
      )}

      {onClose && (
        <button
          onClick={onClose}
          className="mt-3 text-gray-400 hover:text-white text-sm underline"
        >
          Close
        </button>
      )}
    </div>
  );
}
