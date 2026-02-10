# jQuery Instructions

## Overview
jQuery is a fast, small, and feature-rich JavaScript library that simplifies HTML document traversal, manipulation, event handling, and AJAX interactions.

## Installation

### CDN (Content Delivery Network)
```html
<!-- jQuery Core -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Or use the version in wwwroot/lib -->
<script src="~/lib/jquery/dist/jquery.min.js"></script>
```

### Local Installation (Already included in project)
Located in: `wwwroot/lib/jquery/`

## Basic Syntax

```javascript
// jQuery syntax
$(selector).action();

// Document ready (wait for DOM to load)
$(document).ready(function() {
    // Your code here
});

// Shorthand
$(function() {
    // Your code here
});
```

## Selectors

### Basic Selectors
```javascript
// By ID
$("#myId")

// By Class
$(".myClass")

// By Tag
$("div")

// All elements
$("*")

// Multiple selectors
$("h1, p, .myClass")
```

### Hierarchy Selectors
```javascript
// Descendants
$("div p")              // All <p> inside <div>

// Direct children
$("div > p")            // Direct <p> children of <div>

// Next sibling
$("h1 + p")             // <p> immediately after <h1>

// All siblings after
$("h1 ~ p")             // All <p> after <h1>
```

### Attribute Selectors
```javascript
$("[type]")             // Has type attribute
$("[type='text']")      // type equals "text"
$("[type!='text']")     // type not equals "text"
$("[name^='user']")     // name starts with "user"
$("[name$='name']")     // name ends with "name"
$("[name*='email']")    // name contains "email"
```

### Filter Selectors
```javascript
$("li:first")           // First <li>
$("li:last")            // Last <li>
$("li:even")            // Even indexed <li> (0, 2, 4...)
$("li:odd")             // Odd indexed <li> (1, 3, 5...)
$("li:eq(2)")           // <li> at index 2
$("li:gt(2)")           // <li> with index > 2
$("li:lt(2)")           // <li> with index < 2
$(":visible")           // Visible elements
$(":hidden")            // Hidden elements
$("input:checked")      // Checked checkboxes/radios
$("option:selected")    // Selected options
```

## DOM Manipulation

### Getting/Setting Content
```javascript
// Text content
$("#myDiv").text();                 // Get text
$("#myDiv").text("New text");       // Set text

// HTML content
$("#myDiv").html();                 // Get HTML
$("#myDiv").html("<b>Bold</b>");    // Set HTML

// Form values
$("#myInput").val();                // Get value
$("#myInput").val("New value");     // Set value
```

### Attributes
```javascript
// Get attribute
$("#myLink").attr("href");

// Set attribute
$("#myLink").attr("href", "https://example.com");

// Set multiple attributes
$("#myImg").attr({
    src: "image.jpg",
    alt: "Description"
});

// Remove attribute
$("#myLink").removeAttr("target");

// Data attributes
$("#myDiv").data("id");             // Get data-id
$("#myDiv").data("id", 123);        // Set data-id
```

### CSS
```javascript
// Get CSS property
$("#myDiv").css("color");

// Set CSS property
$("#myDiv").css("color", "red");

// Set multiple properties
$("#myDiv").css({
    color: "red",
    fontSize: "20px",
    backgroundColor: "#f0f0f0"
});
```

### Classes
```javascript
// Add class
$("#myDiv").addClass("active");

// Remove class
$("#myDiv").removeClass("active");

// Toggle class
$("#myDiv").toggleClass("active");

// Check if has class
if ($("#myDiv").hasClass("active")) {
    // Do something
}
```

### Creating and Removing Elements
```javascript
// Create element
const newDiv = $("<div>").text("Hello");
const newDiv = $("<div>Hello</div>");

// Append (add to end)
$("#container").append("<p>New paragraph</p>");
$("<p>New paragraph</p>").appendTo("#container");

// Prepend (add to beginning)
$("#container").prepend("<p>First paragraph</p>");

// After (insert after element)
$("#myDiv").after("<p>After</p>");

// Before (insert before element)
$("#myDiv").before("<p>Before</p>");

// Remove element
$("#myDiv").remove();

// Empty element (remove children)
$("#container").empty();
```

## Events

### Basic Event Methods
```javascript
// Click
$("#btn").click(function() {
    alert("Clicked!");
});

// Double click
$("#btn").dblclick(function() {
    alert("Double clicked!");
});

// Mouse events
$("#div").mouseenter(function() { /* ... */ });
$("#div").mouseleave(function() { /* ... */ });
$("#div").hover(
    function() { /* mouse enter */ },
    function() { /* mouse leave */ }
);

// Keyboard events
$("#input").keydown(function(e) {
    console.log("Key:", e.which);
});
$("#input").keyup(function() { /* ... */ });

// Form events
$("#form").submit(function(e) {
    e.preventDefault();
    // Handle submission
});

$("#input").focus(function() { /* ... */ });
$("#input").blur(function() { /* ... */ });
$("#select").change(function() { /* ... */ });
```

### Event Handling with .on()
```javascript
// Single event
$("#btn").on("click", function() {
    alert("Clicked!");
});

// Multiple events
$("#btn").on("mouseenter mouseleave", function() {
    $(this).toggleClass("hover");
});

// Multiple events with different handlers
$("#btn").on({
    mouseenter: function() {
        $(this).css("background-color", "blue");
    },
    mouseleave: function() {
        $(this).css("background-color", "gray");
    },
    click: function() {
        alert("Clicked!");
    }
});

// Event delegation (for dynamic elements)
$("#container").on("click", ".dynamic-button", function() {
    alert("Dynamic button clicked!");
});

// One-time event
$("#btn").one("click", function() {
    alert("This will only fire once!");
});

// Remove event
$("#btn").off("click");
```

### Event Object
```javascript
$("#btn").click(function(event) {
    event.preventDefault();      // Prevent default behavior
    event.stopPropagation();     // Stop bubbling

    console.log(event.type);     // "click"
    console.log(event.target);   // Element that triggered event
    console.log(event.pageX);    // Mouse X coordinate
    console.log(event.pageY);    // Mouse Y coordinate
    console.log(event.which);    // Mouse button or key code
});
```

## Effects and Animations

### Show/Hide
```javascript
// Show
$("#div").show();
$("#div").show(1000);               // Show over 1 second
$("#div").show("slow");             // slow, fast

// Hide
$("#div").hide();
$("#div").hide(1000);

// Toggle
$("#div").toggle();
$("#div").toggle(1000);
```

### Fade
```javascript
// Fade in
$("#div").fadeIn();
$("#div").fadeIn(1000);

// Fade out
$("#div").fadeOut();
$("#div").fadeOut(1000);

// Fade toggle
$("#div").fadeToggle();

// Fade to specific opacity
$("#div").fadeTo(1000, 0.5);       // 50% opacity
```

### Slide
```javascript
// Slide down
$("#div").slideDown();
$("#div").slideDown(1000);

// Slide up
$("#div").slideUp();

// Slide toggle
$("#div").slideToggle();
```

### Custom Animations
```javascript
// Animate CSS properties
$("#div").animate({
    left: "250px",
    opacity: 0.5,
    height: "150px",
    width: "150px"
}, 1000);

// Multiple animations (queue)
$("#div")
    .animate({ left: "250px" }, 1000)
    .animate({ top: "250px" }, 1000);

// Callback after animation
$("#div").slideUp(1000, function() {
    alert("Animation complete!");
});

// Stop animation
$("#div").stop();
```

## Traversing

### Parents
```javascript
$("#child").parent();               // Immediate parent
$("#child").parents();              // All ancestors
$("#child").parents("div");         // All <div> ancestors
$("#child").parentsUntil("body");   // Ancestors until <body>
$("#child").closest("div");         // Nearest <div> ancestor
```

### Children
```javascript
$("#parent").children();            // Direct children
$("#parent").children("p");         // Direct <p> children
$("#parent").find("span");          // All <span> descendants
```

### Siblings
```javascript
$("#element").siblings();           // All siblings
$("#element").siblings("p");        // All <p> siblings
$("#element").next();               // Next sibling
$("#element").nextAll();            // All next siblings
$("#element").nextUntil("div");     // Next siblings until <div>
$("#element").prev();               // Previous sibling
$("#element").prevAll();            // All previous siblings
```

### Filtering
```javascript
$("p").first();                     // First <p>
$("p").last();                      // Last <p>
$("p").eq(2);                       // <p> at index 2
$("p").filter(".intro");            // <p> with class "intro"
$("p").not(".intro");               // <p> without class "intro"
```

## AJAX

### $.ajax()
```javascript
$.ajax({
    url: "/api/data",
    type: "GET",
    dataType: "json",
    success: function(data) {
        console.log(data);
    },
    error: function(xhr, status, error) {
        console.error(error);
    }
});

// POST request
$.ajax({
    url: "/api/data",
    type: "POST",
    data: JSON.stringify({ name: "John" }),
    contentType: "application/json",
    success: function(response) {
        console.log(response);
    }
});
```

### Shorthand Methods
```javascript
// GET
$.get("/api/data", function(data) {
    console.log(data);
});

// POST
$.post("/api/data", { name: "John" }, function(response) {
    console.log(response);
});

// Load HTML
$("#result").load("/page.html");
$("#result").load("/page.html #content"); // Load specific element

// Get JSON
$.getJSON("/api/data.json", function(data) {
    console.log(data);
});
```

## Utilities

### Each
```javascript
// Iterate over jQuery collection
$("li").each(function(index, element) {
    console.log(index, $(element).text());
});

// Iterate over array
$.each([1, 2, 3], function(index, value) {
    console.log(index, value);
});

// Iterate over object
$.each({ a: 1, b: 2 }, function(key, value) {
    console.log(key, value);
});
```

### Miscellaneous
```javascript
// Check if element exists
if ($("#myDiv").length > 0) {
    // Element exists
}

// Get dimensions
$("#div").width();                  // Content width
$("#div").height();                 // Content height
$("#div").innerWidth();             // Width + padding
$("#div").innerHeight();            // Height + padding
$("#div").outerWidth();             // Width + padding + border
$("#div").outerWidth(true);         // Width + padding + border + margin

// Scroll position
$(window).scrollTop();              // Vertical scroll
$(window).scrollLeft();             // Horizontal scroll
$("#div").scrollTop(100);           // Set scroll position

// Offset (position relative to document)
$("#div").offset().top;
$("#div").offset().left;

// Position (relative to parent)
$("#div").position().top;
$("#div").position().left;
```

## Form Handling Example

```javascript
$(function() {
    $("#calculatorForm").submit(function(e) {
        e.preventDefault();

        // Get form values
        const num1 = parseFloat($("#number1").val());
        const num2 = parseFloat($("#number2").val());
        const operation = $("#operation").val();

        // Validate
        if (isNaN(num1) || isNaN(num2)) {
            $("#result").text("Please enter valid numbers").addClass("error");
            return;
        }

        // Calculate
        let result;
        switch(operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
                break;
        }

        // Display result
        $("#result")
            .text("Result: " + result)
            .removeClass("error")
            .addClass("success")
            .hide()
            .fadeIn(500);
    });
});
```

## Best Practices

1. **Cache jQuery objects**: Store frequently used selectors
   ```javascript
   const $container = $("#container");
   $container.addClass("active");
   ```

2. **Chain methods**: Reduce code and improve performance
   ```javascript
   $("#div").addClass("active").fadeIn(500).text("Hello");
   ```

3. **Use event delegation**: For dynamic elements
   ```javascript
   $("#parent").on("click", ".child", handler);
   ```

4. **Avoid mixing jQuery and vanilla JS**: Be consistent
   ```javascript
   // Bad: $(element).style.color = "red";
   // Good: $(element).css("color", "red");
   ```

5. **Use namespaced events**: Easier to remove specific handlers
   ```javascript
   $("#btn").on("click.myPlugin", handler);
   $("#btn").off("click.myPlugin");
   ```

6. **Check if element exists** before manipulating
   ```javascript
   if ($("#myDiv").length) {
       $("#myDiv").hide();
   }
   ```

7. **Use .data() for storing data** on elements
   ```javascript
   $("#div").data("userId", 123);
   ```

## jQuery vs Vanilla JavaScript

| jQuery | Vanilla JavaScript |
|--------|-------------------|
| `$(selector)` | `document.querySelector(selector)` |
| `$(".class")` | `document.querySelectorAll(".class")` |
| `$(el).text()` | `el.textContent` |
| `$(el).html()` | `el.innerHTML` |
| `$(el).val()` | `el.value` |
| `$(el).attr("id")` | `el.getAttribute("id")` |
| `$(el).css("color", "red")` | `el.style.color = "red"` |
| `$(el).addClass("active")` | `el.classList.add("active")` |
| `$(el).on("click", fn)` | `el.addEventListener("click", fn)` |

## Resources
- Official Documentation: https://api.jquery.com/
- jQuery Learning Center: https://learn.jquery.com/
- jQuery CDN: https://code.jquery.com/
