import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../constants/userTypeConstant";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import ApplicationInfo from "./Component/ApplicationInfo";
import Assessment from "./Component/Assessment";
import InternalAssessment from "./Component/InternalAssessment";
import ProfilePreview from "./Component/ProfilePreview";
import AdmissionCompliance from "./Component/RightSide/AdmissionCompilance";
import AdmissionConsultant from "./Component/RightSide/AdmissionConsultant";
import AdmissionManager from "./Component/RightSide/AdmissionManager";
import AdmissionOfficer from "./Component/RightSide/AdmissionOfficer";
import ApplicationNote from "./Component/RightSide/ApplicationNote";
import ApplicationTimeline from "./Component/RightSide/ApplicationTimeline";
import MessageHistoryCardApplicationDetailsPage from "./Component/RightSide/MessageHistoryCardApplicationDetailsPage";
import StudentDocument from "./Component/StudentDocument";
import StudentStatement from "./Component/StudentStatement";
import { Student } from "../../../../components/core/User";
// import useSelection from "antd/lib/table/hooks/useSelection";

const ApplicationDetails = () => {
  const [activetab, setActivetab] = useState("1");
  const [applicationInfo, setApplicationInfo] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(0);

  // ELPT modal

  const [elptDate, setElptDate] = useState(null);
  const [etaDate, setEtaDate] = useState(null);
  const [eatDeadLine, setEtaDeadLine] = useState(null);

  const [uniId, setUniId] = useState(0);
  const [managerId, setManagerId] = useState(0);
  const [officerId, setOfficerId] = useState(0);

  const [intakeDD, setIntakeDD] = useState([]);
  const [deliveryDD, setDeliveryDD] = useState([]);
  const [elptReading, setElptReading] = useState("");
  const [elptListening, setElptListening] = useState("");
  const [elptWritting, setElptWritting] = useState("");
  const [elptSpeaking, setElptSpeaking] = useState("");
  const [elptOverall, setElptOverall] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [TBC, setTBC] = useState(true);

  const handleScroll = () => {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [applicationTimeline, setApplicationTimeline] = useState([]);

  const { id, stdId, tab } = useParams();
  const location = useLocation();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    tab && setActivetab(tab);
  }, [tab]);

  useEffect(() => {
    if (applicationInfo?.subjectId !== undefined) {
      get(`DeliveryPatternDD/Subject/${applicationInfo?.subjectId}`).then(
        (res) => {
          setDeliveryDD(res);
        }
      );
      get(`IntakeDD/Intake/${applicationInfo?.subjectId}`).then((res) => {
        setIntakeDD(res);
      });
    }
  }, [applicationInfo]);

  useEffect(() => {
    get(`Application/Get/${id}`).then((res) => {
      setLoading(false);
      setApplicationInfo(res);
      setManagerId(res?.admissionManager?.id);
      setOfficerId(res?.admissionOfficer?.id);
      setUniId(res?.university?.id);
      setElptReading(res?.elpt?.reading);
      setElptListening(res?.elpt?.listening);
      setElptWritting(res?.elpt?.writting);
      setElptSpeaking(res?.elpt?.speaking);
      setElptOverall(res?.elpt?.overall);
      setTBC(res?.isTBC);
      res?.elpt?.elptDate !== "0001-01-01T00:00:00"
        ? setElptDate(
            moment(new Date(res?.elpt?.elptDate)).format("YYYY-MM-DD")
          )
        : setElptDate(null);

      res?.elpt?.eta !== "0001-01-01T00:00:00"
        ? setEtaDate(moment(new Date(res?.elpt?.eta)).format("YYYY-MM-DD"))
        : setEtaDate(null);

      res?.elpt?.etaDeadline !== "0001-01-01T00:00:00"
        ? setEtaDeadLine(
            moment(new Date(res?.elpt?.etaDeadline)).format("YYYY-MM-DD")
          )
        : setEtaDeadLine(null);
    });

    get(`ApplicationNote/get/${id}`).then((res) => {
      setNotes(res);
    });

    get(`ApplicationTimeLine/get/${id}`).then((res) => {
      setApplicationTimeline(res);
    });

    get(`ApplicationNote/GetCounting/${id}`).then((res) => {
      setNoteCount(res);
    });

    get(`Application/get-count-by/${id}`).then((res) => {
      setChatCount(res);
    });
  }, [id, success]);

  const isChatOpen = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title={
              !Student() && TBC === true
                ? "Register Interest Application Details"
                : "Application Details"
            }
            backTo={
              location.providerId !== undefined &&
              location.managerId !== undefined
                ? "Admission Manager Details"
                : !Student() && TBC === true
                ? "Register Interest Applications"
                : "Applications"
            }
            path={
              location.providerId !== undefined &&
              location.managerId !== undefined
                ? `/providerAdmissionManager/${location.managerId}/${location.providerId}`
                : !Student() && TBC === true
                ? "/register-interest-applications"
                : "/applications"
            }
          />
          {TBC === true && (
            <Row>
              <Col>
                <div
                  style={{
                    color: "#FC7300",
                    backgroundColor: "#FFF7EF",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.99998 21C8.99998 20.4477 9.4477 20 9.99998 20H14C14.5523 20 15 20.4477 15 21C15 21.5523 14.5523 22 14 22H9.99998C9.4477 22 8.99998 21.5523 8.99998 21Z"
                        fill="#FC7300"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.05023 3.05025C8.36299 1.7375 10.1435 1 12 1C13.8565 1 15.637 1.7375 16.9497 3.05025C18.2625 4.36301 19 6.14349 19 8C19 10.9127 19.732 12.8439 20.4994 14.0771L20.5112 14.0962C20.8685 14.6704 21.151 15.1243 21.3414 15.4547C21.4368 15.6202 21.5237 15.7797 21.5881 15.9215C21.6202 15.9922 21.6562 16.079 21.6843 16.1733C21.7076 16.2515 21.752 16.4187 21.7353 16.6223C21.7241 16.7591 21.6962 16.9928 21.5621 17.2343C21.4279 17.4758 21.2442 17.623 21.134 17.7047C20.8837 17.8904 20.5963 17.9329 20.5003 17.947L20.4959 17.9477C20.3485 17.9695 20.1812 17.9804 20.0125 17.9869C19.6772 18 19.2131 18 18.6358 18H5.36413C4.78691 18 4.32276 18 3.98751 17.9869C3.81875 17.9804 3.65148 17.9695 3.50407 17.9477L3.49964 17.947C3.40371 17.9329 3.11628 17.8904 2.86599 17.7047C2.75575 17.623 2.57202 17.4758 2.43787 17.2343C2.30372 16.9928 2.27582 16.7591 2.26463 16.6223C2.24799 16.4187 2.29239 16.2515 2.31569 16.1733C2.34379 16.079 2.37973 15.9922 2.41186 15.9215C2.47622 15.7797 2.56315 15.6202 2.65857 15.4547C2.849 15.1243 3.13148 14.6703 3.4888 14.0961L3.5006 14.0771C4.26798 12.8439 4.99998 10.9127 4.99998 8C4.99998 6.14348 5.73748 4.36301 7.05023 3.05025Z"
                        fill="#FC7300"
                      />
                    </svg>
                  </span>
                  {Student() ? (
                    <span>
                      Your application is being processed. We’ll notify you as
                      soon as the university confirms.
                    </span>
                  ) : (
                    <span>
                      Awaiting university confirmation. Please process the
                      application and notify the student once we receive an
                      update.
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          )}
          <Row className="mb-3">
            <Col lg={8} md="7" className="mb-3 overflow">
              <div
                className="btn-group w-100"
                role="group"
                aria-label="Basic example"
              >
                <button
                  className={`btn border p-2 fw-600 ${
                    activetab === "1" ? "bg-orange text-white" : "bg-white"
                  }`}
                  onClick={() => setActivetab("1")}
                >
                  Application Details
                </button>
                <button
                  className={`btn border p-2 fw-600 ${
                    activetab === "2" ? "bg-orange text-white" : "bg-white"
                  }`}
                  onClick={() => setActivetab("2")}
                >
                  Student Details
                </button>
                {permissions?.includes(
                  permissionList?.View_Internal_Assesment
                ) ? (
                  <button
                    className={`btn border p-2 fw-600 ${
                      activetab === "3" ? "bg-orange text-white" : "bg-white"
                    }`}
                    onClick={() => setActivetab("3")}
                  >
                    Internal Assessment
                  </button>
                ) : null}
                <button
                  className={`btn border p-2 fw-600 ${
                    activetab === "4" ? "bg-orange text-white" : "bg-white"
                  }`}
                  onClick={() => setActivetab("4")}
                >
                  Statement Of Purpose
                </button>
                <button
                  className={`btn border p-2 fw-600 ${
                    activetab === "5" ? "bg-orange text-white" : "bg-white"
                  }`}
                  onClick={() => setActivetab("5")}
                >
                  Documents
                </button>
              </div>
            </Col>
            <Col lg={4} md="5" className="mb-3">
              <div
                className="d-flex justify-content-end align-items-center"
                style={{ fontSize: "16px" }}
              >
                <button
                  className="d-flex align-items-center ml-3 btn-no-style bg-white rounded-lg py-2 px-3 border text-primary"
                  onClick={isChatOpen}
                >
                  <i className="far fa-comment-dots relative"></i>
                  <span className="mx-2">Chat</span>
                  <span className="bg-primary text-white px-2 fs-12px rounded-circle">
                    {chatCount}
                  </span>
                </button>

                {permissions?.includes(permissionList?.View_ApplicationNote) ? (
                  <a
                    className="d-flex align-items-center ml-4 text-body bg-white rounded-lg py-2 px-3 border"
                    href="#notelist"
                  >
                    <i className="far fa-file relative"></i>
                    <span className="mx-2">Notes </span>
                    <span className="bg-orange text-white px-2 fs-12px rounded-circle">
                      {noteCount}
                    </span>
                  </a>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={8} md="7">
              {activetab === "1" ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="1">
                    <ApplicationInfo
                      handleScroll={handleScroll}
                      applicationTimeline={applicationTimeline}
                      id={id}
                      sId={stdId}
                      applicationInfo={applicationInfo}
                      deliveryDD={deliveryDD}
                      intakeDD={intakeDD}
                      elptDate={elptDate}
                      setElptDate={setElptDate}
                      etaDate={etaDate}
                      setElptReading={setElptReading}
                      elptReading={elptReading}
                      setEtaDate={setEtaDate}
                      eatDeadLine={eatDeadLine}
                      setEtaDeadLine={setEtaDeadLine}
                      elptListening={elptListening}
                      setElptListening={setElptListening}
                      elptWritting={elptWritting}
                      setElptWritting={setElptWritting}
                      elptSpeaking={elptSpeaking}
                      setElptSpeaking={setElptSpeaking}
                      elptOverall={elptOverall}
                      setElptOverall={setElptOverall}
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </TabPane>
                </TabContent>
              ) : activetab === "2" ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="2">
                    <ProfilePreview
                      sId={stdId}
                      applicationInfo={applicationInfo}
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </TabPane>
                </TabContent>
              ) : activetab === "3" ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="3">
                    <InternalAssessment
                      applicationInfo={applicationInfo}
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </TabPane>
                </TabContent>
              ) : activetab === "4" ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="4">
                    <StudentStatement
                      stdId={stdId}
                      applicationInfo={applicationInfo}
                      success={success}
                      setSuccess={setSuccess}
                    />
                  </TabPane>
                </TabContent>
              ) : (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="5">
                    <StudentDocument
                      stdId={stdId}
                      success={success}
                      setSuccess={setSuccess}
                      applicationInfo={applicationInfo}
                    />
                  </TabPane>
                </TabContent>
              )}
            </Col>

            <Col lg={4} md="5" className="mb-5">
              <Assessment id={id} success={success} />
              <ApplicationTimeline
                id={"scrollDown"}
                applicationTimeline={applicationTimeline}
              />

              {userType !== userTypes?.AdmissionCompliance &&
                applicationInfo?.admissionCompliance && (
                  <AdmissionCompliance applicationInfo={applicationInfo} />
                )}

              {userType === userTypes?.Student ? (
                <>
                  {applicationInfo?.admissionOfficer !== null ? (
                    <AdmissionOfficer
                      applicationInfo={applicationInfo}
                      uniId={uniId}
                      id={id}
                      managerId={managerId}
                      officerId={officerId}
                      setSuccess={setSuccess}
                      success={success}
                    />
                  ) : (
                    <AdmissionManager
                      applicationInfo={applicationInfo}
                      uniId={uniId}
                      id={id}
                      managerId={managerId}
                      setSuccess={setSuccess}
                      success={success}
                    />
                  )}
                </>
              ) : userType === userTypes?.AdmissionManager ? (
                <AdmissionOfficer
                  applicationInfo={applicationInfo}
                  uniId={uniId}
                  id={id}
                  officerId={officerId}
                  managerId={managerId}
                  setSuccess={setSuccess}
                  success={success}
                />
              ) : userType === userTypes?.AdmissionOfficer ? (
                <AdmissionManager
                  applicationInfo={applicationInfo}
                  uniId={uniId}
                  id={id}
                  managerId={managerId}
                  setSuccess={setSuccess}
                  success={success}
                />
              ) : (
                <>
                  <AdmissionManager
                    applicationInfo={applicationInfo}
                    uniId={uniId}
                    id={id}
                    managerId={managerId}
                    setSuccess={setSuccess}
                    success={success}
                  />

                  <AdmissionOfficer
                    applicationInfo={applicationInfo}
                    uniId={uniId}
                    id={id}
                    officerId={officerId}
                    managerId={managerId}
                    setSuccess={setSuccess}
                    success={success}
                  />
                </>
              )}

              {userType === userTypes?.Consultant ? null : (
                <AdmissionConsultant applicationInfo={applicationInfo} />
              )}

              {permissions?.includes(permissionList?.View_ApplicationNote) ? (
                <div id="notelist" className="mb-5">
                  <ApplicationNote
                    applicationSubStatusId={
                      applicationInfo.applicationSubStatusId
                    }
                    id={id}
                    notes={notes}
                    success={success}
                    setSuccess={setSuccess}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
          {chatOpen === true && (
            <div className="messanger">
              <MessageHistoryCardApplicationDetailsPage
                applicationSubStatusId={applicationInfo.applicationSubStatusId}
                applicationId={id}
                chatOpen={chatOpen}
                close={isChatOpen}
                success={success}
                setSuccess={setSuccess}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ApplicationDetails;
