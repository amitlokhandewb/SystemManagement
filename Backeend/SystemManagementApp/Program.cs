    using Microsoft.EntityFrameworkCore;
    using SystemManagementApp.Data;
    using SystemManagementApp.IRepository;
using SystemManagementApp.IServices;
using SystemManagementApp.Repository;
    using SystemManagementApp.Service;

    var builder = WebApplication.CreateBuilder(args);
    var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
    // Add services to the container.
    var connection = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connection));
    builder.Services.AddControllers();
    builder.Services.AddScoped<IDeviceTypeRepository, DeviceTypeRepository>();
    builder.Services.AddScoped<IDeviceTypeService, DeviceTypeService>();
    builder.Services.AddScoped<IEventRepository,EventRepository>();
    builder.Services.AddScoped<IEventFilterService, EventFilterService>();
    builder.Services.AddScoped<IEventService, EventService>();
    builder.Services.AddScoped<IEventDescriptionRepository,EventDescriptionRepository>();
    builder.Services.AddScoped<IEventDescritionService, EventDescriptionService>();
    builder.Services.AddScoped<IEventTypeRepository,EvenTypeRepository>();
    builder.Services.AddScoped<IEventTypeService, EventTypeService>();
    builder.Services.AddScoped<IPriorityRepository, PriorityRepository>();
    builder.Services.AddScoped<IPriorityService, PriorityService>();
    builder.Services.AddScoped<IPlantNameRepository,PlantNameRepository>();
    builder.Services.AddScoped<IPlantNameService, PlantNameService>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IRoleRepository, RoleRepository>();
    builder.Services.AddScoped<IRoleService, RoleService>();
    builder.Services.AddScoped<IEndUserRepository, EndUserRepository>();
    builder.Services.AddScoped<IEndUserService, EndUserService>();
    builder.Services.AddScoped<AuthorizeTokenAttribute, AuthorizeTokenAttribute>();
    builder.Services.AddScoped<IRoleMappingRepository, RoleMappingRepository>();
    builder.Services.AddScoped<IRoleMappingService, RoleMappingService>();
    builder.Services.AddScoped<IPagePermissionService, PagePermissionService>();
    builder.Services.AddScoped<IPagePermissionRepository, PagePerissionRepository>();

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
