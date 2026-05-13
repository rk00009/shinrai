'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { KPICard, KPIGrid } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  // Chart data for visualization
  const trendData = [
    { week: 'W1', complaints: 124, resolved: 98, escalated: 8 },
    { week: 'W2', complaints: 156, resolved: 142, escalated: 12 },
    { week: 'W3', complaints: 189, resolved: 165, escalated: 15 },
    { week: 'W4', complaints: 201, resolved: 184, escalated: 14 },
  ];

  const categoryData = [
    { category: 'Facilities', count: 324, percentage: 35 },
    { category: 'IT & Tech', count: 198, percentage: 21 },
    { category: 'Security', count: 156, percentage: 17 },
    { category: 'Academic', count: 142, percentage: 15 },
    { category: 'Student Services', count: 89, percentage: 10 },
    { category: 'Other', count: 18, percentage: 2 },
  ];

  const departmentMetrics = [
    { name: 'Engineering', total: 234, resolved: 198, rate: '85%', sla: '92%' },
    { name: 'Science', total: 189, resolved: 167, rate: '88%', sla: '94%' },
    { name: 'Liberal Arts', total: 156, resolved: 139, rate: '89%', sla: '96%' },
    { name: 'Business', total: 142, resolved: 118, rate: '83%', sla: '89%' },
    { name: 'Medicine', total: 198, resolved: 178, rate: '90%', sla: '97%' },
  ];

  const systemHealth = [
    { component: 'Database', status: 'Healthy', uptime: '99.99%', color: 'success' },
    { component: 'API Server', status: 'Healthy', uptime: '99.95%', color: 'success' },
    { component: 'Email Service', status: 'Degraded', uptime: '95.23%', color: 'warning' },
    { component: 'File Storage', status: 'Healthy', uptime: '99.98%', color: 'success' },
  ];

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
            <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary mt-1">System-wide analytics and monitoring</p>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <KPIGrid>
          <KPICard
            index={0}
            title="Total Complaints"
            value={927}
            icon="📊"
            color="info"
            trend={12}
            trendDirection="up"
          />
          <KPICard
            index={1}
            title="Resolution Rate"
            value="89%"
            icon="✓"
            color="success"
            trend={4}
            trendDirection="up"
          />
          <KPICard
            index={2}
            title="Avg Response Time"
            value="2.8"
            unit="hours"
            icon="⏱"
            color="warning"
            trend={8}
            trendDirection="down"
          />
          <KPICard
            index={3}
            title="SLA Compliance"
            value="94%"
            icon="✨"
            color="primary"
            trend={2}
            trendDirection="up"
          />
        </KPIGrid>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaint Trend (4-Week View)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + idx * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-text-primary">{item.week}</span>
                      <span className="text-text-secondary">{item.complaints} complaints</span>
                    </div>
                    <div className="flex h-8 gap-1 rounded-lg overflow-hidden bg-neutral-100">
                      <div
                        className="bg-info-500"
                        style={{ width: `${(item.complaints / 250) * 100}%` }}
                        title="Total"
                      />
                      <div
                        className="bg-success-500"
                        style={{ width: `${(item.resolved / 250) * 100}%` }}
                        title="Resolved"
                      />
                      <div
                        className="bg-danger-500"
                        style={{ width: `${(item.escalated / 250) * 100}%` }}
                        title="Escalated"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + idx * 0.05 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-primary">{item.category}</span>
                    <span className="text-text-secondary">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemHealth.map((item, idx) => {
                const statusColor = item.color === 'success' ? 'text-success-600 bg-success-50' : 'text-warning-600 bg-warning-50';
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    className={`p-3 rounded-lg ${statusColor}`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{item.component}</p>
                      <span className="text-sm font-semibold">{item.uptime}</span>
                    </div>
                    <p className="text-sm mt-1">Status: {item.status}</p>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Metrics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Resolved</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">Rate</th>
                      <th className="text-left py-3 px-4 font-semibold text-text-secondary">SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentMetrics.map((dept, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.05 }}
                        className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-text-primary">{dept.name}</td>
                        <td className="py-3 px-4 text-text-secondary">{dept.total}</td>
                        <td className="py-3 px-4 text-text-secondary">{dept.resolved}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-success-600">{dept.rate}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-primary-600">{dept.sla}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-text-secondary">Active Users</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">1,247</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-text-secondary">Departments</p>
              <p className="text-3xl font-bold text-info-600 mt-2">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-text-secondary">Operations Staff</p>
              <p className="text-3xl font-bold text-success-600 mt-2">34</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-text-secondary">System Uptime</p>
              <p className="text-3xl font-bold text-warning-600 mt-2">99.8%</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
