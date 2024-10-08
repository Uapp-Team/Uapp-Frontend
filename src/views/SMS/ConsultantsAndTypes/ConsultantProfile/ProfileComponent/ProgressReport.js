import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
// import Select from "react-select";

const ProgressReport = ({ id }) => {
  // const userId = localStorage.getItem("referenceId");
  // const [data, setData] = useState({});

  // const [intake, setIntake] = useState();
  // const [intakeLabel, setIntakeLabel] = useState(" Intake");
  // const [intakeValue, setIntakeValue] = useState(0);
  // const [month, setMonth] = useState();
  // const [monthLabel, setMonthLabel] = useState(" Month");
  // const [monthValue, setMonthValue] = useState(0);
  // const [date, setDate] = useState(null);
  const [progress, setProgress] = useState();
  const [estIncome, setEstIncome] = useState({});

  // useEffect(() => {
  //   get(`AccountIntakeDD/index`).then((res) => {
  //     setIntake(res);
  //   });
  //   get(`Month/Getall`).then((res) => {
  //     setMonth(res);
  //   });
  // }, []);

  useEffect(() => {
    get(
      `ConsultantDashboard/ProgressReport?id=${id}`
      // `ConsultantDashboard/ConsultantProgressReport/?id=${id}&&day=${date}&&MonthId=${monthValue}&&YearId=${intakeValue}`
    ).then((res) => {
      setProgress(res);
    });
    get(`ConsultantDashboard/EstimatedIncomeOfCurrentIntake/${id}`).then(
      (res) => {
        setEstIncome(res);
      }
    );
  }, [id]);

  //------------ Important Comment Start ----------------
  // const intakeList = intake?.map((key) => ({
  //   label: key.name,
  //   value: key.id,
  // }));

  // const selectIntake = (label, value) => {
  //   setIntakeLabel(label);
  //   setIntakeValue(value);
  // };
  // const monthList = month?.map((key) => ({
  //   label: key.name,
  //   value: key.id,
  // }));

  // const selectMonth = (label, value) => {
  //   setMonthLabel(label);
  //   setMonthValue(value);
  // };
  //------------ Important Comment End ----------------

  return (
    <div>
      <Card className="p-3">
        <CardBody>
          <div className="d-flex flex-wrap justify-content-between">
            {/* <span className="const-target-style">Progress Report</span> */}
            <h5 className="mb-0">Progress Report</h5>
            {/* <div className="d-flex flex-wrap justify-content-between">
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
                  setDate(e.target.value);
                }}
                value={date}
              />
            </div> */}
          </div>
          <hr />

          <p className="text-gray">Intake July 2022-October 2022</p>
          <Row>
            <Col
              className="rounded-7px m-1 p-3"
              style={{
                background:
                  "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #24A1CD",
              }}
            >
              <h2 className="text-white">{progress?.totalApplication}</h2>
              <p className="text-white">Total Application</p>
            </Col>
            <Col
              className="rounded-7px m-1 p-3"
              style={{
                background:
                  "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #23CCB5",
              }}
            >
              <h2 className="text-white">{progress?.submittedToUniversity}</h2>
              <p className="text-white">Submitted to University</p>
            </Col>
            <Col
              className="rounded-7px m-1 p-3"
              style={{
                background:
                  "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #AE75F8",
              }}
            >
              <h2 className="text-white">{progress?.unconditionalOffer}</h2>
              <p className="text-white">Unconditional Offer</p>
            </Col>
            <Col
              className="rounded-7px m-1 p-3"
              style={{
                background:
                  "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #F7BD12",
              }}
            >
              <h2 className="text-white">{progress?.totalRegistered}</h2>
              <p className="text-white">Total Registered</p>
            </Col>
            <Col
              className="rounded-7px m-1 p-3"
              style={{
                background:
                  "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #F87675",
              }}
            >
              <h2 className="text-white">{progress?.totalRejected}</h2>
              <p className="text-white">Total Rejected</p>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="text-center p-5 my-4">
              <div className="d-flex justify-content-around">
                <div className="picChart">
                  <div class="inner-round"></div>
                </div>
              </div>
              <div className="row mt-5">
                {progress?.rangeItems?.map((item) => (
                  <div class="col-4 d-flex mb-2">
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
            <Col
              md="6"
              className="my-md-5 py-md-5 d-flex justify-content-center"
            >
              <div className="card-report-income">
                <div className="header">
                  <h1 className="title">Estimated Income</h1>
                </div>
                <div className="body">
                  <h1 className="amount">£ {estIncome?.estimatedAmount}</h1>
                </div>
                <div className="footer">
                  <p className="intake"> {estIncome?.currentIntake}</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProgressReport;
