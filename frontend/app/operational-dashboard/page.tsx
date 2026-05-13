'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layouts/main-layout';
import { KPICard, KPIGrid } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge, PriorityBadge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/input';
import { motion } from 'framer-motion';

// Mock task data
const mockTasks = [
  {
    id: '1',
    title: 'Fix water fixture - Room 301',
    priority: 'medium' as const,
    status: 'accepted' as const,
    location: 'Building A, 3rd Floor',
    slaRemaining: 4, // hours
    slaTotal: 8,
    studentName: 'John Doe',
  },
  {
    id: '2',
    title: 'Restore WiFi - Library',
    priority: 'high' as const,
    status: 'in-progress' as const,
    location: 'Central Library',
    slaRemaining: 2,
    slaTotal: 6,
    studentName: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Replace door lock - East Wing',
    priority: 'critical' as const,
    status: 'pending' as const,
    location: 'East Wing Entrance',
    slaRemaining: 1,
    slaTotal: 2,
    studentName: 'Mike Johnson',
  },
];

export default function OperationalDashboard() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<'pending' | 'accepted' | 'in-progress' | 'completed' | 'all'>('all');
  const [isLogTimeOpen, setIsLogTimeOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [workLog, setWorkLog] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');

  const filteredTasks = taskFilter === 'all' ? mockTasks : mockTasks.filter((t) => t.status === taskFilter);

  const getSLAStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 20) return 'danger';
    if (percentage <= 50) return 'warning';
    return 'success';
  };

  const handleStartTask = (taskId: string) => {
    console.log('Task started:', taskId);
    setSelectedTask(null);
  };

  const handleLogTime = (taskId: string) => {
    console.log('Time logged:', taskId, workLog);
    setWorkLog('');
    setIsLogTimeOpen(false);
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Task completed:', taskId, completionNotes);
    setCompletionNotes('');
    setIsCompleteOpen(false);
  };

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
            <h1 className="text-3xl font-bold text-text-primary">Task Queue</h1>
            <p className="text-text-secondary mt-1">Manage assigned maintenance and repair tasks</p>
          </div>
        </motion.div>

        {/* KPI Cards - Mobile Optimized */}
        <KPIGrid>
          <KPICard
            index={0}
            title="Assigned Tasks"
            value={12}
            icon="📋"
            color="info"
          />
          <KPICard
            index={1}
            title="In Progress"
            value={3}
            icon="🔧"
            color="warning"
          />
          <KPICard
            index={2}
            title="Completed Today"
            value={8}
            icon="✓"
            color="success"
          />
          <KPICard
            index={3}
            title="SLA Risk"
            value={2}
            icon="⚠"
            color="primary"
          />
        </KPIGrid>

        {/* Task Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {(['all', 'pending', 'accepted', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setTaskFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                taskFilter === status
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-neutral-200 text-text-primary hover:bg-neutral-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Task Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {filteredTasks.map((task, idx) => {
            const slaStatus = getSLAStatus(task.slaRemaining, task.slaTotal);
            const slaColor = slaStatus === 'danger' ? 'text-danger-600' : slaStatus === 'warning' ? 'text-warning-600' : 'text-success-600';

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + idx * 0.05 }}
                className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
              >
                {/* Task Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-lg">{task.title}</h3>
                    <p className="text-sm text-text-secondary mt-1">📍 {task.location}</p>
                    <p className="text-xs text-text-secondary mt-1">For: {task.studentName}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <PriorityBadge priority={task.priority} size="md" />
                    <StatusBadge status={task.status} size="md" />
                  </div>
                </div>

                {/* SLA Timer */}
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text-secondary">SLA Time Remaining</span>
                    <span className={`text-sm font-bold ${slaColor}`}>
                      {task.slaRemaining}h / {task.slaTotal}h
                    </span>
                  </div>
                  <div className="w-full bg-neutral-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        slaStatus === 'danger'
                          ? 'bg-danger-500'
                          : slaStatus === 'warning'
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                      }`}
                      style={{ width: `${(task.slaRemaining / task.slaTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {task.status === 'pending' && (
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => handleStartTask(task.id)}
                    >
                      Accept Task
                    </Button>
                  )}
                  {task.status === 'accepted' && (
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => handleStartTask(task.id)}
                    >
                      Start Work
                    </Button>
                  )}
                  {task.status === 'in-progress' && (
                    <>
                      <Button
                        className="flex-1"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsLogTimeOpen(true)}
                      >
                        ⏱ Log Time
                      </Button>
                      <Button
                        className="flex-1"
                        variant="primary"
                        size="sm"
                        onClick={() => setIsCompleteOpen(true)}
                      >
                        ✓ Complete
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Daily Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-info-50 rounded-lg">
                <p className="text-sm text-text-secondary">Tasks Started</p>
                <p className="text-2xl font-bold text-info-600">5</p>
              </div>
              <div className="text-center p-4 bg-success-50 rounded-lg">
                <p className="text-sm text-text-secondary">Completed</p>
                <p className="text-2xl font-bold text-success-600">8</p>
              </div>
              <div className="text-center p-4 bg-warning-50 rounded-lg">
                <p className="text-sm text-text-secondary">Time Logged</p>
                <p className="text-2xl font-bold text-warning-600">12.5h</p>
              </div>
              <div className="text-center p-4 bg-danger-50 rounded-lg">
                <p className="text-sm text-text-secondary">SLA Breached</p>
                <p className="text-2xl font-bold text-danger-600">1</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Time Logging Modal */}
      <Modal
        isOpen={isLogTimeOpen}
        onClose={() => {
          setIsLogTimeOpen(false);
          setWorkLog('');
        }}
        title="Log Work Time"
        description="Record the time spent on this task"
      >
        <div className="space-y-4">
          <Textarea
            label="Work Notes"
            placeholder="What work was completed?"
            rows={4}
            value={workLog}
            onChange={(e) => setWorkLog(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsLogTimeOpen(false);
                setWorkLog('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleLogTime(selectedTask || '')}>
              Log Time
            </Button>
          </div>
        </div>
      </Modal>

      {/* Task Completion Modal */}
      <Modal
        isOpen={isCompleteOpen}
        onClose={() => {
          setIsCompleteOpen(false);
          setCompletionNotes('');
        }}
        title="Complete Task"
        description="Confirm task completion and add notes"
      >
        <div className="space-y-4">
          <Textarea
            label="Completion Notes"
            placeholder="Describe what was done to complete this task"
            rows={4}
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsCompleteOpen(false);
                setCompletionNotes('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleCompleteTask(selectedTask || '')}>
              Mark Complete
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}
