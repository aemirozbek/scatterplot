# Cyclist Data Visualization Scatterplot Graph - D3.js

This web application uses D3.js, a powerful JavaScript library for data visualization, to display information about the 35 fastest times up Alpe d'Huez in professional bicycle racing.

## Features

- Scatter plot: The main feature of this app is a scatter plot that shows the fastest times of cyclists on the y-axis and the years in which these times were achieved on the x-axis. Each data point represents a cyclist's record time, and the color of the point indicates whether the rider has doping allegations or not.
- Interactive Tooltip: When you hover over a data point on the scatter plot, a tooltip will appear showing details about the cyclist, including their name, nationality, year of the record, time taken, and any doping allegations (if applicable).
- Legend: The legend on the right side of the plot explains the color code used for the data points. Blue represents cyclists without any doping allegations, while red represents cyclists with doping allegations.
- Data Source: The data used for this visualization is sourced from [freeCodeCamp's GitHub repository](https://github.com/freeCodeCamp/ProjectReferenceData).

## Usage

To run this app, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser that supports ES6 modules.
3. The app will fetch the GDP data from the provided URL and generate the visualization.

## Technologies Used

- D3.js: A powerful JavaScript library for data visualization, used to create the bar chart and handle interactive features.

## How the App Works

1. The app fetches the GDP data from the provided URL using the `fetch()` function.

2. It then processes the data and creates scales using D3's `scaleUtc()`.

3. The app generates a responsive SVG container and draws circles using the fetched data.

4. The x-axis and y-axis are added to the chart using D3's `axisBottom()` and `axisLeft()` functions.

5. A tooltip is implemented using D3 to display additional information when the user hovers over a circle.
