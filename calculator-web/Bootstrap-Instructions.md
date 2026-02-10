# Bootstrap Instructions

## Overview
Bootstrap is the world's most popular CSS framework for building responsive, mobile-first websites. It provides pre-built components, a grid system, and utilities.

## Installation

### CDN
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

### Local (Already included in project)
```html
<link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css">
<script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

## Grid System

### Container
```html
<!-- Fixed width container -->
<div class="container">Content</div>

<!-- Fluid container (full width) -->
<div class="container-fluid">Content</div>

<!-- Responsive container -->
<div class="container-sm">100% wide until sm breakpoint</div>
<div class="container-md">100% wide until md breakpoint</div>
<div class="container-lg">100% wide until lg breakpoint</div>
<div class="container-xl">100% wide until xl breakpoint</div>
<div class="container-xxl">100% wide until xxl breakpoint</div>
```

### Grid Rows and Columns
```html
<div class="container">
    <div class="row">
        <!-- Equal width columns -->
        <div class="col">Column 1</div>
        <div class="col">Column 2</div>
        <div class="col">Column 3</div>
    </div>

    <div class="row">
        <!-- Specific width (12 column system) -->
        <div class="col-4">4 columns wide</div>
        <div class="col-8">8 columns wide</div>
    </div>

    <div class="row">
        <!-- Responsive columns -->
        <div class="col-12 col-md-6 col-lg-4">
            <!-- Full width on mobile, half on tablet, third on desktop -->
        </div>
    </div>
</div>
```

### Breakpoints
- `xs` - Extra small (< 576px) - default
- `sm` - Small (≥ 576px)
- `md` - Medium (≥ 768px)
- `lg` - Large (≥ 992px)
- `xl` - Extra large (≥ 1200px)
- `xxl` - Extra extra large (≥ 1400px)

### Column Examples
```html
<div class="row">
    <!-- Auto-layout -->
    <div class="col">Auto width</div>
    <div class="col">Auto width</div>
</div>

<div class="row">
    <!-- Mix fixed and auto -->
    <div class="col-6">Half width</div>
    <div class="col">Remaining space</div>
</div>

<div class="row">
    <!-- Offset -->
    <div class="col-4 offset-4">Centered 4 columns</div>
</div>

<div class="row">
    <!-- Order -->
    <div class="col order-3">First in DOM, third visually</div>
    <div class="col order-1">Second in DOM, first visually</div>
    <div class="col order-2">Third in DOM, second visually</div>
</div>
```

## Typography

### Headings
```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>

<!-- Display headings (larger) -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>

<!-- Lead paragraph -->
<p class="lead">This is a lead paragraph.</p>
```

### Text Utilities
```html
<!-- Alignment -->
<p class="text-start">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-end">Right aligned</p>

<!-- Transform -->
<p class="text-lowercase">LOWERCASE TEXT</p>
<p class="text-uppercase">uppercase text</p>
<p class="text-capitalize">capitalize text</p>

<!-- Weight and style -->
<p class="fw-bold">Bold text</p>
<p class="fw-normal">Normal weight</p>
<p class="fst-italic">Italic text</p>

<!-- Colors -->
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
<p class="text-warning">Warning text</p>
<p class="text-info">Info text</p>
<p class="text-muted">Muted text</p>
```

## Buttons

### Basic Buttons
```html
<!-- Solid buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<!-- Outline buttons -->
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>

<!-- Sizes -->
<button type="button" class="btn btn-primary btn-lg">Large</button>
<button type="button" class="btn btn-primary">Normal</button>
<button type="button" class="btn btn-primary btn-sm">Small</button>

<!-- Block button (full width) -->
<button type="button" class="btn btn-primary w-100">Block Button</button>

<!-- Disabled -->
<button type="button" class="btn btn-primary" disabled>Disabled</button>
```

### Button Groups
```html
<div class="btn-group" role="group">
    <button type="button" class="btn btn-primary">Left</button>
    <button type="button" class="btn btn-primary">Middle</button>
    <button type="button" class="btn btn-primary">Right</button>
</div>
```

## Forms

### Form Controls
```html
<form>
    <!-- Text input -->
    <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Enter username">
    </div>

    <!-- Email input -->
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
    </div>

    <!-- Password -->
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password">
    </div>

    <!-- Select -->
    <div class="mb-3">
        <label for="country" class="form-label">Country</label>
        <select class="form-select" id="country">
            <option selected>Choose...</option>
            <option value="1">USA</option>
            <option value="2">UK</option>
        </select>
    </div>

    <!-- Textarea -->
    <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" rows="3"></textarea>
    </div>

    <!-- Checkbox -->
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">Remember me</label>
    </div>

    <!-- Radio buttons -->
    <div class="mb-3">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="gender" id="male" value="male">
            <label class="form-check-label" for="male">Male</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="gender" id="female" value="female">
            <label class="form-check-label" for="female">Female</label>
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Form Validation
```html
<form class="needs-validation" novalidate>
    <div class="mb-3">
        <label for="validationCustom01" class="form-label">First name</label>
        <input type="text" class="form-control" id="validationCustom01" required>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">Please provide a first name.</div>
    </div>

    <button class="btn btn-primary" type="submit">Submit</button>
</form>

<script>
// Enable Bootstrap validation
(function() {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();
</script>
```

### Input Groups
```html
<!-- Prepend text -->
<div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Username">
</div>

<!-- Append text -->
<div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Amount">
    <span class="input-group-text">.00</span>
</div>

<!-- Button addon -->
<div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Search">
    <button class="btn btn-primary" type="button">Go</button>
</div>
```

## Cards

```html
<!-- Basic card -->
<div class="card" style="width: 18rem;">
    <img src="image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Card description goes here.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

<!-- Card with header and footer -->
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">
        <h5 class="card-title">Title</h5>
        <p class="card-text">Content</p>
    </div>
    <div class="card-footer text-muted">Footer</div>
</div>
```

## Alerts

```html
<div class="alert alert-primary" role="alert">
    A simple primary alert
</div>

<div class="alert alert-success" role="alert">
    A success message!
</div>

<div class="alert alert-danger" role="alert">
    An error occurred!
</div>

<!-- Dismissible alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    A warning message!
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

## Modals

```html
<!-- Button trigger -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                Modal content goes here...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

## Navigation

### Navbar
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### Tabs
```html
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#home">Home</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile">Profile</button>
    </li>
</ul>

<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home">Home content</div>
    <div class="tab-pane fade" id="profile">Profile content</div>
</div>
```

## Utilities

### Spacing
```html
<!-- Margin -->
<div class="m-3">Margin on all sides</div>
<div class="mt-3">Margin top</div>
<div class="mb-3">Margin bottom</div>
<div class="ms-3">Margin start (left)</div>
<div class="me-3">Margin end (right)</div>
<div class="mx-3">Margin horizontal</div>
<div class="my-3">Margin vertical</div>

<!-- Padding -->
<div class="p-3">Padding on all sides</div>
<div class="pt-3">Padding top</div>

<!-- Sizes: 0, 1, 2, 3, 4, 5, auto -->
```

### Display
```html
<div class="d-none">Hidden</div>
<div class="d-block">Block</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline block</div>
<div class="d-flex">Flexbox</div>
<div class="d-grid">Grid</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>
```

### Flexbox
```html
<div class="d-flex justify-content-center align-items-center" style="height: 200px;">
    <div>Centered content</div>
</div>

<!-- justify-content: start, center, end, between, around, evenly -->
<!-- align-items: start, center, end, baseline, stretch -->
<!-- flex-direction: row, row-reverse, column, column-reverse -->
```

### Colors
```html
<!-- Background -->
<div class="bg-primary text-white">Primary background</div>
<div class="bg-success text-white">Success background</div>
<div class="bg-danger text-white">Danger background</div>

<!-- Text color -->
<p class="text-primary">Primary text</p>
<p class="text-success">Success text</p>
```

### Borders
```html
<div class="border">All borders</div>
<div class="border-top">Top border</div>
<div class="border-0">No border</div>
<div class="rounded">Rounded corners</div>
<div class="rounded-circle">Circle</div>
```

### Shadows
```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Regular shadow</div>
<div class="shadow-lg">Large shadow</div>
```

## Calculator Form Example with Bootstrap

```html
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">Calculator</h4>
                </div>
                <div class="card-body">
                    <form id="calculatorForm">
                        <div class="mb-3">
                            <label for="number1" class="form-label">First Number</label>
                            <input type="number" class="form-control" id="number1" name="number1" step="any" required>
                        </div>

                        <div class="mb-3">
                            <label for="operation" class="form-label">Operation</label>
                            <select class="form-select" id="operation" name="operation" required>
                                <option value="">Choose...</option>
                                <option value="add">Add (+)</option>
                                <option value="subtract">Subtract (-)</option>
                                <option value="multiply">Multiply (×)</option>
                                <option value="divide">Divide (÷)</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="number2" class="form-label">Second Number</label>
                            <input type="number" class="form-control" id="number2" name="number2" step="any" required>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary btn-lg">Calculate</button>
                        </div>
                    </form>

                    <div id="result" class="mt-4"></div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Best Practices

1. **Use the Grid System**: Plan your layout with rows and columns
2. **Mobile First**: Design for mobile, then add breakpoints for larger screens
3. **Use Utility Classes**: Leverage Bootstrap's utilities before writing custom CSS
4. **Consistent Spacing**: Use Bootstrap's spacing scale (0-5)
5. **Semantic Colors**: Use contextual colors (primary, success, danger)
6. **Accessibility**: Use proper ARIA attributes and roles
7. **Don't Override Core**: Customize through variables, not by overriding CSS
8. **Use Components**: Leverage pre-built components for consistency
9. **Responsive Images**: Use `img-fluid` class for responsive images
10. **Test Breakpoints**: Check your design at all breakpoint sizes

## Customization

### Custom CSS (Override Bootstrap)
```css
/* Override Bootstrap variables before importing */
:root {
    --bs-primary: #custom-color;
    --bs-font-sans-serif: 'Custom Font', system-ui;
}

/* Add custom styles after Bootstrap */
.custom-button {
    /* Your styles */
}
```

## Resources
- Official Documentation: https://getbootstrap.com/
- Examples: https://getbootstrap.com/docs/5.3/examples/
- Icons (Bootstrap Icons): https://icons.getbootstrap.com/
- Themes: https://themes.getbootstrap.com/
