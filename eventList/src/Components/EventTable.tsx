// EventTable.tsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];
function EventTable({ data, columns }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    enableSorting: true,
    onSortingChange: setSorting,
    initialState: {
      sorting: [
        {
          id: "dateTime",
          desc: false,
        },
      ],
    },
    getSortedRowModel: getSortedRowModel(),
  });
  useEffect(() => {
    console.log(table.getState().sorting)
  },[])

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                onClick={header.column.getToggleSortingHandler()}
                className="th"
                key={header.id}
                style={{
                  textAlign: header.id === "column-0" ? "left" : undefined,
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {JSON.stringify(header.column.getIsSorted())}
                {header.column.getIsSorted() === false
                  ? null
                  : header.column.getIsSorted() === "asc"
                  ? "▲"
                  : "▼"}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ backgroundColor: "#f7f7f7" }}>
              {row.getVisibleCells().map((cell) => (
                <td className="td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <div
            style={{
              position: "absolute",
              right: "45%",
              top: "50%",
            }}
          >
            {/* <ClipLoader
              color={"#3dcd58"}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> */}
            No Result Found
          </div>
        )}
      </tbody>
    </table>
  );
}

export default EventTable;
