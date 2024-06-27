import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import data from "../Resources/PropertyPanel.json";
import health from "../Resources/Health.json";
import { FaKey } from "react-icons/fa";
import CustomAccordion from "./CustomeAccordion";
import { TbLayoutBottombarExpandFilled } from "react-icons/tb";
import { TbLayoutNavbarExpandFilled } from "react-icons/tb";

function PropertyPanel({ setshowPropertyPanel }) {
  const [tab, settab] = useState(false);
  const [accordionStates, setAccordionStates] = useState(
    Object.keys(data.response).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  function toggleAccordion(key) {
    setAccordionStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }

  function closeAllAccordions() {
    setAccordionStates(
      Object.keys(accordionStates).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  }
  function openAllAccordions() {
    setAccordionStates(
      Object.keys(accordionStates).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
  }

  useEffect(() => {
    openAllAccordions();
  }, []);

  function getResponse(data) {
    return (
      <div>
        <h5>DCN</h5>
        <h3>ASRock_DCN2</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {/* <FaKey size={"15"} /> */}
            <span
              className="tab-row"
              onClick={() => settab(false)}
              style={{
                borderBottom: tab === false ? "2px solid rgb(21, 203, 54)" : "",
                cursor: "pointer",
              }}
            >
              Configuration
            </span>
            <span
              className="tab-row"
              onClick={() => settab(true)}
              style={{
                borderBottom: tab === true ? "2px solid rgb(21, 203, 54)" : "",
                cursor: "pointer",
                marginLeft: "15px",
              }}
            >
              Health
            </span>
          </div>
          <div>
            <TbLayoutNavbarExpandFilled
              onClick={openAllAccordions}
              size={25}
              color="green"
            />
            <TbLayoutBottombarExpandFilled
              onClick={closeAllAccordions}
              size={25}
              color="green"
            />
          </div>
        </div>
        {tab === false ? (
          <div style={{ marginTop: "20px" }}>
            {Object.entries(data)
              .slice(2)
              .map(([key, value]) => (
                <div key={key} style={{ width: "330px" }}>
                  <CustomAccordion
                    title={key}
                    data={value}
                    isOpen={accordionStates[key]}
                    toggle={() => toggleAccordion(key)}
                  />
                  <hr></hr>
                </div>
              ))}
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {Object.entries(health)
              .slice(2)
              .map(([key, value]) => (
                <div key={key} style={{ width: "330px" }}>
                  <CustomAccordion
                    title={key}
                    data={value}
                    isOpen={accordionStates[key]}
                    toggle={() => toggleAccordion(key)}
                  />
                  <hr></hr>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="property" style={{ width: "350px" }}>
      <div className="property-head">
        <div>{getResponse(data.response)}</div>
        <div>
          <IoMdClose onClick={() => setshowPropertyPanel(false)} />
        </div>
      </div>
    </div>
  );
}

export default PropertyPanel;
