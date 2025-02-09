import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import JobActionButton from "./JobActionButton";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products:any[] | null = [
    {
        id: 1,
        name: "WhDataFetch",
        category: "00:00",
        price: "Evet",
        rating: "Button",
      },
    
  ];
  
  export default function JobsTable() {
    return (
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader >
            <TableRow >
              <TableHead className="pl-4 text-center">ID</TableHead>
              <TableHead className="text-center">Görev İsmi</TableHead>
              <TableHead className="text-center">Çalışacağı Zaman</TableHead>
              <TableHead className="text-center">Aktif Mi</TableHead>
              <TableHead className="text-center">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {!products?.length&&<TableRow className="odd:bg-muted/50 text-center">
                <TableCell className="pl-4">-</TableCell>
                <TableCell className="font-medium">Görev Yok</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>}
            {products?.map((product) => (
              <TableRow key={product.id} className="odd:bg-muted/50 text-center">
                <TableCell className="pl-4">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell><JobActionButton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  