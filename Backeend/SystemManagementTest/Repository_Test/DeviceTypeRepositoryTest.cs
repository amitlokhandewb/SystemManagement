using AutoFixture;
using Castle.Core.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemManagementApp.Data;
using SystemManagementApp.IRepository;
using SystemManagementApp.Model;

namespace SystemManagementTest.Repository_Test
{
    public class DeviceTypeRepositoryTest
    {
        private readonly Mock<IDeviceTypeRepository> _dtr;
        private readonly IFixture fixture;

        public DeviceTypeRepositoryTest()
        {
            _dtr = new Mock<IDeviceTypeRepository>();
            fixture = new Fixture();
        }
        [Fact]
        public async void GetDeviceTypeListAsync_Test_Ok()
        {

            var list = fixture.Create<List<DeviceType>>();
            _dtr.Setup(dt => dt.GetDeviceTypesAsync()).ReturnsAsync(list);

            var response = await _dtr.Object.GetDeviceTypesAsync();

            Assert.IsType<List<DeviceType>>(response);
            Assert.NotNull(response);
        }
        [Fact]
        public async void GetDeviceTypeListAsync_Test_Empty()
        {

            List<DeviceType> list = null;
            _dtr.Setup(dt => dt.GetDeviceTypesAsync()).ReturnsAsync(list);

            var response = await _dtr.Object.GetDeviceTypesAsync();
            Assert.Null(response);
        }
    }
}
