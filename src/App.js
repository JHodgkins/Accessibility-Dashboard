import React, { useState } from 'react';
import Papa from 'papaparse';
import { Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to display percentage in the center of the doughnut chart
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const percentage = chart.config.data.datasets[0].data[0];
    if (!percentage && percentage !== 0) return; // Prevent errors if no data
    ctx.save();
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, width / 2, height / 2);
    ctx.restore();
  }
};

ChartJS.register(centerTextPlugin);

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => setData(result.data),
      header: true,
    });
  };

  const calculateAverageScores = (type) => {
    const scores = data.map(row => parseFloat(row[`Run 29-03-25 (${type})`]));
    const validScores = scores.filter(score => !isNaN(score));
    if (validScores.length === 0) return null;
    const average = validScores.reduce((a, b) => a + b, 0) / validScores.length;
    return Math.round(average);
  };

  const averageMobileScore = calculateAverageScores('mobile');
  const averageDesktopScore = calculateAverageScores('desktop');
  const remainingMobileScore = averageMobileScore !== null ? 100 - averageMobileScore : null;
  const remainingDesktopScore = averageDesktopScore !== null ? 100 - averageDesktopScore : null;

  const chartDataMobile = {
    labels: ['Accessibility Score', 'Remaining'],
    datasets: [{
      data: [averageMobileScore || 0, remainingMobileScore || 100],
      backgroundColor: ['#4CAF50', '#FFC107'],
    }],
  };

  const chartDataDesktop = {
    labels: ['Accessibility Score', 'Remaining'],
    datasets: [{
      data: [averageDesktopScore || 0, remainingDesktopScore || 100],
      backgroundColor: ['#2196F3', '#FFC107'],
    }],
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Accessibility Dashboard</h1>
      <label htmlFor="file-upload" className="form-label">Upload a CSV file to view accessibility scores:</label>
      <input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} className="form-control mb-4" />

      {averageMobileScore !== null && averageDesktopScore !== null ? (
        <div className="row">
          <div className="col-md-6">
            <h5>Average Mobile Score</h5>
            <Doughnut 
              data={chartDataMobile} 
              options={{ plugins: { legend: { display: false } }}} 
              role="img" 
              aria-label={`Average mobile accessibility score is ${averageMobileScore} percent, with ${remainingMobileScore} percent remaining until fully accessible.`}
            />
            <p>Average mobile accessibility score is <strong>{averageMobileScore}%</strong>, leaving a remaining <strong>{remainingMobileScore}%</strong> until fully accessible.</p>
          </div>
          <div className="col-md-6">
            <h5>Average Desktop Score</h5>
            <Doughnut 
              data={chartDataDesktop} 
              options={{ plugins: { legend: { display: false } }}} 
              role="img" 
              aria-label={`Average desktop accessibility score is ${averageDesktopScore} percent, with ${remainingDesktopScore} percent remaining until fully accessible.`}
            />
            <p>Average desktop accessibility score is <strong>{averageDesktopScore}%</strong>, leaving a remaining <strong>{remainingDesktopScore}%</strong> until fully accessible.</p>
          </div>
        </div>
      ) : <p>Please upload a CSV to view accessibility scores.</p>}
    </div>
  );
}

export default App;
