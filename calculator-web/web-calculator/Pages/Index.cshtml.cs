using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using web_calculator.Services;

namespace web_calculator.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly ICalculatorService _calculatorService;

    [BindProperty]
    public string? Expression { get; set; }
    public string? Result { get; set; }
    public string? ErrorMessage { get; set; }
    public string? PreviousExpression { get; set; }

    public IndexModel(ILogger<IndexModel> logger, ICalculatorService calculatorService)
    {
        _logger = logger;
        _calculatorService = calculatorService;
    }

    public void OnGet()
    {
        // No-op
    }

    public void OnPost()
    {
        if (Request.Form["clear"] == "true")
        {
            Expression = string.Empty;
            Result = null;
            ErrorMessage = null;
            PreviousExpression = null;
            return;
        }
        if (string.IsNullOrWhiteSpace(Expression))
        {
            ErrorMessage = "Please enter an expression.";
            Result = null;
            PreviousExpression = null;
            return;
        }
        try
        {
            PreviousExpression = Expression;
            Result = _calculatorService.EvaluateExpression(Expression);
            Expression = Result;
            ErrorMessage = null;
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Error: {ex.Message}";
            Result = null;
            PreviousExpression = null;
        }
    }
}
