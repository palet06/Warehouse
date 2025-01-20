"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDialog } from "./DialogContext";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { useEffect, useState } from "react";
import { GetBorderInfoFromEgm } from "@/lib/serveractions/actions";
import { EgmDataTypes } from "@/app/types/EgmDataTypes";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CustomPopupDialog {
  rowData: ContentItem;
}

export enum sorguType {
  EGM = "EGM",
  YTB = "YTB",
  YAKINLIK = "YAKINLIK",
  VELAYET = "VELAYET",
}

const CustomPopupDialog = ({ rowData }: CustomPopupDialog) => {
  const { isDialogOpen, closeDialog, tokenData } = useDialog();
  const [data, setData] = useState<EgmDataTypes>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDialogOpen) {
      const fetchData = async () => {
        setLoading(true); // Yükleme durumu başlatılıyor

        const response = await GetBorderInfoFromEgm(
          rowData?.basvuruNo!.toString(),
          tokenData
        );
        toast({
          title: "Başarılı",
          description: "Veriler getirildi",
          variant: "success",
        });
        setData(response);
        setLoading(false);
      };

      fetchData();
    }
  }, [isDialogOpen]);

  return (
    <>
      <Sheet open={isDialogOpen}>
        <SheetContent side={"top"} className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="flex w-full justify-center items-center">
              {rowData?.basvuruNo} - {rowData?.yabanciKimlikNumarasi} -{" "}
              {rowData.adi} {rowData.soyadi}
            </SheetTitle>
          </SheetHeader>
          {!loading ? (
            <>
              <div className="flex justify-center overflow-y-scroll h-[250px] w-[50vh]">
                <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="border-b sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Tarih
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giriş / Çıkış
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.body?.map((kayit, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p>{format(kayit.tarih, "dd.MM.yyyy HH:mm:ss")}</p>
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {kayit.girisCikis}
                        </td>
                      </tr>
                    ))}
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
