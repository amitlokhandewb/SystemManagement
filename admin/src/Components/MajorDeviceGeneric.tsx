import { IconButton, Button } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import GenericDialog from "./GenericDialog";
import GenericTable from "./GenericTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function MajorDeviceGeneric({
  label,
  fieldname,
  fieldidname,
  fetchAll,
  create,
  update,
  fetchbyid,
  deletebyid,
  deviceList
}) {
  const columnHelper = createColumnHelper<any>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetchAll();
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
    let fieldValue = data[fieldname];

    if (id === 0) {
      let body = { [fieldname]: fieldValue };
      await sendData(body);
    } else {
      const update = { [fieldidname]: id, [fieldname]: fieldValue };
      await UpdateData(update, id);
    }

    fetchData();
    setId(0);
    setInitialData(null);
  };

  const sendData = async (data) => {
    try {
      const response = await create(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await update(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await fetchbyid(id);
      setInitialData({ ...initialData, [fieldname]: response[fieldname] });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await deletebyid(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (id) => {
    DeleteData(id);
  };
  useEffect(() => {
    fetchData();
  }, [deviceList]);
  const columns = [
    columnHelper.accessor(fieldname, {
      header: label,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor(fieldidname, {
      header: "Action",
      cell: (info) => (
        <div>
          <IconButton aria-label="edit" color="info">
            <EditIcon onClick={() => handleOpen(info.getValue())} />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDelete(info.getValue())}
          >
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
        field1={fieldname}
        idField={id}
        label={label}
      />
    </div>
  );
}

export default MajorDeviceGeneric;
