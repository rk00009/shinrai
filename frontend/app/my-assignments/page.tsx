'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockAssignments = [
  {
    id: '1',
    title: 'Lighting issue in Cafeteria',
    status: 'in-progress',
    assignedTo: 'John Smith (Ops)',
    dueDate: '2024-05-15',
    progress: 65,
  },
  {
    id: '2',
    title: 'Projector not working in Lecture Hall 4',
    status: 'assigned',
    assignedTo: 'Sarah Wilson (IT)',
    dueDate: '2024-05-14',
    progress: 0,
  },
  {
    id: '3',
    title: 'Painting touch-up - Room 205',
    status: 'verified',
    assignedTo: 'Mike Chen (Maintenance)',
    dueDate: '2024-05-20',
    progress: 100,
  },
];

export default function MyAssignmentsPage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Assignments</h1>
          <p className="text-text-secondary mt-2">Track and manage assigned complaints</p>
        </div>

        {/* Filter */}
        <Card>
          <CardContent className="pt-6">
            <select className="px-4 py-2 border border-neutral-200 rounded-lg">
              <option>All Statuses</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Verified</option>
              <option>Completed</option>
            </select>
          </CardContent>
        </Card>

        {/* Assignment Cards */}
        <div className="space-y-3">
          {mockAssignments.map((assignment, idx) => (
            <motion.div key={assignment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-text-primary">{assignment.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">Assigned to: <strong>{assignment.assignedTo}</strong></p>
                    </div>
                    <Badge
                      className={
                        assignment.status === 'in-progress'
                          ? 'bg-warning-500'
                          : assignment.status === 'assigned'
                            ? 'bg-info-500'
                            : 'bg-success-500'
                      }
                    >
                      {assignment.status === 'in-progress' ? '⏳ In Progress' : assignment.status === 'assigned' ? '📋 Assigned' : '✓ Verified'}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-text-secondary">Progress</span>
                      <span className="text-sm font-semibold text-text-primary">{assignment.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${assignment.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                    <span className="text-sm text-text-secondary">Due: {assignment.dueDate}</span>
                    <Button size="sm" variant="outline">
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
