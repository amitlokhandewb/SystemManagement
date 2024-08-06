import { createColumnHelper } from "@tanstack/react-table";
import {
  ActionBy,
  EventDescrition,
  EventType,
  deviceType,
  plantName,
} from "../Utilities/Data";
import { CreateRandomEvent } from "../Services/EventServices";
import { useEffect, useState } from "react";
import {
  fetchDevices,
  fetchEventDescriptions,
} from "../Services/CommonServices";

type Event = {
  eventDescription: string;
  priority: number;
  dateTime: Date | null;
  eventid: number;
  eventTypeName: string;
  deviceTypeName: string;
  actionByName: string;
  plantNames: string;
};

export const Util = () => {

  const columnHelper = createColumnHelper<Event>();
  const allColumns = [
    columnHelper.accessor("eventDescription", {
      header: "Event Description",
      sortDescFirst: true,
      cell: (info) => (
        <div style={{ textAlign: "left" }}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => (
        <span className={`conditon-${RenderPriorityName(info)}`}>
          {RenderPriorityName(info)}
        </span>
      ),
    }),
    columnHelper.accessor("dateTime", {
      header: "Date Time",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      sortDescFirst: true,
    }),
    columnHelper.accessor("eventid", {
      header: "Event ID",
      cell: (info) => info.getValue(),
      sortDescFirst: true,
    }),
    columnHelper.accessor("eventTypeName", {
      header: "Event Type",
      cell: (info) => info.getValue(),
      sortDescFirst: true,
    }),
    columnHelper.accessor("deviceTypeName", {
      header: "Device Type",
      cell: (info) => info.getValue(),
      sortDescFirst: true,
    }),
    columnHelper.accessor("actionByName", {
      header: "Action By",
      cell: (info) => info.getValue(),
      sortDescFirst: true,
    }),
    columnHelper.accessor("plantNames", {
      header: "Plant Name",
      cell: (info) => info.getValue(),
      sortDescFirst: true,
    }),
  ];
  const getColorByPriority = (priority: number) => {
    switch (priority) {
      case 1:
        return "green";
      case 2:
        return "#808080";
      case 3:
        return "#FFA500";
      case 4:
        return "red";
      default:
        return "black";
    }
  };

  enum Priority {
    low,
    medium,
    high,
    critical,
  }
  function RandomIndex(f, n) {
    return Math.floor(Math.random() * n) + f;
  }
  const RenderPriorityName = (item) => {
    return Object.keys(Priority)
      .slice(3)
      .filter((value, key) => key === item.getValue());
  };
  return { allColumns, RandomIndex };
};
