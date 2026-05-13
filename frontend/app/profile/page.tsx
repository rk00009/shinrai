'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';

export default function ProfilePage() {
  const { user } = useAuthStore();

  const roleLabels: Record<string, string> = {
    student: 'Student',
    faculty: 'Faculty/HOD',
    operational: 'Operational Staff',
    admin: 'Administrator',
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">User Profile</h1>
          <p className="text-text-secondary mt-2">View and manage your profile information</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-neutral-200">
              <img
                src={user?.avatar || 'https://via.placeholder.com/80'}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{user?.name}</h2>
                <p className="text-text-secondary">{roleLabels[user?.role || 'student']}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                <Input value={user?.email || ''} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
                <Input value={roleLabels[user?.role || 'student']} disabled />
              </div>
              {user?.department && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Department</label>
                  <Input value={user.department} disabled />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Member Since</label>
                <Input value={new Date(user?.createdAt || '').toLocaleDateString()} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Notifications</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-text-secondary">Receive email updates about my complaints</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">SMS Notifications</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-text-secondary">Receive SMS alerts for critical updates</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button>Save Changes</Button>
          <Button variant="outline">Change Password</Button>
        </div>
      </motion.div>
    </MainLayout>
  );
}
