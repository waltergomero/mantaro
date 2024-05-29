import React from 'react'
import { auth } from "../../../auth/index";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <>
    <h1>Dashboard Page</h1>
    <div>User: {session?.user?.email}</div>
    </>
    
  )
}

export default DashboardPage