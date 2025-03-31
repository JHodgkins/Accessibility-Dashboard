# Accessibility Dashboard

## Overview
The Accessibility Dashboard is a web application designed to provide senior managers with a clear overview of accessibility test results. It visualizes accessibility scores using charts and data tables, helping stakeholders quickly identify areas for improvement.

## Features
- **Information Overview**:
  - Displays average accessibility scores for mobile and desktop using doughnut charts.
  - Highlights the top URLs with low accessibility scores.
  - Provides accessible descriptions for all charts.
- **Detailed View**:
  - Data table with all test results for further analysis.
  - Filtering options to switch between mobile and desktop test results.
- **Issues View**:
  - Sorted view of URLs from lowest to highest accessibility scores for easy prioritization.

## Technologies Used
- **React** for the frontend.
- **Bootstrap** for responsive UI components.
- **Chart.js** with **react-chartjs-2** for data visualization.
- **PapaParse** for CSV data import.
- **gh-pages** for deployment to GitHub Pages.

## Prerequisites
Ensure you have the following installed:
- Node.js (LTS recommended)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/jhodgkins/Accessibility-Dashboard.git
    cd Accessibility-Dashboard
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Usage
### Run Locally
To start the application in development mode:
```bash
npm start
```
- The app will be available at `http://localhost:3000`.

### Build for Production
To generate a production build:
```bash
npm run build
```
- This will create a `build/` folder with optimized static files.

### Deploy to GitHub Pages
To build and deploy to GitHub Pages:
```bash
npm run deploy
```
- Ensure the `homepage` field in `package.json` is set correctly:
```json
"homepage": "https://your-username.github.io/Accessibility-Dashboard/"
```

## CSV Data Format
Upload a CSV file with the following format:
```csv
URL,Run 29-03-25 (mobile),Run 29-03-25 (desktop),Run 30-03-25 (mobile),Run 30-03-25 (desktop)
https://example.com/page1,100,95,99,85
https://example.com/page2,98,90,97,80
```
- Ensure column headers follow the `Run DD-MM-YY (mobile)` and `Run DD-MM-YY (desktop)` naming convention.

## Accessibility Features
- Aria-labels are provided for all charts and interactive elements.
- Accessible descriptions are available below charts for screen reader users.
- Form elements are properly labeled for improved accessibility.

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

