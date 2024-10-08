import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  Input,
} from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import get from "../../../helpers/get";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";

const AgentReport = () => {
  const token = JSON.parse(localStorage.getItem("current_user"));
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [date, setDate] = useState("0001-01-01");
  const [currentIntake, setCurrentIntake] = useState({});
  const [intakeId, setIntakeId] = useState(0);
  const [reportData, setReportData] = useState({});
  const [isShowCalender, setIsShowCalender] = useState(false);
  const [monthlyCardShow, setMonthlyCardShow] = useState(false);
  const [yearData, setYearData] = useState([]);
  const [yearLabel, setYearLabel] = useState("Select Year");
  const [yearValue, setYearValue] = useState(0);
  const [activeMonth, setActiveMonth] = useState(0);
  const [chartColorDemo, setChartColorDemo] = useState("");
  const [rangeItems, setRangeItems] = useState([]);
  const [nextStepCounter, setNextStepCounter] = useState("");

  const history = useHistory();

  useEffect(() => {
    get("ConsultantDD/index").then((res) => {
      setConsultant(res);
    });

    get("YearDD/Index").then((res) => {
      // setConsultant(res);
      setYearData(res);
    });

    get("AccountIntake/GetCurrentAccountIntake").then((res) => {
      setCurrentIntake(res);
      setIntakeId(res?.id);
    });

    if (consultantValue != 0) {
      get(
        `Report/ProgressReport?consultantId=${consultantValue}&accountIntakeId=${intakeId}&day=${date}&MonthId=${0}&YearId=${0}`
      ).then((res) => {
        console.log("Response", res);
        // setCurrentIntake(res);
        setReportData(res);
        setRangeItems(res?.rangeItems);
        setNextStepCounter(res?.remainingFromTarget);
      });
    }
  }, [consultantValue, intakeId, date]);

  const yearOptions = yearData?.map((year) => ({
    label: year.name,
    value: year.id,
  }));

  const consultantOption = consultant?.map((c) => ({
    label: c?.name,
    value: c?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
    setRangeItems([]);
  };

  // on clear
  const handleClearSearch = () => {
    setConsultantValue(0);
    setConsultantLabel("Select Consultant");
    setRangeItems([]);
    setNextStepCounter("");
    setReportData({});
  };

  const selectDate = (e) => {
    setIsShowCalender(false);

    // const day = e.getDate();
    // const month = e.getMonth() + 1;
    // const year = e.getFullYear();

    setDate(e.target.value);

    // const handleDate = e =>{
    //   var datee = e;
    //
    //   var utcDate = new Date(e);
    //   var localeDate = utcDate.toLocaleString("en-CA");
    //   const x = localeDate.split(",")[0];
    //   return x;
    // }

    // fetch('api/Report/DailyReport/' + this.state.agvalue + '/' + year + '/' + month + '/' + day)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ AppProgress: data, loading: false, date: e });
    //
    //   });
  };

  const monthlyCardClose = () => {
    setMonthlyCardShow(false);
  };

  // select Year
  const selectYear = (label, value) => {
    setYearLabel(label);
    setYearValue(value);
  };

  const toggleMonth = (month) => {
    setMonthlyCardShow(false);
    setActiveMonth(month);
  };

  const redirectToAddCommission = () => {
    history.push(`/consultantCommission/${consultantValue}`);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const backgroundStyle = {
    background: chartColorDemo,
  };

  return (
    <>
      <div className="animated fadeIn">
        <div className="uapp-dashboard">
          <div className="uapp-dashboard-activity">
            <BreadCrumb title="Report" backTo="" path="/" />
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

            {/* Progress Report Card */}
            {/* <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="card">
                  <div className="card-body">
                    <span>
                      <h5 class="uapp-dachboard-head">Progress Report</h5>
                    </span>

                    <Card className="mt-3">
                      <div className="d-flex flex-wrap justify-content-between">
                        <div className="d-flex">
                          <span
                            className="mt-1 me-1"
                            style={{ fontSize: "16px", fontWeight: "500" }}
                          >
                            Daily
                          </span>
                          <Input className="ms-1" type="date" />
                        </div>

                        <div className="d-flex">
                          <span
                            className="mt-1 me-1"
                            style={{ fontSize: "16px", fontWeight: "500" }}
                          >
                            Monthly
                          </span>
                          <Select
                            styles={customStyles2}
                            value={{ label: monthLabel, value: monthValue }}
                            className="ms-1"
                            name="UniversityTypeId"
                            id="UniversityTypeId"
                          />
                        </div>

                        <div className="d-flex">
                          <span
                            className="mt-1 me-1"
                            style={{ fontSize: "16px", fontWeight: "500" }}
                          >
                            Yearly
                          </span>
                          <Select
                            styles={customStyles2}
                            value={{ label: yearLabel, value: yearValue }}
                            className="ms-1"
                            name="UniversityTypeId"
                            id="UniversityTypeId"
                          />
                        </div>
                      </div>

                      <hr />
                    </Card>
                  </div>
                </div>
              </div>
            </div> */}

            <div
              className="row calenderProperty"
              style={{ position: "relative" }}
            >
              <div
                className={
                  isShowCalender === true
                    ? "calenderactive"
                    : "calenderdeactive"
                }
              >
                <Row className="calender calender-repot-pop-up">
                  {/* <Col xs="12" md="2" className="mb-2">
                    <DatePicker
                      id="selectbydate" name="selectbydate"
                      placeholder="DD/MM/YYYY"
                      selected={date} 
                      placeholderText="Select by Date"
                      value={date}
                      dateFormat='dd/MM/yyyy'
                      onChange={(e) => selectDate(e)}
                      // showYearDropdown
                      //scrollableMonthYearDropdown
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      inline
                    />
                  </Col> */}

                  <FormGroup className="has-icon-left position-relative">
                    {/* <Col md="4"> */}
                    {/* <span>
                            Start Date <span className="text-danger">*</span>{" "}
                            </span> */}
                    {/* </Col> */}
                    {/* <Col md="8"> */}
                    <Input
                      type="date"
                      name="StartDate"
                      id="StartDate"
                      onChange={(e) => selectDate(e)}
                      // defaultValue={handleDate(currUpdateData?.startDate)}
                    />
                    {/* </Col> */}
                  </FormGroup>
                </Row>
              </div>

              <div className="col-lg-12 col-md-12 col-12">
                <div className="card">
                  <div className="card-body">
                    {reportData !== false ? (
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="uapp-progress-bar">
                            <Row>
                              <Col>
                                <div className="no-border">
                                  <div className="cardHeader1">
                                    <Row>
                                      <Col>
                                        <center>
                                          <h5
                                            // onClick={() => this.selectbyIntake()}
                                            className="uapp-dachboard-head"
                                          >
                                            {consultantValue != 0
                                              ? currentIntake?.intakeName
                                              : null}
                                          </h5>
                                        </center>
                                      </Col>
                                      <Col>
                                        <center>
                                          <h5
                                            onClick={() =>
                                              setIsShowCalender(!isShowCalender)
                                            }
                                            className="uapp-dachboard-head"
                                          >
                                            Daily
                                          </h5>
                                        </center>
                                      </Col>
                                      <Col>
                                        <center>
                                          <h5
                                            onClick={() =>
                                              setMonthlyCardShow(true)
                                            }
                                            className="uapp-dachboard-head"
                                          >
                                            Monthly
                                          </h5>
                                        </center>
                                      </Col>
                                    </Row>
                                  </div>

                                  {monthlyCardShow == true ? (
                                    <Card className="monthly-card">
                                      <div
                                        className="cardHeader1"
                                        style={{ padding: "5px 3px" }}
                                      >
                                        <Row>
                                          <Col xs="8">
                                            <div className="controls app-search-filter">
                                              <Select
                                                options={yearOptions}
                                                value={{
                                                  label: yearLabel,
                                                  value: yearValue,
                                                }}
                                                onChange={(opt) =>
                                                  selectYear(
                                                    opt.label,
                                                    opt.value
                                                  )
                                                }
                                              />
                                            </div>
                                          </Col>
                                          <Col xs="4" className="text-right">
                                            <div
                                              onClick={monthlyCardClose}
                                              style={{
                                                fontSize: "27px",
                                                color: "#c10c0c",
                                                cursor: "pointer",
                                                paddingRight: "5px",
                                              }}
                                            >
                                              <i className="fa fa-times-circle"></i>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                      <CardBody
                                        style={{ border: "1px solid #cbd4dd" }}
                                      >
                                        <div className="progress-month">
                                          <Nav className="row">
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={activeMonth == 1}
                                                onClick={() => {
                                                  toggleMonth(1);
                                                }}
                                              >
                                                Jan
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 2}
                                              // onClick={() => { this.toggleMonth(2); }}
                                              >
                                                Feb
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 3}
                                              // onClick={() => { this.toggleMonth(3); }}
                                              >
                                                March
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 4}
                                              // onClick={() => { this.toggleMonth(4); }}
                                              >
                                                April
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 5}
                                              // onClick={() => { this.toggleMonth(5); }}
                                              >
                                                May
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 6}
                                              // onClick={() => { this.toggleMonth(6); }}
                                              >
                                                June
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 7}
                                              // onClick={() => { this.toggleMonth(7); }}
                                              >
                                                July
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 8}
                                              // onClick={() => { this.toggleMonth(8); }}
                                              >
                                                Aug
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 9}
                                              // onClick={() => { this.toggleMonth(9); }}
                                              >
                                                Sep
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 10}
                                              // onClick={() => { this.toggleMonth(10); }}
                                              >
                                                Oct
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 11}
                                              // onClick={() => { this.toggleMonth(11); }}
                                              >
                                                Nov
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                              // active={this.state.activeMonth == 12}
                                              // onClick={() => { this.toggleMonth(12); }}
                                              >
                                                Dec
                                              </NavLink>
                                            </NavItem>
                                          </Nav>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  ) : null}

                                  {/* {this.state.CardShow == true ?

                                    <Card className="monthly-card">
                                      <CardHeader className="db-card-header no-border-bottom" style={{ padding:"5px 3px"}}>
                                        <Row>
                                          <Col xs="8">
                                        <div className="controls app-search-filter">
                                          <Select 
                                            options={IntakeYear}
                                            value={{label: this.state.ylable, value: this.state.yvalue }}
                                            onChange={opt => this.selectyear(opt.label, opt.value)}
                                            />
                                        </div>
                                          </Col>
                                          <Col xs="4" className="text-right">
                                            <div style={{ fontSize: "27px", color: "#c10c0c", cursor: "pointer", paddingRight:"5px" }}>
                                              <i className="fa fa-times-circle" onClick={this.monthlycardclose}></i>
                                        </div>
                                          </Col>
                                          </Row>
                                      </CardHeader>
                                      <CardBody>
                                        <div className="progress-month">
                                          <Nav className="row">
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 1}
                                                onClick={() => { this.toggleMonth(1); }}
                                              >
                                                Jan
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 2}
                                                onClick={() => { this.toggleMonth(2); }}
                                              >
                                                Feb
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 3}
                                                onClick={() => { this.toggleMonth(3); }}
                                              >
                                                March
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 4}
                                                onClick={() => { this.toggleMonth(4); }}
                                              >
                                                April
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 5}
                                                onClick={() => { this.toggleMonth(5); }}
                                              >
                                                May
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 6}
                                                onClick={() => { this.toggleMonth(6); }}
                                              >
                                                June
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 7}
                                                onClick={() => { this.toggleMonth(7); }}
                                              >
                                                July
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 8}
                                                onClick={() => { this.toggleMonth(8); }}
                                              >
                                                Aug
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 9}
                                                onClick={() => { this.toggleMonth(9); }}
                                              >
                                                Sep
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 10}
                                                onClick={() => { this.toggleMonth(10); }}
                                              >
                                                Oct
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 11}
                                                onClick={() => { this.toggleMonth(11); }}
                                              >
                                                Nov
                                              </NavLink>
                                            </NavItem>
                                            <NavItem className="col-6">
                                              <NavLink
                                                active={this.state.activeMonth == 12}
                                                onClick={() => { this.toggleMonth(12); }}
                                              >
                                                Dec
                                              </NavLink>
                                            </NavItem>
                                          </Nav>
                                        </div>
                                      </CardBody>
                                    </Card>
                                     :
                                    null
                                  }  */}

                                  <CardBody>
                                    <div className="mt-5">
                                      <div>
                                        <div className="progress-chart">
                                          <div className="d-flex w-100">
                                            <div
                                              className="mr-2"
                                              style={{
                                                background: "#24A1CD",
                                                width: "4%",
                                              }}
                                            >
                                              {" "}
                                            </div>{" "}
                                            <h6 className="mt-2 w-75">
                                              {" "}
                                              Total Application
                                            </h6>
                                            <span className="w-20">
                                              {" "}
                                              {reportData.totalApplication}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="progress-chart">
                                          <div className="d-flex w-100">
                                            <div
                                              className="mr-2"
                                              style={{
                                                background: "#23CCB5",
                                                width: "4%",
                                              }}
                                            >
                                              {" "}
                                            </div>{" "}
                                            <h6 className="mt-2 w-75">
                                              {" "}
                                              Submitted to University{" "}
                                            </h6>
                                            <span className=" w-20">
                                              {" "}
                                              {reportData.submittedToUniversity}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="progress-chart">
                                          <div className="d-flex w-100">
                                            <div
                                              className="mr-2"
                                              style={{
                                                background: "#AE75F8",
                                                width: "4%",
                                              }}
                                            >
                                              {" "}
                                            </div>{" "}
                                            <h6 className="mt-2 w-75">
                                              {" "}
                                              Unconditional Offer{" "}
                                            </h6>
                                            <span className="w-20">
                                              {" "}
                                              {reportData.unconditionalOffer}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="progress-chart">
                                          <div className="d-flex w-100">
                                            <div
                                              className="mr-2"
                                              style={{
                                                background: "#F7BD12",
                                                width: "4%",
                                              }}
                                            >
                                              {" "}
                                            </div>
                                            <h6 className="mt-2 w-75">
                                              {" "}
                                              Total Registered{" "}
                                            </h6>
                                            <span className="w-20">
                                              {" "}
                                              {reportData.totalRegistered}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="progress-chart">
                                          <div className="d-flex w-100">
                                            <div
                                              className="mr-2"
                                              style={{
                                                background: "#F87675",
                                                width: "4%",
                                              }}
                                            >
                                              {" "}
                                            </div>{" "}
                                            <h6 className="mt-2 w-75">
                                              {" "}
                                              Total Rejected{" "}
                                            </h6>
                                            <span className="w-20">
                                              {" "}
                                              {reportData.totalRejected}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardBody>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="cardHeader1">
                            <center>
                              <h5
                                // onClick={() => this.selectbyIntake()}
                                className="uapp-dachboard-head"
                              >
                                Target Report
                              </h5>
                            </center>
                          </div>

                          {consultantValue !== 0 ? (
                            <CardBody>
                              {/*<div className="chart-wrapper">*/}
                              {/*  <Pie data={pie} />*/}
                              {/*</div>*/}

                              <div className="main-chart">
                                <div className="text-center  mb-3">
                                  <h5 style={{ color: "#1E98B0" }}>
                                    {consultantValue != 0
                                      ? currentIntake?.intakeName
                                      : null}
                                  </h5>
                                  <span>
                                    Total unconditional :{" "}
                                    {reportData.totalApplication == null
                                      ? 0
                                      : reportData.totalApplication}
                                  </span>
                                </div>

                                <div className="center-div">
                                  <div
                                    className="Pie-chart"
                                    style={backgroundStyle}
                                  >
                                    {" "}
                                    <div className="inner-round"></div>{" "}
                                  </div>
                                </div>

                                {rangeItems.length > 0 ? (
                                  <>
                                    <div className="mt-3 d-flex justify-content-between">
                                      {rangeItems.map((std, i) => (
                                        <div className="color-item d-flex justify-content-between">
                                          <div className="mr-2">
                                            {std?.rangeName}{" "}
                                          </div>
                                          <div
                                            style={{
                                              background: "" + std?.color + "",
                                              height: "12px",
                                              width: "25px",
                                              marginTop: "5px",
                                            }}
                                          >
                                            {" "}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="Unconditionals-text mt-3">
                                      <span>
                                        {" "}
                                        {nextStepCounter} more unconditionals
                                        needed to reach your target
                                      </span>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </CardBody>
                          ) : null}
                        </div>
                        <div className="col-lg-4">
                          <div className="cardHeader1">
                            <center>
                              <h5
                                // onClick={() => this.selectbyIntake()}
                                className="uapp-dachboard-head"
                              >
                                Estimated Income
                              </h5>
                            </center>
                          </div>

                          <CardBody>
                            <div className="text-center mb-3">
                              <h5 style={{ color: "#1E98B0" }}>
                                {consultantValue !== 0
                                  ? currentIntake?.intakeName
                                  : null}
                              </h5>
                            </div>
                            <div
                              className="text-center posign-center"
                              style={{ paddingTop: "30px" }}
                            >
                              <div className="target-dot">
                                <span>
                                  &pound;{" "}
                                  {consultantValue !== 0
                                    ? reportData?.consultantTotalAmount
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </CardBody>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <center>
                          <h6>
                            The commission structure is not found for the
                            selected consultant.
                          </h6>
                          <p className="mt-3">
                            Assign commission to the consultant :
                          </p>
                          <ButtonForFunction
                            func={redirectToAddCommission}
                            type={"submit"}
                            className={"mr-0 badge-primary"}
                            name={"Assign Commission"}
                            // disable={buttonStatus}
                          />
                        </center>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentReport;
