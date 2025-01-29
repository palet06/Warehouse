"use client"

import {
  
    LogOut,
    User,
   
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    
    DropdownMenuItem,
    DropdownMenuLabel,
    
    DropdownMenuSeparator,
  
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/serveractions/actions"
import MyTimer from "./MyTimer"
  
  export function UserInfo({label,userName,sessionExpires}:{label:string,userName:string,sessionExpires:number}) {
   
    
    return (
      <DropdownMenu >
        <DropdownMenuTrigger  asChild>
        
          <Button className="outline-none  text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-csgbBgRed focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  dark:focus-visible:ring-slate-300 " variant="link"> <User className="text-white" /> {userName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex gap-2">{label} - <MyTimer expTimestamp={sessionExpires} /></DropdownMenuLabel>
          
          
          <DropdownMenuSeparator />

          
                  
          <DropdownMenuSeparator />
                   <DropdownMenuItem>
            <LogOut />
            
            <a onClick={() => logout()}>Çıkış Yap</a>
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  