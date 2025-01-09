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
  
  export function UserInfo({label,userName,}:{label:string,userName:string}) {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger  asChild>
        
          <Button className="outline-none  text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-csgbBgRed focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  dark:focus-visible:ring-slate-300 " variant="link"> <User className="text-white" /> {userName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          
          
          <DropdownMenuSeparator />
                   <DropdownMenuItem>
            <LogOut />
            
            <span onClick={() => logout()}>Çıkış Yap</span>
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  