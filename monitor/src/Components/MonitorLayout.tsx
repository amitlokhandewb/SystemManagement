import React, { useEffect, useState } from "react";
import Status from "../Resources/Status.json";
import CustomAccordion from "./CustomAccordion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MonitorUtility } from "../Utilities/MonitorUtility";

function MonitorLayout() {
  const utility = MonitorUtility();
  const {
    diftypes,
    getBytypes,
    clickstate,
    setclickstate,
    allClosed,
    closeAllAccordions,
  } = utility;

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
