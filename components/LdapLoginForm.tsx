
"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { ldapLogin } from '@/lib/serveractions/actions'
import { useFormStatus } from 'react-dom'
import { searchBySamAccountName } from '@/lib/ldapConfig'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'


const LdapLoginForm = () => {
    const [state,setState] = useState(false)
    const [message,setMessage] = useState("")
    const {pending} = useFormStatus();
  return (
   
    <form action={async (formdata:FormData) => {
        
        const response= await searchBySamAccountName("murat.hayaloglu")
        
        if (!response) {
            setState(true)
            setMessage("Invalid username or password")
        } 
        if (response) {
          console.log(response)
            setState(true)
            setMessage("Kullanıcı başarılı şekilde doğrulandı")
        }

        


    

    }} 
        
        className="flex flex-col gap-6" >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold font-rubik">Giriş Yapın</h1>
        <p className="text-balance text-sm text-slate-500 dark:text-slate-400">
          E-posta ve şifrenizle giriş yapın
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">E-Posta</Label>
          <Input id="email" name="email" type="text" placeholder="isim.soyisim" required />
          
          
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Şifre</Label>
            
          </div>
          <Input id="password" name="password"   type="password" required />
          
        </div>
        <Button disabled={pending} type='submit' variant={'csgb'}>
                {pending?"Giriş yapılıyor...":"Giriş"}
        </Button>
        {state&& (
              <p className="text-red-500">{message}</p>
            )}
       
        
       
      </div>
      
    </form>
           
           
  )
}

export default LdapLoginForm