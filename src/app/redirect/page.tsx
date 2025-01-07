'use client'

import { useEffect, useState } from 'react'
import { getTokenDashboard as getTokenDashboardLink } from '@/services/api' // Předpokládám, že máte tuto API funkci
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { mockedBackend } from '@/services/MockedBackend'
import { isDevelopment } from '@/utils/environment'
import { developmentConfig } from '@/config/development'

export default function RedirectPage() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const fetchAndRedirect = async () => {
    try {
      const dashboards = await getTokenDashboardLink(session?.accessToken!)
      if (dashboards && dashboards.dashboardPath.length > 0) {
        router.push(dashboards.dashboardPath[0]) // Přesměrování na první dashboard v poli
      }
      else {
          router.push('/api/auth/login?error=no_dashboard')
      }
    } catch (error) {
      console.error('Chyba při načítání dashboardů:', error)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/login');
      return;
    }

    // Pokud je v development prostredi, simulujeme autorizaci uzivatele
    if (isDevelopment && session?.accessToken && session?.user?.email) {
      const mockUser = developmentConfig.mockUsers.find(
        user => user.email === session.user.email
      );
      
      if (mockUser) {
        mockedBackend.registerToken(
          session.accessToken,
          mockUser.roles,
          mockUser.permissions
        );
      }
    }

    fetchAndRedirect()
  }, [status, session, router])

  return <div>Přesměrovávám...</div>
}
