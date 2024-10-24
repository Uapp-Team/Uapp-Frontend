import React, { useEffect, useState } from "react";
import plusicon from "../../../../../assets/img/plusicon.svg";
import { Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import UserNotices from "../../Component/UserNotices";
import Filter from "../../../../../components/Dropdown/Filter";
import DashboardProgressChart from "../../../../../components/ui/DashboardProgressChart";

const AdmissionOfficer = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);

  const [count, setCount] = useState({});
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
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
    get(`AdmissionOfficerDashboard/Counting/${intakeRngValue}`).then((res) => {
      setCount(res);
    });
  }, [intakeRngValue]);

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

      <>
        <Row>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Application"
              value={count?.totalApplication}
              link={`/applicationsbyintake/${intakeRngValue}`}
              bgColor="#E1F5FC"
              borderColor="#24A1CD"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Applications in Process"
              value={count?.totalApplicationInProgress}
              // link={`/applicationsByStatus/${5}/${1}/${intakeRngValue}`}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Registered"
              value={count?.totalRegistered}
              link={`/applicationsByStatus/${2}/${3}/${intakeRngValue}`}
              bgColor="#F0FFE0"
              borderColor="#70E000"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Rejected / cancelled"
              value={count?.totalRejected}
              // link={`/applicationsByStatus/${12}/${1}/${intakeRngValue}`}
              bgColor="#FEF6F5"
              borderColor="#F87675"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Withdrawn Application"
              value={count?.totalWithdrawn}
              bgColor="#EDF1F5"
              borderColor="#34495E"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Conversion Rate"
              value={`${count?.conversionRate}%`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
        </Row>
      </>

      <DashboardApplication
        url={`AdmissionOfficerDashboard/Newapplications/${intakeRngValue}`}
      />
      <DashboardReadyToApply
        url={`AdmissionOfficerDashboard/Readyapplications/${intakeRngValue}`}
      />
      <DashboardProgressChart />

      {/* status reports end */}
    </>
  );
};

export default AdmissionOfficer;
