'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      redirect('/dashboard');
    }
    
    if (status === 'unauthenticated') {
      signIn('keycloak', {
        redirect: true,
        callbackUrl: '/dashboard',
      });
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Přihlášení
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Přesměrování na přihlašovací stránku...
          </p>
        </div>
      </div>
    </div>
  );
}