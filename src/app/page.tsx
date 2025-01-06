import { redirect } from 'next/navigation';

export default function Home() {
  // This will be replaced with actual auth check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to CzechMath</h1>
    </main>
  );
}
