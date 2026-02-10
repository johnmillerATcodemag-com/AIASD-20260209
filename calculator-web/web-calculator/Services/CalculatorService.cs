using System.Data;

namespace web_calculator.Services;

/// <summary>
/// Provides calculator functionality for evaluating mathematical expressions.
/// </summary>
/// <remarks>
/// This service uses System.Data.DataTable.Compute for expression evaluation,
/// supporting basic arithmetic operations (+, -, *, /) and parentheses.
/// All operations are logged for auditing and debugging purposes.
/// </remarks>
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;

    /// <summary>
    /// Initializes a new instance of the <see cref="CalculatorService"/> class.
    /// </summary>
    /// <param name="logger">The logger instance for operation tracking.</param>
    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Evaluates a mathematical expression and returns the result.
    /// </summary>
    /// <param name="expression">The mathematical expression to evaluate (e.g., "2+2", "10*5", "(3+7)/2").</param>
    /// <returns>The result of the calculation as a string representation.</returns>
    /// <exception cref="ArgumentException">Thrown when the expression is null, empty, or contains only whitespace.</exception>
    /// <exception cref="InvalidOperationException">Thrown when the expression cannot be evaluated due to syntax errors or unsupported operations.</exception>
    /// <remarks>
    /// Supported operations include:
    /// <list type="bullet">
    /// <item><description>Addition (+)</description></item>
    /// <item><description>Subtraction (-)</description></item>
    /// <item><description>Multiplication (*)</description></item>
    /// <item><description>Division (/)</description></item>
    /// <item><description>Parentheses for grouping</description></item>
    /// </list>
    /// </remarks>
    /// <example>
    /// <code>
    /// var service = new CalculatorService(logger);
    /// var result = service.EvaluateExpression("2+2"); // Returns "4"
    /// var result2 = service.EvaluateExpression("(10+5)*2"); // Returns "30"
    /// </code>
    /// </example>
    public string EvaluateExpression(string expression)
    {
        if (string.IsNullOrWhiteSpace(expression))
        {
            _logger.LogWarning("Attempted to evaluate null or empty expression");
            throw new ArgumentException("Expression cannot be null or whitespace.", nameof(expression));
        }

        try
        {
            _logger.LogInformation("Evaluating expression: {Expression}", expression);

            var table = new DataTable();
            var value = table.Compute(expression, string.Empty);
            var result = value.ToString() ?? "0";

            _logger.LogInformation("Successfully evaluated expression: {Expression} = {Result}", expression, result);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error evaluating expression: {Expression}", expression);
            throw new InvalidOperationException($"Unable to evaluate expression: {ex.Message}", ex);
        }
    }
}
