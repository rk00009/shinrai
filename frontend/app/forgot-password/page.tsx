'use client';

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-info-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-500 mb-2">SHINRAI</h1>
          <p className="text-text-secondary">
            Reset your password securely
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-text-secondary">
          <p>Back to <a href="/login" className="text-primary-500 hover:text-primary-600 font-medium">Sign In</a></p>
        </div>
      </div>
    </div>
  );
}
