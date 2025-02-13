import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  FormGroup,
  Form,
  Input,
  Col,
  Row,
} from "reactstrap";
import Chart from "react-apexcharts";

import get from "../../../helpers/get";
import ButtonLoader from "../Components/ButtonLoader";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const ProviderDailyReport = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progress, setProgress] = useState(false);
  const [options4, setOptions4] = useState({});
  const [series4, setSeries4] = useState([]);
  const [count, setCount] = useState({});

  // useEffect(() => {
  //   get(
  //     `ProviderDailyReport/Report?StartTime=${startDate}&EndTime=${endDate}`
  //   ).then((res) => {
  //     setCount(res);
  //     setOptions4({
  //       chart: {
  //         type: "pie",
  //       },
  //       colors: ["#4BADC0", "#9AD0DB"],
  //       labels: ["Converted", "Not Converted"],
  //       responsive: [
  //         {
  //           breakpoint: 480,
  //           options: {
  //             chart: {
  //               width: 200,
  //             },
  //           },
  //         },
  //       ],
  //     });

  //     setSeries4([res?.convertedPercentage, res?.notConvertedPercentage]);
  //   });
  // }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setProgress(true);
    get(
      `ProviderDailyReport/Report?StartTime=${startDate}&EndTime=${endDate}`
    ).then((res) => {
      setProgress(false);
      console.log(res);
      setCount(res);
      setOptions4({
        chart: {
          type: "pie",
        },
        colors: ["#4BADC0", "#9AD0DB"],
        labels: ["Converted", "Not Converted"],
        responsive: [
          // {
          //   breakpoint: 480,
          //   options: {
          //     chart: {
          //       width: 200,
          //     },
          //   },
          // },
        ],
      });

      setSeries4([res?.convertedPercentage, res?.notConvertedPercentage]);
    });
  };

  return (
    <div>
      <BreadCrumb title="Provider Daily Report" backTo="" path="" />
      <Card>
        <CardBody>
          <Form>
            <FormGroup className="has-icon-left position-relative">
              <form onSubmit={handleSearch}>
                <Row>
                  <Col md="4">
                    <label style={{ fontSize: 15 }}>Start Date:</label>
                    <Input
                      type="date"
                      width="50"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      onChange={(e) => setStartDate(e.target.value)}
                      // defaultValue={datee}
                    />
                  </Col>
                  <Col md="4">
                    <label style={{ fontSize: 15 }}>End Date:</label>
                    <Input
                      type="date"
                      width="50"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      onChange={(e) => setEndDate(e.target.value)}
                      // defaultValue={datee}
                    />
                  </Col>
                  <Col md="2">
                    <div
                      className="d-flex justify-content-start"
                      style={{ marginTop: 28 }}
                    >
                      <CustomButtonRipple
                        color={"primary"}
                        type={"submit"}
                        //   func={handleSearch}
                        name={progress ? <ButtonLoader /> : "Search"}
                        permission={6}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
            </FormGroup>
            {/* <FormGroup>
              <div className="">
                <form onSubmit={handleSearch}>
                  <div className="row">
                    <div className="col-md-2">
                      <label>Start Date:</label>
                      <Input
                        type="date"
                        required
                        className="daily-report-daepicker-style"
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <label>End Date:</label>
                      <Input
                        type="date"
                        required
                        className="daily-report-daepicker-style"
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <div
                        className="d-flex justify-content-start"
                        style={{ marginTop: 28 }}
                      >
                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          //   func={handleSearch}
                          name={progress ? <ButtonLoader /> : "Search"}
                          permission={6}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </FormGroup> */}
          </Form>
        </CardBody>
      </Card>

      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <Card>
            <CardBody>
              <div className="col-md-6 col-sm-12"></div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="count-card count-primary counter-h-60">
                    <div className="count-card-title">Total Application</div>

                    <div
                      className="count-card-value"
                      // onClick={() => {
                      //   history.push(`/applications`);
                      // }}
                      style={{ cursor: "pointer" }}
                    >
                      {count?.totalApplication}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="count-card count-primary counter-h-60">
                    <span className="pvdadmin-span-style1">
                      Converted Percentage
                    </span>

                    <span
                      className="pvdadmin-span-style2"
                      style={{ color: "#23CCB5", cursor: "pointer" }}
                      // onClick={() => {
                      //   history.push(`/applicationsByStatus/${2}/${1}`);
                      // }}
                    >
                      {count?.convertedPercentage}
                    </span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="count-card counter-h-60"
                    style={{ border: "0.5px solid #AE75F8" }}
                  >
                    <span className="pvdadmin-span-style1">
                      Submitted University
                    </span>

                    <span
                      className="pvdadmin-span-style2"
                      style={{ color: "#AE75F8", cursor: "pointer" }}
                      // onClick={() => {
                      //   history.push(`/applicationsByStatus/${9}/${0}`);
                      // }}
                    >
                      {count?.submittedToUniversity}
                    </span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="count-card counter-h-60"
                    style={{ border: "0.5px solid #F7BD12 " }}
                  >
                    <span className="pvdadmin-span-style1">
                      Total Registered
                    </span>

                    <span
                      className="pvdadmin-span-style2"
                      style={{ color: "#F7BD12", cursor: "pointer" }}
                      // onClick={() => {
                      //   history.push(`/applicationsByStatus/${12}/${38}`);
                      // }}
                    >
                      {count?.totalRegistered}
                    </span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="count-card counter-h-60"
                    style={{ border: "0.5px solid #F87675" }}
                  >
                    <span className="pvdadmin-span-style1">Rejected </span>

                    <span
                      // onClick={() => {
                      //   history.push(`/applicationsByStatus/${5}/${1}`);
                      // }}
                      className="pvdadmin-span-style2"
                      style={{ color: "#F87675", cursor: "pointer" }}
                    >
                      {count?.totalRejected}
                    </span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="count-card counter-h-60"
                    style={{ border: "0.5px solid #707070" }}
                  >
                    <span className="pvdadmin-span-style1">
                      Unconditional Offer
                    </span>

                    <span
                      // onClick={() => {
                      //   history.push(`/applicationsByStatus/${12}/${41}`);
                      // }}
                      className="pvdadmin-span-style2"
                      style={{ color: "#707070", cursor: "pointer" }}
                    >
                      {count?.unconditionalOffer}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6 col-sm-12">
          <Card>
            <CardBody>
              <div className="cardHeader1">
                <center>
                  <h5
                    // onClick={() => this.selectbyIntake()}
                    className="uapp-dachboard-head"
                  >
                    Conversions %
                  </h5>
                </center>
              </div>
              <Chart
                options={options4}
                series={series4}
                type="pie"
                width="100%"
                height="272"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDailyReport;
