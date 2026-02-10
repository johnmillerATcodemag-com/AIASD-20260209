---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "backend-tech-instructions-20260210"
prompt: |
  Create instruction files for backend technologies: C# coding standards
started: "2026-02-10T17:00:00Z"
ended: "2026-02-10T17:15:00Z"
task_durations:
  - task: "create C# coding standards instructions"
    duration: "00:05:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.cs"
---

# C# Coding Standards Instructions

## Overview

This document defines the C# coding standards for the calculator-web project. These standards ensure code consistency, readability, and maintainability across the codebase.

## Naming Conventions

### General Rules

- Use **PascalCase** for class names, method names, public properties, and constants
- Use **camelCase** for local variables, parameters, and private fields
- Use **\_camelCase** (underscore prefix) for private instance fields
- Use **SCREAMING_SNAKE_CASE** for constant values only if they're truly constant configuration

### Classes and Interfaces

```csharp
// Good
public class CalculatorService { }
public interface ICalculatorService { }
public abstract class BaseCalculator { }

// Avoid
public class calculatorService { }  // Wrong case
public interface CalculatorService { }  // Missing 'I' prefix
```

### Methods

```csharp
// Good
public decimal CalculateSum(decimal a, decimal b) { }
private async Task<string> FormatResultAsync(decimal value) { }

// Avoid
public decimal calculate_sum(decimal a, decimal b) { }  // Wrong case
public decimal Calculate_Sum(decimal a, decimal b) { }  // Unnecessary underscore
```

### Properties

```csharp
// Good
public string Expression { get; set; }
public decimal? Result { get; private set; }

// Avoid
public string expression { get; set; }  // Wrong case
```

### Fields

```csharp
// Good
private readonly ILogger<CalculatorService> _logger;
private decimal _memoryValue;
private const int MaxExpressionLength = 500;

// Avoid
private readonly ILogger<CalculatorService> logger;  // Missing underscore
private readonly ILogger<CalculatorService> m_logger;  // Wrong prefix
private decimal memoryValue;  // Missing underscore
```

### Local Variables and Parameters

```csharp
// Good
public void Calculate(string expression, int precision)
{
    var result = EvaluateExpression(expression);
    var formattedResult = FormatNumber(result, precision);
}

// Avoid
public void Calculate(string Expression, int Precision)  // Wrong case for parameters
{
    var Result = EvaluateExpression(Expression);  // Wrong case for local
}
```

## Code Organization

### File Structure

```csharp
// 1. Using statements (sorted alphabetically)
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

// 2. Namespace (file-scoped in C# 10+)
namespace web_calculator.Services;

// 3. Class/Interface definition
/// <summary>
/// Provides calculator functionality
/// </summary>
public class CalculatorService : ICalculatorService
{
    // 4. Fields
    private readonly ILogger<CalculatorService> _logger;
    private decimal _memoryValue;

    // 5. Constructor(s)
    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }

    // 6. Properties
    public bool HasMemory => _memoryValue != 0;

    // 7. Public methods
    public async Task<decimal> AddAsync(decimal a, decimal b)
    {
        // Implementation
    }

    // 8. Private methods
    private void LogOperation(string operation, decimal result)
    {
        // Implementation
    }
}
```

### Namespace Organization

```csharp
// Use file-scoped namespaces (C# 10+)
namespace web_calculator.Services;

public class CalculatorService { }

// Avoid traditional block namespaces (unless multiple namespaces in one file)
namespace web_calculator.Services
{
    public class CalculatorService { }
}
```

## Formatting

### Indentation and Spacing

- Use **4 spaces** for indentation (not tabs)
- One statement per line
- One declaration per line
- Add blank lines between method definitions
- Add blank line after opening brace of namespace/class/method if it contains multiple logical sections

```csharp
public class CalculatorService
{
    private readonly ILogger _logger;

    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }

    public decimal Add(decimal a, decimal b)
    {
        _logger.LogDebug("Adding {A} + {B}", a, b);

        var result = a + b;

        return result;
    }
}
```

### Braces

**Always use braces** for control structures, even single-line statements:

```csharp
// Good
if (value > 0)
{
    return value;
}

// Avoid
if (value > 0)
    return value;  // Missing braces

if (value > 0) return value;  // Single line without braces
```

**Brace Placement** (Allman style):

```csharp
// Good
public void Method()
{
    if (condition)
    {
        // Code
    }
    else
    {
        // Code
    }
}

// Avoid (K&R style - not C# convention)
public void Method() {
    if (condition) {
        // Code
    } else {
        // Code
    }
}
```

### Line Length

- **Target**: 120 characters maximum per line
- Break long lines at appropriate points
- Indent continuation lines

```csharp
// Good
var result = await _calculatorService
    .EvaluateAsync(expression, precision)
    .ConfigureAwait(false);

// Good
var message = string.Format(
    "Calculation completed: {0} = {1}",
    expression,
    result);

// Avoid
var result = await _calculatorService.EvaluateAsync(expression, precision).ConfigureAwait(false);  // Too long
```

## Language Features

### Prefer var When Type is Obvious

```csharp
// Good
var calculator = new CalculatorService();
var numbers = new List<int> { 1, 2, 3 };
var result = GetResult();  // When return type is clear from method name

// Explicit type when not obvious
ICalculatorService calculator = GetCalculator();
decimal result = CalculateValue();  // Not obvious from context
```

### String Interpolation

**Prefer** string interpolation over concatenation or `String.Format`:

```csharp
// Good
var message = $"Result: {result:N2}";
var path = $"{basePath}/{fileName}";

// Avoid
var message = "Result: " + result.ToString("N2");
var message = String.Format("Result: {0:N2}", result);
```

### Null-Conditional and Null-Coalescing Operators

```csharp
// Good
var length = expression?.Length ?? 0;
var result = _cache?[key] ?? CalculateResult(key);

// Avoid
var length = expression != null ? expression.Length : 0;
```

### Object Initializers

```csharp
// Good
var request = new CalculationRequest
{
    Expression = "1+1",
    Precision = 2,
    Timestamp = DateTime.UtcNow
};

// Avoid
var request = new CalculationRequest();
request.Expression = "1+1";
request.Precision = 2;
request.Timestamp = DateTime.UtcNow;
```

### Collection Initializers & Collection Expressions

```csharp
// Good (C# 12+)
List<string> operations = ["Add", "Subtract", "Multiply", "Divide"];

// Good (older C#)
var operations = new List<string> { "Add", "Subtract", "Multiply", "Divide" };

// Avoid
var operations = new List<string>();
operations.Add("Add");
operations.Add("Subtract");
```

### Pattern Matching

```csharp
// Good
if (value is not null and > 0)
{
    Process(value);
}

// Good
var result = input switch
{
    null => "null",
    "" => "empty",
    _ => input.ToUpper()
};

// Older style (still valid)
if (value != null && value > 0)
{
    Process(value);
}
```

### Records for DTOs

```csharp
// Good for data transfer objects
public record CalculationRequest(string Expression, int Precision);

public record CalculationResult(decimal Value, string Expression, DateTime Timestamp);

// Traditional class still good for complex objects with behavior
public class CalculatorService : ICalculatorService
{
    // Implementation
}
```

## Comments and Documentation

### XML Documentation Comments

**Required** for public APIs:

```csharp
/// <summary>
/// Calculates the sum of two decimal numbers.
/// </summary>
/// <param name="a">The first number.</param>
/// <param name="b">The second number.</param>
/// <returns>The sum of <paramref name="a"/> and <paramref name="b"/>.</returns>
/// <exception cref="OverflowException">
/// Thrown when the result exceeds the range of decimal.
/// </exception>
public decimal Add(decimal a, decimal b)
{
    return a + b;
}
```

### Inline Comments

**Use sparingly** - prefer self-documenting code:

```csharp
// Good: Comment explains WHY, not WHAT
// We use decimal instead of double to avoid floating-point precision errors
private decimal _result;

// Avoid: Comment explains obvious WHAT
// This variable stores the result
private decimal _result;
```

### TODO Comments

```csharp
// TODO: [TASK-123] Implement expression validation
// Created: 2026-02-10, Owner: JohnM
// Priority: High
public void ValidateExpression(string expression)
{
    throw new NotImplementedException();
}
```

## Error Handling

### Exception Handling

```csharp
// Good
public async Task<decimal> DivideAsync(decimal a, decimal b)
{
    if (b == 0)
    {
        throw new ArgumentException("Divisor cannot be zero.", nameof(b));
    }

    try
    {
        return await PerformDivisionAsync(a, b);
    }
    catch (OverflowException ex)
    {
        _logger.LogError(ex, "Division overflow: {A} / {B}", a, b);
        throw new CalculationException("Division resulted in overflow", ex);
    }
}

// Avoid
public decimal Divide(decimal a, decimal b)
{
    try
    {
        return a / b;  // No validation, swallows DivideByZeroException
    }
    catch
    {
        return 0;  // Never swallow exceptions silently
    }
}
```

### Argument Validation

```csharp
// Good
public void ProcessExpression(string expression)
{
    ArgumentNullException.ThrowIfNull(expression);
    ArgumentException.ThrowIfNullOrWhiteSpace(expression, nameof(expression));

    if (expression.Length > MaxLength)
    {
        throw new ArgumentException(
            $"Expression length cannot exceed {MaxLength}.",
            nameof(expression));
    }

    // Process expression
}
```

## Async/Await Best Practices

### Naming Convention

**Suffix** async methods with `Async`:

```csharp
// Good
public async Task<decimal> CalculateAsync(string expression) { }
public async Task SaveResultAsync(decimal result) { }

// Avoid
public async Task<decimal> Calculate(string expression) { }
```

### Avoid Async Void

```csharp
// Good
public async Task HandleClickAsync()
{
    await ProcessAsync();
}

// Avoid (except for event handlers)
public async void HandleClick()  // Can't catch exceptions
{
    await ProcessAsync();
}

// Exception: Event handlers
private async void Button_Click(object sender, EventArgs e)
{
    try
    {
        await ProcessAsync();
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error in event handler");
    }
}
```

### ConfigureAwait

```csharp
// In library code
public async Task<string> GetDataAsync()
{
    var data = await _httpClient.GetStringAsync(url).ConfigureAwait(false);
    return ProcessData(data);
}

// In UI/ASP.NET Core code (ConfigureAwait not needed - no synchronization context)
public async Task<IActionResult> OnPostAsync()
{
    var result = await _service.CalculateAsync(Expression);
    return Page();
}
```

## LINQ Best Practices

### Readable Query Syntax

```csharp
// Good: Fluent syntax
var results = numbers
    .Where(n => n > 0)
    .OrderBy(n => n)
    .Select(n => n * 2)
    .ToList();

// Good: Query syntax for complex queries
var results = (from n in numbers
               where n > 0
               orderby n
               select n * 2).ToList();

// Avoid: All on one line
var results = numbers.Where(n => n > 0).OrderBy(n => n).Select(n => n * 2).ToList();
```

### Defer Execution When Appropriate

```csharp
// Good: Deferred execution
IEnumerable<int> query = numbers.Where(n => n > 0);
// ... more processing
var results = query.ToList();  // Execute here

// Good: Immediate execution when needed
var count = numbers.Count(n => n > 0);  // Execute immediately
```

## Dependency Injection

### Constructor Injection

```csharp
// Good
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;
    private readonly IConfiguration _configuration;

    public CalculatorService(
        ILogger<CalculatorService> logger,
        IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }
}

// Avoid: Service locator pattern
public class CalculatorService : ICalculatorService
{
    private readonly ILogger _logger;

    public CalculatorService(IServiceProvider serviceProvider)
    {
        _logger = serviceProvider.GetService<ILogger<CalculatorService>>();
    }
}
```

## Testing Standards

### Test Method Naming

```csharp
// Pattern: MethodName_StateUnderTest_ExpectedBehavior
[Fact]
public void Add_PositiveNumbers_ReturnsSum() { }

[Fact]
public void Divide_ByZero_ThrowsArgumentException() { }

[Theory]
[InlineData(5, 3, 8)]
[InlineData(-5, 3, -2)]
public void Add_VariousInputs_ReturnsCorrectSum(decimal a, decimal b, decimal expected) { }
```

### Arrange-Act-Assert Pattern

```csharp
[Fact]
public async Task CalculateAsync_ValidExpression_ReturnsResult()
{
    // Arrange
    var service = new CalculatorService();
    var expression = "2+2";

    // Act
    var result = await service.CalculateAsync(expression);

    // Assert
    Assert.Equal(4, result);
}
```

## Performance Considerations

### Value Types vs Reference Types

```csharp
// Good: Struct for small, immutable data
public readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);
}

// Good: Class for larger objects or when mutability needed
public class CalculationResult
{
    public decimal Value { get; set; }
    public string Expression { get; set; }
    public List<string> Steps { get; set; } = new();
}
```

### String Operations

```csharp
// Good: StringBuilder for multiple concatenations
var builder = new StringBuilder();
foreach (var item in items)
{
    builder.AppendLine(item);
}
var result = builder.ToString();

// Avoid: Repeated concatenation
string result = "";
foreach (var item in items)
{
    result += item + "\n";  // Creates new string each iteration
}
```

## EditorConfig Settings

Create `.editorconfig` in project root:

```ini
root = true

[*.cs]
# Indentation
indent_style = space
indent_size = 4

# New line preferences
end_of_line = crlf
insert_final_newline = true
charset = utf-8

# Naming conventions
dotnet_naming_rule.private_fields_rule.severity = warning
dotnet_naming_rule.private_fields_rule.symbols = private_fields
dotnet_naming_rule.private_fields_rule.style = underscore_camel_case

dotnet_naming_symbols.private_fields.applicable_kinds = field
dotnet_naming_symbols.private_fields.applicable_accessibilities = private

dotnet_naming_style.underscore_camel_case.capitalization = camel_case
dotnet_naming_style.underscore_camel_case.required_prefix = _

# Code style
csharp_prefer_braces = true:warning
csharp_prefer_simple_using_statement = true:suggestion
csharp_style_namespace_declarations = file_scoped:warning

# Null checking
csharp_style_throw_expression = true:suggestion
csharp_style_conditional_delegate_call = true:suggestion

dotnet_style_coalesce_expression = true:suggestion
dotnet_style_null_propagation = true:suggestion
```

## Code Review Checklist

- [ ] Naming follows project conventions
- [ ] Methods are focused and <50 lines
- [ ] Classes have single responsibility
- [ ] Public APIs have XML documentation
- [ ] Input validation on public methods
- [ ] Exceptions properly handled
- [ ] Async methods end with "Async"
- [ ] No `async void` (except event handlers)
- [ ] Resources properly disposed
- [ ] Tests added for new functionality
- [ ] No hardcoded values (use configuration)
- [ ] Null checks where appropriate
- [ ] Logging added for important operations

## Resources

- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)
- [C# Programming Guide](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/)

---

**Version**: 1.0.0
**Last Updated**: 2026-02-10
**Applies To**: All C# files in calculator-web project
