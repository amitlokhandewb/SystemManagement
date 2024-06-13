import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function CustomAccordion({ title, data, isOpen, toggle }) {
  const [nestedAccordionStates, setNestedAccordionStates] = useState({});

  function toggleNestedAccordion(key) {
    setNestedAccordionStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }

  function renderKeyValue(item) {
    return Object.entries(item).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <CustomAccordion
              title={key}
              data={value}
              isOpen={nestedAccordionStates[key]}
              toggle={() => toggleNestedAccordion(key)}
            />
          </div>
        );
      } else if (typeof value === "object" && value !== null) {
        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <CustomAccordion
              title={key}
              data={value}
              isOpen={nestedAccordionStates[key]}
              toggle={() => toggleNestedAccordion(key)}
            />
          </div>
        );
      } else {
        return (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0",
            }}
          >
            <div>{key}</div>
            <div>{String(value)}</div>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <div
        onClick={toggle}
        style={{
          backgroundColor: isOpen ? "#f7f7f7" : "white",
        }}
        className="custom-accordion2"
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
        </div>
        <div style={{ marginTop: "10px" }}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div style={{ padding: "10px" }}>
          {Array.isArray(data)
            ? data.map((item, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  {renderKeyValue(item)}
                </div>
              ))
            : renderKeyValue(data)}
        </div>
      )}
    </div>
  );
}

export default CustomAccordion;
