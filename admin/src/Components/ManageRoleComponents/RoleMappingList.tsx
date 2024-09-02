import { Button, MenuItem, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  fetchRolemappingListByid,
  ToggleRole,
} from "../../Services/RoleMappingService";
import { fetchRolesAsync } from "../../Services/RoleServices";
import { CustomTable } from "./CustomTable";

function RoleMappingList() {
  const [data, setData] = useState<any[]>([]);
  const [dropdown, setdropdown] = useState(1);
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
      const response = await fetchRolemappingListByid(dropdown);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const togglePagePermission = async (id, type, value) => {
    try {
      const res = await ToggleRole(id, type, value);
      console.log(res);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const handlechange = (e) => {
    setdropdown(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [dropdown]);

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);
  return (
    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "20px",
        }}
      >
        <TextField
          margin="dense"
          name="roleId"
          label="Role"
          select
          value={dropdown}
          onChange={handlechange}
        >
          {roles.map((item, key) => (
            <MenuItem key={key} value={item.id}>
              {item.roleName}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <CustomTable data={data} togglePagePermission={togglePagePermission} />
    </div>
  );
}

export default RoleMappingList;
