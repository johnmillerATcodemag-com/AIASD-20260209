using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace BookLibrary
{
    public class LibraryHealthCheck : IHealthCheck
    {
        private readonly Library _library;

        public LibraryHealthCheck(Library library)
        {
            _library = library;
        }

        public Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context,
            CancellationToken cancellationToken = default)
        {
            if (_library != null && _library.GetTotalBookCount() > 0)
            {
                return Task.FromResult(
                    HealthCheckResult.Healthy("Library is operational with books available."));
            }

            return Task.FromResult(
                HealthCheckResult.Degraded("Library is operational but no books are loaded."));
        }
    }
}
