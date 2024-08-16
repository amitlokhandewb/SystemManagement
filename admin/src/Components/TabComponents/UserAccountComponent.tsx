import React, { useState } from "react";
import GenericLayout from "../GenericLayout";
import CreateNewUser from "../UserAccountComponents/CreateNewUser";
import UserList from "../UserAccountComponents/UserList";

function UserAccountComponent({roleaccess}) {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 43,
      label: "User List",
      Component: <UserList />,
    },
  ];
  const filterData = roleaccess.find((item) => item.pageName === "User List");
  const filteredList = List.filter((item) => {
    roleaccess.some((access) => access.pageName === item.label)
  })
  console.log("user account roles: ",filteredList)

  return (
    <GenericLayout
      componentList={List}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default UserAccountComponent;
