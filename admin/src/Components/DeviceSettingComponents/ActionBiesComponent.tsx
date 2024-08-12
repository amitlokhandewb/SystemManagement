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
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  CreateActionBies,
  DeletectionByIdAsync,
  FetchActionBies,
  FetchActionByIdAsync,
  UpdateActionBies,
} from "../../Services/ActionBiesServices";
import { ActionBy } from "../../Model/DeviceSettingModels";
import GenericDialog from "../GenericDialog";

function ActionBiesComponent() {
  const columnHelper = createColumnHelper<ActionBy>();
  const [data, setData] = useState<ActionBy[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);

  const fetchData = async () => {
    try {
      const response = await FetchActionBies();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpen = async (data) => {
    setId(data);
    FetchUserById(data);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setId(0);
  };
  const handleSubmit = async (data) => {
    let { actionName } = data;
    if (id === 0) {
      let body = { actionName: actionName };
      await sendData(body);
    } else {
      const update = { actionById: id, actionName: actionName };
      await UpdateData(update, id);
    }
    fetchData();
    setId(0);
    setInitialData(null);
  };
  const sendData = async (data) => {
    try {
      const response = await CreateActionBies(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await UpdateActionBies(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await FetchActionByIdAsync(id);
      setInitialData({ ...initialData, actionName: response.actionName });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await DeletectionByIdAsync(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (id) => {
    DeleteData(id);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    columnHelper.accessor("actionName", {
      header: "Action By",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("actionById", {
      header: "Action",
      cell: (info) => (
        <div>
          <IconButton aria-label="edit" color="info">
            <EditIcon onClick={() => handleOpen(info.getValue())} />
          </IconButton>
          <IconButton color="error" aria-label="delete" onClick={() => handleDelete(info.getValue())}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
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
      <GenericDialog
        open={dialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={initialData}
        field1="actionName"
        idField={id}
        label={"Action By"}
      />
    </div>
  );
}

export default ActionBiesComponent;
