using Microsoft.AspNetCore.Mvc;
using CalculatorApi.Models;
using CalculatorApi.Services;

namespace CalculatorApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalculatorController : ControllerBase
{
    private readonly ICalculatorService _calculatorService;
    private readonly ILogger<CalculatorController> _logger;

    public CalculatorController(ICalculatorService calculatorService, ILogger<CalculatorController> logger)
    {
        _calculatorService = calculatorService;
        _logger = logger;
    }

    [HttpPost("calculate")]
    public ActionResult<CalculationResponse> Calculate([FromBody] CalculationRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Operation))
            {
                return BadRequest(new CalculationResponse
                {
                    Success = false,
                    Error = "Operation is required"
                });
            }

            decimal result;
            string operatorSymbol;

            switch (request.Operation.ToLower())
            {
                case "add":
                    result = _calculatorService.Add(request.Operand1, request.Operand2);
                    operatorSymbol = "+";
                    break;
                case "subtract":
                    result = _calculatorService.Subtract(request.Operand1, request.Operand2);
                    operatorSymbol = "-";
                    break;
                case "multiply":
                    result = _calculatorService.Multiply(request.Operand1, request.Operand2);
                    operatorSymbol = "×";
                    break;
                case "divide":
                    result = _calculatorService.Divide(request.Operand1, request.Operand2);
                    operatorSymbol = "÷";
                    break;
                default:
                    return BadRequest(new CalculationResponse
                    {
                        Success = false,
                        Error = $"Invalid operation: {request.Operation}"
                    });
            }

            var response = new CalculationResponse
            {
                Result = result,
                Expression = $"{request.Operand1} {operatorSymbol} {request.Operand2}",
                Success = true,
                Error = null
            };

            _logger.LogInformation("Calculation performed: {Expression} = {Result}", response.Expression, result);

            return Ok(response);
        }
        catch (DivideByZeroException ex)
        {
            _logger.LogWarning("Division by zero attempted");
            return BadRequest(new CalculationResponse
            {
                Result = 0,
                Expression = $"{request.Operand1} ÷ {request.Operand2}",
                Success = false,
                Error = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error performing calculation");
            return StatusCode(500, new CalculationResponse
            {
                Success = false,
                Error = "An error occurred while performing the calculation"
            });
        }
    }

    [HttpPost("scientific")]
    public ActionResult<CalculationResponse> Scientific([FromBody] ScientificRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Operation))
            {
                return BadRequest(new CalculationResponse
                {
                    Success = false,
                    Error = "Operation is required"
                });
            }

            decimal result;
            string expression;

            switch (request.Operation.ToLower())
            {
                case "sin":
                    result = _calculatorService.Sin(request.Value);
                    expression = $"sin({request.Value})";
                    break;
                case "cos":
                    result = _calculatorService.Cos(request.Value);
                    expression = $"cos({request.Value})";
                    break;
                case "tan":
                    result = _calculatorService.Tan(request.Value);
                    expression = $"tan({request.Value})";
                    break;
                case "log":
                    result = _calculatorService.Log(request.Value);
                    expression = $"log({request.Value})";
                    break;
                case "ln":
                    result = _calculatorService.Ln(request.Value);
                    expression = $"ln({request.Value})";
                    break;
                case "sqrt":
                    result = _calculatorService.Sqrt(request.Value);
                    expression = $"√{request.Value}";
                    break;
                case "factorial":
                    result = _calculatorService.Factorial(request.Value);
                    expression = $"{request.Value}!";
                    break;
                case "percent":
                    result = _calculatorService.Percent(request.Value);
                    expression = $"{request.Value}%";
                    break;
                case "power":
                    if (!request.SecondValue.HasValue)
                    {
                        return BadRequest(new CalculationResponse
                        {
                            Success = false,
                            Error = "Second value required for power operation"
                        });
                    }
                    result = _calculatorService.Power(request.Value, request.SecondValue.Value);
                    expression = $"{request.Value}^{request.SecondValue.Value}";
                    break;
                case "abs":
                    result = _calculatorService.Abs(request.Value);
                    expression = $"|{request.Value}|";
                    break;
                case "reciprocal":
                    result = _calculatorService.Reciprocal(request.Value);
                    expression = $"1/{request.Value}";
                    break;
                case "negate":
                    result = _calculatorService.Negate(request.Value);
                    expression = $"-({request.Value})";
                    break;
                case "mod":
                    if (!request.SecondValue.HasValue)
                    {
                        return BadRequest(new CalculationResponse
                        {
                            Success = false,
                            Error = "Second value required for modulo operation"
                        });
                    }
                    result = _calculatorService.Mod(request.Value, request.SecondValue.Value);
                    expression = $"{request.Value} mod {request.SecondValue.Value}";
                    break;
                case "poweroften":
                    result = _calculatorService.PowerOfTen(request.Value);
                    expression = $"10^{request.Value}";
                    break;
                case "exp":
                    result = _calculatorService.Exp(request.Value);
                    expression = $"e^{request.Value}";
                    break;
                default:
                    return BadRequest(new CalculationResponse
                    {
                        Success = false,
                        Error = $"Invalid scientific operation: {request.Operation}"
                    });
            }

            var response = new CalculationResponse
            {
                Result = result,
                Expression = expression,
                Success = true,
                Error = null
            };

            _logger.LogInformation("Scientific calculation performed: {Expression} = {Result}", expression, result);

            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("Invalid scientific operation: {Message}", ex.Message);
            return BadRequest(new CalculationResponse
            {
                Success = false,
                Error = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error performing scientific calculation");
            return StatusCode(500, new CalculationResponse
            {
                Success = false,
                Error = "An error occurred while performing the scientific calculation"
            });
        }
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}
