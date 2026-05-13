'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge, CategoryBadge, PriorityBadge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockComplaints = [
  {
    id: '1',
    title: 'Broken water fixture in Room 301',
    category: 'facilities',
    status: 'in-progress',
    priority: 'medium',
    created: '2024-05-10',
    days: 3,
  },
  {
    id: '2',
    title: 'WiFi connectivity issues in Library',
    category: 'it',
    status: 'verified',
    priority: 'high',
    created: '2024-05-09',
    days: 4,
  },
  {
    id: '3',
    title: 'Door lock malfunction - East Wing',
    category: 'security',
    status: 'submitted',
    priority: 'critical',
    created: '2024-05-08',
    days: 5,
  },
];

export default function ComplaintsPage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Complaints</h1>
          <p className="text-text-secondary mt-2">View and manage all your submitted complaints</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Search complaints..." />
              <select className="px-4 py-2 border border-neutral-200 rounded-lg">
                <option>All Statuses</option>
                <option>Submitted</option>
                <option>Verified</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <select className="px-4 py-2 border border-neutral-200 rounded-lg">
                <option>All Categories</option>
                <option>Facilities</option>
                <option>IT & Tech</option>
                <option>Security</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="space-y-3">
          {mockComplaints.map((complaint) => (
            <motion.div key={complaint.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-2">{complaint.title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <CategoryBadge category={complaint.category as any} />
                        <PriorityBadge priority={complaint.priority as any} />
                        <StatusBadge status={complaint.status as any} />
                        <span className="text-sm text-text-secondary">🕐 {complaint.days} days</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
}
