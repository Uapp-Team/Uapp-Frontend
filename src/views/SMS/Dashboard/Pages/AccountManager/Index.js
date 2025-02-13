import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "reactstrap";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import get from "../../../../../helpers/get";
import { Link } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import UserNotices from "../../Component/UserNotices";
import Filter from "../../../../../components/Dropdown/Filter";
import DashboardProgressChart from "../../../../../components/ui/DashboardProgressChart";

const AccountManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const [count, setCount] = useState({});
  const [consultants, setConsultants] = useState([]);
  const [intake, setIntake] = useState({});

  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountManagerDashboard/GetTransactions`).then((res) => {
      setConsultants(res);
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
    get(`AccountManagerDashboard/Counting/${intakeRngValue}`).then((res) => {
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

          <UserNotices />
        </div>
      </div>

      {/* status Report */}
      <Row>
        <Col lg={2} md={4} xs={6} className="mb-30px">
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
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Registered"
            value={count?.totalRegistered}
            link={`/applicationsByStatus/${12}/${38}/${intakeRngValue}`}
            bgColor="#F0FFE0"
            borderColor="#70E000"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Rejected/cancelled"
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
            link={`/applicationsByStatus/${12}/${41}/${intakeRngValue}`}
            bgColor="#EDF1F5"
            borderColor="#34495E"
          />
        </Col>
      </Row>

      {/* status Report */}

      {/* progress Report */}
      <DashboardProgressChart />
      {/* progress Report */}

      {/* table start */}

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
                        className="text-body"
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
                    <td>{con?.credit}</td>
                    <td>{con?.debit}</td>
                    <td>{con?.balance}</td>
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
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Transaction
          </p>
        )}
      </div>

      {/* table end */}
    </>
  );
};

export default AccountManager;
