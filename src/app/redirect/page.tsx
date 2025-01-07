'use client'

import { useEffect, useState } from 'react'
import { getTokenDashboard as getTokenDashboardLink } from '@/services/api' // Předpokládám, že máte tuto API funkci
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { mockedBackend } from '@/services/MockedBackend'
import { isDevelopment } from '@/utils/environment'
import { developmentConfig } from '@/config/development'
import { AppRoutes } from '@/utils/AppRoutes'
export default function RedirectPage() {
  const router = useRouter()
  const { data: session, status } = useSession();


  useEffect(() => {
    
    const fetchAndRedirect = async () => {
      try {
        const dashboards = await getTokenDashboardLink(session?.accessToken!)
        if (dashboards && dashboards.dashboardPath.length > 0) {
          router.push(dashboards.dashboardPath[0]) // Přesměrování na první dashboard v poli
        }
        else {
            router.push(AppRoutes.LOGIN_NO_DASHBOARD)
        }
      } catch (error) {
        console.error('Chyba při načítání dashboardů:', error)
      }
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
    if (status === 'unauthenticated') {
      router.push('/api/auth/login');
      return;
    }

    if (status === 'authenticated') {
      fetchAndRedirect()
    }
  }, [status, session, router])

  return <div>Přesměrovávám...</div>
}
