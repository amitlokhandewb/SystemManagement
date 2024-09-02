import React, { useState } from "react";
import { ToggleRole } from "../../Services/RoleMappingService";

// Define the Permission interface
interface Permission {
  id: number;
  permissionId: number;
  parentId: number;
  view: boolean;
  modify: boolean;
  roleId: number;
  pageName: string;
  children: Permission[];
}

interface TableRowProps {
    data: Permission;
    onToggle: (id: number) => void;
    isOpen: boolean;
    onPermissionChange: (id: number, field: 'view' | 'modify', value: boolean) => void;
    parentId?: number;
    parentView?: boolean;   // Add parentView prop
    parentModify?: boolean; // Add parentModify prop
  }
  
  const TableRow: React.FC<TableRowProps> = ({
    data,
    onToggle,
    isOpen,
    onPermissionChange,
    parentId,
    parentView = true,
    parentModify = true
  }) => {
    const handleChange = (field: 'view' | 'modify') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.checked;
      onPermissionChange(data.permissionId, field, newValue);
    };
  
    const backgroundColor = parentId ? '#f0f8ff' : 'transparent';
  
    return (
      <>
        <tr style={{ backgroundColor }}>
          <td className="td">
            {data.children.length > 0 && (
              <button onClick={() => onToggle(data.id)}>
                {isOpen ? "−" : "+"}
              </button>
            )}
          </td>
          <td className="td">{data.pageName}</td>
          <td className="td">
            <input
              type="checkbox"
              checked={data.view}
              onChange={handleChange('view')}
              disabled={!parentView} // Disable if parent's view is false
            />
          </td>
          <td className="td">
            <input
              type="checkbox"
              checked={data.modify}
              onChange={handleChange('modify')}
              disabled={!parentModify} // Disable if parent's modify is false
            />
          </td>
        </tr>
        {isOpen &&
          data.children.map((child) => (
            <TableRow
              key={child.id}
              data={child}
              onToggle={onToggle}
              isOpen={false}
              onPermissionChange={onPermissionChange}
              parentId={data.id}
              parentView={data.view && parentView}    // Pass down combined view permission
              parentModify={data.modify && parentModify} // Pass down combined modify permission
            />
          ))}
      </>
    );
  };
  
interface CustomTableProps {
  data: Permission[];
  togglePagePermission: (id: number, type: string, value: boolean) =>  void;
}

export const CustomTable: React.FC<CustomTableProps> = ({ data, togglePagePermission}) => {
  const [openRows, setOpenRows] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePermissionChange = (id: number, type: 'view' | 'modify', value: boolean) => {
    togglePagePermission(id, type, value);
  };


  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th"></th>
          <th className="th">Page Name</th>
          <th className="th">View</th>
          <th className="th">Modify</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            data={row}
            onToggle={handleToggle}
            isOpen={openRows.includes(row.id)}
            onPermissionChange={handlePermissionChange}
          />
        ))}
      </tbody>
    </table>
  );
};
