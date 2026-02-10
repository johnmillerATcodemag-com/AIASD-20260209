# HTML & CSS Instructions

## Overview
HTML (HyperText Markup Language) provides the structure of web pages, while CSS (Cascading Style Sheets) handles the visual presentation and layout.

## HTML Basics

### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="~/css/site.css">
</head>
<body>
    <header>
        <h1>Website Header</h1>
    </header>

    <main>
        <section>
            <h2>Section Title</h2>
            <p>Content goes here...</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Company Name</p>
    </footer>

    <script src="~/js/site.js"></script>
</body>
</html>
```

### Common HTML Elements

#### Text Content
```html
<!-- Headings -->
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Title</h3>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Text Formatting -->
<strong>Bold text</strong>
<em>Italic text</em>
<mark>Highlighted text</mark>
<small>Small text</small>

<!-- Lists -->
<ul>
    <li>Unordered list item</li>
    <li>Another item</li>
</ul>

<ol>
    <li>Ordered list item</li>
    <li>Second item</li>
</ol>
```

#### Links and Navigation
```html
<!-- Basic link -->
<a href="https://example.com">Visit Example</a>

<!-- Link with target -->
<a href="page.html" target="_blank">Open in new tab</a>

<!-- Email link -->
<a href="mailto:info@example.com">Contact Us</a>

<!-- Navigation -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

#### Forms
```html
<form action="/submit" method="post">
    <!-- Text Input -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <!-- Password -->
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <!-- Email -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <!-- Number -->
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="0" max="120">

    <!-- Textarea -->
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>

    <!-- Select Dropdown -->
    <label for="country">Country:</label>
    <select id="country" name="country">
        <option value="">Select...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
    </select>

    <!-- Checkbox -->
    <label>
        <input type="checkbox" name="subscribe" value="yes">
        Subscribe to newsletter
    </label>

    <!-- Radio Buttons -->
    <fieldset>
        <legend>Gender:</legend>
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
    </fieldset>

    <!-- Submit Button -->
    <button type="submit">Submit</button>
</form>
```

#### Tables
```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>30</td>
            <td>New York</td>
        </tr>
        <tr>
            <td>Jane Smith</td>
            <td>25</td>
            <td>London</td>
        </tr>
    </tbody>
</table>
```

#### Images and Media
```html
<!-- Image -->
<img src="/images/photo.jpg" alt="Description" width="300" height="200">

<!-- Responsive Image -->
<img src="/images/photo.jpg" alt="Description" class="img-fluid">

<!-- Figure with Caption -->
<figure>
    <img src="/images/photo.jpg" alt="Description">
    <figcaption>Image caption</figcaption>
</figure>

<!-- Video -->
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Semantic HTML5 Elements
```html
<header>Site header</header>
<nav>Navigation menu</nav>
<main>Main content</main>
<article>Independent content</article>
<section>Thematic grouping</section>
<aside>Sidebar content</aside>
<footer>Site footer</footer>
```

## CSS Basics

### Including CSS

#### External Stylesheet (Recommended)
```html
<link rel="stylesheet" href="~/css/site.css">
```

#### Internal Styles
```html
<style>
    body { font-family: Arial, sans-serif; }
</style>
```

#### Inline Styles (Not Recommended)
```html
<p style="color: blue;">Blue text</p>
```

### CSS Selectors

```css
/* Element Selector */
p { color: black; }

/* Class Selector */
.button { background-color: blue; }

/* ID Selector */
#header { height: 100px; }

/* Descendant Selector */
div p { margin: 10px; }

/* Child Selector */
div > p { padding: 5px; }

/* Multiple Selectors */
h1, h2, h3 { font-family: 'Arial', sans-serif; }

/* Attribute Selector */
input[type="text"] { border: 1px solid #ccc; }

/* Pseudo-classes */
a:hover { color: red; }
a:visited { color: purple; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
li:nth-child(odd) { background-color: #f9f9f9; }

/* Pseudo-elements */
p::first-line { font-weight: bold; }
p::before { content: "→ "; }
```

### Box Model
```css
.box {
    /* Content dimensions */
    width: 300px;
    height: 200px;

    /* Padding (space inside border) */
    padding: 20px;
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;

    /* Border */
    border: 2px solid #333;
    border-radius: 5px;

    /* Margin (space outside border) */
    margin: 10px;
    margin: 10px 20px; /* vertical horizontal */
    margin: 10px 20px 15px 25px; /* top right bottom left */
}

/* Box sizing */
* {
    box-sizing: border-box; /* Include padding and border in width/height */
}
```

### Typography
```css
body {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 16px;
    font-weight: 400; /* 100-900 or normal, bold */
    font-style: normal; /* normal, italic */
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: left; /* left, center, right, justify */
    text-decoration: none; /* none, underline, line-through */
    text-transform: uppercase; /* uppercase, lowercase, capitalize */
    color: #333;
}
```

### Colors
```css
.element {
    /* Named colors */
    color: red;

    /* Hexadecimal */
    color: #ff0000;
    color: #f00; /* Shorthand */

    /* RGB */
    color: rgb(255, 0, 0);

    /* RGBA (with transparency) */
    color: rgba(255, 0, 0, 0.5);

    /* HSL */
    color: hsl(0, 100%, 50%);

    /* HSLA (with transparency) */
    color: hsla(0, 100%, 50%, 0.5);
}
```

### Layout

#### Display Property
```css
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.none { display: none; } /* Hide element */
.flex { display: flex; }
.grid { display: grid; }
```

#### Flexbox
```css
.container {
    display: flex;
    flex-direction: row; /* row, column, row-reverse, column-reverse */
    justify-content: center; /* flex-start, center, flex-end, space-between, space-around */
    align-items: center; /* flex-start, center, flex-end, stretch */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    gap: 10px;
}

.item {
    flex: 1; /* flex-grow flex-shrink flex-basis */
    order: 2; /* Change visual order */
}
```

#### Grid
```css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
    grid-template-columns: repeat(3, 1fr); /* Same as above */
    grid-template-rows: 100px auto 100px;
    gap: 20px;
    grid-gap: 20px; /* Older syntax */
}

.grid-item {
    grid-column: 1 / 3; /* Span from column 1 to 3 */
    grid-row: 1 / 2;
}
```

#### Positioning
```css
.static { position: static; } /* Default */

.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
}

.sticky {
    position: sticky;
    top: 0;
}
```

### Responsive Design

#### Media Queries
```css
/* Mobile First Approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablets */
@media (min-width: 768px) {
    .container {
        width: 750px;
        padding: 20px;
    }
}

/* Desktop */
@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}

/* Large Desktop */
@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}

/* Print Styles */
@media print {
    .no-print { display: none; }
}
```

#### Responsive Units
```css
/* Viewport units */
.hero { height: 100vh; } /* 100% of viewport height */
.sidebar { width: 20vw; } /* 20% of viewport width */

/* Relative units */
.text { font-size: 1.5rem; } /* Relative to root font-size */
.box { padding: 2em; } /* Relative to element's font-size */
.small { font-size: 80%; } /* Relative to parent */
```

### Common Patterns

#### Button Styles
```css
.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.btn:active {
    transform: translateY(1px);
}
```

#### Card Component
```css
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

#### Centering
```css
/* Horizontal center (block) */
.center-block {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

/* Center with Flexbox */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Absolute center */
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## Best Practices

1. **Use Semantic HTML**: Choose elements that describe content meaning
2. **Validate Your HTML**: Use W3C validator
3. **Separate Concerns**: Keep HTML structure, CSS styling, and JS behavior separate
4. **Mobile First**: Design for mobile, then enhance for larger screens
5. **Accessibility**: Use proper headings, alt text, ARIA labels
6. **Use Classes Over IDs**: More reusable and lower specificity
7. **DRY CSS**: Don't Repeat Yourself - reuse classes
8. **Organize CSS**: Group related rules, use comments
9. **Optimize Performance**: Minimize CSS, use efficient selectors
10. **Use CSS Variables**: For maintainable themes

### CSS Variables Example
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-family: 'Arial', sans-serif;
    --spacing-unit: 8px;
}

.button {
    background-color: var(--primary-color);
    font-family: var(--font-family);
    padding: calc(var(--spacing-unit) * 2);
}
```

## Resources
- MDN HTML Reference: https://developer.mozilla.org/en-US/docs/Web/HTML
- MDN CSS Reference: https://developer.mozilla.org/en-US/docs/Web/CSS
- W3C Validator: https://validator.w3.org/
- Can I Use: https://caniuse.com/
- CSS Tricks: https://css-tricks.com/
