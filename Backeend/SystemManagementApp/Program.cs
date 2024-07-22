using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using SystemManagementApp.Data;
using SystemManagementApp.Repository;
using SystemManagementApp.Service;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connection));
builder.Services.AddControllers();
builder.Services.AddScoped<EventService, EventService>();
builder.Services.AddScoped<EventRepository,EventRepository>();
builder.Services.AddScoped<EventFilterService, EventFilterService>();
builder.Services.AddScoped<DeviceTypeRepository,DeviceTypeRepository>();
builder.Services.AddScoped<DeviceTypeService,DeviceTypeService>();
builder.Services.AddScoped<EventDescriptionRepository,EventDescriptionRepository>();
builder.Services.AddScoped<EventDescriptionService, EventDescriptionService>();
builder.Services.AddScoped<EvenTypeRepository,EvenTypeRepository>();
builder.Services.AddScoped<EventTypeService, EventTypeService>();
builder.Services.AddScoped<PriorityRepository, PriorityRepository>();
builder.Services.AddScoped<PriorityService, PriorityService>();
builder.Services.AddScoped<PlantNameRepository,PlantNameRepository>();
builder.Services.AddScoped<PlantNameService, PlantNameService>();
builder.Services.AddScoped<UserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<RoleRepository, RoleRepository>();
builder.Services.AddScoped<RoleService, RoleService>();
builder.Services.AddScoped<EndUserRepository, EndUserRepository>();
builder.Services.AddScoped<EndUserService, EndUserService>();
builder.Services.AddScoped<AuthorizeTokenAttribute, AuthorizeTokenAttribute>();
var brancakey = builder.Configuration["Branca:Key"];
if (brancakey == null || brancakey.Length < 32)
{
    var keylength = brancakey.Length;
    throw new ArgumentException("The Branca key must be 32 bytes long.");
}
//builder.Services.AddSingleton(new BrancaService(brancakey));
builder.Services.AddSingleton(new BrancaService(brancakey));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
