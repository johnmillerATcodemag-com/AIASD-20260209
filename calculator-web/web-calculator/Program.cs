// ============================================================================
// Program.cs - Application Entry Point
// ============================================================================
// This file configures and starts the ASP.NET Core web application for the
// calculator web interface. It follows the minimal hosting model introduced
// in .NET 6+ and uses top-level statements for simplified configuration.
//
// Architecture Pattern: Dependency Injection with Service Layer
// See: .github/instructions/architecture-patterns-di-service-layer.instructions.md
//
// Key Responsibilities:
// 1. Configure dependency injection container with application services
// 2. Set up middleware pipeline for request processing
// 3. Configure Razor Pages framework
// 4. Initialize Kestrel web server (see razor-pages-kestrel.instructions.md)
// ============================================================================

using web_calculator.Services;

// ============================================================================
// Application Builder Configuration
// ============================================================================
// Creates the WebApplication builder with default configuration from:
// - appsettings.json (base configuration)
// - appsettings.{Environment}.json (environment-specific overrides)
// - Environment variables
// - Command-line arguments
var builder = WebApplication.CreateBuilder(args);

// ============================================================================
// Service Registration (Dependency Injection Container)
// ============================================================================
// Register all application services with the DI container. Services registered
// here can be injected into Razor Pages, controllers, and other services.

// Add Razor Pages framework services
// This registers all services required for Razor Pages functionality including
// view rendering, model binding, validation, and routing.
builder.Services.AddRazorPages();

// Register calculator service with scoped lifetime
// Scoped lifetime: One instance per HTTP request
// ICalculatorService: Interface for loose coupling and testability
// CalculatorService: Concrete implementation with calculation logic
// Pattern: Service Layer Pattern - business logic separated from presentation
builder.Services.AddScoped<ICalculatorService, CalculatorService>();

// ============================================================================
// Build Application
// ============================================================================
// Compiles the service configuration and creates the WebApplication instance
// with the configured middleware pipeline.
var app = builder.Build();

// ============================================================================
// Middleware Pipeline Configuration
// ============================================================================
// Middleware components are executed in the order they are added.
// Each component can process requests and responses, short-circuit the pipeline,
// or pass execution to the next component.

// Production-only middleware
// In production environments, use robust error handling and security features
if (!app.Environment.IsDevelopment())
{
    // UseExceptionHandler: Catches unhandled exceptions and redirects to /Error page
    // Prevents sensitive error details from being exposed to end users
    app.UseExceptionHandler("/Error");

    // UseHsts: HTTP Strict Transport Security
    // Instructs browsers to only access the site over HTTPS
    // Default: 30 days. Consider extending to 1 year for production (max-age=31536000)
    // See: https://aka.ms/aspnetcore-hsts
    app.UseHsts();

    // UseHttpsRedirection: Redirects HTTP requests to HTTPS
    // Ensures all traffic uses encrypted connections in production
    app.UseHttpsRedirection();
}

// UseRouting: Enables endpoint routing
// Matches incoming requests to registered endpoints (Razor Pages, APIs, etc.)
// Must be called before UseAuthorization and endpoint mapping
app.UseRouting();

// UseAuthorization: Enables authorization middleware
// Evaluates authorization policies on endpoints
// Must be called after UseRouting and before endpoint mapping
app.UseAuthorization();

// MapStaticAssets: Maps static file endpoints with optimized caching
// .NET 9+ feature for improved static file serving performance
// Serves files from wwwroot/ directory (CSS, JavaScript, images, etc.)
app.MapStaticAssets();

// MapRazorPages: Maps Razor Pages endpoints
// Registers all Razor Pages in the Pages/ directory with the routing system
// WithStaticAssets: Enables optimized static asset serving for Razor Pages
app.MapRazorPages()
   .WithStaticAssets();

// ============================================================================
// Start Application
// ============================================================================
// Starts the Kestrel web server and begins listening for HTTP requests
// Default ports:
// - Development: https://localhost:5001, http://localhost:5000
// - Production: Configured via environment variables or command-line args
// The application runs until stopped (Ctrl+C or process termination)
app.Run();
