import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { MockedBackend } from '@/services/MockedBackend';
import { AppRoutes } from '@/utils/AppRoutes';

export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
        router.push(AppRoutes.LOGIN);
        return;
    }

    if (!session) {
      router.push(AppRoutes.LOGIN);
      return;
    }

   

  }, [session, status, router, pathname]);

  return { status };
}
