import React, { useState } from 'react'
import ActionBiesComponent from '../DeviceSettingComponents/ActionBiesComponent';
import DeviceTypeComponent from '../DeviceSettingComponents/DeviceTypeComponent';
import GenericLayout from '../GenericLayout';
import RoleList from '../ManageRoleComponents/RoleList';
import AddNewRole from '../ManageRoleComponents/AddNewRole';

function ManageRoleComponent() {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 1,
      label: 'Role List',
      Component : <RoleList />
    },
    {
      id: 2,
      label: 'Add New User',
      Component : <AddNewRole />
    },
  ];

  return <GenericLayout componentList={List} state={deviceList} setState={setDeviceList} />;
}

export default ManageRoleComponent