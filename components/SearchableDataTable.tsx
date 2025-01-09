"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgTable from "./AgTable";
import { toast } from "@/hooks/use-toast";

export function SearchableDataTable() {
  const [basvuruNo, setBasvuruNo] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleSearch = async () => {
    if (basvuruNo.length > 0) {
    const isValid = /^[0-9\s]+$/.test(basvuruNo);
    
    if (!isValid) {
      toast({
      title: "Geçersiz Karakter",
      description: "Başvuru No sadece 0-9 ve boşluk içerebilir.",
      variant: "destructive",
      });
      return;
    }

      try {
        const response = await fetch(`/api/search?basvuruNo=${basvuruNo}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
             
          if (data.empty) {
            setTableData([]);
            toast({
              title: "Kayıt Yok",
              description: `Herhangi bir kayıt bulunamadı`,
              variant: "destructive",
            });           
            
          } else if (!data.empty) {
            setTableData(data.content);
            toast({
              title: "Başarılı",
              description: `Veriler başarıyla getirildi\n ${data.content.length} kayıt\n`,
              variant: "success",
            });
          } 
        
        
      } 
      catch (error) {        
        toast({
          title: "Hata",
          description: `Bu tipte veri sorgulanamaz ${error} `,
          variant: "destructive",
        });
      }
    } else if (basvuruNo.length == 0) {
      try {
        const response = await fetch(`/api/search`);
        const data = await response.json();
        
        if (data.empty) {
          setTableData([]);
          toast({
            title: "Kayıt Yok",
            description: `Herhangi bir kayıt bulunamadı`,
            variant: "destructive",
          });           
          
        } else if (!data.empty) {
          setTableData(data.content);
          toast({
            title: "Başarılı",
            description: `Veriler başarıyla getirildi\n ${data.content.length} kayıt\n`,
            variant: "success",
          });
        }
        
      } catch (error) {
        console.error("Sorgulama hatası:", error);
        toast({
          title: "Hata",
          description: `Bu tipte veri sorgulanamaz ${error} `,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="flex items-center flex-row gap-4 mb-4">
        <Input
          type="text"
          value={basvuruNo}
          onChange={(e) => setBasvuruNo(e.target.value)}          
          placeholder="Başvuru / YKN giriniz"
          className="max-w-xs"
          
         />
        <Button variant="csgb" onClick={handleSearch}>
          Sorgula
        </Button>
        <p>Çoklu sorgu için başvuru numaraları arasına boşluk bırakın</p>
      </div>
      {tableData && <AgTable data={tableData} />}
    </>
  );
}
