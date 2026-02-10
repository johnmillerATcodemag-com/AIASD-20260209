# Coverlet Code Coverage Instructions

## Overview
Coverlet (v6.0.2) is a cross-platform code coverage framework for .NET. It provides detailed metrics about which parts of your code are tested.

## Installation
Already included in the project via NuGet:
```xml
<PackageReference Include="coverlet.collector" Version="6.0.2" />
```

Alternative (for more control):
```xml
<PackageReference Include="coverlet.msbuild" Version="6.0.2" />
```

## Basic Usage

### Collect Coverage with dotnet test
```bash
# Basic coverage collection
dotnet test --collect:"XPlat Code Coverage"

# Results saved to: TestResults/{guid}/coverage.cobertura.xml
```

### Specify Output Format
```bash
# Cobertura format (default)
dotnet test --collect:"XPlat Code Coverage"

# JSON format
dotnet test --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=json

# OpenCover format
dotnet test --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover

# Multiple formats
dotnet test --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=cobertura,json,lcov
```

## Coverage Output Formats

### Supported Formats
- **cobertura** - XML format (default), Azure DevOps compatible
- **json** - JSON format for custom processing
- **lcov** - Text format, used by many tools
- **opencover** - XML format, Visual Studio compatible
- **teamcity** - TeamCity format

## Configuration

### Using runsettings File
Create `coverage.runsettings`:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<RunSettings>
  <DataCollectionRunSettings>
    <DataCollectors>
      <DataCollector friendlyName="XPlat Code Coverage">
        <Configuration>
          <Format>cobertura,json</Format>
          <Exclude>[xunit.*]*,[*.Tests]*</Exclude>
          <Include>[web-calculator]*</Include>
          <ExcludeByAttribute>Obsolete,GeneratedCode,CompilerGenerated</ExcludeByAttribute>
          <ExcludeByFile>**/Migrations/*.cs</ExcludeByFile>
          <IncludeDirectory>../src/</IncludeDirectory>
        </Configuration>
      </DataCollector>
    </DataCollectors>
  </DataCollectionRunSettings>
</RunSettings>
```

Use it:
```bash
dotnet test --settings coverage.runsettings
```

### Exclude Patterns
```xml
<!-- Exclude by assembly -->
<Exclude>[AssemblyName]*</Exclude>

<!-- Exclude by namespace -->
<Exclude>[*]MyApp.Tests.*</Exclude>

<!-- Exclude specific types -->
<Exclude>[*]*Tests</Exclude>

<!-- Multiple exclusions -->
<Exclude>[xunit.*]*,[*.Tests]*,[*]*.Migrations.*</Exclude>
```

### Include Patterns
```xml
<!-- Include specific assembly -->
<Include>[MyApp]*</Include>

<!-- Include specific namespace -->
<Include>[MyApp]MyApp.Services.*</Include>

<!-- Multiple inclusions -->
<Include>[MyApp]*,[MyApp.Core]*</Include>
```

## Code Coverage Metrics

### Line Coverage
Percentage of executable lines that were executed during tests.

### Branch Coverage
Percentage of conditional branches (if/else, switch) that were executed.

### Method Coverage
Percentage of methods that were called during tests.

### Example Report Interpretation
```
Module         | Line   | Branch | Method
web-calculator | 85.7%  | 75.0%  | 90.0%
```

## Viewing Coverage Reports

### ReportGenerator (Recommended)
Install:
```bash
dotnet tool install -g dotnet-reportgenerator-globaltool
```

Generate HTML report:
```bash
# Run tests with coverage
dotnet test --collect:"XPlat Code Coverage"

# Generate report
reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html

# Open report
start coveragereport/index.html  # Windows
open coveragereport/index.html   # macOS
xdg-open coveragereport/index.html  # Linux
```

### Report Types
```bash
# HTML report
reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html

# HTML Summary
reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:HtmlSummary

# Badge (SVG)
reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Badges

# Multiple types
reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html,Badges,TextSummary
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Code Coverage

on: [push, pull_request]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '9.0.x'

      - name: Run tests with coverage
        run: dotnet test --collect:"XPlat Code Coverage" --results-directory ./coverage

      - name: Install ReportGenerator
        run: dotnet tool install -g dotnet-reportgenerator-globaltool

      - name: Generate coverage report
        run: reportgenerator -reports:"./coverage/*/coverage.cobertura.xml" -targetdir:"./coveragereport" -reporttypes:"Html;Badges"

      - name: Upload coverage report
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: ./coveragereport

      - name: Publish coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/*/coverage.cobertura.xml
```

### Azure DevOps
```yaml
- task: DotNetCoreCLI@2
  displayName: 'Run Tests with Coverage'
  inputs:
    command: 'test'
    projects: '**/*Tests.csproj'
    arguments: '--collect:"XPlat Code Coverage"'

- task: PublishCodeCoverageResults@1
  displayName: 'Publish Code Coverage'
  inputs:
    codeCoverageTool: 'Cobertura'
    summaryFileLocation: '$(Agent.TempDirectory)/**/coverage.cobertura.xml'
```

## Coverage Thresholds

### Set Minimum Coverage
Add to `.csproj`:
```xml
<PropertyGroup>
  <CoverletOutputFormat>cobertura</CoverletOutputFormat>
  <Threshold>80</Threshold>
  <ThresholdType>line,branch,method</ThresholdType>
  <ThresholdStat>total</ThresholdStat>
</PropertyGroup>
```

### Fail Build on Low Coverage
```bash
dotnet test /p:Threshold=80 /p:ThresholdType=line /p:ThresholdStat=total
```

## Excluding Code from Coverage

### Using Attributes
```csharp
using System.Diagnostics.CodeAnalysis;

[ExcludeFromCodeCoverage]
public class Program
{
    static void Main(string[] args)
    {
        // This won't be counted in coverage
    }
}

[ExcludeFromCodeCoverage]
public void DebugOnlyMethod()
{
    // Excluded from coverage
}
```

### Using Comments (not supported)
Coverlet doesn't support comment-based exclusion. Use attributes instead.

## Best Practices

1. **Set Realistic Thresholds**: Start with current coverage and improve gradually
2. **Exclude Test Projects**: Don't count test code in coverage
3. **Exclude Generated Code**: Migrations, auto-generated files
4. **Focus on Branch Coverage**: Line coverage alone can be misleading
5. **Review Reports Regularly**: Use HTML reports to identify gaps
6. **Integrate into CI/CD**: Automate coverage collection
7. **Don't Chase 100%**: Focus on critical paths, 80-90% is often sufficient

## Common Coverage Scenarios

### Testing a Calculator Service
```csharp
public class CalculatorServiceTests
{
    [Theory]
    [InlineData(5, 3, 8)]
    [InlineData(-1, 1, 0)]
    [InlineData(0, 0, 0)]
    public void Add_VariousInputs_ReturnsCorrectSum(decimal a, decimal b, decimal expected)
    {
        // This ensures multiple branches are tested
        var calculator = new CalculatorService();
        var result = calculator.Add(a, b);
        Assert.Equal(expected, result);
    }

    [Fact]
    public void Divide_ByZero_ThrowsException()
    {
        // Testing exception path increases branch coverage
        var calculator = new CalculatorService();
        Assert.Throws<DivideByZeroException>(() => calculator.Divide(10, 0));
    }
}
```

## Troubleshooting

### Coverage Files Not Generated
- Ensure `coverlet.collector` is installed
- Check `IsTestProject` is true in `.csproj`
- Verify `Microsoft.NET.Test.Sdk` is installed

### Low Coverage Numbers
- Check exclude patterns - you might be excluding too much
- Verify tests are actually running
- Review coverage report to identify untested code

### Performance Issues
- Use selective coverage in development
- Run full coverage in CI/CD only
- Exclude unnecessary assemblies

## Useful Commands

```bash
# Quick coverage check
dotnet test --collect:"XPlat Code Coverage" --verbosity minimal

# Coverage with HTML report (one-liner)
dotnet test --collect:"XPlat Code Coverage" && reportgenerator -reports:"TestResults/*/coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html && start coveragereport/index.html

# Clean old results
rm -rf TestResults/ coveragereport/

# Coverage for specific project
dotnet test ./web-calculator.Tests/web-calculator.Tests.csproj --collect:"XPlat Code Coverage"
```

## Resources
- Official Documentation: https://github.com/coverlet-coverage/coverlet
- ReportGenerator: https://github.com/danielpalme/ReportGenerator
- Code Coverage in .NET: https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-code-coverage
