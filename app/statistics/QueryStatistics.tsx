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
import { SidebarSeparator } from "@/components/ui/sidebar";
import QueryTable from "./QueryTable";









const GetQueryResult = async (queryType: number) => {
  "use server"
  const result = await GetStatistics(queryType);

  return result;
};
type AwaitedType = Awaited<ReturnType<typeof GetQueryResult>>;
type keysType = keyof AwaitedType;


export function QueryStatistics() {
  const [queryData,setQueryData] = useState<number>(0);

  

  return (
    <div className="flex w-full justify-center ">
      
      <Card className={cn("w-[580px]")}>
        <CardHeader>
          <CardTitle className="text-lg">Çalışma İzni İstatistikleri</CardTitle>
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
              variant="csgb"
              className="w-[80px]"
              onClick={()=>{}}
              
            >
              Sorgula
            </Button>
          </div>
        </CardContent>
      </Card>
    
      <SidebarSeparator />
      <QueryTable   />
    </div>
    
  );
}
