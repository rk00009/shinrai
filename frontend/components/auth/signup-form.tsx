'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { Alert } from '@/components/ui/modal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { UserRole } from '@/types';

export function SignupForm() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student' as UserRole,
    department: '',
  });
  const [error, setError] = useState('');

  const departments = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'science', label: 'Science' },
    { value: 'liberal-arts', label: 'Liberal Arts' },
    { value: 'business', label: 'Business' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'other', label: 'Other' },
  ];

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'faculty', label: 'Faculty Member' },
    { value: 'operational', label: 'Operational Staff' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.role !== 'student' && !formData.department) {
      setError('Please select your department');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        department: formData.department || undefined,
      });

      // Redirect based on role
      const dashboardMap: Record<UserRole, string> = {
        student: '/student-dashboard',
        faculty: '/faculty-dashboard',
        operational: '/operational-dashboard',
        hod: '/faculty-dashboard',
        admin: '/admin-dashboard',
        'system-admin': '/admin-dashboard',
      };

      router.push(dashboardMap[formData.role]);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join SHINRAI today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert type="error" title="Signup Error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Name Input */}
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@university.edu"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          {/* Role Selection */}
          <Select
            label="Your Role"
            name="role"
            options={roles}
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
          />

          {/* Department (if not student) */}
          {formData.role !== 'student' && (
            <Select
              label="Department"
              name="department"
              options={departments}
              value={formData.department}
              onChange={handleChange}
              disabled={isLoading}
              required={formData.role !== 'student'}
            />
          )}

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            helperText="At least 8 characters"
            required
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          {/* Terms & Conditions */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded" required />
            <span className="text-sm text-text-secondary">
              I agree to the{' '}
              <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                Terms and Conditions
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign in here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
