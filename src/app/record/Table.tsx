import React from "react";
import styled from "styled-components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import typeConfig from "@/config/type.json";

const TableWrapper = styled.div`
  width: 100%;
  height: calc(100svh - 137px);
  padding: 0 8px 16px;

  .MuiDataGrid-root {
    background: var(--table-background-color);
    --unstable_DataGrid-radius: 8px;

    .MuiDataGrid-cell {
      padding: 0;
      border: none;
    }

    .MuiDataGrid-columnHeaders {
      background-color: var(--table-col-headers-background-color);
      font-size: 16px;
      color: var(--table-col-headers-text-color);
      user-select: none;
    }
    .MuiDataGrid-columnSeparator {
      display: none;
    }
    .MuiDataGrid-iconButtonContainer {
      display: none;
    }

    .odd {
      color: var(--table-text-color-odd);
      background-color: var(--table-background-color-odd);
    }
    .even {
      color: var(--table-text-color-even);
      background-color: var(--table-background-color-even);
    }
    .MuiDataGrid-footerContainer {
      user-select: none;
      justify-content: flex-start;

      .MuiToolbar-root {
        color: var(--table-col-headers-text-color);
      }
    }

    .MuiDataGrid-filterForm {
      flex-wrap: wrap;
    }
  }
`;

const typeFormatter = typeConfig;
const amountFormatter = {
  water: (v: number) => `${v} ml`,
  food: (v: number) => `${v} g`,
  urine: (v: number) => `${v} ml`,
  stool: (v: number) => `-`,
  other: (v: number) => `${v}`,
};

const columnsConfig: GridColDef[] = [
  {
    field: "date",
    headerName: "日期",
    valueGetter: ({ row }) => {
      return dayjs(Number(row.date)).format("YYYY/MM/DD");
    },
    width: 100,
  },
  {
    field: "time",
    headerName: "時間",
    valueGetter: ({ row }) => {
      return dayjs(Number(row.date)).format("HH:mm");
    },
    width: 80,
  },
  {
    field: "type",
    headerName: "類別",
    valueGetter: ({ row }) => {
      return typeFormatter[row.type as keyof typeof typeFormatter];
    },
    width: 80,
  },
  {
    field: "amount",
    headerName: "計量",
    valueGetter: ({ row }) => {
      return amountFormatter[row.type as keyof typeof typeFormatter](
        row.amount
      );
    },
    width: 80,
  },
  {
    field: "notes",
    headerName: "備註",
    flex: 1,
    minWidth: 164,
  },
];
const columns: GridColDef[] = columnsConfig.map((column) => ({
  headerAlign: "center",
  align: "center",
  ...column,
}));
type Props = {
  rows: any[];
};

const Table = ({ rows }: Props) => {
  return (
    <TableWrapper>
      <DataGrid
        // loading={isLoading}
        rows={rows}
        columns={columns}
        disableColumnMenu={false}
        disableRowSelectionOnClick
        // autoPageSize
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        getRowHeight={() => "auto"}
        columnHeaderHeight={35}
        rowSpacingType="border"
        // todo 處理客製tool tip
      />
    </TableWrapper>
  );
};

export default Table;
