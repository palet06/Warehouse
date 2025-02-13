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
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { JobList } from "../types/JobType";

import { useJobStore } from "@/store/store";
export default function CreateJobCard() {
  const [inputTime, setInputTime] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [currentCreatedJobs, setCurrentCreatedJobs] = useState<JobList>();
  const { addJob, jobs } = useJobStore();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobs/get", { method: "GET" });
      const getJobs: JobList = await response.json();

      setCurrentCreatedJobs(getJobs);
    };

    fetchJobs();
    console.log(jobs);
  }, [jobs]);

  const handleCreateJob = async () => {
    try {
      const foundCreatedJob = currentCreatedJobs?.find(
        ([name]) => name === inputName
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const foundSameTimeJob = currentCreatedJobs?.find(([name, job]) => {
        const [minute, hour] = job._scheduler.timeMatcher.pattern
          .split(" ")
          .map((val) => val.padStart(2, "0")); // Tek haneli saat ve dakikaları 2 haneli yap

        const jobTime = `${minute}:${hour}`; // Job'un zamanını HH:mm formatına çevir
        console.log("jobtime", jobTime);
        console.log("inputtime", inputTime);

        return jobTime === inputTime;
      });

      if (foundCreatedJob) {
        toast({
          title: "UYARI",
          description: `${foundCreatedJob[1].options.name} isminde bir görev zaten mevcut. Lütfen başka bir isim belirtin`,
          variant: "warning",
        });
      }

      if (foundSameTimeJob) {
        toast({
          title: "UYARI",
          description: `${foundSameTimeJob[1].options.name} ismindeki görev aynı çalışma zamanına sahip. ${inputTime} Zamanı değiştirin`,
          variant: "warning",
        });
      }
      if (!foundCreatedJob && !foundSameTimeJob) {
        const response = await fetch("/api/jobs/get", {
          method: "POST",
          body: JSON.stringify({
            name: inputName,
            time: `${inputTime.split(":")[0]} ${
              inputTime.split(":")[1]
            } * * * *`,
          }),
        });
        const jobToCreate = await response.json();
        addJob(inputName, inputTime, false);
        toast({
          title: "Başarılı",
          description: jobToCreate.message,
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Job oluşturma hatası:", error);
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
        <Button onClick={handleCreateJob} className=" w-full">
          Oluştur
        </Button>
      </CardFooter>
    </Card>
  );
}
