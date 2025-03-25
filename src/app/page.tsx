import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookieStore = cookies();
  const userToken = cookieStore.get('auth-token'); // Tjek om der er en auth-cookie

  if (userToken) {
    redirect('/dashboard'); // Hvis brugeren er logget ind, send til dashboard
  } else {
    redirect('/landing'); // Ellers send til landing page
  }
}

