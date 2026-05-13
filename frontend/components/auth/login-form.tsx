'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/modal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const [error, setError] = useState('');

  const roles = [
    { id: 'student', label: 'Student', description: 'Report campus issues' },
    { id: 'faculty', label: 'Faculty/HOD', description: 'Verify and manage issues' },
    { id: 'operational', label: 'Operational Staff', description: 'Execute tasks' },
    { id: 'admin', label: 'Administrator', description: 'System monitoring' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Mock login - connects to backend in Phase 4
      await login(email, password, selectedRole as any);
      
      // Redirect based on role
      const dashboardMap: Record<string, string> = {
        student: '/student-dashboard',
        faculty: '/faculty-dashboard',
        operational: '/operational-dashboard',
        admin: '/admin-dashboard',
      };

      router.push(dashboardMap[selectedRole] || '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your SHINRAI account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert type="error" title="Login Failed" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">Select Your Role</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left text-text-primary ${
                    selectedRole === role.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-text-secondary">{role.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-primary-500 hover:text-primary-600">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign up here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
