import React, { useEffect, useState } from "react";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import plusicon from "../../../../../assets/img/plusicon.svg";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import ProviderCountingCard from "./Components/ProviderCountingCard";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import DashboardProgressReport from "../../../../../components/ui/DashboardProgressReport";
import UserNotices from "../../Component/UserNotices";
import Filter from "../../../../../components/Dropdown/Filter";
import DashboardProgressChart from "../../../../../components/ui/DashboardProgressChart";

const ProviderAdmin = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const [accountStatus, setAccountStatus] = useState(0);
  const [providerId, setProviderId] = useState(0);

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
      setIntakeRngValue(res?.id);
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
    get(`ProviderDashboard/Overview?rangeid=${intakeRngValue}`).then((res) => {
      console.log(res, "account Status");

      setAccountStatus(res.accountStatusId);
      setProviderId(res.providerId);
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

        <div className="d-flex align-items-center">
          {accountStatus === 1 ? (
            <>
              <div className="mt-2 mr-4">
                <span style={{ fontWeight: "500" }}>
                  Application Processing
                </span>
              </div>
            </>
          ) : accountStatus === 2 ? (
            <>
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
                  history.push(`/addUniversity`);
                }}
              >
                <div className="std-dashboard-style4"></div>

                <div className="std-dashboard-style5">
                  <img
                    src={plusicon}
                    alt=""
                    className="img-fluid dashbard-img-style1"
                  />
                  <span className="std-dashboard-style3">Add University</span>
                </div>
              </div>
            </>
          ) : accountStatus === 3 ? (
            <>
              <div className="mt-2 mr-4">
                <span style={{ fontWeight: "500" }}>Inactive Account</span>
              </div>
            </>
          ) : (
            <>
              <div className="mt-2 mr-4">
                <span style={{ fontWeight: "500" }}>Appliction Processing</span>
              </div>
            </>
          )}

          <UserNotices />
        </div>
      </div>
      <div>
        {accountStatus === 1 ? (
          <>
            <div className="d-flex justify-content-center mt-5">
              <div
                className="w-sm-75-w-100 bg-white rounded text-center d-flex align-items-center justify-content-center"
                style={{ height: "168px" }}
              >
                <h1 className="provider-application-process">
                  Your application is under review, please wait for approve
                </h1>
              </div>
            </div>
          </>
        ) : accountStatus === 2 && providerId !== 0 ? (
          <>
            <ProviderCountingCard
              id={providerId}
              intakeRngValue={intakeRngValue}
            />
            <DashboardApplication
              url={`ProviderAdminDashboard/newApplications?id=${providerId}&rangeid=${intakeRngValue}`}
            />
            <DashboardReadyToApply
              url={`ProviderAdminDashboard/ReadyToApplyApplications?id=${providerId}&rangeid=${intakeRngValue}`}
            />
            <DashboardProgressChart />
            {/* <ProviderApplicationList id={providerId} /> */}
            {/* <ProviderManagerList id={providerId} />
            <ProviderUniversity id={providerId} /> */}
          </>
        ) : accountStatus === 3 ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ProviderAdmin;
