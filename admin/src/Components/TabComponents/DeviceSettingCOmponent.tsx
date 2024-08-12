import React, { Component, useState } from "react";
import GenericLayout from "../GenericLayout";
import DeviceTypeComponent from "../DeviceSettingComponents/DeviceTypeComponent";
import ActionBiesComponent from "../DeviceSettingComponents/ActionBiesComponent";
import EventDescriptionComponent from "../DeviceSettingComponents/EventDescriptionComponent";
import EventTypeComponent from "../DeviceSettingComponents/EventTypeComponent";
import PlantComponent from "../DeviceSettingComponents/PlantComponent";
import PriorityComponent from "../DeviceSettingComponents/PriorityComponent";
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
        />
        // <DeviceTypeComponent />
      ),
    },
    {
      id: 2,
      label: "Device Type",
      Component: (
        <MajorDeviceGeneric
          label={"Devcie Type"}
          fieldname={"deviceName"}
          fieldidname={"deviceTypeId"}
          fetchAll={FetchDeviceTypes}
          create={CreateDeviceTypeAsync}
          update={UpdateDeviceTypes}
          deletebyid={DeleteDeviceTypeAsync}
          fetchbyid={FetchDeviceTypeByIdAsync}
        />
      ),
    },
    {
      id: 3,
      label: "Event Description",
      Component: <EventDescriptionComponent />,
    },
    {
      id: 4,
      label: "Event Type",
      Component: <EventTypeComponent />,
    },
    {
      id: 5,
      label: "Plant Names",
      Component: <PlantComponent />,
    },
    {
      id: 6,
      label: "Priorities",
      Component: <PriorityComponent />,
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
