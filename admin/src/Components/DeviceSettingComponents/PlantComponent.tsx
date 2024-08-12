import React, { useEffect, useState } from "react";
import { PlantNames } from "../../Model/DeviceSettingModels";
import { Button, IconButton } from "@mui/material";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { FetchEventType } from "../../Services/EventTypeService";
import GenericTable from "../GenericTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreatePlantNameAsycn, DeletePlantNameAsync, FetchPlantNames, GetPLantNameByIdAsync, UpdatePlantName } from "../../Services/PlantNameService";
import GenericDialog from "../GenericDialog";

function PlantComponent() {
  const columnHelper = createColumnHelper<PlantNames>();
  const [data, setData] = useState<PlantNames[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);

  const fetchData = async () => {
    try {
      const response = await FetchPlantNames();
      console.log(response);
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
    let { plantName } = data;
    if (id === 0) {
      let body = { plantName: plantName };
      await sendData(body);
    } else {
      const update = { plantId: id, plantName: plantName };
      await UpdateData(update, id);
    }
    fetchData();
    setId(0);
    setInitialData(null);
  };
  const sendData = async (data) => {
    try {
      const response = await CreatePlantNameAsycn(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await UpdatePlantName(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await GetPLantNameByIdAsync(id);
      setInitialData({ ...initialData, plantName: response.plantName });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await DeletePlantNameAsync(id);
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
  }, []);
  const columns = [
    columnHelper.accessor("plantName", {
      header: "Event Types",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("plantId", {
      header: "Action",
      cell: (info) => (
        <>
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
        field1="plantName"
        idField={id}
        label={"Plant Name"}
      />
    </div>
  );
}

export default PlantComponent;
