# JavaScript Instructions

## Overview
JavaScript is a high-level, interpreted programming language that enables interactive web pages and dynamic client-side functionality.

## Including JavaScript

### External File (Recommended)
```html
<!-- In <head> with defer -->
<script src="~/js/site.js" defer></script>

<!-- Before closing </body> -->
<script src="~/js/site.js"></script>
```

### Inline Script
```html
<script>
    console.log('Hello, World!');
</script>
```

### Script Attributes
```html
<!-- defer: Load script after HTML parsing -->
<script src="script.js" defer></script>

<!-- async: Load script asynchronously -->
<script src="script.js" async></script>
```

## Variables and Data Types

### Variable Declaration
```javascript
// const - cannot be reassigned (use by default)
const PI = 3.14159;

// let - can be reassigned (block scope)
let count = 0;
count = 1;

// var - old way (function scope, avoid)
var oldStyle = 'deprecated';
```

### Data Types
```javascript
// String
const name = "John Doe";
const greeting = 'Hello';
const template = `Hello, ${name}!`; // Template literal

// Number
const integer = 42;
const decimal = 3.14;
const negative = -10;

// Boolean
const isActive = true;
const isComplete = false;

// Null and Undefined
const empty = null;
let notDefined; // undefined

// Object
const person = {
    name: "John",
    age: 30,
    email: "john@example.com"
};

// Array
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, { id: 3 }];

// Function
function greet(name) {
    return `Hello, ${name}!`;
}
```

## Operators

### Arithmetic
```javascript
let sum = 5 + 3;        // 8
let diff = 5 - 3;       // 2
let product = 5 * 3;    // 15
let quotient = 5 / 3;   // 1.6667
let remainder = 5 % 3;  // 2
let power = 5 ** 3;     // 125

// Increment/Decrement
let x = 5;
x++;  // 6
x--;  // 5
```

### Comparison
```javascript
5 == "5"    // true (loose equality)
5 === "5"   // false (strict equality)
5 != "6"    // true
5 !== "5"   // true
5 > 3       // true
5 < 3       // false
5 >= 5      // true
5 <= 3      // false
```

### Logical
```javascript
true && false   // false (AND)
true || false   // true (OR)
!true          // false (NOT)
```

## Control Flow

### If/Else
```javascript
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}

// Ternary operator
const status = age >= 18 ? "Adult" : "Minor";
```

### Switch
```javascript
switch (day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("End of week");
        break;
    default:
        console.log("Midweek");
}
```

### Loops
```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// Do-While loop
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// For...of (arrays)
const arr = [1, 2, 3];
for (const item of arr) {
    console.log(item);
}

// For...in (objects)
const obj = { a: 1, b: 2 };
for (const key in obj) {
    console.log(key, obj[key]);
}
```

## Functions

### Function Declaration
```javascript
function add(a, b) {
    return a + b;
}
```

### Function Expression
```javascript
const add = function(a, b) {
    return a + b;
};
```

### Arrow Functions
```javascript
// Single expression
const add = (a, b) => a + b;

// Multiple statements
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Single parameter
const square = x => x * x;

// No parameters
const sayHello = () => console.log("Hello");
```

### Default Parameters
```javascript
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
```

### Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10
```

## Objects

### Creating Objects
```javascript
// Object literal
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return `${this.firstName} ${this.lastName}`;
    }
};

// Constructor
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
const john = new Person("John", "Doe");
```

### Accessing Properties
```javascript
// Dot notation
person.firstName;

// Bracket notation
person["firstName"];

// Dynamic property
const prop = "firstName";
person[prop];
```

### Object Methods
```javascript
const person = {
    name: "John",
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Object.keys, values, entries
Object.keys(person);     // ["name", "greet"]
Object.values(person);   // ["John", function]
Object.entries(person);  // [["name", "John"], ["greet", function]]
```

### Destructuring
```javascript
const person = { name: "John", age: 30, city: "New York" };

// Object destructuring
const { name, age } = person;

// Array destructuring
const [first, second] = [1, 2, 3];
```

### Spread Operator
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combined = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

const arr = [1, 2, 3];
const extended = [...arr, 4, 5]; // [1, 2, 3, 4, 5]
```

## Arrays

### Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// Add/Remove elements
numbers.push(6);           // Add to end
numbers.pop();             // Remove from end
numbers.unshift(0);        // Add to start
numbers.shift();           // Remove from start
numbers.splice(2, 1);      // Remove at index

// Iteration
numbers.forEach(num => console.log(num));

// Transformation
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((total, num) => total + num, 0);

// Search
const found = numbers.find(num => num > 3);      // First match
const index = numbers.findIndex(num => num > 3); // Index of first match
const has = numbers.includes(3);                 // true/false
const idx = numbers.indexOf(3);                  // Index or -1

// Other useful methods
const sliced = numbers.slice(1, 3);  // [2, 3]
const joined = numbers.join(", ");   // "1, 2, 3, 4, 5"
const sorted = numbers.sort((a, b) => a - b);
const reversed = numbers.reverse();
```

## DOM Manipulation

### Selecting Elements
```javascript
// Get single element
const element = document.getElementById("myId");
const element = document.querySelector(".myClass");
const element = document.querySelector("#myId");

// Get multiple elements
const elements = document.getElementsByClassName("myClass");
const elements = document.getElementsByTagName("div");
const elements = document.querySelectorAll(".myClass");
```

### Modifying Content
```javascript
// Text content
element.textContent = "New text";
element.innerText = "New text";

// HTML content
element.innerHTML = "<strong>Bold text</strong>";

// Attributes
element.setAttribute("data-id", "123");
element.getAttribute("data-id");
element.removeAttribute("data-id");

// Properties
element.id = "newId";
element.className = "new-class";
element.value = "input value";
```

### Styling
```javascript
// Inline styles
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.display = "none";

// CSS classes
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
element.classList.contains("active");
```

### Creating and Removing Elements
```javascript
// Create
const newDiv = document.createElement("div");
newDiv.textContent = "Hello";
newDiv.className = "message";

// Add to DOM
parent.appendChild(newDiv);
parent.insertBefore(newDiv, referenceNode);

// Remove
element.remove();
parent.removeChild(element);
```

## Events

### Event Listeners
```javascript
// Add event listener
element.addEventListener("click", function(event) {
    console.log("Clicked!");
});

// Arrow function
element.addEventListener("click", (event) => {
    console.log("Clicked!");
});

// Remove event listener
function handleClick(event) {
    console.log("Clicked!");
}
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);
```

### Common Events
```javascript
// Mouse events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("mousemove", handler);

// Keyboard events
element.addEventListener("keydown", handler);
element.addEventListener("keyup", handler);
element.addEventListener("keypress", handler);

// Form events
form.addEventListener("submit", handler);
input.addEventListener("change", handler);
input.addEventListener("input", handler);
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);

// Window events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);
```

### Event Object
```javascript
element.addEventListener("click", function(event) {
    event.preventDefault();      // Prevent default behavior
    event.stopPropagation();     // Stop event bubbling

    console.log(event.type);     // "click"
    console.log(event.target);   // Element that triggered event
    console.log(event.currentTarget); // Element with listener
});
```

### Form Handling
```javascript
const form = document.querySelector("#myForm");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log(data);

    // Or access individual fields
    const email = form.elements["email"].value;
});
```

## Asynchronous JavaScript

### Callbacks
```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((data) => {
    console.log(data);
});
```

### Promises
```javascript
const promise = new Promise((resolve, reject) => {
    if (success) {
        resolve("Success!");
    } else {
        reject("Error!");
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));
```

### Async/Await
```javascript
async function fetchData() {
    try {
        const response = await fetch("/api/data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Using the async function
fetchData().then(data => console.log(data));
```

### Fetch API
```javascript
// GET request
fetch("/api/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// POST request
fetch("/api/data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: "John" })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

## Error Handling

```javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
} catch (error) {
    console.error("Error:", error.message);
} finally {
    // Always executes
    console.log("Cleanup");
}

// Throw custom errors
throw new Error("Something went wrong");
```

## Best Practices

1. **Use const by default**: Only use let when reassignment is needed
2. **Use strict equality**: Always use === instead of ==
3. **Avoid global variables**: Use modules or IIFE
4. **Handle errors**: Use try/catch for async operations
5. **Use meaningful names**: Variables and functions should be descriptive
6. **Keep functions small**: Single responsibility principle
7. **Comment complex logic**: But prefer self-documenting code
8. **Use ES6+ features**: Arrow functions, destructuring, template literals
9. **Validate user input**: Never trust client-side data
10. **Use semicolons**: Avoid automatic semicolon insertion issues

## Common Patterns

### Module Pattern (IIFE)
```javascript
const Calculator = (function() {
    // Private variable
    let result = 0;

    // Private function
    function log(message) {
        console.log(message);
    }

    // Public API
    return {
        add(x) {
            result += x;
            return this;
        },
        subtract(x) {
            result -= x;
            return this;
        },
        getResult() {
            return result;
        }
    };
})();

Calculator.add(5).subtract(2).getResult(); // 3
```

### Event Delegation
```javascript
// Instead of adding listeners to many elements
document.querySelector("#parent").addEventListener("click", function(event) {
    if (event.target.matches(".child-button")) {
        console.log("Button clicked:", event.target);
    }
});
```

## Resources
- MDN JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info/
- Eloquent JavaScript: https://eloquentjavascript.net/
