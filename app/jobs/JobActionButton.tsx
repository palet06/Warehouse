"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Pause, Play, X } from "lucide-react";

const JobActionButton = () => {
  return (
    <div className="[&>*]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md divide-x divide-border/40">
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="csgb" size="icon">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-52">
          
          <DropdownMenuItem onClick={()=>fetch("/api/fetch/startjob")}><Play className="text-green-500"/> Başlat</DropdownMenuItem>
          <DropdownMenuItem><Pause className="text-yellow-500" /> Durdur</DropdownMenuItem>
          <DropdownMenuItem><X className="text-csgbBgRed"/>Sil</DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default JobActionButton;
