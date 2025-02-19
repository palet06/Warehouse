"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGlobalState } from "@/lib/globalState";
import { getLogs } from "@/lib/serveractions/prismaActions";

import { useEffect, useState } from "react";


type LogPrpos = {
  job:string;
  message:string;
  dataCount:number;
  time:string;
}[] | undefined



export default function LogsTable() {
  const { isActive } = useGlobalState();
  
 
  const [ourLogs, setOurLogs] = useState<LogPrpos>();
  useEffect(() => {
    const fetchLogs = async () => {
      const allLogs:LogPrpos = await getLogs()
      if (allLogs) {
        setOurLogs(allLogs)
      }
     }
    
    fetchLogs()
    
   
  }, [isActive]);

  return (
    <div className="w-full h-[310px] border rounded-md overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-center">Job İsmi</TableHead>
            <TableHead className="text-center">Yapılan İşlem</TableHead>
            <TableHead className="text-center">Çekilen Data</TableHead>
            <TableHead className="text-center">İşlem Zamanı</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {ourLogs?.map((log,i) => (
            <TableRow key={i} className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4 text-center">{log.job}</TableCell>
              <TableCell className="pl-4 text-center">{log.message}</TableCell>
              <TableCell className="pl-4 text-center">{log.dataCount}</TableCell>
              <TableCell className="font-medium text-center">{log.time}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
