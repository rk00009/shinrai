'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const analytics = {
    totalComplaints: 927,
    resolutionRate: 89,
    avgResponseTime: 2.8,
    slaCompliance: 94,
    mostCommonCategory: 'Facilities',
    averageResolutionDays: 8,
  };

  const categoryBreakdown = [
    { category: 'Facilities', count: 324, percent: 35 },
    { category: 'IT & Tech', count: 245, percent: 26 },
    { category: 'Security', count: 198, percent: 21 },
    { category: 'Academic', count: 98, percent: 11 },
    { category: 'Other', count: 62, percent: 7 },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
          <p className="text-text-secondary mt-2">System-wide analytics and reporting</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-text-secondary text-sm">Total Complaints</p>
              <p className="text-4xl font-bold text-primary-500 mt-2">{analytics.totalComplaints}</p>
              <p className="text-text-secondary text-xs mt-2">↑ 12% this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-text-secondary text-sm">Resolution Rate</p>
              <p className="text-4xl font-bold text-success-500 mt-2">{analytics.resolutionRate}%</p>
              <p className="text-text-secondary text-xs mt-2">↑ 4% this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-text-secondary text-sm">Avg Response Time</p>
              <p className="text-4xl font-bold text-info-500 mt-2">{analytics.avgResponseTime} hrs</p>
              <p className="text-text-secondary text-xs mt-2">↓ 8% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* SLA & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-text-secondary text-sm">SLA Compliance</p>
              <p className="text-4xl font-bold text-warning-500 mt-2">{analytics.slaCompliance}%</p>
              <p className="text-text-secondary text-xs mt-2">Target: 95%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-text-secondary text-sm">Avg Resolution Time</p>
              <p className="text-4xl font-bold text-info-500 mt-2">{analytics.averageResolutionDays} days</p>
              <p className="text-text-secondary text-xs mt-2">Median: 6 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryBreakdown.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-text-primary">{item.category}</span>
                    <span className="text-text-secondary">{item.count} ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Trends */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
              <span className="text-text-primary">Database Status</span>
              <span className="text-success-600 font-semibold">🟢 Operational</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
              <span className="text-text-primary">API Status</span>
              <span className="text-success-600 font-semibold">🟢 Operational</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
              <span className="text-text-primary">Email Service</span>
              <span className="text-success-600 font-semibold">🟢 Operational</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
}
