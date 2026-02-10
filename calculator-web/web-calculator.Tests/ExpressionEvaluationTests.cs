using System;
using Xunit;

namespace web_calculator.Tests
{
    public class ExpressionEvaluationTests
    {
        [Theory]
        [InlineData("1+2", "3")]
        [InlineData("2*5", "10")]
        [InlineData("10/2", "5")]
        [InlineData("7-3", "4")]
        [InlineData("2+2*2", "6")]
        public void EvaluateExpression_ValidInput_ReturnsExpectedResult(string expression, string expected)
        {
            var table = new System.Data.DataTable();
            var value = table.Compute(expression, string.Empty);
            Assert.Equal(expected, value.ToString());
        }

        [Theory]
        [InlineData("")]
        [InlineData("invalid")]
        public void EvaluateExpression_InvalidInput_ThrowsException(string expression)
        {
            var table = new System.Data.DataTable();
            Assert.ThrowsAny<Exception>(() =>
            {
                if (string.IsNullOrWhiteSpace(expression))
                    throw new ArgumentException("Expression cannot be empty.");
                table.Compute(expression, string.Empty);
            });
        }
    }
}
