"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JobActionButton from "./JobActionButton";
import { useEffect, useState } from "react";
import { JobList } from "../types/JobType";
import { useJobStore } from "@/store/store";

export default function JobsTable() {  
  const [ourJobs, setOurJobs] = useState<JobList>();  
  const {jobs} = useJobStore()
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobs/get", { method: "GET" });
      const jobList: JobList = await response.json();
      setOurJobs(jobList);
    }
    fetchJobs()
    
  },[jobs]);
  return (
    <div className="w-full h-[300px] border rounded-md overflow-y-auto">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-center ">ID</TableHead>
            <TableHead className="text-center">Görev İsmi</TableHead>
            <TableHead className="text-center">Çalışacağı Zaman</TableHead>
            <TableHead className="text-center">Aktif Mi</TableHead>
            <TableHead className="text-center">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!ourJobs?.length && (
            <TableRow className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4">-</TableCell>
              <TableCell className="font-medium">Görev Yok</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          )}
          {ourJobs?.map((job,i) => (
            <TableRow key={job[0]} className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4">{(i+1).toString()}</TableCell>
              <TableCell className="pl-4">{job[1].options.name}</TableCell>
              <TableCell className="font-medium">{`${job[1]._scheduler.timeMatcher.pattern.split(" ")[0].padStart(2, "0")}:${job[1]._scheduler.timeMatcher.pattern.split(" ")[1].padStart(2, "0")}`}
              </TableCell>
              <TableCell>{job[1].options.scheduled?"Evet":"Hayır"}</TableCell>
              
              <TableCell>
                <JobActionButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
