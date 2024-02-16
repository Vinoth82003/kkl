console.log("chart.js");

// Data
let total_employee = 100;
let kkl_employee = 50;
let dr_employee = 30;
let ft_employee = 20;

let employee = [
    { label: 'KKL', value: kkl_employee },
    { label: 'DR', value: dr_employee },
    { label: 'FT', value: ft_employee }
];

// SVG Size
let width = 500;
let height = 500;
let radius = Math.min(width, height) / 2;

// Color Scale
let color = d3.scaleOrdinal()
    .domain(employee.map(d => d.label))
    .range(d3.schemeCategory10);

// Pie Generator
let pie = d3.pie()
    .value(d => d.value);

// Arc Generator
let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// SVG Element
let svg = d3.select("#pie-chart")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Draw Pie Chart
let arcs = svg.selectAll("arc")
    .data(pie(employee))
    .enter()
    .append("g");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.label));

// Add Labels
arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => `${d.data.label} (${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%)`);
