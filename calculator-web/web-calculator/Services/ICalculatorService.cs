namespace web_calculator.Services;

/// <summary>
/// Interface for calculator operations
/// </summary>
public interface ICalculatorService
{
    /// <summary>
    /// Evaluates a mathematical expression and returns the result
    /// </summary>
    /// <param name="expression">The mathematical expression to evaluate</param>
    /// <returns>The result of the calculation as a string</returns>
    /// <exception cref="InvalidOperationException">Thrown when the expression is invalid</exception>
    string EvaluateExpression(string expression);
}
