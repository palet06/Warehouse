"use client"

import {
  AlertDialog,

  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,

} from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";




interface EgmDialogProps {
  isDialogOpenProp:boolean;
 closeDialogProp: () => void;
}

export enum sorguType {
  EGM = "EGM",
  YTB = "YTB",
  YAKINLIK = "YAKINLIK",
  VELAYET = "VELAYET",
}

const EgmDialog = ({isDialogOpenProp,closeDialogProp}:EgmDialogProps) => {
    

    //datayı burada kendin çek
  return (
    <AlertDialog open={isDialogOpenProp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Uyarı</AlertDialogTitle>
            <AlertDialogDescription>
              Bu, 3 alt seviyeden tetiklenmiş bir dialog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogTitle>
            sdflj
          </AlertDialogTitle>
          <AlertDialogFooter>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeDialogProp}
              >
              Kapat
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
  );
};

export default EgmDialog;
