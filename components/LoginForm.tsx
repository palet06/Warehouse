import Image from 'next/image'
import React from 'react'
import { LoginFormClient } from './login-form'

const LoginForm = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            
              <Image src="/logo.svg" height={50} width={50} alt="logo"  />
            
            UIGM Warehouse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginFormClient />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-slate-100 lg:block dark:bg-slate-800">
        <Image
          src="/csgb.webp"
          alt="Csgb"
        fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default LoginForm