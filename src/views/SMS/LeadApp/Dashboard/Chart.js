import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ totalLeads, inProcesses, converteds, months }) => {
  const series = [
    {
      name: "Total Lead",
      data: totalLeads ? totalLeads : [],
    },
    {
      name: "In Process",
      data: inProcesses ? inProcesses : [],
    },
    {
      name: "Converted",
      data: converteds ? converteds : [],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: months ? months : [],
    },
    yaxis: {
      title: {
        // text: "$ (thousands)",
      },
    },
    colors: ["#14C7C7", "#0776EB", "#FFD98C"],
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div className="card">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default Chart;
