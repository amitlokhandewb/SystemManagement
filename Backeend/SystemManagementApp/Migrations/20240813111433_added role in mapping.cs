using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SystemManagementApp.Migrations
{
    /// <inheritdoc />
    public partial class addedroleinmapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "roleId",
                table: "RoleMappings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "roleId",
                table: "RoleMappings");
        }
    }
}
