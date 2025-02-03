"use client";
import React, { useCallback, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GetContextMenuItemsParams,
  ClientSideRowModelModule,
} from "ag-grid-community";
import { AG_GRID_LOCALE_TR } from "@ag-grid-community/locale";
import { WareHouseColDefs } from "@/app/types/WhApiDataTypes";
import { themeQuartz } from "ag-grid-community";

import {
  AllEnterpriseModule,
  LicenseManager,
  IntegratedChartsModule,
  ColumnMenuModule,
  ContextMenuModule,
  RowGroupingModule,
} from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";

import { ModuleRegistry, DateFilterModule } from "ag-grid-community";
import { ContentItem } from "@/app/types/WhApiDataTypes";
import MenuItem from "./menuItem";
import LoadingCsgb from "./LoadingCsgb";
import CustomPopupDialog from "./CustomPopupDialog";
import { useDialog } from "./DialogContext";
import MenuItemIzınDokum from "./MenuItemIzınDokum";
import MenuItemPTT from "./MenuItemPTT";
import CustomDialogPTT from "./CustomDialogPTT";

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  DateFilterModule,
  ClientSideRowModelModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  ColumnMenuModule,
  ContextMenuModule,
  RowGroupingModule,
]);
LicenseManager.setLicenseKey(
  "ag-Grid_Evaluation_License_Not_for_Production_100Devs30_August_2037__MjU4ODczMzg3NzkyMg==9e93ed5f03b0620b142770f2594a23a2"
);

export interface AgTableProps {
  data: ContentItem[];
  loading: boolean;
  userName: string; 
  userToken: string;
}

const AgTable = ({
  data,
  loading,
  userName,  
  userToken,
}: AgTableProps) => {
  const { openDialog,openPTTDialog, rowData,rowDataPTT } = useDialog();

  const localeText = AG_GRID_LOCALE_TR;
  
  
  const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
    if (data.length>100) {
      return [25, 50,100,data.length];
    } else {
      return [25, 50,100];
    }
  }, []);

  const getContextMenuItems = useCallback(
    (params: GetContextMenuItemsParams) => {
      const selectedRowData = params.api.getSelectedRows();

      if (!params.api.getSelectedRows().length) {
        return []; //checkbox seçilmeden menü açılmasını engellilyoruz
      }
      // if (!params.node) {
      //   return []; // boşuğa tıklanınca menü açılmasını engelliyoruz.
      // }

      return [
        ...(params.defaultItems || []),
        {
          name: "EGM",
          suppressCloseOnSelect: false,
          menuItem: MenuItem,
          menuItemParams: {
            buttonValue: "Sorgula",
            name: "Yurda Giriş / Çıkış Bilgileri",
            rowData: selectedRowData ? selectedRowData : null,
            userToken: userToken,
          },
        },
        {
          name: "Sure Dokum",
          suppressCloseOnSelect: false,
          menuItem: MenuItemIzınDokum,
          menuItemParams: {
            buttonValue: "Sorgula",
            name: "İzin Süre Dökümü ",
            rowData: selectedRowData ? selectedRowData : null,
            userName: userName,          
            userToken: userToken,
          },
        },
        {
          name: "PTT",
          suppressCloseOnSelect: false,
          menuItem: MenuItemPTT,
          menuItemParams: {
            buttonValue: "Sorgula",
            name: "Kargo Bilgileri",
            rowData: selectedRowData ? selectedRowData : null,
            userName: userName,          
            userToken: userToken,
          },
        },
      ];
    },
    [openDialog,openPTTDialog]
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
    <>
      <AgGridReact
        theme={themeQuartz}
        rowData={data}
        columnDefs={WareHouseColDefs}
        defaultColDef={defaultColDef}
        localeText={localeText}
        getContextMenuItems={getContextMenuItems}
        pagination={true}
        paginationPageSize={25}
        paginationPageSizeSelector={paginationPageSizeSelector}
        sideBar
        loading={loading}
        loadingOverlayComponent={LoadingCsgb}
        cellSelection={true}
        enableCharts={true}
        rowSelection={{ mode: "multiRow" }}
      />

      <CustomPopupDialog rowData={rowData} />
      <CustomDialogPTT rowData={rowDataPTT} />
    </>
  );
};

export default AgTable;
