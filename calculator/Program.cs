// See https://aka.ms/new-console-template for more information

Console.WriteLine("Welcome to the Calculator!");
Console.WriteLine("Type 'exit' to quit.");
while (true)
{
    Console.Write("Please enter a mathematical expression: ");
    string expression = Console.ReadLine();
    if (expression == null || expression.Trim().ToLower() == "exit")
        break;
    try
    {
        var result = EvaluateExpression(expression);
        Console.WriteLine($"Result: {result}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error evaluating expression: {ex.Message}");
    }
}

static double EvaluateExpression(string expr)
{
    // Simple evaluation using DataTable.Compute
    // Note: This is not recommended for production, but works for basic math
    var table = new System.Data.DataTable();
    object value = table.Compute(expr, string.Empty);
    return Convert.ToDouble(value);
}
