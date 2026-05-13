'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Menu, X, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const sidebarLinks = {
  student: [
    { href: '/student-dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/complaints', label: 'My Complaints', icon: '🎫' },
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ],
  faculty: [
    { href: '/faculty-dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/verification-queue', label: 'Verification Queue', icon: '✓' },
    { href: '/my-assignments', label: 'My Assignments', icon: '📋' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ],
  operational: [
    { href: '/operational-dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/assigned-tasks', label: 'My Tasks', icon: '🎯' },
    { href: '/sla-tracking', label: 'SLA Tracking', icon: '⏱️' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ],
  admin: [
    { href: '/admin-dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
    { href: '/users', label: 'Users', icon: '👥' },
    { href: '/system-health', label: 'System Health', icon: '⚕️' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const links = user ? sidebarLinks[user.role as keyof typeof sidebarLinks] || sidebarLinks.student : [];

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-16 h-[calc(100vh-64px)] w-72 bg-white border-r border-neutral-200 overflow-y-auto transition-transform duration-300 z-50 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                pathname === link.href
                  ? 'bg-primary-500 text-white'
                  : 'text-text-secondary hover:bg-neutral-100'
              )}
              onClick={onClose}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 p-4 bg-neutral-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

interface NavbarProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export function Navbar({ onMenuToggle, sidebarOpen }: NavbarProps) {
  const { user } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-40">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Menu and Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-neutral-100 rounded-lg lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-primary-500 text-xl">
            <span>🏛️</span>
            <span>SHINRAI</span>
          </Link>
        </div>

        {/* Center: Breadcrumb/Title */}
        <div className="flex-1 px-8 hidden md:block">
          <p className="text-text-secondary">Welcome back, {user?.name}</p>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-4">
          {/* Search placeholder */}
          <button className="p-2 hover:bg-neutral-100 rounded-lg hidden md:block transition-colors">
            🔍
          </button>

          {/* Notifications placeholder */}
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User profile */}
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <img
              src={user?.avatar || 'https://via.placeholder.com/32'}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="pt-16 lg:ml-72">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
