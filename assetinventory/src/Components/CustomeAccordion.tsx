import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface CustomAccordionProps {
  title: string;
  data: any;
  isOpen: boolean;
  toggle: () => void;
  parentKey?: string;  // Make parentKey optional
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ title, data, isOpen, toggle, parentKey }) => {
  const [nestedAccordionStates, setNestedAccordionStates] = useState<{ [key: string]: boolean }>({});

  function toggleNestedAccordion(key: string) {
    setNestedAccordionStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }

  function renderKeyValue(item: any, parentKey: string = "") {
    return Object.entries(item).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <CustomAccordion
              title={key}
              data={value}
              isOpen={nestedAccordionStates[key]}
              toggle={() => toggleNestedAccordion(key)}
              parentKey={key}
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
              parentKey={parentKey}
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

  function renderArray(array: any[], parentKey: string) {
    return array.map((item, index) => {
      const title = `${parentKey} ${index + 1}`;
      return (
        <div key={index} style={{ marginBottom: "10px" }}>
          <CustomAccordion
            title={title}
            data={item}
            isOpen={nestedAccordionStates[title]}
            toggle={() => toggleNestedAccordion(title)}
          />
        </div>
      );
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
            cursor: "pointer",
            padding: "2px",
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
          {Array.isArray(data) ? renderArray(data, title) : renderKeyValue(data, title)}
        </div>
      )}
    </div>
  );
}

export default CustomAccordion;
