"use client";
import React from "react";


import type { CustomMenuItemProps } from "ag-grid-react";
import { useGridMenuItem } from "ag-grid-react";

import { ContentItem } from "@/app/types/WhApiDataTypes";
import { List } from "lucide-react";
import axios from "axios";

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string;
  userName:string;
  userPassword:string;
  userToken:string;

  rowData: ContentItem;
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


  
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://eizin.csgb.gov.tr/api/ic/getCalismaIzinBelgesi?basvuruNo=${rowData.basvuruNo}`,
        {
          headers: {
            
            //buraya contextten aldığın token i koy
            Authorization:userToken,
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${rowData.basvuruNo} - İzin Döküm Belgesi.pdf`
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("PDF indirme hatası:", error.message);
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
            disabled={!rowData.basvuruNo}
            className={`outline outline-1 p-2 outline-csgbBgRed hover:bg-white ${
              !rowData.basvuruNo
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={downloadPDF}
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
