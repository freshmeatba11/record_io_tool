import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";
import { toast } from "sonner";
import styled from "styled-components";

import typeConfig from "@/config/type.json";
import { useFilesActions, useGlobalActions } from "@/stores/useBoundStore";

import Button from "@/components/button/button";

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

const ConfirmButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const typeFormatter = typeConfig;
const amountFormatter = {
  water: (v: number) => `${v} ml`,
  food: (v: number) => `${v} g`,
  urine: (v: number) => `${v} ml`,
  stool: (v: number) => `-`,
  other: (v: number) => `${v}`,
};

type Props = {
  rows: any[];
};
const Table = ({ rows }: Props) => {
  const globalActions = useGlobalActions();
  const fileActions = useFilesActions();

  const handleDeleteWithConfirm = React.useCallback(
    (id: GridRowId) => () => {
      globalActions?.setRootModalConfig({
        title: "確定要刪除紀錄嗎?",
        subtitle: "＊此動作無法回復",
        modalContent: (
          <ConfirmButtonWrapper>
            <Button
              {...{
                onClick: () => {
                  globalActions?.setLoading(true);
                  fileActions?.deleteRecord(id.toString());
                  setTimeout(() => {
                    toast.success("刪除成功！");
                    globalActions?.setRootModalOpen(false);
                    globalActions?.setLoading(false);
                  });
                },
                disabled: false,
                text: "刪除",
                className: "delete",
              }}
            />
            <Button
              {...{
                onClick: () => globalActions?.setRootModalOpen(false),
                disabled: false,
                text: "取消",
              }}
            />
          </ConfirmButtonWrapper>
        ),
      });
      globalActions?.setRootModalOpen(true);
    },
    // eslint-disable-next-line
    [globalActions]
  );

  const columnsConfig: GridColDef[] = React.useMemo(
    () => [
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
          return amountFormatter[row.type as keyof typeof amountFormatter](
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
      {
        field: "actions",
        type: "actions",
        width: 30,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            onClick={handleDeleteWithConfirm(params.id)}
            label="Delete"
          />,
        ],
      },
    ],
    [handleDeleteWithConfirm]
  );

  const columns: GridColDef[] = columnsConfig.map((column) => ({
    headerAlign: "center",
    align: "center",
    ...column,
  }));

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
      />
    </TableWrapper>
  );
};

export default Table;
