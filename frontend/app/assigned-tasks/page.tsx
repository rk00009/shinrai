'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockTasks = [
  {
    id: '1',
    title: 'Fix broken water fixture - Room 301',
    status: 'in-progress',
    priority: 'medium',
    assignedBy: 'Dr. Priya Singh',
    dueDate: '2024-05-12',
    location: 'Room 301, Building A',
  },
  {
    id: '2',
    title: 'Repair WiFi router in Library',
    status: 'pending',
    priority: 'high',
    assignedBy: 'Dr. Priya Singh',
    dueDate: '2024-05-13',
    location: 'Library, Floor 2',
  },
  {
    id: '3',
    title: 'Check door lock - East Wing',
    status: 'pending',
    priority: 'critical',
    assignedBy: 'Dr. Priya Singh',
    dueDate: '2024-05-11',
    location: 'East Wing Entrance',
  },
  {
    id: '4',
    title: 'Replace lights in Cafeteria',
    status: 'completed',
    priority: 'low',
    assignedBy: 'Dr. Priya Singh',
    dueDate: '2024-05-10',
    location: 'Cafeteria',
  },
];

export default function AssignedTasksPage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">My Tasks</h1>
          <p className="text-text-secondary mt-2">View and manage your assigned operational tasks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Pending</p>
              <p className="text-3xl font-bold text-warning-500">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">In Progress</p>
              <p className="text-3xl font-bold text-info-500">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Completed</p>
              <p className="text-3xl font-bold text-success-500">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-sm">Overdue</p>
              <p className="text-3xl font-bold text-danger-500">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {mockTasks.map((task, idx) => (
            <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-1">{task.title}</h3>
                      <p className="text-sm text-text-secondary">📍 {task.location}</p>
                    </div>
                    <Badge
                      className={
                        task.status === 'pending'
                          ? 'bg-neutral-500'
                          : task.status === 'in-progress'
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                      }
                    >
                      {task.status === 'pending' ? '⏳ Pending' : task.status === 'in-progress' ? '🔄 In Progress' : '✓ Completed'}
                    </Badge>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      className={
                        task.priority === 'critical'
                          ? 'border-danger-500 text-danger-500'
                          : task.priority === 'high'
                            ? 'border-warning-500 text-warning-500'
                            : 'border-info-500 text-info-500'
                      }
                    >
                      {task.priority.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-sm text-text-secondary">Assigned by: {task.assignedBy}</span>
                    <span className="text-sm text-text-secondary">Due: {task.dueDate}</span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-neutral-200">
                    {task.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-warning-500 hover:bg-warning-600">
                          Accept & Start
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </>
                    )}
                    {task.status === 'in-progress' && (
                      <Button size="sm" className="bg-success-500 hover:bg-success-600">
                        Mark Complete
                      </Button>
                    )}
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
