import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomDialogTableProps {
  caption?: string |undefined|null;
  tableHeaderNames?: string[] | undefined|null;
  tableCells?: string[] | undefined| null;
}

const CustomDialogTable = ({
  caption,
  tableHeaderNames,
  tableCells,
}: CustomDialogTableProps) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {tableHeaderNames?.map((tableHead, index) => (
            <TableHead key={index}>{tableHead}</TableHead>
          ))}

          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {tableCells?.map((cell, index) => (
            <TableCell key={index}>{cell}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CustomDialogTable;
