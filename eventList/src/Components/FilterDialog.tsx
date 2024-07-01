import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Button,
  DateRangePicker,
  Input,
  InputNumber,
  InputPicker,
  Radio,
  RadioGroup,
} from "rsuite";
import { EventType } from "./Util";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import { IoMdClose } from "react-icons/io";
import { FilterUtility } from "../Utilities/FilterUtility";

const priorityOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];

function FilterDialog({
  isfilterOPen,
  setisfilterOPen,
  setFilterData,
  data,
  currentPageDeviceType,
  setFilterActive,
  setCurrentPage,
  setChip
}) {
  // const FilterrUtility = FilterUtility(
  //   setisfilterOPen,
  //   setFilterData,
  //   data,
  //   currentPageDeviceType,
  //   setFilterActive,
  //   setCurrentPage,
  //   setChip
  // );

  // const {
  //   value,
  //   handlesingleReset,
  //   handleChange,
  //   filter,
  //   handleInputChange,
  //   updateDeviceType,
  //   handleApplyFilters,
  //   handleReset,
  //   handleclose
  // } = FilterrUtility;

  return (
    // <Modal
    //   isOpen={isfilterOPen}
    //   contentLabel="Filter Data"
    //   style={{
    //     overlay: {
    //       backgroundColor: "rgba(105, 104, 104, 0.75)",
    //     },
    //     content: {
    //       width: "22%",
    //       height: "85%",
    //       margin: "auto",
    //       borderRadius: "10px",
    //     },
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       marginBottom: "20px",
    //     }}
    //     className="row"
    //   >
    //     <h4>Filter Column</h4>
    //     <IoMdClose onClick={handleclose} size={20} />
    //   </div>
    //   <div >
    //     <div className="row">
    //       <label>{value.length} Filters Applied</label>
    //     </div>
    //     <div className="row">
    //       {value.map((item) => (
    //         <Button
    //           key={item}
    //           appearance="ghost"
    //           style={{ margin: 3, borderRadius: "5em / 5em" }}
    //         >
    //           {item}
    //           <CloseOutlineIcon
    //             id={item}
    //             onClick={handlesingleReset}
    //             style={{ marginLeft: "10px" }}
    //           />
    //         </Button>
    //       ))}
    //     </div>
    //     <div className="select-container row">
    //       <label>Priority </label>
    //       <select
    //         style={{ width: "100%" }}
    //         onChange={(e) => handleChange(parseInt(e.target.value), "priority")}
    //         value={filter.priority}
    //       >
    //         {priorityOptions.map((option) => (
    //           <option key={option.value} value={option.value}>
    //             {option.label}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="row">
    //       <label>Date range </label>
    //       <DateRangePicker
    //         format="MM/dd/yyyy hh:mm aa"
    //         showMeridian
    //         style={{ width: "100%" }}
    //         onChange={(e) => handleChange(e, "daterange")}
    //         value={filter.daterange}
    //       />
    //     </div>
    //     <div className="row">
    //       <label>Event Id </label>
    //       <InputNumber
    //         placeholder="Select some id"
    //         onChange={handleInputChange}
    //         value={filter.eventId}
    //         min={0}
    //         max={999}
    //         maxLength={3}
    //       />
    //     </div>
    //     <div className="row">
    //       <label>Event Type </label>
    //       <RadioGroup
    //         name="radio-group-inline"
    //         style={{ width: "auto" }}
    //         onChange={(e) => handleChange(e, "eventType")}
    //         value={filter.eventType}
    //       >
    //         <Radio value={""}>All</Radio>
    //         {EventType.map((item) => (
    //           <Radio key={item} value={item}>
    //             {item}
    //           </Radio>
    //         ))}
    //       </RadioGroup>
    //     </div>
    //     <div className="row">
    //       <label>Device Type </label>
    //       <InputPicker
    //         data={updateDeviceType}
    //         style={{ width: "100%" }}
    //         onChange={(e) => handleChange(e, "deviceType")}
    //         defaultValue={0}
    //         value={filter.deviceType}
    //       />
    //     </div>
    //   </div>

    //   <div
    //     style={{
    //       gap: 5,
    //       display: "flex",
    //       justifyContent: "end",
    //       marginTop: "20px",
    //     }}
    //     className="row"
    //   >
    //     <Button appearance="primary" color="violet" onClick={handleReset}>
    //       Reset
    //     </Button>
    //     <Button appearance="primary" color="cyan" onClick={handleApplyFilters}>
    //       Apply Filters
    //     </Button>
    //   </div>
    // </Modal>
    <></>
  );
}

export default FilterDialog;
