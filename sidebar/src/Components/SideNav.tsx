import React from "react";
import CustomApp from "./CustomApp";
import { RiAlarmWarningLine } from "react-icons/ri";
import { GrHostMaintenance } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { fetchRolemappingListById } from "../Services/RoleMappingService";

function SideNav() {
  const roleid = localStorage.getItem("roleId");
  const [roleaccess, setRoleAccess] = React.useState([]);

  const fetchRoleAccesbyROleID = async(id: number) => {
    try {
      const response = await fetchRolemappingListById(id);
      setRoleAccess(response);
      console.log("role by id", response)
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    fetchRoleAccesbyROleID(Number(roleid));
  },[])
  const Data = [
    {
      src: <RiAlarmWarningLine size={32} />,
      title: "Maintainence Alert",
      pathname: "/"
    },
    {
      src: <GrHostMaintenance size={32} />,
      title: "Maintainence Events",
      pathname: "/maintainance-event"
    },
    {
      src: <RiAdminFill size={32} />,
      title: "Admin",
      pathname: "/admin"
    }
  ];
  const filteredList = Data.filter((item) =>
    roleaccess.some(
      (access) => access.pageName === item?.title && access.view
    )
  );
  return (
    <div
      style={{
        overflowY: "auto",
        width: "80px",
        minHeight: "842px",
        boxShadow: "0 4px 5px 0px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white"
      }}
    >
      {filteredList.map((item, key) => {
        return (
          <div key={key}>
            <CustomApp src={item.src} title={item.title} pathname={item.pathname} />
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;

