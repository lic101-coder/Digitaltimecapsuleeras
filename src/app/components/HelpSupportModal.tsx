import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ChevronDown, ChevronRight, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  userId?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I create a time capsule?",
    answer: "Tap the 'Compose' button in the main navigation (✨ icon). Select a theme, add your message and media, choose recipients, and set a delivery date. You can save as draft or schedule immediately."
  },
  {
    question: "Where can I see my capsules?",
    answer: "Go to the 'Home' tab (🏡 icon). You'll see delivered capsules, upcoming scheduled capsules, and drafts. Switch between Timeline, Classic (grid), or Calendar views using the controls at the top."
  },
  {
    question: "Can I edit a capsule after creating it?",
    answer: "You can edit drafts and scheduled capsules before they're delivered. Find the capsule in your Home tab, open it, and use the edit option. Once delivered, capsules become permanent memories and cannot be edited."
  },
  {
    question: "What's the difference between the Vault and Home tabs?",
    answer: "Home shows your time capsules (scheduled, delivered, and drafts). The Vault (🏛️ icon) is your personal media library where you organize photos, videos, and audio to use when creating capsules. Think of Vault as your storage, Home as your capsule timeline."
  },
  {
    question: "How do I add media to a capsule?",
    answer: "When composing a capsule, you can upload media directly, record new content using the 'Record' tab (📹 icon), or import existing media from your Vault. Each capsule supports photos, videos, audio recordings, and text."
  },
  {
    question: "What are themes and where can I get more?",
    answer: "Themes add visual effects, animations, and ceremony experiences to your capsules. You start with 3 free themes (Classic, Eternal Bloom, Cosmic Voyage). Visit the Store in the ⚙️ Settings menu to purchase additional themed packs with unique VFX-quality effects."
  },
  {
    question: "What is Legacy Access and how does it work?",
    answer: "Legacy Access lets you designate beneficiaries who will receive access to your vault and capsules if your account becomes inactive for an extended period. Set it up in Settings → Legacy Access. Beneficiaries must verify their email to be confirmed. You can purchase additional beneficiary slots in the Store."
  },
  {
    question: "How do achievements and titles work?",
    answer: "Eras has 57+ achievements you can unlock by creating capsules, using features, and reaching milestones. Each achievement awards points and some grant special titles you can display. View your progress in Settings → Achievements & Titles."
  },
  {
    question: "I'm having trouble uploading media. What should I check?",
    answer: "Common solutions: 1) Ensure files are under the size limit (varies by file type), 2) Check your internet connection stability, 3) Try a different browser if issues persist, 4) Clear browser cache and cookies. If problems continue, contact support with details about file type and size."
  },
  {
    question: "How do I delete a capsule?",
    answer: "Open the capsule from your Home tab, then look for the delete option in the capsule details menu (usually three dots or similar). Deletion is permanent - the capsule and all its contents will be removed. Consider archiving instead if you want to hide it temporarily."
  },
  {
    question: "What happens when a capsule is delivered?",
    answer: "At the scheduled time, recipients receive notifications and can view the capsule with its chosen theme and ceremony effects. You'll also receive a notification confirming delivery. Delivered capsules appear in your Home tab's timeline and can be viewed anytime but cannot be edited."
  },
  {
    question: "Can I schedule capsules far into the future?",
    answer: "Yes! Eras is designed for long-term time capsules. You can schedule delivery months or even years ahead. Your capsules are securely stored and will be delivered at the exact date and time you specify."
  }
];

export function HelpSupportModal({ isOpen, onClose, userEmail, userName, userId }: HelpSupportModalProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill out both subject and message');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/support-request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            subject: subject.trim(),
            message: message.trim(),
            userName: userName || 'Not provided',
            userEmail: userEmail || 'Not provided',
            userId: userId || 'Not available'
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send support request');
      }

      // Show success state
      setSubmitSuccess(true);
      toast.success('Support request sent successfully!');
      
      // Wait 2 seconds, then close modal and reset
      setTimeout(() => {
        setSubject('');
        setMessage('');
        setShowContactForm(false);
        setSubmitSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('❌ Failed to submit support request:', error);
      toast.error('Failed to send support request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !submitSuccess) {
      setShowContactForm(false);
      setSubject('');
      setMessage('');
      setExpandedFAQ(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {submitSuccess ? '✅ Request Sent!' : 'Help & Support'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {submitSuccess 
              ? 'Your support request has been submitted successfully.' 
              : 'Find answers to common questions or contact our support team.'}
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          // Success state
          <div className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Thanks for your feedback!
            </h3>
            <p className="text-slate-400">
              We'll get right back to you as soon as possible.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Message Section */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-300 mb-1">All Systems Operational</h3>
                  <p className="text-sm text-green-200/80">
                    Eras is running smoothly. If you're experiencing issues, check the FAQs below or contact support.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            {!showContactForm && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Answers</h3>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-750 transition-colors"
                      >
                        <span className="font-medium text-slate-200">{faq.question}</span>
                        {expandedFAQ === index ? (
                          <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-4 pb-4 pt-2 bg-slate-800/50 border-t border-slate-700">
                          <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Form or Button */}
            {showContactForm ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Contact Support</h3>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    ← Back to FAQs
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isSubmitting}
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your issue or question in detail..."
                      rows={6}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      disabled={isSubmitting}
                      maxLength={2000}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {message.length}/2000 characters
                    </p>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">Your info:</strong> {userName || 'Anonymous'} ({userEmail || 'No email'})
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !subject.trim() || !message.trim()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Support Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-slate-500">
                    We typically respond within 24 hours
                  </p>
                </form>
              </div>
            ) : (
              <div className="pt-2">
                <Button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-lg transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}