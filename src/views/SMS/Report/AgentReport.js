import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";
import Year from "../../../components/date/Year";
import Consultant from "./Consultant";

const AgentReport = () => {
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
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

    get("ConsultantDD/ByUser").then((res) => {
      setConsultant(res);
    });

    get("AccountIntake/GetCurrentAccountIntake").then((res) => {
      console.log(res);
      setIntakeLabel(res?.intakeName);
      setIntakeValue(res?.id);
    });
  }, []);

  useEffect(() => {
    if (consultantValue) {
      get(
        `Report/ConsultantProgressReport/${consultantValue}/${intakeValue}/${date}/${monthValue}/${yearValue}`
      ).then((res) => {
        setProgress(res);
      });
    }
  }, [consultantValue, intakeValue, date, monthValue, yearValue]);

  const consultantOption = consultant?.map((c) => ({
    label: c?.name,
    value: c?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const handleClearSearch = () => {
    setConsultantValue(0);
    setConsultantLabel("Select Consultant");
  };

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
    <>
      <BreadCrumb title="Consultant Report" backTo="" path="/" />
      <div className="animated fadeIn">
        <div className="uapp-dashboard">
          <div className="uapp-dashboard-activity">
            <Card className="uapp-employee-search">
              <CardBody className="search-card-body">
                <Row className="mt-3">
                  <Col lg="12" md="12" sm="12" xs="12">
                    <Select
                      options={consultantOption}
                      value={{
                        label: consultantLabel,
                        value: consultantValue,
                      }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                      name="consultantId"
                      id="consultantId"
                      // isDisabled={cId}
                    />
                  </Col>
                </Row>

                <Row
                  className="calenderProperty"
                  style={{ position: "relative" }}
                >
                  <Col lg="12" md="12" sm="12" xs="12">
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                      <div className="d-flex mt-1">
                        {consultantValue !== 0 && (
                          <TagButton
                            label={consultantLabel}
                            setValue={() => setConsultantValue(0)}
                            setLabel={() =>
                              setConsultantLabel("Select Consultant")
                            }
                          ></TagButton>
                        )}
                      </div>
                      <div
                        className="mt-1 mx-1 d-flex btn-clear"
                        onClick={handleClearSearch}
                      >
                        {consultantValue !== 0 ? (
                          <button
                            className="tag-clear"
                            onClick={handleClearSearch}
                          >
                            Clear All
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            {consultantValue ? (
              <Card className="p-3">
                <CardBody>
                  <div className="d-flex flex-wrap justify-content-between">
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

                  <p className="text-gray" style={{ fontWeight: "500" }}>
                    {intakeLabel !== "Intake" && intakeLabel}
                    {monthLabel !== "Month" && monthLabel}{" "}
                    {yearLable !== "Year" && yearLable}
                    {date !== null && date}
                  </p>
                  <Consultant
                    progress={progress}
                    estimate={`${intakeLabel !== "Intake" ? intakeLabel : ""} ${
                      monthLabel !== "Month" ? monthLabel : ""
                    } ${yearLable !== "Year" ? yearLable : ""} ${
                      date !== null ? date : ""
                    }`}
                  />
                </CardBody>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentReport;
