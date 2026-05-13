'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockUsers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@university.edu',
    role: 'Student',
    status: 'active',
    joinDate: '2024-01-15',
    complaints: 3,
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    email: 'priya@university.edu',
    role: 'Faculty',
    status: 'active',
    joinDate: '2023-08-20',
    verified: 12,
  },
  {
    id: '3',
    name: 'Amit Sharma',
    email: 'amit@university.edu',
    role: 'Operational',
    status: 'active',
    joinDate: '2023-06-10',
    tasksCompleted: 156,
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@university.edu',
    role: 'Student',
    status: 'inactive',
    joinDate: '2024-02-01',
    complaints: 1,
  },
  {
    id: '5',
    name: 'Mike Johnson',
    email: 'mike@university.edu',
    role: 'Faculty',
    status: 'active',
    joinDate: '2023-09-12',
    verified: 8,
  },
];

export default function UsersPage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
            <p className="text-text-secondary mt-2">Manage platform users and permissions</p>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-600">+ Add User</Button>
        </div>

        {/* Search & Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Search by name or email..." />
              <select className="px-4 py-2 border border-neutral-200 rounded-lg">
                <option>All Roles</option>
                <option>Student</option>
                <option>Faculty</option>
                <option>Operational</option>
                <option>Admin</option>
              </select>
              <select className="px-4 py-2 border border-neutral-200 rounded-lg">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Total Users</p>
              <p className="text-3xl font-bold text-primary-500">1,243</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Active</p>
              <p className="text-3xl font-bold text-success-500">1,189</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Inactive</p>
              <p className="text-3xl font-bold text-warning-500">54</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">New This Month</p>
              <p className="text-3xl font-bold text-info-500">23</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 overflow-x-auto">
              {mockUsers.map((user, idx) => (
                <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">{user.name}</h3>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                        <p className="text-xs text-text-secondary mt-1">Joined: {user.joinDate}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={user.status === 'active' ? 'bg-success-500' : 'bg-neutral-500'}>
                          {user.status === 'active' ? '🟢 Active' : '⚫ Inactive'}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
}
