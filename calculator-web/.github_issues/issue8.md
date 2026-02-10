**Problem:**
Error messages expose internal implementation details to end users:
- Exception stack traces may be visible
- Exception messages like "Unable to evaluate expression: {ex.Message}" expose system details
- No user-friendly error messages
- No error codes for support/debugging

**Current Behavior:**
In IndexModel.OnPost():
```csharp
catch (Exception ex)
{
    ErrorMessage = $"Error: {ex.Message}";
}
```

This exposes internal exception messages that may contain:
- Stack traces
- System paths
- Internal method names
- Implementation details

**Impact:**
- Security information disclosure
- Poor user experience
- Difficult to provide support (no error codes)
- May reveal attack surface to malicious users

**Recommendation:**
1. Create user-friendly error messages:
   - "Invalid expression. Please check your input."
   - "The expression is too complex to calculate."
   - "Cannot divide by zero."

2. Log detailed errors server-side for debugging:
   ```csharp
   catch (InvalidOperationException ex)
   {
       _logger.LogError(ex, "Failed to evaluate expression: {Expression}", Expression);
       ErrorMessage = "Unable to calculate. Please check your expression.";
   }
   ```

3. Add error codes for support:
   - ErrorMessage = "Calculation error (Code: CALC-001)"

4. Create custom exception types for different error scenarios

5. Never expose:
   - Stack traces to users
   - System paths
   - Internal implementation details

**Severity:** High (Security + User Experience)
