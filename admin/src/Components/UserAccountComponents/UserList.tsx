import React, { useEffect, useState } from "react";
import { UserModel } from "../../Model/UserAccountModel";
import {
  DeleteUser,
  fetchUserList,
  Toogleseer,
} from "../../Services/UserServices";
import { Button, IconButton, Switch } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericTable from "../GenericTable";
import UserDialog from "./UserDialog";
import { fetchRolesAsync } from "../../Services/RoleServices";

function UserList() {
  const columnHelper = createColumnHelper<UserModel>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState<UserModel[]>([]);
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await fetchRolesAsync();
      setRoles(response);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetchUserList();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setId(0);
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteUser(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handletoggle = (id) => (event) => {
    const isActive = event.target.checked;
    toggleuser(isActive, id);
  };

  const toggleuser = async (isActive, id) => {
    try {
      const res = await Toogleseer(isActive, id);
      console.log(res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = async (data) => {
    setId(data);
    setDialogOpen(true);
  };

  const columns = [
    columnHelper.accessor("userName", {
      header: "User Name",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("roleId", {
      header: "Role",
      cell: (info) => (
        <div>{roles.find((item) => item.id === info.getValue())?.roleName}</div>
      ),
    }),
    columnHelper.accessor("isActive", {
      header: "Is Active",
      cell: (info) => (
        <div>
          <Switch
            checked={info.getValue()}
            onChange={handletoggle(info.row.original.id)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => (
        <div>
          <IconButton
            aria-label="edit"
            color="info"
            onClick={() => handleOpen(info.getValue())}
          >
            <EditIcon />
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

  useEffect(() => {
    fetchData();
    fetchRoles();
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
      <UserDialog
        open={dialogOpen}
        id={id}
        handleClose={handleClose}
        fetchData={fetchData}
      />
    </div>
  );
}

export default UserList;
