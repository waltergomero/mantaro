import React from 'react'
import LoginForm from  '@/components/auth/login-form' 

const LoginPage = () => {
  return (
    <main className="w-full flex items-center justify-center min-h-screen">
        <div className="w-150 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4  ">
        <h3 className="mb-1.5 mt-4  text-center text-2xl font-semibold text-black dark:text-white">
                Login
              </h3>
              <p className="font-medium text-center ">Please enter your credentials</p>
         <LoginForm/>
  
        </div>
    </div>
    </main>
    
  )
}

export default LoginPage