import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const plantOptions = [
  { value: "Main Plant", label: "Main Plant" },
  { value: "Secondary Plant", label: "Secondary Plant" },
  { value: "North Plant", label: "North Plant" },
  { value: "East Plant", label: "East Plant" },
  { value: "West Plant", label: "West Plant" },
];

const priorityOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];

function FilterDialog({ isfilterOPen, setisfilterOPen, setFilterData, data }) {
  const [filter, setFilter] = useState({
    priority: [],
    plantName: [],
  });

  const handlePriorityChange = (selectedOptions) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      priority: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handlePlantNameChange = (selectedOptions) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      plantName: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  useEffect(() => {
    const getFilterData = () => {
      if (filter.priority.length === 0 && filter.plantName.length === 0) {
        setFilterData(data);
      } else {
        const filters = data.filter(
          (item) =>
            (filter.priority.length === 0 || filter.priority.includes(item.priority)) &&
            (filter.plantName.length === 0 || filter.plantName.includes(item.plantName))
        );
        setFilterData(filters);
      }
    };
    getFilterData();
  }, [filter, data, setFilterData]);

  return (
    <Modal
      isOpen={isfilterOPen}
      onRequestClose={() => setisfilterOPen(false)}
      contentLabel="Filter Data"
      style={{
        overlay: {
          backgroundColor: "rgba(105, 104, 104, 0.75)",
        },
        content: {
          width: "30%",
          height: "40%",
          margin: "auto",
          borderRadius: "10px",
        },
      }}
    >
      <div>FilterDialog</div>
      <div>
        <label>Priority</label>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          options={priorityOptions}
          onChange={handlePriorityChange}
          value={priorityOptions.filter((option) => filter.priority.includes(option.value))}
        />
      </div>
      <div>
        <label>Plant Name</label>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          options={plantOptions}
          onChange={handlePlantNameChange}
          value={plantOptions.filter((option) => filter.plantName.includes(option.value))}
        />
      </div>
    </Modal>
  );
}

export default FilterDialog;
