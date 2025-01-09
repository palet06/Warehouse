import React from "react";

import type { CustomMenuItemProps } from "ag-grid-react";
import { useGridMenuItem } from "ag-grid-react";

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string;
}

const MenuItem = ({ name, subMenu, buttonValue }: ButtonCustomMenuItemProps) => {
  useGridMenuItem({
    configureDefaults: () => true,
  });

  const onClick = () => alert(`${name} clicked`);

  return (
    <div>
      <span
        className="ag-menu-option-part ag-menu-option-icon"
        role="presentation"
      ></span>
      <span className="ag-menu-option-part ag-menu-option-text">{name}</span>
      <span className="ag-menu-option-part ag-menu-option-shortcut">
        <button className="outline outline-1 p-2 outline-csgbBgRed hover:bg-white " onClick={onClick}>{buttonValue}</button>
      </span>
      <span className="ag-menu-option-part ag-menu-option-popup-pointer">
        {subMenu && (
          <span
            className="ag-icon ag-icon-small-right"
            unselectable="on"
            role="presentation"
          ></span>
        )}
      </span>
    </div>
  );
};

export default MenuItem
