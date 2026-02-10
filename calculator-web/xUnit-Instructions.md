# xUnit Testing Framework Instructions

## Overview
xUnit (v2.9.2) is a free, open-source, community-focused unit testing framework for .NET applications.

## Installation
Already included in the project via NuGet:
```xml
<PackageReference Include="xunit" Version="2.9.2" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
```

## Basic Test Structure

### Simple Test
```csharp
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();

        // Act
        var result = calculator.Add(2, 3);

        // Assert
        Assert.Equal(5, result);
    }
}
```

### Parameterized Tests
```csharp
[Theory]
[InlineData(2, 3, 5)]
[InlineData(-1, 1, 0)]
[InlineData(0, 0, 0)]
public void Add_VariousInputs_ReturnsExpectedSum(int a, int b, int expected)
{
    var calculator = new Calculator();
    var result = calculator.Add(a, b);
    Assert.Equal(expected, result);
}
```

## Common Assertions

### Equality
```csharp
Assert.Equal(expected, actual);
Assert.NotEqual(expected, actual);
```

### Boolean
```csharp
Assert.True(condition);
Assert.False(condition);
```

### Null/Empty
```csharp
Assert.Null(obj);
Assert.NotNull(obj);
Assert.Empty(collection);
Assert.NotEmpty(collection);
```

### Exceptions
```csharp
Assert.Throws<DivideByZeroException>(() => calculator.Divide(10, 0));
```

### Collections
```csharp
Assert.Contains(item, collection);
Assert.DoesNotContain(item, collection);
Assert.All(collection, item => Assert.True(item > 0));
```

### Numeric
```csharp
Assert.InRange(actual, low, high);
Assert.Equal(expected, actual, precision: 2); // For decimals
```

## Test Lifecycle

### Constructor/Dispose (per test)
```csharp
public class DatabaseTests : IDisposable
{
    private readonly DbContext _context;

    public DatabaseTests()
    {
        // Setup - runs before each test
        _context = new DbContext();
    }

    public void Dispose()
    {
        // Cleanup - runs after each test
        _context.Dispose();
    }
}
```

### Class Fixtures (shared across tests)
```csharp
public class DatabaseFixture : IDisposable
{
    public DbContext Context { get; }

    public DatabaseFixture()
    {
        Context = new DbContext();
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}

public class DatabaseTests : IClassFixture<DatabaseFixture>
{
    private readonly DatabaseFixture _fixture;

    public DatabaseTests(DatabaseFixture fixture)
    {
        _fixture = fixture;
    }
}
```

## Running Tests

### Visual Studio
- Test Explorer: View → Test Explorer
- Run All: Ctrl+R, A
- Run Selected: Ctrl+R, T
- Debug Test: Right-click → Debug

### Command Line
```bash
# Run all tests
dotnet test

# Run with verbose output
dotnet test --verbosity detailed

# Run specific test
dotnet test --filter "FullyQualifiedName~CalculatorTests.Add_TwoNumbers_ReturnsSum"

# Run tests in a category
dotnet test --filter "Category=Unit"
```

## Best Practices

1. **Naming Convention**: `MethodName_Scenario_ExpectedBehavior`
2. **Arrange-Act-Assert Pattern**: Structure tests clearly
3. **One Assertion Per Test**: Keep tests focused
4. **Test Independence**: Each test should run independently
5. **Use Theory for Similar Tests**: Reduce code duplication
6. **Descriptive Test Names**: Make failures easy to understand

## Attributes

- `[Fact]` - Simple test with no parameters
- `[Theory]` - Parameterized test
- `[InlineData]` - Provide test data inline
- `[MemberData]` - Provide test data from property/method
- `[Skip("Reason")]` - Skip test with reason
- `[Trait("Category", "Unit")]` - Categorize tests

## Example Test Class

```csharp
namespace web_calculator.Tests
{
    public class CalculatorServiceTests
    {
        private readonly CalculatorService _sut; // System Under Test

        public CalculatorServiceTests()
        {
            _sut = new CalculatorService();
        }

        [Fact]
        public void Add_PositiveNumbers_ReturnsCorrectSum()
        {
            // Arrange
            decimal a = 10.5m;
            decimal b = 5.5m;

            // Act
            var result = _sut.Add(a, b);

            // Assert
            Assert.Equal(16m, result);
        }

        [Theory]
        [InlineData(10, 5, 2)]
        [InlineData(100, 10, 10)]
        [InlineData(-10, 2, -5)]
        public void Divide_ValidInputs_ReturnsQuotient(decimal a, decimal b, decimal expected)
        {
            var result = _sut.Divide(a, b);
            Assert.Equal(expected, result);
        }

        [Fact]
        public void Divide_ByZero_ThrowsException()
        {
            Assert.Throws<DivideByZeroException>(() => _sut.Divide(10, 0));
        }
    }
}
```

## Resources
- Official Documentation: https://xunit.net/
- GitHub Repository: https://github.com/xunit/xunit
- Assertion Reference: https://xunit.net/docs/assert-reference
