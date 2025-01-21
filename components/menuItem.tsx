"use client";
import React from "react";

import type { CustomMenuItemProps } from "ag-grid-react";
import { useGridMenuItem } from "ag-grid-react";
import { useDialog } from "./DialogContext";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import { MessageCircleQuestion } from "lucide-react";

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string;
  userToken: string;

  rowData: ContentItem;
}

const MenuItem = ({
  name,
  subMenu,
  buttonValue,
  userToken,

  rowData,
}: ButtonCustomMenuItemProps) => {
  useGridMenuItem({
    configureDefaults: () => true,
  });

  const { openDialog } = useDialog();
  
  return (
    <>
      <div>
        <span
          className="ag-menu-option-part ag-menu-option-icon"
          role="presentation"
        >
          <MessageCircleQuestion height={17} width={17} />{" "}
        </span>
        <span className="ag-menu-option-part ag-menu-option-text">{name}</span>
        <span className="ag-menu-option-part ag-menu-option-shortcut">
          <button
            disabled={!rowData.uyruk || !rowData.pasaportNumarasi}
            className={`outline outline-1 p-2 outline-csgbBgRed hover:bg-white ${
              !rowData.uyruk || !rowData.pasaportNumarasi
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={() =>
              setTimeout(() => {
                openDialog(rowData, userToken);
              }, 300)
            }
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

export default MenuItem;
