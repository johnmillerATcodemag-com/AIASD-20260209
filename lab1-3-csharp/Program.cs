using System;
using BookLibrary;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Metrics;
using Serilog;
using Serilog.Context;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Library as singleton
builder.Services.AddSingleton<Library>(sp => 
{
    var library = new Library("City Public Library");
    
    // Add some sample books
    library.AddBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565", 1925));
    library.AddBook(new Book("To Kill a Mockingbird", "Harper Lee", "978-0060935467", 1960));
    library.AddBook(new Book("1984", "George Orwell", "978-0451524935", 1949));
    library.AddBook(new Book("Pride and Prejudice", "Jane Austen", "978-0141439518", 1813));
    library.AddBook(new Book("The Catcher in the Rye", "J.D. Salinger", "978-0316769174", 1951));
    
    return library;
});

// Add health checks
builder.Services.AddHealthChecks()
    .AddCheck<LibraryHealthCheck>("library_health", tags: new[] { "ready" });

// Add OpenTelemetry
builder.Services.AddOpenTelemetry()
    .WithTracing(tracerProviderBuilder =>
    {
        tracerProviderBuilder
            .AddSource("BookLibrary")
            .SetResourceBuilder(
                ResourceBuilder.CreateDefault()
                    .AddService(serviceName: "BookLibrary", serviceVersion: "1.0.0"))
            .AddAspNetCoreInstrumentation()
            .AddConsoleExporter();
    })
    .WithMetrics(meterProviderBuilder =>
    {
        meterProviderBuilder
            .AddAspNetCoreInstrumentation()
            .AddConsoleExporter();
    });

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add correlation ID middleware
app.Use(async (context, next) =>
{
    var correlationId = context.TraceIdentifier;
    using (LogContext.PushProperty("CorrelationId", correlationId))
    {
        await next();
    }
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Map health check endpoints
app.MapHealthChecks("/health");
app.MapHealthChecks("/health/ready", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
{
    Predicate = (check) => check.Tags.Contains("ready")
});
app.MapHealthChecks("/health/live", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
{
    Predicate = (_) => false // Always returns healthy for liveness
});

// Log application startup
Log.Information("Book Library API starting up...");
Log.Information("Health check endpoints configured at /health, /health/ready, /health/live");

try
{
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
