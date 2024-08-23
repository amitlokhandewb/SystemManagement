import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DeviceSettingCOmponent from "./TabComponents/DeviceSettingCOmponent";
import UserAccountComponent from "./TabComponents/UserAccountComponent";
import ManageRoleComponent from "./TabComponents/ManageRoleComponent";
import { fetchRolemappingListByid } from "../Services/RoleMappingService";
import { LoginRoleId } from "../Utils/Util";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [roleaccess, setRoleAccess] = React.useState([]);

  const fetchRoleAccesbyROleID = async (id: number) => {
    try {
      const response = await fetchRolemappingListByid(id);
      console.log("role mapped", response);
      setRoleAccess(response);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchRoleAccesbyROleID(Number(LoginRoleId));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const List = [
    {
      id: 1,
      label: "Device Settings",
      component: <DeviceSettingCOmponent roleaccess={roleaccess} />,
    },
    {
      id: 2,
      label: "User Accounts",
      component: <UserAccountComponent roleaccess={roleaccess} />,
    },
    {
      id: 3,
      label: "Manage Roles",
      component: <ManageRoleComponent roleaccess={roleaccess} />,
    },
  ];

  const filteredList = List.filter((item) =>
    roleaccess.some((access) => access.pageName === item?.label && access.view)
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {filteredList.map((item, key) => (
            <Tab key={key} {...a11yProps(key)} label={item.label} />
          ))}
        </Tabs>
      </Box>
      {filteredList.map((item, key) => (
        <CustomTabPanel value={value} index={key}>
          {item.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
