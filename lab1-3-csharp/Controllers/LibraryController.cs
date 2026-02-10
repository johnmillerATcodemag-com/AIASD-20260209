using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Threading;

namespace BookLibrary.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly Library _library;
        private readonly ILogger<LibraryController> _logger;
        private static readonly ActivitySource ActivitySource = new ActivitySource("BookLibrary");
        
        // Metrics counters
        private static int _totalOperations = 0;
        private static int _totalErrors = 0;

        public LibraryController(Library library, ILogger<LibraryController> logger)
        {
            _library = library;
            _logger = logger;
        }

        [HttpGet("books")]
        public IActionResult GetAllBooks()
        {
            using var activity = ActivitySource.StartActivity("GetAllBooks");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                _logger.LogInformation("Getting all books. CorrelationId: {CorrelationId}", correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                var books = _library.GetAllBooks();
                
                _logger.LogInformation("Retrieved {Count} books. CorrelationId: {CorrelationId}", books.Count, correlationId);
                return Ok(new { Books = books, Count = books.Count, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
                _logger.LogError(ex, "Error getting all books. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpGet("books/search")]
        public IActionResult SearchBooks([FromQuery] string term)
        {
            using var activity = ActivitySource.StartActivity("SearchBooks");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                if (string.IsNullOrWhiteSpace(term))
                {
                    return BadRequest(new { Error = "Search term is required", CorrelationId = correlationId });
                }

                _logger.LogInformation("Searching books with term: {Term}. CorrelationId: {CorrelationId}", term, correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                var books = _library.SearchBooks(term);
                
                _logger.LogInformation("Found {Count} books matching '{Term}'. CorrelationId: {CorrelationId}", 
                    books.Count, term, correlationId);
                return Ok(new { Books = books, Count = books.Count, SearchTerm = term, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
                _logger.LogError(ex, "Error searching books. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books")]
        public IActionResult AddBook([FromBody] BookDto bookDto)
        {
            using var activity = ActivitySource.StartActivity("AddBook");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                if (bookDto == null)
                {
                    return BadRequest(new { Error = "Book data is required", CorrelationId = correlationId });
                }

                _logger.LogInformation("Adding new book: {Title}. CorrelationId: {CorrelationId}", 
                    bookDto.Title, correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                var book = new Book(bookDto.Title, bookDto.Author, bookDto.ISBN, bookDto.PublicationYear);
                _library.AddBook(book);
                
                _logger.LogInformation("Successfully added book: {Title}. CorrelationId: {CorrelationId}", 
                    bookDto.Title, correlationId);
                return CreatedAtAction(nameof(GetAllBooks), new { CorrelationId = correlationId }, book);
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
                _logger.LogError(ex, "Error adding book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books/{isbn}/checkout")]
        public IActionResult CheckOutBook(string isbn)
        {
            using var activity = ActivitySource.StartActivity("CheckOutBook");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                _logger.LogInformation("Checking out book with ISBN: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                _library.CheckOutBook(isbn);
                
                _logger.LogInformation("Successfully checked out book: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                return Ok(new { Message = "Book checked out successfully", ISBN = isbn, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
                _logger.LogError(ex, "Error checking out book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpPost("books/{isbn}/return")]
        public IActionResult ReturnBook(string isbn)
        {
            using var activity = ActivitySource.StartActivity("ReturnBook");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                _logger.LogInformation("Returning book with ISBN: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                _library.ReturnBook(isbn);
                
                _logger.LogInformation("Successfully returned book: {ISBN}. CorrelationId: {CorrelationId}", 
                    isbn, correlationId);
                return Ok(new { Message = "Book returned successfully", ISBN = isbn, CorrelationId = correlationId });
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
                _logger.LogError(ex, "Error returning book. CorrelationId: {CorrelationId}", correlationId);
                return StatusCode(500, new { Error = "Internal server error", CorrelationId = correlationId });
            }
        }

        [HttpGet("stats")]
        public IActionResult GetStatistics()
        {
            using var activity = ActivitySource.StartActivity("GetStatistics");
            var correlationId = HttpContext.TraceIdentifier;
            
            try
            {
                _logger.LogInformation("Getting library statistics. CorrelationId: {CorrelationId}", correlationId);
                Interlocked.Increment(ref _totalOperations);
                
                var stats = new
                {
                    TotalBooks = _library.GetTotalBookCount(),
                    AvailableBooks = _library.GetAvailableBookCount(),
                    CheckedOutBooks = _library.GetTotalBookCount() - _library.GetAvailableBookCount(),
                    TotalOperations = _totalOperations,
                    TotalErrors = _totalErrors,
                    ErrorRate = _totalOperations > 0 ? (double)_totalErrors / _totalOperations : 0,
                    CorrelationId = correlationId
                };
                
                _logger.LogInformation("Retrieved library statistics. CorrelationId: {CorrelationId}", correlationId);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                Interlocked.Increment(ref _totalErrors);
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
