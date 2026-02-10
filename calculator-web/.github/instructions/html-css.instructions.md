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
  - task: "create HTML/CSS instructions"
    duration: "00:00:18"
total_duration: "00:00:58"
ai_log: "ai-logs/2026/02/10/frontend-tech-instructions-20260210/conversation.md"
source: "GitHub Copilot"
applyTo: "**/*.html, **/*.cshtml, **/*.css"
---

# HTML5 and CSS3 Instructions

## Overview

This document defines HTML5 and CSS3 best practices for the calculator-web project. These standards ensure semantic markup, accessibility, responsive design, and maintainable stylesheets.

## HTML5 Best Practices

### Semantic Markup

Use semantic HTML5 elements to improve accessibility and SEO:

```html
<!-- Good: Semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Calculator</h1>
    <section class="calculator-container">
      <!-- Calculator content -->
    </section>
  </article>
</main>

<footer>
  <p>&copy; 2026 Calculator App</p>
</footer>

<!-- Avoid: Non-semantic divs everywhere -->
<div class="header">
  <div class="nav">...</div>
</div>
```

### Document Structure

**Required elements** in every HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Web-based calculator application">
  <title>Calculator - Home</title>
  <link rel="stylesheet" href="~/css/site.css">
</head>
<body>
  <!-- Content -->
  <script src="~/js/site.js"></script>
</body>
</html>
```

### Forms and Input

**Best practices for forms:**

```html
<!-- Good: Accessible form with labels -->
<form method="post">
  <div class="form-floating">
    <input type="text"
           id="displayValue"
           name="displayValue"
           class="form-control"
           placeholder="0"
           aria-label="Calculator display"
           readonly>
    <label for="displayValue">Display</label>
  </div>

  <button type="submit"
          class="calc-btn equals"
          aria-label="Calculate result">
    =
  </button>
</form>

<!-- Avoid: Missing labels and accessibility -->
<input type="text" placeholder="0">
<button>=</button>
```

### ARIA Attributes

Use ARIA attributes to enhance accessibility:

```html
<!-- Interactive calculator buttons -->
<button type="button"
        class="calc-btn"
        aria-label="Number seven"
        data-value="7">
  7
</button>

<!-- Live regions for dynamic content -->
<div class="result-display"
     role="status"
     aria-live="polite"
     aria-atomic="true">
  Result: <span id="result">0</span>
</div>

<!-- Error messages -->
<div class="error-display"
     role="alert"
     aria-live="assertive">
  Error: Division by zero
</div>
```

### Data Attributes

Use `data-*` attributes for JavaScript hooks:

```html
<!-- Good: Use data attributes -->
<button class="calc-btn operator"
        data-operation="add"
        data-value="+">
  +
</button>

<!-- Avoid: Using classes for JavaScript hooks -->
<button class="calc-btn operator add-operation">
  +
</button>
```

### Button Types

Always specify button types to prevent unexpected form submissions:

```html
<!-- Good: Explicit type -->
<button type="button" class="calc-btn">7</button>
<button type="submit" class="calc-btn equals">=</button>

<!-- Avoid: Default button (submits form) -->
<button class="calc-btn">7</button>
```

## CSS3 Best Practices

### File Organization

**Structure your CSS files logically:**

```css
/* 1. CSS Variables / Custom Properties */
:root {
  --primary-bg: #1e1e1e;
  --secondary-bg: #202020;
  --accent-color: #7cb3d8;
  --text-color: #ffffff;
  --border-radius: 8px;
}

/* 2. Reset / Base Styles */
html {
  font-size: 14px;
}

/* 3. Layout Components */
.calculator-container {
  display: flex;
  min-height: 80vh;
}

/* 4. UI Components */
.calc-btn {
  background-color: var(--secondary-bg);
  border-radius: var(--border-radius);
}

/* 5. Utilities */
.text-center {
  text-align: center;
}

/* 6. Media Queries */
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
```

### CSS Custom Properties

Use CSS custom properties for theming and consistency:

```css
/* Good: CSS variables for reusability */
:root {
  --calculator-bg: #202020;
  --display-bg: #1a1a1a;
  --button-bg: #3a3a3a;
  --button-hover: #4a4a4a;
  --accent-primary: #7cb3d8;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 20px;
}

.calculator {
  background-color: var(--calculator-bg);
  padding: var(--spacing-md);
}

.calc-btn {
  background-color: var(--button-bg);
  gap: var(--spacing-sm);
}

.calc-btn:hover {
  background-color: var(--button-hover);
}
```

### Modern Layout Techniques

**Use Flexbox and Grid for layouts:**

```css
/* Grid for calculator buttons */
.button-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

/* Flexbox for centering */
.calculator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Avoid: Floats and absolute positioning for layout */
.button-row {
  float: left;
  width: 25%;
}
```

### Responsive Design

**Mobile-first approach with media queries:**

```css
/* Mobile-first: Base styles for small screens */
html {
  font-size: 14px;
}

.calculator {
  width: 100%;
  max-width: 360px;
}

/* Tablet and up */
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .calculator {
    max-width: 400px;
  }
}
```

### Naming Conventions

**Use BEM (Block Element Modifier) or consistent class naming:**

```css
/* BEM Pattern */
.calculator { }                    /* Block */
.calculator__display { }           /* Element */
.calculator__button { }            /* Element */
.calculator__button--operator { }  /* Modifier */

/* Or descriptive naming */
.calculator-container { }
.display { }
.calc-btn { }
.calc-btn.operator { }
.calc-btn.equals { }
```

### Transitions and Animations

Use CSS transitions for smooth interactions:

```css
/* Good: Smooth transitions */
.calc-btn {
  background-color: #3a3a3a;
  transition: background-color 0.2s ease;
}

.calc-btn:hover {
  background-color: #4a4a4a;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Accessibility in CSS

```css
/* Focus styles for keyboard navigation */
.btn:focus,
.form-control:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .calc-btn {
    border: 2px solid currentColor;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  /* Already dark by default, but could adjust */
}
```

### Browser Compatibility

Use vendor prefixes when necessary (or use autoprefixer):

```css
/* Good: Include vendor prefixes for newer features */
.calculator {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

/* Modern approach: Use PostCSS autoprefixer */
.calculator {
  display: flex;  /* Autoprefixer adds prefixes during build */
}
```

### Performance

**Optimize CSS for performance:**

```css
/* Good: Efficient selectors */
.calc-btn { }
.calc-btn:hover { }

/* Avoid: Overly specific selectors */
body main .calculator-container .button-row .calc-btn { }

/* Good: Use transform for animations (GPU accelerated) */
.memory-notification {
  transform: translateX(100px);
  transition: transform 0.3s ease;
}

.memory-notification.show {
  transform: translateX(0);
}

/* Avoid: Animating layout properties */
.memory-notification {
  right: -100px;
  transition: right 0.3s ease;
}
```

## Razor Pages Integration

### Razor Syntax in HTML

**Use Razor syntax for dynamic content:**

```html
<!-- Conditional rendering -->
@if (Model.HasError)
{
    <div class="error-display" role="alert">
        <p>@Model.ErrorMessage</p>
    </div>
}

<!-- Loop rendering -->
@foreach (var item in Model.HistoryItems)
{
    <div class="history-item">
        <div class="history-expression">@item.Expression</div>
        <div class="history-result">@item.Result</div>
    </div>
}

<!-- Form helpers -->
<form method="post">
    <input asp-for="DisplayValue" class="form-control" />
    <span asp-validation-for="DisplayValue" class="text-danger"></span>
    <button type="submit" asp-page-handler="Calculate">Calculate</button>
</form>
```

### Tag Helpers

Use ASP.NET Core Tag Helpers for cleaner markup:

```html
<!-- Good: Tag helpers -->
<link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
<script src="~/js/site.js" asp-append-version="true"></script>
<a asp-page="/Index" class="nav-link">Home</a>
<img src="~/images/logo.png" asp-append-version="true" alt="Logo" />

<!-- Avoid: Manual path resolution -->
<link rel="stylesheet" href="/css/site.css?v=123" />
```

## Validation

### HTML Validation

- Use the [W3C Markup Validation Service](https://validator.w3.org/)
- Ensure all tags are properly closed
- No duplicate IDs
- Valid attribute values

### CSS Validation

- Use the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
- Check for typos in property names
- Validate color values and units
- Remove unused CSS

### Accessibility Testing

- Use browser DevTools Accessibility inspector
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation
- Check color contrast ratios (WCAG AA minimum 4.5:1)

## Common Patterns

### Calculator Display

```html
<div class="display">
  <input type="text"
         id="displayValue"
         class="form-control"
         value="0"
         readonly
         aria-label="Calculator display">
</div>
```

```css
.display input {
  width: 100%;
  height: 80px;
  background-color: #1a1a1a;
  color: white;
  font-size: 48px;
  text-align: right;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 8px;
}
```

### Button Grid

```html
<div class="button-row">
  <button type="button" class="calc-btn" data-value="7">7</button>
  <button type="button" class="calc-btn" data-value="8">8</button>
  <button type="button" class="calc-btn" data-value="9">9</button>
  <button type="button" class="calc-btn operator" data-operation="divide">÷</button>
</div>
```

```css
.button-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 6px;
}

.calc-btn {
  background-color: #3a3a3a;
  border: none;
  color: white;
  padding: 20px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}
```

## Resources

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Can I Use](https://caniuse.com/) - Browser compatibility tables
- [CSS Tricks](https://css-tricks.com/) - CSS tutorials and guides
