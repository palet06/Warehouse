
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ExcelExportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  fileName: string;
}

const ExcelExport: React.FC<ExcelExportProps> = ({ data, fileName }) => {
  const exportToExcel = () => {
    try {
      // Verinin boş olup olmadığını kontrol et
      if (!data || data.length === 0) {
        throw new Error("Dışa aktarılacak veri bulunamadı.");
      }

      // Excel çalışma sayfası oluştur
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Excel dosyasını oluştur
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Blob oluştur ve dosyayı indir
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `${fileName}.xlsx`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Excel dışa aktarımı sırasında bir hata oluştu:", error);
      alert(`Excel dışa aktarımı sırasında bir hata oluştu: ${error.message}`);
    }
  };
  return (
    <Button variant="csgb" onClick={exportToExcel}>
      <Image src="/excel.svg" height={30} width={30} alt="Excel" />
      Excel olarak indir
    </Button>
  );
};

export default ExcelExport;
