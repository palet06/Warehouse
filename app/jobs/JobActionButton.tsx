"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useGlobalState } from "@/lib/globalState";

import { ChevronDown, Pause, Play, X } from "lucide-react";

const JobActionButton = ({name}:{name:string}) => {
   const { toggleActive } = useGlobalState();
  const handleActions = async (action:string,jobName:string)=> {
    switch (action) {
      case "start":
        const jobToStart = await fetch("/api/jobs", { method: "POST" ,body:JSON.stringify({action:action,name:jobName})});
        const jobToStartJson = await jobToStart.json();
        if (jobToStartJson.success)
        {
          toast({title:"Başarılı",description:jobToStartJson.message,variant:"success"})
          toggleActive()
        } else {
          toast({title:"Hata",description:jobToStartJson.message,variant:"destructive"})
        }        
        break;

        case "stop":
        const jobToStop = await fetch("/api/jobs", { method: "POST" ,body:JSON.stringify({action:action,name:jobName})});
        const jobToStopJson = await jobToStop.json();
        if (jobToStopJson.success)
        {
          toast({title:"Başarılı",description:jobToStopJson.message,variant:"success"})
          toggleActive()
        } else {
          toast({title:"Hata",description:jobToStopJson.message,variant:"destructive"})
        }        
        break;

        case "delete":
        const jobToDelete = await fetch("/api/jobs", { method: "POST" ,body:JSON.stringify({action:action,name:jobName})});
        const jobToDeleteJson = await jobToDelete.json();
        if (jobToDeleteJson.success)
        {
          toast({title:"Başarılı",description:jobToDeleteJson.message,variant:"success"})
          toggleActive()
        } else {
          toast({title:"Hata",description:jobToDeleteJson.message,variant:"destructive"})
        }        
        break;
    
      default:
        break;
    }
  }


  return (
    <div className="[&>*]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md divide-x divide-border/40">
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="csgb" size="icon">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-52">
          
          <DropdownMenuItem onClick={()=>handleActions("start",name)} ><Play className="text-green-500"/>Başlat</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>handleActions("stop",name)} ><Pause className="text-yellow-500" />Durdur</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>handleActions("delete",name)}><X className="text-csgbBgRed"/>Sil</DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default JobActionButton;
