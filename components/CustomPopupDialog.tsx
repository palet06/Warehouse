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
import LoadingCsgb from "./LoadingCsgb";


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
  const { isDialogOpen, closeDialog, userToken } = useDialog();
  const [data, setData] = useState<EgmDataTypes>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDialogOpen) {
      const fetchData = async () => {
        setLoading(true); // Yükleme durumu başlatılıyor

        const response = await GetBorderInfoFromEgm(
          rowData?.basvuruNo!.toString(),
          userToken
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
  const renderData = {
    isim: `${rowData.adi} ${rowData.soyadi}` || "Veri yok",
    ykn: rowData.yabanciKimlikNumarasi || "Veri yok",
    basvuruNo: rowData.basvuruNo || "Veri yok",
    tarih: data?.body?.map((a) => a.tarih).flat() || ["Veri yok"],
    girisCikis: data?.body?.map((a) => a.girisCikis).flat()||["Veri yok"],
  };

  return (
    <>
      <Sheet   open={isDialogOpen}>
        <SheetContent
          side={"top"}
          className="flex flex-col gap-10 [&>button]:hidden"
        >
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          {!loading ? (
            <div className="flex flex-col px-12ç">
              <div className="flex flex-col justify-center items-center overflow-y-auto">
                <table className="w-full h-full text-sm border  rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="border-b sticky top-0 text-xs bg-slate-400 text-white uppercase  dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-3">
                        İsim
                      </th>
                      <th className="px-6 py-3">Başvuru No</th>
                      <th scope="col" className="px-6 py-3">
                        YKN
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tarih
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giriş / Çıkış
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                      {/* İsim */}
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {renderData.isim}
                      </td>
                      {/* Başvuru No */}
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {renderData.basvuruNo}
                      </td>
                      {/* YKN */}
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {renderData.ykn}
                      </td>
                      {/* Tarih */}
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                      >
                        {renderData.tarih?.map((kayit, index) => (
                          <p className="py-2" key={index}>
                            {kayit!="Veri yok"?(format(kayit, "dd.MM.yyyy hh:mm:ss")):(kayit)}
                          </p>
                        ))}
                      </td>
                      {/* Giriş / Çıkış */}
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                      >
                        {renderData.girisCikis?.map((kayit, index) => (
                          <p className="py-2" key={index}>
                            {kayit}
                          </p>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <LoadingCsgb />
          )}
          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant={"csgb"}
                className="hover:bg-csgbBgRed hover:text-white"
                onClick={closeDialog}
                type="submit"
              >
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
