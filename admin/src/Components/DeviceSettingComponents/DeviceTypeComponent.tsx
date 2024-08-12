import { Button, IconButton } from "@mui/material";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CreateDeviceTypeAsync,
  DeleteDeviceTypeAsync,
  FetchDeviceTypeByIdAsync,
  FetchDeviceTypes,
  UpdateDeviceTypes,
} from "../../Services/DeviceTypeServices";
import { DeviceType } from "../../Model/DeviceSettingModels";
import GenericTable from "../GenericTable";
import GenericDialog from "../GenericDialog";

function DeviceTypeComponent() {
  const columnHelper = createColumnHelper<DeviceType>();
  const [data, setData] = useState<DeviceType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [id, setId] = useState(0);

  const fetchData = async () => {
    try {
      const response = await FetchDeviceTypes();
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
    let { deviceName } = data;
    if (id === 0) {
      let body = { deviceName: deviceName };
      await sendData(body);
    } else {
      const update = { deviceTypeId: id, deviceName: deviceName };
      await UpdateData(update, id);
    }
    fetchData();
    setId(0);
    setInitialData(null);
  };
  const sendData = async (data) => {
    try {
      const response = await CreateDeviceTypeAsync(data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateData = async (data, id) => {
    try {
      const response = await UpdateDeviceTypes(data, id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const FetchUserById = async (id) => {
    try {
      const response = await FetchDeviceTypeByIdAsync(id);
      setInitialData({ ...initialData, deviceName: response.deviceName });
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteData = async (id) => {
    try {
      const response = await DeleteDeviceTypeAsync(id);
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
    columnHelper.accessor("deviceName", {
      header: "Devices",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("deviceTypeId", {
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
        field1="deviceName"
        idField={id}
        label={"Device Type"}
      />
    </div>
  );
}

export default DeviceTypeComponent;
