/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  openDialog: (rowData: ContentItem, userToken: string) => {}, //egm dialogu açıyor
  openPTTDialog: (rowDataPTT: ContentItem, userTokenPTT: string) => {}, //PTT dialogu açıyor
  updateUserAdminInfo: (isAdminValue: string) => {},
  closeDialog: () => {},
  closePTTDialog: () => {},
  userToken: "",
  userTokenPTT: "",
  realTimeisAdminInfo: "",

  rowData: {} as ContentItem,
  rowDataPTT: {} as ContentItem,

  isDialogOpen: false,
  isPttDialogOpen: false,
});

import { ReactNode } from "react";

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [realTimeisAdminInfo, setRealTimeisAdminInfo] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPttDialogOpen, setIsPTTdialogOpen] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const [userTokenPTT, setUserTokenPTT] = useState<string>("");

  const [rowData, setRowData] = useState<ContentItem>({});
  const [rowDataPTT, setRowDataPTT] = useState<ContentItem>({});

  const updateUserAdminInfo = (isAdminValue: string) => {
    setRealTimeisAdminInfo(isAdminValue);
  };

  const openDialog = (data: ContentItem, userToken: string) => {
    setUserToken(userToken);
    setRowData(data);
    setIsDialogOpen(true);
  };
  const openPTTDialog = (data: ContentItem, userToken: string) => {
    setUserTokenPTT(userToken);
    setRowDataPTT(data);
    setIsPTTdialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);
  const closePTTDialog = () => setIsPTTdialogOpen(false);

  return (
    <DialogContext.Provider
      value={{
        userToken,
        userTokenPTT,
        isDialogOpen,
        isPttDialogOpen,
        realTimeisAdminInfo,
        rowData,
        rowDataPTT,
        updateUserAdminInfo,
        openDialog,
        openPTTDialog,
        closeDialog,
        closePTTDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
