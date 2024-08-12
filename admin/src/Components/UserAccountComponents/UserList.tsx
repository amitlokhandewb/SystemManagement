import React, { useEffect, useState } from "react";
import { UserModel } from "../../Model/UserAccountModel";
import { fetchUserList } from "../../Services/UserServices";
import { Button, IconButton } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericTable from "../GenericTable";

function UserList() {
  const columnHelper = createColumnHelper<UserModel>();

  const [data, setData] = useState<UserModel[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetchUserList();
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    columnHelper.accessor("userName", {
      header: "user names",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("roleId", {
      header: "Role",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("isActive", {
      header: "is Active",
      cell: (info) => <div>{JSON.stringify(info.getValue())}</div>,
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => (
        <div>
          <IconButton aria-label="edit" color="info">
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete">
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
  }, []);
  return (
    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
      <GenericTable table={table} />
    </div>
  );
}

export default UserList;
