'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AppRoutes } from '@/utils/AppRoutes';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'Došlo k neočekávané chybě.';
  
  if (error === 'Configuration') {
    errorMessage = 'Chyba konfigurace přihlášení.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'Přístup zamítnut.';
  } else if (error === 'Verification') {
    errorMessage = 'Ověření se nezdařilo.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Chyba přihlášení
          </h2>
        </div>
        <div className="mt-2">
          <p className="text-center text-red-600">
            {errorMessage}
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link 
            href={AppRoutes.LOGIN}
            className="text-blue-600 hover:text-blue-800"
          >
            Zpět na přihlášení
          </Link>
        </div>
      </div>
    </div>
  );
}
