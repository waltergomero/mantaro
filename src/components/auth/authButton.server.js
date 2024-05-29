import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth";

import AuthButtonClient from "./authButton.client";

export default async function AuthButtonServer() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}