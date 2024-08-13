import { Button, MenuItem, Switch, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GenericTable from '../GenericTable'
import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import { fetchRolemappingListByid } from '../../Services/RoleMappingService';
import { fetchRolesAsync } from '../../Services/RoleServices';

function RoleMappingList() {
    const columnHelper = createColumnHelper<any>();
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
          setData(response);
        } catch (error) {
          console.error(error);
        }
      };
    const handlechange = (e) => {
        setdropdown(e.target.value);
    }
    useEffect(() => {
        fetchData();
    },[dropdown])
    const columns = [
        columnHelper.accessor("pageName", {
          header: "pageName",
          cell: (info) => <div>{info.getValue()}</div>,
        }),
        columnHelper.accessor("view", {
          header: "View",
          cell: (info) => (
            <div>
              <Switch
                checked={info.getValue()}
                // onChange={handletoggle(info.row.original.id)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          ),
        }),
        columnHelper.accessor("add", {
            header: "Add",
            cell: (info) => (
              <div>
                <Switch
                  checked={info.getValue()}
                  // onChange={handletoggle(info.row.original.id)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            ),
          }),

          columnHelper.accessor("edit", {
            header: "Edit",
            cell: (info) => (
              <div>
                <Switch
                  checked={info.getValue()}
                  // onChange={handletoggle(info.row.original.id)}
                  inputProps={{ "aria-label": "controlled" }}
                />
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
      },[])
  return (
    <div style={{ maxHeight: "600px", overflowY: "auto" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginRight: "20px" }}
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
      <GenericTable table={table} />
    </div>
  )
}

export default RoleMappingList