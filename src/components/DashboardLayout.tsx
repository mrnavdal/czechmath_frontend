import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';


type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
  colorTheme: {
    bg: string;
    text: string;
    buttonBg: string;
  };
};

export default function DashboardLayout({ 
  children, 
  title,
  colorTheme 
}: DashboardLayoutProps) {
  const { status } = useAuthRedirect();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Načítání...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colorTheme.bg}`}>
      <div className={`${colorTheme.text} shadow-lg`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className={colorTheme.text}>Aktuální cesta: {pathname}</p>
          </div>
          <LogoutButton backgroundColor={colorTheme.buttonBg} />
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
} 