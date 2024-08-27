import 'bootstrap/dist/css/bootstrap.min.css';

import { Chat } from '@/components/Pages/Chat';
import { headers } from 'next/headers';

export default function ChatPage() {
  const headersList = headers();
  const emailHeader = headersList.get('x-goog-authenticated-user-email');
  const email: string = emailHeader?.replaceAll('accounts.google.com:','') ?? "user1@google.com";
  const isDevelopment = process.env.NODE_ENV === 'development';
  const userEmail = isDevelopment ? process.env.NEXT_PUBLIC_USER_EMAIL ?? "user2@example.com" : email;
  const API_ENDPOINT = process.env.BACKEND_ENDPOINT + "/chat_stream?email=" + userEmail
  
  
  return (
      <div>
          <Chat userEmail={userEmail} API_ENDPOINT={API_ENDPOINT}  />
      </div>
  );
}