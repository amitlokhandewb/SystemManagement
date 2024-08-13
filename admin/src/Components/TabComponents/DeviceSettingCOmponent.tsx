import React, { Component, useState } from "react";
import GenericLayout from "../GenericLayout";
import MajorDeviceGeneric from "../MajorDeviceGeneric";
import {
  CreateActionBies,
  DeletectionByIdAsync,
  FetchActionBies,
  FetchActionByIdAsync,
  UpdateActionBies,
} from "../../Services/ActionBiesServices";
import {
  CreateDeviceTypeAsync,
  DeleteDeviceTypeAsync,
  FetchDeviceTypeByIdAsync,
  FetchDeviceTypes,
  UpdateDeviceTypes,
} from "../../Services/DeviceTypeServices";
import {
  CreateEventDescriptionAsync,
  DeleteEvenetDescriptionAsync,
  FetchEventDescriptionById,
  FetchEventDescripton,
  UpdateEventDescripton,
} from "../../Services/EventDescriptionService";
import {
  CreateEventTypeAsync,
  DeleteEventTypeAsync,
  FetchEventType,
  GetEventTypeByIdAsync,
  UpdateEventType,
} from "../../Services/EventTypeService";
import {
  CreatePlantNameAsycn,
  DeletePlantNameAsync,
  FetchPlantNames,
  GetPLantNameByIdAsync,
  UpdatePlantName,
} from "../../Services/PlantNameService";
import {
  CreatePriorityAsync,
  DeletePriorityAsync,
  FetchPriority,
  GetPriorityByIdAsync,
  UpdatePriority,
} from "../../Services/PriorityService";

function DeviceSettingCOmponent() {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 1,
      label: "Action By",
      Component: (
        <MajorDeviceGeneric
          label={"Action By"}
          fieldname={"actionName"}
          fieldidname={"actionById"}
          fetchAll={FetchActionBies}
          create={CreateActionBies}
          update={UpdateActionBies}
          deletebyid={DeletectionByIdAsync}
          fetchbyid={FetchActionByIdAsync}
          deviceList={deviceList}
        />
      ),
    },
    {
      id: 2,
      label: "Device Type",
      Component: (
        <MajorDeviceGeneric
          label={"Device Type"}
          fieldname={"deviceName"}
          fieldidname={"deviceTypeId"}
          fetchAll={FetchDeviceTypes}
          create={CreateDeviceTypeAsync}
          update={UpdateDeviceTypes}
          deletebyid={DeleteDeviceTypeAsync}
          fetchbyid={FetchDeviceTypeByIdAsync}
          deviceList={deviceList}
        />
      ),
    },
    {
      id: 3,
      label: "Event Description",
      Component: (
        <MajorDeviceGeneric
          label={"Event Description"}
          fieldname={"eventDescription"}
          fieldidname={"eventDescriptionId"}
          fetchAll={FetchEventDescripton}
          create={CreateEventDescriptionAsync}
          update={UpdateEventDescripton}
          deletebyid={DeleteEvenetDescriptionAsync}
          fetchbyid={FetchEventDescriptionById}
          deviceList={deviceList}
        />
      ),
    },
    {
      id: 4,
      label: "Event Type",
      Component: (
        <MajorDeviceGeneric
          label={"Event Type"}
          fieldname={"eventTypeName"}
          fieldidname={"eventTypeId"}
          fetchAll={FetchEventType}
          create={CreateEventTypeAsync}
          update={UpdateEventType}
          deletebyid={DeleteEventTypeAsync}
          fetchbyid={GetEventTypeByIdAsync}
          deviceList={deviceList}
        />
      ),
    },
    {
      id: 5,
      label: "Plant Names",
      Component: (
        <MajorDeviceGeneric
          label={"Plant Names"}
          fieldname={"plantName"}
          fieldidname={"plantId"}
          fetchAll={FetchPlantNames}
          create={CreatePlantNameAsycn}
          update={UpdatePlantName}
          deletebyid={DeletePlantNameAsync}
          fetchbyid={GetPLantNameByIdAsync}
          deviceList={deviceList}
        />
      ),
    },
    {
      id: 6,
      label: "Priorities",
      Component: (
        <MajorDeviceGeneric
          label={"Priorities"}
          fieldname={"priorityName"}
          fieldidname={"priorityId"}
          fetchAll={FetchPriority}
          create={CreatePriorityAsync}
          update={UpdatePriority}
          deletebyid={DeletePriorityAsync}
          fetchbyid={GetPriorityByIdAsync}
          deviceList={deviceList}
        />
      ),
    },
  ];

  return (
    <GenericLayout
      componentList={List}
      state={deviceList}
      setState={setDeviceList}
    />
  );
}

export default DeviceSettingCOmponent;
