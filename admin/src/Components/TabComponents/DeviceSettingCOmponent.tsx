import React, { Component, useEffect, useState } from "react";
import GenericLayout from "../GenericLayout";
import MajorDeviceGeneric from "../MajorDeviceGeneric";
import { CreateActionBies, DeletectionByIdAsync, FetchActionBies, FetchActionByIdAsync, UpdateActionBies} from "../../Services/ActionBiesServices";
import { CreateDeviceTypeAsync, DeleteDeviceTypeAsync, FetchDeviceTypeByIdAsync, FetchDeviceTypes, UpdateDeviceTypes } from "../../Services/DeviceTypeServices";
import { CreateEventDescriptionAsync, DeleteEvenetDescriptionAsync, FetchEventDescriptionById, FetchEventDescripton, UpdateEventDescripton } from "../../Services/EventDescriptionService";
import { CreateEventTypeAsync, DeleteEventTypeAsync, FetchEventType, GetEventTypeByIdAsync, UpdateEventType } from "../../Services/EventTypeService";
import { CreatePlantNameAsycn, DeletePlantNameAsync, FetchPlantNames, GetPLantNameByIdAsync, UpdatePlantName} from "../../Services/PlantNameService";
import { CreatePriorityAsync, DeletePriorityAsync, FetchPriority, GetPriorityByIdAsync, UpdatePriority } from "../../Services/PriorityService";

function DeviceSettingComponent({ roleaccess }) {
  const [deviceList, setDeviceList] = useState(0);

  const fetchEditAccess = (data) => {
    const res = roleaccess.find((item) => item.pageName === data);
    return res?.modify;
  };

  const List = [
    {
      label: "Action By",
      Component: (
        <MajorDeviceGeneric label={"Action By"} fieldname={"actionName"} fieldidname={"actionById"} fetchAll={FetchActionBies} create={CreateActionBies} update={UpdateActionBies} deletebyid={DeletectionByIdAsync} fetchbyid={FetchActionByIdAsync} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Action By")} />
      ),
    },
    {
      label: "Device Type",
      Component: (
        <MajorDeviceGeneric label={"Device Type"} fieldname={"deviceName"} fieldidname={"deviceTypeId"} fetchAll={FetchDeviceTypes} create={CreateDeviceTypeAsync} update={UpdateDeviceTypes} deletebyid={DeleteDeviceTypeAsync} fetchbyid={FetchDeviceTypeByIdAsync} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Device Type")} />
      ),
    },
    {
      label: "Event Description",
      Component: (
        <MajorDeviceGeneric label={"Event Description"} fieldname={"eventDescription"} fieldidname={"eventDescriptionId"} fetchAll={FetchEventDescripton} create={CreateEventDescriptionAsync} update={UpdateEventDescripton} deletebyid={DeleteEvenetDescriptionAsync} fetchbyid={FetchEventDescriptionById} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Event Description")} />
      ),
    },
    {
      label: "Event Type",
      Component: (
        <MajorDeviceGeneric label={"Event Type"} fieldname={"eventTypeName"} fieldidname={"eventTypeId"} fetchAll={FetchEventType} create={CreateEventTypeAsync} update={UpdateEventType} deletebyid={DeleteEventTypeAsync} fetchbyid={GetEventTypeByIdAsync} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Event Type")} />
      ),
    },
    {
      label: "Plant Names",
      Component: (
        <MajorDeviceGeneric label={"Plant Names"} fieldname={"plantName"} fieldidname={"plantId"} fetchAll={FetchPlantNames} create={CreatePlantNameAsycn} update={UpdatePlantName} deletebyid={DeletePlantNameAsync} fetchbyid={GetPLantNameByIdAsync} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Plant Names")} />
      ),
    },
    {
      label: "Priorities",
      Component: (
        <MajorDeviceGeneric label={"Priorities"} fieldname={"priorityName"} fieldidname={"priorityId"} fetchAll={FetchPriority} create={CreatePriorityAsync} update={UpdatePriority} deletebyid={DeletePriorityAsync} fetchbyid={GetPriorityByIdAsync} deviceList={deviceList} fetchEditAccess={fetchEditAccess("Priorities")} />
      ),
    },
  ];

  const filteredList = List.filter((item) =>
    roleaccess.some((access) => access.pageName === item?.label && access.view)
  );

  return (
    <GenericLayout
      componentList={filteredList}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default DeviceSettingComponent;
