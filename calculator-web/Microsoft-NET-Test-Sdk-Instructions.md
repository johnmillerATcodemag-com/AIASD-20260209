# Microsoft.NET.Test.Sdk Instructions

## Overview
Microsoft.NET.Test.Sdk (v17.12.0) is the test platform for running .NET tests. It provides the infrastructure for test discovery, execution, and reporting.

## Installation
Already included in the project via NuGet:
```xml
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
```

## What It Does
- Discovers tests in your test assemblies
- Executes tests through test adapters (like xUnit, NUnit, MSTest)
- Reports test results
- Integrates with Visual Studio Test Explorer
- Enables command-line test execution via `dotnet test`

## Running Tests

### Command Line (dotnet test)

#### Basic Commands
```bash
# Run all tests in the solution
dotnet test

# Run tests in a specific project
dotnet test web-calculator.Tests/web-calculator.Tests.csproj

# Build and run tests
dotnet test --no-build

# Skip build step (tests already built)
dotnet test --no-restore
```

#### Filtering Tests
```bash
# Run tests by fully qualified name
dotnet test --filter "FullyQualifiedName~CalculatorTests"

# Run tests by display name
dotnet test --filter "DisplayName~Add"

# Run tests by trait/category
dotnet test --filter "Category=Unit"

# Run tests by priority
dotnet test --filter "Priority=1"

# Multiple filters (OR)
dotnet test --filter "FullyQualifiedName~Add|FullyQualifiedName~Subtract"

# Multiple filters (AND)
dotnet test --filter "FullyQualifiedName~Calculator&Category=Unit"
```

#### Output Options
```bash
# Detailed output
dotnet test --verbosity detailed

# Minimal output
dotnet test --verbosity minimal

# Quiet (only show errors)
dotnet test --verbosity quiet

# Normal output (default)
dotnet test --verbosity normal
```

#### Test Results
```bash
# Generate test results file (TRX format)
dotnet test --logger "trx;LogFileName=testresults.trx"

# Generate HTML report
dotnet test --logger "html;LogFileName=testresults.html"

# Multiple loggers
dotnet test --logger "trx" --logger "console;verbosity=detailed"

# Custom results directory
dotnet test --results-directory ./TestResults
```

#### Configuration
```bash
# Run in Debug configuration
dotnet test --configuration Debug

# Run in Release configuration
dotnet test --configuration Release

# Set target framework
dotnet test --framework net9.0
```

#### Parallel Execution
```bash
# Run tests in parallel (default)
dotnet test

# Disable parallel execution
dotnet test -- RunConfiguration.MaxCpuCount=1
```

## Project Configuration

### Basic Test Project Setup
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.12.0" />
    <PackageReference Include="xunit" Version="2.9.2" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
  </ItemGroup>
</Project>
```

### RunSettings Configuration
Create a `test.runsettings` file for advanced configuration:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
  <RunConfiguration>
    <MaxCpuCount>4</MaxCpuCount>
    <ResultsDirectory>.\TestResults</ResultsDirectory>
    <TargetFrameworkVersion>net9.0</TargetFrameworkVersion>
  </RunConfiguration>

  <DataCollectionRunSettings>
    <DataCollectors>
      <DataCollector friendlyName="Code Coverage" />
    </DataCollectors>
  </DataCollectionRunSettings>
</RunSettings>
```

Use it with:
```bash
dotnet test --settings test.runsettings
```

## Visual Studio Integration

### Test Explorer
- **Open**: View → Test Explorer (Ctrl+E, T)
- **Run All**: Click "Run All" button
- **Run Selected**: Right-click test → Run
- **Debug Test**: Right-click test → Debug
- **Group By**: Class, Namespace, Project, Trait

### Live Unit Testing (Visual Studio Enterprise)
- Enable: Test → Live Unit Testing → Start
- Shows test coverage in real-time
- Automatically runs affected tests on code changes

## CI/CD Integration

### GitHub Actions
```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '9.0.x'

      - name: Restore dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore

      - name: Test
        run: dotnet test --no-build --verbosity normal --logger "trx" --results-directory ./TestResults

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: ./TestResults/*.trx
```

### Azure DevOps
```yaml
- task: DotNetCoreCLI@2
  displayName: 'Run Tests'
  inputs:
    command: 'test'
    projects: '**/*Tests.csproj'
    arguments: '--configuration $(buildConfiguration) --logger trx --collect:"XPlat Code Coverage"'

- task: PublishTestResults@2
  displayName: 'Publish Test Results'
  inputs:
    testResultsFormat: 'VSTest'
    testResultsFiles: '**/*.trx'
```

## Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed
- Other codes indicate errors in test execution

## Performance Optimization

### Reduce Build Time
```bash
# Build once, run tests multiple times
dotnet build
dotnet test --no-build
```

### Parallel Execution
```bash
# Use all available CPU cores
dotnet test -- RunConfiguration.MaxCpuCount=0
```

### Blame Data Collector (for hanging tests)
```bash
dotnet test --blame
dotnet test --blame-hang-timeout 60s
```

## Troubleshooting

### Tests Not Discovered
1. Ensure `Microsoft.NET.Test.Sdk` is installed
2. Check test adapter (xunit.runner.visualstudio) is installed
3. Verify test methods have proper attributes ([Fact], [Theory])
4. Clean and rebuild: `dotnet clean && dotnet build`

### Tests Hanging
```bash
# Use blame to identify hanging tests
dotnet test --blame-hang --blame-hang-timeout 30s
```

### Debug Test Discovery
```bash
# Enable diagnostic logging
dotnet test --diag:log.txt --verbosity diagnostic
```

## Best Practices

1. **Use Configuration Files**: Store settings in `.runsettings` files
2. **Automate in CI/CD**: Always run tests in your pipeline
3. **Filter for Speed**: Use filters during development
4. **Generate Reports**: Use loggers for documentation
5. **Parallel Execution**: Enable for faster test runs
6. **Keep Tests Fast**: Optimize test execution time

## Resources
- Official Documentation: https://learn.microsoft.com/en-us/dotnet/core/testing/
- dotnet test Reference: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test
- RunSettings Documentation: https://learn.microsoft.com/en-us/visualstudio/test/configure-unit-tests-by-using-a-dot-runsettings-file
