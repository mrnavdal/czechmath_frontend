'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/dashboard');
    }
  }, [status]);

  const handleLogin = () => {
    signIn('keycloak');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Přihlášení do CzechMath
          </h2>
        </div>
        <button
          onClick={handleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Přihlásit se
        </button>
      </div>
    </div>
  );
} 