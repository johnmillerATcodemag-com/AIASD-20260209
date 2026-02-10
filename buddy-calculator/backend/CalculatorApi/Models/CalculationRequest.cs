namespace CalculatorApi.Models;

public class CalculationRequest
{
    public decimal Operand1 { get; set; }
    public decimal Operand2 { get; set; }
    public string Operation { get; set; } = string.Empty;
}
