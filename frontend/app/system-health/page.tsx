'use client';

import { MainLayout } from '@/components/layouts/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const systemStatus = [
  {
    name: 'API Server',
    status: 'operational',
    uptime: '99.98%',
    responseTime: '45ms',
    lastCheck: '2 minutes ago',
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '12ms',
    lastCheck: '1 minute ago',
  },
  {
    name: 'Email Service',
    status: 'operational',
    uptime: '99.99%',
    responseTime: 'N/A',
    lastCheck: '5 minutes ago',
  },
  {
    name: 'File Storage',
    status: 'operational',
    uptime: '99.97%',
    responseTime: '150ms',
    lastCheck: '3 minutes ago',
  },
  {
    name: 'Authentication',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '25ms',
    lastCheck: '1 minute ago',
  },
  {
    name: 'Cache Server',
    status: 'operational',
    uptime: '99.90%',
    responseTime: '5ms',
    lastCheck: '2 minutes ago',
  },
];

const performanceMetrics = [
  { metric: 'CPU Usage', value: '42%', status: 'good' },
  { metric: 'Memory Usage', value: '58%', status: 'good' },
  { metric: 'Disk Usage', value: '72%', status: 'warning' },
  { metric: 'Network I/O', value: '240 Mbps', status: 'good' },
];

export default function SystemHealthPage() {
  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">System Health</h1>
          <p className="text-text-secondary mt-2">Monitor system status and performance</p>
        </div>

        {/* Overall Status */}
        <Card className="bg-gradient-to-r from-success-50 to-success-100 border-success-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary mb-2">Overall System Status</p>
                <h2 className="text-3xl font-bold text-success-600">🟢 All Systems Operational</h2>
                <p className="text-text-secondary mt-2">Last check: Just now • All services running normally</p>
              </div>
              <div className="text-6xl">✓</div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <p className="text-text-secondary text-sm mb-2">{metric.metric}</p>
                    <p className="text-2xl font-bold text-text-primary mb-2">{metric.value}</p>
                    <Badge className={metric.status === 'good' ? 'bg-success-500' : 'bg-warning-500'}>
                      {metric.status === 'good' ? '✓ Good' : '⚠️ Warning'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemStatus.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                <div className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text-primary">{service.name}</h3>
                    <Badge className="bg-success-500">🟢 {service.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-text-secondary">
                    <div>
                      <p className="text-xs mb-1">Uptime</p>
                      <p className="font-semibold text-text-primary">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1">Response Time</p>
                      <p className="font-semibold text-text-primary">{service.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1">Last Check</p>
                      <p className="font-semibold text-text-primary text-xs">{service.lastCheck}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-warning-700">High Disk Usage</h4>
                <p className="text-sm text-warning-600">Disk usage has reached 72%. Consider cleanup or expansion.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-neutral-200">
                <span className="text-text-secondary">API restarted after maintenance</span>
                <span className="text-text-secondary">2 hours ago</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-200">
                <span className="text-text-secondary">Database backup completed successfully</span>
                <span className="text-text-secondary">4 hours ago</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-200">
                <span className="text-text-secondary">SSL certificate renewed</span>
                <span className="text-text-secondary">1 day ago</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-secondary">System auto-update completed</span>
                <span className="text-text-secondary">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
}
