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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-700">
            Vítejte v aplikaci CzechMath! Toto je váš dashboard.
          </p>
          <p className="text-gray-600 mt-2">
            Přihlášen jako: {session?.user?.name}
          </p>
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Odhlásit se
          </button>
        </div>
      </div>
    </div>
  );
} 