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
const DashboardProgressChart = () => {
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Select Intake");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  console.log(intakeRngValue);

  const [intake, setIntake] = useState(0);
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
        res?.data?.totalApplication,
        res?.data?.preApplicationStage,
        res?.data?.uappCompilanceStage,
        res?.data?.universityProcessingStage,
        res?.data?.conditionalOfferStage,
        res?.data?.preOfferStageOrPost,
        res?.data?.notSetYetStage,

        res?.data?.preArrivalStageOrVisa,

        res?.data?.registrationStage,
      ];
      setChartData(dataArray);
    });
  }, [intakeRngValue, intake, selectedDates]);

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
                    "Pre-Application",
                    "UAPP Compliance",
                    "University Processing",
                    "Conditional Offer",
                    "Pre-Offer Stage ",
                    "UnConditional Offer",
                    "Pre-Arrival Stage",
                    "Registration",
                    "N/A",
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
                  "#E6C317",
                  "#FF7F11",
                  "#32A852",
                  "#E63946",
                  "#F87675",
                  "#34495E",
                  "#6C63FF",
                  "#005A9C",
                  "#A52A2A",
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
