/**
 * Beneficiary Management - Theme Store Context
 * 
 * Manages legacy beneficiary access to purchased premium themes.
 * When the primary account holder passes away, designated beneficiaries
 * receive unlock codes to access the themes in their own Eras accounts.
 * 
 * Key Features:
 * - Add/Edit/Remove beneficiaries
 * - Emotional, respectful messaging
 * - Clear visual hierarchy
 * - Cinema-quality animations
 * - Mobile-first design
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  Heart,
  Mail, 
  UserPlus, 
  CheckCircle, 
  AlertCircle, 
  Send,
  Trash2,
  Info,
  Lock,
  Sparkles,
  Edit3,
  Loader2,
  ArrowLeft,
  Clock,
  Key,
  Users,
  Gift,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  relationship?: string;
  personalMessage?: string;
  status: 'pending' | 'verified' | 'rejected' | 'revoked';
  verifiedAt?: number;
  addedAt: number;
}

interface BeneficiaryManagementProps {
  onBack?: () => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function BeneficiaryManagement({ onBack }: BeneficiaryManagementProps) {
  const { session } = useAuth();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    relationship: '',
    personalMessage: ''
  });

  // Load beneficiaries on mount
  useEffect(() => {
    if (session?.access_token) {
      loadBeneficiaries();
    }
  }, [session]);

  const loadBeneficiaries = async () => {
    if (!session?.access_token) {
      console.error('🎁 [Beneficiary] No access token available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('🎁 [Beneficiary] Loading beneficiaries...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/theme-beneficiaries`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('🎁 [Beneficiary] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎁 [Beneficiary] Error response:', errorText);
        throw new Error(`Failed to load beneficiaries: ${response.status}`);
      }

      const data = await response.json();
      console.log('🎁 [Beneficiary] Beneficiaries loaded:', data);
      setBeneficiaries(data.beneficiaries || []);
    } catch (error: any) {
      console.error('🎁 [Beneficiary] Error loading beneficiaries:', error);
      toast.error('Failed to load beneficiaries');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!session?.access_token) {
      toast.error('Authentication required');
      return;
    }

    try {
      console.log('🎁 [Beneficiary] Adding beneficiary:', formData);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/theme-beneficiaries/add`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            relationship: formData.relationship,
            personalMessage: formData.personalMessage
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎁 [Beneficiary] Error response:', errorText);
        throw new Error(`Failed to add beneficiary: ${response.status}`);
      }

      const data = await response.json();
      console.log('🎁 [Beneficiary] Beneficiary added:', data);
      
      toast.success(`${formData.name} has been added as a beneficiary`, {
        description: 'They will receive a verification email shortly.'
      });
      
      // Reset form and reload
      setFormData({ name: '', email: '', relationship: '', personalMessage: '' });
      setShowAddForm(false);
      loadBeneficiaries();
    } catch (error: any) {
      console.error('🎁 [Beneficiary] Error adding beneficiary:', error);
      toast.error('Failed to add beneficiary');
    }
  };

  const handleUpdateBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBeneficiary || !formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!session?.access_token) {
      toast.error('Authentication required');
      return;
    }

    try {
      console.log('🎁 [Beneficiary] Updating beneficiary:', editingBeneficiary.id);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/theme-beneficiaries/${editingBeneficiary.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            relationship: formData.relationship,
            personalMessage: formData.personalMessage
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎁 [Beneficiary] Error response:', errorText);
        throw new Error(`Failed to update beneficiary: ${response.status}`);
      }

      const data = await response.json();
      console.log('🎁 [Beneficiary] Beneficiary updated:', data);
      
      toast.success(`${formData.name}'s information has been updated`);
      
      // Reset form and reload
      setFormData({ name: '', email: '', relationship: '', personalMessage: '' });
      setEditingBeneficiary(null);
      setShowAddForm(false);
      loadBeneficiaries();
    } catch (error: any) {
      console.error('🎁 [Beneficiary] Error updating beneficiary:', error);
      toast.error('Failed to update beneficiary');
    }
  };

  const handleRemoveBeneficiary = async (beneficiary: Beneficiary) => {
    if (!confirm(`Are you sure you want to remove ${beneficiary.name} as a beneficiary?`)) {
      return;
    }

    if (!session?.access_token) {
      toast.error('Authentication required');
      return;
    }

    try {
      console.log('🎁 [Beneficiary] Removing beneficiary:', beneficiary.id);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/theme-beneficiaries/${beneficiary.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎁 [Beneficiary] Error response:', errorText);
        throw new Error(`Failed to remove beneficiary: ${response.status}`);
      }

      console.log('🎁 [Beneficiary] Beneficiary removed');
      
      toast.success(`${beneficiary.name} has been removed`);
      loadBeneficiaries();
    } catch (error: any) {
      console.error('🎁 [Beneficiary] Error removing beneficiary:', error);
      toast.error('Failed to remove beneficiary');
    }
  };

  const handleEditBeneficiary = (beneficiary: Beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setFormData({
      name: beneficiary.name,
      email: beneficiary.email,
      relationship: beneficiary.relationship || '',
      personalMessage: beneficiary.personalMessage || ''
    });
    setShowAddForm(true);
  };

  const handleResendVerification = async (beneficiary: Beneficiary) => {
    if (!session?.access_token) {
      toast.error('Authentication required');
      return;
    }

    try {
      console.log('🎁 [Beneficiary] Resending verification:', beneficiary.id);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/theme-beneficiaries/${beneficiary.id}/resend-verification`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎁 [Beneficiary] Error response:', errorText);
        throw new Error(`Failed to resend verification: ${response.status}`);
      }

      toast.success('Verification email sent', {
        description: `A new verification email has been sent to ${beneficiary.email}`
      });
    } catch (error: any) {
      console.error('🎁 [Beneficiary] Error resending verification:', error);
      toast.error('Failed to resend verification email');
    }
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingBeneficiary(null);
    setFormData({ name: '', email: '', relationship: '', personalMessage: '' });
  };

  // ============================================================================
  // RENDER: LOADING STATE
  // ============================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-96 bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Card Skeleton */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: ADD/EDIT FORM
  // ============================================================================

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={handleCancelForm}
              className="mb-4 text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-white mb-2">
              {editingBeneficiary ? 'Edit Beneficiary' : 'Add Beneficiary'}
            </h1>
            <p className="text-white/60">
              {editingBeneficiary 
                ? 'Update beneficiary information'
                : 'Add someone who will inherit access to your purchased themes'}
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  Beneficiary Information
                </CardTitle>
                <CardDescription className="text-white/60">
                  They will receive unlock codes for your themes after you pass away
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingBeneficiary ? handleUpdateBeneficiary : handleAddBeneficiary} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      required
                    />
                    <p className="text-xs text-white/40">
                      They'll receive a verification email to confirm access
                    </p>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-white text-sm font-medium">
                      Relationship (Optional)
                    </Label>
                    <Input
                      id="relationship"
                      type="text"
                      placeholder="Daughter, Best Friend, etc."
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  {/* Personal Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white text-sm font-medium">
                      Personal Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="A message they'll receive with the unlock codes..."
                      value={formData.personalMessage}
                      onChange={(e) => setFormData({ ...formData, personalMessage: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[100px] resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-white/40">
                      {formData.personalMessage.length}/500 characters
                    </p>
                  </div>

                  {/* Info Alert */}
                  <Alert className="bg-blue-500/10 border-blue-400/30">
                    <Info className="w-4 h-4 text-blue-400" />
                    <AlertDescription className="text-blue-200 text-sm">
                      Beneficiaries only receive access to themes you've purchased. 
                      Free themes and capsules are not included in the inheritance.
                    </AlertDescription>
                  </Alert>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelForm}
                      className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      {editingBeneficiary ? 'Save Changes' : 'Add Beneficiary'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: MAIN LIST VIEW
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
          )}
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-400" />
            Beneficiary Management
          </h1>
          <p className="text-white/60">
            Designate who will inherit access to your purchased premium themes
          </p>
        </motion.div>

        {/* Hero Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-white/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Your Digital Legacy
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    When you pass away, your designated beneficiaries will receive unlock codes 
                    to access all premium themes you've purchased. They can use these themes 
                    in their own Eras accounts to honor your memory and continue your legacy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                      <Key className="w-3 h-3 mr-1" />
                      Secure unlock codes
                    </Badge>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                      <Shield className="w-3 h-3 mr-1" />
                      Email verification
                    </Badge>
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                      <Lock className="w-3 h-3 mr-1" />
                      Encrypted storage
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Beneficiaries List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Your Beneficiaries
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {beneficiaries.length === 0 
                      ? 'No beneficiaries added yet'
                      : `${beneficiaries.length} ${beneficiaries.length === 1 ? 'person' : 'people'} will inherit your themes`}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Beneficiary
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {beneficiaries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
                    <Users className="w-8 h-8 text-white/40" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No beneficiaries yet
                  </h3>
                  <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                    Add someone you trust to inherit access to your premium themes. 
                    They'll receive unlock codes after you pass away.
                  </p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Your First Beneficiary
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {beneficiaries.map((beneficiary, index) => (
                      <motion.div
                        key={beneficiary.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/[0.07] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {beneficiary.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-white font-medium truncate">
                                  {beneficiary.name}
                                </h4>
                                {beneficiary.status === 'verified' && (
                                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                                {beneficiary.status === 'pending' && (
                                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-white/60 mb-1">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{beneficiary.email}</span>
                              </div>
                              {beneficiary.relationship && (
                                <div className="text-xs text-white/40">
                                  {beneficiary.relationship}
                                </div>
                              )}
                              {beneficiary.personalMessage && (
                                <div className="mt-2 p-2 bg-white/5 rounded-lg border border-white/10">
                                  <p className="text-xs text-white/60 italic line-clamp-2">
                                    "{beneficiary.personalMessage}"
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {beneficiary.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleResendVerification(beneficiary)}
                                className="text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditBeneficiary(beneficiary)}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveBeneficiary(beneficiary)}
                              className="text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* FAQ 1 */}
              <Collapsible
                open={expandedFaq === 'how-it-works'}
                onOpenChange={() => setExpandedFaq(expandedFaq === 'how-it-works' ? null : 'how-it-works')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-colors">
                    <span className="text-white font-medium text-left">How does theme inheritance work?</span>
                    {expandedFaq === 'how-it-works' ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    When you pass away, Eras will automatically generate unique unlock codes for each premium theme 
                    you've purchased. Your designated beneficiaries will receive these codes via email, allowing them 
                    to unlock and use these themes in their own Eras accounts at no cost.
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 2 */}
              <Collapsible
                open={expandedFaq === 'what-transfers'}
                onOpenChange={() => setExpandedFaq(expandedFaq === 'what-transfers' ? null : 'what-transfers')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-colors">
                    <span className="text-white font-medium text-left">What exactly gets transferred?</span>
                    {expandedFaq === 'what-transfers' ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    Only premium themes you've purchased are transferred. Your beneficiaries will receive unlock codes 
                    for these themes, including all ceremonies and horizon variations. Your actual capsules, photos, 
                    and personal content are managed separately through Legacy Vault (found in Settings).
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 3 */}
              <Collapsible
                open={expandedFaq === 'verification'}
                onOpenChange={() => setExpandedFaq(expandedFaq === 'verification' ? null : 'verification')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-colors">
                    <span className="text-white font-medium text-left">Why do beneficiaries need to verify?</span>
                    {expandedFaq === 'verification' ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    Email verification ensures that beneficiaries have access to their email account and can receive 
                    the unlock codes when the time comes. It also prevents typos and ensures your themes go to the 
                    right people.
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 4 */}
              <Collapsible
                open={expandedFaq === 'change-mind'}
                onOpenChange={() => setExpandedFaq(expandedFaq === 'change-mind' ? null : 'change-mind')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-colors">
                    <span className="text-white font-medium text-left">Can I change beneficiaries later?</span>
                    {expandedFaq === 'change-mind' ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    Yes, you can add, edit, or remove beneficiaries at any time. Changes take effect immediately. 
                    If you remove a beneficiary, they will no longer receive unlock codes, even if they were 
                    previously verified.
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* FAQ 5 */}
              <Collapsible
                open={expandedFaq === 'multiple'}
                onOpenChange={() => setExpandedFaq(expandedFaq === 'multiple' ? null : 'multiple')}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-colors">
                    <span className="text-white font-medium text-left">Can I add multiple beneficiaries?</span>
                    {expandedFaq === 'multiple' ? (
                      <ChevronUp className="w-5 h-5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    Yes! You can add as many beneficiaries as you'd like. Each beneficiary will receive unlock codes 
                    for all premium themes you've purchased. This allows multiple family members or friends to honor 
                    your memory using the same beautiful themes.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Alert className="bg-white/5 border-white/10">
            <Shield className="w-4 h-4 text-blue-400" />
            <AlertDescription className="text-white/70 text-sm">
              <strong className="text-white">Your security matters:</strong> All beneficiary data is encrypted 
              and stored securely. Unlock codes are only generated after proper verification of your passing, 
              and beneficiaries must verify their identity before receiving access.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </div>
  );
}
