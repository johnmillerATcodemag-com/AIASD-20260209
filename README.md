# AIASD-20260209

AI-Assisted Software Development repository demonstrating best practices for AI-generated code with comprehensive provenance tracking, evergreen development practices, and quality assurance.

## Repository Contents

### Applications

- **calculator/** - Simple console calculator application (.NET 9.0)
- **calculator-web/** - Web-based calculator with ASP.NET Core Razor Pages
- **web-calculator/** - Alternative web calculator implementation

### Documentation

- **docs/** - Project documentation including organization guidelines and path-scoped instructions
- **.github/instructions/** - Instruction files for AI-assisted development and repository guidelines
- **.github/prompts/** - Prompt files for generating AI-assisted artifacts

### AI Activity Logs

- **ai-logs/** - Complete conversational history and provenance for all AI-generated artifacts

## AI-Assisted Artifacts

This section documents all AI-generated or AI-assisted content in the repository, with links to their creation conversation logs for full transparency and reproducibility.

### Instruction Files

- [Evergreen Development Instructions](.github/instructions/evergreen-development.instructions.md) - Comprehensive practices for continuous software modernization, technical debt prevention, dependency management, security posture, and sustainable development velocity ([AI Log](ai-logs/2026/02/10/evergreen-dev-instructions-20260210/conversation.md))

## Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- Visual Studio 2022 or Visual Studio Code
- Git

### Build Instructions

**Console Calculator:**

```bash
cd calculator
dotnet build
dotnet run
```

**Web Calculator:**

```bash
cd calculator-web/web-calculator
dotnet restore
dotnet build
dotnet run
```

### Running Tests

```bash
cd calculator-web/web-calculator.Tests
dotnet test
```

## Contributing

This repository follows strict AI provenance and quality standards. Before contributing:

1. Review [AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md)
2. Review [Evergreen Development Instructions](.github/instructions/evergreen-development.instructions.md)
3. Ensure all AI-generated content includes full provenance metadata
4. Create conversation logs for all AI-assisted work
5. Update this README with new artifacts

### PR Requirements

All pull requests must:

- ✅ Pass all CI/CD quality gates
- ✅ Include tests for new functionality
- ✅ Maintain or improve code coverage (≥80%)
- ✅ Include AI provenance metadata for AI-assisted code
- ✅ Update documentation as needed
- ✅ Follow evergreen development practices

## Repository Policies

### AI-Assisted Development

All AI-generated or AI-assisted artifacts must comply with [.github/instructions/ai-assisted-output.instructions.md](.github/instructions/ai-assisted-output.instructions.md), including:

- Full provenance metadata (model, operator, timestamps, etc.)
- Conversation logs stored in `ai-logs/` structure
- Session summaries for resumability
- Links from artifacts to conversation logs

### Evergreen Practices

This repository follows evergreen software development practices as defined in [.github/instructions/evergreen-development.instructions.md](.github/instructions/evergreen-development.instructions.md):

- Continuous dependency updates and security patching
- Proactive code modernization and technical debt management
- Automated quality gates and security scanning
- Regular infrastructure and tooling evolution
- Sustainable development velocity

### Quality Standards

- **Code Coverage**: Minimum 80% for business logic
- **Security**: All vulnerabilities addressed within SLA by severity
- **Dependencies**: Updated within 90 days of release
- **Documentation**: Kept current with code changes
- **Tests**: Comprehensive unit, integration, and E2E coverage

## License

[Specify License]

## Contact

[Specify Contact Information]

---

**Repository Version**: 1.0.0
**Last Updated**: 2026-02-10
**Primary Language**: C# (.NET 9.0)
**Maintained By**: johnmillerATcodemag-com
