'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { AppRoutes } from '@/utils/AppRoutes';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const logout = searchParams.get('logout');

  useEffect(() => {
    // Don't redirect there is no dashboard
    if (error === 'no_dashboard') {
      return;
    }
    

    if (session?.accessToken) {
      redirect(AppRoutes.REDIRECT);
    }
    if (status === 'unauthenticated' || logout) {
      const result = signIn('keycloak', {
        redirect: true,
        callbackUrl: AppRoutes.LOGIN,
      });
      console.log(result);
    }
  }, [status, session, error, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Přihlášení
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === 'no_dashboard' 
              ? 'Pro váš účet není nastaven žádný dashboard.'
              : 'Přesměrování na přihlašovací stránku...'}
          </p>
          {error && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => signIn('keycloak', { callbackUrl: '/redirect' })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Přihlásit se znovu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}