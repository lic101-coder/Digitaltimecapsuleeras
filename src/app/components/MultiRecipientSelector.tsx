import React, { useState, KeyboardEvent } from 'react';
import { X, Mail, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface Recipient {
  id: string;
  type: 'email' | 'phone';
  value: string;
  name?: string;
}

interface MultiRecipientSelectorProps {
  recipients: Recipient[];
  onRecipientsChange: (recipients: Recipient[]) => void;
  maxRecipients?: number;
  className?: string;
}

export function MultiRecipientSelector({
  recipients,
  onRecipientsChange,
  maxRecipients = 10,
  className = ''
}: MultiRecipientSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if recipient already exists
  const isDuplicate = (email: string): boolean => {
    return recipients.some(
      (r) => r.value.toLowerCase().trim() === email.toLowerCase().trim()
    );
  };

  // Add recipient from input
  const addRecipient = () => {
    const email = inputValue.trim().toLowerCase();
    
    // Clear previous errors
    setError('');

    // Validation
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (isDuplicate(email)) {
      setError('This recipient has already been added');
      return;
    }

    if (recipients.length >= maxRecipients) {
      setError(`Maximum ${maxRecipients} recipients allowed`);
      return;
    }

    // Add new recipient
    const newRecipient: Recipient = {
      id: `recipient-${Date.now()}-${Math.random()}`,
      type: 'email',
      value: email,
      name: inputName.trim() || undefined
    };

    onRecipientsChange([...recipients, newRecipient]);
    
    // Clear inputs
    setInputValue('');
    setInputName('');
    setShowNameInput(false);
  };

  // Remove recipient
  const removeRecipient = (id: string) => {
    onRecipientsChange(recipients.filter((r) => r.id !== id));
    setError('');
  };

  // Handle Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  // Get recipient count color
  const getCountColor = () => {
    const count = recipients.length;
    return 'text-gray-900 dark:text-gray-100';
  };

  // Get achievement hint (disabled)
  const getAchievementHint = () => {
    return null;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Label className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            Recipients
          </Label>
          <span className={`text-lg font-bold ${getCountColor()}`}>
            {recipients.length} / {maxRecipients}
          </span>
        </div>
        {getAchievementHint()}
      </div>

      {/* Input section */}
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">Email Address</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700 dark:text-gray-300" />
                <Input
                  type="email"
                  placeholder="recipient@example.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-11 h-12 text-base bg-white/5 border-white/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400"
                  disabled={recipients.length >= maxRecipients}
                />
              </div>
              <Button
                type="button"
                onClick={addRecipient}
                disabled={recipients.length >= maxRecipients}
                className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Optional name input toggle */}
          {!showNameInput && inputValue && (
            <button
              type="button"
              onClick={() => setShowNameInput(true)}
              className="text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
            >
              + Add name (optional)
            </button>
          )}

          {/* Name input */}
          {showNameInput && (
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">Name (Optional)</Label>
              <Input
                type="text"
                placeholder="e.g., John Doe"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 text-base bg-white/5 border-white/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <AlertDescription className="text-red-400 text-base font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Recipients list */}
      {recipients.length > 0 && (
        <div className="space-y-3">
          <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">Added Recipients</Label>
          <div className="flex flex-wrap gap-3">
            {recipients.map((recipient) => (
              <Badge
                key={recipient.id}
                variant="secondary"
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/30 text-gray-900 dark:text-gray-100 pl-4 pr-3 py-3 text-base group hover:from-pink-500/30 hover:to-purple-500/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                  <span className="max-w-[250px] truncate font-medium">
                    {recipient.name ? (
                      <>
                        <span className="font-semibold">{recipient.name}</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1 text-sm">
                          ({recipient.value})
                        </span>
                      </>
                    ) : (
                      recipient.value
                    )}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeRecipient(recipient.id)}
                  className="ml-3 hover:bg-red-500/20 rounded-full p-1 transition-colors"
                  aria-label="Remove recipient"
                >
                  <X className="h-4 w-4 text-gray-900 dark:text-gray-100" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Limit reached message */}
      {recipients.length >= maxRecipients && (
        <Alert className="bg-purple-500/10 border-purple-500/30">
          <CheckCircle2 className="h-5 w-5 text-purple-400" />
          <AlertDescription className="text-purple-400 text-base font-medium">
            Maximum recipients reached ({maxRecipients})
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
