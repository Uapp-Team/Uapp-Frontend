import React, { useEffect, useState } from "react";
import Select from "react-select";
import Year from "../date/Year";
import { Col, Row } from "reactstrap";
import get from "../../helpers/get";
import Chart from "react-apexcharts";
import moment from "moment";
import { dateFormate, ymdateFormate } from "../date/calenderFormate";
import DMYPicker from "../form/DMYPicker";
const DashboardProgressChart = () => {
  const [chartData, setChartData] = useState([]);
  const [intake, setIntake] = useState();
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [month, setMonth] = useState();
  const [monthLabel, setMonthLabel] = useState("Month");
  const [monthValue, setMonthValue] = useState(0);
  const [yearLable, setYearLable] = useState("Year");
  const [yearValue, setYearValue] = useState(0);
  const [date, setDate] = useState(null);
  console.log(date, "data");

  useEffect(() => {
    get(`AccountIntakeDD/index`).then((res) => {
      setIntake(res);
    });
    get(`Month/Getall`).then((res) => {
      setMonth(res);
    });

    get("AccountIntake/GetCurrentAccountIntake").then((res) => {
      console.log(res);
      setIntakeLabel(res?.intakeName);
      setIntakeValue(res?.id);
    });
  }, []);

  useEffect(() => {
    get(
      `Report/ProgressReport/${intakeValue}/${date}/${monthValue}/${yearValue}`
    ).then((res) => {
      console.log(res);
      const dataArray = [
        res?.totalApplication,
        res?.underAssesment,
        res?.submittedToUniversity,
        res?.unconditionalOffer,
        res?.totalRegistered,
        res?.totalRejected,
        res?.totalWithdrawn,
      ];
      setChartData(dataArray);
    });
  }, [intakeValue, date, monthValue, yearValue]);

  const intakeList = intake?.map((key) => ({
    label: key.name,
    value: key.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    setYearLable("Year");
    setYearValue(0);
    setMonthLabel("Month");
    setMonthValue(0);
    setDate(null);
  };
  const monthList = month?.map((key) => ({
    label: key.name,
    value: key.id,
  }));

  const selectMonth = (label, value) => {
    setMonthLabel(label);
    setMonthValue(value);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setDate(null);
  };

  const dateHandle = (e) => {
    setDate(e.target.value);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setYearLable("Year");
    setYearValue(0);
    setMonthLabel("Month");
    setMonthValue(0);
  };

  return (
    <div className="custom-card-border py-4 mb-30px">
      <div className="d-flex flex-wrap justify-content-between px-4">
        <h5 className="mb-0">Progress Report</h5>
        <div className="d-flex flex-wrap justify-content-between">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "1px solid rgba(0,0,0,.1)",
              }),
            }}
            options={intakeList}
            value={{ label: intakeLabel, value: intakeValue }}
            onChange={(opt) => selectIntake(opt.label, opt.value)}
            name="intake"
            id="intake"
            required
          />
          <Year
            lable={yearLable}
            setLable={setYearLable}
            yearValue={yearValue}
            setYearValue={setYearValue}
            action={() => {
              setIntakeLabel("Intake");
              setIntakeValue(0);
              setMonthLabel("Month");
              setMonthValue(0);
              setDate(null);
            }}
          />
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "1px solid rgba(0,0,0,.1)",
                marginRight: "8px",
              }),
            }}
            options={monthList}
            value={{ label: monthLabel, value: monthValue }}
            onChange={(opt) => selectMonth(opt.label, opt.value)}
            name="month"
            id="month"
            required
          />

          <input
            style={{ border: "1px solid rgba(0,0,0,.1)", borderRadius: "4px" }}
            type="date"
            name="date"
            id="date"
            onChange={(e) => {
              dateHandle(e);
            }}
            value={date}
          />
        </div>
      </div>
      <hr />
      <div className="px-4">
        <p className="text-gray fw-500" style={{ fontWeight: "500" }}>
          {intakeLabel !== "Intake" && intakeLabel}
          {monthLabel !== "Month" && monthLabel}{" "}
          {yearLable !== "Year" && yearLable}
          {date !== null && date}
        </p>
        <Row className="p-2">
          <Col>
            <Chart
              type="bar"
              width={"90%"}
              height={300}
              series={[
                {
                  name: "total",
                  data: chartData,
                  // data: [30, 40, 45, 50, 39],
                },
              ]}
              options={{
                dataLabels: {
                  enabled: true,
                },
                plotOptions: {
                  bar: {
                    distributed: true,
                    horizontal: true,
                    barHeight: "90%",
                  },
                },
                xaxis: {
                  categories: [
                    "Total Application",
                    "Under Assessment",
                    "Submitted to University",
                    "Unconditional Offer",
                    "Total Registered",
                    "Rejections",
                    "Total Withdrawn",
                  ],
                },
                grid: {
                  yaxis: {
                    labels: {
                      style: {
                        fontSize: "15",
                        colors: ["#1e98b0"],
                      },
                    },
                    lines: {
                      show: false,
                    },
                  },
                },
                colors: [
                  "#24A1CD",
                  "#5B9A8B",
                  "#23CCB5",
                  "#AE75F8",
                  "#70E000",
                  "#F87675",
                  "#34495E",
                ],
              }}
            ></Chart>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardProgressChart;
