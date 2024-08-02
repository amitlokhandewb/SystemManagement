import { flexRender } from "@tanstack/react-table";
import React from "react";

function GenericTable({ table }) {
  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            <th className="th" >Sr.No</th>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="th"
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
        {table.getRowModel().rows.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td className="td">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td className="td" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default GenericTable;
