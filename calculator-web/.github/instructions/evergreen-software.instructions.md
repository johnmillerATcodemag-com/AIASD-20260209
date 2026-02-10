---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "JohnM"
chat_id: "execute-evergreen-prompt-20260210-163000"
prompt: |
  Execute create-evergreen-software-instructions.prompt.md to generate comprehensive evergreen software development instruction file
started: "2026-02-10T16:30:00Z"
ended: "2026-02-10T16:50:00Z"
task_durations:
  - task: "analyze prompt requirements"
    duration: "00:03:00"
  - task: "structure instruction file"
    duration: "00:05:00"
  - task: "write core sections"
    duration: "00:08:00"
  - task: "add checklists and examples"
    duration: "00:04:00"
total_duration: "00:20:00"
ai_log: "ai-logs/2026/02/10/execute-evergreen-prompt-20260210-163000/conversation.md"
source: ".github/prompts/create-evergreen-software-instructions.prompt.md"
applyTo: "**/*"
---

# Evergreen Software Development Instructions

## Overview

Evergreen software represents a paradigm shift from traditional "build and maintain" to "build and evolve." This approach treats software as a living system that continuously adapts, updates, and improves rather than becoming legacy code. By embedding practices that promote ongoing relevance, security, and maintainability, evergreen software reduces technical debt, minimizes security vulnerabilities, and maintains developer productivity over the long term.

**Key Benefits:**

- Reduced total cost of ownership through proactive maintenance
- Lower security risk through continuous updates
- Sustained developer productivity and morale
- Easier onboarding for new team members
- Competitive advantage through rapid feature delivery
- Future-ready architecture that adapts to change

## Core Principles

### 1. Continuous Evolution

Software is a living system, not a fixed artifact. Embrace change as constant and build systems that expect and facilitate evolution.

### 2. Future-Proof Architecture

Design for change, not just current requirements. Make decisions that enable future flexibility without over-engineering.

### 3. Sustainable Velocity

Balance development speed with long-term maintainability. Short-term shortcuts often create long-term problems.

### 4. Automated Currency

Automate dependency updates, security patches, documentation generation, and testing to maintain freshness without manual overhead.

### 5. Reversible Decisions

Prefer architectural and technical choices that can be changed later with minimal cost. Avoid irreversible commitments when possible.

### 6. Progressive Enhancement

Add new capabilities without breaking existing functionality. Design for backward compatibility and graceful degradation.

### 7. Visible Quality

Make quality, performance, security, and health metrics visible and actionable. What gets measured gets improved.

### 8. Shared Understanding

Document decisions, rationale, and context. Build systems that explain themselves through clear code and living documentation.

## Architecture Guidelines

### Modular Design

**Principle**: Build small, independent components with clear boundaries and single responsibilities.

**Implementation:**

```csharp
// Good: Single responsibility, clear interface
public interface ICalculatorService
{
    Task<decimal> AddAsync(decimal a, decimal b);
    Task<decimal> SubtractAsync(decimal a, decimal b);
}

public class CalculatorService : ICalculatorService
{
    // Implementation focused on calculation logic only
}

// Avoid: God objects with multiple responsibilities
public class MegaService
{
    // Calculation + Logging + Persistence + Validation...
}
```

**Benefits:**

- Easier to understand, test, and modify
- Can replace components without system-wide changes
- Enables independent deployment and scaling
- Facilitates parallel development

### Dependency Abstraction

**Principle**: Depend on interfaces, not concrete implementations. Invert dependencies to enable flexibility.

**Implementation:**

```csharp
// Good: Depend on abstraction
public class OrderProcessor
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly INotificationService _notificationService;

    public OrderProcessor(
        IPaymentGateway paymentGateway,
        INotificationService notificationService)
    {
        _paymentGateway = paymentGateway;
        _notificationService = notificationService;
    }
}

// Avoid: Direct dependencies on concrete types
public class OrderProcessor
{
    private readonly StripePaymentGateway _stripe = new();
    private readonly SmtpEmailService _email = new();
}
```

### Feature Flags

**Principle**: Use runtime configuration to control feature availability, enabling gradual rollouts and quick rollbacks.

**Implementation:**

```csharp
public class FeatureService
{
    private readonly IFeatureManager _featureManager;

    public async Task<IActionResult> GetNewFeature()
    {
        if (await _featureManager.IsEnabledAsync("NewCalculatorUI"))
        {
            return View("NewCalculator");
        }
        return View("Calculator");
    }
}
```

**Use Cases:**

- A/B testing
- Canary releases
- Emergency kill switches
- Gradual feature rollout
- Environment-specific features

### Version Tolerance

**Principle**: Support multiple API/protocol versions simultaneously during transitions.

**Implementation:**

```csharp
[ApiVersion("1.0")]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class CalculatorController : ControllerBase
{
    [HttpPost("calculate")]
    [MapToApiVersion("1.0")]
    public IActionResult CalculateV1([FromBody] CalculationRequestV1 request)
    {
        // V1 implementation
    }

    [HttpPost("calculate")]
    [MapToApiVersion("2.0")]
    public IActionResult CalculateV2([FromBody] CalculationRequestV2 request)
    {
        // V2 implementation with enhanced features
    }
}
```

### Clean Boundaries

**Principle**: Maintain clear separation between layers and concerns (presentation, business logic, data access).

**Structure:**

```
web-calculator/
├── Pages/              # Presentation layer
├── Services/           # Business logic
├── Models/             # Domain models
├── Data/               # Data access
└── Infrastructure/     # Cross-cutting concerns
```

## Code Quality Standards

### Self-Documenting Code

**Principle**: Write code that explains itself through clear naming and structure. Comments should explain "why," not "what."

**Good Example:**

```csharp
public async Task<OrderResult> ProcessOrderAsync(Order order)
{
    // We validate before payment to avoid charging for invalid orders
    await _validator.ValidateAsync(order);

    var paymentResult = await _paymentService.ProcessPaymentAsync(order);
    return await _orderRepository.SaveAsync(order, paymentResult);
}
```

**Avoid:**

```csharp
// This method processes an order
public async Task<OrderResult> DoStuff(Order o)
{
    // Call validator
    await v.Val(o);
    // Process payment
    var r = await ps.PP(o);
    // Save
    return await or.S(o, r);
}
```

### Test Automation

**Requirements:**

- **Unit Tests**: Test individual components in isolation (80%+ coverage target)
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **Performance Tests**: Validate response times and throughput
- **Security Tests**: Automated vulnerability scanning

**Example:**

```csharp
[Fact]
public async Task AddAsync_WithValidNumbers_ReturnsCorrectSum()
{
    // Arrange
    var calculator = new CalculatorService();

    // Act
    var result = await calculator.AddAsync(5, 3);

    // Assert
    Assert.Equal(8, result);
}

[Theory]
[InlineData(decimal.MaxValue, 1)]
[InlineData(decimal.MinValue, -1)]
public async Task AddAsync_WithOverflow_ThrowsOverflowException(decimal a, decimal b)
{
    var calculator = new CalculatorService();
    await Assert.ThrowsAsync<OverflowException>(() => calculator.AddAsync(a, b));
}
```

### Static Analysis

**Required Tools:**

- Code linters (ESLint, Roslyn analyzers)
- Type checkers (TypeScript, nullable reference types)
- Security scanners (SonarQube, Snyk, GitHub Security)
- Code complexity analyzers
- Dependency vulnerability scanners

**Configuration Example (.editorconfig):**

```ini
[*.cs]
# Enable all analyzers
dotnet_analyzer_diagnostic.severity = warning

# Enforce nullable reference types
nullable = enable

# Code style rules
dotnet_sort_system_directives_first = true
csharp_new_line_before_open_brace = all
```

### Code Reviews

**Mandatory Requirements:**

- Every PR requires at least one approval
- Automated checks must pass before review
- Review checklist:
  - [ ] Code follows style guidelines
  - [ ] Tests cover new functionality
  - [ ] Documentation updated
  - [ ] No security vulnerabilities introduced
  - [ ] Performance impact considered
  - [ ] Accessibility maintained/improved
  - [ ] Breaking changes documented

### Refactoring Discipline

**Schedule:**

- **Continuous**: Small improvements during feature work
- **Weekly**: Technical debt review in team meetings
- **Monthly**: Dedicated refactoring time (10-20% of sprint)
- **Quarterly**: Architecture review and major refactoring

**Red Flags Requiring Refactoring:**

- Duplicate code (DRY violations)
- Functions longer than 50 lines
- Classes with >500 lines
- Cyclomatic complexity >10
- Code coverage <80%
- Commented-out code

### Technical Debt Management

**Tracking:**

```csharp
// TODO: [TECH-DEBT-123] Replace with async version - Priority: Medium
// Created: 2026-02-01, Owner: JohnM
// Impact: Blocking main thread, affects responsiveness
public decimal CalculateSync(decimal a, decimal b)
{
    // Current synchronous implementation
}
```

**Levels:**

- **Critical**: Must fix before next release
- **High**: Fix within 2 sprints
- **Medium**: Fix within quarter
- **Low**: Opportunistic fixes

## Dependency Management

### Automated Updates

**Setup Dependabot (.github/dependabot.yml):**

```yaml
version: 2
updates:
  - package-ecosystem: "nuget"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    reviewers:
      - "team-lead"
    labels:
      - "dependencies"
      - "automated"
```

**Strategy:**

- Auto-merge minor and patch updates after CI passes
- Review major updates manually
- Group updates by ecosystem when possible
- Schedule during low-traffic periods

### Semantic Versioning

**Follow strictly:**

- **Patch (1.0.x)**: Bug fixes, no API changes
- **Minor (1.x.0)**: New features, backward compatible
- **Major (x.0.0)**: Breaking changes

**Version Ranges:**

```xml
<!-- Good: Accept patches, lock minor -->
<PackageReference Include="Newtonsoft.Json" Version="13.0.*" />

<!-- Better: Use lock files for exact versions -->
<!-- packages.lock.json controls actual versions -->
<PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
```

### Security Scanning

**Required Scans:**

- Dependency vulnerability scanning (daily)
- Container image scanning
- Code security analysis (SAST)
- Dynamic security testing (DAST)

**Response Times:**

- **Critical**: Patch within 24 hours
- **High**: Patch within 1 week
- **Medium**: Patch within 1 month
- **Low**: Include in next regular update

### Minimal Dependencies

**Evaluation Criteria:**

```markdown
Before adding dependency, ask:

- [ ] Is this functionality available in standard library?
- [ ] Can we implement this in <100 lines?
- [ ] Is this actively maintained (>1 commit in last 6 months)?
- [ ] Does it have acceptable license?
- [ ] What are its transitive dependencies?
- [ ] Is it from trusted source?
- [ ] What's the bundle size impact?
```

## Documentation Practices

### README-Driven Development

**Structure:**

```markdown
# Project Name

One-line description of what it does.

## Quick Start

[Fastest path to working code]

## Installation

[Step-by-step setup]

## Usage

[Common use cases with examples]

## API Reference

[Link to detailed API docs]

## Development

[How to contribute]

## Architecture

[High-level design overview]

## License

[License information]
```

### Architecture Decision Records (ADRs)

**Template (.github/adr/0001-use-razor-pages.md):**

```markdown
# 1. Use Razor Pages for Web UI

Date: 2026-02-10

## Status

Accepted

## Context

Need to choose web UI framework for calculator application.
Team has C# expertise. Requirements favor server-side rendering.

## Decision

Use ASP.NET Core Razor Pages for web interface.

## Consequences

### Positive

- Leverages existing C# skills
- Excellent performance with server-side rendering
- Simple page-based routing model
- Strong TypeScript/JavaScript interop when needed

### Negative

- Less suitable for highly interactive SPA scenarios
- Requires server round-trips for interactions
- Limited component reusability compared to Blazor

## Alternatives Considered

- Blazor Server: Too early in adoption curve
- React: Requires separate JavaScript expertise
- MVC: More ceremony than needed for this app size
```

### API Documentation

**Use OpenAPI/Swagger:**

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Calculator API",
        Version = "v1",
        Description = "Web calculator API for arithmetic operations",
        Contact = new OpenApiContact
        {
            Name = "Calculator Team",
            Email = "team@example.com"
        }
    });

    // Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});
```

### Changelog Maintenance

**Format (CHANGELOG.md):**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Expression parsing for complex calculations

### Changed

- Improved error handling for division operations

## [1.2.0] - 2026-02-10

### Added

- Scientific calculator mode
- Keyboard shortcuts
- Calculation history

### Fixed

- Precision issues with decimal calculations
- Memory leak in expression evaluator

## [1.1.0] - 2026-01-15

...
```

## Continuous Integration/Deployment

### Build Automation

**GitHub Actions Example (.github/workflows/build.yml):**

```yaml
name: Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: "9.0.x"

      - name: Restore dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore --configuration Release

      - name: Test
        run: dotnet test --no-build --verbosity normal --collect:"XPlat Code Coverage"

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.cobertura.xml
```

### Deployment Pipeline

**Stages:**

1. **Build**: Compile, lint, unit test
2. **Test**: Integration tests, security scans
3. **Stage**: Deploy to staging environment
4. **Verify**: Smoke tests, performance tests
5. **Prod**: Deploy to production (with approval)
6. **Monitor**: Watch metrics for anomalies

### Rollback Capability

**Requirements:**

- One-click rollback in deployment tool
- Maintain previous 3 versions in production-ready state
- Automated rollback on critical metrics degradation
- Database migrations must be reversible

### Blue-Green Deployments

**Strategy:**

```yaml
# Two identical production environments
# Traffic switches between them
production-blue:
  version: v1.2.0
  traffic: 100%

production-green:
  version: v1.3.0 # New version
  traffic: 0% # Testing/warming up


# After validation, switch:
# Blue: 0%, Green: 100%
```

## Monitoring & Observability

### Structured Logging

**Implementation:**

```csharp
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;

    public async Task<decimal> DivideAsync(decimal dividend, decimal divisor)
    {
        _logger.LogInformation(
            "Division requested: {Dividend} / {Divisor}, User: {UserId}",
            dividend, divisor, _currentUser.Id);

        if (divisor == 0)
        {
            _logger.LogWarning(
                "Division by zero attempted by user {UserId}",
                _currentUser.Id);
            throw new DivideByZeroException();
        }

        var result = dividend / divisor;

        _logger.LogInformation(
            "Division completed: {Result}, Duration: {DurationMs}ms",
            result, stopwatch.ElapsedMilliseconds);

        return result;
    }
}
```

### Distributed Tracing

**Use OpenTelemetry:**

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddSqlClientInstrumentation()
        .AddJaegerExporter());
```

### Metrics Collection

**Key Metrics:**

- **Performance**: Response time (p50, p95, p99), throughput
- **Errors**: Error rate, error types, stack traces
- **Business**: Calculations per hour, active users, feature usage
- **Infrastructure**: CPU, memory, disk, network

### Alerting

**Alert Rules:**

```yaml
alerts:
  - name: HighErrorRate
    condition: error_rate > 5%
    duration: 5m
    severity: critical
    channels: [pagerduty, slack]

  - name: SlowResponseTime
    condition: p95_response_time > 2s
    duration: 10m
    severity: warning
    channels: [slack]

  - name: HighMemoryUsage
    condition: memory_usage > 90%
    duration: 5m
    severity: warning
    channels: [slack]
```

## Security Practices

### Shift-Left Security

**Integrate security from design:**

- Threat modeling during architecture phase
- Security requirements in user stories
- Security unit tests alongside feature tests
- Security-focused code reviews

### Automated Security Scanning

**Pipeline Integration:**

```yaml
security-scan:
  runs-on: ubuntu-latest
  steps:
    - name: Run Snyk
      uses: snyk/actions/dotnet@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

    - name: Run Trivy
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: "fs"
        severity: "CRITICAL,HIGH"
```

### Secrets Management

**Never commit secrets:**

```csharp
// Good: Use configuration and secret stores
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{keyVaultName}.vault.azure.net/"),
    new DefaultAzureCredential());

// Avoid: Hardcoded secrets
var apiKey = "sk-1234567890abcdef"; // NEVER DO THIS
```

### Input Validation

**Always validate and sanitize:**

```csharp
public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
{
    // Validate
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Sanitize
    request.Expression = _sanitizer.Sanitize(request.Expression);

    // Validate business rules
    if (request.Expression.Length > 1000)
    {
        return BadRequest("Expression too long");
    }

    // Process
    var result = await _calculator.EvaluateAsync(request.Expression);
    return Ok(result);
}
```

### Security Headers

**Required headers:**

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Add(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
    context.Response.Headers.Add(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains");

    await next();
});
```

## Update & Maintenance Workflows

### Monthly Dependency Updates

**First Monday of Each Month:**

1. Review Dependabot PRs
2. Update patch and minor versions
3. Test thoroughly
4. Deploy to staging
5. Monitor for issues
6. Deploy to production
7. Document changes in changelog

### Quarterly Architecture Review

**Review Checklist:**

- [ ] Are architectural decisions still valid?
- [ ] Do we need to revisit any ADRs?
- [ ] Are there new patterns we should adopt?
- [ ] What technical debt has accumulated?
- [ ] Are our dependencies up to date?
- [ ] Is our tech stack still appropriate?
- [ ] Are we following current best practices?

### Annual Technology Audit

**Comprehensive Stack Review:**

- Framework versions (upgrade path needed?)
- Language versions (migration required?)
- Cloud services (new features to leverage?)
- Development tools (better options available?)
- Security posture (penetration test results?)
- Performance benchmarks (improvement needed?)
- Team skills (training requirements?)

### Deprecation Strategy

**Timeline:**

```markdown
Version N: Announce deprecation, provide alternatives
Version N+1: Add deprecation warnings in logs
Version N+2: Mark as obsolete, warnings in code
Version N+3: Remove deprecated functionality

Example:
v1.0: Announce CalculateSync() deprecation
v1.1: Log warnings when CalculateSync() used
v1.2: [Obsolete] attribute added
v2.0: Remove CalculateSync()
```

### Hotfix Procedures

**Process:**

1. Create hotfix branch from production tag
2. Implement minimal fix with test
3. Fast-track PR review (30 min SLA)
4. Deploy to production
5. Monitor closely
6. Backport to main branch
7. Post-mortem within 48 hours

## Team Practices

### Pair Programming

**Guidelines:**

- 2-3 hours per session maximum
- Switch driver/navigator every 25 minutes
- Use for complex features, onboarding, knowledge sharing
- Not required for simple tasks

### Code Ownership

**Model: Shared Ownership**

- No code is "owned" by individual developers
- Anyone can modify any code
- Original author is helpful contact, not gatekeeper
- Bus factor >1 for all critical components

### Blameless Post-Mortems

**Template:**

```markdown
# Incident Post-Mortem: [Title]

Date: [YYYY-MM-DD]
Duration: [How long]
Impact: [What was affected]

## Timeline

[Chronological sequence of events]

## Root Cause

[What actually caused the issue - focus on systems, not people]

## Contributing Factors

[What conditions allowed this to happen]

## Resolution

[How it was fixed]

## Action Items

- [ ] [Specific action, owner, due date]
- [ ] [Prevent recurrence]
- [ ] [Improve detection]
- [ ] [Improve response]

## Lessons Learned

[What we learned from this incident]
```

### Continuous Learning

**Allocation:**

- 10% of work time for learning
- Monthly tech talks/lunch & learns
- Conference attendance (1/year per developer)
- Book budget ($500/year per developer)
- Certification support

### Knowledge Sharing

**Channels:**

- Weekly team knowledge sharing (30 min)
- Internal wiki/documentation
- Code review comments (teaching moments)
- Pair programming sessions
- Tech spike presentations

## Technology Currency

### Framework Updates

**Policy:**

- Stay within N-1 or N-2 major versions of frameworks
- Upgrade to Long Term Support (LTS) versions
- Plan major upgrades quarterly
- Test upgrades in dedicated branch before merging

**Example:**

```
Current: .NET 9.0 (Latest)
Acceptable: .NET 8.0 (LTS)
Needs Upgrade Soon: .NET 7.0
Critical Upgrade: .NET 6.0 (approaching end of support)
```

### Language Versions

**Use latest stable features:**

```csharp
// C# 12 features
public class Calculator
{
    // Primary constructors
    public class Result(decimal value, string expression)
    {
        public decimal Value { get; } = value;
        public string Expression { get; } = expression;
    }

    // Collection expressions
    public List<decimal> GetHistory() => [1.0m, 2.0m, 3.0m];
}
```

### Best Practices Compliance

**Follow:**

- Microsoft's .NET best practices
- OWASP Top 10 security guidelines
- Web Content Accessibility Guidelines (WCAG) 2.2
- RESTful API design principles
- Cloud architecture best practices
- Containerization best practices

## Quality Gates

### Pre-Commit

- Code lints successfully
- Unit tests pass locally
- No debug statements or commented code

### Pull Request

- [ ] All CI checks pass
- [ ] Code coverage ≥80%
- [ ] At least one approval
- [ ] No merge conflicts
- [ ] Branch up to date with target

### Pre-Merge

- [ ] Integration tests pass
- [ ] Security scan shows no high/critical issues
- [ ] Performance tests show no regressions
- [ ] Documentation updated
- [ ] Changelog updated

### Pre-Release

- [ ] All tests pass in staging
- [ ] Smoke tests pass
- [ ] Load tests pass
- [ ] Security review complete
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

## AI-Assisted Development Integration

### Provenance Tracking

**Requirements:**

- All AI-generated code must follow [AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md)
- Include AI model, operator, chat ID, and timestamps
- Link to conversation logs
- Track in version control

### Review Standards

**AI code requires:**

- Same code review rigor as human-written code
- Explicit verification of correctness
- Security review (AI can generate vulnerable code)
- License compliance check
- Test coverage requirements

### Testing Requirements

**AI-generated code must have:**

- Unit tests (same coverage as human code)
- Integration tests where applicable
- Manual testing verification
- Performance validation

### Security Considerations

**Extra scrutiny for:**

- Authentication/authorization code
- Cryptographic implementations
- Input validation logic
- SQL queries or data access
- External API calls

### Learning Integration

**Use AI as teaching tool:**

- Review AI suggestions with junior developers
- Discuss why certain approaches were chosen
- Use as starting point for discussions
- Document decisions to override AI suggestions

## Compliance Checklist

Use this checklist to verify evergreen practices adherence:

### Architecture

- [ ] System uses modular design with clear boundaries
- [ ] Dependencies are abstracted behind interfaces
- [ ] Feature flags enable gradual rollouts
- [ ] API supports multiple versions
- [ ] Clean separation of concerns maintained

### Code Quality

- [ ] Code is self-documenting with clear naming
- [ ] Test coverage ≥80%
- [ ] Static analysis runs on every commit
- [ ] Code reviews required for all changes
- [ ] Technical debt tracked and prioritized

### Dependencies

- [ ] Automated dependency updates configured
- [ ] Security scanning runs daily
- [ ] Dependencies use semantic versioning
- [ ] Lock files committed to repository
- [ ] Dependency evaluation criteria followed

### Documentation

- [ ] README is current and comprehensive
- [ ] Architecture decisions recorded as ADRs
- [ ] API documentation generated from code
- [ ] CHANGELOG maintained with each release
- [ ] Migration guides provided for major changes

### CI/CD

- [ ] Builds are fully automated
- [ ] Tests run on every commit
- [ ] Deployments are automated
- [ ] Rollback capability exists and tested
- [ ] Blue-green or canary deployments used

### Monitoring

- [ ] Structured logging implemented
- [ ] Distributed tracing configured
- [ ] Key metrics collected and visualized
- [ ] Alerts defined for critical issues
- [ ] Dashboards accessible to team

### Security

- [ ] Security integrated from design phase
- [ ] Automated security scanning in pipeline
- [ ] Secrets managed securely (never committed)
- [ ] Input validation on all user input
- [ ] Security headers configured

### Maintenance

- [ ] Monthly dependency update process followed
- [ ] Quarterly architecture reviews conducted
- [ ] Annual technology audit completed
- [ ] Deprecation timeline communicated
- [ ] Post-mortems conducted for incidents

### Team

- [ ] Pair programming practiced regularly
- [ ] Code ownership is shared
- [ ] Learning time allocated (10%)
- [ ] Knowledge sharing sessions held
- [ ] Onboarding process documented

### Currency

- [ ] Frameworks within N-1 or N-2 versions
- [ ] Language features up to date
- [ ] Best practices followed
- [ ] Tools and IDEs current
- [ ] Cloud services leveraged

## Enforcement

### CI/CD Integration

Implement automated checks in build pipeline:

```yaml
# .github/workflows/evergreen-checks.yml
name: Evergreen Compliance

on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - name: Check dependency freshness
        run: |
          # Fail if dependencies >6 months old
          dotnet list package --outdated

      - name: Verify test coverage
        run: |
          # Fail if coverage <80%
          dotnet test --collect:"XPlat Code Coverage"

      - name: Security scan
        uses: snyk/actions/dotnet@master

      - name: Check for TODO/FIXME without tickets
        run: |
          # Fail if untracked technical debt exists
          grep -r "TODO\|FIXME" --exclude-dir=node_modules
```

### Code Quality Tools

**Required tooling:**

- EditorConfig for consistent formatting
- Roslyn analyzers for code quality
- SonarQube or similar for code analysis
- Dependabot for dependency updates
- CodeQL for security analysis

### Review Checklists

Use pull request templates to enforce standards:

```markdown
## Evergreen Checklist

### Code Quality

- [ ] Tests added/updated with ≥80% coverage
- [ ] Code follows project style guidelines
- [ ] No new compiler warnings
- [ ] Static analysis passes

### Documentation

- [ ] README updated if needed
- [ ] ADR created for significant decisions
- [ ] API documentation updated
- [ ] CHANGELOG entry added

### Security

- [ ] No secrets in code
- [ ] Input validation added
- [ ] Security scan passes
- [ ] Dependencies have no known vulnerabilities

### AI-Assisted (if applicable)

- [ ] Provenance metadata included
- [ ] Conversation log linked
- [ ] Extra security review completed
```

## Resources

### Tools & Frameworks

**Dependency Management:**

- [Dependabot](https://github.com/dependabot) - Automated dependency updates
- [Renovate](https://renovatebot.com/) - Dependency update automation
- [Snyk](https://snyk.io/) - Security vulnerability scanning

**Code Quality:**

- [SonarQube](https://www.sonarqube.org/) - Code quality analysis
- [Roslyn Analyzers](https://github.com/dotnet/roslyn-analyzers) - .NET code analysis
- [EditorConfig](https://editorconfig.org/) - Consistent coding styles

**Monitoring:**

- [OpenTelemetry](https://opentelemetry.io/) - Observability framework
- [Seq](https://datalust.co/seq) - Structured log server
- [Grafana](https://grafana.com/) - Metrics visualization

**Security:**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Security risks
- [GitHub Security](https://github.com/security) - Security scanning
- [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) - Secrets management

### Best Practices Guides

- [.NET Best Practices](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/)
- [The Twelve-Factor App](https://12factor.net/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Architecture Decision Records](https://adr.github.io/)

### Further Reading

- _Clean Code_ by Robert C. Martin
- _The Phoenix Project_ by Gene Kim
- _Accelerate_ by Nicole Forsgren, Jez Humble, Gene Kim
- _Site Reliability Engineering_ by Google
- _Building Microservices_ by Sam Newman

## Version History

### Version 1.0.0 - 2026-02-10

**Initial Release**

- Complete evergreen software development framework
- 13 core practice areas defined
- Integration with AI-assisted development policy
- Comprehensive checklists and examples
- CI/CD enforcement patterns

**Source**: Generated from [create-evergreen-software-instructions.prompt.md](.github/prompts/create-evergreen-software-instructions.prompt.md)

**AI Log**: [Conversation Log](../../../ai-logs/2026/02/10/execute-evergreen-prompt-20260210-163000/conversation.md)

---

**Note**: This instruction file is itself an evergreen artifact. It should be reviewed quarterly and updated as practices evolve, new tools emerge, and team needs change. All updates should follow the AI-assisted output policy with proper provenance tracking.
