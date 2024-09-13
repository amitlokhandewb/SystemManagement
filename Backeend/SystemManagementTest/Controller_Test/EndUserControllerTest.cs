
using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemManagementApp.Controllers;
using SystemManagementApp.IServices;
using SystemManagementApp.Model;

namespace SystemManagementTest.Controller_Test
{
    public class EndUserControllerTest
    {
        private readonly IFixture fixture;
        private readonly EndUserController controller;
        private readonly Mock<IEndUserService> _eus;

        public EndUserControllerTest()
        {
            fixture = new Fixture();
            _eus = new Mock<IEndUserService>();
            controller = new EndUserController(_eus.Object);
        }
        [Fact]
        public async void GetEndUserAsync_Test_Ok()
        {
            var enduser = fixture.Create<List<EndUser>>();
            _eus.Setup(x => x.GetEndUsersAsync()).ReturnsAsync(enduser);

            var response = (await controller.GetEndUsersAsync()).Result;
            var okresult = Assert.IsType<OkObjectResult>(response);
            var resultdata = Assert.IsType<List<EndUser>>(okresult.Value);

            Assert.NotNull(resultdata);
            Assert.IsType<List<EndUser>>(resultdata);


        }        
        [Fact]
        public async void GetEndUserAsync_Test_BadReuqest()
        {
            List<EndUser> list = null;
            _eus.Setup(x => x.GetEndUsersAsync()).ReturnsAsync(list);
            var response = (await controller.GetEndUsersAsync()).Result;

            var okresult = Assert.IsType<BadRequestObjectResult>(response);
            var oklist = Assert.IsType<string>(okresult.Value);
            Assert.IsType<string>(oklist);


        }
        [Fact]
        public async void GetEndUserByIdAsync_Test_Ok()
        {
            var enduserid = 14;
            var enduser = fixture.Create<EndUser>();
            _eus.Setup(x => x.GetEndUserByIdAsync(enduserid)).ReturnsAsync(enduser);
            
            var response = (await controller.GetEndUserByIdAsync(enduserid)).Result;

            var okresult = Assert.IsType<OkObjectResult>(response);
            var okeduser = Assert.IsType<EndUser>(okresult.Value);
            Assert.NotNull(okeduser);
            Assert.IsType<EndUser>(okeduser);


        }
        [Fact]
        public async void GetEndUserByIdAsync_Test_NotFound()
        {
            var enduserid = 140;
            var response = await controller.GetEndUserByIdAsync(enduserid);

            var okresult = Assert.IsType<BadRequestResult>(response.Result);
            Assert.Null(response.Value);

        }
    }
}
