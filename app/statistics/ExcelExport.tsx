import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <Button variant="csgb" onClick={exportToExcel}>
      <Image src="/excel.svg" height={30} width={30} alt="Excel" />
      Excel olarak indir
    </Button>
  );
};

export default ExcelExport;
