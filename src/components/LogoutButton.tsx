import { AppRoutes } from '@/utils/AppRoutes';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  backgroundColor?: string;
  callbackUrl?: string;
}

export default function LogoutButton({ 
  backgroundColor = 'bg-emerald-500',
  callbackUrl = AppRoutes.LOGIN_WITH_LOGOUT
}: LogoutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl })}
      className={`${backgroundColor} hover:${backgroundColor.replace('bg-', 'bg-')}/80 text-white px-4 py-2 rounded-lg transition-colors`}
    >
      Odhlásit se
    </button>
  );
} 