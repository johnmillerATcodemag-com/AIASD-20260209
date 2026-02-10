---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "backend-tech-instructions-20260210"
prompt: |
  Create instruction files for backend technologies: ASP.NET Core and Razor Pages
started: "2026-02-10T17:00:00Z"
ended: "2026-02-10T17:15:00Z"
task_durations:
  - task: "create ASP.NET Core Razor Pages instructions"
    duration: "00:04:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/02/10/backend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.cshtml, **/*.cs, **/Program.cs"
---

# ASP.NET Core Razor Pages Instructions

## Overview

This project uses ASP.NET Core with Razor Pages for server-side web application development. Razor Pages provides a page-based programming model that makes building web UI cleaner and more productive.

## Project Structure

```
web-calculator/
├── Program.cs              # Application entry point and configuration
├── Pages/                  # Razor Pages
│   ├── Index.cshtml       # Page view
│   ├── Index.cshtml.cs    # Page model (code-behind)
│   ├── _ViewImports.cshtml # Global imports
│   ├── _ViewStart.cshtml  # Layout defaults
│   └── Shared/            # Shared views
│       └── _Layout.cshtml # Main layout
├── Services/              # Business logic services
├── wwwroot/              # Static files (CSS, JS, images)
└── appsettings.json      # Configuration
```

## Program.cs Configuration

### Minimal Hosting Model

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddRazorPages();

// Register custom services
builder.Services.AddScoped<ICalculatorService, CalculatorService>();

var app = builder.Build();

// Configure middleware pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseAuthorization();
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

app.Run();
```

### Service Registration Patterns

```csharp
// Transient - New instance per request
builder.Services.AddTransient<IEmailService, EmailService>();

// Scoped - One instance per HTTP request
builder.Services.AddScoped<ICalculatorService, CalculatorService>();

// Singleton - Single instance for application lifetime
builder.Services.AddSingleton<ICacheService, CacheService>();

// Options pattern
builder.Services.Configure<CalculatorOptions>(
    builder.Configuration.GetSection("Calculator"));
```

## Razor Pages Structure

### Page Model Pattern

**PageName.cshtml** (View):

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Calculator";
}

<h1>@ViewData["Title"]</h1>

<form method="post">
    <input asp-for="Expression" />
    <button type="submit">Calculate</button>
    <span asp-validation-for="Expression"></span>
</form>

@if (Model.Result.HasValue)
{
    <div class="result">
        Result: @Model.Result.Value
    </div>
}
```

**PageName.cshtml.cs** (Code-Behind):

```csharp
public class IndexModel : PageModel
{
    private readonly ICalculatorService _calculatorService;
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(
        ICalculatorService calculatorService,
        ILogger<IndexModel> logger)
    {
        _calculatorService = calculatorService;
        _logger = logger;
    }

    [BindProperty]
    public string Expression { get; set; } = string.Empty;

    public decimal? Result { get; set; }

    public void OnGet()
    {
        // Initialize page
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        try
        {
            Result = await _calculatorService.EvaluateAsync(Expression);
            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Calculation failed for expression: {Expression}", Expression);
            ModelState.AddModelError(string.Empty, "Invalid calculation");
            return Page();
        }
    }
}
```

## Routing

### Convention-Based Routing

**Default**: `/Pages/Index.cshtml` → `/` or `/Index`
**Subdirectory**: `/Pages/Admin/Dashboard.cshtml` → `/Admin/Dashboard`

### Custom Routes

```csharp
@page "/custom-route"
@page "/calc/{operation}"
```

### Route Parameters

```csharp
// In .cshtml
@page "{id:int}"

// In .cshtml.cs
public class DetailsModel : PageModel
{
    public void OnGet(int id)
    {
        // Use id parameter
    }
}
```

## Model Binding

### BindProperty Attribute

```csharp
public class CalculatorModel : PageModel
{
    // Binds on POST only (default)
    [BindProperty]
    public string Expression { get; set; } = string.Empty;

    // Binds on GET and POST
    [BindProperty(SupportsGet = true)]
    public string? Mode { get; set; }
}
```

### Complex Type Binding

```csharp
public class InputModel
{
    [Required]
    [StringLength(100)]
    public string Expression { get; set; } = string.Empty;

    [Range(0, 10)]
    public int Precision { get; set; }
}

public class CalculatorModel : PageModel
{
    [BindProperty]
    public InputModel Input { get; set; } = new();
}
```

## Validation

### Data Annotations

```csharp
using System.ComponentModel.DataAnnotations;

public class CalculationRequest
{
    [Required(ErrorMessage = "Expression is required")]
    [StringLength(500, ErrorMessage = "Expression too long")]
    public string Expression { get; set; } = string.Empty;

    [Range(0, 15, ErrorMessage = "Precision must be between 0 and 15")]
    public int Precision { get; set; } = 2;

    [RegularExpression(@"^[0-9+\-*/\(\)\s.]+$",
        ErrorMessage = "Invalid characters in expression")]
    public string? Formula { get; set; }
}
```

### Server-Side Validation

```csharp
public async Task<IActionResult> OnPostAsync()
{
    // Check ModelState
    if (!ModelState.IsValid)
    {
        return Page();
    }

    // Custom validation
    if (Expression.Length > 1000)
    {
        ModelState.AddModelError(nameof(Expression), "Expression is too long");
        return Page();
    }

    // Process valid request
    Result = await _calculatorService.EvaluateAsync(Expression);
    return Page();
}
```

### Client-Side Validation

```cshtml
@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}

<form method="post">
    <input asp-for="Expression" class="form-control" />
    <span asp-validation-for="Expression" class="text-danger"></span>
    <button type="submit">Calculate</button>
</form>
```

## Tag Helpers

### Common Tag Helpers

```cshtml
<!-- Form tag helper -->
<form asp-page="./Index" method="post">
    <!-- Input tag helper -->
    <input asp-for="Expression" class="form-control" />

    <!-- Validation message -->
    <span asp-validation-for="Expression" class="text-danger"></span>

    <!-- Validation summary -->
    <div asp-validation-summary="All" class="text-danger"></div>

    <button type="submit">Submit</button>
</form>

<!-- Link tag helper -->
<a asp-page="./Privacy">Privacy Policy</a>
<a asp-page="./Details" asp-route-id="123">View Details</a>

<!-- Environment tag helper -->
<environment include="Development">
    <link rel="stylesheet" href="~/css/site.css" />
</environment>
<environment exclude="Development">
    <link rel="stylesheet" href="~/css/site.min.css" />
</environment>
```

### Custom Tag Helpers

```csharp
[HtmlTargetElement("calculator-display")]
public class CalculatorDisplayTagHelper : TagHelper
{
    public decimal? Value { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.Attributes.SetAttribute("class", "calculator-result");
        output.Content.SetContent(Value?.ToString("N2") ?? "0.00");
    }
}

// Usage in .cshtml
<calculator-display value="@Model.Result" />
```

## Layouts and Partials

### \_Layout.cshtml

```cshtml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Calculator</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm">
            <a class="navbar-brand" asp-page="/Index">Calculator</a>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### \_ViewImports.cshtml

```cshtml
@using web_calculator
@using web_calculator.Pages
@namespace web_calculator.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

### \_ViewStart.cshtml

```cshtml
@{
    Layout = "_Layout";
}
```

### Partial Views

```cshtml
<!-- Define partial -->
<!-- _CalculatorButtons.cshtml -->
<div class="button-grid">
    <button onclick="appendNumber('1')">1</button>
    <button onclick="appendNumber('2')">2</button>
    <!-- More buttons -->
</div>

<!-- Use partial -->
<partial name="_CalculatorButtons" />
<!-- OR -->
@await Html.PartialAsync("_CalculatorButtons")
```

## Static Files

### Configuration

```csharp
// Modern approach with static assets
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();
```

### File Structure

```
wwwroot/
├── css/
│   └── site.css
├── js/
│   └── site.js
├── lib/
│   ├── bootstrap/
│   ├── jquery/
│   └── jquery-validation/
└── favicon.ico
```

### Usage in Pages

```cshtml
<!-- With cache busting -->
<link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
<script src="~/js/site.js" asp-append-version="true"></script>

<!-- From libraries -->
<link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
<script src="~/lib/jquery/dist/jquery.min.js"></script>
```

## Middleware Pipeline

### Order Matters

```csharp
var app = builder.Build();

// 1. Exception handling (must be early)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// 2. HTTPS redirection
app.UseHttpsRedirection();

// 3. Static files
app.MapStaticAssets();

// 4. Routing
app.UseRouting();

// 5. Authentication (if used)
app.UseAuthentication();

// 6. Authorization
app.UseAuthorization();

// 7. Endpoints
app.MapRazorPages().WithStaticAssets();

app.Run();
```

### Custom Middleware

```csharp
// Inline middleware
app.Use(async (context, next) =>
{
    // Before
    await next();
    // After
});

// Middleware class
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Request: {Method} {Path}",
            context.Request.Method, context.Request.Path);

        await _next(context);

        _logger.LogInformation("Response: {StatusCode}",
            context.Response.StatusCode);
    }
}

// Register
app.UseMiddleware<RequestLoggingMiddleware>();
```

## Error Handling

### Global Error Page

**Error.cshtml**:

```cshtml
@page
@model ErrorModel
@{
    ViewData["Title"] = "Error";
}

<h1 class="text-danger">Error.</h1>
<h2 class="text-danger">An error occurred while processing your request.</h2>

@if (Model.ShowRequestId)
{
    <p>
        <strong>Request ID:</strong> <code>@Model.RequestId</code>
    </p>
}
```

**Error.cshtml.cs**:

```csharp
public class ErrorModel : PageModel
{
    public string? RequestId { get; set; }
    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

    private readonly ILogger<ErrorModel> _logger;

    public ErrorModel(ILogger<ErrorModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
        RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
    }
}
```

### Page-Level Error Handling

```csharp
public class IndexModel : PageModel
{
    public async Task<IActionResult> OnPostAsync()
    {
        try
        {
            // Operation
            return RedirectToPage("./Success");
        }
        catch (ValidationException ex)
        {
            ModelState.AddModelError(string.Empty, ex.Message);
            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error");
            return RedirectToPage("./Error");
        }
    }
}
```

## Handler Methods

### Naming Convention

- `OnGet` - Handle GET requests
- `OnPost` - Handle POST requests
- `OnGetAsync` - Async GET
- `OnPostAsync` - Async POST

### Multiple Handlers

```csharp
public class CalculatorModel : PageModel
{
    public void OnGet() { }

    // Handle: <button asp-page-handler="Add">Add</button>
    public async Task<IActionResult> OnPostAddAsync()
    {
        // Handle addition
    }

    // Handle: <button asp-page-handler="Subtract">Subtract</button>
    public async Task<IActionResult> OnPostSubtractAsync()
    {
        // Handle subtraction
    }
}
```

## AJAX and Razor Pages

### Returning JSON

```csharp
public class CalculatorModel : PageModel
{
    public async Task<IActionResult> OnGetCalculateAsync(string expression)
    {
        try
        {
            var result = await _calculator.EvaluateAsync(expression);
            return new JsonResult(new { success = true, result });
        }
        catch (Exception ex)
        {
            return new JsonResult(new { success = false, error = ex.Message });
        }
    }
}
```

### JavaScript Integration

```javascript
async function calculate() {
  const expression = document.getElementById("expression").value;

  const response = await fetch(
    `/Index?handler=Calculate&expression=${encodeURIComponent(expression)}`,
  );
  const data = await response.json();

  if (data.success) {
    document.getElementById("result").textContent = data.result;
  } else {
    alert(data.error);
  }
}
```

## Security Best Practices

### Anti-Forgery Tokens

**Automatic** on forms:

```cshtml
<form method="post">
    @* Anti-forgery token automatically included *@
    <button type="submit">Submit</button>
</form>
```

**For AJAX**:

```cshtml
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Antiforgery

<script>
    const token = '@Antiforgery.GetAndStoreTokens(HttpContext).RequestToken';

    fetch('/api/calculate', {
        method: 'POST',
        headers: {
            'RequestVerificationToken': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression: '1+1' })
    });
</script>
```

### Input Sanitization

```csharp
using System.Web;

public string SanitizeInput(string input)
{
    return HttpUtility.HtmlEncode(input);
}
```

### HTTPS Enforcement

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.UseHsts();
}
```

## Performance Optimization

### Response Caching

```csharp
builder.Services.AddResponseCaching();
app.UseResponseCaching();

// In page model
[ResponseCache(Duration = 60)]
public class IndexModel : PageModel { }
```

### Output Caching (.NET 9)

```csharp
builder.Services.AddOutputCache();
app.UseOutputCache();

// In page model
[OutputCache(Duration = 60)]
public class IndexModel : PageModel { }
```

### Compression

```csharp
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

app.UseResponseCompression();
```

## Testing Razor Pages

### Integration Tests

```csharp
public class IndexPageTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public IndexPageTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Get_ReturnsSuccessAndCorrectContentType()
    {
        // Arrange & Act
        var response = await _client.GetAsync("/Index");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal("text/html; charset=utf-8",
            response.Content.Headers.ContentType?.ToString());
    }

    [Fact]
    public async Task Post_ValidData_ReturnsSuccessAndResult()
    {
        // Arrange
        var formData = new Dictionary<string, string>
        {
            { "Expression", "2+2" }
        };
        var content = new FormUrlEncodedContent(formData);

        // Act
        var response = await _client.PostAsync("/Index", content);

        // Assert
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        Assert.Contains("4", responseString);
    }
}
```

## Common Patterns

### PRG Pattern (Post-Redirect-Get)

```csharp
public async Task<IActionResult> OnPostAsync()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    await _service.ProcessAsync(Input);

    // Redirect to prevent duplicate form submissions
    return RedirectToPage("./Success");
}
```

### TempData for Messages

```csharp
public async Task<IActionResult> OnPostAsync()
{
    await _service.SaveAsync(Input);

    TempData["Message"] = "Saved successfully!";
    return RedirectToPage("./Index");
}

// In target page
@if (TempData["Message"] != null)
{
    <div class="alert alert-success">
        @TempData["Message"]
    </div>
}
```

## Resources

- [ASP.NET Core Razor Pages Documentation](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/)
- [Tag Helpers](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/intro)
- [Model Validation](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation)
- [Security Best Practices](https://docs.microsoft.com/en-us/aspnet/core/security/)

## Compliance Checklist

- [ ] Proper page structure (`.cshtml` + `.cshtml.cs`)
- [ ] Dependency injection used for services
- [ ] Model validation implemented
- [ ] Error handling configured
- [ ] Anti-forgery tokens enabled for forms
- [ ] HTTPS enforced in production
- [ ] Input sanitization implemented
- [ ] TempData used for cross-page messages
- [ ] PRG pattern applied where appropriate
- [ ] Async/await used for I/O operations
