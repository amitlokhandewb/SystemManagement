using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SystemManagementApp.Controllers;
using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;
using SystemManagementApp.Repository;
using SystemManagementApp.Service;

namespace SystemManagementTest.Controller_Test
{
    public class DeviceTypeControllerTest
    {
        private readonly IFixture fixture;
        private readonly DeviceTypeController _controller;
        private readonly Mock<IDeviceTypeService> _dts;

        public DeviceTypeControllerTest()
        {
            fixture = new Fixture();
            _dts = new Mock<IDeviceTypeService>();
            _controller = new DeviceTypeController(_dts.Object);
        }
        [Fact]
        public async void Get_All_DeviceTypes_Test_Ok()
        {
            var deviceTypeList = fixture.Create<List<DeviceType>>();
            _dts.Setup(d => d.GetDeviceTypesAsync()).ReturnsAsync(deviceTypeList);

            var result = await _controller.GetAllDeviceTypeAsync();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultList = Assert.IsType<List<DeviceType>>(okResult.Value);
            Assert.NotNull(resultList);
            Assert.IsType<List<DeviceType>>(resultList);  
        }
        [Fact]
        public async void Get_All_DeviceTypes_Test_NotFound()
        {
            List<DeviceType> deviceTypeList = null;
            _dts.Setup(d => d.GetDeviceTypesAsync()).ReturnsAsync(deviceTypeList);

            var result = await _controller.GetAllDeviceTypeAsync();

            var okResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value);
        }
        [Fact]
        public async void Get_DeviceType_by_Id_test_OK()
        {
            var devicetypeid = 1;
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.GetDeviceTypeByIdAsync(devicetypeid)).ReturnsAsync(deviceType);
            var result = await _controller.GetDeviceTypeById(devicetypeid);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultdata = Assert.IsType<DeviceType>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<DeviceType>(resultdata);

        } 
        [Fact]
        public async void Get_DeviceType_by_Id_test_NotFound()
        {
            var devicetypeid = 100;
            var result = await _controller.GetDeviceTypeById(devicetypeid);
            var okResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value);

        }
        [Fact]
        public async void Create_DeviceType_test_Ok()
        {
            var devicetypename = new DeviceType
            {
                deviceName= "Demo"
            };
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.CreateDeviceTypeAsync(devicetypename)).ReturnsAsync(deviceType);
            var result = await _controller.CreateDeviceTypeAsync(devicetypename);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);

        }
        [Fact]
        public async void Create_DeviceType_test_Badrequest_Empty()
        {
            var devicetypename = new DeviceType
            {
                deviceName= ""
            };
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.CreateDeviceTypeAsync(devicetypename)).ReturnsAsync(deviceType);
            var result = await _controller.CreateDeviceTypeAsync(devicetypename);
            var okResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);

        }
        [Fact]
        public async void Create_DeviceType_test_NotFound_Duplicate()
        {
            var devicetypename = new DeviceType
            {
                deviceName= "Temperature Sensor"
            };
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.GetDeviceTypeByNameAsync(devicetypename.deviceName)).ReturnsAsync(deviceType);
            var result = await _controller.CreateDeviceTypeAsync(devicetypename);
            var okResult = Assert.IsType<BadRequestObjectResult>(result.Result);

            Assert.Null(result.Value);
        }
        [Fact]
        public async void Update_DeviceType_test_Ok()
        {
            var deviceTyoeId = 1;
            var devicetypename = new DeviceType
            {
                deviceName= "Temperature Sensor2"
            };
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.UpdateDeviceTypeAsync(devicetypename, deviceTyoeId)).ReturnsAsync(deviceType);
            var result = await _controller.UpdateDeviceTypeAsync(devicetypename, deviceTyoeId);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);
        }
        [Fact]
        public async void Update_DeviceType_test_BadRequest_Duplicate()
        {
            var deviceTyoeId = 1;
            var devicetypename = new DeviceType
            {
                deviceName= "Temperature Sensor"
            };
            var deviceType = fixture.Create<DeviceType>();
            _dts.Setup(d => d.GetDeviceTypeByNameAsync(devicetypename.deviceName)).ReturnsAsync(deviceType);
            var result = await _controller.UpdateDeviceTypeAsync(devicetypename, deviceTyoeId);
            var okResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);
        }
        [Fact]
        public async void Update_DeviceType_test_BadRequest()
        {
            var deviceTyoeId = 1;
            var devicetypename = new DeviceType
            {
                deviceName= "Temperature Sensor"
            };
            //var deviceType = fixture.Create<DeviceType>();
            //_dts.Setup(d => d.GetDeviceTypeByNameAsync(devicetypename.deviceName)).ReturnsAsync(deviceType);
            var result = await _controller.UpdateDeviceTypeAsync(devicetypename, deviceTyoeId);
            var okResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);
        }
        [Fact]
        public async void Delete_DeviceType_test_BadRequest()
        {
            var deviceTyoeId = 1;
            var result = await _controller.DeleteDeviceTypeAsync(deviceTyoeId);
            var okResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);
        }
        [Fact]
        public async void Delete_DeviceType_test_Ok()
        {
            var deviceTyoeId = 1;
            var deviceType = fixture.Create<Boolean>();
            _dts.Setup(d => d.DeleteDeviceTypeAsync(deviceTyoeId)).ReturnsAsync(deviceType);
            var result = await _controller.DeleteDeviceTypeAsync(deviceTyoeId);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultdata = Assert.IsType<string>(okResult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<string>(resultdata);
        }
    }
}
