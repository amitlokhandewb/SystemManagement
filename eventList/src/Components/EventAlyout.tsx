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
import "rsuite/dist/rsuite.min.css";
import { Button, IconButton } from "rsuite";
import Pagination from "./Pagination"; // Import the Pagination component
import FunnelIcon from "@rsuite/icons/Funnel";

function EventLayout() {
  const visibleColumnKeys = [
    "eventDescription",
    "priority",
    "dateTime",
    "eventType",
    "eventid",
    "deviceType",
  ];
  const initialVisibleColumns = allColumns.map((col, index) => ({
    ...col,
    id: `column-${index}`,
    visible: visibleColumnKeys.includes(col.accessorKey),
  }));

  const [data, setData] = useState(Datafromjson);
  const [filterData, setFilterData] = useState(Datafromjson);
  const [isfilterOPen, setisfilterOPen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState([
    ...initialVisibleColumns,
  ]);
  const [itemsperpage, setItemsperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPageDeviceType, setcurrentPageDeviceType] = useState([]);

  const totalPages = Math.ceil(filterData.length / itemsperpage);

  useEffect(() => {
    RandomData(data, setData);
  }, [data]);

  const toggleTempColumnVisibility = (index) => {
    setTempVisibleColumns((prev) =>
      prev.map((col, i) =>
        i === index ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const getUniqueDeviceTypes = () => {
    const allDeviceTypes = paginatedData.map((event) => event.deviceType);
    const uniqueDeviceTypes = allDeviceTypes.filter(
      (deviceType, index, array) => array.indexOf(deviceType) === index
    );
    return uniqueDeviceTypes;
  };

  const handleSubmit = () => {
    setVisibleColumns(tempVisibleColumns);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const start = currentPage * itemsperpage;
    const end = start + itemsperpage;
    setPaginatedData(filterData.slice(start, end));
  }, [filterData, currentPage, itemsperpage]);

  useEffect(() => {
    setcurrentPageDeviceType(getUniqueDeviceTypes());
  }, [paginatedData]);

  useEffect(() => {
    setCurrentPage(0); // Reset to first page whenever items per page changes
  }, [itemsperpage]);

  const columns = visibleColumns.filter((col) => col.visible);

  return (
    <div className="event-layout">
      <h4>Event Table</h4>
      <div style={{ display: "flex", justifyContent: "end", gap: 5 }}>
        <Button onClick={() => setIsModalOpen(true)} appearance="ghost">
          Customize Column
        </Button>
        <IconButton
          onClick={() => setisfilterOPen(true)}
          appearance="ghost"
          icon={<FunnelIcon />}
        />
      </div>
      <div className="table-layout">
        <EventTable data={paginatedData} columns={columns} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        setItemsperpage={setItemsperpage}
        itemsperpage={itemsperpage}
      />
      <Dialog
        tempVisibleColumns={tempVisibleColumns}
        setTempVisibleColumns={setTempVisibleColumns}
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
        currentPageDeviceType={currentPageDeviceType}
      />
    </div>
  );
}

export default EventLayout;
