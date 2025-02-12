"use client"
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";


export default function CreateJobCard() {
   const [currentCreatedJobs,setCurrentCreatedJobs] = useState<any[any[]]>([[]])
  

  useEffect(() => {

    const fetchJobs = async () => {
      const response = await fetch("/api/jobs/get",{method:"GET"})
      
      const anyJob = await response.json()
      console.log("json olarak çevrilen",anyJob)
      setCurrentCreatedJobs(anyJob.job)  
           
       
       console.log("fonksiyona girdi")
    }


  fetchJobs()
    
  })




  const handleCreateJob = async ()=> {
    try {
      const jobToCreate = await fetch("/api/jobs/get",{method:"POST",body:JSON.stringify({name:"Deneme2",time:"*/1 * * * *"})})
      toast({title:"Başarılı",description:`${jobToCreate} Job'u oluşturuldu`,variant:"success"})

      
    } catch (error) {
      
    }
  }
  
  
  return (
  
    <Card className="w-[350px] bg-slate-200 shadow-none ">
      <CardHeader >
        <CardTitle className="text-lg">Zamanlanmış Görev Oluşturun</CardTitle>
        <CardDescription className="text-sm">
          Belirli bir zamanda çalışması için görev oluşturabilirsiniz.
          {currentCreatedJobs?.map((d,i)=>(<p key={i}>{d}</p>))}
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name" name="name"  placeholder="Görev ismi belirtin" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input type="time" id="time" name="time"   />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              
              <TimePicker />
            </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex w-full justify-between p-2">
        
        <Button onClick={handleCreateJob} className=" w-full"  >Oluştur</Button>
      </CardFooter>
    </Card>
  );
}
