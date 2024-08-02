import React, { useState } from "react";
import ActionBiesComponent from "../DeviceSettingComponents/ActionBiesComponent";
import DeviceTypeComponent from "../DeviceSettingComponents/DeviceTypeComponent";
import GenericLayout from "../GenericLayout";
import CreateNewUser from "../UserAccountComponents/CreateNewUser";
import UserList from "../UserAccountComponents/UserList";

function UserAccountComponent() {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 1,
      label: "Create New User",
      Component: <CreateNewUser />,
    },
    {
      id: 2,
      label: "User List",
      Component: <UserList />,
    },
  ];

  return (
    <GenericLayout
      componentList={List}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default UserAccountComponent;
