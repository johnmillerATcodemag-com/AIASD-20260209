# Book Library API - Health Checks and Observability

## Overview
This ASP.NET Core Web API provides a library management system with comprehensive health checks, structured logging, and observability features.

## Health Check Endpoints

The application now includes three health check endpoints for monitoring and container orchestration:

### 1. `/health` - Overall Health Status
Returns the overall health of the application.

```bash
curl http://localhost:5000/health
```

Response: `Healthy` or `Unhealthy`

### 2. `/health/ready` - Readiness Probe
Indicates whether the application is ready to accept requests. Checks if the library is operational with books loaded.

```bash
curl http://localhost:5000/health/ready
```

Response: `Healthy` (ready) or `Degraded` (operational but no books loaded)

### 3. `/health/live` - Liveness Probe
Indicates whether the application is running. Always returns healthy if the application is responsive.

```bash
curl http://localhost:5000/health/live
```

Response: `Healthy`

## API Endpoints

### GET /api/library/books
Get all books in the library with correlation ID tracking.

```bash
curl http://localhost:5000/api/library/books
```

### GET /api/library/books/search?term={searchTerm}
Search for books by title or author.

```bash
curl "http://localhost:5000/api/library/books/search?term=gatsby"
```

### POST /api/library/books
Add a new book to the library.

```bash
curl -X POST http://localhost:5000/api/library/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author Name","isbn":"123-456","publicationYear":2024}'
```

### POST /api/library/books/{isbn}/checkout
Check out a book.

```bash
curl -X POST http://localhost:5000/api/library/books/978-0451524935/checkout
```

### POST /api/library/books/{isbn}/return
Return a book.

```bash
curl -X POST http://localhost:5000/api/library/books/978-0451524935/return
```

### GET /api/library/stats
Get library statistics including custom metrics.

```bash
curl http://localhost:5000/api/library/stats
```

Response includes:
- Total books
- Available books
- Checked out books
- Total operations count
- Total errors count
- Error rate
- Correlation ID

## Structured Logging

The application uses **Serilog** for structured logging with the following features:

### Log Levels by Environment
- **Production**: Information level (configurable in `appsettings.json`)
- **Development**: Debug level (configurable in `appsettings.Development.json`)

### Log Outputs
1. **Console**: Human-readable format for development
2. **File**: Detailed logs in `logs/booklibrary-{Date}.log` with rolling daily intervals

### Correlation IDs
Every request includes a correlation ID for distributed tracing:
```
[2026-02-10 20:48:10.479 +00:00] [INF] [BookLibrary.Controllers.LibraryController] [CorrelationId: 0HNJ8SMO18DPD:00000001] Getting library statistics.
```

## OpenTelemetry Integration

The application includes OpenTelemetry for:

### Distributed Tracing
- Activity tracking for all API operations
- Console exporter for trace visualization
- Custom activity sources for the BookLibrary namespace

### Metrics Collection
- ASP.NET Core instrumentation metrics
- Custom application metrics:
  - Total operations count
  - Total errors count
  - Error rate calculation
- Console exporter for metrics

## Running the Application

### Development
```bash
cd lab1-3-csharp
dotnet run --project BookLibrary.csproj --urls "http://localhost:5000"
```

### Production
```bash
cd lab1-3-csharp
dotnet run --project BookLibrary.csproj --urls "http://localhost:5000" --environment Production
```

### Docker/Kubernetes Considerations
The health check endpoints are designed for container orchestration:

- **Liveness Probe**: `/health/live` - Restart container if unhealthy
- **Readiness Probe**: `/health/ready` - Remove from load balancer if not ready
- **Startup Probe**: `/health` - Check if application has started successfully

Example Kubernetes configuration:
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 5000
  initialDelaySeconds: 3
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 5000
  initialDelaySeconds: 3
  periodSeconds: 5
```

## Configuration

### appsettings.json
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    }
  },
  "Metrics": {
    "Enabled": true
  }
}
```

### appsettings.Development.json
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Debug"
    }
  }
}
```

## Monitoring and Observability Features

1. **Health Checks**: Real-time application health status
2. **Structured Logging**: JSON-formatted logs with context
3. **Correlation IDs**: Track requests across distributed systems
4. **Custom Metrics**: Application-specific performance indicators
5. **Distributed Tracing**: End-to-end request tracking with OpenTelemetry
6. **Error Tracking**: Automatic error logging and metrics

## Security

- All packages are up-to-date with security patches
- OpenTelemetry packages use version 1.9.0 (patched vulnerabilities from 1.7.0)
- Structured logging prevents log injection attacks
- Health check endpoints don't expose sensitive information

## Future Enhancements

Consider adding:
- Prometheus metrics endpoint for Kubernetes monitoring
- Application Insights integration for Azure monitoring
- ELK/Splunk integration for centralized logging
- Custom health checks for external dependencies (databases, APIs)
- Performance counters for detailed metrics
