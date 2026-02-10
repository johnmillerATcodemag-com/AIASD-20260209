namespace CalculatorApi.Services;

public interface ICalculatorService
{
    decimal Add(decimal a, decimal b);
    decimal Subtract(decimal a, decimal b);
    decimal Multiply(decimal a, decimal b);
    decimal Divide(decimal a, decimal b);
    
    // Scientific operations
    decimal Sin(decimal angle);
    decimal Cos(decimal angle);
    decimal Tan(decimal angle);
    decimal Log(decimal value);
    decimal Ln(decimal value);
    decimal Sqrt(decimal value);
    decimal Power(decimal baseValue, decimal exponent);
    decimal Factorial(decimal n);
    decimal Percent(decimal value);
    
    // Additional scientific operations
    decimal Abs(decimal value);
    decimal Reciprocal(decimal value);
    decimal Negate(decimal value);
    decimal Mod(decimal a, decimal b);
    decimal PowerOfTen(decimal exponent);
    decimal Exp(decimal exponent);
}
