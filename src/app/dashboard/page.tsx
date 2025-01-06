'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Načítání...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="bg-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Uživatelský Dashboard</h1>
            <p className="text-emerald-200">Aktuální cesta: /dashboard</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/api/auth/login' })}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Odhlásit se
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Informace o přihlášení</h2>
            <p className="text-gray-600">Přihlášený uživatel: {session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}