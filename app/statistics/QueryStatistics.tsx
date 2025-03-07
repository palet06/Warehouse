"use client";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { GetStatistics } from "@/lib/serveractions/statistics";



import { Separator } from "@radix-ui/react-separator";

import Loading from "./Loading";
import { PTTtable } from "@/components/PTTtable";
import { ColumnDef } from "@tanstack/react-table";

const GetQueryResult = async (queryType: number) => {
  if (queryType == 0) {
    return;
  }

  try {
    const result = await GetStatistics(queryType);
    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return { message: "Veriler getirilirken hata oluştu." };
  }
};

export function QueryStatistics() {
  const [queryData, setQueryData] = useState<number>();
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);

// Dinamik sütun oluşturma fonksiyonu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateColumns = (data: any[]): ColumnDef<any>[] => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1), // İlk harfi büyük yap
  }));
};

const columnsGenerated = generateColumns(data)

  return (
    <>
      <div className=" flex min-w-full justify-center ">
        <Card className={cn("w-[580px]")}>
          <CardHeader>
            <CardTitle className="text-lg text-csgbBgRed/60">
              Çalışma İzni İstatistikleri
            </CardTitle>
            <CardDescription>İstatistik türünü seçiniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center space-x-4 rounded-md border p-4">
              <Search className="text-green-500" height={37} width={37} />
              <Select onValueChange={(value) => setQueryData(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>İstatistik Türü</SelectLabel>

                    <SelectItem value="1">
                      Uyruk bazında çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="2">
                      İl bazında çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="3">
                      Meslek seçimine göre çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="4">
                      Eğitim durumuna göre çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="5">
                      Cinsiyete göre çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="6">
                      Yaş aralığına göre çalışma izinleri dağılımı
                    </SelectItem>
                    <SelectItem value="7">
                      Nace koduna göre çalışma izinleri dağılımı
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                disabled={isLoading || Number(queryData) < 1}
                variant="csgb"
                className="w-[80px]"
                onClick={async () => {
                  if (Number(queryData) > 0) {
                    setisLoading(true);
                    const sonuc = await GetQueryResult(Number(queryData));
                    if (!sonuc.message) {
                      setisLoading(false);
                      setData(sonuc);
                    } else {
                      setisLoading(false);
                      setErrorMessage(sonuc.message);
                    }
                  }
                }}
              >
                {isLoading ? "..." : "Sorgula"}
              </Button>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex w-full h-[400px] items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <Separator className="w-full" />

          <div className="flex min-w-full">
            {!errorMessage ? (
              // <QueryTable data={data} initialRowsPerPage={25} />
              <PTTtable data={data} columns={columnsGenerated}/>
            ) : (
              <div className="flex w-full h-[400px] items-center justify-center">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
