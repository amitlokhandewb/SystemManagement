import React, { useState } from "react";
import GenericLayout from "../GenericLayout";
import RoleMappingList from "../ManageRoleComponents/RoleMappingList";
import AddComponent from "../ManageRoleComponents/AddComponent";


function ManageRoleComponent({roleaccess}) {
  const [deviceList, setDeviceList] = useState(0);

  const List = [
    {
      id: 1,
      label: "Role Mapping List",
      Component: <RoleMappingList />,
    },
    {
      id: 2,
      label: "Add New Component",
      Component: <AddComponent />,
    },
  ];

  const filteredList = List.filter((item) => {
    roleaccess.some((access) => access.pageName === item.label && access.view)
  })

  return (
    <GenericLayout
      componentList={List}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default ManageRoleComponent;
