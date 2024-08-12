import { Button, IconButton } from "@mui/material";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { EventType } from "../../Model/DeviceSettingModels";
import { FetchEventDescripton } from "../../Services/EventDescriptionService";
import GenericTable from "../GenericTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateEventTypeAsync, DeleteEventTypeAsync, FetchEventType, GetEventTypeByIdAsync, UpdateEventType } from "../../Services/EventTypeService";
import GenericDialog from "../GenericDialog";

function EventTypeComponent() {
  const columnHelper = createColumnHelper<EventType>();
  const [data, setData] = useState<EventType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);
  const fetchData = async () => {
    try {
      const response = await FetchEventType();
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
    let { eventTypeName } = data;
    if (id === 0) {
      let body = { eventTypeName: eventTypeName };
      await sendData(body);
    } else {
      const update = { eventTypeId: id, eventTypeName: eventTypeName };
      await UpdateData(update, id);
    }
    fetchData();
    setId(0);
    setInitialData(null);
  };
  const sendData = async (data) => {
    try {
      const response = await CreateEventTypeAsync(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await UpdateEventType(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await GetEventTypeByIdAsync(id);
      setInitialData({ ...initialData, eventTypeName: response.eventTypeName });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await DeleteEventTypeAsync(id);
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
    columnHelper.accessor("eventTypeName", {
      header: "Event Types",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("eventTypeId", {
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
        field1="eventTypeName"
        idField={id}
        label={"Event Type"}
      />
    </div>
  );
}

export default EventTypeComponent;
