# Copilot Usage Dashboard

A web-based analytics dashboard for visualizing GitHub Copilot usage statistics. This application provides insights into team Copilot usage including completions, active hours, language breakdowns, and user activity.

## Features

- 📊 **Visual Analytics**: Interactive bar charts and pie charts using Chart.js
- 👥 **User Statistics**: Detailed table view of per-user metrics
- 🔤 **Language Breakdown**: See which programming languages your team uses most with Copilot
- ⏰ **Activity Tracking**: Monitor active hours and last seen timestamps
- 🎨 **Modern UI**: Clean, responsive design built with React

## Architecture

- **Backend**: Flask (Python) REST API serving usage statistics
- **Frontend**: React application with Chart.js visualizations
- **Data**: Currently uses mock data, easily extensible to real GitHub Copilot API

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will start on `http://localhost:5000`

**Note:** By default, the server runs in development mode. To run in production mode, set the environment variable:
```bash
export FLASK_DEBUG=false
python app.py
```

### Backend API Endpoints

- `GET /api/usage` - Returns mock Copilot usage statistics
- `GET /api/health` - Health check endpoint

### Backend Data Structure

The API returns data in the following format:

```json
{
  "status": "success",
  "data": [
    {
      "user": "alice@example.com",
      "completions": 450,
      "active_hours": 32.5,
      "language_breakdown": {
        "Python": 150,
        "JavaScript": 200,
        "TypeScript": 100
      },
      "last_seen": "2024-01-20T10:30:00"
    }
  ],
  "timestamp": "2024-01-20T12:00:00"
}
```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will open automatically in your browser at `http://localhost:3000`

**Configuration:** To connect to a different backend URL, create a `.env` file in the frontend directory:
```bash
REACT_APP_API_URL=http://your-backend-url:5000
```

### Frontend Build

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Usage

1. Start the backend server (Flask) on port 5000
2. Start the frontend development server on port 3000
3. Open your browser to `http://localhost:3000`
4. The dashboard will automatically fetch and display usage statistics

## Extending to Real Data

The current implementation uses mock data. To integrate with the real GitHub Copilot API:

1. Update `backend/app.py` to fetch data from GitHub's API
2. Add authentication (GitHub token/OAuth)
3. Replace the `generate_mock_data()` function with API calls
4. The data structure is designed to match expected API responses

## Technology Stack

### Backend
- Flask 3.0.0
- Flask-CORS 4.0.0
- Python 3.8+

### Frontend
- React 18.2.0
- Chart.js 4.4.0
- react-chartjs-2 5.2.0
- react-scripts 5.0.1

## Project Structure

```
copilot-usage-dashboard/
├── backend/
│   ├── app.py              # Flask application with API endpoints
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Application styles
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   └── package.json        # Node.js dependencies
└── README.md               # This file
```

## Development

- The backend runs on port 5000
- The frontend development server runs on port 3000
- CORS is enabled to allow frontend-backend communication
- Mock data regenerates on each API call for demonstration purposes

## Future Enhancements

- Real GitHub Copilot API integration
- User authentication and authorization
- Historical data tracking and trends
- Exportable reports
- Team and organization-level analytics
- Filtering and date range selection
- Real-time updates with WebSocket

## License

MIT License - feel free to use this project for your organization's needs.
