var svgWidth = 800;
var svgHeight = 650;

var margin = {
  top: 45,
  right: 75,
  bottom: 75,
  left: 75
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select('#scatter')
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

var chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv").then(function(stateData) {
	// console.log(stateData); 
	stateData.forEach(function(data) {
		data.income = +data.income;
		data.obesity = +data.obesity;
	})
	
	var xScale = d3.scaleLinear()
		.domain(d3.extent(stateData, d => d.income))
		.range([0, chartWidth]);
	
	var yScale = d3.scaleLinear()
		.domain(d3.extent(stateData, d => d.obesity))
		.range([chartHeight, 0]);

	var xAxis = d3.axisBottom(xScale); 
	var yAxis = d3.axisLeft(yScale); 


	chartGroup.append("g").call(yAxis); 
	chartGroup.append("g").attr("class", "xAxis").attr("transform", `translate(0,${chartHeight})`).call(xAxis);

	chartGroup.append("text")
		.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
		.attr("class", "axis")
		.text("Average Income"); 

	chartGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x", 0 - (chartHeight / 2))
		.attr("dy", "1em")
		.attr("class", "axis")
		.text("Obese (%)"); 

	var circlesGroup = chartGroup.selectAll("circle")
		.data(stateData)
		.enter()
		.append("circle")
		.attr("cx", d => xScale(d.income))
		.attr("cy", d => yScale(d.obesity))
		.attr("r", 10)
		.attr("class", "stateCircle")

	var circlesText = chartGroup.selectAll(".stateText")
		.data(stateData)
		.enter()
		.append("text")
		.text(d => d.abbr)
		.attr("class", "stateText")
		.attr("dx", d => xScale(d.income))
		.attr("dy", d => yScale(d.obesity - 0.1))
});