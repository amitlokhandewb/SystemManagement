import { Button, IconButton } from "@mui/material";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { EventDescription } from "../../Model/DeviceSettingModels";
import { FetchDeviceTypes } from "../../Services/DeviceTypeServices";
import GenericTable from "../GenericTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateEventDescriptionAsync, DeleteEvenetDescriptionAsync, FetchEventDescriptionById, FetchEventDescripton, UpdateEventDescripton } from "../../Services/EventDescriptionService";
import GenericDialog from "../GenericDialog";

function EventDescriptionComponent() {
  const columnHelper = createColumnHelper<EventDescription>();
  const [data, setData] = useState<EventDescription[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);
  
  const fetchData = async () => {
    try {
      const response = await FetchEventDescripton();
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
    let { eventDescription } = data;
    if (id === 0) {
      let body = { eventDescription: eventDescription };
      await sendData(body);
    } else {
      const update = { eventDescriptionId: id, eventDescription: eventDescription };
      await UpdateData(update, id);
    }
    fetchData();
    setId(0);
    setInitialData(null);
  };
  const sendData = async (data) => {
    try {
      const response = await CreateEventDescriptionAsync(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await UpdateEventDescripton(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await FetchEventDescriptionById(id);
      setInitialData({ ...initialData, eventDescription: response.eventDescription });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await DeleteEvenetDescriptionAsync(id);
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
    columnHelper.accessor("eventDescription", {
      header: "Event Descriptions",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("eventDescriptionId", {
      header: "Action",
      cell: (info) => (
        <>
           <IconButton aria-label="edit" color="info">
            <EditIcon onClick={() => handleOpen(info.getValue())} />
          </IconButton>
          <IconButton color="error" aria-label="delete" onClick={() => handleDelete(info.getValue())}>
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
        field1="eventDescription"
        idField={id}
        label={"Event Description"}
      />
    </div>
  );
}

export default EventDescriptionComponent;
