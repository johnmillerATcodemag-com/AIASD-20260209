# Calculator Web Application

A modern, full-stack calculator application built with ASP.NET Core Web API backend and React frontend with Material-UI.

## Features

- ✨ Basic arithmetic operations (addition, subtraction, multiplication, division)
- 🎨 Modern UI with Material-UI components
- ⌨️ Full keyboard support
- 🔄 Real-time calculation via REST API
- 🚀 Fast and responsive
- ♿ Accessible design
- 🎯 Error handling (division by zero, API errors)

## Tech Stack

### Backend
- **Framework**: ASP.NET Core Web API (.NET 8)
- **Language**: C# 12
- **Architecture**: RESTful API with service layer

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)

## Project Structure

```
buddy-calculator/
├── backend/
│   └── CalculatorApi/
│       ├── Controllers/
│       │   └── CalculatorController.cs
│       ├── Models/
│       │   ├── CalculationRequest.cs
│       │   └── CalculationResponse.cs
│       ├── Services/
│       │   ├── ICalculatorService.cs
│       │   └── CalculatorService.cs
│       └── Program.cs
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Calculator.jsx
│       │   ├── Display.jsx
│       │   ├── Button.jsx
│       │   └── NumberPad.jsx
│       ├── services/
│       │   └── calculatorApi.js
│       └── App.jsx
│
├── PROJECT_PLAN.md
└── README.md
```

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/CalculatorApi
   ```

2. Restore dependencies (if needed):
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

   The API will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The app will open in your browser at `http://localhost:5173`

## Running Both Servers

You need to run both the backend and frontend servers simultaneously:

### Option 1: Two Terminal Windows

**Terminal 1 (Backend):**
```bash
cd backend/CalculatorApi
dotnet run
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Option 2: PowerShell Script (Windows)

Create a `start.ps1` file in the root directory:
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/CalculatorApi; dotnet run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

Then run:
```bash
./start.ps1
```

## API Endpoints

### Calculate
**POST** `/api/calculator/calculate`

**Request Body:**
```json
{
  "operand1": 10,
  "operand2": 5,
  "operation": "add"
}
```

**Operations:** `add`, `subtract`, `multiply`, `divide`

**Response (Success):**
```json
{
  "result": 15,
  "expression": "10 + 5",
  "success": true,
  "error": null
}
```

**Response (Error):**
```json
{
  "result": 0,
  "expression": "10 ÷ 0",
  "success": false,
  "error": "Division by zero is not allowed"
}
```

### Health Check
**GET** `/api/calculator/health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-10T12:00:00Z"
}
```

## Usage

### Mouse/Touch
- Click number buttons (0-9) to input numbers
- Click operator buttons (+, -, ×, ÷) to select operation
- Click = to calculate result
- Click C to clear all
- Click ← to delete last digit
- Click . for decimal point

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Calculate**: Enter or =
- **Clear**: Esc or C
- **Delete**: Backspace
- **Decimal**: .

## Features in Detail

### Chain Calculations
The calculator supports chaining operations. For example:
1. Type `5 + 3` and press `+` again
2. Result (8) is automatically calculated and ready for the next operation

### Error Handling
- Division by zero displays an error message
- API connection errors are caught and displayed
- Invalid operations are prevented

### Responsive Design
- Works on desktop and mobile devices
- Touch-friendly buttons
- Clean, modern interface

## Development

### Backend Development
- API follows RESTful conventions
- Uses dependency injection for services
- Includes comprehensive error handling
- Configured CORS for frontend integration

### Frontend Development
- Built with React functional components and hooks
- Material-UI for consistent, accessible UI
- Axios for API communication
- State management with useState and useEffect

## Testing

### Test Backend
```bash
cd backend/CalculatorApi
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"operand1": 10, "operand2": 5, "operation": "add"}'
```

Or use the health check endpoint:
```bash
curl http://localhost:5000/api/calculator/health
```

### Test Frontend
1. Open browser to `http://localhost:5173`
2. Perform calculations using mouse or keyboard
3. Verify results are correct

## Troubleshooting

### Backend Issues
- **Port already in use**: Change port in `Properties/launchSettings.json`
- **CORS errors**: Verify frontend URL in `Program.cs` CORS configuration

### Frontend Issues
- **API connection failed**: Ensure backend is running on port 5000
- **Dependencies missing**: Run `npm install` again
- **Port 5173 in use**: Vite will automatically use next available port

## Future Enhancements

- [ ] Scientific calculator mode
- [ ] Calculation history
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] Dark/light theme toggle
- [ ] Unit tests for backend and frontend
- [ ] Persistent state (localStorage)
- [ ] Percentage calculations
- [ ] Square root and power operations

## License

MIT License - feel free to use this project for learning and development.

## Author

Buddy T - February 2026
