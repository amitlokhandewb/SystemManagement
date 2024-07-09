const GenricINterval = (method) => {
  const intervalcall = setInterval(() => {
    method();
  }, 2000);
  return () => clearInterval(intervalcall);
};
const getUniqueDeviceTypes = (paginatedData) => {
    const allDeviceTypes = paginatedData.map((event) => event.deviceType);
    const uniqueDeviceTypes = allDeviceTypes.filter(
      (deviceType, index, array) => array.indexOf(deviceType) === index
    );
    return uniqueDeviceTypes;
  };
export { GenricINterval, getUniqueDeviceTypes };
