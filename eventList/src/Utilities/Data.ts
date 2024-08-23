export const priorityOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];
export const EventDescrition = [
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
export const ActionBy = [
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
export const plantName = [
  "Main Plant",
  "Secondary Plant",
  "North Plant",
  "East Plant",
  "West Plant",
];
export const SortKeysBinding = [
  {
    label : "Date Time",
    value : "dateTime"
  },
  {
    label: "Event Description",
    value: "eventDescription"
  },
  {
    label: "Priority",
    value: "priorityName"
  },
  {
    label: "Event ID",
    value: "eventid"
  },
  {
    label: "Event Type",
    value: "eventTypeName"
  },
  {
    label: "Device Type",
    value: "deviceName"
  },
  {
    label: "Action By",
    value: "actionName"
  },
  {
    label: "Plant Name",
    value: "plantName"
  },
];

export const GetSortByvalue = (item) => {
  return SortKeysBinding.find((x) => x.label === item).value;
}

const APIURL = 'https://localhost:7105/api/';
export { APIURL }
