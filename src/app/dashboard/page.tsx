'use client';

import DashboardLayout from '@/components/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Uživatelský Dashboard"
      colorTheme={{
        bg: "bg-gray-100",
        text: "text-blue-600", 
        buttonBg: "bg-blue-500"
      }}
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vítejte v uživatelském dashboardu</h2>
          <p className="text-gray-600">Zde budou zobrazeny vaše informace a možnosti.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}