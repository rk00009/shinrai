'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/modal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ForgotPasswordForm() {
  const [step, setStep] = useState<'email' | 'verification' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call - connects to backend in Phase 4
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage('Verification code sent to your email');
      setStep('verification');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage('Code verified successfully');
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Recover access to your SHINRAI account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step 1: Email Entry */}
        {step === 'email' && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            {error && (
              <Alert type="error" title="Error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <p className="text-sm text-text-secondary">
              Enter your email address and we'll send you a code to reset your password.
            </p>

            <Input
              label="Email Address"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Send Reset Code
            </Button>

            <p className="text-center text-sm text-text-secondary">
              Remembered your password?{' '}
              <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: Code Verification */}
        {step === 'verification' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            {message && (
              <Alert type="success" title="Success" onClose={() => setMessage('')}>
                {message}
              </Alert>
            )}
            {error && (
              <Alert type="error" title="Error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <p className="text-sm text-text-secondary">
              Enter the verification code sent to {email}
            </p>

            <Input
              label="Verification Code"
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 6))}
              disabled={isLoading}
              required
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Verify Code
            </Button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Use different email
            </button>
          </form>
        )}

        {/* Step 3: Password Reset */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {message && (
              <Alert type="success" title="Success" onClose={() => setMessage('')}>
                {message}
              </Alert>
            )}
            {error && (
              <Alert type="error" title="Error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <p className="text-sm text-text-secondary">
              Enter your new password below.
            </p>

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              helperText="At least 8 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
