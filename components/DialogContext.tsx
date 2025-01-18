"use client"
import { ContentItem } from '@/app/types/WhApiDataTypes';
import { createContext, useContext, useState } from 'react';

const DialogContext = createContext({
  isDialogOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openDialog: (rowData: ContentItem) => {},
  closeDialog: () => {},
  rowData:{} as ContentItem
  
});

import { ReactNode } from 'react';


interface DialogProviderProps {
  children: ReactNode;
}


export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [rowData,setRowData] = useState<ContentItem>({})
 
  
  const openDialog = (data:ContentItem) =>  {
    
    setRowData(data)
    
    setIsDialogOpen(true)
  }
  const closeDialog = () => setIsDialogOpen(false);
 


  return (
    <DialogContext.Provider value={{ isDialogOpen, rowData, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
