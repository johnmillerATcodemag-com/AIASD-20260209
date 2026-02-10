# jQuery Validation Instructions

## Overview
jQuery Validation is a powerful plugin that makes client-side form validation easy. It provides customizable validation rules and error messages.

## Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
```

### Local (Already included in project)
```html
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
```

## Basic Usage

### Simple Validation
```javascript
$(document).ready(function() {
    $("#myForm").validate({
        rules: {
            username: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: "Please enter your username",
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Password must be at least 6 characters"
            }
        }
    });
});
```

### HTML5 Attributes
```html
<form id="myForm">
    <input type="text" name="username" required>
    <input type="email" name="email" required>
    <input type="password" name="password" required minlength="6">
    <button type="submit">Submit</button>
</form>
```

## Built-in Validation Rules

### Basic Rules
```javascript
{
    // Required field
    required: true,

    // Email format
    email: true,

    // URL format
    url: true,

    // Date format
    date: true,

    // ISO date format (YYYY-MM-DD)
    dateISO: true,

    // Number
    number: true,

    // Digits only
    digits: true,

    // Credit card number
    creditcard: true
}
```

### Length Rules
```javascript
{
    // Minimum length
    minlength: 5,

    // Maximum length
    maxlength: 20,

    // Exact length
    rangelength: [5, 10]  // Between 5 and 10 characters
}
```

### Numeric Rules
```javascript
{
    // Minimum value
    min: 18,

    // Maximum value
    max: 100,

    // Value range
    range: [18, 65],  // Between 18 and 65

    // Step
    step: 5  // Must be multiple of 5
}
```

### Comparison Rules
```javascript
{
    // Equal to another field
    equalTo: "#password",

    // Remote validation (AJAX)
    remote: {
        url: "/api/check-username",
        type: "post",
        data: {
            username: function() {
                return $("#username").val();
            }
        }
    }
}
```

## Custom Validation Rules

### Adding Custom Rules
```javascript
// Add custom validation method
$.validator.addMethod("phoneUS", function(value, element) {
    return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
}, "Please enter a valid US phone number (xxx-xxx-xxxx)");

// Use custom rule
$("#myForm").validate({
    rules: {
        phone: {
            required: true,
            phoneUS: true
        }
    }
});
```

### Custom Rule with Parameters
```javascript
$.validator.addMethod("greaterThan", function(value, element, param) {
    return this.optional(element) || parseFloat(value) > parseFloat($(param).val());
}, "Value must be greater than {0}");

// Usage
$("#myForm").validate({
    rules: {
        maxValue: {
            required: true,
            greaterThan: "#minValue"
        }
    },
    messages: {
        maxValue: {
            greaterThan: "Max must be greater than Min"
        }
    }
});
```

## Validation Options

### Configuration Options
```javascript
$("#myForm").validate({
    // Rules and messages
    rules: { /* ... */ },
    messages: { /* ... */ },

    // Error placement
    errorPlacement: function(error, element) {
        error.appendTo(element.parent());
    },

    // Highlight invalid field
    highlight: function(element) {
        $(element).addClass("is-invalid");
    },

    // Unhighlight valid field
    unhighlight: function(element) {
        $(element).removeClass("is-invalid");
    },

    // Submit handler (called if form is valid)
    submitHandler: function(form) {
        // Submit via AJAX or normal submission
        form.submit();
    },

    // Invalid handler (called if form is invalid)
    invalidHandler: function(event, validator) {
        console.log("Form has errors:", validator.numberOfInvalids());
    },

    // Error element type (default: label)
    errorElement: "span",

    // Error class
    errorClass: "error-message",

    // Valid class
    validClass: "valid-input",

    // Ignore elements
    ignore: ".ignore",

    // Validate on keyup
    onkeyup: function(element) {
        $(element).valid();
    },

    // Validate on focus out
    onfocusout: function(element) {
        $(element).valid();
    },

    // Validate on click (checkboxes/radios)
    onclick: function(element) {
        $(element).valid();
    }
});
```

## Error Display

### Default Error Display
```html
<form id="myForm">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <!-- Error message inserted here automatically -->
    <label class="error">Please enter a valid email</label>
</form>
```

### Custom Error Placement
```javascript
$("#myForm").validate({
    errorPlacement: function(error, element) {
        // Place error after element's parent div
        error.insertAfter(element.parent());
    }
});
```

### Error Container
```javascript
$("#myForm").validate({
    errorContainer: "#errorSummary",
    errorLabelContainer: "#errorSummary ul",
    wrapper: "li"
});
```

```html
<div id="errorSummary" style="display:none;">
    <h4>Please correct the following errors:</h4>
    <ul></ul>
</div>
```

### Styling Errors
```css
/* Error messages */
label.error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

/* Invalid fields */
input.error,
select.error,
textarea.error {
    border-color: #dc3545;
    background-color: #fff5f5;
}

/* Valid fields */
input.valid,
select.valid,
textarea.valid {
    border-color: #28a745;
}
```

## ASP.NET Core Integration (Unobtrusive Validation)

### Enable Unobtrusive Validation
```html
<script src="~/lib/jquery/dist/jquery.min.js"></script>
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
```

### Razor Pages Example
```csharp
public class RegisterModel : PageModel
{
    [BindProperty]
    [Required(ErrorMessage = "Username is required")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "Username must be 3-20 characters")]
    public string Username { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [BindProperty]
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [BindProperty]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; }
}
```

```html
<form method="post">
    <div asp-validation-summary="All" class="text-danger"></div>

    <div class="form-group">
        <label asp-for="Username"></label>
        <input asp-for="Username" class="form-control" />
        <span asp-validation-for="Username" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="Email"></label>
        <input asp-for="Email" class="form-control" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="Password"></label>
        <input asp-for="Password" class="form-control" />
        <span asp-validation-for="Password" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="ConfirmPassword"></label>
        <input asp-for="ConfirmPassword" class="form-control" />
        <span asp-validation-for="ConfirmPassword" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>
```

## Programmatic Validation

### Validate Entire Form
```javascript
// Validate form
if ($("#myForm").valid()) {
    console.log("Form is valid!");
}

// Validate specific element
if ($("#email").valid()) {
    console.log("Email is valid!");
}
```

### Get Validation Status
```javascript
const validator = $("#myForm").validate();

// Number of invalid fields
const errors = validator.numberOfInvalids();

// Get all errors
const errorMap = validator.errorMap;

// Reset form validation
validator.resetForm();

// Show errors programmatically
validator.showErrors({
    "email": "This email is already taken",
    "username": "Username must be unique"
});
```

### Dynamically Add/Remove Rules
```javascript
// Add rules
$("#email").rules("add", {
    required: true,
    email: true,
    messages: {
        required: "Email is required",
        email: "Please enter a valid email"
    }
});

// Remove rules
$("#email").rules("remove", "email");

// Remove all rules
$("#email").rules("remove");
```

## Complete Calculator Form Example

### HTML
```html
<form id="calculatorForm">
    <div class="form-group">
        <label for="number1">First Number:</label>
        <input type="text" id="number1" name="number1" class="form-control" placeholder="Enter first number">
    </div>

    <div class="form-group">
        <label for="operation">Operation:</label>
        <select id="operation" name="operation" class="form-control">
            <option value="">Select operation</option>
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
        </select>
    </div>

    <div class="form-group">
        <label for="number2">Second Number:</label>
        <input type="text" id="number2" name="number2" class="form-control" placeholder="Enter second number">
    </div>

    <button type="submit" class="btn btn-primary">Calculate</button>

    <div id="result" class="mt-3"></div>
</form>
```

### JavaScript
```javascript
$(document).ready(function() {
    // Add custom number validation
    $.validator.addMethod("validNumber", function(value, element) {
        return this.optional(element) || /^-?\d+\.?\d*$/.test(value);
    }, "Please enter a valid number");

    // Add validation for division by zero
    $.validator.addMethod("notZeroForDivision", function(value, element) {
        const operation = $("#operation").val();
        if (operation === "divide") {
            return parseFloat(value) !== 0;
        }
        return true;
    }, "Cannot divide by zero");

    // Initialize validation
    $("#calculatorForm").validate({
        rules: {
            number1: {
                required: true,
                validNumber: true
            },
            operation: {
                required: true
            },
            number2: {
                required: true,
                validNumber: true,
                notZeroForDivision: true
            }
        },
        messages: {
            number1: {
                required: "Please enter the first number",
                validNumber: "Please enter a valid number"
            },
            operation: "Please select an operation",
            number2: {
                required: "Please enter the second number",
                validNumber: "Please enter a valid number"
            }
        },
        errorPlacement: function(error, element) {
            error.addClass("text-danger small");
            error.insertAfter(element);
        },
        highlight: function(element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            const num1 = parseFloat($("#number1").val());
            const num2 = parseFloat($("#number2").val());
            const operation = $("#operation").val();

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
                    result = num1 / num2;
                    break;
            }

            $("#result")
                .html(`<div class="alert alert-success">Result: ${result}</div>`)
                .hide()
                .fadeIn();
        }
    });

    // Re-validate number2 when operation changes
    $("#operation").change(function() {
        $("#number2").valid();
    });
});
```

## Best Practices

1. **Validate Both Client and Server**: Client-side validation is for UX, server-side is for security
2. **Use Clear Error Messages**: Tell users exactly what's wrong
3. **Validate on Blur**: Provide immediate feedback as users fill the form
4. **Highlight Invalid Fields**: Use visual cues (borders, icons)
5. **Group Related Errors**: Use error summaries for complex forms
6. **Don't Overwhelm Users**: Show errors progressively, not all at once
7. **Test Edge Cases**: Empty strings, special characters, very long input
8. **Accessibility**: Ensure error messages are screen-reader friendly
9. **Consistent Styling**: Match validation styling with your design system
10. **Custom Rules for Business Logic**: Don't rely only on built-in rules

## Accessibility Considerations

```html
<div class="form-group">
    <label for="email">Email:</label>
    <input
        type="email"
        id="email"
        name="email"
        class="form-control"
        aria-required="true"
        aria-invalid="false"
        aria-describedby="email-error"
    >
    <span id="email-error" class="error" role="alert"></span>
</div>
```

## Common Issues and Solutions

### Issue: Validation Not Working
```javascript
// Ensure jQuery is loaded before validation plugin
// Check console for errors
// Verify form has an ID
// Ensure validation is initialized after DOM ready
```

### Issue: Submit Button Not Working
```javascript
// Check if form validation is preventing submission
// Use submitHandler to debug
submitHandler: function(form) {
    console.log("Form is valid, submitting...");
    form.submit();
}
```

### Issue: Dynamic Fields Not Validated
```javascript
// Re-initialize validation after adding fields
// Or use rules("add") to add validation to new fields
$("#newField").rules("add", {
    required: true,
    email: true
});
```

## Resources
- Official Documentation: https://jqueryvalidation.org/
- GitHub Repository: https://github.com/jquery-validation/jquery-validation
- Demo and Examples: https://jqueryvalidation.org/documentation/
- ASP.NET Core Validation: https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation
