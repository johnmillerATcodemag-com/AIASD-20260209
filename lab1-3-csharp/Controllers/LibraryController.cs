using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;

namespace BookLibrary.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly Library _library;
        private readonly ILogger<LibraryController> _logger;
        private readonly LibraryMetrics _metrics;
        private static readonly ActivitySource ActivitySource = new ActivitySource("BookLibrary");

        public LibraryController(Library library, ILogger<LibraryController> logger, LibraryMetrics metrics)
        {
            _library = library;
            _logger = logger;
            _metrics = metrics;
        }

        [HttpGet("books")]
        public IActionResult GetAllBooks()
        {
            using var activity = ActivitySource.StartActivity("GetAllBooks");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                _logger.LogInformation("Getting all books. CorrelationId: {CorrelationId}", correlationId);
                _metrics.RecordOperation("GetAllBooks");
                
                var books = _library.GetAllBooks();
                
                _logger.LogInformation("Retrieved {Count} books. CorrelationId: {CorrelationId}", books.Count, correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("GetAllBooks", duration);
                
                return Ok(new { Books = books, Count = books.Count, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                _metrics.RecordError("GetAllBooks", ex.GetType().Name);
                _logger.LogError(ex, "Error getting all books. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpGet("books/search")]
        public IActionResult SearchBooks([FromQuery] string term)
        {
            using var activity = ActivitySource.StartActivity("SearchBooks");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                if (string.IsNullOrWhiteSpace(term))
                {
                    return BadRequest(new { Error = "Search term is required", CorrelationId = correlationId });
                }

                _logger.LogInformation("Searching books with term: {Term}. CorrelationId: {CorrelationId}", term, correlationId);
                _metrics.RecordOperation("SearchBooks");
                
                var books = _library.SearchBooks(term);
                
                _logger.LogInformation("Found {Count} books matching '{Term}'. CorrelationId: {CorrelationId}", 
                    books.Count, term, correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("SearchBooks", duration);
                
                return Ok(new { Books = books, Count = books.Count, SearchTerm = term, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                _metrics.RecordError("SearchBooks", ex.GetType().Name);
                _logger.LogError(ex, "Error searching books. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books")]
        public IActionResult AddBook([FromBody] BookDto bookDto)
        {
            using var activity = ActivitySource.StartActivity("AddBook");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                if (bookDto == null)
                {
                    return BadRequest(new { Error = "Book data is required", CorrelationId = correlationId });
                }

                _logger.LogInformation("Adding new book: {Title}. CorrelationId: {CorrelationId}", 
                    bookDto.Title, correlationId);
                _metrics.RecordOperation("AddBook");
                
                var book = new Book(bookDto.Title, bookDto.Author, bookDto.ISBN, bookDto.PublicationYear);
                _library.AddBook(book);
                
                _logger.LogInformation("Successfully added book: {Title}. CorrelationId: {CorrelationId}", 
                    bookDto.Title, correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("AddBook", duration);
                
                return CreatedAtAction(nameof(GetAllBooks), new { CorrelationId = correlationId }, book);
            }
            catch (Exception ex)
            {
                _metrics.RecordError("AddBook", ex.GetType().Name);
                _logger.LogError(ex, "Error adding book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books/{isbn}/checkout")]
        public IActionResult CheckOutBook(string isbn)
        {
            using var activity = ActivitySource.StartActivity("CheckOutBook");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                _logger.LogInformation("Checking out book with ISBN: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                _metrics.RecordOperation("CheckOutBook");
                
                _library.CheckOutBook(isbn);
                
                _logger.LogInformation("Successfully checked out book: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("CheckOutBook", duration);
                
                return Ok(new { Message = "Book checked out successfully", ISBN = isbn, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                _metrics.RecordError("CheckOutBook", ex.GetType().Name);
                _logger.LogError(ex, "Error checking out book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books/{isbn}/return")]
        public IActionResult ReturnBook(string isbn)
        {
            using var activity = ActivitySource.StartActivity("ReturnBook");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                _logger.LogInformation("Returning book with ISBN: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                _metrics.RecordOperation("ReturnBook");
                
                _library.ReturnBook(isbn);
                
                _logger.LogInformation("Successfully returned book: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("ReturnBook", duration);
                
                return Ok(new { Message = "Book returned successfully", ISBN = isbn, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                _metrics.RecordError("ReturnBook", ex.GetType().Name);
                _logger.LogError(ex, "Error returning book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpGet("stats")]
        public IActionResult GetStatistics()
        {
            using var activity = ActivitySource.StartActivity("GetStatistics");
            var correlationId = HttpContext.TraceIdentifier;
            var startTime = DateTime.UtcNow;
            
            try
            {
                _logger.LogInformation("Getting library statistics. CorrelationId: {CorrelationId}", correlationId);
                _metrics.RecordOperation("GetStatistics");
                
                var stats = new
                {
                    TotalBooks = _library.GetTotalBookCount(),
                    AvailableBooks = _library.GetAvailableBookCount(),
                    CheckedOutBooks = _library.GetTotalBookCount() - _library.GetAvailableBookCount(),
                    CorrelationId = correlationId
                };
                
                _logger.LogInformation("Retrieved library statistics. CorrelationId: {CorrelationId}", correlationId);
                
                var duration = (DateTime.UtcNow - startTime).TotalMilliseconds;
                _metrics.RecordDuration("GetStatistics", duration);
                
                return Ok(stats);
            }
            catch (Exception ex)
            {
                _metrics.RecordError("GetStatistics", ex.GetType().Name);
                _logger.LogError(ex, "Error getting statistics. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }
    }

    public class BookDto
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public int PublicationYear { get; set; }
    }
}
