import React, { useState } from "react";
import GenericLayout from "../GenericLayout";
import CreateNewUser from "../UserAccountComponents/CreateNewUser";
import UserList from "../UserAccountComponents/UserList";

function UserAccountComponent({ roleaccess }) {
  const [deviceList, setDeviceList] = useState(0);
  const fetchEditAccess = (data) => {
    const res = roleaccess.find((item) => item.pageName === data);
    return res?.modify;
  };
  const List = [
    {
      id: 1,
      label: "User List",
      Component: <UserList fetchEditAccess={fetchEditAccess("User List")} />,
    },
  ];

  const filteredList = List.filter((item) =>
    roleaccess.some((access) => access.pageName === item?.label && access.view)
  );
  return (
    <GenericLayout
      componentList={filteredList}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default UserAccountComponent;
