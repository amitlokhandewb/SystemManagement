import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import CustomCard from "./CustomCard";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";

function CustomAccordion({
  title,
  content,
  clickstate,
  setclickstate,
  allClosed,
}) {
  const [open, setOpen] = useState<Boolean>(false);
  const Icons = [
    {
      alertType: "Failure",
      icon: (
        <FiAlertTriangle
          size={20}
          // className={blink === true ? "blink" : ""}
          // className="blink"
          color="red"
        />
      ),
      color: "red",
    },
    {
      alertType: "Maintenance Required",
      icon: <FaScrewdriverWrench size={20} color="orange" />,
      color: "orange",
    },
    {
      alertType: "Check Function",
      icon: <FaListCheck size={20} color="green" />,
      color: "green",
    },
    {
      alertType: "Out Of Specification",
      icon: <MdOutlineSpeakerNotesOff size={20} color="gray" />,
      color: "gray",
    },
  ];
  useEffect(() => {
    if (clickstate === title) {
      setOpen(true);
      setclickstate("");
    }
  }, [clickstate]);
  useEffect(() => {
    setOpen(false);
  }, [allClosed]);

  const geticonbytypeid = (id: string) => {
    return Icons.find((item) => item.alertType === id).icon;
  };
  const geticoncolor = (id: string) => {
    return Icons.find((item) => item.alertType === id).color;
  };

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "5px",
          // backgroundColor: open ? '#F5F3F2': ''
        }}
        className="accordion-body"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {title}
          <span
            style={{
              width: "25px",
              borderRadius: "50%",
              color: "white",
              height: "25px",
              margin: "5px",
              fontSize: "13px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: geticoncolor(title),
            }}
          >
            {content.length}
          </span>
        </div>
        <div style={{ marginTop: "10px" }}>
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {open && (
        <div style={{ padding: "10px", backgroundColor: "#f7f7f7" }}>
          {content.map((item) => (
            <CustomCard
              alertTime={item.alertTime}
              alertMessage={item.alertMessage}
              deviceId={item.deviceId}
              geticonbytypeid={geticonbytypeid(title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomAccordion;
