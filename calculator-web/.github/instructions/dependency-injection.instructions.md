---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "backend-tech-instructions-20260210"
prompt: |
  Create instruction files for backend technologies: Dependency Injection patterns
started: "2026-02-10T17:00:00Z"
ended: "2026-02-10T17:15:00Z"
task_durations:
  - task: "create Dependency Injection instructions"
    duration: "00:03:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.cs, **/Program.cs"
---

# Dependency Injection Instructions

## Overview

This project uses ASP.NET Core's built-in Dependency Injection (DI) container for managing dependencies. DI promotes loose coupling, testability, and maintainability by inverting control of object creation and lifetime management.

## Core Concepts

### Dependency Inversion Principle

**Depend on abstractions, not concretions:**

```csharp
// Good: Depend on interface
public class CalculatorController
{
    private readonly ICalculatorService _calculator;

    public CalculatorController(ICalculatorService calculator)
    {
        _calculator = calculator;
    }
}

// Avoid: Depend on concrete implementation
public class CalculatorController
{
    private readonly CalculatorService _calculator;

    public CalculatorController()
    {
        _calculator = new CalculatorService(); // Tight coupling
    }
}
```

### Service Lifetimes

ASP.NET Core supports three service lifetimes:

1. **Transient** - Created each time they're requested
2. **Scoped** - Created once per HTTP request
3. **Singleton** - Created once for the application lifetime

## Service Registration

### Registration in Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Transient: New instance each time
builder.Services.AddTransient<IEmailService, EmailService>();

// Scoped: One instance per HTTP request (RECOMMENDED for most services)
builder.Services.AddScoped<ICalculatorService, CalculatorService>();

// Singleton: One instance for entire application
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();

var app = builder.Build();
```

## Service Lifetimes Explained

### Transient Services

**Use When**: Service is lightweight and stateless, or state shouldn't be shared.

```csharp
// Registration
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IGuidGenerator, GuidGenerator>();

// Implementation
public class EmailService : IEmailService
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // Each call gets a new instance
        // No shared state to worry about
    }
}
```

**Characteristics:**

- New instance created every time
- Not shared between requests or components
- Disposed immediately after use
- Safest for thread-safety

### Scoped Services

**Use When**: Service maintains state per HTTP request (MOST COMMON).

```csharp
// Registration
builder.Services.AddScoped<ICalculatorService, CalculatorService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Implementation
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;
    private readonly List<string> _operationLog = new();

    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }

    public decimal Add(decimal a, decimal b)
    {
        _operationLog.Add($"{a} + {b}");
        return a + b;
    }

    // Same instance sees all operations in this request
    public IReadOnlyList<string> GetOperationLog() => _operationLog.AsReadOnly();
}
```

**Characteristics:**

- One instance per HTTP request
- Shared across middleware, controllers, and services in same request
- Disposed at end of request
- **Default choice for most services**

### Singleton Services

**Use When**: Service is thread-safe and state should be shared across all requests.

```csharp
// Registration
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<IApplicationCache, ApplicationCache>();

// Implementation
public class ApplicationCache : IApplicationCache
{
    private readonly ConcurrentDictionary<string, object> _cache = new();

    public void Set(string key, object value)
    {
        _cache[key] = value; // Thread-safe collection
    }

    public object? Get(string key)
    {
        _cache.TryGetValue(key, out var value);
        return value;
    }
}
```

**Characteristics:**

- Created once, lives for application lifetime
- Shared across all requests and threads
- **MUST be thread-safe**
- Never dispose until app shutdown

**⚠️ Warning**: Be careful with singleton services:

- Must be thread-safe
- Don't inject scoped services into singletons
- Can cause memory leaks if not careful

## Constructor Injection

### Basic Pattern

```csharp
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;
    private readonly IConfiguration _configuration;

    // Constructor injection (RECOMMENDED)
    public CalculatorService(
        ILogger<CalculatorService> logger,
        IConfiguration configuration)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public decimal Add(decimal a, decimal b)
    {
        _logger.LogInformation("Adding {A} + {B}", a, b);
        return a + b;
    }
}
```

### Primary Constructors (C# 12+)

```csharp
// Shorter syntax with primary constructor
public class CalculatorService(
    ILogger<CalculatorService> logger,
    IConfiguration configuration) : ICalculatorService
{
    public decimal Add(decimal a, decimal b)
    {
        logger.LogInformation("Adding {A} + {B}", a, b);
        return a + b;
    }
}
```

## Interface-Based Design

### Creating Service Interfaces

```csharp
// Services/ICalculatorService.cs
public interface ICalculatorService
{
    Task<decimal> AddAsync(decimal a, decimal b);
    Task<decimal> SubtractAsync(decimal a, decimal b);
    Task<decimal> MultiplyAsync(decimal a, decimal b);
    Task<decimal> DivideAsync(decimal a, decimal b);
}

// Services/CalculatorService.cs
public class CalculatorService : ICalculatorService
{
    public async Task<decimal> AddAsync(decimal a, decimal b)
    {
        return await Task.FromResult(a + b);
    }

    // Other implementations...
}

// Program.cs
builder.Services.AddScoped<ICalculatorService, CalculatorService>();
```

### Multiple Implementations

```csharp
// Different implementations for different scenarios
public interface INotificationService
{
    Task NotifyAsync(string message);
}

public class EmailNotificationService : INotificationService
{
    public async Task NotifyAsync(string message)
    {
        // Send email
    }
}

public class SmsNotificationService : INotificationService
{
    public async Task NotifyAsync(string message)
    {
        // Send SMS
    }
}

// Register based on configuration
if (builder.Configuration["NotificationType"] == "Email")
{
    builder.Services.AddScoped<INotificationService, EmailNotificationService>();
}
else
{
    builder.Services.AddScoped<INotificationService, SmsNotificationService>();
}
```

## Advanced Registration Patterns

### Factory Pattern

```csharp
// When you need custom creation logic
builder.Services.AddScoped<ICalculatorService>(serviceProvider =>
{
    var logger = serviceProvider.GetRequiredService<ILogger<CalculatorService>>();
    var config = serviceProvider.GetRequiredService<IConfiguration>();

    var mode = config["CalculatorMode"];

    return mode switch
    {
        "Scientific" => new ScientificCalculator(logger),
        "Basic" => new BasicCalculator(logger),
        _ => new CalculatorService(logger, config)
    };
});
```

### Multiple Services of Same Type

```csharp
// Register multiple implementations
builder.Services.AddScoped<IValidator, EmailValidator>();
builder.Services.AddScoped<IValidator, PhoneValidator>();
builder.Services.AddScoped<IValidator, ExpressionValidator>();

// Inject collection
public class ValidationService
{
    private readonly IEnumerable<IValidator> _validators;

    public ValidationService(IEnumerable<IValidator> validators)
    {
        _validators = validators;
    }

    public async Task<bool> ValidateAllAsync(object data)
    {
        foreach (var validator in _validators)
        {
            if (!await validator.ValidateAsync(data))
            {
                return false;
            }
        }
        return true;
    }
}
```

### Try Add Methods

```csharp
// Only registers if service not already registered
builder.Services.TryAddScoped<ICalculatorService, CalculatorService>();

// Replace existing registration
builder.Services.Replace(ServiceDescriptor.Scoped<ICalculatorService, NewCalculatorService>());
```

## Dependency Injection in Razor Pages

### Page Model Injection

```csharp
public class IndexModel : PageModel
{
    private readonly ICalculatorService _calculator;
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(
        ICalculatorService calculator,
        ILogger<IndexModel> logger)
    {
        _calculator = calculator;
        _logger = logger;
    }

    public async Task<IActionResult> OnPostAsync()
    {
        Result = await _calculator.AddAsync(ValueA, ValueB);
        return Page();
    }
}
```

### View Injection

```cshtml
@inject IConfiguration Configuration
@inject ICalculatorService Calculator

<h1>Calculator Mode: @Configuration["CalculatorMode"]</h1>
```

## Generic Services

### Generic Interface

```csharp
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

public class Repository<T> : IRepository<T> where T : class
{
    private readonly DbContext _context;

    public Repository(DbContext context)
    {
        _context = context;
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    // Other implementations...
}

// Registration
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Usage
public class CalculationService
{
    private readonly IRepository<Calculation> _calculationRepo;

    public CalculationService(IRepository<Calculation> calculationRepo)
    {
        _calculationRepo = calculationRepo;
    }
}
```

## Options Pattern

### Strongly-Typed Configuration

```csharp
// Models/CalculatorOptions.cs
public class CalculatorOptions
{
    public const string SectionName = "Calculator";

    public int MaxExpressionLength { get; set; } = 500;
    public int DefaultPrecision { get; set; } = 2;
    public bool EnableMemory { get; set; } = true;
}

// appsettings.json
{
  "Calculator": {
    "MaxExpressionLength": 1000,
    "DefaultPrecision": 4,
    "EnableMemory": true
  }
}

// Program.cs
builder.Services.Configure<CalculatorOptions>(
    builder.Configuration.GetSection(CalculatorOptions.SectionName));

// Usage in service
public class CalculatorService : ICalculatorService
{
    private readonly CalculatorOptions _options;

    public CalculatorService(IOptions<CalculatorOptions> options)
    {
        _options = options.Value;
    }

    public bool ValidateExpression(string expression)
    {
        return expression.Length <= _options.MaxExpressionLength;
    }
}
```

### IOptionsSnapshot for Scoped Updates

```csharp
// Reads updated config values per request
public class CalculatorService : ICalculatorService
{
    private readonly IOptionsSnapshot<CalculatorOptions> _options;

    public CalculatorService(IOptionsSnapshot<CalculatorOptions> options)
    {
        _options = options;
    }

    public int GetPrecision() => _options.Value.DefaultPrecision;
}
```

## Testing with Dependency Injection

### Unit Testing with Mocks

```csharp
using Moq;
using Xunit;

public class CalculatorServiceTests
{
    [Fact]
    public async Task AddAsync_LogsOperation()
    {
        // Arrange
        var loggerMock = new Mock<ILogger<CalculatorService>>();
        var configMock = new Mock<IConfiguration>();

        var service = new CalculatorService(loggerMock.Object, configMock.Object);

        // Act
        await service.AddAsync(5, 3);

        // Assert
        loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Adding")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception?, string>>()),
            Times.Once);
    }
}
```

### Integration Testing

```csharp
public class CalculatorIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public CalculatorIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Calculate_ReturnsCorrectResult()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.PostAsync("/calculate",
            new StringContent("5+3", Encoding.UTF8, "application/json"));

        // Assert
        response.EnsureSuccessStatusCode();
    }
}
```

## Best Practices

### ✅ Do's

1. **Depend on interfaces**, not concrete implementations
2. **Use constructor injection** for required dependencies
3. **Use scoped lifetime** as default for most services
4. **Keep constructors simple** - no logic or method calls
5. **Use IOptions<T>** for configuration
6. **Register services in Program.cs** startup
7. **Make services thread-safe** if singleton
8. **Use primary constructors** (C# 12+) for cleaner code

### ❌ Don'ts

1. **Don't use service locator** pattern (`IServiceProvider` in constructors)
2. **Don't create dependencies with `new`** keyword in classes
3. **Don't inject scoped services** into singleton services
4. **Don't use static classes** for stateful services
5. **Don't register both interface and implementation** unless needed
6. **Avoid property injection** - use constructor injection
7. **Don't resolve services manually** unless absolutely necessary

## Common Patterns

### Unit of Work Pattern

```csharp
public interface IUnitOfWork : IDisposable
{
    IRepository<Calculation> Calculations { get; }
    IRepository<History> History { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _context;

    public UnitOfWork(
        DbContext context,
        IRepository<Calculation> calculations,
        IRepository<History> history)
    {
        _context = context;
        Calculations = calculations;
        History = history;
    }

    public IRepository<Calculation> Calculations { get; }
    public IRepository<History> History { get; }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}

// Registration
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
```

### Decorator Pattern

```csharp
// Base service
public interface ICalculatorService
{
    Task<decimal> CalculateAsync(string expression);
}

// Decorator adding logging
public class LoggingCalculatorDecorator : ICalculatorService
{
    private readonly ICalculatorService _inner;
    private readonly ILogger<LoggingCalculatorDecorator> _logger;

    public LoggingCalculatorDecorator(
        ICalculatorService inner,
        ILogger<LoggingCalculatorDecorator> logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public async Task<decimal> CalculateAsync(string expression)
    {
        _logger.LogInformation("Calculating: {Expression}", expression);
        var result = await _inner.CalculateAsync(expression);
        _logger.LogInformation("Result: {Result}", result);
        return result;
    }
}

// Registration
builder.Services.AddScoped<CalculatorService>();
builder.Services.AddScoped<ICalculatorService>(sp =>
{
    var calculator = sp.GetRequiredService<CalculatorService>();
    var logger = sp.GetRequiredService<ILogger<LoggingCalculatorDecorator>>();
    return new LoggingCalculatorDecorator(calculator, logger);
});
```

## Troubleshooting

### Common Issues

**Issue**: Captive Dependency

```csharp
// WRONG: Scoped service captured by singleton
builder.Services.AddSingleton<ICacheService, CacheService>();

public class CacheService : ICacheService
{
    // BAD: Scoped service in singleton
    public CacheService(ICalculatorService calculator) { }
}

// FIX: Use IServiceProvider to resolve scoped per use
public class CacheService : ICacheService
{
    private readonly IServiceProvider _serviceProvider;

    public CacheService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task<decimal> GetCalculationAsync(string key)
    {
        using var scope = _serviceProvider.CreateScope();
        var calculator = scope.ServiceProvider.GetRequiredService<ICalculatorService>();
        return await calculator.CalculateAsync(key);
    }
}
```

**Issue**: Circular Dependency

```csharp
// Service A depends on B, B depends on A
// FIX: Introduce third service or refactor design
```

## Resources

- [ASP.NET Core Dependency Injection](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
- [Service Lifetimes](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#service-lifetimes)
- [Options Pattern](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options)

## Compliance Checklist

- [ ] All services registered in Program.cs
- [ ] Interfaces defined for services
- [ ] Constructor injection used
- [ ] Appropriate lifetime chosen (prefer Scoped)
- [ ] No service locator anti-pattern
- [ ] No circular dependencies
- [ ] Singleton services are thread-safe
- [ ] Configuration uses Options pattern
- [ ] Services are testable with mocks
