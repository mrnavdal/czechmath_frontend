'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import { AppRoutes } from '@/utils/AppRoutes';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout
      title="Administrátorský Dashboard"
      colorTheme={{
        bg: "bg-gray-100",
        text: "text-purple-600",
        buttonBg: "bg-purple-500"
      }}
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vítejte v administrátorském dashboardu</h2>
          <p className="text-gray-600">Zde budou zobrazeny administrátorské nástroje a přehledy.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
