"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgTable from "./AgTable";
import { toast } from "@/hooks/use-toast";
import {
  GetSpesificDataFromWarehouse
  ,
} from "@/lib/serveractions/actions";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { DetailedQueryDialog } from "./DetailedQuery/DetailedQueryDialog";



export function SearchableDataTable({
  userName,
  userToken,
}: {
  userName: string;
  userToken: string;
}) {
  

  const [basvuruNo, setBasvuruNo] = useState("");
  const [tableData, setTableData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (basvuruNo.length > 0) {
      const isValid = /^[0-9\s]+$/.test(basvuruNo);

      if (!isValid || basvuruNo.startsWith(" ")) {
        toast({
          title: "Geçersiz Karakter",
          description: "Başvuru No sadece 0-9 ve boşluk içerebilir.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      try {
        const data = await GetSpesificDataFromWarehouse(basvuruNo);

        if (data?.data.empty) {
          setTableData([]);
          toast({
            title: "Kayıt Yok",
            description: `Herhangi bir kayıt bulunamadı`,
            variant: "destructive",
          });
        } else {
          setTableData(data!.data.content);
          toast({
            title: "Başarılı",
            description: `Veriler başarıyla getirildi\n ${data?.data.content.length} kayıt\n`,
            variant: "success",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (error: any) {
        setTableData([]);
        toast({
          title: "Hata",
          description: `Veri getirilirken hata oluştu. `,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center flex-row gap-4 mb-4">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          type="text"
          value={basvuruNo}
          onChange={(e) => setBasvuruNo(e.target.value)}
          placeholder="Başvuru No / YKN giriniz"
          className="max-w-xs"
        />
        <Button variant="csgb" onClick={handleSearch}>
          Sorgula
        </Button>
        

        <p> Çoklu sorgu için başvuru numaraları arasına boşluk bırakın</p>
      </div>
      <DetailedQueryDialog />

      {tableData && (
        <AgTable
          data={tableData}
          loading={loading}
          userName={userName}
          userToken={userToken}
        />
      )}
    </>
  );
}
