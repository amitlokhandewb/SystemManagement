import React, { Component, useState } from "react";
import GenericLayout from "../GenericLayout";
import DeviceTypeComponent from "../DeviceSettingComponents/DeviceTypeComponent";
import ActionBiesComponent from "../DeviceSettingComponents/ActionBiesComponent";
import EventDescriptionComponent from "../DeviceSettingComponents/EventDescriptionComponent";
import EventTypeComponent from "../DeviceSettingComponents/EventTypeComponent";
import PlantComponent from "../DeviceSettingComponents/PlantComponent";
import PriorityComponent from "../DeviceSettingComponents/PriorityComponent";

function DeviceSettingCOmponent() {
  const [deviceList, setDeviceList] = useState(1);

  const List = [
    {
      id: 1,
      label: "Action By",
      Component: <ActionBiesComponent />,
    },
    {
      id: 2,
      label: "Device Type",
      Component: <DeviceTypeComponent />,
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
