'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockSLAs = [
  {
    id: '1',
    complaintTitle: 'Broken water fixture - Room 301',
    category: 'Facilities',
    priority: 'Medium',
    targetTime: '24 hours',
    elapsed: '8 hours',
    status: 'on-track',
    progressPercent: 33,
  },
  {
    id: '2',
    complaintTitle: 'WiFi connectivity in Library',
    category: 'IT & Tech',
    priority: 'High',
    targetTime: '12 hours',
    elapsed: '3 hours',
    status: 'on-track',
    progressPercent: 25,
  },
  {
    id: '3',
    complaintTitle: 'Door lock malfunction - East Wing',
    category: 'Security',
    priority: 'Critical',
    targetTime: '4 hours',
    elapsed: '5 hours',
    status: 'breached',
    progressPercent: 125,
  },
  {
    id: '4',
    complaintTitle: 'Lighting issue in Cafeteria',
    category: 'Facilities',
    priority: 'Low',
    targetTime: '48 hours',
    elapsed: '2 hours',
    status: 'on-track',
    progressPercent: 4,
  },
];

export default function SLATrackingPage() {
  const overallStats = {
    active: 15,
    onTrack: 12,
    warning: 2,
    breached: 1,
    compliance: 93,
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">SLA Tracking</h1>
          <p className="text-text-secondary mt-2">Monitor Service Level Agreement compliance</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-xs">Active</p>
              <p className="text-2xl font-bold text-primary-500">{overallStats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-xs">On Track</p>
              <p className="text-2xl font-bold text-success-500">{overallStats.onTrack}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-xs">Warning</p>
              <p className="text-2xl font-bold text-warning-500">{overallStats.warning}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-xs">Breached</p>
              <p className="text-2xl font-bold text-danger-500">{overallStats.breached}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-text-secondary text-xs">Compliance</p>
              <p className="text-2xl font-bold text-info-500">{overallStats.compliance}%</p>
            </CardContent>
          </Card>
        </div>

        {/* SLA Items */}
        <div className="space-y-3">
          {mockSLAs.map((sla, idx) => (
            <motion.div key={sla.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card
                className={`hover:shadow-lg transition-shadow ${
                  sla.status === 'breached' ? 'border-l-4 border-danger-500' : sla.status === 'warning' ? 'border-l-4 border-warning-500' : ''
                }`}
              >
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{sla.complaintTitle}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{sla.category}</Badge>
                        <Badge
                          className={sla.priority === 'Critical' ? 'bg-danger-500' : sla.priority === 'High' ? 'bg-warning-500' : 'bg-info-500'}
                        >
                          {sla.priority}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      className={
                        sla.status === 'breached'
                          ? 'bg-danger-500'
                          : sla.status === 'warning'
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                      }
                    >
                      {sla.status === 'breached' ? '❌ BREACHED' : sla.status === 'warning' ? '⚠️ WARNING' : '✓ ON TRACK'}
                    </Badge>
                  </div>

                  {/* SLA Timeline */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-text-secondary">
                        <strong>{sla.elapsed}</strong> of {sla.targetTime}
                      </span>
                      <span className={`text-sm font-semibold ${sla.status === 'breached' ? 'text-danger-500' : 'text-text-primary'}`}>
                        {sla.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          sla.status === 'breached'
                            ? 'bg-danger-500'
                            : sla.status === 'warning'
                              ? 'bg-warning-500'
                              : 'bg-success-500'
                        }`}
                        style={{ width: `${Math.min(sla.progressPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {sla.status === 'breached' && (
                    <div className="p-3 bg-danger-50 border border-danger-200 rounded text-danger-600 text-sm">
                      ⚠️ This SLA has been breached. Immediate action required.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
}
