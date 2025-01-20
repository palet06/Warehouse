"use client";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openDialog: (rowData: ContentItem, tokenData: string) => {},
  closeDialog: () => {},  
  rowData: {} as ContentItem,
  tokenData: "",
  isDialogOpen: false,
});

import { ReactNode } from "react";

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  const [rowData, setRowData] = useState<ContentItem>({});
  const [tokenData,setTokenData] = useState<string>("")

  const openDialog = (data: ContentItem,tokenData:string) => {
    setRowData(data);
    setTokenData(tokenData)

    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);
 
    

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        rowData,
        tokenData,
        openDialog,
        closeDialog,
       
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
