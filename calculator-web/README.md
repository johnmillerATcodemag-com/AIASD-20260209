# Calculator Web Application

A web-based calculator application built with ASP.NET Core Razor Pages and C#.

## Project Structure

- `web-calculator/` - Main web application
  - `Pages/` - Razor Pages for UI
  - `Services/` - Business logic and calculator service
  - `wwwroot/` - Static assets (CSS, JS, libraries)
- `web-calculator.Tests/` - Unit and integration tests
- `.github/instructions/` - Development guidelines and instruction files

## Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- Visual Studio 2022, Visual Studio Code, or JetBrains Rider

### Running the Application

```bash
cd web-calculator
dotnet run
```

The application will be available at `http://localhost:5297` (or the port specified in launchSettings.json).

### Running Tests

```bash
dotnet test
```

## Development Guidelines

This project follows specific development practices defined in instruction files located in `.github/instructions/`.

### Instruction Files

#### General Development

- **[AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md)** - Defines provenance requirements and logging workflow for all AI-assisted content. All AI-generated artifacts must include complete metadata and conversation logs. ([AI Log](ai-logs/2026/01/20/generate-ai-output-policy-20260120/conversation.md))

- **[Evergreen Software Development Instructions](.github/instructions/evergreen-software.instructions.md)** - Comprehensive guide for maintaining continuously fresh, secure, and maintainable software through proactive practices including dependency management, code modernization, technical debt paydown, and security maintenance. Includes daily, weekly, monthly, quarterly, and annual checklists for sustainable software maintenance. ([AI Log](ai-logs/2026/02/10/create-evergreen-software-instructions-20260210/conversation.md))

- **[Chat Mode File Instructions](.github/instructions/chatmode-file.instructions.md)** - Guidelines for creating and using `.chatmode.md` files for AI chat context management

- **[Instruction Files Instructions](.github/instructions/instruction-files.instructions.md)** - Meta-instructions for creating and maintaining instruction files

- **[Prompt File Instructions](.github/instructions/prompt-file.instructions.md)** - Guidelines for creating and using `.prompt.md` files for reusable AI prompts

#### Backend Technologies

- **[.NET 9.0 Instructions](.github/instructions/dotnet-9.instructions.md)** - Complete guide for .NET 9.0 features including nullable reference types, implicit usings, file-scoped namespaces, primary constructors, async/await patterns, testing with xUnit, performance optimization, and security practices. ([AI Log](ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md))

- **[ASP.NET Core Razor Pages Instructions](.github/instructions/aspnetcore-razorpages.instructions.md)** - Comprehensive Razor Pages guidance covering project structure, Program.cs configuration, page models, routing, model binding, validation, tag helpers, layouts, middleware pipeline, error handling, security, and performance optimization. ([AI Log](ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md))

- **[C# Coding Standards Instructions](.github/instructions/csharp-coding-standards.instructions.md)** - C# coding conventions including naming standards, code organization, formatting rules, modern language features, documentation requirements, error handling patterns, LINQ best practices, and EditorConfig configuration. ([AI Log](ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md))

- **[Dependency Injection Instructions](.github/instructions/dependency-injection.instructions.md)** - Dependency injection patterns and best practices covering service lifetimes (Transient, Scoped, Singleton), interface-based design, constructor injection, Options pattern, generic services, testing with DI, and common patterns including Unit of Work and Decorator patterns. ([AI Log](ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md))

### Prompt Files

Reusable prompt templates for generating specific types of content with AI assistance:

- **[Create Evergreen Software Instructions Prompt](.github/prompts/create-evergreen-software-instructions.prompt.md)** - Comprehensive prompt template for generating evergreen software development instruction files. Defines requirements for architecture, code quality, dependency management, CI/CD, security, monitoring, and team practices to ensure long-term software maintainability and continuous relevance. ([AI Log](ai-logs/2026/02/10/create-evergreen-prompt-20260210-161500/conversation.md))

## Architecture

The application follows a clean architecture pattern with:

- Presentation layer (Razor Pages)
- Service layer (Calculator business logic)
- Dependency injection for service management

## Contributing

When contributing to this project:

1. Follow the guidelines in `.github/instructions/`
2. Ensure all tests pass before submitting PRs
3. For AI-assisted contributions, follow the [AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md)
4. Apply [Evergreen Software Development](.github/instructions/evergreen-software.instructions.md) practices

## License

[Specify license here]

## Current Status

### Completed
- [x] Project scaffolding with ASP.NET Core Razor Pages
- [x] Dependency injection setup
- [x] Bootstrap 5.3.3 integration
- [x] jQuery 3.7.1 and jQuery Validation 1.21.0 integration
- [x] Unit testing framework with xUnit and Coverlet
- [x] Comprehensive development instruction files
- [x] Clean architecture with service layer

### In Progress
- [ ] Calculator UI implementation
- [ ] Interactive expression evaluation
- [ ] Advanced validation features

### Technology Stack

**Backend:**
- .NET 9.0
- ASP.NET Core Razor Pages
- C# with nullable reference types

**Frontend:**
- Bootstrap 5.3.3
- jQuery 3.7.1
- jQuery Validation 1.21.0

**Testing:**
- xUnit
- Coverlet (code coverage)
- Microsoft.NET.Test.Sdk

**Development Tools:**
- EditorConfig for consistent coding style
- Instruction files for AI-assisted development

## Branch Information

- **Default Branch**: `main`
- **Current Branch**: `mob/fundamentals-3`
- **Repository**: johnmillerATcodemag-com/AIASD-20260209
