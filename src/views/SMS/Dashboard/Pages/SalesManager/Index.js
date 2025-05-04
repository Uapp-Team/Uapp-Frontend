import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import gift from "../../../../../assets/img/gift.PNG";
import get from "../../../../../helpers/get";
import { Link, useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";

import DashboardProgressReportStaff from "../../../../../components/ui/DashboardProgressReportStaff";
import { userTypes } from "../../../../../constants/userTypeConstant";
import UserNotices from "../../Component/UserNotices";
import Filter from "../../../../../components/Dropdown/Filter";
import DashboardProgressChart from "../../../../../components/ui/DashboardProgressChart";
import DashboardComission from "../../Component/DashboardComission";

const SalesManager = () => {
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState({});
  const [consultants, setConsultants] = useState([]);

  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const history = useHistory();
  const [intake, setIntake] = useState({});
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });

    get(`SalesManagerDashboard/GetTransactions`).then((res) => {
      setConsultants(res);
    });
  }, []);

  useEffect(() => {
    const filterData = intakeRngDD.filter((status) => {
      return status.id === intake?.id;
    });

    setIntakeRngValue(filterData[0]?.id);
    setIntakeRngLabel(filterData[0]?.name);
  }, [intakeRngDD, intake]);

  useEffect(() => {
    get(`SalesManagerDashboard/cards/${intakeRngValue}`).then((res) => {
      setCount(res);
      console.log(res);
    });
  }, [intakeRngValue]);

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your portal.
          </span>
        </div>

        <div className="d-flex  align-items-center">
          <div
            className=" mr-4 mb-1 d-flex align-items-center"
            style={{ marginTop: "-17px" }}
          >
            <span className="mr-1 fw-500">Intake Range:</span>
            <Filter
              data={intakeRngDD}
              label={intakeRngLabel}
              setLabel={setIntakeRngLabel}
              value={intakeRngValue}
              setValue={setIntakeRngValue}
              action={() => {}}
              isDisabled={false}
            />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/addStudentRegister`);
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img
                src={plusicon}
                className="img-fluid dashbard-img-style1"
                alt=""
              />
              <span className="std-dashboard-style3">Add Student</span>
            </div>
          </div>

          <UserNotices />
        </div>
      </div>

      {/* Status reports start */}

      <Row>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Application"
            value={count?.totalApplication}
            link={`/applicationsbyintake/${intakeRngValue}`}
            bgColor="#E1F5FC"
            borderColor="#24A1CD"
            secondValue={count?.totalApplicant}
            secondColor="#176682"
            secondBgColor="#BAE7F7"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Applications in Process"
            value={count?.totalApplicationInProgress}
            // link={`/applicationsByStatus/${5}/${1}/${intakeRngValue}`}
            bgColor="#FBF5E8"
            borderColor="#FFBA08"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Unconditional Offer"
            value={count?.totalUnconditionalOffer}
            link={`/applicationsByStatus/${9}/${0}/${intakeRngValue}`}
            bgColor="#F8F3FF"
            borderColor="#AE75F8"
            secondValue={count?.totalUnconditionalStudent}
            secondColor="#451782"
            secondBgColor="#E3D1FA"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Registered"
            value={count?.totalRegistered}
            link={`/applicationsByStatus/${12}/${38}/${intakeRngValue}`}
            bgColor="#F0FFE0"
            borderColor="#70E000"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Rejected / cancelled"
            value={count?.totalRejected}
            // link={`/applicationsByStatus/${12}/${1}/${intakeRngValue}`}
            bgColor="#FEF6F5"
            borderColor="#F87675"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Withdrawn Application"
            value={count?.totalWithdrawn}
            link={`/applicationsByStatus/${12}/${41}/${intakeRngValue}`}
            bgColor="#EDF1F5"
            borderColor="#34495E"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="New Consultants"
            value={count?.totalNewConsultant}
            bgColor="#E8FAF5"
            borderColor="#5B9A8B"
          />
        </Col>
        <Col md={3} xs={6} className="mb-30px">
          <DashboardCount
            title="Conversion Rate"
            value={`${count?.conversionRate}%`}
            bgColor="#FDF5E7"
            borderColor="#9E6F21"
          />
        </Col>
      </Row>

      {/* status reports end */}

      {/* table start */}

      <>
        <DashboardApplication
          url={`SalesManagerDashboard/NewApplications/${intakeRngValue}`}
        />
        <DashboardReadyToApply
          url={`SalesManagerDashboard/ReadyToApplyApplications/${intakeRngValue}`}
        />
        {/* <DashboardProgressChart /> */}
        {/* <DashboardComission id={intakeRngValue} /> */}
      </>

      <div className="custom-card-border p-4 mb-30px">
        <h5>Consultant Transaction List</h5>

        {consultants?.length > 0 ? (
          <div className="overflowY-300px">
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <th>Consultant ID</th>
                  <th>Consultant Name</th>
                  <th>Total In Flow</th>
                  <th>Total Out Flow</th>
                  <th>Total Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {consultants?.map((con, i) => (
                  <tr key={i} className="border-buttom">
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        className="text-id hover"
                        to={`consultantProfile/${con?.consultantId}`}
                      >
                        {con?.consultantViewId}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-body"
                        to={`consultantProfile/${con?.consultantId}`}
                      >
                        {con?.consultantName}
                      </Link>
                    </td>
                    <td>£ {con?.credit}</td>
                    <td>£ {con?.debit}</td>
                    <td>£ {con?.balance} </td>
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        to={`accountTransactionByConsultant/${con?.consultantId}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <div className="text-center text-blue">
              <Link to="/accountTransaction">See All</Link>
            </div> */}
          </div>
        ) : (
          <p className="text-center">No Transaction</p>
        )}
      </div>

      {/* consultant transaction list table end */}
    </>
  );
};

export default SalesManager;
