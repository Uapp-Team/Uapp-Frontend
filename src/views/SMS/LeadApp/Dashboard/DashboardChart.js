import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";
import FilterBtn from "../../components/buttons/FilterBtn";
import DatePicker from "../../components/ui/DatePicker";

const DashboardChart = () => {
  const [chartType, setChartType] = useState(1);
  const [chartTime, setChartTime] = useState(1);
  const [formData, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (chartTime !== 5) {
      setFormDate("");
      setToDate("");
    }
  }, [chartTime]);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    colors: "#0CB0AB",
  };

  const series = [
    {
      name: "Total Lead",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 30, 40, 45, 50],
    },
  ];

  return (
    <>
      <div className="pl-24px pr-24px bg-white d-md-flex justify-content-between align-items-center mb-2px fs-16px">
        <div className="d-flex">
          <span
            className={
              chartType === 1
                ? `lead-chart-btn-active mr-32px`
                : `lead-chart-btn pointer mr-32px`
            }
            onClick={() => setChartType(1)}
          >
            Leads
          </span>
          <span
            className={
              chartType === 2
                ? `lead-chart-btn-active`
                : `lead-chart-btn pointer`
            }
            onClick={() => setChartType(2)}
          >
            Converted
          </span>
        </div>
        <div className="d-flex align-items-center">
          <FilterBtn
            text="All Day"
            state={chartTime}
            value={1}
            action={setChartTime}
          />
          <FilterBtn
            text="All Week"
            state={chartTime}
            value={2}
            action={setChartTime}
          />
          <FilterBtn
            text="All Month"
            state={chartTime}
            value={3}
            action={setChartTime}
          />
          <FilterBtn
            text="All Year"
            state={chartTime}
            value={4}
            action={setChartTime}
          />
          <div className="relative">
            <FilterBtn
              text="Date"
              state={chartTime}
              value={5}
              action={setChartTime}
            />
            {chartTime === 5 && (
              <span className="d-flex click-over">
                <DatePicker
                  label="Start Date"
                  value={formData}
                  onChange={(e) => {
                    setFormDate(e.target.value);
                    setChartTime(5);
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    setChartTime(5);
                  }}
                />
              </span>
            )}
          </div>

          {/* <DatePicker
            label="Start Date"
            value={formData}
            onChange={(e) => {
              setFormDate(e.target.value);
              setChartTime(5);
            }}
          />
          <DatePicker
            label="End Date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setChartTime(5);
            }}
          /> */}
        </div>
      </div>
      <div className="p-30px bg-white">
        <Row>
          <Col lg={7}>
            <p> Leads</p>
            <Chart options={options} series={series} type="bar" height="300" />
          </Col>
          <Col lg={1}></Col>
          <Col lg={4}>
            <p>Campaign</p>
            <p className="d-flex justify-content-between align-items-center">
              <span>
                <span className="lead-numbering">1</span> Campaign
              </span>
              <span>234</span>
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardChart;
