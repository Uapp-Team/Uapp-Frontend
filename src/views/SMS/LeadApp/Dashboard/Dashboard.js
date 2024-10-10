import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import DashboardCard from "../UI/DashboardCard";
// import BranchOverview from "./BranchOverview";
// import SourceOverview from "./SourceOverview";
// import ConsultantPerformance from "./ConsultantPerformance";
// import Heading from "../../components/ui/Heading";
import Chart from "./Chart";
// import Line from "../../components/ui/Line";
// import DateRangePicker from "../../components/ui/DateRangePicker";
// import Loading from "../../components/ui/Loading";
// import ErrorMessage from "../../components/ui/ErrorMessage";
// import { currentDate, firstDateMonth } from "../../hooks/DateFormate";
// import DDFilterByAppUrl from "../../components/ui/DDFilterByAppUrl";
import Lget from "../../../../helpers/Lget";
import DateRangePicker from "../../../../components/form/DateRangePicker";
import DDFilterByAppUrl from "../../../../components/form/DDFilterByAppUrl";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import Line from "../../../../components/ui/Line";
import {
  currentDate,
  firstDateMonth,
} from "../../../../components/date/DateFormate";
import DashboardCard from "./DashboardCard";
import { Card, CardBody } from "reactstrap";
import { FaCoins, FaPeopleArrows, FaTasks, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const [branch, setBranch] = useState(0);
  const [formData, setFormDate] = useState(firstDateMonth);
  const [toDate, setToDate] = useState(currentDate);
  const [data, setData] = useState([]);

  // const { data, error, isLoading, isError } = Get(
  //   "key",
  //   `/LeadDashboard?fromdate=${formData}&todate=${toDate}&branchId=${branch}`
  // );

  useEffect(() => {
    Lget(
      `LeadDashboard?fromdate=${formData}&todate=${toDate}&branchId=${branch}`
    ).then((res) => {
      setData(res);
    });
  }, [branch, formData, toDate]);

  const pageData = data?.data;

  return (
    <>
      <BreadCrumb title="Lead Dashboard" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <div className="d-md-flex justify-content-between">
            {/* <Heading text="Dashboard" /> */}
            <h3>Dashboard</h3>
            <div className="d-flex">
              <DateRangePicker
                formData={formData}
                setFormDate={setFormDate}
                toDate={toDate}
                setToDate={setToDate}
                className=""
              />
              <DDFilterByAppUrl
                label=""
                placeholder="Select Branch"
                url="BranchDD/Index"
                defaultValue={branch}
                action={setBranch}
                className="ml-2"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : ( */}
      <>
        <div className="leadcard pb-0">
          <Row>
            <Col xl={3} lg={6}>
              <DashboardCard
                text="Total Lead"
                value={pageData?.totalLead}
                bg="#E5F6F6"
                color="#14C7C7"
                Icon={FaCoins}
              />
            </Col>
            <Col xl={3} lg={6}>
              <DashboardCard
                text="New Lead"
                value={pageData?.new}
                bg="#E1DAF9"
                color="#6E45F4"
                Icon={FaUsers}
              />
            </Col>
            <Col xl={3} lg={6}>
              <DashboardCard
                text="In Process"
                value={pageData?.inProcess}
                bg="#E0EFFF"
                color="#0776EB"
                Icon={FaTasks}
              />
            </Col>
            <Col xl={3} lg={6}>
              <DashboardCard
                text="Converted"
                value={pageData?.converted}
                bg="#FFF7D0"
                color="#EAC300"
                Icon={FaPeopleArrows}
              />
            </Col>
          </Row>
        </div>

        <Row>
          <Col xl={9} className="order-2 order-xl-1">
            <Chart
              totalLeads={pageData?.totalLeads}
              inProcesses={pageData?.inProcesses}
              converteds={pageData?.converteds}
              months={pageData?.months}
            />
          </Col>
          <Col xl={3} className="order-1 order-xl-2">
            <div className="leadcard bg-teal-500 h-full">
              <div className="p-16px">
                <p className="fs-13px mb-0">Bad Ratio</p>
                <span className="fw-700 fs-25px">{pageData?.badRatio}%</span>
              </div>
              <Line bgColor="#FFD681" height="2px" margin="20px" />
              <div className="p-16px">
                <p className="fs-13px mb-0">Conversion Ratio</p>
                <span className="fw-700 fs-25px">
                  {pageData?.conversionRatio}%
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* <BranchOverview /> */}
        {/* <SourceOverview /> */}
        {/* <ConsultantPerformance /> */}
        {/* <DashboardChart /> */}
      </>
      {/* )} */}

      {/* <iframe
        src="https://lead.uapp.uk/lead/setting"
        className="border-0 w-100"
      ></iframe> */}
    </>
  );
};

export default Dashboard;
