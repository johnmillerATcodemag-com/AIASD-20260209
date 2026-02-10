using System.Data;

namespace web_calculator.Services;

/// <summary>
/// Service for performing calculator operations
/// </summary>
public class CalculatorService : ICalculatorService
{
    private readonly ILogger<CalculatorService> _logger;

    public CalculatorService(ILogger<CalculatorService> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Evaluates a mathematical expression using System.Data.DataTable.Compute
    /// </summary>
    /// <param name="expression">The mathematical expression to evaluate</param>
    /// <returns>The result of the calculation as a string</returns>
    /// <exception cref="ArgumentException">Thrown when the expression is null or whitespace</exception>
    /// <exception cref="InvalidOperationException">Thrown when the expression cannot be evaluated</exception>
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
