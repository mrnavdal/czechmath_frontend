import { redirect } from 'next/navigation';

export default function Home() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect('/api/auth/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to CzechMath</h1>
    </main>
  );
}
