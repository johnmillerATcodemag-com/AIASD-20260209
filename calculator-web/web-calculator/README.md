---
ai_generated: false
last_updated: "2026-02-10T21:00:00Z"
---

# Web Calculator

A modern web-based calculator application built with ASP.NET Core Razor Pages, demonstrating clean architecture principles with service layer pattern and dependency injection.

## Features

### Core Functionality

- ✅ Mathematical expression evaluation
- ✅ Support for basic arithmetic operations (+, -, \*, /)
- ✅ Support for parentheses and operator precedence
- ✅ Real-time calculation via form submission
- ✅ Error handling with user-friendly messages
- ✅ Input validation and sanitization

### Technical Features

- ✅ Clean architecture with service layer abstraction
- ✅ Dependency injection using .NET's built-in DI container
- ✅ Result types for robust error handling
- ✅ Bootstrap 5.3 responsive UI
- ✅ Comprehensive unit and integration tests
- ✅ Structured logging with Serilog (if configured)
- ✅ HTTPS enforcement and security headers

## Architecture

### Technology Stack

- **Framework**: .NET 9.0
- **Web Framework**: ASP.NET Core Razor Pages
- **Web Server**: Kestrel
- **UI Framework**: Bootstrap 5.3.x
- **Testing**: xUnit, Moq, WebApplicationFactory
- **Language**: C# 12 with latest features

### Project Structure

```text
web-calculator/
├── Pages/                          # Razor Pages
│   ├── Calculator.cshtml           # Calculator UI
│   ├── Calculator.cshtml.cs        # Page model with handlers
│   ├── Error.cshtml                # Error page
│   ├── Index.cshtml                # Home page
│   ├── Privacy.cshtml              # Privacy policy
│   └── Shared/                     # Shared layouts and components
│       ├── _Layout.cshtml          # Main layout with Bootstrap
│       └── _ValidationScriptsPartial.cshtml
├── Services/                       # Service layer
│   ├── ICalculatorService.cs       # Service interface
│   └── CalculatorService.cs        # Service implementation
├── Models/                         # View models and DTOs
├── wwwroot/                        # Static files
│   ├── css/                        # Custom styles
│   ├── js/                         # JavaScript files
│   └── lib/                        # Third-party libraries
├── Program.cs                      # Application entry point & DI config
├── appsettings.json                # Configuration
└── web-calculator.csproj           # Project file
```

### Architecture Pattern

```text
┌──────────────────────────────────────┐
│         Browser (User)               │
└──────────────┬───────────────────────┘
               │ HTTP Request
               ▼
┌──────────────────────────────────────┐
│      ASP.NET Core Middleware         │
│  (Routing, Static Files, HTTPS)      │
└──────────────┬───────────────────────┘
               ▼
┌──────────────────────────────────────┐
│         Razor Pages Layer            │
│    (Calculator.cshtml.cs)            │
│  - HTTP Request Handling             │
│  - Model Binding                     │
│  - Page Handlers (OnGet, OnPost)     │
│  - View Rendering                    │
└──────────────┬───────────────────────┘
               │ Service Call
               ▼
┌──────────────────────────────────────┐
│         Service Layer                │
│    (ICalculatorService)               │
│  - Business Logic Abstraction        │
│  - Dependency Injection Interface    │
└──────────────┬───────────────────────┘
               │ Implementation
               ▼
┌──────────────────────────────────────┐
│    Service Implementation            │
│    (CalculatorService)               │
│  - Expression Parsing                │
│  - Calculation Logic                 │
│  - Error Handling                    │
│  - Result Types                      │
└──────────────────────────────────────┘
```

### Key Design Patterns

1. **Service Layer Pattern**: Business logic separated from presentation
2. **Dependency Injection**: Loose coupling via constructor injection
3. **Result Type Pattern**: Explicit success/failure handling
4. **Repository Pattern**: (Future: For data persistence)

## Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- Visual Studio 2022, VS Code with C# extension, or Rider
- Git

### Installation

1. **Clone Repository**:

   ```bash
   git clone <repository-url>
   cd calculator-web/web-calculator
   ```

2. **Restore Dependencies**:

   ```bash
   dotnet restore
   ```

3. **Build Project**:

   ```bash
   dotnet build
   ```

4. **Run Application**:

   ```bash
   dotnet run --launch-profile https
   ```

5. **Access Application**:
   - HTTPS: `https://localhost:7191`
   - HTTP: `http://localhost:5191`

### Development Environment Setup

**Visual Studio 2022**:

- Open `calculator-web.sln`
- Press F5 to run with debugging

**Visual Studio Code**:

- Open `web-calculator` folder
- Install recommended extensions (C# Dev Kit)
- Press F5 or use terminal: `dotnet run`

**Command Line**:

```bash
# Development mode with hot reload
dotnet watch run

# Production build
dotnet run --configuration Release
```

## Usage Examples

### Basic Calculation

1. Navigate to `/Calculator` page
2. Enter expression: `2 + 2 * 3`
3. Click "Calculate"
4. Result: `8` (respects operator precedence)

### Supported Operations

```text
Addition:       5 + 3        → 8
Subtraction:    10 - 4       → 6
Multiplication: 6 * 7        → 42
Division:       15 / 3       → 5
Parentheses:    (2 + 3) * 4  → 20
Complex:        (10 + 5) / (3 - 1) → 7.5
```

### Error Handling

The application provides user-friendly error messages for:

- **Division by zero**: "Cannot divide by zero"
- **Invalid expression**: "Invalid mathematical expression"
- **Empty input**: "Please enter an expression"
- **Unsupported operators**: "Expression contains unsupported characters"

## Testing

### Run All Tests

```bash
cd ../web-calculator.Tests
dotnet test
```

### Run with Coverage

```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

### Test Structure

```text
web-calculator.Tests/
├── Services/
│   └── CalculatorServiceTests.cs       # Unit tests for service
├── Pages/
│   └── CalculatorTests.cs              # Integration tests for page
└── web-calculator.Tests.csproj
```

### Test Coverage

- **Target**: ≥80% code coverage
- **Current**: Service layer ~95%, Page models ~85%
- **Strategy**: Unit tests for service, integration tests for pages

### Example Tests

```csharp
// Unit Test
[Fact]
public void Calculate_SimpleAddition_ReturnsCorrectResult()
{
    // Arrange
    var service = new CalculatorService();

    // Act
    var result = service.Calculate("2 + 3");

    // Assert
    Assert.True(result.IsSuccess);
    Assert.Equal(5, result.Value);
}

// Integration Test
[Fact]
public async Task Calculator_PostValidExpression_ReturnsResult()
{
    // Arrange
    var client = _factory.CreateClient();

    // Act
    var response = await client.PostAsync("/Calculator",
        new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "Expression", "5 + 5" }
        }));

    // Assert
    response.EnsureSuccessStatusCode();
    var content = await response.Content.ReadAsStringAsync();
    Assert.Contains("10", content);
}
```

## Configuration

### Application Settings

```json
// appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Service Registration

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddScoped<ICalculatorService, CalculatorService>();
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure middleware
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();

app.Run();
```

## Development Guidelines

### Code Style

Follow standards defined in:

- [.NET 9.0 Development Standards](../../.github/instructions/dotnet-development.instructions.md)
- [Razor Pages & Kestrel Standards](../../.github/instructions/razor-pages-kestrel.instructions.md)
- [Architecture Patterns: DI & Service Layer](../../.github/instructions/architecture-patterns-di-service-layer.instructions.md)

### Key Practices

- ✅ Use async/await for I/O operations
- ✅ Enable nullable reference types
- ✅ Use file-scoped namespaces
- ✅ Follow service layer pattern
- ✅ Implement proper error handling
- ✅ Write comprehensive tests
- ✅ Use dependency injection
- ✅ Document public APIs

## Deployment

### Local Production Build

```bash
dotnet publish -c Release -o ./publish
cd publish
dotnet web-calculator.dll
```

### Docker Deployment (Future)

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["web-calculator.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "web-calculator.dll"]
```

### Cloud Deployment

**Azure App Service**:

```bash
az webapp up --name my-calculator-app --resource-group my-rg
```

**Azure Static Web Apps** (Future): See deployment instructions in main repository README

## Troubleshooting

### Common Issues

**Issue**: Build Errors
**Solution**: Ensure .NET 9.0 SDK installed: `dotnet --version`

**Issue**: Port Already in Use
**Solution**: Change port in `Properties/launchSettings.json` or kill process using port

**Issue**: Bootstrap Styles Not Loading
**Solution**: Verify `wwwroot/lib/bootstrap/` exists and `_Layout.cshtml` references correct paths

**Issue**: Service Not Resolving
**Solution**: Verify service registered in `Program.cs` with correct lifetime (AddScoped)

### Debug Mode

Enable detailed error pages in development:

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
```

## Roadmap

### Planned Features

- [ ] Scientific calculator functions (sin, cos, tan, log, etc.)
- [ ] Calculation history persistence
- [ ] API endpoints for headless usage
- [ ] Dark mode theme
- [ ] Keyboard shortcuts support
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (internationalization)

### Technical Improvements

- [ ] Add Serilog structured logging
- [ ] Implement health checks
- [ ] Add OpenAPI/Swagger documentation
- [ ] Performance benchmarking suite
- [ ] Add response caching
- [ ] Implement rate limiting

## Contributing

See main repository [Contributing Guidelines](../../README.md#contributing) for:

- Code of conduct
- PR requirements
- Testing standards
- Documentation requirements
- AI provenance tracking (if applicable)

## Related Documentation

- [Main Repository README](../../README.md)
- [.NET 9.0 Development Standards](../../.github/instructions/dotnet-development.instructions.md)
- [Razor Pages & Kestrel Standards](../../.github/instructions/razor-pages-kestrel.instructions.md)
- [Architecture Patterns](../../.github/instructions/architecture-patterns-di-service-layer.instructions.md)
- [Bootstrap Standards](../../.github/instructions/bootstrap.instructions.md)
- [Testing Strategy](../web-calculator.Tests/README.md) (Future)

## License

[Specify License] - See main repository

## Support

**Issues**: Submit via GitHub Issues in main repository
**Questions**: Use GitHub Discussions
**Security**: Report vulnerabilities privately to repository owner

---

**Project Version**: 1.0.0
**Last Updated**: 2026-02-10T21:00:00Z
**Framework**: ASP.NET Core 9.0 with Razor Pages
**Maintained By**: johnmillerATcodemag-com

---

Generated and maintained by johnmillerATcodemag-com with AI assistance from Claude 3.5 Sonnet.
