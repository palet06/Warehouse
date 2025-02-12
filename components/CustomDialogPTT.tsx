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

import { toast } from "@/hooks/use-toast";

import LoadingCsgb from "./LoadingCsgb";
import { PTTResponseType } from "@/app/types/PTTDataTypes";
import { GetPTTinformation } from "@/lib/serveractions/actions";


interface CustomPopupDialog {
  rowData: ContentItem;
}

const CustomDialogPTT = ({ rowData }: CustomPopupDialog) => {
  const { isPttDialogOpen, closePTTDialog, userTokenPTT } = useDialog();
  const [data, setData] = useState<PTTResponseType>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPttDialogOpen) {
      const fetchData = async () => {
        setLoading(true);

        const response = await GetPTTinformation(
          rowData?.basvuruNo!.toString(),
          userTokenPTT
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
  }, [isPttDialogOpen]);

 
  return (
    <>
      <Sheet open={isPttDialogOpen}>
        <SheetContent
          side={"top"}
          className="flex flex-col gap-10 [&>button]:hidden"
        >
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          {!loading ? (
            <div className="flex flex-col px-12ç">
              <div className="flex flex-col justify-center items-center overflow-y-auto w-[85%]  mx-auto gap-10 ">
                {/* <PTTtable data={data ? [data] : []} columns={columnsPTT}/> */}
                <table className=" w-full h-full text-sm border  rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="border-b sticky top-0 text-xs text-white bg-slate-400 uppercase  dark:bg-gray-700 dark:text-gray-400 ">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-3 ">
                        Alıcı
                      </th>

                      <th scope="col" className="px-6 py-3 ">
                        Teslim Alan
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Barkod No
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.alici || "Veri Yok"}
                      </td>

                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.tesalan || "Veri Yok"}
                      </td>
                      
                      <td
                        scope="row"
                        className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.barno || "Veri Yok"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-[400px] overflow-y-auto w-full">
                  <table className="w-full  text-sm border  rtl:text-right text-gray-500 dark:text-gray-400  ">
                  <thead className="border-b sticky top-0 text-xs text-white uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-3">
                        İşlem Merkezi
                      </th>

                      <th scope="col" className="px-6 py-3">
                        İşlem
                      </th>
                      <th scope="col" className="px-6 py-3">
                        İşlem Tarihi
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {data?.dongu?.map((a, b) => (
                      <tr
                        key={b}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center odd:bg-white even:bg-gray-50"
                      >
                        <td
                          scope="row"
                          className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >

                         
                            <p className="py-2" >
                              {a.imerk || "Veri Yok" }
                            </p>
                          
                        </td>

                        <td
                          scope="row"
                          className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                         
                            <p className="py-2" >
                              {a.islem?a.islem:"Veri Yok" }
                            </p>
                        
                        </td>

                        <td
                          scope="row"
                          className="border px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                        >
                          {a.itarih?(<p className="py-2">{a.itarih}</p>):("Veri Yok")}

                         
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                                  
                
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
                onClick={closePTTDialog}
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

export default CustomDialogPTT;
