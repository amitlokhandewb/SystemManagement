import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CustomAccordion from "../Components/CustomAccordion";
import Status from "../Resources/Status.json";


export const MonitorUtility = () => {
  const [data, setData] = useState(Status);
  const [clickstate, setclickstate] = useState("");
  const [allClosed, setAllClosed] = useState(false);

  const getBytypes = (typename) => {
    return data.filter((item) => item.alertType === typename);
  };

  useEffect(() => {
    ReturnrandomType(RandomIndex() - 1);
  }, [data]);

  function RandomIndex() {
    return Math.floor(Math.random() * 4) + 1;
  }

  function ReturnrandomType(x) {
    setTimeout(() => {
      const newdata = [
        {
          alertType: `${diftypes[x].type.toString()}`,
          alertMessage:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          alertTime: `${new Date().toISOString()}`,
          deviceId: `${RandomDevceName()}`,
        },
        ...data,
      ];
      console.log("new Data", newdata);
      setData(newdata);
      GetToast(newdata[0].alertType);
    }, 10000);
  }

  const handleClickType = (alertType) => {
    var found = diftypes.find((item) => item.type === alertType);
    setclickstate(found.title);
  };

  function GetToast(x) {
    const found = diftypes.find((item) => item.type === x);
    let itemmessagewitchcolor;
    if (found.id === 0) {
      itemmessagewitchcolor = toast.error(`${found.title} `, {
        position: "top-center",
        onClick: () => handleClickType(found.type),
      });
    } else if (found.id === 1) {
      itemmessagewitchcolor = toast.warning(`${found.title} `, {
        position: "top-center",
        onClick: () => handleClickType(found.type),
      });
    } else if (found.id === 2) {
      itemmessagewitchcolor = toast.success(`${found.title} `, {
        position: "top-center",
        onClick: () => handleClickType(found.type),
      });
    } else {
      itemmessagewitchcolor = toast.info(`${found.title} `, {
        position: "top-center",
        onClick: () => handleClickType(found.type),
        className: "grey-toast",
      });
    }
    return itemmessagewitchcolor;
  }

  let diftypes = [
    {
      id: 0,
      title: "Failure",
      type: "Failure",
    },
    {
      id: 1,
      title: "Maintenance Required",
      type: "MaintenanceRequired",
    },
    {
      id: 2,
      title: "Check Function",
      type: "CheckFunction",
    },
    {
      id: 3,
      title: "Out Of Specification",
      type: "OutOfSpecification",
    },
  ];
  let deviceName = ["Mini-X", "Mini-Y", "Mini-W", "Mini-D"];

  function RandomDevceName() {
    return deviceName[Math.floor(Math.random() * deviceName.length)];
  }

  const closeAllAccordions = () => {
    setAllClosed(!allClosed);
  };
  return {diftypes,getBytypes,clickstate,setclickstate,allClosed,closeAllAccordions };
};
