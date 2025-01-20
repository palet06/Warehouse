"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "./DialogContext";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { useEffect, useState } from "react";
import { GetBorderInfoFromEgm } from "@/lib/serveractions/actions";
import { ulkeKodunuAl } from "@/lib/countryCodes";
import { EgmDataTypes } from "@/app/types/EgmDataTypes";
import { title } from "process";
import { toast } from "@/hooks/use-toast";
import { Rowdies } from "next/font/google";

interface CustomPopupDialog {
  rowData: ContentItem;
  type: sorguType;
}

export enum sorguType {
  EGM = "EGM",
  YTB = "YTB",
  YAKINLIK = "YAKINLIK",
  VELAYET = "VELAYET",
}

const CustomPopupDialog = ({ type, rowData }: CustomPopupDialog) => {
  const { isDialogOpen, closeDialog } = useDialog();
  const [data, setData] = useState<EgmDataTypes>(); // API'den çekilen veriyi tutacak state

  const [loading, setLoading] = useState(true); // Yüklenme durumunu göstermek için
  const [error, setError] = useState(null); // Hata durumunu tutmak için

  useEffect(() => {
    if (isDialogOpen) {
      const fetchData = async () => {
        setLoading(true); // Yükleme durumu başlatılıyor

        const egmCountryCode = await ulkeKodunuAl(rowData?.uyruk);

       
        if (!egmCountryCode) {
          toast({
            title: "Hata",
            description: "Veriler getirilirken hata oluştu.",
            variant: "destructive",
          });
          //throw new Error("API hatası:");
        } else {
          const response = await GetBorderInfoFromEgm(
            egmCountryCode,
            rowData!.pasaportNumarasi!.replace(/ /g, "")
          );
          toast({
            title: "Başarılı",
            description: "Veriler getirildi",
            variant: "success",
          });
          setData(response);
          setLoading(false);
        }
      };

      fetchData(); // Async fonksiyonu çağır
    }
  }, [isDialogOpen]); // [] bağımlılık dizisi: sadece ilk render'da çalışır

  return (
    <>
      <Sheet open={isDialogOpen}>
        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle>
              {rowData?.basvuruNo} - {rowData?.yabanciKimlikNumarasi} -{" "}
              {rowData.adi} {rowData.soyadi}
            </SheetTitle>
          </SheetHeader>
          {!loading ? (
            <>
              <SheetDescription>
                ülkeye son giriş tarihi:{data?.data.ulkeyeSonGirisTarihi}
              </SheetDescription>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Color
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Silver</td>
                      <td className="px-6 py-4">Laptop</td>
                      <td className="px-6 py-4">$2999</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">White</td>
                      <td className="px-6 py-4">Laptop PC</td>
                      <td className="px-6 py-4">$1999</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">Black</td>
                      <td className="px-6 py-4">Accessories</td>
                      <td className="px-6 py-4">$99</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
            </>
          ) : (
            "veriler getiriliyor"
          )}
          <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={closeDialog} type="submit">
                    Kapat
                  </Button>
                </SheetClose>
              </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CustomPopupDialog;
