import React, { useEffect, useState } from "react";
import Select from "react-select";
import Year from "../date/Year";
import { Col, Row } from "reactstrap";
import get from "../../helpers/get";
import DashboardProgressCount from "./DashboardProgressCount";

const DashboardProgressReportStaff = () => {
  const [intake, setIntake] = useState();
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [month, setMonth] = useState();
  const [monthLabel, setMonthLabel] = useState("Month");
  const [monthValue, setMonthValue] = useState(0);
  const [yearLable, setYearLable] = useState("Year");
  const [yearValue, setYearValue] = useState(0);
  const [date, setDate] = useState(null);
  const [progress, setProgress] = useState();

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
      `Report/ProgressReport/$/${intakeValue}/${date}/${monthValue}/${yearValue}`
    ).then((res) => {
      setProgress(res);
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
                border: "none",
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
                border: "none",
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
            style={{ border: "none" }}
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
        <Row>
          <Col md="6" className="">
            <Row>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Total Application"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #24A1CD"
                />
              </Col>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Submitted to University"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #23CCB5"
                />
              </Col>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Unconditional Offer"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #AE75F8"
                />
              </Col>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Total Registered"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #70E000"
                />
              </Col>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Total Rejected"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #F87675"
                />
              </Col>
              <Col xs={6} className="mb-30px">
                <DashboardProgressCount
                  title="Withdrawn Application"
                  value={50}
                  bgColor="linear-gradient(142deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #34495E"
                />
              </Col>
            </Row>
          </Col>
          <Col md="6" className="text-center px-5">
            <div className="d-flex justify-content-around">
              <div
                className="picChart"
                style={{ background: progress?.pathname }}
              >
                <div class="inner-round"></div>
              </div>
            </div>

            <div className="row mt-5">
              {progress?.rangeItems?.map((item, i) => (
                <div class="col-4 d-flex mb-2" key={i}>
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                      background: item.color,
                      marginRight: "10px",
                    }}
                  ></div>{" "}
                  <span>{item.rangeName}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardProgressReportStaff;
