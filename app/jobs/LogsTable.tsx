
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default async function LogsTable() {
  
  
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
