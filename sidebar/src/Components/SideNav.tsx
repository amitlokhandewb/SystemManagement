import React from "react";
import CustomApp from "./CustomApp";
import { RiAlarmWarningLine } from "react-icons/ri";
import { GrHostMaintenance } from "react-icons/gr";

function SideNav() {
  const Data = [
    {
      src: <RiAlarmWarningLine size={32} />,
      title: "Maintainence Alert",
      pathname : '/'
    },
    {
      src: <GrHostMaintenance size={32} />,
      title: "Maintainence Events",
      pathname : '/maintainance-event'
    },
  ];
  return (
    <div
      style={{
        overflowY: "auto",
        width: "80px",
        minHeight: '842px',
        boxShadow: "0 4px 5px 0px rgba(0, 0, 0, 0.2)",
        backgroundColor: 'white'
      }}
    >
      {Data.map((item, key) => {
        return <div key={key}><CustomApp src={item.src} title={item.title} pathname={item.pathname} /></div>;
      })}
    </div>
  );
}

export default SideNav;
