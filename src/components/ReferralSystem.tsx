import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Mail, 
  Copy, 
  Check, 
  Send, 
  TrendingUp, 
  Award,
  Sparkles,
  X,
  Loader2
} from 'lucide-react';
import { projectId } from '../utils/supabase/info';

interface ReferralStats {
  referralCode: string | null;
  referralLink: string | null;
  invitesSent: number;
  friendsJoined: number;
  conversionRate: string;
  firstInvite: string | null;
  achievementsUnlocked: number;
  recentInvites: Array<{
    email: string;
    sent_at: string;
    invite_id: string;
  }>;
  milestones: {
    next: number;
    progress: number;
    total: number;
  };
}

interface ReferralSystemProps {
  onClose?: () => void;
  accessToken: string;
}

export function ReferralSystem({ onClose, accessToken }: ReferralSystemProps) {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReferralStats();
  }, []);

  async function loadReferralStats() {
    try {
      setLoading(true);

      // First, generate/get referral link
      const linkResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/generate-link`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!linkResponse.ok) {
        throw new Error('Failed to generate referral link');
      }

      // Then get stats
      const statsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/stats`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!statsResponse.ok) {
        throw new Error('Failed to load referral stats');
      }

      const statsData = await statsResponse.json();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading referral stats:', err);
      setError('Failed to load referral information');
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!stats?.referralLink) return;
    
    try {
      await navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setSending(true);
      setError('');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/send-invite`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation');
      }

      setSendSuccess(true);
      setEmail('');
      setTimeout(() => setSendSuccess(false), 3000);
      
      // Reload stats
      await loadReferralStats();
    } catch (err: any) {
      console.error('Error sending invite:', err);
      setError(err.message || 'Failed to send invitation');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  const progressPercent = stats ? (stats.milestones.progress / stats.milestones.total) * 100 : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Invite & Earn
          </h2>
          <p className="text-slate-400 mt-2">
            Share Eras with friends and unlock exclusive horizon effects
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Send className="w-5 h-5 text-purple-400" />
            <span className="text-slate-400 text-sm">Invites Sent</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats?.invitesSent || 0}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Friends Joined</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats?.friendsJoined || 0}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-slate-400 text-sm">Conversion Rate</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats?.conversionRate || '0'}%</div>
        </motion.div>
      </div>

      {/* Progress to Next Reward */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Next Unlock</h3>
          </div>
          <div className="text-slate-400">
            {stats?.milestones.progress || 0} / {stats?.milestones.next || 1} friends
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>

        <p className="text-sm text-slate-400">
          {stats?.milestones.next === 1 && "Invite 1 friend to unlock Stardust Drift horizon ✨"}
          {stats?.milestones.next === 5 && "Invite 5 friends to unlock Eternal Aurora horizon 🌌"}
          {stats?.milestones.next === 10 && "Invite 10 friends to unlock Supernova Bloom horizon 💥"}
          {stats?.milestones.next === 25 && "Invite 25 friends to unlock Infinity Nexus horizon ♾️"}
        </p>
      </motion.div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Your Unique Invite Link</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={stats?.referralLink || ''}
            readOnly
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm"
          />
          <button
            onClick={copyLink}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 min-w-[120px] justify-center"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Email Invite Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Or Invite by Email</h3>
        <form onSubmit={sendInvite} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="friend@email.com"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            {sending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Invite
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-3"
            >
              {error}
            </motion.p>
          )}
          {sendSuccess && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-green-400 text-sm mt-3 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Invitation sent successfully!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Recent Activity */}
      {stats && stats.recentInvites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {stats.recentInvites.map((invite, index) => (
              <div
                key={invite.invite_id}
                className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Send className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{invite.email}</span>
                </div>
                <span className="text-sm text-slate-500">
                  {new Date(invite.sent_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rewards Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Unlock Exclusive Horizons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl mb-2">✨</div>
            <div className="font-semibold text-white">Stardust Drift</div>
            <div className="text-sm text-slate-400 mt-1">1 friend joined</div>
            <div className="text-xs text-purple-400 mt-2">⭐⭐ Rare</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl mb-2">🌌</div>
            <div className="font-semibold text-white">Eternal Aurora</div>
            <div className="text-sm text-slate-400 mt-1">5 friends joined</div>
            <div className="text-xs text-yellow-400 mt-2">⭐⭐⭐⭐ Legendary</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl mb-2">💥</div>
            <div className="font-semibold text-white">Supernova Bloom</div>
            <div className="text-sm text-slate-400 mt-1">10 friends joined</div>
            <div className="text-xs text-purple-400 mt-2">⭐⭐⭐⭐ Epic</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="text-2xl mb-2">♾️</div>
            <div className="font-semibold text-white">Infinity Nexus</div>
            <div className="text-sm text-slate-400 mt-1">25 friends joined</div>
            <div className="text-xs text-pink-400 mt-2">⭐⭐⭐⭐⭐ Legendary+</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}