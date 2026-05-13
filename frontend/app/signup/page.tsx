'use client';

import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-info-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-500 mb-2">SHINRAI</h1>
          <p className="text-text-secondary">
            Join thousands of students, faculty, and staff
          </p>
        </div>

        {/* Form */}
        <SignupForm />

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-text-secondary space-y-2">
          <p>By signing up, you agree to our <a href="/terms" className="text-primary-500 hover:text-primary-600">Terms of Service</a> and <a href="/privacy" className="text-primary-500 hover:text-primary-600">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
}
