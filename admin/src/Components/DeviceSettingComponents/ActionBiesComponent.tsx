import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import GenericTable from "../GenericTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FetchActionBies } from "../../Services/ActionBiesServices";
type ActionBy = {
  actionById: number;
  actionName: string;
};
function ActionBiesComponent() {
  const columnHelper = createColumnHelper<ActionBy>();
  const [data, setData] = useState<ActionBy[]>([]);
  const fetchData = async () => {
    try {
      const response = await FetchActionBies();
      console.log(response);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  const columns = [
    columnHelper.accessor("actionName", {
      header: "Action By",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("actionById", {
      header: "Action",
      cell: (info) => (
        <>
          <IconButton aria-label="edit" color="info">
            <EditIcon onClick={() => alert(JSON.stringify(info.getValue()))} />
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
