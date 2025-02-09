
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getLogsLan = async () => {
  const data = await fetch("http://localhost:3000/api/getlogs")
  const sonuc = await data.json()
  return sonuc
}

export default async function LogsTable() {
  const jobLogs =await getLogsLan()
  
  
  console.log("joblogs",jobLogs)
  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 text-center">ID</TableHead>
            <TableHead className="text-center">Görev İsmi</TableHead>
            <TableHead className="text-center">Çalışacağı Zaman</TableHead>
            <TableHead className="text-center">Yapılan İşlem</TableHead>
            <TableHead className="text-center">İşlem Zamanı</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
         
        </TableBody>
      </Table>
    </div>
  );
}
