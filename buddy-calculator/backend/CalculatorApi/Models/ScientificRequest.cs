namespace CalculatorApi.Models;

public class ScientificRequest
{
    public decimal Value { get; set; }
    public decimal? SecondValue { get; set; }
    public string Operation { get; set; } = string.Empty;
}
