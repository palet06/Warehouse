"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/lib/serveractions/actions";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";

export function LoginFormClient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [state, loginAction] = useActionState(login, undefined);
  const [email,setEmail] = useState<string>("")
const [password,setPassword] = useState<string>("")  
  
  
  
  
  return (
    <form action={loginAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold font-rubik">Giriş Yapın</h1>
        <p className="text-balance text-sm text-slate-500 dark:text-slate-400">
          E-posta ve şifrenizle giriş yapın
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-Posta</Label>
          <Input id="email" name="email" type="text" placeholder="isim.soyisim" required value={email} onChange={(e)=> setEmail(e.target.value)} />
          
          {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Şifre</Label>
            
          </div>
          <Input id="password" name="password"   type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}  />
          {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
        </div>
        <SubmitButton  />
       
        
       
      </div>
      
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="mb-5">
      <Button disabled={pending} type="submit" className="w-full bg-csgbBgRed hover:bg-csgbMenuBgRed hover:outline-black hover:outline hover:outline-1">
    Giriş
  </Button>
    </div>
    
  );
}
