import React, { useEffect, useState } from "react";
import EventTable from "./EventTable";
import Datafromjson from "../Resources/EventList.json";
import Modal from "react-modal";
import { createColumnHelper } from "@tanstack/react-table";
import "../Resources/Index.css";
import { IoMdClose } from "react-icons/io";
import Dialog from "./Dialog";
import { ClipLoader } from "react-spinners";
import FilterDialog from "./FilterDialog";
import "rsuite/dist/rsuite.min.css";
import { Button, IconButton } from "rsuite";
import Pagination from "./Pagination"; // Import the Pagination component
import FunnelIcon from "@rsuite/icons/Funnel";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import FilterDrawer from "./FilterDrawer";
import { FilterUtility } from "../Utilities/FilterUtility";
import { Chip, Stack } from "@mui/material";
import CustomChip from "./CustomChip";
import { CreateRandomEvent, fetchEventList } from "../Services/EventServices";
import { Util } from "./Util";
import { GenricINterval, getUniqueDeviceTypes } from "../Utilities/Generic";

function EventLayout() {
  const Uitl = Util();
  const { allColumns } = Uitl;
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
  const [filterActive, setFilterActive] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(data);
  const [isfilterOPen, setisfilterOPen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState([
    ...initialVisibleColumns,
  ]);
  const [chip, setChip] = useState([]);
  const [prevColumns, setprevcolumns] = useState(initialVisibleColumns);
  const [itemsperpage, setItemsperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const [currentPageDeviceType, setcurrentPageDeviceType] = useState([]);
  const totalPages = Math.ceil(filterData.length / itemsperpage);

  const FilterrUtility = FilterUtility(
    setisfilterOPen,
    setFilterData,
    data,
    currentPageDeviceType,
    setFilterActive,
    setCurrentPage,
    setChip,
    chip
  );

  const {
    handlesingleReset,
    handleChange,
    handleInputChange,
    updateDeviceType,
    handleApplyFilters,
    handleReset,
    handleclose,
    filter,
  } = FilterrUtility;
  useEffect(() => {
    if (!filterActive) {
      setFilterData(data);
    }
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
    setprevcolumns(tempVisibleColumns);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const start = currentPage * itemsperpage;
    const end = start + itemsperpage;
    setPaginatedData(filterData?.slice(start, end));
  }, [filterData, currentPage, itemsperpage]);

  useEffect(() => {
    setcurrentPageDeviceType(getUniqueDeviceTypes(paginatedData));
  }, [paginatedData]);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsperpage, filterActive]);

  useEffect(() => {
    if (!filterActive) {
      setFilterData(data);
    }
  }, [filterActive, data]);

  const fetcheventList = async () => {
    const response = await fetchEventList();
    setData(response);
  };

  useEffect(() => {
    GenricINterval(CreateRandomEvent, 10000);
    GenricINterval(fetcheventList, 10000);
   
  }, []);
  const columns = visibleColumns.filter((col) => col.visible);
  return (
    <div className="event-layout">
      <h4>Event List</h4>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <CustomChip
          chip={chip}
          handlesingleReset={handlesingleReset}
          filter={filter}
        />
        <div>
          <Button onClick={() => setIsModalOpen(true)} appearance="ghost">
            Customize Column
          </Button>
          <IconButton
            onClick={() => setisfilterOPen(true)}
            appearance="ghost"
            icon={<FunnelIcon />}
          />
        </div>
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
        prevColumns={prevColumns}
        allColumns={allColumns}
      />
      <FilterDrawer
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        updateDeviceType={updateDeviceType}
        handleApplyFilters={handleApplyFilters}
        handleReset={handleReset}
        handleclose={handleclose}
        isfilterOPen={isfilterOPen}
        filter={filter}
      />
    </div>
  );
}

export default EventLayout;
