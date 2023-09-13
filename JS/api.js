
/*const weather = document.getElementById('weather');
const apiKey = "G8gFHT8Sz61BKL94aWXsiQzP0Q1MXWrL0hD0fSOT";

fetch(`https://api.nasa.gov/insight_weather/?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    weather.innerHTML = `
      <p><b>Sol:</b> ${data.sol}</p>
      <p><b>Temperature:</b> ${data.temperature}</p>
      <p><b>Pressure:</b> ${data.pressure}</p>
      <p><b>Wind Speed:</b> ${data.wind_speed}</p>
      <p><b>Wind Direction:</b> ${data.wind_direction}</p>
    `;
  });


/*Data Visualization */
// Set your API key and API URL
const apiKey = "G8gFHT8Sz61BKL94aWXsiQzP0Q1MXWrL0hD0fSOT";
const apiURL = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

// Select the container for the graph
const container = d3.select('#chart-container');

// Fetch data from the API
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const solKeys = data.sol_keys;
        const windData = solKeys.map(sol => ({
            sol,
            windSpeed: data[sol].HWS.av,
            windDirection: data[sol].WD.most_common.compass_point,
        }));

        // Create the graph
        createWindGraph(windData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to create the wind graph
function createWindGraph(data) {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = container
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.sol))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.windSpeed)])
        .nice()
        .range([height, 0]);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.sol))
        .attr('y', d => y(d.windSpeed))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.windSpeed))
        .attr('fill', 'steelblue');

    svg.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .text(d => d.windDirection)
        .attr('x', d => x(d.sol) + x.bandwidth() / 2)
        .attr('y', d => y(d.windSpeed) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');
}
