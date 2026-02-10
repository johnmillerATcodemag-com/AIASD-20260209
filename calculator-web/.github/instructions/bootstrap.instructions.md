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
  - task: "create Bootstrap instructions"
    duration: "00:00:18"
total_duration: "00:00:58"
ai_log: "ai-logs/2026/02/10/frontend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.html, **/*.cshtml"
---

# Bootstrap 5 Instructions

## Overview

This document defines Bootstrap 5 usage guidelines for the calculator-web project. Bootstrap provides a responsive, mobile-first framework for building modern web interfaces with pre-built components and utilities.

## Version

- **Bootstrap Version**: 5.3.x
- **Location**: `wwwroot/lib/bootstrap/`
- **Documentation**: https://getbootstrap.com/docs/5.3/

## Including Bootstrap

### CSS and JavaScript

```html
<!-- In _Layout.cshtml -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@ViewData["Title"] - Calculator</title>

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />

  <!-- Custom CSS (override Bootstrap) -->
  <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
  @RenderBody()

  <!-- Bootstrap Bundle (includes Popper) -->
  <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Custom JavaScript -->
  <script src="~/js/site.js" asp-append-version="true"></script>
  @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

## Layout System

### Container

Use containers for proper page layout:

```html
<!-- Fixed-width container (responsive breakpoints) -->
<div class="container">
  <h1>Calculator</h1>
</div>

<!-- Full-width container -->
<div class="container-fluid">
  <h1>Calculator</h1>
</div>

<!-- Responsive containers (Bootstrap 5.3+) -->
<div class="container-sm">Small and up</div>
<div class="container-md">Medium and up</div>
<div class="container-lg">Large and up</div>
<div class="container-xl">Extra large and up</div>
<div class="container-xxl">Extra extra large and up</div>
```

### Grid System

Use the 12-column grid for layouts:

```html
<!-- Basic grid -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <!-- 50% width on medium screens and up -->
    </div>
    <div class="col-md-6">
      <!-- 50% width on medium screens and up -->
    </div>
  </div>
</div>

<!-- Responsive grid -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8 col-lg-6">
      <!-- 100% on mobile, 66% on tablet, 50% on desktop -->
    </div>
    <div class="col-12 col-md-4 col-lg-6">
      <!-- 100% on mobile, 33% on tablet, 50% on desktop -->
    </div>
  </div>
</div>

<!-- Gap utilities -->
<div class="row g-3">
  <!-- Gap of 1rem between columns -->
  <div class="col-6">Column</div>
  <div class="col-6">Column</div>
</div>
```

## Components

### Buttons

```html
<!-- Button styles -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>

<!-- Outline buttons -->
<button type="button" class="btn btn-outline-primary">Primary</button>

<!-- Button sizes -->
<button type="button" class="btn btn-primary btn-lg">Large</button>
<button type="button" class="btn btn-primary">Default</button>
<button type="button" class="btn btn-primary btn-sm">Small</button>

<!-- Block button (full width) -->
<button type="button" class="btn btn-primary w-100">Block Button</button>

<!-- Button group -->
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

### Forms

```html
<!-- Form controls -->
<div class="mb-3">
  <label for="inputEmail" class="form-label">Email address</label>
  <input type="email" class="form-control" id="inputEmail" placeholder="name@example.com">
</div>

<div class="mb-3">
  <label for="inputPassword" class="form-label">Password</label>
  <input type="password" class="form-control" id="inputPassword">
</div>

<!-- Floating labels -->
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
  <label for="floatingInput">Email address</label>
</div>

<!-- Input groups -->
<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" placeholder="Amount">
  <span class="input-group-text">.00</span>
</div>

<!-- Validation states -->
<div class="mb-3">
  <label for="validInput" class="form-label">Valid input</label>
  <input type="text" class="form-control is-valid" id="validInput" required>
  <div class="valid-feedback">Looks good!</div>
</div>

<div class="mb-3">
  <label for="invalidInput" class="form-label">Invalid input</label>
  <input type="text" class="form-control is-invalid" id="invalidInput" required>
  <div class="invalid-feedback">Please provide a valid value.</div>
</div>

<!-- Select -->
<select class="form-select" aria-label="Default select">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
</select>

<!-- Checkboxes and radios -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
</div>

<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio1">
  <label class="form-check-label" for="flexRadio1">
    Default radio
  </label>
</div>
```

### Cards

```html
<!-- Basic card -->
<div class="card">
  <div class="card-header">
    Header
  </div>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content</p>
    <a href="#" class="btn btn-primary">Button</a>
  </div>
  <div class="card-footer text-muted">
    Footer
  </div>
</div>

<!-- Card with image -->
<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content</p>
  </div>
</div>

<!-- Card colors -->
<div class="card text-bg-primary">
  <div class="card-body">
    <h5 class="card-title">Primary card</h5>
    <p class="card-text">Content</p>
  </div>
</div>
```

### Alerts

```html
<!-- Alert variations -->
<div class="alert alert-primary" role="alert">
  Primary alert
</div>

<div class="alert alert-success" role="alert">
  Success alert
</div>

<div class="alert alert-danger" role="alert">
  Error alert
</div>

<!-- Dismissible alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Warning!</strong> You should check this.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<!-- Alert with icon -->
<div class="alert alert-info d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24">
    <use xlink:href="#info-fill"/>
  </svg>
  <div>Info alert with icon</div>
</div>
```

### Modals

```html
<!-- Button trigger -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Modal content goes here
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Calculator</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">History</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## Utility Classes

### Spacing

```html
<!-- Margin (m) and Padding (p) -->
<!-- Sides: t (top), b (bottom), s (start/left), e (end/right), x (horizontal), y (vertical) -->
<!-- Sizes: 0, 1 (.25rem), 2 (.5rem), 3 (1rem), 4 (1.5rem), 5 (3rem), auto -->

<div class="mt-3">Margin top 1rem</div>
<div class="mb-4">Margin bottom 1.5rem</div>
<div class="mx-auto">Margin horizontal auto (center)</div>
<div class="p-3">Padding 1rem all sides</div>
<div class="px-4 py-2">Padding horizontal 1.5rem, vertical .5rem</div>

<!-- Gap utilities (for flex/grid) -->
<div class="d-flex gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Display

```html
<!-- Display utilities -->
<div class="d-none">Hidden on all</div>
<div class="d-block">Block on all</div>
<div class="d-inline">Inline on all</div>
<div class="d-inline-block">Inline block on all</div>
<div class="d-flex">Flex container</div>
<div class="d-grid">Grid container</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden until md breakpoint</div>
<div class="d-block d-md-none">Visible until md breakpoint</div>
```

### Flexbox

```html
<!-- Flex container -->
<div class="d-flex">
  <div>Flex item 1</div>
  <div>Flex item 2</div>
</div>

<!-- Flex direction -->
<div class="d-flex flex-row">Horizontal</div>
<div class="d-flex flex-column">Vertical</div>

<!-- Justify content -->
<div class="d-flex justify-content-start">Start</div>
<div class="d-flex justify-content-end">End</div>
<div class="d-flex justify-content-center">Center</div>
<div class="d-flex justify-content-between">Space between</div>
<div class="d-flex justify-content-around">Space around</div>

<!-- Align items -->
<div class="d-flex align-items-start">Top</div>
<div class="d-flex align-items-center">Middle</div>
<div class="d-flex align-items-end">Bottom</div>

<!-- Flex wrap -->
<div class="d-flex flex-wrap">Wrapping flex container</div>

<!-- Flex grow/shrink -->
<div class="d-flex">
  <div class="flex-grow-1">Grows to fill space</div>
  <div>Fixed width</div>
</div>
```

### Text

```html
<!-- Text alignment -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<!-- Text transform -->
<p class="text-lowercase">lowercased text</p>
<p class="text-uppercase">uppercased text</p>
<p class="text-capitalize">capitalized text</p>

<!-- Font weight -->
<p class="fw-bold">Bold text</p>
<p class="fw-normal">Normal weight</p>
<p class="fw-light">Light weight</p>

<!-- Font style -->
<p class="fst-italic">Italic text</p>
<p class="fst-normal">Normal style</p>

<!-- Text decoration -->
<p class="text-decoration-none">No decoration</p>
<p class="text-decoration-underline">Underlined text</p>
<p class="text-decoration-line-through">Strikethrough</p>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
<p class="text-warning">Warning text</p>
<p class="text-muted">Muted text</p>
```

### Colors

```html
<!-- Background colors -->
<div class="bg-primary text-white">Primary background</div>
<div class="bg-success text-white">Success background</div>
<div class="bg-danger text-white">Danger background</div>
<div class="bg-light">Light background</div>
<div class="bg-dark text-white">Dark background</div>

<!-- Background opacity -->
<div class="bg-primary bg-opacity-75">75% opacity</div>
<div class="bg-primary bg-opacity-50">50% opacity</div>
<div class="bg-primary bg-opacity-25">25% opacity</div>

<!-- Borders -->
<div class="border">Border on all sides</div>
<div class="border-top">Top border</div>
<div class="border border-primary">Primary border</div>
<div class="border border-3">Thicker border</div>

<!-- Border radius -->
<div class="rounded">Rounded corners</div>
<div class="rounded-circle">Circular</div>
<div class="rounded-pill">Pill shape</div>
```

### Sizing

```html
<!-- Width -->
<div class="w-25">Width 25%</div>
<div class="w-50">Width 50%</div>
<div class="w-75">Width 75%</div>
<div class="w-100">Width 100%</div>
<div class="w-auto">Width auto</div>

<!-- Height -->
<div class="h-25">Height 25%</div>
<div class="h-50">Height 50%</div>
<div class="h-75">Height 75%</div>
<div class="h-100">Height 100%</div>

<!-- Max width/height -->
<div class="mw-100">Max width 100%</div>
<div class="mh-100">Max height 100%</div>

<!-- Viewport width/height -->
<div class="vw-100">Viewport width 100%</div>
<div class="vh-100">Viewport height 100%</div>
```

### Position

```html
<!-- Position utilities -->
<div class="position-static">Static positioning</div>
<div class="position-relative">Relative positioning</div>
<div class="position-absolute">Absolute positioning</div>
<div class="position-fixed">Fixed positioning</div>
<div class="position-sticky">Sticky positioning</div>

<!-- Position values -->
<div class="position-absolute top-0 start-0">Top left</div>
<div class="position-absolute top-0 end-0">Top right</div>
<div class="position-absolute bottom-0 start-0">Bottom left</div>
<div class="position-absolute bottom-0 end-0">Bottom right</div>

<!-- Translate middle -->
<div class="position-absolute top-50 start-50 translate-middle">Centered</div>
```

## Responsive Breakpoints

```css
/* Bootstrap 5 breakpoints */
/* xs: <576px (default, no prefix needed) */
/* sm: ≥576px */
/* md: ≥768px */
/* lg: ≥992px */
/* xl: ≥1200px */
/* xxl: ≥1400px */
```

```html
<!-- Responsive classes examples -->
<div class="col-12 col-md-6 col-lg-4">
  <!-- Full width on mobile, half on tablet, third on desktop -->
</div>

<div class="d-none d-lg-block">
  <!-- Hidden until large screens -->
</div>

<p class="fs-6 fs-md-4 fs-lg-2">
  <!-- Smaller font on mobile, larger on desktop -->
</p>
```

## Customization

### Override Bootstrap Variables

Create custom CSS after Bootstrap:

```css
/* site.css - loaded after bootstrap.min.css */
:root {
  --bs-primary: #7cb3d8;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-danger: #dc3545;
}

/* Override specific components */
.btn-primary {
  background-color: #7cb3d8;
  border-color: #7cb3d8;
}

.btn-primary:hover {
  background-color: #6ca3c8;
  border-color: #6ca3c8;
}
```

### Custom Utility Classes

```css
/* Add custom utilities to site.css */
.text-brand {
  color: #7cb3d8;
}

.bg-calculator {
  background-color: #1e1e1e;
}

.shadow-calculator {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
```

## JavaScript API

### Using Bootstrap Components with JavaScript

```javascript
// Initialize tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

// Show/hide modal programmatically
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
myModal.show();
myModal.hide();

// Alert close event
const alertElement = document.getElementById('myAlert');
alertElement.addEventListener('closed.bs.alert', () => {
  console.log('Alert closed');
});

// Collapse toggle
const collapseElement = document.getElementById('myCollapse');
const collapse = new bootstrap.Collapse(collapseElement);
collapse.toggle();
```

## Best Practices

### Use Bootstrap for Layout, Custom CSS for Styling

```html
<!-- Good: Bootstrap for structure, custom classes for appearance -->
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="calculator">
        <!-- Custom styled calculator -->
      </div>
    </div>
  </div>
</div>
```

### Don't Fight Bootstrap

```css
/* Avoid: Overriding too much Bootstrap */
.container {
  max-width: 100% !important; /* Fighting Bootstrap */
  padding: 0 !important;
}

/* Good: Use Bootstrap's built-in options */
/* Use container-fluid instead */
```

### Accessibility

```html
<!-- Always include proper ARIA attributes -->
<button type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        aria-label="Open calculator settings">
  Settings
</button>

<div class="modal fade"
     id="myModal"
     tabindex="-1"
     aria-labelledby="myModalLabel"
     aria-hidden="true">
  <!-- Modal content -->
</div>
```

## Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Cheat Sheet](https://bootstrap-cheatsheet.themeselection.com/)
