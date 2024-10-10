import React, { useEffect, useState } from "react";
import poundicon from "../../../assets/img/poundcoin.svg";
import camera from "../../../assets/img/camera.svg";
import { Col, Row } from "reactstrap";
import get from "../../../helpers/get";
import { useParams } from "react-router-dom";
import "../../../assets/CoustomStyle/dashboard.css";
import TargetApplications from "../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/TargetApplications";
import CountingCards from "../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/CountingCards";
import { Link } from "react-router-dom/cjs/react-router-dom";
import DashboardApplication from "../../../components/ui/DashboardApplication";
import ConsProgressReport from "../Dashboard/Pages/Consultant/ConsProgressReport";
import DashboardReadyToApply from "../../../components/ui/DashboardReadyToApply";
import Overview from "../Dashboard/Pages/Consultant/Overview/Overview";
import { userTypes } from "../../../constants/userTypeConstant";
import icon_info from "../../../assets/img/icons/Frame.png";

const ConsultantDashboard = () => {
  const { consultantId } = useParams();
  const userType = localStorage.getItem("userType");
  const [showBal, setShowBal] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const [bonusList, setBonusList] = useState([]);
  const [availableWithdraw, setAvailableWithdraw] = useState(0);

  useEffect(() => {
    get(`Balance/ConsultantBalanceSummery/${consultantId}`).then((res) => {
      setAvailableWithdraw(res);
      console.log(res, "withdraw money");
    });

    get(`ConsultantDesignation/Overview/${consultantId}`).then((res) => {
      setBonusList(res);
    });
  }, [consultantId]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* Cards */}
          <div>
            <div className="mt-1 mb-4 d-flex justify-content-between cardborder bg-white">
              <div className="Designation">
                <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                <span>{bonusList?.designationName}</span>
              </div>
              <div className="pl-3 mt-2">
                <span
                  className="text-underline pointer"
                  onClick={() => setIsHide(!isHide)}
                >
                  {isHide ? <> Hide level history</> : <>Show level history</>}
                </span>
              </div>
            </div>
            <div className="mb-3">
              {isHide ? (
                <>
                  {bonusList?.designationItems?.map((range, i) => (
                    <span key={i}>
                      {range?.isActive ? <b>{range?.name}</b> : range?.name}{" "}
                      {bonusList?.designationItems.length === i + 1 ? null : (
                        <>
                          <span>
                            {" "}
                            <i class="fas fa-chevron-right"></i>
                          </span>
                        </>
                      )}
                    </span>
                  ))}
                </>
              ) : null}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9 col-12">
              <CountingCards id={consultantId} />
            </div>
            <div className="col-sm-12 col-lg-3 col-12 mb-30px">
              <div className="custom-card-border p-4 h-100 minH-250px relative">
                <div className="d-flex justify-content-between">
                  <div className="text-gray">MY BALANCE</div>
                  <div className="dashboard-balance">
                    £ {availableWithdraw?.balance}
                  </div>
                </div>
                <div className="text-center my-5">
                  <p className="mb-0">Available to withdraw</p>
                  <p>
                    <button
                      className="consultant-balance-button pr-3"
                      style={{ border: "1px solid #019088" }}
                      onClick={() => setShowBal(!showBal)}
                    >
                      <img src={poundicon} className="img-fluid mr-4" alt="" />

                      <span
                        style={{
                          color: "#1E98B0",
                          fontWeight: "600",
                          fontSize: "17px",
                        }}
                      >
                        {showBal
                          ? availableWithdraw?.availableToWithdraw
                          : "Balance"}
                      </span>
                    </button>
                  </p>
                </div>

                <div className="consultant-balance-botton pb-4 pr-5 w-100">
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/withdrawTransactionByConsultant/${consultantId}`}
                      className="application-count-style text-gray"
                    >
                      Withdraw money
                    </Link>

                    <div className="consultant-bg-img">
                      <img src={camera} className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="row">
            <div className="col-lg-9">
              <DashboardApplication
                url={`ConsultantDashboard/NewApplications?id=${consultantId}`}
              />
            </div>
            <div className="col-lg-3 mb-30px">
              <TargetApplications id={consultantId} />
            </div>
          </div>

          {/* Progress Report */}
          <Row>
            <Col md="12">
              <DashboardReadyToApply
                url={`ConsultantDashboard/ReadyToApplyApplications?id=${consultantId}`}
              />
              {(userType === userTypes?.SystemAdmin.toString() ||
                userType === userTypes?.Admin.toString()) && (
                <Overview id={consultantId} />
              )}
              <ConsProgressReport id={consultantId} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ConsultantDashboard;
