'use client';

import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-info-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-500 mb-2">SHINRAI</h1>
          <p className="text-text-secondary">
            University Civic Issue Resolution Platform
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-text-secondary">
          <p>Need help? <a href="mailto:support@shinrai.edu" className="text-primary-500 hover:text-primary-600">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}
