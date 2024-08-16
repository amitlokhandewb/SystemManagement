import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { fetchUserList } from "../../Services/UserServices";
import GenericTable from "../GenericTable";
import { GetUniquesPageNamesAsync } from "../../Services/RoleMappingService";
import { Button } from "@mui/material";
import AddComponentDialog from "./AddComponentDialog";

function ComponentList() {
  const columnHelper = createColumnHelper<any>();
  const [data, setData] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await GetUniquesPageNamesAsync();
      console.log("res", response);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const columns = [
    columnHelper.accessor("componentName", {
      header: "Component Name",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Add
        </Button>
      </div>
      <GenericTable table={table} />
      <AddComponentDialog open={dialogOpen} onClose={handleClose} fetchData={fetchData} />
    </div>
  );
}

export default ComponentList;
