import React, { useEffect, useState } from "react";
import Select from "react-select";
import Year from "../date/Year";
import { Col, Row } from "reactstrap";
import get from "../../helpers/get";
import Chart from "react-apexcharts";
import DMYPicker from "../form/DMYPicker";
import { dateDMY } from "../date/DateFormate";
import Uget from "../../helpers/Uget";
import Filter from "../Dropdown/Filter";
import DefaultDropdown from "../Dropdown/DefaultDropdown";
import DateRange from "../form/DateRange";
import { useHistory } from "react-router-dom";

const DashboardProgressChart = () => {
  const history = useHistory();
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Select Intake");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  console.log(intakeRngValue);

  const [intake, setIntake] = useState(0);
  console.log(intake);

  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [selectedDates, setSelectedDates] = useState([]);

  //////////////////////////////
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      // if (!intakeRngLabel) {
      //   setIntakeRngValue(res?.id);
      //   setIntakeRngLabel(res?.intakeName);
      // }
      setIntakeRngValue(res?.id);
      setIntakeRngLabel(res?.intakeName);
    });
  }, []);

  useEffect(() => {
    Uget(
      `ApplicationPipeline/AdmissionsPipelineProgressReport?accountIntakeId=${intakeRngValue}&intakeId=${intake}&fromApplicationDate=${
        selectedDates[0] ? selectedDates[0] : ""
      }&toApplicationDate=${selectedDates[1] ? selectedDates[1] : ""}`
    ).then((res) => {
      const dataArray = [
        res?.data?.preApplicationStage,
        res?.data?.uappCompilanceStage,
        res?.data?.universityProcessingStage,
        res?.data?.conditionalOfferStage,
        res?.data?.preOfferStageOrPost,
        res?.data?.uncoditionalOfferStage,
        res?.data?.preArrivalStageOrVisa,
        res?.data?.registrationStage,
        res?.data?.notSetYetStage,
        res?.data?.totalApplication,
      ];
      setChartData(dataArray);
    });
  }, [intakeRngValue, intake, selectedDates]);

  const handleBarClick = (event, chartContext, config) => {
    var value = getIntakeData();
    console.log(value, "my value");
    const clickedCategory =
      config.w.config.xaxis.categories[config.dataPointIndex];
    history.push({
      pathname: `/AdmissionsPipeline/${clickedCategory
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
      state: {
        selectedCategory: clickedCategory,
        intakeRngValue,
        intake,
        selectedDates,
        chartData,
      },
    });
  };

  function getIntakeData() {
    console.log(intakeRngValue);

    return intakeRngValue;
  }
  return (
    <div className="custom-card-border py-4 mb-30px">
      <div className="d-flex flex-wrap justify-content-between px-4">
        <h5 className="mb-0">Progress Report</h5>
        <div className="d-flex align-items-center justify-content-end gap-4px">
          <Filter
            data={intakeRngDD}
            label={intakeRngLabel}
            setLabel={setIntakeRngLabel}
            value={intakeRngValue}
            setValue={setIntakeRngValue}
            action={() => {}}
            className=""
          />

          <DefaultDropdown
            label={intakeLabel}
            setLabel={setIntakeLabel}
            value={intake}
            setValue={setIntake}
            url={`IntakeDD/get/${intakeRngValue}`}
            name="intake"
            action={(l, v) => setSelectedDates([])}
          />

          <DateRange
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            action={() => {
              setIntake(0);
              setIntakeLabel("Select Intake");
            }}
          />
        </div>
      </div>
      <hr />
      <div className="px-4">
        <p className="text-gray fw-500" style={{ fontWeight: "500" }}>
          {intakeRngLabel !== "Intake Range" && intakeRngLabel}
          {/* {intakeLabel !== "Intake" && intakeLabel}{" "} */}
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
                chart: {
                  events: {
                    dataPointSelection: handleBarClick,
                  },
                },
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
                    "Pre-application",
                    "UAPP Compliance",
                    "University Processing",
                    "Conditional Offer",
                    "Pre-Offer Stage/Post",
                    "Unconditional Offer",
                    "Pre arrival Stage/Visa",
                    "Registration",
                    "N/A",
                    "Total Application",
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
                  "#007ACC",
                  "#E6C317",
                  "#FF7F11",
                  "#32A852",
                  "#E63946",
                  "#2CA02C",
                  "#6C63FF",
                  "#005A9C",
                  "#afafaf",
                  "#24A1CD",
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
