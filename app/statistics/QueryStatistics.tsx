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

import {  useState } from "react";
import { GetStatistics } from "@/lib/serveractions/statistics";

import QueryTable from "./QueryTable";

import { Separator } from "@radix-ui/react-separator";

import Loading from "./Loading";

const GetQueryResult = async (queryType: number) => {
  if(queryType ==0) {
    return
  }

  try {
    const result = await GetStatistics(queryType);
    return result;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return {message:"Veriler getirilirken hata oluştu." + error}

  }

};

export function QueryStatistics() {
  const [queryData, setQueryData] = useState<number>(0);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);

  return (
    <>
      <div className=" flex min-w-full justify-center ">
        <Card className={cn("w-[580px]")}>
          <CardHeader>
            <CardTitle className="text-lg">
              Çalışma İzni İstatistikleri
            </CardTitle>
            <CardDescription>İstatistik türünü seçiniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center space-x-4 rounded-md border p-4">
              <Search className="text-green-500" height={37} width={37} />
              <Select onValueChange={(value) => setQueryData(Number(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>İstatistikler</SelectLabel>
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
              disabled={isLoading?true:false}
                variant="csgb"
                className="w-[80px]"
                onClick={async () => {
                  if(queryData>0) {
                    setisLoading(true);
                  const sonuc = await GetQueryResult(queryData);
                  if (!sonuc.message) {
                    setisLoading(false);
                    setData(sonuc);
                  } else {
                    setisLoading(false)
                    setErrorMessage(sonuc.message)
                  }
                  }
                  
                }}
              >
                Sorgula
              </Button>
            </div>
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

          <div className="flex min-w-full pt-3">
            {!errorMessage?(
            <QueryTable data={data} initialRowsPerPage={25} />):(
              <div className="flex w-full h-[400px] items-center justify-center">

                <p>{errorMessage}</p>
              </div>
            )
            
          }
          </div>
        </>
      )}
    </>
  );
}
