'use client'

import { useEffect, useState } from 'react'
import { getTokenDashboard } from '@/services/api' // Předpokládám, že máte tuto API funkci
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { mockedBackend } from '@/services/MockedBackend'

export default function RedirectPage() {
  const router = useRouter()
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;
    if (session?.accessToken){
      if (session?.user?.email === 'admin@test.cz') {
        mockedBackend.registerToken(session.accessToken!, ['admin'], ['/admin/dashboard']);
      } else if (session?.user?.email === 'normal@test.cz') {
        mockedBackend.registerToken(session.accessToken!, ['user'], ['/dashboard']);
      }
    }
    const fetchAndRedirect = async () => {
      try {
        const dashboards = await getTokenDashboard(session?.accessToken!)
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

    fetchAndRedirect()
  }, [router, status, session])

  return <div>Přesměrovávám...</div>
}
