# Calculator Web App - Project Plan

## Project Overview
A modern web-based calculator application with a C# backend API and React frontend. The calculator will feature a number pad, standard arithmetic operations, and a clean, responsive user interface.

---

## Technical Stack

### Backend
- **Framework**: ASP.NET Core Web API (.NET 8)
- **Language**: C# 12
- **Architecture**: RESTful API
- **Hosting**: Minimal API or Controllers

### Frontend
- **Framework**: React 18 (Functional Components with Hooks)
- **Language**: TypeScript/JavaScript
- **Styling**: Material-UI (MUI)
- **Build Tool**: Vite
- **HTTP Client**: Axios

### Development Tools
- **IDE**: Visual Studio 2022 / VS Code
- **Package Managers**: NuGet (backend), npm (frontend)
- **Version Control**: Git

---

## Application Architecture

```
┌─────────────────────────────────────────┐
│           React Frontend                │
│  ┌─────────────────────────────────┐   │
│  │   Calculator UI Component       │   │
│  │  - Number Pad (0-9)             │   │
│  │  - Operators (+, -, *, /)       │   │
│  │  - Clear/Delete Buttons         │   │
│  │  - Display Screen               │   │
│  └─────────────────────────────────┘   │
└─────────────────┬───────────────────────┘
                  │ HTTP/REST
                  │ JSON
┌─────────────────▼───────────────────────┐
│         ASP.NET Core API                │
│  ┌─────────────────────────────────┐   │
│  │   Calculator Controller/        │   │
│  │   Endpoints                     │   │
│  │  - POST /calculate              │   │
│  │  - GET /operations              │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │   Calculator Service            │   │
│  │  - Add()                        │   │
│  │  - Subtract()                   │   │
│  │  - Multiply()                   │   │
│  │  - Divide()                     │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Core Features

### Calculator Functionality
1. **Basic Operations**
   - Addition (+)
   - Subtraction (-)
   - Multiplication (×)
   - Division (÷)

2. **Input Controls**
   - Number pad (0-9)
   - Decimal point (.)
   - Equals button (=)
   - Clear (C) - Clear all
   - Delete/Backspace (←)

3. **Display**
   - Current input display
   - Previous operation display (optional)
   - Error messages (e.g., "Division by zero")

### User Experience Features
- Responsive design (mobile & desktop)
- Keyboard support
- Visual feedback on button clicks
- Error handling and validation
- Smooth animations

---

## Project Structure

```
buddy-calculator/
├── backend/
│   ├── CalculatorApi/
│   │   ├── Controllers/
│   │   │   └── CalculatorController.cs
│   │   ├── Models/
│   │   │   ├── CalculationRequest.cs
│   │   │   └── CalculationResponse.cs
│   │   ├── Services/
│   │   │   ├── ICalculatorService.cs
│   │   │   └── CalculatorService.cs
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   └── CalculatorApi.csproj
│   └── CalculatorApi.Tests/
│       └── CalculatorServiceTests.cs
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calculator.jsx
│   │   │   ├── Display.jsx
│   │   │   ├── Button.jsx
│   │   │   └── NumberPad.jsx
│   │   ├── services/
│   │   │   └── calculatorApi.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── PROJECT_PLAN.md
└── README.md
```

---

## API Specification

### Endpoint: Calculate Operation

**POST** `/api/calculator/calculate`

**Request Body:**
```json
{
  "operand1": 10,
  "operand2": 5,
  "operation": "add"
}
```

**Response:**
```json
{
  "result": 15,
  "expression": "10 + 5",
  "success": true,
  "error": null
}
```

**Supported Operations:**
- `add` - Addition
- `subtract` - Subtraction
- `multiply` - Multiplication
- `divide` - Division

**Error Response:**
```json
{
  "result": 0,
  "expression": "10 / 0",
  "success": false,
  "error": "Division by zero is not allowed"
}
```

---

## Development Phases

### Phase 1: Backend Setup (Week 1)
- [ ] Create ASP.NET Core Web API project
- [ ] Implement Calculator Service with basic operations
- [ ] Create Calculator Controller/Endpoints
- [ ] Define Request/Response models
- [ ] Add input validation
- [ ] Implement error handling
- [ ] Add unit tests for calculator logic
- [ ] Configure CORS for frontend integration

### Phase 2: Frontend Setup (Week 1-2)
- [ ] Create React project with Vite
- [ ] Set up project structure
- [ ] Install Axios for API calls
- [ ] Configure environment variables
- [ ] Create API service layer

### Phase 3: UI Implementation (Week 2)
- [ ] Create Calculator component (main container)
- [ ] Build Display component
- [ ] Build Button component (reusable)
- [ ] Build NumberPad component
- [ ] Implement operator buttons
- [ ] Add Clear and Delete functionality
- [ ] Style components with CSS

### Phase 4: Integration (Week 2-3)
- [ ] Connect frontend to backend API
- [ ] Implement calculation logic flow
- [ ] Handle API responses
- [ ] Display results
- [ ] Show error messages
- [ ] Add loading states

### Phase 5: Enhancement (Week 3)
- [ ] Add keyboard support
- [ ] Implement button animations
- [ ] Add responsive design
- [ ] Handle edge cases
- [ ] Optimize performance
- [ ] Add accessibility features (ARIA labels)

### Phase 6: Testing & Deployment (Week 4)
- [ ] Backend unit tests
- [ ] Frontend component tests
- [ ] Integration testing
- [ ] Cross-browser testing
- [ ] Documentation
- [ ] Deployment preparation

---

## Implementation Details

### Backend: Calculator Service Logic

```csharp
public class CalculatorService : ICalculatorService
{
    public decimal Add(decimal a, decimal b) => a + b;
    
    public decimal Subtract(decimal a, decimal b) => a - b;
    
    public decimal Multiply(decimal a, decimal b) => a * b;
    
    public decimal Divide(decimal a, decimal b)
    {
        if (b == 0)
            throw new DivideByZeroException("Division by zero is not allowed");
        return a / b;
    }
}
```

### Frontend: Calculator State Management

The calculator will maintain:
- **currentInput**: Current number being entered
- **previousInput**: Previous operand
- **operation**: Selected operation
- **displayValue**: What shows on screen
- **isNewInput**: Whether to clear display on next digit

### User Flow Example

1. User clicks "7" → Display shows "7"
2. User clicks "+" → Stores 7 as previous, sets operation to "add"
3. User clicks "3" → Display shows "3"
4. User clicks "=" → Sends request to API with operand1=7, operand2=3, operation=add
5. API returns result=10
6. Display shows "10"

---

## Key Considerations

### Error Handling
- Division by zero validation
- Invalid input handling
- API connection errors
- Timeout handling

### Performance
- Debounce rapid button clicks
- Async API calls with loading indicators
- Efficient re-rendering with React

### Security
- Input sanitization
- CORS configuration
- Rate limiting (optional)

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode compatibility
- Focus management

---

## Future Enhancements (Optional)

- **Advanced Operations**: Square root, percentage, power
- **History**: Show calculation history
- **Memory Functions**: M+, M-, MR, MC
- **Themes**: Light/dark mode toggle
- **Scientific Mode**: Trigonometric functions, logarithms
- **Persistent State**: Save calculations to local storage
- **Multi-operation**: Handle multiple operations without equals (e.g., 5+3+2)

---

## Success Criteria

✅ All basic arithmetic operations work correctly  
✅ Clean, intuitive user interface  
✅ Responsive on mobile and desktop  
✅ Proper error handling and user feedback  
✅ Backend API is RESTful and well-structured  
✅ Frontend communicates successfully with backend  
✅ Code is well-documented and maintainable  
✅ Basic tests pass for core functionality  

---

## Timeline Summary

- **Week 1**: Backend setup, API implementation, frontend scaffolding
- **Week 2**: UI components, styling, basic integration
- **Week 3**: Full integration, enhancements, polish
- **Week 4**: Testing, bug fixes, documentation, deployment

**Total Estimated Time**: 3-4 weeks for MVP

---

## Getting Started

1. Clone/create the repository
2. Set up backend project: `dotnet new webapi -n CalculatorApi`
3. Set up frontend project: `npm create vite@latest frontend -- --template react`
4. Follow phase-by-phase implementation
5. Test incrementally
6. Deploy when ready

---

## Resources

- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Document Version**: 1.0  
**Last Updated**: February 10, 2026  
**Project Owner**: Buddy T  
