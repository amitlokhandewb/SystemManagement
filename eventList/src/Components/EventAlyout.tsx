import React, { useEffect, useState } from "react";
import EventTable from "./EventTable";
import Datafromjson from "../Resources/EventList.json";
import Modal from "react-modal";
import { createColumnHelper } from "@tanstack/react-table";
import "../Resources/Index.css";
import { RandomData, allColumns } from "./Util";
import { IoMdClose } from "react-icons/io";
import Dialog from "./Dialog";
import { ClipLoader } from "react-spinners";
import FilterDialog from "./FilterDialog";
import 'rsuite/dist/rsuite.min.css';
import { Button } from "rsuite";

function EventLayout() {
  const visibleColumnKeys = ["eventDescription", "priority", "dateTime", 'eventType','plantName'];
  const initialVisibleColumns = allColumns.map((col, index) => ({
    ...col,
    id: `column-${index}`,
    visible: visibleColumnKeys.includes(col.accessorKey),
  }));
  
  const [data, setData] = useState(Datafromjson); 
  const [filterData, setFilterData] = useState([]);
  const [isfilterOPen, setisfilterOPen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState([
    ...initialVisibleColumns,
  ]);

  useEffect(() => {
    RandomData(data, setData);
  }, [data]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const toggleTempColumnVisibility = (index) => {
    setTempVisibleColumns((prev) =>
      prev.map((col, i) =>
        i === index ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSubmit = () => {
    setVisibleColumns(tempVisibleColumns);
    setIsModalOpen(false);
  };

  const columns = visibleColumns.filter((col) => col.visible);

  return (
    <div className="event-layout">
      <h4>Event Table</h4>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={() => setIsModalOpen(true)} appearance="primary"  >
          Customize Column
        </Button>
        <Button onClick={() => setisfilterOPen(true)} appearance="primary" color="red" style={{ marginLeft: 5}}>
          Filter
        </Button>
      </div>
      <div className="table-layout">
        <EventTable data={filterData} columns={columns} />
      </div>
      <Dialog
        tempVisibleColumns={tempVisibleColumns}
        setTempVisibleColumns={setTempVisibleColumns} // Add this line
        toggleTempColumnVisibility={toggleTempColumnVisibility}
        handleSubmit={handleSubmit}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <FilterDialog
        isfilterOPen={isfilterOPen}
        setisfilterOPen={setisfilterOPen}
        setFilterData={setFilterData}
        data={data}
      />
    </div>
  );
}

export default EventLayout;
