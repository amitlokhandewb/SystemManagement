# Use the official .NET Core SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project files and restore any dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the application files
COPY . .

# Build the application in release mode
RUN dotnet publish -c Release -o out

# Use the official .NET Core runtime image as the base image for the runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the built application files from the build stage
COPY --from=build /app/out .

# Expose the port the application runs on
EXPOSE 7105

# Start the application
ENTRYPOINT ["dotnet", "SystemManagementApp.dll"]
