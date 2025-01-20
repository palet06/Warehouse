"use client";
import React from "react";

import type { CustomMenuItemProps } from "ag-grid-react";
import { useGridMenuItem } from "ag-grid-react";

import { ContentItem } from "@/app/types/WhApiDataTypes";
import { List } from "lucide-react";
import axios from "axios";

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string;

  rowData: ContentItem;
}

const MenuItemIzınDokum = ({
  name,
  subMenu,
  buttonValue,

  rowData,
}: ButtonCustomMenuItemProps) => {
  useGridMenuItem({
    configureDefaults: () => true,
  });

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        "https://eizin.csgb.gov.tr/api/ic/getCalismaIzinBelgesi?basvuruNo=3547896",
        {
          headers: {
            //buraya contextten aldığın token i koy
            Authorization:
              "Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdXJhdC5oYXlhbG9nbHUiLCJleHAiOjE3MzczMjYyMzMsInVzZXIiOnsiaWQiOjU3MTQwMSwidXNlcm5hbWUiOiJtdXJhdC5oYXlhbG9nbHUiLCJwYXNzd29yZCI6bnVsbCwic2VsZWN0ZWRTa3kiOm51bGwsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1RFS05JS19ERVNURUsifSx7ImF1dGhvcml0eSI6IlJPTEVfRURLIn1dLCJ0Y2tObyI6bnVsbCwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOm51bGwsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwaG9uZU51bWJlciI6bnVsbCwicGhvbmVOdW1iZXJWZXJpZmllZCI6ZmFsc2UsImVuYWJsZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImxkYXBMb2dpbkVuYWJsZWQiOmZhbHNlLCJwYXNzd29yZExvZ2luRW5hYmxlZCI6ZmFsc2UsImVkZXZsZXRMb2dpbkVuYWJsZWQiOmZhbHNlLCJjcmVhdGlvbkRhdGUiOm51bGwsImxhc3RMb2dpbkRhdGUiOm51bGwsInVzZXJSb2xlcyI6bnVsbCwidXNlclByaXZpbGVnZXMiOm51bGwsImF0dHJpYnV0ZXMiOm51bGx9LCJpc3MiOiJlaXppbi5pYy1zZXJ2aWNlIn0.IcUsyo1cXkKNHC0DVngYZWYebdaYP7tyPpsL6uC1BmY",
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
      link.download = "35478096 İzin Döküm Belgesi.pdf";
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
              !rowData.uyruk || !rowData.pasaportNumarasi
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
