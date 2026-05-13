'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-500 mb-4">
            SHINRAI
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            University Civic Issue Resolution Platform
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
            <Link
              href="/login"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary-500 mb-2">Login</h2>
              <p className="text-text-secondary">Sign in to your account</p>
            </Link>
            
            <Link
              href="/signup"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary-500 mb-2">Sign Up</h2>
              <p className="text-text-secondary">Create a new account</p>
            </Link>
          </div>

          <div className="mt-12 text-text-secondary">
            <p className="mb-4">Frontend Base Setup Complete ✓</p>
            <p className="text-sm">Next.js • Tailwind • Framer Motion • ShadCN UI</p>
          </div>
        </div>
      </div>
    </main>
  );
}
