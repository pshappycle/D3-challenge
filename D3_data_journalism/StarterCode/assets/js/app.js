// @TODO: YOUR CODE HERE!
var svgWidth = 600;
var svgHeight = 500;

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



d3.csv("assets/data/data.csv").then( function(healthData) {

  console.log(healthData);

  healthData.forEach(function(data){

  data.poverty = +data.poverty
  data.healthcareLow = +data.healthcareLow
});

var xLinearScale = d3.scaleLinear()
  .range([0,chartWidth])
  .domain([d3.min(healthData, data => data.poverty),d3.max(healthData, data => data.poverty)])


var yLinearScale = d3.scaleLinear()
    .range([chartHeight,0])
    .domain([d3.min(healthData, data => data.healthcareLow),d3.max(healthData, data => data.healthcareLow)])


var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);


chartGroup.append("g")
  .attr("transform", "translate(0," + chartHeight + ")")
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (chartHeight /2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");

chartGroup.append("g")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
  .attr("class", "axisText")
  .text("Poverty (%)");

var circles = chartGroup.selectAll("g")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcareLow))
  .attr("r", 10)
  .attr("fill", "blue")
  .attr("opacity", ".5")

  //do i make some kind of text attribute to put the abbreviation in?


circles.append("text")
  .text(data => data.abbr)
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcareLow))
  .attr("font-size", 15)
  .attr("color", "red")

console.log(circles)
});
