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
import { toast } from "@/hooks/use-toast";
import { useGlobalState } from "@/lib/globalState";
type prismaJobType = {
  id: number;
  schedule: string;
  name: string;
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function JobsTable() {
  const { isActive } = useGlobalState();
  const [currentCreatedJobs, setCurrentCreatedJobs] = useState<prismaJobType[]>(
    []
  );

  useEffect(() => {
    const fetchJobs = async () => {
      const getCreatedJobs = await fetch("/api/jobs", {
        method: "POST",
        body: JSON.stringify({ action: "getall" }),
      });
      const getCreatedJobsJson = await getCreatedJobs.json();
      if (getCreatedJobsJson.success) {
        setCurrentCreatedJobs(getCreatedJobsJson.allJobs);
      }
      if (!getCreatedJobsJson.success) {
        setCurrentCreatedJobs([]);
        toast({
          title: "Hata",
          description: getCreatedJobsJson.message,
          variant: "destructive",
        });
      }
    };

    fetchJobs();
  }, [isActive]);

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
          {!currentCreatedJobs?.length && (
            <TableRow className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4">-</TableCell>
              <TableCell className="font-medium">Görev Yok</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          )}
          {currentCreatedJobs?.map((job, i) => (
            <TableRow key={job.id} className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4">{(i + 1).toString()}</TableCell>
              <TableCell className="pl-4">{job.name}</TableCell>
              <TableCell className="font-medium">
                {job.schedule.split(" ")[1]}:{job.schedule.split(" ")[0]}
              </TableCell>
              <TableCell>{job.isRunning ? "Evet" : "Hayır"}</TableCell>

              <TableCell>
                <JobActionButton name={job.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
