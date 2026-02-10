namespace CalculatorApi.Models;

public class CalculationResponse
{
    public decimal Result { get; set; }
    public string Expression { get; set; } = string.Empty;
    public bool Success { get; set; }
    public string? Error { get; set; }
}
