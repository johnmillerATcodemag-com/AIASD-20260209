namespace CalculatorApi.Services;

public class CalculatorService : ICalculatorService
{
    public decimal Add(decimal a, decimal b)
    {
        return a + b;
    }

    public decimal Subtract(decimal a, decimal b)
    {
        return a - b;
    }

    public decimal Multiply(decimal a, decimal b)
    {
        return a * b;
    }

    public decimal Divide(decimal a, decimal b)
    {
        if (b == 0)
        {
            throw new DivideByZeroException("Division by zero is not allowed");
        }
        return a / b;
    }

    // Scientific operations
    public decimal Sin(decimal angle)
    {
        return (decimal)Math.Sin((double)angle);
    }

    public decimal Cos(decimal angle)
    {
        return (decimal)Math.Cos((double)angle);
    }

    public decimal Tan(decimal angle)
    {
        return (decimal)Math.Tan((double)angle);
    }

    public decimal Log(decimal value)
    {
        if (value <= 0)
        {
            throw new ArgumentException("Logarithm of non-positive number is undefined");
        }
        return (decimal)Math.Log10((double)value);
    }

    public decimal Ln(decimal value)
    {
        if (value <= 0)
        {
            throw new ArgumentException("Natural logarithm of non-positive number is undefined");
        }
        return (decimal)Math.Log((double)value);
    }

    public decimal Sqrt(decimal value)
    {
        if (value < 0)
        {
            throw new ArgumentException("Square root of negative number is undefined");
        }
        return (decimal)Math.Sqrt((double)value);
    }

    public decimal Power(decimal baseValue, decimal exponent)
    {
        return (decimal)Math.Pow((double)baseValue, (double)exponent);
    }

    public decimal Factorial(decimal n)
    {
        if (n < 0 || n != Math.Floor(n))
        {
            throw new ArgumentException("Factorial is only defined for non-negative integers");
        }
        
        if (n > 20)
        {
            throw new ArgumentException("Factorial calculation exceeds maximum value");
        }

        decimal result = 1;
        for (int i = 2; i <= (int)n; i++)
        {
            result *= i;
        }
        return result;
    }

    public decimal Percent(decimal value)
    {
        return value / 100;
    }

    // Additional scientific operations
    public decimal Abs(decimal value)
    {
        return Math.Abs(value);
    }

    public decimal Reciprocal(decimal value)
    {
        if (value == 0)
        {
            throw new DivideByZeroException("Cannot calculate reciprocal of zero");
        }
        return 1 / value;
    }

    public decimal Negate(decimal value)
    {
        return -value;
    }

    public decimal Mod(decimal a, decimal b)
    {
        if (b == 0)
        {
            throw new DivideByZeroException("Modulo by zero is not allowed");
        }
        return a % b;
    }

    public decimal PowerOfTen(decimal exponent)
    {
        return (decimal)Math.Pow(10, (double)exponent);
    }

    public decimal Exp(decimal exponent)
    {
        return (decimal)Math.Exp((double)exponent);
    }
}
