import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const w = 900;
const h = 600;
const padding = 60;

fetch(url)
  .then((res) => res.json())
  .then((data) => {

    const formatTime = d3.timeFormat("%M:%S");
    const dateMax = data.map(d => new Date((d.Year + 1)+"-1"));
    const dateMin = data.map(d => new Date((d.Year - 1)+"-1"));
    const times = data.map((e) => new Date(`January 1, 2000 00:${e["Time"]}`));

    const xScale = d3
      .scaleUtc()
      .domain([d3.min(dateMin), d3.max(dateMax)])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleUtc()
      .domain([d3.max(times), d3.min(times)])
      .range([h - padding, padding]);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w)
      .attr("height", h + 50)
      .style("background-color", "#f4fffc");

    const tooltip = d3.select("#container")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");

    const circles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d) => new Date(`January 1, 2000 00:${d.Time}`))
      .attr("cx", (d) => xScale(new Date(d.Year + "-1")))
      .attr("cy", (d) => yScale(new Date(`January 1, 2000 00:${d.Time}`)))
      .attr("r", 7)
      .attr("fill", d => d.Doping !== "" ? "rgb(231, 102, 102)" : "rgb(120, 120, 233)")
      .style("stroke", "black")
      .style("opacity", "0.8")
      .style("cursor", "pointer");

    svg
      .append("g")
      .attr("transform", "translate(1, " + (h - padding + 4) + ")")
      .attr("id", "x-axis")
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", "translate(" + (padding + 1) + ", 3)")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale).tickFormat(formatTime));

    svg
      .append("text")
      .attr("font-size", "12")
      .attr("x", 5)
      .attr("y", 50)
      .text("Time in Minutes");

      circles.on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`${d["Name"]}: ${d["Nationality"]}<br/>Year: ${d["Year"]}, Time: ${d["Time"]}<br/>${d["Doping"]}`)
               .style("left", event.pageX + 15 + "px")
               .style("top", event.pageY + "px")
               .attr("data-year", d.Year);
      })
      
      circles.on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  });
