/* eslint-disable jsx-a11y/iframe-has-title */
import { etest } from "../../../../../constants/constants";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import put from "../../../../../helpers/put";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import InternalStatus from "./Status/InternalStatus";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ReactToPrint from "react-to-print";
import { dateFormate } from "../../../../../components/date/calenderFormate";
// import DOMPurify from "dompurify";

const InternalAssessment = ({ applicationInfo, success, setSuccess }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { id, stdId } = useParams();
  const userType = localStorage.getItem("userType");
  const { addToast } = useToasts();
  const [assessment, setAssessment] = useState({});
  const [relog, setRelog] = useState("");
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Booked");
  const [statusValue, setStatusValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [again, setAgain] = useState(false);
  const [viewId, setViewId] = useState(false);
  const printRef = useRef();

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    put(
      `ApplicationAssesment/UpdateInternalAssesmentStatus?id=${id}&statusid=${value}`
    ).then((res) => {
      setRelog(res);
    });
    setSuccess(!success);
  };
  useEffect(() => {
    axios.get(`${etest}api/InterviewStatus`).then((res) => {
      setStatusType(res.data);
    });
  }, [id, stdId]);

  useEffect(() => {
    axios
      .get(`${etest}api/InterviweApi/${applicationInfo.studentId}`)
      .then((res) => {
        setAssessment(res.data);
      });

    get(`InternalAssesmentEmail/Get/${applicationInfo.studentId}`).then(
      (res) => {
        setAgain(res);
      }
    );
    get(`Application/GetViewId/${applicationInfo.id}`).then((res) => {
      setViewId(res);
    });
  }, [applicationInfo]);
  console.log(assessment);
  console.log(viewId);
  useEffect(() => {
    axios
      .get(`${etest}api/InterviweApi/Status/${applicationInfo.studentId}`)
      .then((res) => {
        const filterData = statusType.filter((status) => {
          return status.id === res.data;
        });

        setStatusValue(filterData[0]?.id);
        setStatusLabel(filterData[0]?.name);
      });
  }, [applicationInfo, statusType]);

  useEffect(() => {
    get(`EtestPrepare/UserId`).then((res) => {
      setRelog(res);
    });
  }, [id, stdId]);

  const checkPlagiarism = () => {
    setButtonStatus(true);
    setProgress(true);
    get(
      `InternalAssesmentEmail/SendEmail?id=${applicationInfo.studentId}&applicationid=${applicationInfo.id}`
    ).then((res) => {
      console.log(res);
      if (res === true) {
        setAgain(true);
        addToast("Email is send to the student", {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast("Something went wrong", {
          appearance: "danger",
          autoDismiss: true,
        });
      }
      setButtonStatus(false);
      setProgress(false);
    });
  };
  // const createMarkup = (html) => {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };
  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <div className="d-flex justify-content-between">
          <h3>
            {applicationInfo?.student?.firstName}{" "}
            {applicationInfo?.student?.lastName}
          </h3>
          {permissions?.includes(
            permissionList?.Update_Internal_Assesment_Status
          ) ? (
            <>
              {assessment?.answers?.length > 0 && (
                <Select
                  options={statusTypeMenu}
                  value={{ label: statusLabel, value: statusValue }}
                  onChange={(opt) => selectStatusType(opt.label, opt.value)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />
              )}
            </>
          ) : (
            <>{statusLabel}</>
          )}
        </div>

        {assessment?.answers?.length > 0 ? (
          <>
            {userType === userTypes?.Student &&
            (statusValue === 1 || statusValue === 6) ? (
              <>
                <a href={`${etest}OAuth/auth?code=${relog}`} target="blank">
                  <p className="text-center fw-700 my-5">
                    Login to Etest to complete assesment
                  </p>
                </a>
              </>
            ) : (
              <>
                {assessment?.answers?.map((item, i) => (
                  <div
                    className="mt-3"
                    style={{ marginBottom: "40px" }}
                    key={i}
                  >
                    <Row>
                      <Col md="8">
                        <div className="internal-assessment-div-1-style mt-1 rounded py-4">
                          <div
                            className="mb-3"
                            style={{
                              color: "#444748",
                              fontSize: "17px",
                              fontWeight: 600,
                            }}
                          >
                            {item.questionName}
                          </div>
                          <div
                            className="mb-2"
                            style={{
                              fontWeight: 400,
                              color: "#585858",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.questionDetails,
                              }}
                            />
                            {/*dangerouslySetInnerHTML={createMarkup()}*/}
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="assessment-img w-100 rounded">
                          <video className="w-100 h-100 rounded" controls>
                            <source
                              src={etest + item.streamedAnswer.slice(1)}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}

                {/* <div className="d-flex justify-content-between">
                  <p>IP Address: {assessment?.ipAddress}</p>
                  <p>Date: {assessment?.consentSignedOn}</p>
                </div> */}
                <p>IP Address: {assessment?.ipAddress}</p>
                <p>Date: {assessment?.consentSignedOn}</p>
                <p>
                  Please read assesment terms & Conditions{" "}
                  <a
                    href="https://etest.uapp.uk/home/TermsAndConditions"
                    target="blank"
                  >
                    here
                  </a>{" "}
                </p>
              </>
            )}
          </>
        ) : (
          <>
            {userType === userTypes?.Student ? (
              <>
                <a href={`${etest}OAuth/auth?code=${relog}`} target="blank">
                  <p className="text-center fw-700 my-5">
                    Login to Etest to complete assesment
                  </p>
                </a>
              </>
            ) : userType === userTypes?.AdmissionManager ||
              userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin ? (
              <div className="text-center my-5">
                <h5>Student has not completed internal assessment</h5>
                {again && <p>Already sent email</p>}
                <SaveButton
                  text={`Send Invitation Email ${again ? `again` : ""}`}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  action={checkPlagiarism}
                />
              </div>
            ) : (
              <>
                <p className="text-center fw-700 my-5">
                  Assessment is not completed yet
                </p>
              </>
            )}
          </>
        )}
      </div>

      {assessment?.answers?.length > 0 && (
        <div className="custom-card-border p-4 mb-3">
          <div className="d-flex justify-content-between">
            <p>IP Address: {assessment?.ipAddress}</p>
            <p>Date: {assessment?.consentSignedOn}</p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="text-center d-sm-w75">
              <h3>TERMS & CONDITIONS</h3>
              <p>
                Please read assesment terms & Conditions{" "}
                <a
                  href="https://etest.uapp.uk/home/TermsAndConditions"
                  target="blank"
                >
                  here
                </a>
              </p>

              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-warning">
                    <span className="fas fa-download"> </span>{" "}
                    <span> Download pdf</span>
                  </button>
                )}
                content={() => printRef.current}
              />
            </div>
          </div>
        </div>
      )}

      {applicationInfo.applicationStatusId !== 13 && (
        <>
          {permissions?.includes(
            permissionList.Update_Application_Assesment
          ) ? (
            <InternalStatus
              id={applicationInfo?.id}
              success={success}
              setSuccess={setSuccess}
            />
          ) : null}
        </>
      )}

      <div className="d-none">
        <div ref={printRef} style={{ margin: "50px" }}>
          <h3 style={{ textAlign: "center" }}>ASSESSMENT TERMS & CONDITIONS</h3>
          <div style={{ marginBottom: "40px" }}>
            <h5>1. Introduction</h5>
            <h6>1.1 Overview of Video Interview Assessment</h6>
            <p>
              The Video Interview Assessment serves as an integral part of
              UAPP's university application process. Although Video Interview
              Assessment is not the final stage in assessment, it is a
              personalized approach that goes beyond conventional application
              materials to gain valuable insights into each candidate. This
              involves recorded video interview where applicants respond to a
              set of carefully crafted questions, providing a holistic view of
              candidates and allowing us to assess their communication skills,
              personality, and enthusiasm for pursuing higher education.
              Furthermore, this allows for us to carry our compliance checks
              that are necessary for the platform.
            </p>
            <h6>1.2 Purpose of the Assessment</h6>
            <p>The primary goals of the Video Interview Assessment are:</p>
            <ul>
              <li>
                Comprehensive Evaluation: It enables a more comprehensive
                evaluation of candidates by assessing not just academic
                qualifications but also their communication abilities, critical
                thinking, and suitability for the chosen program.
              </li>
              <li>
                Enhanced Applicant Presentation: The video interview allows
                applicants to present themselves in a more personal and dynamic
                manner, showcasing their unique qualities, experiences, and
                motivations.
              </li>
              <li>
                Informed Decision-Making: By incorporating this assessment, UAPP
                aims to make more informed decisions regarding the suitability
                of candidates for our partner universities.
              </li>
            </ul>
            <p></p>
            <h5>2. Video Interview Process</h5>
            <h6>2.1 Description of the Video Interview</h6>
            <p>
              The Video Interview is a structured assessment designed to delve
              into various aspects of an applicant's personality, experiences,
              and motivations. It provides a platform for candidates to express
              themselves beyond the constraints of written documents. Applicants
              will be presented with a set of questions aimed at revealing their
              suitability for higher education and compatibility with the chosen
              program.
            </p>

            <h6>2.2 Questions and Topics Covered</h6>
            <p>
              The interview questions are strategically crafted to explore
              different dimensions of a candidate's profile. They may cover
              topics such as academic aspirations, career goals, relevant
              experiences, and personal strengths. The aim is to gain a holistic
              understanding of each candidate's unique qualities and motivations
              for pursuing higher education.
            </p>
            <h6>2.3 Recording and Submission Instructions</h6>
            <p>
              To ensure a seamless process, applicants are required to record
              their responses to the interview questions. The submission
              instructions will guide candidates on how to effectively record
              and upload their video interviews. Clear guidelines will be
              provided, ensuring that applicants can comfortably complete this
              step of the assessment.
            </p>
            <h5>3. Information Disclosed</h5>
            <h6>3.1 Personal Information</h6>
            <p>
              During the video interview, candidates may disclose personal
              information so as to provide a comprehensive understanding of
              their background. This may include, but is not limited to, details
              such as name, contact information, and any additional information
              the candidate deems relevant for their application.
            </p>

            <h6>3.2 Educational and Professional Background</h6>

            <p>
              Candidates are expected to share details about their educational
              and professional history during the video interview. This includes
              academic achievements, professional qualifications, work
              experience and any other information pertinent to their
              educational or professional background.
            </p>
            <h6>3.3 Motivations for Higher Education</h6>
            <p>
              The video interview allows candidates to talk about their
              motivations for pursuing higher education. This may involve
              discussing career goals, academic interests, and the specific
              reasons for choosing the partner university for their studies.
              Open and honest communication in this regard is crucial for a
              comprehensive evaluation of the application.
            </p>
            <h5>4. Use and Retention of Video Interviews</h5>

            <h6>4.1 Purpose of Retention</h6>
            <p>
              The retention of video interviews for indefinite period serves the
              essential purpose of record keeping. These recordings are securely
              stored to maintain a comprehensive record of candidate
              assessments, ensuring transparency and accountability in the
              application process.
            </p>
            <h6>4.2 Data Security Measures</h6>
            <p>
              To safeguard the confidentiality and integrity of video
              interviews, robust data security measures are implemented. These
              measures include encryption protocols, restricted access, and
              continuous monitoring to prevent unauthorized disclosure or
              tampering.
            </p>
            <h5>5. Confidentiality and Privacy</h5>
            <h6>5.1 Assurance of Confidentiality and Privacy</h6>
            <p>
              UAPP places the utmost importance on maintaining the
              confidentiality of all video interviews. Strict measures are in
              place to assure that the content remains confidential and privacy
              is safeguarded. These include restricted access, secure storage,
              and a commitment to preventing any unauthorized sharing or use of
              the recorded content.
            </p>
            <h5>6. Student Declaration and Consent</h5>
            <h6>6.1 Acknowledgment of Willing Participation</h6>
            <p>
              By participating in the video interview assessment, candidates
              acknowledge their voluntary involvement in the process. This
              acknowledgment reflects their understanding of the assessment's
              significance in the application procedure.
            </p>
            <h6>6.2 Agreement to Disclose Truthful Information</h6>
            <p>
              Candidates agree to provide truthful and accurate information
              during the video interview. This commitment ensures the integrity
              of the assessment process and maintains the credibility of the
              application submitted to partner universities.
            </p>
            <h6>6.3 Consent for Retention and Use of Video Interviews</h6>
            <p>
              Participants provide explicit consent for the retention and
              utilization of their video interviews. This consent encompasses
              the indefinite retention period outlined earlier and the specified
              purposes related to record-keeping and application assessment.
            </p>
            <h6>6.4 Application Withdrawal for Refusal</h6>
            <p>
              Candidates must understand that refusal to participate in the
              video interview will result in the automatic withdrawal of their
              application to the university. The video interview is a mandatory
              step, and failure to complete it will lead to the cancellation of
              the application process. This policy ensures a consistent and fair
              evaluation process for all applicants.
            </p>
            <h5>7. Updates to Terms and Conditions</h5>
            <p>
              UAPP reserves the right to revise these terms and conditions
              periodically to align with organizational policies, legal
              requirements, or advancements in the video interview assessment
              process. Candidates’ continued participation in the assessment
              will indicate acceptance of the updated terms.
            </p>
          </div>
          <b className="signature-student">
            {applicationInfo?.student?.firstName}{" "}
            {applicationInfo?.student?.lastName}
          </b>
          <br /> <b>Applicaton ID: {viewId}</b>
          <br />
          <b>IP Address: {assessment?.ipAddress}</b>
          <br />
          <b>
            Date:{" "}
            {assessment?.consentSignedOn &&
              dateFormate(assessment?.consentSignedOn)}
          </b>
        </div>
      </div>
    </>
  );
};

export default InternalAssessment;
