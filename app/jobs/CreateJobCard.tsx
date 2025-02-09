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
import TimePicker from "./TimePicker";


export default function CardWithBackground() {
  return (
    <Card className="w-[350px] bg-slate-200 shadow-none ">
      <CardHeader >
        <CardTitle className="text-lg">Zamanlanmış Görev Oluşturun</CardTitle>
        <CardDescription className="text-sm">
          Belirli bir zamanda çalışması için görev oluşturabilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="name"  placeholder="Görev ismi belirtin" />
            </div>
            <div className="flex flex-col space-y-1.5">
              
              <TimePicker />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex w-full justify-between p-2">
        
        <Button className=" w-full" onClick={()=>fetch("/api/fetch")} >Oluştur</Button>
      </CardFooter>
    </Card>
  );
}
