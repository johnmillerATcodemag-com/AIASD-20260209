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

- **[AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md)** - Defines provenance requirements and logging workflow for all AI-assisted content. All AI-generated artifacts must include complete metadata and conversation logs. ([AI Log](ai-logs/2026/01/20/generate-ai-output-policy-20260120/conversation.md))

- **[Evergreen Software Development Instructions](.github/instructions/evergreen-software.instructions.md)** - Comprehensive guide for maintaining continuously fresh, secure, and maintainable software through proactive practices including dependency management, code modernization, technical debt paydown, and security maintenance. Includes daily, weekly, monthly, quarterly, and annual checklists for sustainable software maintenance. ([AI Log](ai-logs/2026/02/10/create-evergreen-software-instructions-20260210/conversation.md))

- **[Chat Mode File Instructions](.github/instructions/chatmode-file.instructions.md)** - Guidelines for creating and using `.chatmode.md` files for AI chat context management

- **[Instruction Files Instructions](.github/instructions/instruction-files.instructions.md)** - Meta-instructions for creating and maintaining instruction files

- **[Prompt File Instructions](.github/instructions/prompt-file.instructions.md)** - Guidelines for creating and using `.prompt.md` files for reusable AI prompts

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

## Branch Information

- **Default Branch**: `main`
- **Current Branch**: `mob/fundamentals-3`
- **Repository**: johnmillerATcodemag-com/AIASD-20260209
