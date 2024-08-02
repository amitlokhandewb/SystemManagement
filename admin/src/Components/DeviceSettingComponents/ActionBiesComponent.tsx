import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import GenericTable from "../GenericTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
type ActionBy = {
  actionbyId: number;
  actionBy: string;
};
function ActionBiesComponent() {
  const columnHelper = createColumnHelper<ActionBy>();
  const [data, setData] = useState<ActionBy[]>([
    {
      actionbyId: 1,
      actionBy: "John",
    },
  ]);
  const columns = [
    columnHelper.accessor("actionBy", {
      header: "Action By",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("actionbyId", {
      header: "Action",
      cell: (info) => (
        <>
          <IconButton aria-label="edit" color="info">
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <GenericTable table={table} />
    </div>
  );
}

export default ActionBiesComponent;
