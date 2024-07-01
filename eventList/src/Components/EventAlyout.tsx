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
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import FilterDrawer from "./FilterDrawer";
import { FilterUtility } from "../Utilities/FilterUtility";
const iniitalFilter = {
  priority: 0,
  daterange: null,
  eventId: 0,
  deviceType: "",
  eventType: "",
};
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
  const [filterActive, setFilterActive] = useState(false);
  const [data, setData] = useState(Datafromjson);
  const [filterData, setFilterData] = useState(data);
  const [isfilterOPen, setisfilterOPen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState([
    ...initialVisibleColumns,
  ]);
  const [filter, setFilter] = useState(iniitalFilter);
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
    chip,
    setFilter,
    filter
  );

  const {
    // handlesingleReset,
    handleChange,
    handleInputChange,
    updateDeviceType,
    handleApplyFilters,
    handleReset,
    handleclose,
  } = FilterrUtility;
  useEffect(() => {
    RandomData(data, setData);
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

  const getUniqueDeviceTypes = () => {
    const allDeviceTypes = paginatedData.map((event) => event.deviceType);
    const uniqueDeviceTypes = allDeviceTypes.filter(
      (deviceType, index, array) => array.indexOf(deviceType) === index
    );
    return uniqueDeviceTypes;
  };

  const handleSubmit = () => {
    setVisibleColumns(tempVisibleColumns);
    setprevcolumns(tempVisibleColumns);
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
    setCurrentPage(0);
  }, [itemsperpage, filterActive]);

  useEffect(() => {
    if (!filterActive) {
      setFilterData(data);
    }
  }, [filterActive, data]);

  const columns = visibleColumns.filter((col) => col.visible);
  const handlesingleReset = (e) => {
    let id = e.target.id;
    if (id === "deviceType" || id === "eventType") {
      setFilter((prev) => ({ ...prev, [id]: "" }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "priority") {
      setFilter((prev) => ({ ...prev, priority: 0 }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "daterange") {
      setFilter((prev) => ({ ...prev, daterange: null }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    } else if (id === "eventId") {
      setFilter((prev) => ({ ...prev, eventId: 0 }));
      setChip((prevValue) => prevValue.filter((item) => item !== id));
    }
    // setFilter(filter)    
  };
  return (
    <div className="event-layout">
      <h4>Event List</h4>
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
        <div className="row">
          <label>{chip.length} Filters Applied</label>
        </div>
        <div className="row">
          {chip.map((item) => (
            <Button
              key={item}
              appearance="ghost"
              style={{ margin: 3, borderRadius: "5em / 5em" }}
            >
              {item}
              <CloseOutlineIcon
                id={item}
                onClick={handlesingleReset}
                style={{ marginLeft: "10px" }}
              />
            </Button>
          ))}
        </div>
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
      />
      {/* <FilterDialog
        isfilterOPen={isfilterOPen}
        setisfilterOPen={setisfilterOPen}
        setFilterData={setFilterData}
        data={data}
        currentPageDeviceType={currentPageDeviceType}
        setFilterActive={setFilterActive}
        setCurrentPage={setCurrentPage}
        setChip={setChip}
      /> */}
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
