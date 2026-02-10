using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;

namespace BookLibrary
{
    public class LibraryMetrics
    {
        private readonly Counter<long> _operationsCounter;
        private readonly Counter<long> _errorsCounter;
        private readonly Histogram<double> _requestDuration;

        public LibraryMetrics(IMeterFactory meterFactory)
        {
            var meter = meterFactory.Create("BookLibrary");
            
            _operationsCounter = meter.CreateCounter<long>(
                "library.operations.count",
                description: "Total number of library operations");
                
            _errorsCounter = meter.CreateCounter<long>(
                "library.errors.count",
                description: "Total number of errors");
                
            _requestDuration = meter.CreateHistogram<double>(
                "library.request.duration",
                unit: "ms",
                description: "Duration of library requests");
        }

        public void RecordOperation(string operationType)
        {
            _operationsCounter.Add(1, new KeyValuePair<string, object>("operation.type", operationType));
        }

        public void RecordError(string operationType, string errorType)
        {
            _errorsCounter.Add(1, 
                new KeyValuePair<string, object>("operation.type", operationType),
                new KeyValuePair<string, object>("error.type", errorType));
        }

        public void RecordDuration(string operationType, double durationMs)
        {
            _requestDuration.Record(durationMs, 
                new KeyValuePair<string, object>("operation.type", operationType));
        }
    }
}
