import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unsubscribeType, setUnsubscribeType] = useState<'referral' | 'system' | 'all'>('all'); // Default to all

  // Get email and type from URL parameters
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      const typeParam = urlParams.get('type') as 'referral' | 'system' | null;
      
      if (emailParam) {
        setEmail(emailParam);
      }
      
      // If type is specified in URL, auto-select it
      if (typeParam === 'referral' || typeParam === 'system') {
        setUnsubscribeType(typeParam);
      }
    } catch (err) {
      console.error('Failed to parse URL parameters:', err);
    }
  }, []);

  const handleUnsubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/unsubscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            email,
            type: unsubscribeType, // Send the selected type
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUnsubscribed(true);
      } else {
        setError(data.error || 'Failed to unsubscribe. Please try again.');
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl"
      >
        {!unsubscribed ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4">
                <Mail className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Unsubscribe from Eras Emails
              </h1>
              <p className="text-slate-400 text-sm">
                Choose which emails you'd like to stop receiving.
              </p>
            </div>

            {/* Email input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            {/* Unsubscribe type selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Unsubscribe from:
              </label>
              <div className="space-y-3">
                {/* All emails option */}
                <label className="flex items-start p-4 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                  <input
                    type="radio"
                    name="unsubscribeType"
                    value="all"
                    checked={unsubscribeType === 'all'}
                    onChange={(e) => setUnsubscribeType(e.target.value as any)}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                    disabled={loading}
                  />
                  <div className="ml-3">
                    <div className="text-white font-medium">All Eras emails</div>
                    <div className="text-slate-400 text-sm mt-1">
                      Stop receiving all emails from Eras (referral invites, folder shares, beneficiary notifications, etc.)
                    </div>
                  </div>
                </label>

                {/* Referral only option */}
                <label className="flex items-start p-4 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                  <input
                    type="radio"
                    name="unsubscribeType"
                    value="referral"
                    checked={unsubscribeType === 'referral'}
                    onChange={(e) => setUnsubscribeType(e.target.value as any)}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                    disabled={loading}
                  />
                  <div className="ml-3">
                    <div className="text-white font-medium">Referral invites only</div>
                    <div className="text-slate-400 text-sm mt-1">
                      Only stop referral invitations from friends. You'll still receive other important notifications.
                    </div>
                  </div>
                </label>

                {/* System emails only option */}
                <label className="flex items-start p-4 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
                  <input
                    type="radio"
                    name="unsubscribeType"
                    value="system"
                    checked={unsubscribeType === 'system'}
                    onChange={(e) => setUnsubscribeType(e.target.value as any)}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                    disabled={loading}
                  />
                  <div className="ml-3">
                    <div className="text-white font-medium">System emails only</div>
                    <div className="text-slate-400 text-sm mt-1">
                      Stop receiving folder shares, beneficiary notifications, and account updates. You'll still get referral invites.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Unsubscribe button */}
            <button
              onClick={handleUnsubscribe}
              disabled={loading || !email}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Unsubscribe
                </>
              )}
            </button>

            {/* Footer note */}
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-sm text-slate-500 mb-2">
                Changed your mind?
              </p>
              <a
                href="https://www.erastimecapsule.com"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Visit Eras
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4"
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white mb-3">
                You're Unsubscribed
              </h1>
              
              <p className="text-slate-300 mb-2">
                <span className="text-purple-400 font-medium">{email}</span>
              </p>
              
              <p className="text-slate-400 text-sm mb-6">
                {unsubscribeType === 'all' && 'will no longer receive any emails from Eras.'}
                {unsubscribeType === 'referral' && 'will no longer receive referral invitations from Eras users.'}
                {unsubscribeType === 'system' && 'will no longer receive system emails (folder shares, beneficiary notifications, etc.).'}
              </p>

              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 mb-6">
                <p className="text-xs text-slate-500">
                  {unsubscribeType === 'all' 
                    ? 'You have unsubscribed from all Eras emails. If you have an account, you can manage your email preferences in settings.'
                    : unsubscribeType === 'referral'
                    ? 'This only affects referral invitations from other users. You\'ll still receive notifications about your own capsules and account.'
                    : 'This only affects system emails like folder shares and beneficiary notifications. You\'ll still receive referral invitations and capsule delivery notifications.'}
                </p>
              </div>

              <a
                href="https://www.erastimecapsule.com"
                className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all"
              >
                Go to Eras
              </a>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
