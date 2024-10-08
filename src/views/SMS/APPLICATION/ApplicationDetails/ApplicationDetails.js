import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import get from "../../../../helpers/get";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import MessageHistoryCardApplicationDetailsPage from "./Component/RightSide/MessageHistoryCardApplicationDetailsPage";
import StudentDocument from "./Component/StudentDocument";
import ApplicationInfo from "./Component/ApplicationInfo";
import Loader from "../../Search/Loader/Loader";
import Assessment from "./Component/Assessment";
import { userTypes } from "../../../../constants/userTypeConstant";
import ApplicationTimeline from "./Component/RightSide/ApplicationTimeline";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ProfilePreview from "./Component/ProfilePreview";
import AdmissionManager from "./Component/RightSide/AdmissionManager";
import AdmissionOfficer from "./Component/RightSide/AdmissionOfficer";
import AdmissionConsultant from "./Component/RightSide/AdmissionConsultant";
import ApplicationNote from "./Component/RightSide/ApplicationNote";
import moment from "moment";
import InternalAssessment from "./Component/InternalAssessment";

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

  const handleScroll = () => {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [applicationTimeline, setApplicationTimeline] = useState([]);

  const { id, stdId } = useParams();
  const location = useLocation();
  const userType = localStorage.getItem("userType");

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
      console.log("timeline", res);
      setApplicationTimeline(res);
    });

    get(`ApplicationNote/GetCounting/${id}`).then((res) => {
      console.log("count", res);
      setNoteCount(res);
    });
  }, [id, success]);

  const toggle = (tab) => {
    setActivetab(tab);

    if (tab === "2") {
      setActivetab(tab);
    }
    if (tab === "3") {
      setActivetab(tab);
    }
    if (tab === "4") {
      setActivetab(tab);
    }
  };
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

          <div className="d-flex justify-content-between">
            <Nav tabs>
              <NavItem>
                <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                  Application Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Internal Assessment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Documents
                </NavLink>
              </NavItem>
            </Nav>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ fontSize: "16px" }}
            >
              <button
                className="d-flex align-items-center ml-4 btn-no-style"
                onClick={isChatOpen}
              >
                <i className="far fa-comment-dots relative">
                  {/* <span className="bg-orange text-white p-1 rounded-circle chat-icon">
                    5
                  </span> */}
                </i>
                <span className="ml-2">Chat</span>
              </button>

              {permissions?.includes(permissionList?.Add_ApplicationNote) ? (
                <a
                  className="d-flex align-items-center ml-4 text-body"
                  href="#notelist"
                >
                  <i className="far fa-file relative">
                    <span className="bg-orange text-white p-1 rounded-circle chat-icon">
                      {noteCount}
                    </span>
                  </i>
                  <span className="ml-2">Note</span>
                </a>
              ) : null}
            </div>
          </div>

          <Row>
            <Col lg={8} md="7">
              {activetab === "1" ? (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="1">
                    <ApplicationInfo
                      handleScroll={handleScroll}
                      applicationTimeline={applicationTimeline}
                      id={id}
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
                    <InternalAssessment />
                  </TabPane>
                </TabContent>
              ) : (
                <TabContent activeTab={activetab}>
                  <TabPane tabId="4">
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
