import { createColumnHelper } from "@tanstack/react-table";
import { ActionBy, EventDescrition, EventType, deviceType, plantName } from "../Utilities/Data";

type Event = {
  eventDescription: string;
  priority: number;
  dateTime: Date | null;
  eventid: number;
  eventType: string;
  deviceType: string;
  actionBy: string;
  plantName: string;
};

const columnHelper = createColumnHelper<Event>();

const allColumns = [
  columnHelper.accessor("eventDescription", {
    header: "Event Description",
    sortDescFirst: true,
    cell: (info) => <div style={{ textAlign: 'left'}}>{info.getValue()}</div>,
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => (
      <span style={{ color: getColorByPriority(info.getValue()) }}>
        {Object.keys(Priority)
          .slice(3)
          .filter((value, key) => key === info.getValue())}
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
  columnHelper.accessor("eventType", {
    header: "Event Type",
    cell: (info) => info.getValue() === '' ? 'N/A'  : info.getValue(),
    sortDescFirst: true,
  }),
  columnHelper.accessor("deviceType", {
    header: "Device Type",
    cell: (info) => info.getValue(),
    sortDescFirst: true,
  }),
  columnHelper.accessor("actionBy", {
    header: "Action By",
    cell: (info) => info.getValue(),
    sortDescFirst: true,
  }),
  columnHelper.accessor("plantName", {
    header: "Plant Name",
    cell: (info) => info.getValue(),
    sortDescFirst: true,
  }),
];
const getColorByPriority = (priority: number) => {
    switch (priority) {
      case 1:
        return 'green';
      case 2:
        return '#808080';
      case 3:
        return '#FFA500';
      case 4:
        return 'red';
      default:
        return 'black';
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
function RandomData(data, setData) {
  setTimeout(() => {
    if (!Array.isArray(data)) {
      data = [];
    }
    setData([
      {
        eventDescription: EventDescrition[RandomIndex(0, 7)],
        priority: RandomIndex(1, 4),
        dateTime: `${new Date()}`,
        eventid: Math.floor(Math.random() * 999) + 100,
        eventType: EventType[RandomIndex(0, 4)],
        deviceType: deviceType[RandomIndex(0, 9)],
        actionBy: ActionBy[RandomIndex(0, 8)],
        plantName: plantName[RandomIndex(0, 4)],
      },
      ...data,
    ]);
  }, 500);
}

export {
  allColumns,
  RandomIndex,
  RandomData,
};
