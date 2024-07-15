using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SystemManagementApp.Migrations
{
    /// <inheritdoc />
    public partial class test16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActionBies",
                columns: table => new
                {
                    actionById = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    actionName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionBies", x => x.actionById);
                });

            migrationBuilder.CreateTable(
                name: "DeviceTypes",
                columns: table => new
                {
                    deviceTypeId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    deviceName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceTypes", x => x.deviceTypeId);
                });

            migrationBuilder.CreateTable(
                name: "EventDescription",
                columns: table => new
                {
                    eventDescriptionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    eventDescription = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventDescription", x => x.eventDescriptionId);
                });

            migrationBuilder.CreateTable(
                name: "EventTypes",
                columns: table => new
                {
                    eventTypeId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    eventTypeName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTypes", x => x.eventTypeId);
                });

            migrationBuilder.CreateTable(
                name: "PlantName",
                columns: table => new
                {
                    plantId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    plantName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantName", x => x.plantId);
                });

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    priorityId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    priorityName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.priorityId);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    eventDescription = table.Column<int>(type: "integer", nullable: false),
                    priorityId = table.Column<int>(type: "integer", nullable: false),
                    dateTime = table.Column<string>(type: "text", nullable: false),
                    eventid = table.Column<int>(type: "integer", nullable: false),
                    eventTypeId = table.Column<int>(type: "integer", nullable: false),
                    deviceTypeId = table.Column<int>(type: "integer", nullable: false),
                    actionById = table.Column<int>(type: "integer", nullable: false),
                    plantId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.id);
                    table.ForeignKey(
                        name: "FK_Events_ActionBies_actionById",
                        column: x => x.actionById,
                        principalTable: "ActionBies",
                        principalColumn: "actionById",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_DeviceTypes_deviceTypeId",
                        column: x => x.deviceTypeId,
                        principalTable: "DeviceTypes",
                        principalColumn: "deviceTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_EventDescription_eventDescription",
                        column: x => x.eventDescription,
                        principalTable: "EventDescription",
                        principalColumn: "eventDescriptionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_EventTypes_eventTypeId",
                        column: x => x.eventTypeId,
                        principalTable: "EventTypes",
                        principalColumn: "eventTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_PlantName_plantId",
                        column: x => x.plantId,
                        principalTable: "PlantName",
                        principalColumn: "plantId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_Priorities_priorityId",
                        column: x => x.priorityId,
                        principalTable: "Priorities",
                        principalColumn: "priorityId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_actionById",
                table: "Events",
                column: "actionById");

            migrationBuilder.CreateIndex(
                name: "IX_Events_deviceTypeId",
                table: "Events",
                column: "deviceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_eventDescription",
                table: "Events",
                column: "eventDescription");

            migrationBuilder.CreateIndex(
                name: "IX_Events_eventTypeId",
                table: "Events",
                column: "eventTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_plantId",
                table: "Events",
                column: "plantId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_priorityId",
                table: "Events",
                column: "priorityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "ActionBies");

            migrationBuilder.DropTable(
                name: "DeviceTypes");

            migrationBuilder.DropTable(
                name: "EventDescription");

            migrationBuilder.DropTable(
                name: "EventTypes");

            migrationBuilder.DropTable(
                name: "PlantName");

            migrationBuilder.DropTable(
                name: "Priorities");
        }
    }
}
