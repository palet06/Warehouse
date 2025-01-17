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
import { ContentItem } from "@/app/types/data-types/dataTypes";
import { useEffect, useState } from "react";
import { GetBorderInfoFromEgm } from "@/lib/serveractions/actions";
import { ulkeKodunuAl } from "@/lib/countryCodes";
import { EgmDataTypes } from "@/app/types/data-types/EgmDataTypes";
import { title } from "process";
import { toast } from "@/hooks/use-toast";

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
          
          console.log("fetch yapınca gelen ulke kodu===",egmCountryCode)
          if (!egmCountryCode) {
            toast({title:"Hata",description:"Veriler getirilirken hata oluştu.",variant:"destructive"})
            //throw new Error("API hatası:");
          } else {

            const response = await GetBorderInfoFromEgm(
              egmCountryCode,
              rowData!.pasaportNumarasi!.replace(/ /g, "")
            );
            toast({title:"Başarılı",description:"Veriler getirildi",variant:"success"})
            setData(response); 
            setLoading(false)
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
                    {rowData.adi} {rowData.soyadi} isimli kişinin EGN sorgulaması
                  </SheetTitle>
                  </SheetHeader>
              {
                !loading? (
                  <>
                  <SheetDescription>
                    ülkeye son giriş tarihi:{data?.data.ulkeyeSonGirisTarihi}
                  </SheetDescription>
                <div className="grid gap-4 py-4">
                  {rowData?.yabanciKimlikNumarasi} = ykn
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button onClick={closeDialog} type="submit">
                      Kapat
                    </Button>
                  
                  </SheetClose>
                </SheetFooter>
                  </>
                ):("veriler getiriliyor")
              }
            
          </SheetContent>
        </Sheet>
     }
    </>
  );
    
  
};

export default CustomPopupDialog;
