using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Service;

namespace SystemManagementTest.Services_Test
{
    public class DeviceTypeServiceTest
    {
        private readonly IFixture fixture;
        private readonly Mock<IDeviceTypeRepository> _dtr;
        private readonly DeviceTypeService _dts;

        public DeviceTypeServiceTest()
        {
            fixture = new Fixture();
            _dtr = new Mock<IDeviceTypeRepository>();
            _dts = new DeviceTypeService(_dtr.Object);
        }
        [Fact]
        public async void GetDeviceTypeListAsync_Test_Service_Ok()
        {
            var devicetypelist = fixture.Create<List<DeviceType>>();
            _dtr.Setup(dt => dt.GetDeviceTypesAsync()).ReturnsAsync(devicetypelist);

            var response = await _dts.GetDeviceTypesAsync();

            var list = Assert.IsType<List<DeviceType>>(response);
            Assert.NotNull(list);
        }
        [Fact]
        public async void GetDeviceTypeListAsync_Test_Service_Null()
        {
            List<DeviceType> list = null;
            _dtr.Setup(dt => dt.GetDeviceTypesAsync()).ReturnsAsync(list);

            var response = await _dts.GetDeviceTypesAsync();
            Assert.Null(response);
        }
        [Fact]
        public async void GetDeviceTypeByIdAsync_Test_Service_Ok()
        {
            var devicetypeid = 1;
            var expecteddevicetype = new DeviceType 
            {
                deviceTypeId = devicetypeid,
                deviceName = "Temperature Sensor"
            };
            _dtr.Setup(dt => dt.GetDeviceTypeByIDAsync(devicetypeid)).ReturnsAsync(expecteddevicetype);

            var response = await _dts.GetDeviceTypeByIdAsync(devicetypeid);

            var list = Assert.IsType<DeviceType>(response);
            Assert.NotNull(list);
        }
        [Fact]
        public async void GetDeviceTypeByIdAsync_Test_Service_Null()
        {
            var devicetypeid = 100;
            DeviceType devicetype = null;
            _dtr.Setup(dt => dt.GetDeviceTypeByIDAsync(devicetypeid)).ReturnsAsync(devicetype);

            var response = await _dts.GetDeviceTypeByIdAsync(devicetypeid);
            Assert.Null(response);
        }
        [Fact]
        public async void CreateDeviceTypeAsync_Test_Service_Ok()
        {
            var expecteddevicetype = new DeviceType
            {
                deviceName = "Temperature Sensor2"
            };
            _dtr.Setup(dt => dt.CreateDeviceType(expecteddevicetype)).ReturnsAsync(expecteddevicetype);

            var response = await _dts.CreateDeviceTypeAsync(expecteddevicetype);

            var list = Assert.IsType<DeviceType>(response);
            Assert.NotNull(list);
        }
        [Fact]
        public async Task CreateDeviceTypeAsync_Test_Service_Error()
        {
            var expectedDeviceType = new DeviceType
            {
                deviceName = "Temperature Sensor2"
            };

            var exception = new InvalidOperationException("An error occurred while saving the device type.");

            _dtr.Setup(dt => dt.CreateDeviceType(It.IsAny<DeviceType>())).ThrowsAsync(exception);

            var ex = await Assert.ThrowsAsync<InvalidOperationException>(() => _dts.CreateDeviceTypeAsync(expectedDeviceType));

            Assert.Equal("An error occurred while saving the device type.", ex.Message);
        } 
        [Fact]
        public async void UpdateDeviceTypeAsync_Test_Service_Ok()
        {
            var expecteddevicetype = new DeviceType
            {
                deviceTypeId = 1,
                deviceName = "Temperature Sensor2"
            };
            _dtr.Setup(dt => dt.UpdateDeviceType(expecteddevicetype, expecteddevicetype.deviceTypeId)).ReturnsAsync(expecteddevicetype);

            var response = await _dts.UpdateDeviceTypeAsync(expecteddevicetype,expecteddevicetype.deviceTypeId);

            var list = Assert.IsType<DeviceType>(response);
            Assert.NotNull(list);
        }
        [Fact]
        public async Task UpdateDeviceTypeAsync_Test_Service_Error()
        {
            var expecteddevicetype = new DeviceType
            {
                deviceTypeId = 100,
                deviceName = "Temperature Sensor2"
            };
            _dtr.Setup(dt => dt.UpdateDeviceType(expecteddevicetype, expecteddevicetype.deviceTypeId)).ReturnsAsync(expecteddevicetype);

            var response = _dts.UpdateDeviceTypeAsync(expecteddevicetype, expecteddevicetype.deviceTypeId);
            Assert.Null(response);
    
            
        }

    }
