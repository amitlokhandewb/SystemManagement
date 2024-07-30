const GenricINterval = (method, time) => {
  const intervalcall = setInterval(() => {
    try {
      method();
    } catch (error) {
      console.error(error)
    }
  }, time);
  return () => clearInterval(intervalcall);
};
const getUniqueDeviceTypes = (paginatedData) => {
    const allDeviceTypes = paginatedData?.map((event) => event.deviceType);
    const uniqueDeviceTypes = allDeviceTypes?.filter(
      (deviceType, index, array) => array.indexOf(deviceType) === index
    );
    return uniqueDeviceTypes;
  };
export { GenricINterval, getUniqueDeviceTypes };
