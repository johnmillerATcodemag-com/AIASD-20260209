using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web_calculator.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    [BindProperty]
    public string? Expression { get; set; }
    public string? Result { get; set; }
    public string? ErrorMessage { get; set; }

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
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
            return;
        }
        if (string.IsNullOrWhiteSpace(Expression))
        {
            ErrorMessage = "Please enter an expression.";
            Result = null;
            return;
        }
        try
        {
            var table = new System.Data.DataTable();
            var value = table.Compute(Expression, string.Empty);
            Result = value.ToString();
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Error: {ex.Message}";
        }
    }
}
