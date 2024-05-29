//import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "../auth/index";
import AuthButtonServer from "../components/auth/authButton.server";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const session = await auth();
  return (
    <>

        <h1>Home Page</h1>
        <Link href="/auth/signin">Login</Link>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButtonServer />
    </>
  );
}

