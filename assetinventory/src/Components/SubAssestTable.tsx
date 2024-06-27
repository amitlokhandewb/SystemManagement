import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
type AssetData = {
  assetId: string;
  assetName: string;
  assetType: string;
  assetConnectedStatus: string;
  assetHealthStatus: string;
  assetSecurityStatus: string;
};

function SubAssestTable({ data, index }) {
  const columnHelper = createColumnHelper<AssetData>();

  const columns = [
    columnHelper.accessor("assetHealthStatus", {
      header: "Sr. No",
      cell: (info) => `${index + 1}. ${info.row.index + 1}`,
      enableSorting: false,
    }),
    columnHelper.accessor("assetName", {
      header: "Asset Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetId", {
      header: "Asset ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetType", {
      header: "Asset Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetConnectedStatus", {
      header: "Connected Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("assetHealthStatus", {
      header: "Health Status",
      cell: (info) => <div style={{ color: info.getValue() === 'Good' ? 'rgb(21, 203, 54)': 'red'}}>{info.getValue()}</div>,
    }),
    columnHelper.accessor("assetSecurityStatus", {
      header: "Security Status",
      cell: (info) => (info.getValue() !== null ? info.getValue() : "N/A"),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr style={{ backgroundColor: "#f7f7f7" }}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </>
  );
}

export default SubAssestTable;
