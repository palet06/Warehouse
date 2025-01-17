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



  return (
    <Sheet open={isDialogOpen}>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>{rowData.adi} {rowData.soyadi} isimli kişinin EGN sorgulaması</SheetTitle>
          <SheetDescription>
            ülkeye son giriş tarihi:{data?.data.ulkeyeSonGirisTarihi}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {rowData?.yabanciKimlikNumarasi} = ykn
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={closeDialog} type="submit">
              Kapat
            </Button>
            {/* <Button onClick={async () => {
              
              const uk =await ulkeKodunuAl(rowData.uyruk)
              console.log(uk)
            }} type="submit">
              Kapat
            </Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomPopupDialog;
