# AI Conversation Log

- Chat ID: razor-kestrel-instructions-20260210
- Operator: assistant
- Model: anthropic/claude-3.5-sonnet@2024-10-22
- Started: 2026-02-10T18:00:00Z
- Ended: 2026-02-10T18:30:00Z
- Total Duration: 00:30:00

## Context

- Inputs: User request for Razor Pages and Kestrel standards and practices
- Targets: `.github/instructions/razor-pages-kestrel.instructions.md`
- Constraints/Policies:
  - `.github/instructions/ai-assisted-output.instructions.md`
  - `.github/instructions/evergreen-development.instructions.md`

## Exchanges

### Exchange 1

[2026-02-10T18:00:00Z] user

```text
create an instruction containing the standards and practices for these technologies
Web Framework

Razor Pages - Page-based programming model for UI
Kestrel - Cross-platform web server (implied by ASP.NET Core)
```

[2026-02-10T18:05:00Z] anthropic/claude-3.5-sonnet@2024-10-22

```text
I'll create a comprehensive instruction file for Razor Pages and Kestrel standards and practices.
This will cover:

1. Razor Pages Architecture
   - File organization
   - PageModel patterns
   - View best practices
   - Layout and partials
   - View components
   - Routing and navigation

2. Security Best Practices
   - Anti-forgery protection
   - Input sanitization
   - Authentication and authorization
   - HTTPS and security headers

3. Kestrel Web Server Configuration
   - Basic setup
   - Production configuration
   - HTTPS and certificates
   - Request limits and timeouts
   - HTTP/2 and HTTP/3
   - Logging and diagnostics
   - Reverse proxy configuration
   - Load balancing

4. Performance Optimization
   - Response caching
   - Response compression
   - Static file optimization
   - Database query optimization
   - Asynchronous operations

5. Testing Strategies
   - Unit testing page models
   - Integration testing
   - End-to-end testing

6. Error Handling and Logging
   - Global error handling
   - Structured logging

7. Common Patterns and Anti-Patterns
   - Recommended patterns
   - Anti-patterns to avoid

8. Deployment Considerations
   - Publishing configuration
   - Docker deployment
   - Environment configuration
   - Monitoring and health checks

Creating the instruction file now...
```

### Exchange 2

[2026-02-10T18:05:00Z] anthropic/claude-3.5-sonnet@2024-10-22

```text
File created at: .github/instructions/razor-pages-kestrel.instructions.md

The instruction file includes:
- Comprehensive Razor Pages architecture and best practices
- Detailed Kestrel configuration examples
- Security best practices with code samples
- Performance optimization techniques
- Testing strategies for all levels
- Error handling and structured logging
- Common patterns and anti-patterns
- Deployment considerations

All code examples follow .NET 9 conventions and include both correct (✅)
and incorrect (❌) patterns for clarity.
```

## Work Burst Closure

**Artifacts Produced**:

- `.github/instructions/razor-pages-kestrel.instructions.md` - Comprehensive instruction file for Razor Pages and Kestrel standards
- `ai-logs/2026/02/10/razor-kestrel-instructions-20260210/conversation.md` - This conversation log
- `ai-logs/2026/02/10/razor-kestrel-instructions-20260210/summary.md` - Session summary

**Next Steps**:

- [ ] Review instruction file for completeness
- [ ] Update README.md with link to new instruction file
- [ ] Validate examples against current project
- [ ] Consider creating complementary instruction files for other technologies

**Duration Summary**:

- Requirements analysis: 00:05:00
- Content generation: 00:20:00
- Examples and formatting: 00:05:00
- Total: 00:30:00
