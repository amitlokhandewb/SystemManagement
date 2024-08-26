using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SystemManagementApp.Migrations
{
    /// <inheritdoc />
    public partial class addedperisson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "modify",
                table: "RoleMappings");

            migrationBuilder.DropColumn(
                name: "pageNo",
                table: "RoleMappings");

            migrationBuilder.DropColumn(
                name: "view",
                table: "RoleMappings");

            migrationBuilder.RenameColumn(
                name: "roleId",
                table: "RoleMappings",
                newName: "parentId");

            migrationBuilder.CreateTable(
                name: "PagePermissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rolemappingId = table.Column<int>(type: "integer", nullable: false),
                    roleId = table.Column<int>(type: "integer", nullable: false),
                    view = table.Column<bool>(type: "boolean", nullable: false),
                    modify = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PagePermissions", x => x.id);
                    table.ForeignKey(
                        name: "FK_PagePermissions_RoleMappings_rolemappingId",
                        column: x => x.rolemappingId,
                        principalTable: "RoleMappings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PagePermissions_UserRoles_roleId",
                        column: x => x.roleId,
                        principalTable: "UserRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PagePermissions_roleId",
                table: "PagePermissions",
                column: "roleId");

            migrationBuilder.CreateIndex(
                name: "IX_PagePermissions_rolemappingId",
                table: "PagePermissions",
                column: "rolemappingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PagePermissions");

            migrationBuilder.RenameColumn(
                name: "parentId",
                table: "RoleMappings",
                newName: "roleId");

            migrationBuilder.AddColumn<bool>(
                name: "modify",
                table: "RoleMappings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "pageNo",
                table: "RoleMappings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "view",
                table: "RoleMappings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
