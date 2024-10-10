import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../../../../helpers/get";
import Year from "../../../../../components/date/Year";
import ConsultantProgressReport from "../../../../../components/ui/ConsultantProgressReport";

const ConsProgressReport = ({ id }) => {
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
      `Report/ConsultantProgressReport/${id}/${intakeValue}/${date}/${monthValue}/${yearValue}`
    ).then((res) => {
      setProgress(res);
    });
  }, [id, intakeValue, date, monthValue, yearValue]);

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
      <div className="custom-card-border py-4 mb-30px">
        <div className="d-flex flex-wrap justify-content-between px-4">
          {/* <span className="const-target-style">Progress Report</span> */}
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
              style={{
                border: "1px solid rgba(0,0,0,.1)",
                borderRadius: "4px",
              }}
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
          <p className="text-gray" style={{ fontWeight: "500" }}>
            {intakeLabel !== "Intake" && intakeLabel}
            {monthLabel !== "Month" && monthLabel}{" "}
            {yearLable !== "Year" && yearLable}
            {date !== null && date}
          </p>
          <ConsultantProgressReport
            progress={progress}
            estimate={`${intakeLabel !== "Intake" ? intakeLabel : ""} ${
              monthLabel !== "Month" ? monthLabel : ""
            } ${yearLable !== "Year" ? yearLable : ""} ${
              date !== null ? date : ""
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default ConsProgressReport;
