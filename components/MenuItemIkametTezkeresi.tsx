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

const MenuItemIkametTezkeresi = ({
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

export default MenuItemIkametTezkeresi;
