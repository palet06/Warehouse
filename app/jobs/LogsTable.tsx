"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Log, useLogStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function LogsTable() {
  const { logs } = useLogStore();
  const [ourLogs, setOurLogs] = useState<Log[]>();
  useEffect(() => {
    setOurLogs(logs);
  }, [logs]);

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-center">ID</TableHead>
            <TableHead className="text-center">Yapılan İşlem</TableHead>
            <TableHead className="text-center">İşlem Zamanı</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {ourLogs?.map((log) => (
            <TableRow key={log.id} className="odd:bg-muted/50 text-center">
              <TableCell className="pl-4 text-center">{log.id}</TableCell>
              <TableCell className="pl-4 text-center">{log.message}</TableCell>
              <TableCell className="font-medium text-center">{log.time}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
