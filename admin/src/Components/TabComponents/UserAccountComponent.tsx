import React, { useState } from "react";
import GenericLayout from "../GenericLayout";
import CreateNewUser from "../UserAccountComponents/CreateNewUser";
import UserList from "../UserAccountComponents/UserList";

function UserAccountComponent() {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 1,
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
