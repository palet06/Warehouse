import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ExcelExport from "./ExcelExport";
import { format } from "date-fns";
import { OctagonAlert } from "lucide-react";

interface QueryTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | null;
  initialRowsPerPage: number;
}






const QueryTable = ({ data, initialRowsPerPage }: QueryTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col w-full h-[400px] items-center justify-center border">
        <OctagonAlert height={250} width={250} className="text-csgbBgRed/20" />
        
        {/* <p className="text-2xl text-csgbBgRed">Gösterilecek herhangi bir veri bulunmamaktadır.</p> */}
      </div>
    );
  }
  const headers = Object.keys(data[0]);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  const totalRows = sortedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSort = (key:any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sayfa değiştirme işlemleri
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goToPage = (page:any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Satır sayısını değiştirme
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowsPerPageChange = (event:any) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Yeni satır sayısına göre sayfa sıfırlanır
  };
  const todayDate = new Date();
  const formatedDate = format(todayDate,"dd.MM.yyyy hh:mm")
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex flex-row w-[580px]  items-center justify-between">
        <div className="flex items-center  ">
          <label htmlFor="rowsPerPage" className="mr-2">
            Sayfada şu kadar kayıt göster
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            defaultValue={initialRowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 px-2 py-1"
          >
            {[10, 25, 50, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          

            
<ExcelExport data={data} fileName={`${formatedDate} - Sorgu`} />
        </div>
      </div>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            {headers.map((header, i) => (
              <TableHead
                className="sticky top-0 bg-csgbBgRed/20 text-black font-bold w-[350px]"
                key={i}
                onClick={() => handleSort(header)}
              >
                {header}{" "}
                {sortConfig.key === header && (
                  <span className="ml-2 cursor-pointer">
                    {sortConfig.direction === "asc" ? "🔼" : "🔽"}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, y) => (
                <TableCell key={y}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Kontrolleri */}
      <div className="flex max-w-full justify-between items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Önceki
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 border border-gray-300 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default QueryTable;
