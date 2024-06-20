import { createColumnHelper } from "@tanstack/react-table";

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
  //   columnHelper.accessor("eventDescription", {
  //     header: "Sr. No",
  //     cell: (info) => JSON.stringify(info.row.index),
  //     enableSorting: false,
  //   }),
  columnHelper.accessor("eventDescription", {
    header: "Event Description",
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
  }),
  columnHelper.accessor("eventid", {
    header: "Event ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("eventType", {
    header: "Event Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("deviceType", {
    header: "Device Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("actionBy", {
    header: "Action By",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("plantName", {
    header: "Plant Name",
    cell: (info) => info.getValue(),
  }),
];
const getColorByPriority = (priority: number) => {
    switch (priority) {
      case 1:
        return '#808080';
      case 2:
        return 'green';
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
const EventDescrition = [
  "Temperature sensor triggered",
  "Maintenance scheduled",
  "Pressure sensor anomaly",
  "Routine inspection",
  "Fire alarm triggered",
  "Power outage",
  "Water leak detected",
  "Safety drill",
];
export const EventType = [
  "Sensor Alert",
  "Maintenance",
  "Inspection",
  "Emergency",
  "Drill",
];
export const deviceType = [
  "Temperature Sensor",
  "System",
  "Pressure Sensor",
  "Inspection Device",
  "Fire Alarm",
  "Power System",
  "Water Sensor",
  "Safety System",
  "HVAC System",
  "Security System",
];
const ActionBy = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Lee",
  "Charlie Kim",
  "David Park",
  "Eve Morgan",
  "Frank White",
  "Grace Brown",
  "Henry Davis",
];
const plantName = [
  "Main Plant",
  "Secondary Plant",
  "North Plant",
  "East Plant",
  "West Plant",
];



function RandomIndex(f, n) {
  return Math.floor(Math.random() * n) + f;
}
function RandomDescription() {
  return EventDescrition[RandomIndex(0, 7)];
}
function RandomEventID() {
  return Math.floor(Math.random() * 999) + 100;
}
function RandomEventType() {
  return EventType[RandomIndex(0, 4)];
}
function RandomDeviceType() {
  return deviceType[RandomIndex(0, 9)];
}
function RandomActionBy() {
  return ActionBy[RandomIndex(0, 8)];
}
function RandomPLantName() {
  return plantName[RandomIndex(0, 4)];
}
function RandomData(data, setData) {
  setTimeout(() => {
    if (!Array.isArray(data)) {
      data = [];
    }
    setData([
      {
        eventDescription: RandomDescription(),
        priority: RandomIndex(1, 4),
        dateTime: `${new Date()}`,
        eventid: RandomEventID(),
        eventType: RandomEventType(),
        deviceType: RandomDeviceType(),
        actionBy: RandomActionBy(),
        plantName: RandomPLantName(),
      },
      ...data,
    ]);
  }, 3000);
}

export {
  allColumns,
  RandomIndex,
  RandomDescription,
  RandomEventID,
  RandomEventType,
  RandomData,
};
