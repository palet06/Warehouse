"use client";
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
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useGlobalState } from "@/lib/globalState";

export default function CreateJobCard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isActive, toggleActive } = useGlobalState();
  const [inputTime, setInputTime] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");

  const handleCreateJob = async () => {
    try {
      const formattedTime = `${inputTime.split(":")[1]} ${
        inputTime.split(":")[0]
      } * * *`;
      const jobToCreate = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          schedule: formattedTime,
          name: inputName,
        }),
      });
      const jobToCreateJson = await jobToCreate.json();
      if (jobToCreateJson.success) {
        toast({
          title: "Başarılı",
          description: jobToCreateJson.message,
          variant: "success",
        });
        toggleActive();
      } else {
        toast({
          title: "Uyarı",
          description: jobToCreateJson.message,
          variant: "warning",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: `Job oluşturma hatası ${error}`,
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-[350px] h-[300px] bg-slate-200 shadow-none ">
      <CardHeader>
        <CardTitle className="text-lg">Zamanlanmış Görev Oluşturun</CardTitle>
        <CardDescription className="text-sm">
          Belirli bir zamanda çalışması için görev oluşturabilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                onChange={(e) => setInputName(e.currentTarget.value)}
                id="name"
                name="name"
                placeholder="Görev ismi belirtin"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                onChange={(e) => setInputTime(e.currentTarget.value)}
                type="time"
                id="time"
                name="time"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex w-full justify-between p-2">
        <Button
          disabled={!inputName || !inputTime}
          onClick={handleCreateJob}
          className=" w-full"
        >
          Oluştur
        </Button>
      </CardFooter>
    </Card>
  );
}
