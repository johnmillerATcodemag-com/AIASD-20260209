# C4 Architecture Diagrams - Calculator Project

This document contains C4 model diagrams for the Calculator Web Application using Mermaid syntax.

## Level 1: System Context Diagram

Shows the high-level system and its users.

```mermaid
C4Context
    title System Context Diagram - Calculator Application

    Person(user, "User", "A person who needs to perform mathematical calculations")

    System(calculatorWeb, "Calculator Web Application", "Provides web-based calculator functionality using ASP.NET Core Razor Pages")

    System_Ext(browser, "Web Browser", "User's web browser")

    Rel(user, browser, "Uses")
    Rel(browser, calculatorWeb, "Makes requests to", "HTTPS")
    Rel(calculatorWeb, browser, "Returns HTML/CSS/JS to")
```

## Level 2: Container Diagram

Shows the containers (applications, data stores, etc.) that make up the system.

```mermaid
C4Container
    title Container Diagram - Calculator Web Application

    Person(user, "User", "A person who needs to perform mathematical calculations")

    Container(razorPages, "Razor Pages", "ASP.NET Core", "Provides web UI for calculator operations")
    Container(services, "Service Layer", "C# .NET 9.0", "Contains business logic for expression evaluation")
    Container(staticAssets, "Static Assets", "wwwroot", "CSS, JavaScript, Bootstrap, jQuery")
    Container(consoleApp, "Console Calculator", ".NET 9.0 Console", "Command-line calculator application")

    Rel(user, razorPages, "Interacts with", "HTTPS")
    Rel(razorPages, services, "Uses", "DI")
    Rel(razorPages, staticAssets, "Serves")
    Rel(user, consoleApp, "Runs directly", "Command Line")
```

## Level 3: Component Diagram - Web Application

Shows the components within the web application container.

```mermaid
C4Component
    title Component Diagram - Web Calculator Application

    Component(indexPage, "Index Page", "Razor Page", "Main calculator UI with expression input and result display")
    Component(indexModel, "Index PageModel", "C# Class", "Handles GET/POST requests, validates input, coordinates calculation")
    Component(errorPage, "Error Page", "Razor Page", "Displays error information")
    Component(layout, "Shared Layout", "Razor Layout", "Common page structure and navigation")
    Component(iCalculatorService, "ICalculatorService", "Interface", "Defines calculator operations contract")
    Component(calculatorService, "CalculatorService", "Service Class", "Implements expression evaluation logic")
    Component(diContainer, "DI Container", "ASP.NET Core DI", "Manages service lifetimes and dependencies")
    Component(middleware, "Middleware Pipeline", "ASP.NET Core", "Handles requests, routing, error handling, HSTS")
    Component(bootstrap, "Bootstrap", "CSS Framework", "UI styling and responsive design")
    Component(jquery, "jQuery", "JavaScript Library", "DOM manipulation and AJAX")
    Component(validation, "jQuery Validation", "Plugin", "Client-side form validation")

    Rel(indexPage, indexModel, "Binds to")
    Rel(indexModel, iCalculatorService, "Uses", "Constructor Injection")
    Rel(iCalculatorService, calculatorService, "Implemented by")
    Rel(diContainer, calculatorService, "Creates and injects")
    Rel(middleware, indexModel, "Routes requests to")
    Rel(indexPage, bootstrap, "Uses for styling")
    Rel(indexPage, jquery, "Uses for interactivity")
    Rel(indexPage, validation, "Uses for validation")
```

## Level 3: Component Diagram - Service Layer Detail

Shows the internal structure of the service layer.

```mermaid
C4Component
    title Component Diagram - Calculator Service Layer

    Component(iCalculatorService, "ICalculatorService", "Interface", "Defines EvaluateExpression method")
    Component(calculatorService, "CalculatorService", "Implementation", "Evaluates mathematical expressions")

    Component(expressionParser, "Expression Parser", "Logic Component", "Parses string expressions into evaluable format")
    Component(validator, "Expression Validator", "Logic Component", "Validates expression syntax and safety")
    Component(evaluator, "Expression Evaluator", "Logic Component", "Computes the result using DataTable.Compute or custom logic")
    Component(errorHandler, "Error Handler", "Logic Component", "Handles and formats calculation errors")

    Rel(iCalculatorService, calculatorService, "Implemented by")
    Rel(calculatorService, validator, "Uses")
    Rel(calculatorService, expressionParser, "Uses")
    Rel(calculatorService, evaluator, "Uses")
    Rel(calculatorService, errorHandler, "Uses")
    Rel(validator, errorHandler, "Throws to")
```

## Deployment Diagram

Shows how the system is deployed.

```mermaid
C4Deployment
    title Deployment Diagram - Calculator Application

    Deployment_Node(devMachine, "Developer Machine", "Windows/Mac/Linux")
    Deployment_Node(dotnetRuntime, ".NET 9.0 Runtime", "Runtime Environment")
    Deployment_Node(browser, "Web Browser", "Chrome/Firefox/Edge")
    
    Container(webApp, "Web Calculator", "ASP.NET Core", "Runs on localhost:5297")
    Container(consoleApp, "Console Calculator", ".NET Console", "Runs in terminal")
    Container(ui, "Web UI", "HTML/CSS/JavaScript", "Rendered calculator interface")

    Rel(browser, webApp, "HTTPS requests", "HTTP/HTTPS")
    Rel(dotnetRuntime, webApp, "Hosts")
    Rel(dotnetRuntime, consoleApp, "Hosts")
```

## Technology Stack Summary

```mermaid
graph TB
    subgraph "Backend"
        dotnet[".NET 9.0"]
        aspnet["ASP.NET Core Razor Pages"]
        csharp["C# with Nullable References"]
        di["Dependency Injection"]
    end

    subgraph "Frontend"
        bootstrap["Bootstrap 5.3.3"]
        jquery["jQuery 3.7.1"]
        validation["jQuery Validation 1.21.0"]
        html["HTML5"]
        css["CSS3"]
        js["JavaScript"]
    end

    subgraph "Testing"
        xunit["xUnit"]
        coverlet["Coverlet"]
        testSdk["Microsoft.NET.Test.Sdk"]
    end

    subgraph "Architecture Patterns"
        cleanArch["Clean Architecture"]
        layered["Layered Architecture"]
        separation["Separation of Concerns"]
    end

    aspnet --> dotnet
    csharp --> dotnet
    di --> aspnet
    bootstrap --> html
    jquery --> js
    validation --> jquery
    xunit --> testSdk
    coverlet --> xunit
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant IndexPage as Index.cshtml
    participant PageModel as IndexModel
    participant Service as ICalculatorService
    participant Impl as CalculatorService

    User->>Browser: Enters expression "2+3*4"
    Browser->>IndexPage: POST request
    IndexPage->>PageModel: Model binding
    PageModel->>PageModel: Validate input
    PageModel->>Service: EvaluateExpression("2+3*4")
    Service->>Impl: Execute calculation
    Impl->>Impl: Parse and evaluate
    Impl-->>Service: Return "14"
    Service-->>PageModel: Return result
    PageModel->>PageModel: Set Result property
    PageModel-->>IndexPage: Return PageResult
    IndexPage-->>Browser: Render HTML with result
    Browser-->>User: Display "14"
```

## Architecture Principles

The application follows these key architectural principles:

1. **Separation of Concerns**: Presentation (Razor Pages), Business Logic (Services), and Infrastructure are separated
2. **Dependency Injection**: Services are injected via DI container with scoped lifetime
3. **Interface-Based Design**: ICalculatorService interface allows for testability and flexibility
4. **Clean Architecture**: Dependencies point inward toward business logic
5. **Testability**: Unit tests for services, integration tests for pages
6. **Modern .NET Practices**: Nullable reference types, implicit usings, file-scoped namespaces

## Notes

- The web application uses scoped dependency injection for the calculator service
- The console application is a standalone executable
- Static assets are served via ASP.NET Core's static file middleware
- The application supports both development and production environments with different middleware configurations
- HTTPS redirection and HSTS are enabled in production
