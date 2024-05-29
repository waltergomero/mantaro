'use client';
 
import { useSession, SessionProvider } from 'next-auth/react';
 
const UserName = () => {
  const session = useSession();
  console.log(session.data.user.first_name);
  return (
    <SessionProvider>
      <p>Welcome {session.data.user.first_name + ' ' + session.data.user.last_name}</p>
    </SessionProvider>
  )
}

export default UserName;