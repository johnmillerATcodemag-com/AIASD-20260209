**Problem:**
HttpsRedirection is only enabled in non-development environments, and there's inconsistent configuration:

- In Program.cs: `app.UseHttpsRedirection()` only runs when `!app.Environment.IsDevelopment()`
- HSTS is configured but HTTPS redirection logic is mixed
- No configuration option to control this behavior
- Development environment may not match production behavior

**Current Code (Program.cs):**

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}
```

**Issues:**

1. HTTPS redirection should be separate from error handling logic
2. No way to test HTTPS redirection locally
3. Development and production environments behave differently
4. No configuration option in appsettings.json

**Impact:**

- Development environment doesn't match production
- Harder to test HTTPS-specific issues
- Mixed concerns in configuration
- Potential security issues if HTTPS is accidentally disabled

**Recommendation:**

1. Move HTTPS redirection configuration to appsettings:

   ```json
   "HttpsRedirection": {
     "Enabled": true,
     "HttpsPort": 443
   }
   ```

2. Separate concerns in Program.cs:

   ```csharp
   // Error handling
   if (!app.Environment.IsDevelopment())
   {
       app.UseExceptionHandler("/Error");
   }

   // Security (should be consistent across environments)
   if (builder.Configuration.GetValue<bool>("HttpsRedirection:Enabled", true))
   {
       app.UseHttpsRedirection();
   }

   if (!app.Environment.IsDevelopment())
   {
       app.UseHsts();
   }
   ```

3. Consider enabling HTTPS in development with local certificates
4. Document why certain middleware is environment-specific

**Severity:** Medium (Configuration + Security)
