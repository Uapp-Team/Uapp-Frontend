import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import ProviderCountingCard from "./Components/ProviderCountingCard";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import DashboardProgressReport from "../../../../../components/ui/DashboardProgressReport";
import UserNotices from "../../Component/UserNotices";

const ProviderAdmin = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [accountStatus, setAccountStatus] = useState(1);
  const [providerId, setProviderId] = useState(0);
  console.log(providerId);
  useEffect(() => {
    get(`ProviderDashboard/Overview`).then((res) => {
      setAccountStatus(res.accountStatusId);
      setProviderId(res.providerId);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
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
              <div className="mt-2 mr-4 mb-1">
                <span style={{ fontWeight: "500" }}>
                  Intake Range: {intake?.intakeName}
                </span>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/createUniversity`);
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
            <ProviderCountingCard id={providerId} />
            <DashboardApplication url="ProviderAdminDashboard/newApplications" />
            <DashboardReadyToApply url="ProviderAdminDashboard/ReadyToApplyApplications" />
            <DashboardProgressReport />
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
