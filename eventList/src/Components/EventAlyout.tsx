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

function EventLayout() {
  const visibleColumnKeys = ["eventDescription", "priority", "dateTime",'eventType'];
  const initialVisibleColumns = allColumns.map((col, index) => ({
    ...col,
    id: `column-${index}`, // Ensure each column has a unique id
    visible: visibleColumnKeys.includes(col.accessorKey),
  }));

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState([
    ...initialVisibleColumns,
  ]);

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
  useEffect(() => {
    RandomData(data, setData);
  }, [data]);
  useEffect(() => {
    setTimeout(() => {
        setData(Datafromjson)
    }, 3000);
  }, []);

  return (
    <div className="event-layout">
      <h2>Event Table</h2>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div onClick={() => setIsModalOpen(true)} className="custmizebutton">
          Customize Column
        </div>
      </div>
      <div className="table-layout">
         <EventTable data={data} columns={columns} />
      </div>
      <Dialog
        tempVisibleColumns={tempVisibleColumns}
        setTempVisibleColumns={setTempVisibleColumns} // Add this line
        toggleTempColumnVisibility={toggleTempColumnVisibility}
        handleSubmit={handleSubmit}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default EventLayout;
