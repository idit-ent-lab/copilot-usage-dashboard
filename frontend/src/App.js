import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './App.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usage');
      const result = await response.json();
      
      if (result.status === 'success') {
        setUsageData(result.data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('Error connecting to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for completions bar chart
  const completionsChartData = {
    labels: usageData.map(user => user.user.split('@')[0]),
    datasets: [
      {
        label: 'Completions',
        data: usageData.map(user => user.completions),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const completionsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Completions by User',
      },
    },
  };

  // Prepare data for language breakdown pie chart
  const languageBreakdown = {};
  usageData.forEach(user => {
    Object.entries(user.language_breakdown || {}).forEach(([lang, count]) => {
      languageBreakdown[lang] = (languageBreakdown[lang] || 0) + count;
    });
  });

  const languageChartData = {
    labels: Object.keys(languageBreakdown),
    datasets: [
      {
        label: 'Completions by Language',
        data: Object.values(languageBreakdown),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const languageChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Language Distribution',
      },
    },
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitHub Copilot Usage Dashboard</h1>
        </header>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitHub Copilot Usage Dashboard</h1>
        </header>
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Make sure the Flask backend is running on http://localhost:5000</p>
          <button onClick={fetchUsageData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Copilot Usage Dashboard</h1>
        <p className="subtitle">Analytics for Team Copilot Usage</p>
      </header>

      <main className="App-main">
        <div className="charts-container">
          <div className="chart-wrapper">
            <Bar data={completionsChartData} options={completionsChartOptions} />
          </div>
          <div className="chart-wrapper pie-chart">
            <Pie data={languageChartData} options={languageChartOptions} />
          </div>
        </div>

        <div className="table-container">
          <h2>User Statistics</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Completions</th>
                <th>Active Hours</th>
                <th>Languages</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((user, index) => (
                <tr key={index}>
                  <td>{user.user}</td>
                  <td>{user.completions}</td>
                  <td>{user.active_hours}h</td>
                  <td>
                    <div className="language-tags">
                      {Object.entries(user.language_breakdown).map(([lang, count]) => (
                        <span key={lang} className="language-tag">
                          {lang}: {count}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{formatDate(user.last_seen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="App-footer">
        <p>Refresh the page to see updated mock data</p>
      </footer>
    </div>
  );
}

export default App;
