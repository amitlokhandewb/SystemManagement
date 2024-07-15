using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SystemManagementApp.Migrations
{
    /// <inheritdoc />
    public partial class test17 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventDescription_eventDescription",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "eventDescription",
                table: "Events",
                newName: "eventDescriptionId");

            migrationBuilder.RenameIndex(
                name: "IX_Events_eventDescription",
                table: "Events",
                newName: "IX_Events_eventDescriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventDescription_eventDescriptionId",
                table: "Events",
                column: "eventDescriptionId",
                principalTable: "EventDescription",
                principalColumn: "eventDescriptionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_EventDescription_eventDescriptionId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "eventDescriptionId",
                table: "Events",
                newName: "eventDescription");

            migrationBuilder.RenameIndex(
                name: "IX_Events_eventDescriptionId",
                table: "Events",
                newName: "IX_Events_eventDescription");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventDescription_eventDescription",
                table: "Events",
                column: "eventDescription",
                principalTable: "EventDescription",
                principalColumn: "eventDescriptionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
