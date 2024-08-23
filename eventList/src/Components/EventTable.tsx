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
import { GetSortByvalue } from "../Utilities/Data";
type ColumnSort = {
  id: string;
  desc: boolean;
};

type SortingState = ColumnSort[];
function EventTable({ data, columns, sort, setSort }) {
  const [showloader, setshowloeader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setshowloeader(false);
    }, 2000);
  }, []);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "column-2",
      desc: true,
    },
  ]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleSorting = (headerId) => {
    if (headerId === sort.sortKey) {
      setSort({
        ...sort,
        sortOrder: sort.sortOrder === "ASC" ? "DESC" : "ASC",
      });
    } else {
      setSort({ ...sort, sortKey: headerId, sortOrder: "ASC" });
    }
  };

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                onClick={() =>
                  handleSorting(GetSortByvalue(header.column.columnDef.header))
                }
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
                {sort.sortKey === GetSortByvalue(header.column.columnDef.header)
                  ? sort.sortOrder === "ASC"
                    ? " ▼"
                    : " ▲"
                  : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data?.length > 0 ? (
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
            {showloader && showloader ? <ClipLoader /> : "No Result Found"}
          </div>
        )}
      </tbody>
    </table>
  );
}

export default EventTable;
