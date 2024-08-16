using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SystemManagementApp.Migrations
{
    /// <inheritdoc />
    public partial class addedview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "add",
                table: "RoleMappings");

            migrationBuilder.RenameColumn(
                name: "edit",
                table: "RoleMappings",
                newName: "modify");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "modify",
                table: "RoleMappings",
                newName: "edit");

            migrationBuilder.AddColumn<bool>(
                name: "add",
                table: "RoleMappings",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
