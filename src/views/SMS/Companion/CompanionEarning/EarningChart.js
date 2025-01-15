import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import get from "../../../../helpers/get";

const EarningChart = () => {
  const [data, setdata] = useState({});
  const referenceId = localStorage.getItem("referenceId");

  useEffect(() => {
    get(`CompanionTransactoin/Graph?companionid=${referenceId}`).then((res) => {
      setdata(res);
    });
  }, [referenceId]);

  const series = [
    {
      name: "Earning",
      data: data.amounts,
    },
  ];

  const options = {
    chart: {
      height: 300,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: "Earning",
    //   align: "left",
    // },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: {
      categories: data?.monthNames,
    },
  };

  // categories: data?.monthNames,

  console.log(data?.monthNames);

  return (
    <>
      <div className="custom-card-border p-3 pt-4">
        <div className="d-flex justify-content-between">
          <p className="aff-card-title px-3 mb-0">Earning</p>
          <p className="aff-card-title px-3 mb-0">
            {data?.fromDate} <span className="text-gray">to</span>{" "}
            {data?.toDate}
          </p>
        </div>
        {data?.monthNames?.length > 0 ? (
          <Chart options={options} series={series} type="line" height={350} />
        ) : (
          <p>Loading chart...</p>
        )}
        {/* <Chart options={options} series={series} type="line" height={350} /> */}
      </div>
    </>
  );
};

export default EarningChart;
