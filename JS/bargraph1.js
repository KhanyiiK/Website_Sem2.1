(function (d3) {
    'use strict';

    const titleText = 'Mars Weather Data';
    const xAxisLabelText = 'Wind Speed (m/s)';
    
    const svg = d3.select('svg');
    
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    
    const render = data => {
        const xValue = d => d.windSpeed;
        const yValue = d => d.sol;
        const margin = { top: 50, right: 40, bottom: 77, left: 180 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xValue)])
            .range([0, innerWidth]);
        
        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.1);
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const xAxisTickFormat = number =>
            d3.format('.2s')(number);
        
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight);
        
        g.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('.domain, .tick line')
            .remove();
        
        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
        
        xAxisG.select('.domain').remove();
        
        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 65)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabelText);
        
        g.selectAll('rect').data(data)
            .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
        
        g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .text(titleText);
    };

    // Fetch Mars weather data
    const apiKey = "G8gFHT8Sz61BKL94aWXsiQzP0Q1MXWrL0hD0fSOT";
    const apiURL = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const solKeys = data.sol_keys.slice(0, 10); // Get the top 10 Sols
            const weatherData = solKeys.map(sol => ({
                sol,
                windSpeed: data[sol].HWS.av,
            }));
            render(weatherData);
        })
        .catch(error => console.error('Error fetching data:', error));
    
}(d3));

(function (d3) {
    'use strict';

    const titleText = 'Mars Weather Data';
    const xAxisLabelText = 'Wind Speed (m/s)';

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        const xValue = d => d.value;
        const yValue = d => d.parameter;
        const margin = { top: 50, right: 40, bottom: 77, left: 180 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xValue)])
            .range([0, innerWidth]);

        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAxisTickFormat = number =>
            d3.format('.3s')(number)
            .replace('G', 'B');

        const xAxis = d3.axisBottom(xScale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight);

        g.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('.domain, .tick line')
            .remove();

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisG.select('.domain').remove();

        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 65)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabelText);

        g.selectAll('rect').data(data)
            .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());

        g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .text(titleText);
    };

    // Sample Mars weather data
    const marsWeatherData = [
        { parameter: 'Sol', value: 123 },
        { parameter: 'Temperature (°C)', value: -15 },
        { parameter: 'Pressure (Pa)', value: 720 },
        { parameter: 'Wind Speed (m/s)', value: 3.2 },
        { parameter: 'Wind Direction', value: 'North' },
    ];

    render(marsWeatherData);

}(d3));