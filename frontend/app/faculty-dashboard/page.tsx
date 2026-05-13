'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layouts/main-layout';
import { KPICard, KPIGrid } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge, CategoryBadge, PriorityBadge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { motion } from 'framer-motion';

// Mock verification queue data
const mockVerificationQueue = [
  {
    id: '1',
    title: 'Broken water fixture in Room 301',
    category: 'facilities' as const,
    priority: 'medium' as const,
    studentName: 'John Doe',
    submittedTime: '2 hours ago',
  },
  {
    id: '2',
    title: 'WiFi connectivity issues in Library',
    category: 'it' as const,
    priority: 'high' as const,
    studentName: 'Jane Smith',
    submittedTime: '1 hour ago',
  },
  {
    id: '3',
    title: 'Door lock malfunction - East Wing',
    category: 'security' as const,
    priority: 'critical' as const,
    studentName: 'Mike Johnson',
    submittedTime: '45 minutes ago',
  },
];

const mockAssignedIssues = [
  {
    id: '1',
    title: 'Lighting issue in Cafeteria',
    status: 'in-progress' as const,
    assignedTo: 'John Smith (Ops)',
    dueDate: '2024-05-15',
    progress: 65,
  },
  {
    id: '2',
    title: 'Projector not working in Lecture Hall 4',
    status: 'assigned' as const,
    assignedTo: 'Sarah Wilson (IT)',
    dueDate: '2024-05-14',
    progress: 0,
  },
];

export default function FacultyDashboard() {
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (complaintId: string) => {
    console.log('Approved:', complaintId);
    setSelectedComplaint(null);
    setIsApproveModalOpen(false);
  };

  const handleReject = (complaintId: string) => {
    console.log('Rejected:', complaintId, 'Reason:', rejectionReason);
    setSelectedComplaint(null);
    setIsRejectModalOpen(false);
    setRejectionReason('');
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
            <h1 className="text-3xl font-bold text-text-primary">Faculty Dashboard</h1>
            <p className="text-text-secondary mt-1">Verify and manage campus issues</p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <KPIGrid>
          <KPICard
            index={0}
            title="Pending Verification"
            value={45}
            icon="📋"
            color="warning"
            trend={5}
            trendDirection="up"
          />
          <KPICard
            index={1}
            title="Verified This Month"
            value={234}
            icon="✓"
            color="success"
            trend={8}
            trendDirection="up"
          />
          <KPICard
            index={2}
            title="Approval Rate"
            value="94%"
            icon="✨"
            color="primary"
            trend={2}
            trendDirection="up"
          />
          <KPICard
            index={3}
            title="Avg Verification Time"
            value="2.5"
            unit="hours"
            icon="⏱"
            color="info"
            trend={3}
            trendDirection="down"
          />
        </KPIGrid>

        {/* Verification Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Verification Queue ({mockVerificationQueue.length})</CardTitle>
              <span className="text-sm text-primary-600 font-semibold">Priority: CRITICAL</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockVerificationQueue.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + idx * 0.05 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">{item.title}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <CategoryBadge category={item.category} size="sm" />
                        <PriorityBadge priority={item.priority} size="sm" />
                        <span className="text-xs text-text-secondary">{item.studentName}</span>
                        <span className="text-xs text-text-secondary">{item.submittedTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(item.id);
                          setIsRejectModalOpen(true);
                        }}
                      >
                        ✕ Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(item.id);
                          setIsApproveModalOpen(true);
                        }}
                      >
                        ✓ Approve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assigned Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Assignments ({mockAssignedIssues.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAssignedIssues.map((issue, idx) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + idx * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-text-primary text-sm">{issue.title}</p>
                    <StatusBadge status={issue.status} size="sm" />
                  </div>
                  <p className="text-xs text-text-secondary">Assigned to: {issue.assignedTo}</p>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${issue.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>{issue.progress}% complete</span>
                    <span>Due: {issue.dueDate}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: 'John Smith (Ops)', completed: 28, pending: 5 },
                  { name: 'Sarah Wilson (IT)', completed: 22, pending: 3 },
                  { name: 'Mike Chen (Security)', completed: 19, pending: 4 },
                ].map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    className="p-3 border border-neutral-200 rounded-lg"
                  >
                    <p className="font-medium text-sm text-text-primary">{member.name}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-success-600">✓ {member.completed} completed</span>
                      <span className="text-warning-600">⏳ {member.pending} pending</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Approval Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Complaint"
        description="This complaint will be marked as verified and assigned to operations."
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Are you sure you want to approve this complaint? It will be assigned to the appropriate operational team.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsApproveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedComplaint && handleApprove(selectedComplaint)}
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rejection Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Complaint"
        description="Provide a reason for rejection"
      >
        <div className="space-y-4">
          <Input
            label="Reason for Rejection"
            type="text"
            placeholder="Why is this complaint being rejected?"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectModalOpen(false);
                setRejectionReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => selectedComplaint && handleReject(selectedComplaint)}
            >
              Reject
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}
