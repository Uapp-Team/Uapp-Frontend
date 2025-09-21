import React, { useEffect, useState } from "react";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Filter from "../../../../components/Dropdown/Filter";
import Uget from "../../../../helpers/Uget";
import get from "../../../../helpers/get";
import { useHistory } from "react-router-dom";
import DateRange from "../../../../components/form/DateRange";
import { Col, Row } from "reactstrap";
import Chart from "react-apexcharts";

const Index = () => {
  const history = useHistory();
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Select Intake");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  console.log(intakeRngValue);

  const [intake, setIntake] = useState(0);
  console.log(intake);

  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [selectedDates, setSelectedDates] = useState([]);
  const [branch, setBranch] = useState([]);
  const [branchValue, setBranchValue] = useState(0);
  const [branchLabel, setBranchLabel] = useState("Select branch");
  const [salesTeamLeader, setSalesTeamLeader] = useState([]);
  const [SalesTeamLeaderLabel, setSalesTeamLeaderLabel] = useState(
    "Select Sales Team Leader"
  );
  const [SalesTeamLeaderValue, setSalesTeamLeaderValue] = useState(0);
  const [consType, setConsType] = useState([]);
  const [consTypeLabel, setConsTypeLabel] = useState("Select Consultant Type");
  const [consTypeValue, setConsTypeValue] = useState(0);

  //////////////////////////////
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });

    get(`SalesTeamLeaderDD/Index/${branchValue}`).then((res) => {
      setSalesTeamLeader(res);
    });

    get("ConsultantTypeDD/Index").then((res) => {
      setConsType(res);
    });

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
  }, [branchValue]);

  useEffect(() => {
    Uget(
      `Consultant/ConsultantReport?consultantTypeId=${consTypeValue}&salesTeamLeaderId=${SalesTeamLeaderValue}&branchId=${branchValue}&fromConsultantDate=${
        selectedDates[0] ? selectedDates[0] : ""
      }&toConsultantDate=${selectedDates[1] ? selectedDates[1] : ""}`
    ).then((res) => {
      const dataArray = [
        res?.data?.totalRejected,
        res?.data?.totalInactive,
        res?.data?.totalJunkAccount,
        res?.data?.totalActive,
        res?.data?.totalUnderReview,
        res?.data?.totalNewAccount,
        res?.data?.total,
      ];
      setChartData(dataArray);
    });
  }, [consTypeValue, SalesTeamLeaderValue, branchValue, selectedDates]);

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
            data={consType}
            label={consTypeLabel}
            setLabel={setConsTypeLabel}
            value={consTypeValue}
            setValue={setConsTypeValue}
            action={() => {}}
          />

          <Filter
            data={branch}
            label={branchLabel}
            setLabel={setBranchLabel}
            value={branchValue}
            setValue={setBranchValue}
            action={() => {}}
          />
          <Filter
            data={salesTeamLeader}
            label={SalesTeamLeaderLabel}
            setLabel={setSalesTeamLeaderLabel}
            value={SalesTeamLeaderValue}
            setValue={setSalesTeamLeaderValue}
            action={() => {}}
          />
          {/* 
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
          /> */}

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
                    "Rejected",
                    "InActive",
                    "Junk",
                    "Active",
                    "Under Review",
                    "New Account",
                    "Total",
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
                  "#E74C3C",
                  "#95A5A6",
                  "#FFA500",
                  "#28A745",
                  "#F1C40F",
                  "#3498DB",
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

export default Index;
