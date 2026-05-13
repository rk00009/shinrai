'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layouts/main-layout';
import { KPICard, KPIGrid } from '@/components/dashboard/kpi-card';
import { ComplaintForm, type ComplaintFormData } from '@/components/dashboard/complaint-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge, CategoryBadge, PriorityBadge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Mock data
const mockComplaints = [
  {
    id: '1',
    title: 'Broken water fixture in Room 301',
    category: 'facilities' as const,
    status: 'in-progress' as const,
    priority: 'medium' as const,
    created: new Date('2024-05-10'),
    days: 3,
  },
  {
    id: '2',
    title: 'WiFi connectivity issues in Library',
    category: 'it' as const,
    status: 'verified' as const,
    priority: 'high' as const,
    created: new Date('2024-05-09'),
    days: 4,
  },
  {
    id: '3',
    title: 'Door lock malfunction - East Wing',
    category: 'security' as const,
    status: 'submitted' as const,
    priority: 'critical' as const,
    created: new Date('2024-05-08'),
    days: 5,
  },
  {
    id: '4',
    title: 'Lighting issue in Cafeteria',
    category: 'facilities' as const,
    status: 'resolved' as const,
    priority: 'low' as const,
    created: new Date('2024-05-05'),
    days: 8,
  },
  {
    id: '5',
    title: 'Projector not working in Lecture Hall 4',
    category: 'academic' as const,
    status: 'assigned' as const,
    priority: 'high' as const,
    created: new Date('2024-05-07'),
    days: 6,
  },
];

const mockTimeline = [
  { id: '1', status: 'submitted', time: '2 hours ago', icon: '📝' },
  { id: '2', status: 'verified', time: '1 hour ago', icon: '✓' },
  { id: '3', status: 'assigned', time: '45 minutes ago', icon: '👤' },
  { id: '4', status: 'in-progress', time: '30 minutes ago', icon: '🔧' },
];

const statusLabels = {
  submitted: 'Submitted',
  verified: 'Verified',
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
  escalated: 'Escalated',
};

export default function StudentDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const handleSubmitComplaint = async (data: ComplaintFormData) => {
    console.log('Submitting complaint:', data);
    // This will connect to API in Phase 4
  };

  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-text-primary">My Complaints</h1>
            <p className="text-text-secondary mt-1">Track and manage your campus issues</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="flex gap-2 items-center"
          >
            <span>➕</span>
            Submit New Complaint
          </Button>
        </motion.div>

        {/* KPI Cards */}
        <KPIGrid>
          <KPICard
            index={0}
            title="Active Issues"
            value={247}
            icon="📊"
            color="info"
            trend={12}
            trendDirection="up"
          />
          <KPICard
            index={1}
            title="Resolution Rate"
            value="87%"
            icon="✓"
            color="success"
            trend={3}
            trendDirection="up"
          />
          <KPICard
            index={2}
            title="Avg Resolution Time"
            value="8"
            unit="days"
            icon="⏱"
            color="warning"
            trend={2}
            trendDirection="down"
          />
          <KPICard
            index={3}
            title="Satisfaction Score"
            value="92%"
            icon="⭐"
            color="primary"
            trend={1}
            trendDirection="up"
          />
        </KPIGrid>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Input
            type="text"
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:border-neutral-400 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="verified">Verified</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </motion.div>

        {/* Recent Complaints Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Complaints ({filteredComplaints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Days</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint, idx) => (
                      <motion.tr
                        key={complaint.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-mono text-text-secondary">#{complaint.id}</td>
                        <td className="py-3 px-4 text-sm text-text-primary font-medium max-w-xs truncate">
                          {complaint.title}
                        </td>
                        <td className="py-3 px-4">
                          <CategoryBadge category={complaint.category} size="sm" />
                        </td>
                        <td className="py-3 px-4">
                          <PriorityBadge priority={complaint.priority} size="sm" />
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={complaint.status} size="sm" />
                        </td>
                        <td className="py-3 px-4 text-sm text-text-secondary">{complaint.days}d</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTimeline.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                      {idx < mockTimeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-neutral-200 mt-2" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-text-primary capitalize">
                        {statusLabels[item.status as keyof typeof statusLabels]}
                      </p>
                      <p className="text-sm text-text-secondary">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-sm text-text-secondary">Issues Reported This Month</p>
                <p className="text-3xl font-bold text-primary-600">12</p>
              </div>
              <div className="bg-success-50 rounded-lg p-4">
                <p className="text-sm text-text-secondary">Issues Resolved</p>
                <p className="text-3xl font-bold text-success-600">8</p>
              </div>
              <div className="bg-info-50 rounded-lg p-4">
                <p className="text-sm text-text-secondary">Pending Resolution</p>
                <p className="text-3xl font-bold text-info-600">4</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Complaint Form Modal */}
      <ComplaintForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitComplaint}
      />
    </MainLayout>
  );
}
