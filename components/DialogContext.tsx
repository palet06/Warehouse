"use client";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openDialog: (rowData: ContentItem,userToken:string) => {},
  closeDialog: () => {},
  userToken:"",
 
  rowData: {} as ContentItem,
  
  isDialogOpen:false,
});

import { ReactNode } from "react";

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToken,setUserToken] = useState<string>("")

  const [rowData, setRowData] = useState<ContentItem>({});

  const openDialog = (data: ContentItem,userToken:string) => {
    setUserToken(userToken)
    setRowData(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);
  

  return (
    <DialogContext.Provider
      value={{
        userToken,
        isDialogOpen,        
        rowData,
        openDialog,
        closeDialog,
        
       
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
