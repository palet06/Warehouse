"use client";
import React from "react";


import type { CustomMenuItemProps } from "ag-grid-react";
import { useGridMenuItem } from "ag-grid-react";

import { ContentItem } from "@/app/types/WhApiDataTypes";
import { List } from "lucide-react";


import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string;
  userName:string;
  userPassword:string;
  userToken:string;

  rowData: ContentItem[];
}

const MenuItemIzınDokum = ({
  name,
  subMenu,
  buttonValue,
  //userName, 
  //userPassword,
  userToken,
  rowData,
}: ButtonCustomMenuItemProps) => {
  
  useGridMenuItem({
    configureDefaults: () => true,
  });


  
  const downloadPDF = async (selectedRows:ContentItem[], userToken:string) => {
    const zip = new JSZip();

  try {
    for (const rowData of selectedRows) {
      try {
        const response = await axios.get(
          `https://eizin.csgb.gov.tr/api/ic/getCalismaIzinBelgesi?basvuruNo=${rowData.basvuruNo}`,
          {
            headers: {
              Authorization: userToken,
              Accept: "application/json, text/plain, */*",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
            },
            responseType: "blob",
          }
        );

        // PDF dosyasını ZIP'e ekle
        zip.file(`${rowData.basvuruNo}.pdf`, response.data, { binary: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast({title:"PDF İndirme Hatası",description:`Seçilen başvuruların bazılarında ikamet izni süre dökümü belgeleri oluşturulamadığı için zip dosyasının içerisinde gözükmeyecektir. (Başvuru No= ${rowData.basvuruNo})`,variant:"destructive"})
        console.error(`PDF indirme hatası (${rowData.basvuruNo}):`, error.message);
      }
    }

    // ZIP dosyasını oluştur ve indir
    const content = await zip.generateAsync({ type: "blob" });
    const fileDateName = new Date()
    const formattedDateName = format(fileDateName,"dd.MM.yyyy HH mm")
    saveAs(content, `${formattedDateName}.zip`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("ZIP oluşturma hatası:", error.message);
  }
  };

  return (
    <>
      <div>
        <span
          className="ag-menu-option-part ag-menu-option-icon"
          role="presentation"
        >
          <List height={17} width={17} />{" "}
        </span>
        <span className="ag-menu-option-part ag-menu-option-text">{name}</span>
        <span className="ag-menu-option-part ag-menu-option-shortcut">
          <button
            disabled={rowData.length<1}
            className={`outline outline-1 p-2 outline-csgbBgRed hover:bg-white ${
              !rowData.length
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={async ()=> await downloadPDF(rowData,userToken)}
          >
            {buttonValue}
          </button>
        </span>
        <span
          className="ag-menu-option-part ag-menu-option-popup-pointer"
          inert
        >
          {subMenu && (
            <span
              className="ag-icon ag-icon-small-right"
              unselectable="on"
              role="presentation"
            ></span>
          )}
        </span>
      </div>
    </>
  );
};

export default MenuItemIzınDokum;
