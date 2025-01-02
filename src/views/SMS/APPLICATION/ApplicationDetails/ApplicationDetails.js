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

  console.log("tab", tab);
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
            title="Application Details"
            backTo={
              location.providerId !== undefined &&
              location.managerId !== undefined
                ? "Admission Manager Details"
                : "Applications"
            }
            path={
              location.providerId !== undefined &&
              location.managerId !== undefined
                ? `/providerAdmissionManager/${location.managerId}/${location.providerId}`
                : "/applications"
            }
          />

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
                    setSuccess={setSuccess}
                    success={success}
                  />
                </>
              )}

              {userType === userTypes?.Consultant ? null : (
                <AdmissionConsultant applicationInfo={applicationInfo} />
              )}
              {/* <div className="mb-3">
                <MessageHistoryCardApplicationDetailsPage applicationId={id} />
              </div> */}

              {permissions?.includes(permissionList?.View_ApplicationNote) ? (
                <div id="notelist" className="mb-5">
                  <ApplicationNote
                    applicationStatusId={applicationInfo.applicationStatusId}
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
                applicationStatusId={applicationInfo.applicationStatusId}
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
