'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import { AppRoutes } from '@/utils/AppRoutes';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
  
    if (status === 'unauthenticated') {
      router.push(AppRoutes.LOGIN);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Načítání...</div>
      </div>
    );
  }
  

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-indigo-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Administrátorský Dashboard</h1>
              <p className="text-indigo-200">Aktuální cesta: {pathname}
              </p>
            </div>
            <LogoutButton backgroundColor="bg-indigo-500" />
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
}
