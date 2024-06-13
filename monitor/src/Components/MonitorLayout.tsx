import React, { useEffect, useState } from "react";
import Status from "../Resources/Status.json";
import CustomAccordion from "./CustomAccordion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MonitorLayout() {
  const [data, setData] = useState(Status);
  const [clickstate, setclickstate] = useState('');
  const getBytypes = (typename: string) => {
    var databyTYpe = data.filter((item) => item.alertType === typename);
    return databyTYpe;
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
          alertTime: "2024-05-27T11:18:00.000Z",
          deviceId: "Amit",
        },
        ...data,
      ];
      setData(newdata);
      GetToast(newdata[0].alertType);
    }, 10000);
  }
  const handleClickType = (alertType : string) => {
    setclickstate(alertType);
  }
  function GetToast(x) {
    const found = diftypes.find((item) => item.type === x);
    let itemmessagewitchcolor;
    if (found.id === 0) {
      itemmessagewitchcolor = toast.error(`${found.title} `, {
        position: "top-center",
        onClick: () => handleClickType(found.type)
      });
    } else if (found.id === 1) {
      itemmessagewitchcolor = toast.warning(`${found.title} `, {
        position: "top-center",
      });
    } else if (found.id === 2) {
      itemmessagewitchcolor = toast.success(`${found.title} `, {
        position: "top-center",
      });
    } else {
      itemmessagewitchcolor = toast.info(`${found.title} `, {
        position: "top-center",
      });
    }
    // switch (found.id) {
    //   case 0:
    //     itemmessagewitchcolor = toast.error(`${found.title} `);
    //   case 1:
    //     itemmessagewitchcolor = toast.warning(`${found.title} `);
    //   case 2:
    //     itemmessagewitchcolor = toast.success(`${found.title} `);
    //   case 3:
    //     itemmessagewitchcolor = toast.info(`${found.title} `);
    //   default:
    //     console.log('avsdvas')
    // }
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
  const renderMethods = () => {
    return (
      <>
        {diftypes?.map((item, key) => (
          <div className="accordion" key={key}>
            <CustomAccordion
              title={item.title}
              content={getBytypes(item.type)}
              clickstate={clickstate}
            />
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <div style={{ width: "400px" }} className="monitor">
        <div className="title">
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "#3dcd58",
                marginRight: "5px",
              }}
            ></div>
            Diagnostic Monitor
          </h3>
          <div>
            Sort:
            <select>
              <option value="">High</option>
              <option value="">Low</option>
            </select>
          </div>
        </div>
        {renderMethods()}
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default MonitorLayout;
