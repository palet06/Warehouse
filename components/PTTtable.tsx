"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquareWarning } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ExcelExport from "@/app/statistics/ExcelExport";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PTTtable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, 
        pageSize: 10, 
      },
    },
  });


  return (
    <div className="flex flex-col">
      <div className="w-full mx-auto mt-2">
        {table.getRowModel().rows?.length ? (
          <div className="flex w-[580px] h-[50px] border mx-auto items-center px-2 justify-between rounded-md">
            <div className="flex flex-row items-center">
             <p className="w-[200px]">Satır sayısı:</p>
              <Select defaultValue="10" onValueChange={(value)=> table.setPageSize(Number(value))}>
                <SelectTrigger>
                  <SelectValue defaultValue="10"  />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <ExcelExport data={data} fileName="istatistik"/>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="rounded-md overflow-y-auto mt-2">
          <Table className="table-fixed border-none ">
            <TableHeader className="bg-slate-400 border-none border-b-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-white">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="odd:bg-white even:bg-gray-50"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="w-full flex flex-col items-center justify-center h-[250px] text-center">
                  <TableCell colSpan={columns.length}>
                    <MessageSquareWarning className="text-csgbBgRed/60 w-20 h-20" />
                    <p className="text-2xl text-gray-500">Veri Yok</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {table.getRowModel().rows?.length ? (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Önceki
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Sonraki
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
