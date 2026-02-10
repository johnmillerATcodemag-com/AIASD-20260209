---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "backend-tech-instructions-20260210"
prompt: |
  Create instruction files for backend technologies: .NET 9.0, ASP.NET Core, Razor Pages, C#, and Dependency Injection
started: "2026-02-10T17:00:00Z"
ended: "2026-02-10T17:15:00Z"
task_durations:
  - task: "create .NET 9 instructions"
    duration: "00:03:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.cs, **/*.csproj"
---

# .NET 9.0 Instructions

## Overview

This project uses .NET 9.0, the latest Long Term Support (LTS) release of the .NET platform. .NET 9 provides enhanced performance, new language features, and improved developer productivity tools.

## Target Framework

```xml
<TargetFramework>net9.0</TargetFramework>
```

## Key Features Used

### Nullable Reference Types

**Required**: Nullable reference types are enabled project-wide to reduce null reference exceptions.

```xml
<Nullable>enable</Nullable>
```

**Best Practices:**

```csharp
// Good: Explicit nullability
public string? GetOptionalValue() => null;
public string GetRequiredValue() => "value";

// Good: Null checking
public void ProcessValue(string? input)
{
    if (input is null)
    {
        return;
    }
    // Use input safely here
}

// Avoid: Null-forgiving operator without justification
public void ProcessValue(string? input)
{
    var length = input!.Length; // Only use ! when you're certain it's not null
}
```

### Implicit Usings

**Enabled**: Common namespaces are automatically imported.

```xml
<ImplicitUsings>enable</ImplicitUsings>
```

**Automatically Available Namespaces:**

- System
- System.Collections.Generic
- System.Linq
- System.Threading
- System.Threading.Tasks
- Microsoft.AspNetCore.Builder (for Web SDK)
- Microsoft.AspNetCore.Hosting
- Microsoft.Extensions.DependencyInjection
- Microsoft.Extensions.Hosting
- Microsoft.Extensions.Logging

**Custom Global Usings (if needed):**

Create `GlobalUsings.cs`:

```csharp
global using web_calculator.Services;
global using web_calculator.Models;
```

## Performance Features

### File-Scoped Namespaces

**Required**: Use file-scoped namespaces to reduce indentation.

```csharp
// Good: File-scoped namespace
namespace web_calculator.Services;

public class CalculatorService : ICalculatorService
{
    // Implementation
}

// Avoid: Traditional block namespace
namespace web_calculator.Services
{
    public class CalculatorService : ICalculatorService
    {
        // Implementation
    }
}
```

### Primary Constructors (C# 12+)

**Recommended**: Use primary constructors for simple dependency injection scenarios.

```csharp
// Good: Primary constructor
public class CalculatorService(ILogger<CalculatorService> logger) : ICalculatorService
{
    public async Task<decimal> AddAsync(decimal a, decimal b)
    {
        logger.LogInformation("Adding {A} + {B}", a, b);
        return await Task.FromResult(a + b);
    }
}

// Also acceptable: Traditional constructor
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;

    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }
}
```

### Collection Expressions

**Recommended**: Use collection expressions for cleaner initialization.

```csharp
// Good: Collection expressions
List<string> operations = ["Add", "Subtract", "Multiply", "Divide"];
int[] numbers = [1, 2, 3, 4, 5];

// Old style (still valid)
var operations = new List<string> { "Add", "Subtract", "Multiply", "Divide" };
```

## Configuration

### appsettings.json

**Structure:**

```json
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

### Environment-Specific Configuration

- `appsettings.json` - Base configuration
- `appsettings.Development.json` - Development overrides
- `appsettings.Production.json` - Production overrides

**Access in Code:**

```csharp
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var setting = builder.Configuration["MySetting"];
```

## Async/Await Best Practices

### Required Patterns

```csharp
// Good: Async all the way
public async Task<decimal> CalculateAsync(string expression)
{
    var result = await _parser.ParseAsync(expression);
    return await _evaluator.EvaluateAsync(result);
}

// Avoid: Blocking async code
public decimal Calculate(string expression)
{
    return CalculateAsync(expression).Result; // DON'T DO THIS - causes deadlocks
}

// Avoid: Unnecessary async
public async Task<decimal> AddAsync(decimal a, decimal b)
{
    return await Task.FromResult(a + b); // Just return directly
}

// Good: Synchronous when appropriate
public decimal Add(decimal a, decimal b) => a + b;
```

### ValueTask for Hot Paths

**Use when**: Method might complete synchronously and is called frequently.

```csharp
public ValueTask<decimal> GetCachedResultAsync(string key)
{
    if (_cache.TryGetValue(key, out var cached))
    {
        return new ValueTask<decimal>(cached); // Synchronous completion
    }

    return new ValueTask<decimal>(ComputeAsync(key)); // Async completion
}
```

## Dependency Management

### PackageReference Format

```xml
<ItemGroup>
  <PackageReference Include="PackageName" Version="1.0.0" />
</ItemGroup>
```

### Version Strategy

- **Patch updates**: Auto-accept (1.0.x)
- **Minor updates**: Review (1.x.0)
- **Major updates**: Test thoroughly (x.0.0)

### Package Lock Files

**Enable** for deterministic builds:

```xml
<PropertyGroup>
  <RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>
</PropertyGroup>
```

## Error Handling

### Exception Handling Patterns

```csharp
// Good: Specific exceptions
public decimal Divide(decimal a, decimal b)
{
    if (b == 0)
    {
        throw new DivideByZeroException("Cannot divide by zero");
    }
    return a / b;
}

// Good: Custom exceptions with context
public class CalculationException : Exception
{
    public string Expression { get; }

    public CalculationException(string message, string expression)
        : base(message)
    {
        Expression = expression;
    }
}

// Avoid: Swallowing exceptions
try
{
    Calculate();
}
catch { } // NEVER DO THIS

// Good: Log and rethrow or handle appropriately
try
{
    Calculate();
}
catch (Exception ex)
{
    _logger.LogError(ex, "Calculation failed");
    throw;
}
```

## Testing with .NET 9

### xUnit Configuration

```xml
<PackageReference Include="xunit" Version="2.9.2" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
```

### Test Patterns

```csharp
public class CalculatorServiceTests
{
    [Fact]
    public async Task AddAsync_ValidNumbers_ReturnsSum()
    {
        // Arrange
        var service = new CalculatorService();

        // Act
        var result = await service.AddAsync(5, 3);

        // Assert
        Assert.Equal(8, result);
    }

    [Theory]
    [InlineData(5, 3, 8)]
    [InlineData(-5, 3, -2)]
    [InlineData(0, 0, 0)]
    public async Task AddAsync_MultipleInputs_ReturnsCorrectSum(
        decimal a, decimal b, decimal expected)
    {
        var service = new CalculatorService();
        var result = await service.AddAsync(a, b);
        Assert.Equal(expected, result);
    }
}
```

## Performance Optimization

### Span<T> and Memory<T>

**Use for**: High-performance scenarios with arrays/strings.

```csharp
public int CountDigits(ReadOnlySpan<char> input)
{
    int count = 0;
    foreach (char c in input)
    {
        if (char.IsDigit(c))
        {
            count++;
        }
    }
    return count;
}
```

### String Interpolation

**Prefer** interpolated strings with proper formatting:

```csharp
// Good: Interpolated string
var message = $"Result: {value:N2}";

// Good: Structured logging
_logger.LogInformation("Calculation completed: {Result}", result);

// Avoid: String concatenation
var message = "Result: " + value.ToString("N2");
```

## Security

### Input Validation

**Always validate** user input:

```csharp
public IActionResult Calculate([FromBody] CalculationRequest request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    if (string.IsNullOrWhiteSpace(request.Expression))
    {
        return BadRequest("Expression cannot be empty");
    }

    // Additional validation...
}
```

### Secure Configuration

**Never** hardcode secrets:

```csharp
// WRONG
var apiKey = "sk-1234567890";

// CORRECT
var apiKey = builder.Configuration["ApiKey"];
// Or use User Secrets in development
// Or use Azure Key Vault in production
```

## Build and Publish

### Development Build

```powershell
dotnet build
```

### Release Build

```powershell
dotnet build --configuration Release
```

### Publish for Deployment

```powershell
# Self-contained
dotnet publish -c Release -r win-x64 --self-contained true

# Framework-dependent
dotnet publish -c Release
```

## Migration from Earlier Versions

### Breaking Changes from .NET 8 to .NET 9

- Review [.NET 9 Breaking Changes](https://docs.microsoft.com/en-us/dotnet/core/compatibility/9.0)
- Test thoroughly after upgrade
- Update all dependencies to compatible versions

### Upgrade Checklist

- [ ] Update TargetFramework in .csproj
- [ ] Update SDK version in global.json (if present)
- [ ] Update all NuGet packages
- [ ] Run full test suite
- [ ] Review deprecation warnings
- [ ] Update CI/CD pipelines

## Common Issues and Solutions

### Issue: Nullable Reference Type Warnings

**Solution**: Address warnings, don't disable them.

```csharp
// Warning: Possible null reference
public void Process(string input)
{
    var length = input.Length; // CS8602
}

// Fix 1: Make parameter nullable and check
public void Process(string? input)
{
    if (input is null) return;
    var length = input.Length;
}

// Fix 2: Non-nullable parameter (caller must ensure non-null)
public void Process(string input)
{
    ArgumentNullException.ThrowIfNull(input);
    var length = input.Length;
}
```

### Issue: Implicit Usings Conflicts

**Solution**: Explicitly use fully qualified names or add using alias.

```csharp
// Conflict between System.Range and custom Range class
using SystemRange = System.Range;

public void UseRange()
{
    SystemRange range = 0..10;
    var custom = new Range(); // Your custom class
}
```

## Resources

- [.NET 9 Documentation](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-9)
- [C# 12 Language Features](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12)
- [.NET Performance Tips](https://docs.microsoft.com/en-us/dotnet/framework/performance/)
- [.NET Security Best Practices](https://docs.microsoft.com/en-us/dotnet/standard/security/)

## Compliance Checklist

- [ ] Nullable reference types enabled
- [ ] Implicit usings configured appropriately
- [ ] File-scoped namespaces used
- [ ] Async/await used correctly (no blocking)
- [ ] Exception handling implemented properly
- [ ] Input validation on all public methods
- [ ] No hardcoded secrets or sensitive data
- [ ] Tests written for new functionality
- [ ] Performance considerations reviewed
- [ ] Security best practices followed
