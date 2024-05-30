"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/auth/helpers";
import { ArrowLeftStartOnRectangleIcon} from '@heroicons/react/24/outline';


export default function SignOut() {
  const session = useSession();

  return  (
    <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    onClick={async () => {
        await signOut();
        await signIn(); //to make changes go to auth/index.js and change the redirect url
     
      }}
    >
    <ArrowLeftStartOnRectangleIcon width="24" height= "24" />
    Log Out
  </button>

  ) 
}