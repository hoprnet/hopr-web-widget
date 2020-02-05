// @ts-nocheck
import React from "react";
import { reaction } from "mobx";
import * as d3 from "d3";
import Web3 from "web3";
import { events } from "src/models/Hopr";
import "./styles.css";

var svg,
  timeScale,
  amountScale,
  countScale,
  width,
  height,
  margin,
  chartData,
  tooltipDimensions,
  focus;
var xAxis, yAxisAmount, yAxisCount, amountLine, countLine;
var dateFormat = d3.timeFormat("%b %d");
var fullMonthDateFormat = d3.timeFormat("%b %d, %Y");
var bisectDate = d3.bisector(function(d) {
  return d.date;
}).left;

const initChart = () => {
  margin = { top: 30, right: 70, bottom: 30, left: 60 };
  width =
    document.getElementById("chart-container").offsetWidth -
    margin.left -
    margin.right;
  height =
    document.getElementById("chart-container").offsetHeight -
    margin.top -
    margin.bottom;
  tooltipDimensions = { width: 150, height: 75 };
  timeScale = d3.scaleTime().range([0, width]);
  amountScale = d3.scaleLinear().range([height, 0]);
  countScale = d3.scaleLinear().range([height, 0]);

  d3.selectAll("#chart-container svg").remove();

  svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  amountLine = d3
    .line()
    .x(function(d) {
      return timeScale(d.date);
    })
    .y(function(d) {
      return amountScale(d.aggAmount);
    });

  countLine = d3
    .line()
    .x(function(d) {
      return timeScale(d.date);
    })
    .y(function(d) {
      return countScale(d.aggCount);
    });
};

function parseAmount(amount) {
  return amount / 10000;
}

function updateChart(data) {
  console.log("TCL: updateChart -> data", data);
  chartData = data;
  d3.selectAll(".chart-content").remove();

  timeScale.domain(
    d3.extent(data, function(d) {
      return d.date;
    })
  );
  amountScale.domain([
    0,
    d3.max(data, function(d) {
      return Math.max(d.aggAmount);
    })
  ]);
  countScale.domain([
    0,
    d3.max(data, function(d) {
      return Math.max(d.aggCount);
    })
  ]);

  var svgChart = svg
    .append("g")
    .attr("class", "chart-content")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svgChart
    .append("path")
    .data([data])
    .attr("class", "amount-line")
    .style("stroke-width", 1.5)
    .style("stroke-dasharray", "12, 10")
    .attr("d", amountLine);

  svgChart
    .append("path")
    .data([data])
    .attr("class", "count-line")
    .style("stroke-width", 1.5)
    .attr("d", countLine);

  svgChart
    .append("g")
    .attr("class", "xAxis axis")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(timeScale)
        .tickFormat(dateFormat)
        .ticks(5)
    );

  svgChart
    .append("g")
    .attr("class", "amountAxis axis")
    .call(d3.axisLeft(amountScale).ticks(5));

  svgChart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left / 1.5)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("TOTAL STAKED HOPR");

  svgChart
    .append("g")
    .attr("class", "countAxis axis")
    .attr("transform", "translate(" + width + " ,0)")
    .call(d3.axisRight(countScale).ticks(5));

  svgChart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", width + margin.left / 2)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("# Channles");
}

function setOverlayTooltip() {
  d3.selectAll(".focus").remove();
  d3.selectAll(".chart-overlay").remove();

  focus = svg
    .append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("display", "none");

  focus
    .append("circle")
    .attr("id", "amount-circle")
    .attr("class", "tooltip-circle tooltip-circle-amount")
    .attr("r", 5);

  focus
    .append("circle")
    .attr("id", "count-circle")
    .attr("class", "tooltip-circle tooltip-circle-count")
    .attr("r", 5);

  var tooltip = focus.append("g").attr("id", "tooltip-group");

  tooltip
    .append("rect")
    .attr("class", "tooltip")
    .attr("width", tooltipDimensions.width)
    .attr("height", tooltipDimensions.height)
    .attr("x", 10)
    .attr("y", -22);

  tooltip
    .append("text")
    .attr("class", "tooltip-date")
    .attr("x", 18)
    .attr("y", -2);

  tooltip
    .append("text")
    .attr("x", 18)
    .attr("y", 18)
    .text("Total Staked:");

  tooltip
    .append("text")
    .attr("id", "tooltip-amount")
    .attr("x", 120)
    .attr("y", 18);

  tooltip
    .append("text")
    .attr("x", 18)
    .attr("y", 38)
    .text("Channels:");

  tooltip
    .append("text")
    .attr("id", "tooltip-count")
    .attr("x", 90)
    .attr("y", 38);

  svg
    .append("rect")
    .attr("class", "chart-overlay")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() {
      focus.style("display", null);
    })
    .on("mouseout", function() {
      focus.style("display", "none");
    })
    .on("mousemove", mousemove);
}

function mousemove() {
  var x0 = timeScale.invert(d3.mouse(this)[0]),
    i = bisectDate(chartData, x0, 1),
    d0 = chartData[i - 1],
    d1 = chartData[i],
    d = x0 - d0.time > d1.time - x0 ? d1 : d0;

  var x = timeScale(d.date);
  var yAmount = amountScale(d.aggAmount);
  var yCount = countScale(d.aggCount);

  focus
    .select("#amount-circle")
    .attr("transform", `translate(${x},${yAmount})`);
  focus.select("#count-circle").attr("transform", `translate(${x},${yCount})`);

  var y = Math.min(yAmount, yCount);
  var tooltipXOffset = 30;
  var tooltipX =
    x > width / 2
      ? x - tooltipDimensions.width - tooltipXOffset
      : x + tooltipXOffset;

  var tooltipYOffset = 10;
  var tooltipY =
    y > height / 2
      ? y - tooltipDimensions.height - tooltipYOffset
      : y + tooltipYOffset;
  focus
    .select("#tooltip-group")
    .attr("transform", `translate(${tooltipX}, ${tooltipY})`);

  focus.select(".tooltip-date").text(fullMonthDateFormat(d.date));
  focus.select("#tooltip-amount").text(d.aggAmount);
  focus.select("#tooltip-count").text(d.aggCount);
}

function zeroFill(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return String(number);
  }
}

function aggregateRecords(records) {
  var channelAmmountBalance = 0;
  var channelStatusCount = 0;
  var aggregatedRecords = [];

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var recordEventType = record.type;
    var recordEventAmount = record.amount;

    if (recordEventType === "OpenedChannel") {
      channelStatusCount += 1;
      channelAmmountBalance += recordEventAmount;
    } else {
      channelStatusCount -= 1;
      channelAmmountBalance -= recordEventAmount;
    }

    console.log(record.time);
    var recordDate = new Date(record.time);

    console.log({
      aggCount: channelStatusCount,
      aggAmount: channelAmmountBalance,
      date: recordDate
    });

    aggregatedRecords.push(
      Object.assign({}, records[i], {
        aggCount: channelStatusCount,
        aggAmount: channelAmmountBalance,
        date: recordDate
      })
    );
  }

  return aggregatedRecords;
}

function renderRecords(hoprEvents) {
  const events = Array.from(hoprEvents)
    .filter(event => {
      return (
        event.data.event === "OpenedChannel" ||
        event.data.event === "ClosedChannel"
      );
    })
    .map(event => {
      const returnValues = event.data.returnValues;

      const amount =
        event.data.event === "OpenedChannel"
          ? parseAmount(returnValues.deposit)
          : parseAmount(returnValues.senderAmount) +
            parseAmount(returnValues.receiverAmount);
      const time = event.createdAt;

      return {
        type: event.data.event,
        amount: Web3.utils.fromWei(String(amount), "ether"),
        time: time
      };
    });

  console.log(events);

  var orderedRecords = events.sort(function(a, b) {
    return a.createdAt - b.createdAt;
  });

  var aggregatedRecords = aggregateRecords(orderedRecords);
  console.log(aggregatedRecords);

  updateChart(aggregatedRecords);
  setOverlayTooltip();
}

class Chart extends React.Component {
  svgRef?: any;

  constructor(props: any) {
    super(props);

    this.svgRef = React.createRef();
  }

  public componentDidMount() {
    svg = this.svgRef!.current;
    initChart();

    reaction(
      () => events.length > 3,
      () => renderRecords(events)
    );
  }

  public render() {
    return (
      <div id="chart-container">
        <svg ref={this.svgRef} />

        <style jsx>{`
          #chart-container {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Chart;
