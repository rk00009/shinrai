'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockQueue = [
  {
    id: '1',
    title: 'Broken water fixture in Room 301',
    student: 'John Doe',
    category: 'Facilities',
    priority: 'Medium',
    submittedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'WiFi connectivity issues in Library',
    student: 'Jane Smith',
    category: 'IT & Tech',
    priority: 'High',
    submittedAt: '1 hour ago',
  },
  {
    id: '3',
    title: 'Door lock malfunction - East Wing',
    student: 'Mike Johnson',
    category: 'Security',
    priority: 'Critical',
    submittedAt: '45 minutes ago',
  },
];

export default function VerificationQueuePage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Verification Queue</h1>
          <p className="text-text-secondary mt-2">Review and verify submitted complaints</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-text-secondary text-sm">Pending Review</p>
                <p className="text-4xl font-bold text-primary-500">45</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-text-secondary text-sm">Avg Review Time</p>
                <p className="text-4xl font-bold text-info-500">2.5 hrs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-text-secondary text-sm">Approval Rate</p>
                <p className="text-4xl font-bold text-success-500">94%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Items */}
        <div className="space-y-3">
          {mockQueue.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                        <p className="text-sm text-text-secondary">Submitted by <strong>{item.student}</strong> • {item.submittedAt}</p>
                      </div>
                      <Badge className={item.priority === 'Critical' ? 'bg-danger-500' : item.priority === 'High' ? 'bg-warning-500' : 'bg-info-500'}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-neutral-200">
                      <Button size="sm" className="bg-success-500 hover:bg-success-600">
                        ✓ Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-danger-500 hover:bg-danger-50">
                        ✕ Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        Request Info
                      </Button>
                    </div>
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
