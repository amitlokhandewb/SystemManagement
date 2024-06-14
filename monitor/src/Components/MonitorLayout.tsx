import React, { useEffect, useState } from "react";
import Status from "../Resources/Status.json";
import CustomAccordion from "./CustomAccordion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MonitorLayout() {
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
          alertTime: "2024-05-27T11:18:00.000Z",
          deviceId: "Amit",
        },
        ...data,
      ];
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

  const renderMethods = () => {
    return (
      <>
        {diftypes?.map((item, key) => (
          <div className="accordion" key={key}>
            <CustomAccordion
              title={item.title}
              content={getBytypes(item.type)}
              clickstate={clickstate}
              setclickstate={setclickstate}
              allClosed={allClosed}
            />
          </div>
        ))}
      </>
    );
  };

  const closeAllAccordions = () => {
    setAllClosed(!allClosed);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              Sort:
              <select>
                <option value="">High</option>
                <option value="">Low</option>
              </select>
            </div>
            <button
              onClick={closeAllAccordions}
              style={{ cursor: "pointer", border: "none", padding: "5px" }}
            >
              Close All
            </button>
          </div>
        </div>
        {renderMethods()}
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default MonitorLayout;
