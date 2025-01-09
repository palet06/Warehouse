"use client";
import React, { useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GetContextMenuItemsParams } from "ag-grid-community";
import { AG_GRID_LOCALE_TR } from "@ag-grid-community/locale";
import { WareHouseColDefs } from "@/app/types/data-types/dataTypes";
import { themeQuartz } from "ag-grid-community";

import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

import { ModuleRegistry, DateFilterModule } from "ag-grid-community";
import { ContentItem } from "@/app/types/data-types/dataTypes";
import MenuItem from "./menuItem";

ModuleRegistry.registerModules([AllEnterpriseModule, DateFilterModule]);
LicenseManager.setLicenseKey(
  "ag-Grid_Evaluation_License_Not_for_Production_100Devs30_August_2037__MjU4ODczMzg3NzkyMg==9e93ed5f03b0620b142770f2594a23a2"
);

export interface AgTableProps {
  data: ContentItem[];
}

const AgTable = ({ data }: AgTableProps) => {
  const localeText = AG_GRID_LOCALE_TR;

  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    return [10, 30, 50];
  }, []);

  const getContextMenuItems = useCallback(
    (params: GetContextMenuItemsParams) => {
      return [
        ...(params.defaultItems || []),

        {
          name: "EGM",
          suppressCloseOnSelect: true,
          menuItem: MenuItem,
          menuItemParams: {
            buttonValue: "Sorgula",
            name: "Yurda Giriş / Çıkış Bilgileri",
          },
        },
        {
          name: "YTB",
          suppressCloseOnSelect: true,
          menuItem: MenuItem,
          menuItemParams: {
            buttonValue: "Sorgula",
            name: "YTB Burs Var Mı?",
          },
        },
      ];
    },
    []
  );

  const defaultColDef: ColDef<ContentItem> = {
    sortable: true,
    filter: true,
    resizable: true,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
  };

  return (
    <AgGridReact
      theme={themeQuartz}
      rowData={data}
      columnDefs={WareHouseColDefs}
      defaultColDef={defaultColDef}
      localeText={localeText}
      getContextMenuItems={getContextMenuItems}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={paginationPageSizeSelector}
      sideBar
    />
  );
};

export default AgTable;
