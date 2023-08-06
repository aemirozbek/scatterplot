import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const w = 1000;
const h = 700;
const marginTop = 160;
const marginBottom = 60;
const marginSides = 60;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const formatTime = d3.timeFormat("%M:%S");
    const dateMax = data.map((d) => new Date(d.Year + 1 + "-1"));
    const dateMin = data.map((d) => new Date(d.Year - 1 + "-1"));
    const times = data.map((d) => new Date(`January 1, 2000 00:${d.Time}`));

    const xScale = d3
      .scaleUtc()
      .domain([d3.min(dateMin), d3.max(dateMax)])
      .range([marginSides, w - marginSides]);

    const yScale = d3
      .scaleUtc()
      .domain([d3.max(times), d3.min(times)])
      .range([h - marginBottom, marginTop]);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w)
      .attr("height", h + 50);

    const tooltip = d3
      .select("#container")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("pointer-events", "none");

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
      .attr("fill", (d) =>
        d.Doping !== "" ? "rgb(231, 102, 102)" : "rgb(120, 120, 233)"
      )
      .style("stroke", "black")
      .style("opacity", "0.8")
      .style("cursor", "pointer");

    svg
      .append("g")
      .attr("transform", "translate(0, " + (h - marginBottom) + ")")
      .attr("id", "x-axis")
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", "translate(" + marginSides + ", 0)")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale).tickFormat(formatTime));

    svg
      .append("text")
      .attr("id", "title")
      .style("font-size", "35px")
      .attr("x", w / 2)
      .attr("y", marginTop / 4)
      .attr("text-anchor", "middle")
      .text("Doping in Professional Bicycle Racing");

    svg
      .append("text")
      .style("font-size", "25px")
      .attr("x", w / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .text("35 Fastest times up Alpe d'Huez");

    svg
      .append("text")
      .attr("font-size", "12")
      .attr("x", marginSides)
      .attr("y", marginTop - 10)
      .attr("text-anchor", "middle")
      .text("Time in Minutes");

    const legendBox = svg
      .append("g")
      .attr("id", "legend");

    // Little rectangles
    legendBox
      .append("rect")
      .attr("width", 17)
      .attr("height", 17)
      .attr("x", w - marginSides)
      .attr("y", h / 2)
      .attr("fill", "rgb(120, 120, 233)")
    legendBox
      .append("rect")
      .attr("width", 17)
      .attr("height", 17)
      .attr("x", w - marginSides)
      .attr("y", (h / 2) + 20)
      .attr("fill", "rgb(231, 102, 102)")

    // Texts
    legendBox
      .append("text")
      .attr("font-size", "12")
      .attr("x", w - marginSides - 7)
      .attr("y", h / 2 + 12)
      .attr("text-anchor", "end")
      .text("No doping allegations");
    legendBox
      .append("text")
      .attr("font-size", "12")
      .attr("x", w - marginSides - 7)
      .attr("y", (h / 2) + 32)
      .attr("text-anchor", "end")
      .text("Riders with doping allegations");

    circles.on("mouseover", (event, d) => {
      let br = "";
      if (d.Doping !== "") {
        br = "<br/><br/>";
      }
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(
          `${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}${br}${d.Doping}`
        )
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY + "px")
        .attr("data-year", d.Year);
    });

    circles.on("mouseout", () => {
      tooltip.transition().duration(200).style("opacity", 0);
    });
  });
