import React from "react";
import Chart from "react-apexcharts";

function Barchart() {
  const values = [6578, 6787, 3245, 9876, 2324, 5123, 2435];

  return (
    <>
      <div className="container-fluid mb-5">
        <h3 className="text-center mt-3 mb-3">Bar Chart in ReactJS</h3>

        <Chart
          type="bar"
          width={"100%"}
          height={500}
          series={[
            {
              name: "Social Media Subscriber",
              data: values,
            },
          ]}
          options={{
            title: {
              text: "BarChar Developed by DevOps Team",
              style: { fontSize: 30 },
            },

            plotOptions: {
              bar: {
                horizontal: true,
              },
            },

            subtitle: {
              text: "This is BarChart Graph",
              style: { fontSize: 18 },
            },

            colors: ["#1e98b0"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: [
                "Facebook",
                "Twitter",
                "Linkedin",
                "Instagram",
                "GitHub",
                "Stackoverflow",
                "Youtube",
              ],
              title: {
                text: "Social Media User",
                style: { color: "#f90000", fontSize: 30 },
              },
            },

            grid: {
              yaxis: {
                labels: {
                  formatter: (val) => {
                    return `${val}`;
                  },
                  style: { fontSize: "15", colors: ["#f90000"] },
                },
                lines: {
                  show: false,
                },
                title: {
                  text: "User In (K)",
                  style: { color: "#f90000", fontSize: 15 },
                },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
    </>
  );
}

export default Barchart;
