---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "GitHub Copilot"
chat_id: "frontend-tech-instructions-20260210"
prompt: |
  Create instruction files for the front-end technologies
started: "2026-02-10T15:24:50Z"
ended: "2026-02-10T15:25:48Z"
task_durations:
  - task: "analyze frontend technologies"
    duration: "00:00:30"
  - task: "create jQuery instructions"
    duration: "00:00:18"
total_duration: "00:00:58"
ai_log: "ai-logs/2026/02/10/frontend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.js"
---

# jQuery Instructions

## Overview

This document defines jQuery usage guidelines for the calculator-web project. jQuery is included primarily for validation plugins and legacy compatibility. For new code, prefer vanilla JavaScript or modern frameworks.

## Version

- **jQuery Version**: 3.x
- **Location**: `wwwroot/lib/jquery/`
- **Validation Plugin**: `wwwroot/lib/jquery-validation/`
- **Unobtrusive Validation**: `wwwroot/lib/jquery-validation-unobtrusive/`

## When to Use jQuery

### Appropriate Use Cases

✅ **DO use jQuery for:**
- ASP.NET Core client-side validation (jquery-validation-unobtrusive)
- Working with existing jQuery plugins
- Maintaining consistency in legacy code sections
- Quick prototyping

❌ **DON'T use jQuery for:**
- New feature development (use vanilla JS instead)
- Simple DOM queries (`document.querySelector` is sufficient)
- Modern async operations (use `fetch` and `async/await`)
- Complex state management (use a modern framework)

## Including jQuery

### Script Loading Order

```html
<!-- In _Layout.cshtml -->
<!DOCTYPE html>
<html>
<head>
  <!-- CSS files -->
</head>
<body>
  @RenderBody()

  <!-- Load scripts in order -->
  <script src="~/lib/jquery/dist/jquery.min.js"></script>
  <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Only include on pages with forms -->
  @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### Validation Scripts Partial

```html
<!-- _ValidationScriptsPartial.cshtml -->
<script src="~/lib/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
```

Include in pages with forms:

```html
@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

## jQuery Basics

### Document Ready

```javascript
// Good: Modern jQuery syntax
$(function() {
  // DOM is ready
  initializeCalculator();
});

// Alternative (older syntax)
$(document).ready(function() {
  // DOM is ready
  initializeCalculator();
});

// Good: Vanilla JS alternative (preferred for new code)
document.addEventListener('DOMContentLoaded', function() {
  initializeCalculator();
});
```

### Selecting Elements

```javascript
// jQuery selectors
const $display = $('#displayValue');           // ID selector
const $buttons = $('.calc-btn');               // Class selector
const $operators = $('.calc-btn.operator');    // Multiple classes
const $firstButton = $('.calc-btn:first');     // Pseudo-selector
const $evenRows = $('.button-row:even');       // Even elements

// Vanilla JS alternative (preferred)
const display = document.getElementById('displayValue');
const buttons = document.querySelectorAll('.calc-btn');
const operators = document.querySelectorAll('.calc-btn.operator');
```

### Chaining

```javascript
// Good: jQuery chaining
$('.calc-btn')
  .addClass('initialized')
  .attr('data-initialized', 'true')
  .on('click', handleClick);

// Vanilla JS requires separate calls
const buttons = document.querySelectorAll('.calc-btn');
buttons.forEach(btn => {
  btn.classList.add('initialized');
  btn.setAttribute('data-initialized', 'true');
  btn.addEventListener('click', handleClick);
});
```

## DOM Manipulation

### Getting/Setting Content

```javascript
// jQuery
const value = $('#displayValue').val();
$('#displayValue').val('42');

const text = $('#result').text();
$('#result').text('Result: 42');

const html = $('#content').html();
$('#content').html('<strong>Bold text</strong>');

// Vanilla JS alternative
const value = document.getElementById('displayValue').value;
document.getElementById('displayValue').value = '42';

const text = document.getElementById('result').textContent;
document.getElementById('result').textContent = 'Result: 42';

const html = document.getElementById('content').innerHTML;
document.getElementById('content').innerHTML = '<strong>Bold text</strong>';
```

### CSS Manipulation

```javascript
// jQuery
$('.calc-btn').css('background-color', '#3a3a3a');
$('.calc-btn').css({
  'background-color': '#3a3a3a',
  'color': 'white'
});

// Get CSS property
const bgColor = $('.calc-btn').css('background-color');

// Vanilla JS alternative
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.style.backgroundColor = '#3a3a3a';
  btn.style.color = 'white';
});

const bgColor = getComputedStyle(document.querySelector('.calc-btn')).backgroundColor;
```

### Class Manipulation

```javascript
// jQuery
$('.calc-btn').addClass('active');
$('.calc-btn').removeClass('active');
$('.calc-btn').toggleClass('active');
$('.calc-btn').hasClass('active');

// Vanilla JS alternative
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.classList.add('active');
  btn.classList.remove('active');
  btn.classList.toggle('active');
  btn.classList.contains('active');
});
```

### Attributes

```javascript
// jQuery
$('.calc-btn').attr('data-value', '7');
$('.calc-btn').removeAttr('disabled');
const value = $('.calc-btn').attr('data-value');
const hasDisabled = $('.calc-btn').prop('disabled');

// Vanilla JS alternative
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.setAttribute('data-value', '7');
  btn.removeAttribute('disabled');
  const value = btn.getAttribute('data-value');
  const hasDisabled = btn.disabled;
});
```

## Event Handling

### Basic Events

```javascript
// jQuery
$('.calc-btn').on('click', function() {
  const value = $(this).data('value');
  updateDisplay(value);
});

// Multiple events
$('#displayValue').on('focus blur', function() {
  $(this).toggleClass('active');
});

// Event delegation
$('#calculator').on('click', '.calc-btn', function() {
  handleButtonClick(this);
});

// Vanilla JS alternative
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const value = this.dataset.value;
    updateDisplay(value);
  });
});

// Event delegation
document.getElementById('calculator').addEventListener('click', (e) => {
  if (e.target.matches('.calc-btn')) {
    handleButtonClick(e.target);
  }
});
```

### Common Events

```javascript
// Click events
$('.calc-btn').click(function() { /* ... */ });

// Form events
$('form').submit(function(e) {
  e.preventDefault();
  // Handle form submission
});

$('#displayValue').change(function() {
  // Input changed
});

$('#displayValue').input(function() {
  // Input event (while typing)
});

// Keyboard events
$(document).keydown(function(e) {
  if (e.key === 'Enter') {
    calculateResult();
  }
});

// Mouse events
$('.calc-btn').hover(
  function() { $(this).addClass('hover'); },    // mouseenter
  function() { $(this).removeClass('hover'); }  // mouseleave
);
```

### Removing Event Handlers

```javascript
// Remove specific handler
function handleClick() { /* ... */ }
$('.calc-btn').on('click', handleClick);
$('.calc-btn').off('click', handleClick);

// Remove all handlers of a type
$('.calc-btn').off('click');

// Remove all handlers
$('.calc-btn').off();

// One-time event
$('.calc-btn').one('click', function() {
  // Runs only once
});
```

## AJAX Operations

### Basic AJAX

```javascript
// jQuery AJAX
$.ajax({
  url: '/api/calculate',
  method: 'POST',
  data: { expression: '2+2' },
  dataType: 'json',
  success: function(response) {
    $('#result').text(response.result);
  },
  error: function(xhr, status, error) {
    console.error('Error:', error);
  }
});

// Shorthand methods
$.get('/api/history', function(data) {
  renderHistory(data);
});

$.post('/api/save', { value: 42 }, function(response) {
  console.log('Saved:', response);
});

// Modern Vanilla JS alternative (preferred)
async function calculate(expression) {
  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression })
    });

    const data = await response.json();
    document.getElementById('result').textContent = data.result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### AJAX with Anti-Forgery Token

```javascript
// jQuery with CSRF token
$.ajaxSetup({
  beforeSend: function(xhr) {
    const token = $('input[name="__RequestVerificationToken"]').val();
    xhr.setRequestHeader('RequestVerificationToken', token);
  }
});

$.post('/api/save', { value: 42 });

// Or per request
const token = $('input[name="__RequestVerificationToken"]').val();
$.post({
  url: '/api/save',
  data: { value: 42 },
  headers: { 'RequestVerificationToken': token }
});
```

## jQuery Validation

### Basic Form Validation

```html
<!-- Razor form with validation -->
<form asp-page="/Index" method="post">
  <div class="form-floating mb-3">
    <input asp-for="FirstNumber" class="form-control" />
    <label asp-for="FirstNumber"></label>
    <span asp-validation-for="FirstNumber" class="text-danger"></span>
  </div>

  <div class="form-floating mb-3">
    <input asp-for="SecondNumber" class="form-control" />
    <label asp-for="SecondNumber"></label>
    <span asp-validation-for="SecondNumber" class="text-danger"></span>
  </div>

  <button type="submit" class="btn btn-primary">Calculate</button>
</form>

@section Scripts {
  <partial name="_ValidationScriptsPartial" />
}
```

### Custom Validation Rules

```javascript
// Add custom validation method
$.validator.addMethod('notZero', function(value, element) {
  return this.optional(element) || parseFloat(value) !== 0;
}, 'Value cannot be zero');

// Apply to form
$('form').validate({
  rules: {
    divisor: {
      required: true,
      number: true,
      notZero: true
    }
  },
  messages: {
    divisor: {
      required: 'Please enter a number',
      number: 'Please enter a valid number',
      notZero: 'Cannot divide by zero'
    }
  }
});
```

### Unobtrusive Validation

The validation is automatically configured through data attributes:

```html
<!-- ASP.NET Core generates these attributes -->
<input
  type="text"
  id="FirstNumber"
  name="FirstNumber"
  data-val="true"
  data-val-required="The First Number field is required."
  data-val-number="The field First Number must be a number."
/>
```

### Manual Validation Trigger

```javascript
// Check if form is valid
if ($('form').valid()) {
  // Form is valid, proceed
  submitForm();
}

// Validate specific element
$('#FirstNumber').valid();

// Remove validation
$('form').validate().resetForm();

// Add error programmatically
const validator = $('form').validate();
validator.showErrors({
  'FirstNumber': 'Custom error message'
});
```

## Effects and Animations

### Show/Hide

```javascript
// jQuery
$('.message').show();           // Display: block
$('.message').hide();           // Display: none
$('.message').toggle();         // Toggle visibility

// With duration
$('.message').show(500);        // Fade in over 500ms
$('.message').hide('slow');     // Fade out slowly
$('.message').toggle('fast');   // Toggle with animation

// Vanilla JS alternative
element.style.display = 'block';
element.style.display = 'none';
element.style.display = element.style.display === 'none' ? 'block' : 'none';
```

### Fade Effects

```javascript
// jQuery
$('.message').fadeIn();
$('.message').fadeOut();
$('.message').fadeToggle();
$('.message').fadeTo(500, 0.5);  // Fade to 50% opacity

// Callback after animation
$('.message').fadeIn(500, function() {
  console.log('Fade complete');
});
```

### Slide Effects

```javascript
// jQuery
$('.panel').slideDown();
$('.panel').slideUp();
$('.panel').slideToggle();

// With duration
$('.panel').slideDown(500);
```

### Custom Animations

```javascript
// jQuery animate
$('.element').animate({
  left: '250px',
  opacity: 0.5,
  height: '150px'
}, 500, function() {
  console.log('Animation complete');
});

// CSS alternative (preferred)
// Use CSS transitions/animations with class toggling
$('.element').addClass('animated');
```

## Utilities

### Each Loop

```javascript
// jQuery each
$('.calc-btn').each(function(index, element) {
  console.log(index, $(this).text());
});

// Vanilla JS forEach (preferred)
document.querySelectorAll('.calc-btn').forEach((element, index) => {
  console.log(index, element.textContent);
});
```

### Data Storage

```javascript
// jQuery data
$('.calc-btn').data('value', 7);
const value = $('.calc-btn').data('value');

// Vanilla JS dataset (preferred)
element.dataset.value = 7;
const value = element.dataset.value;
```

### Contains/Find

```javascript
// jQuery
const $container = $('#calculator');
const $buttons = $container.find('.calc-btn');
const $parent = $('.calc-btn').parent();
const $closest = $('.calc-btn').closest('.calculator');

// Vanilla JS
const container = document.getElementById('calculator');
const buttons = container.querySelectorAll('.calc-btn');
const parent = button.parentElement;
const closest = button.closest('.calculator');
```

## Best Practices

### Use jQuery Sparingly

```javascript
// Avoid: Using jQuery for everything
$('#displayValue').val('42');
$('.calc-btn').addClass('active');

// Prefer: Vanilla JS for simple operations
document.getElementById('displayValue').value = '42';
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.classList.add('active');
});
```

### Cache jQuery Selections

```javascript
// Bad: Repeated queries
$('.calc-btn').addClass('ready');
$('.calc-btn').on('click', handleClick);
$('.calc-btn').attr('data-initialized', 'true');

// Good: Cache selection
const $calcButtons = $('.calc-btn');
$calcButtons.addClass('ready');
$calcButtons.on('click', handleClick);
$calcButtons.attr('data-initialized', 'true');
```

### Use Event Delegation

```javascript
// Bad: Attach to many elements
$('.calc-btn').on('click', handleClick);  // Attaches to each button

// Good: Event delegation
$('#calculator').on('click', '.calc-btn', handleClick);  // One listener
```

### Avoid jQuery for New Features

```javascript
// Avoid: jQuery for new code
function loadHistory() {
  $.get('/api/history', function(data) {
    $('#history').html(renderHistory(data));
  });
}

// Prefer: Modern JavaScript
async function loadHistory() {
  try {
    const response = await fetch('/api/history');
    const data = await response.json();
    document.getElementById('history').innerHTML = renderHistory(data);
  } catch (error) {
    console.error('Failed to load history:', error);
  }
}
```

### Chain jQuery Methods

```javascript
// Good: Method chaining
$('.message')
  .fadeIn(500)
  .delay(2000)
  .fadeOut(500);

$('.calc-btn')
  .addClass('initialized')
  .data('ready', true)
  .on('click', handleClick);
```

## Migration from jQuery

### Common Replacements

```javascript
// jQuery → Vanilla JS

// Selectors
$('#id')                    → document.getElementById('id')
$('.class')                 → document.querySelectorAll('.class')
$('.class').first()         → document.querySelector('.class')

// Events
$(el).on('click', fn)       → el.addEventListener('click', fn)
$(el).off('click', fn)      → el.removeEventListener('click', fn)
$(el).trigger('click')      → el.click()

// DOM manipulation
$(el).text()                → el.textContent
$(el).text('value')         → el.textContent = 'value'
$(el).html()                → el.innerHTML
$(el).val()                 → el.value
$(el).attr('name')          → el.getAttribute('name')
$(el).addClass('active')    → el.classList.add('active')

// AJAX
$.get(url, callback)        → fetch(url).then(r => r.json())
$.post(url, data)           → fetch(url, { method: 'POST', body: data })

// Utilities
$.each(array, fn)           → array.forEach(fn)
$.map(array, fn)            → array.map(fn)
$.extend(obj1, obj2)        → Object.assign(obj1, obj2) or {...obj1, ...obj2}
```

## Resources

- [jQuery API Documentation](https://api.jquery.com/)
- [jQuery Validation Plugin](https://jqueryvalidation.org/)
- [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Vanilla JS alternatives
- [ASP.NET Core Client-Side Validation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation)
