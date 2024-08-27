import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from '@/components/Pages/Home';
import { headers } from 'next/headers';
import { ChatWrapper } from '@/components/Pages/Chat';

export default function HomePage() {
  const headersList = headers();
  const emailHeader = headersList.get('x-goog-authenticated-user-email');
  const email: string = emailHeader?.replaceAll('accounts.google.com:','') ?? "user1@google.com";
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  const userEmail = isDevelopment ? process.env.NEXT_PUBLIC_USER_EMAIL ?? "user2@example.com" : email;
  
  
  return (
      <div>
          <Home userEmail={userEmail} />;
      </div>
  );
}