import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import { Button, Card, CardBody, Table } from "reactstrap";
import icon_warning from "../../../../../assets/img/icons/icon_warning.png";
import icon_success from "../../../../../assets/img/icons/icons_success.png";
import logoLg from "../../../../../assets/img/Logo.svg";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import { rootUrl } from "../../../../../constants/constants";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import ButtonLoader from "../../../Components/ButtonLoader";
import ProfilePreview from "../../StudentProfile/ProfilePreview";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import ContactNumber from "../../../../../components/ui/ContactNumber";
import DOMPurify from "dompurify";

const StudentDeclaration = () => {
  const location = useLocation();
  const componentRef = useRef();
  const currentLocation = location.pathname;
  const { applicationStudentId } = useParams();
  const [conscentData, setConscentData] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [apiInfo, setAPiInfo] = useState("");
  const userTypeId = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const userType = localStorage.getItem("userType");
  //////////////////////////
  const [studentDetails, setStudentDetails] = useState({});
  const [contactData, setContactData] = useState([]);
  const [emergencyContactList, setEmergencyContactList] = useState([]);
  const [applicationData, setApplicationData] = useState({});
  const [fundingData, setFundingData] = useState({});
  const [educationalInfos, setEducationalInfos] = useState([]);

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});
  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});

  const [experienceInfo, setExperienceInfo] = useState([]);
  const [referenceList, setReferenceList] = useState([]);
  const [studentStatement, setStudentStatement] = useState({});
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState("");
  const [otherInformation, setOtherInformation] = useState({});
  const [UploadData, setUploadData] = useState({});
  const [check, setCheck] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  //////////////////////////

  useEffect(() => {
    get(`StudentConsent/Get/${applicationStudentId}`).then((res) => {
      setConscentData(res);
      console.log(res, "declaration");
    });

    // fetch(`http://ip.jsontest.com/`)
    //   .then((res) => res?.json())
    //   .then((data) => {
    //     setAPiInfo(data?.ip);
    //   });
  }, [success, applicationStudentId]);

  useEffect(() => {
    // userType === userTypes?.SystemAdmin
    //   ? get(
    //       `UserTermsAndConditions/Get/${userTypes?.Consultant}/${consultantRegisterId}`
    //     ).then((res) => {
    //       setLoading(false);
    //       setCurrentUserDetails(res);
    //       console.log(res, "sakib");
    //     })
    //   :

    get(
      `UserTermsAndConditions/Get/${userTypes?.Student}/${applicationStudentId}`
    ).then((res) => {
      setCurrentUserDetails(res);
    });
  }, [applicationStudentId]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("StudentId", applicationStudentId);
    subData.append("IpAddress", apiInfo);
    setProgress(true);
    post("StudentConsent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        localStorage.setItem("IsLead", false);
        window.location.reload();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const sendEmail = () => {
    setButtonStatus(true);
    setProgress(true);
    put(`StudentConsent/SendEmail/${applicationStudentId}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast("Email Sending is in Process", {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  // const formatDate = (string) => {
  //   var options = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(string).toString([], options);
  // };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      <BreadCrumb
        title="Student Terms & Conditions"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"12"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <ProfilePreview
        sId={applicationStudentId}
        studentDetails={studentDetails}
        setStudentDetails={setStudentDetails}
        contactData={contactData}
        setContactData={setContactData}
        emergencyContactList={emergencyContactList}
        setEmergencyContactList={setEmergencyContactList}
        applicationData={applicationData}
        setApplicationData={setApplicationData}
        fundingData={fundingData}
        setFundingData={setFundingData}
        educationalInfos={educationalInfos}
        setEducationalInfos={setEducationalInfos}
        ielts={ielts}
        setIelts={setIelts}
        duolingo={duolingo}
        setDuolingo={setDuolingo}
        toefl={toefl}
        setToefl={setToefl}
        functions={functions}
        setFunctions={setFunctions}
        gcse={gcse}
        setGcse={setGcse}
        pearson={pearson}
        setPearson={setPearson}
        others={others}
        setOthers={setOthers}
        pte={pte}
        setPte={setPte}
        greData={greData}
        setGreData={setGreData}
        gmatData={gmatData}
        setGmatData={setGmatData}
        experienceInfo={experienceInfo}
        setExperienceInfo={setExperienceInfo}
        referenceList={referenceList}
        setReferenceList={setReferenceList}
        studentStatement={studentStatement}
        setStudentStatement={setStudentStatement}
        scanId={scanId}
        setScanId={setScanId}
        result={result}
        setResult={setResult}
        otherInformation={otherInformation}
        setOtherInformation={setOtherInformation}
        UploadData={UploadData}
        setUploadData={setUploadData}
      />
      <Card>
        <CardBody id="application">
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
              <div className="text-center d-sm-w75">
                <h3>TERMS & CONDITIONS</h3>
                <p>
                  Please read students terms & Conditions{" "}
                  <span style={{ fontSize: "16px" }}>
                    <Link to={`/student-declaration/${applicationStudentId}`}>
                      here
                    </Link>
                  </span>
                  {/* <a href="https://smsheg.co.uk/privacypolicy.">
                    https://smsheg.co.uk/privacypolicy.
                  </a> */}
                  <br />
                  You will not be able to apply without accepting the terms &
                  conditions
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-1 mb-1">
              <div className="d-sm-w75">
                {conscentData == null || conscentData?.isDeclared === false ? (
                  ""
                ) : (
                  <div
                    className="d-flex justify-content-between"
                    style={{ color: "#252525", opacity: ".7" }}
                  >
                    <div>
                      <span>
                        Signed on: {formatDate(conscentData?.consentSignTime)}
                      </span>
                    </div>
                    <div>
                      <span>From IP:{conscentData?.consentFromIp}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center mb-5">
              <div
                className="text-center d-sm-w75 bg-terms p-5"
                style={{ borderRadius: "12px" }}
              >
                {userTypeId === userTypes?.SystemAdmin.toString() ||
                userTypeId === userTypes?.Admin.toString() ||
                userTypeId === userTypes?.BranchAdmin.toString() ||
                userTypeId === userTypes?.AdmissionManager.toString() ||
                userTypeId === userTypes?.ComplianceManager.toString() ||
                userTypeId === userTypes?.Consultant.toString() ? (
                  <>
                    {conscentData == null ||
                    conscentData?.consentSignStatusId === 1 ? (
                      <div className="mb-1 text-center">
                        <div className="d-flex justify-content-center">
                          <img src={icon_warning} height="35" alt="" />
                        </div>
                        <h5 className="my-2">
                          Terms and Conditions has not signed yet
                        </h5>
                        <p>Send email to student</p>
                        <Button
                          color="primary"
                          onClick={sendEmail}
                          disabled={buttonStatus}
                        >
                          {progress ? <ButtonLoader /> : "Send Email"}
                        </Button>
                      </div>
                    ) : conscentData !== null &&
                      conscentData?.consentSignStatusId === 2 ? (
                      <div className="mb-1 text-center">
                        <div className="d-flex justify-content-center">
                          <img src={icon_warning} height="35" alt="" />
                        </div>
                        <h5 className="my-2">
                          Terms and Conditions has not signed yet
                        </h5>
                        <p> Email is sent with credentials </p>
                        <Button
                          color="primary"
                          onClick={sendEmail}
                          disabled={buttonStatus}
                        >
                          {progress ? <ButtonLoader /> : "Send Email Again"}
                        </Button>
                      </div>
                    ) : conscentData !== null &&
                      conscentData?.consentSignStatusId === 3 ? (
                      <div className="mb-1 text-center">
                        <div className="d-flex justify-content-center">
                          <img src={icon_success} height="35" alt="" />
                        </div>
                        <h5 className="my-2">
                          Terms and Conditions Signed Successfully
                        </h5>

                        <ReactToPrint
                          trigger={() => (
                            <button className="btn btn-warning">
                              <span className="fas fa-download"> </span>{" "}
                              <span> Download pdf</span>
                            </button>
                          )}
                          content={() => componentRef.current}
                        />

                        <Link
                          to={`/searchByStudent/${conscentData?.studentId}`}
                          className="btn btn-blue ml-3"
                        >
                          <span> Add Application</span>
                        </Link>
                      </div>
                    ) : null}
                  </>
                ) : userTypeId === userTypes?.Student.toString() ? (
                  conscentData === null ||
                  conscentData?.isDeclared === false ? (
                    <div className="mb-1 text-center">
                      <div className="d-flex justify-content-center">
                        <img src={icon_warning} height="35" alt="" />
                      </div>
                      <h5 className="my-2">
                        Terms and Conditions has not signed yet
                      </h5>
                      <p>
                        Before accepting, please read the terms and conditions
                        first.
                      </p>
                      <div className="my-2">
                        <div>
                          <input
                            onChange={(e) => {
                              setCheck(e.target.checked);
                            }}
                            type="checkbox"
                            name=""
                            value=""
                            checked={check}
                          />{" "}
                          <span style={{ fontSize: "12px" }}>
                            I confirm that all the information provided in this
                            application is true, complete and accurate, has
                            specified all previous study courses and has
                            specified the highest degree and also employment
                            history.
                          </span>
                        </div>
                      </div>
                      <Button
                        color="primary"
                        onClick={() => handleTerms()}
                        disabled={!check}
                      >
                        {progress ? (
                          <ButtonLoader />
                        ) : (
                          "Accept Terms & Conditions"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-1 text-center">
                      <div className="d-flex justify-content-center">
                        <img src={icon_success} height="35" alt="" />
                      </div>
                      <h5 className="my-1">
                        Terms and Conditions Signed Successfully
                      </h5>

                      <ReactToPrint
                        trigger={() => (
                          <button className="btn btn-warning">
                            <span className="fas fa-download"> </span>{" "}
                            <span> Download pdf</span>
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      <Link to="/search" className="btn btn-blue ml-3">
                        <span> Add Application</span>
                      </Link>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ display: "none", margin: "20px" }}>
            <div ref={componentRef}>
              <div
                style={{
                  display: "flex",
                  padding: "40px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div>
                    <span>
                      Full Name :{" "}
                      <span style={{ marginRight: "4px" }}>
                        {studentDetails?.firstName}
                      </span>
                      {studentDetails?.lastName}
                    </span>
                  </div>
                  <div>
                    <span>
                      {" "}
                      Date of Birth : {dateFormate(studentDetails?.dateOfBirth)}
                    </span>
                  </div>

                  <div>
                    <span>Document ID : {studentDetails?.studentViewId}</span>
                  </div>
                </div>
                <div>
                  <img height={50} src={logoLg} alt="" />
                </div>
              </div>

              <div style={{ padding: "60px" }}>
                {/* personal information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Personal Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  <Table style={{ marginBottom: "2 rem" }}>
                    <tbody>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          Name
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.firstName} {studentDetails?.lastName}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Mobile Number
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          +{studentDetails?.phoneNumber}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Email Address
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.email}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Date of Birth
                        </td>

                        <td style={{ paddingLeft: "8px" }}>
                          {dateFormate(studentDetails?.dateOfBirth)}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Nationality
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.nationality?.name}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Country of Birth
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.country?.name}
                        </td>
                      </tr>

                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Passport Number
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.passportNumber}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Gender
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.gender?.name}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Marital Status
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {studentDetails?.maritalStatus?.name}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                {/* personal information */}

                {/* Contact information */}
                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Contact Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  {contactData.map((contact, i) => (
                    <>
                      {" "}
                      <span
                        className="card-heading"
                        style={{ marginBottom: "10px" }}
                      >
                        {contact?.addressType?.name}
                      </span>
                      <Table style={{ marginBottom: "2 rem" }}>
                        <tbody>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                                width: "50%",
                              }}
                            >
                              House No
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.houseNo}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Address Line
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.addressLine}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              City
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.city}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              State/County
                            </td>

                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.state}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Zip/Post Code
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.zipCode}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Country
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.country?.name}
                            </td>
                          </tr>

                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Gender
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {studentDetails?.gender?.name}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Marital Status
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {studentDetails?.maritalStatus?.name}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ))}
                </div>
                {/* Contact information */}

                {/*Emergency Contact information */}
                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Emergency Contact Information
                        </p>
                      </td>
                    </thead>
                  </Table>
                  {emergencyContactList?.map((contact, i) => (
                    <>
                      <span className="card-heading">
                        Emergency Contact {i + 1}
                      </span>
                      <Table style={{ marginBottom: "2 rem" }}>
                        <tbody>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                                width: "50%",
                              }}
                            >
                              Name
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.personName}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Relation
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.relationship}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Address
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.addressLine} <br />
                              {contact?.city} <br />
                              {contact?.state}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Phone
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.phoneNumber}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Email
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {contact?.emailAddress}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ))}
                </div>

                {/*Emergency Contact information */}

                {/* application information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Application Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  <Table style={{ marginBottom: "2 rem" }}>
                    <tbody>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          Student's preferred study destination
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {applicationData?.preferredCountry}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Application Type
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {applicationData?.applicationInfo}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                {/* application information */}

                {/* Funding information */}
                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Funding Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  <Table style={{ marginBottom: "2 rem" }}>
                    <tbody>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          Fund
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {fundingData?.fundingType}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Details
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {fundingData?.details}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Attachment
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          <a
                            href={rootUrl + fundingData?.fileUrl}
                            target="blank"
                          >
                            attachment
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                {/* Funding information */}

                {/* Educational information */}
                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Educational Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  {educationalInfos.length > 0 &&
                    educationalInfos?.map((edu, i) => (
                      <>
                        <span className="card-heading">
                          {edu?.nameOfInstitution}
                        </span>
                        <div
                          className="d-flex text-gray-70"
                          style={{ marginBottom: "10px" }}
                        >
                          <span className="pr-4">
                            <i className="fas fa-map-marker-alt pr-2"></i>
                            {edu?.instituteAddress}
                          </span>
                          <span>
                            <i className="fas fa-phone pr-2"></i>
                            {edu?.instituteContactNumber}
                          </span>
                        </div>
                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Course Beginning Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {dateFormate(edu?.attendedInstitutionFrom)}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Course Ending Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.qualificationAchieved === true &&
                                  dateFormate(edu?.attendedInstitutionTo)}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Education Level
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.educationLevel?.name}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Qualification Course
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.qualificationSubject}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Duration
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.duration}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Result In Percentage
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.finalGrade}
                              </td>
                            </tr>

                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Country of Education
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.countryOfEducation?.name}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Language of Institution
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {edu?.languageOfInstitution}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ))}
                </div>
                {/* Educational information */}

                {/* English Language & Test Score information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          English Language & Test Score
                        </p>
                      </td>
                    </thead>
                  </Table>
                  <div>
                    <div>
                      {greData !== null ? (
                        <>
                          <span
                            className="card-heading"
                            style={{ marginBottom: "20px" }}
                          >
                            GRE Result
                          </span>

                          <Table style={{ marginBottom: "2 rem" }}>
                            <tbody>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                    width: "50%",
                                  }}
                                >
                                  Quantitative Score
                                </td>
                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.quantitativeScore}
                                </td>
                              </tr>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  Quantitative Rank
                                </td>
                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.quantitativeRank}
                                </td>
                              </tr>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  Verbal Score
                                </td>
                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.verbalScore}
                                </td>
                              </tr>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  Verbal Rank
                                </td>

                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.verbalRank}
                                </td>
                              </tr>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  Writing Score
                                </td>
                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.writingScore}
                                </td>
                              </tr>
                              <tr style={{ border: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    borderRight: "1px solid #dee2e6",
                                    paddingLeft: "8px",
                                  }}
                                >
                                  Writing Rank
                                </td>
                                <td style={{ paddingLeft: "8px" }}>
                                  {greData?.writingRank}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </>
                      ) : null}

                      <>
                        {gmatData !== null ? (
                          <>
                            <span
                              className="card-heading"
                              style={{ marginBottom: "20px" }}
                            >
                              GMAT Result
                            </span>

                            <Table style={{ marginBottom: "2 rem" }}>
                              <tbody>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                      width: "50%",
                                    }}
                                  >
                                    Quantitative Score
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.quantitativeScore}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Quantitative Rank
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.quantitativeRank}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Verbal Score
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.verbalScore}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Verbal Rank
                                  </td>

                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.verbalRank}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Writing Score
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.writingScore}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Writing Rank
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.writingRank}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Total Score
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.totalScore}
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid #dee2e6" }}>
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                    }}
                                  >
                                    Total Rank
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {gmatData?.totalRank}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </>
                        ) : null}
                      </>
                    </div>

                    {ielts?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          IELTS Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Listening
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {ielts?.listening}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Reading
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {ielts?.reading}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Writing
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {ielts?.writing}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Speaking
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {ielts?.speaking}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Overall
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {ielts?.overall}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Exam Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {dateFormate(ielts?.examDate)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {duolingo?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          DUOLINGO Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Literacy
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {duolingo?.leteracy}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Comprehension
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {duolingo?.comprehension}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Conversation
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {duolingo?.conversation}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Production
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {duolingo?.production}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Exam Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {dateFormate(duolingo?.examDate)}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {duolingo?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {toefl?.id ? (
                      <div style={{ marginTop: "700px" }}>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          TOEFL Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Overall
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.overall}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Speaking
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.speaking}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Reading
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.reading}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Writing
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.writing}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Listening
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.listening}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Exam Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {dateFormate(toefl?.examDate)}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {toefl?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    ) : null}
                    {functions?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          Function Skills Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Overall
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.overall}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Speaking
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.speaking}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Reading
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.reading}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Writing
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.writing}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Listening
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.listening}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Exam Date
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {dateFormate(functions?.examDate)}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {functions?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {gcse?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          GCSE Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Result
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {gcse?.result}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {gcse?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {pearson?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          PEARSON Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Result
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pearson?.result}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pearson?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {others?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          Other Score
                        </span>

                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Test Name
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {others?.testName}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Overall Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {others?.scoreOverall}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {others?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                    {pte?.id ? (
                      <>
                        <span
                          className="card-heading"
                          style={{ marginBottom: "20px" }}
                        >
                          PTE Score
                        </span>
                        <Table style={{ marginBottom: "2 rem" }}>
                          <tbody>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                  width: "50%",
                                }}
                              >
                                Overall
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pte?.overall}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Speaking
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pte?.speaking}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Reading
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pte?.reading}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                Writing
                              </td>

                              <td style={{ paddingLeft: "8px" }}>
                                {pte?.writing}
                              </td>
                            </tr>
                            <tr style={{ border: "1px solid #dee2e6" }}>
                              <td
                                style={{
                                  borderRight: "1px solid #dee2e6",
                                  paddingLeft: "8px",
                                }}
                              >
                                IELTS Equivalent Score
                              </td>
                              <td style={{ paddingLeft: "8px" }}>
                                {pte?.ieltsEquivalent}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* English Language & Test Score information */}

                {/* Experience Information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Experience Information
                        </p>
                      </td>
                    </thead>
                  </Table>
                  {experienceInfo?.map((inf, i) => (
                    <>
                      <span
                        className="card-heading"
                        style={{ marginBottom: "20px" }}
                      >
                        {inf?.companyName}
                      </span>

                      <Table style={{ marginBottom: "2 rem" }}>
                        <tbody>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                                width: "50%",
                              }}
                            >
                              Job Title
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {inf?.jobTitle}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Company Name
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {inf?.companyName}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Duties and Responsibilities
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {inf?.employeementDetails}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              From
                            </td>

                            <td style={{ paddingLeft: "8px" }}>
                              {dateFormate(inf?.startDate)}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              To
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {inf?.isStillWorking === false ? (
                                dateFormate(inf?.endDate)
                              ) : (
                                <span>Continue</span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ))}
                </div>

                {/* Experience Information */}

                {/* Reference  Information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Reference Information
                        </p>
                      </td>
                    </thead>
                  </Table>
                  {referenceList?.map((ref, i) => (
                    <>
                      <span
                        className="card-heading"
                        style={{ marginBottom: "20px" }}
                      >
                        {ref?.institute_Company}
                      </span>

                      <Table style={{ marginBottom: "2 rem" }}>
                        <tbody>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Relation
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {ref?.referenceType.name}
                            </td>
                          </tr>{" "}
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                                width: "50%",
                              }}
                            >
                              Name
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {ref?.referenceName}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Institute/Company
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {ref?.institute_Company}
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Phone
                            </td>

                            <td style={{ paddingLeft: "8px" }}>
                              <ContactNumber data={ref?.phoneNumber} />
                            </td>
                          </tr>
                          <tr style={{ border: "1px solid #dee2e6" }}>
                            <td
                              style={{
                                borderRight: "1px solid #dee2e6",
                                paddingLeft: "8px",
                              }}
                            >
                              Email
                            </td>
                            <td style={{ paddingLeft: "8px" }}>
                              {ref?.emailAddress}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ))}
                </div>

                {/* Reference  Information */}

                {/* Personal Statement */}

                <div style={{ marginBottom: "20px", marginTop: "700px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Personal Statement
                        </p>
                      </td>
                    </thead>
                  </Table>
                  <p className="pl-10px">
                    {studentStatement?.statement
                      ? studentStatement?.statement
                      : "Personal Statement is not added."}
                  </p>
                </div>

                {/* Personal Statement */}

                {/* Other  Information */}

                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Other Information
                        </p>
                      </td>
                    </thead>
                  </Table>

                  <Table style={{ marginBottom: "2 rem" }}>
                    <tbody>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          Disability Description
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {" "}
                          {otherInformation?.isHaveDisability
                            ? otherInformation?.disabilityDescription
                            : "No Disability"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Criminal convictions Description
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {otherInformation?.isHaveCriminalConvictions
                            ? otherInformation?.criminalConvictionsDescription
                            : "No Criminal conviction"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                {/* Other  Information */}

                {/* Upload Documents */}
                {/* 
                <div style={{ marginBottom: "20px" }}>
                  <Table style={{ marginBottom: "15px" }}>
                    <thead style={{ backgroundColor: "#045d5e " }}>
                      <td>
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          Upload Documents
                        </p>
                      </td>
                    </thead>
                  </Table>

                  <Table style={{ marginBottom: "2 rem" }}>
                    <tbody>
                      {UploadData?.length === 0 ? (
                        <p className="pl-10px">No Document found</p>
                      ) : (
                        <>
                          {UploadData?.length > 0 &&
                            UploadData?.map((item, i) =>
                              item?.documents?.map((docu, j) => (
                                <tr
                                  key={j}
                                  style={{
                                    border: "1px solid #dee2e6",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #dee2e6",
                                      paddingLeft: "8px",
                                      width: "50%",
                                    }}
                                  >
                                    {docu?.documentLevelName}
                                  </td>
                                  <td style={{ paddingLeft: "8px" }}>
                                    {docu?.studentDocumentFile === null ? (
                                      "-"
                                    ) : (
                                      <a
                                        href={
                                          rootUrl +
                                          docu?.studentDocumentFile?.fileUrl
                                        }
                                        target="blank"
                                      >
                                        {docu?.studentDocumentFile?.fileName}
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                        </>
                      )}
                    </tbody>
                  </Table>
                </div> */}

                {/* Upload Documents */}

                {/*Terms and condition information */}
                <div style={{ marginBottom: "40px" }}>
                  {currentUserDetails?.details !== "<p><br></p>" &&
                    currentUserDetails?.details !== "<p> </p>" &&
                    currentUserDetails?.details !== "<h5><br></h5>" && (
                      <div>
                        {currentUserDetails?.userName && (
                          <h2 className="mb-3 ">
                            <b className="bg-u">
                              INDEX FOR UAPP{" "}
                              <span style={{ color: "#fc7300" }}>
                                {" "}
                                {currentUserDetails?.userName}
                              </span>{" "}
                              HANDBOOK
                            </b>
                          </h2>
                        )}

                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            currentUserDetails?.details
                          )}
                        ></div>
                        <div className="mt-4">
                          {" "}
                          <h5>
                            SIGNATURE:{" "}
                            <span className="signature-student">
                              {studentDetails?.firstName}{" "}
                              {studentDetails?.lastName}
                            </span>
                          </h5>
                          <h5>
                            NAME OF THE EMPLOYEE: :{" "}
                            <span style={{ fontSize: "14px" }}>
                              {studentDetails?.firstName}{" "}
                              {studentDetails?.lastName}
                            </span>
                          </h5>
                          <h5>
                            Date:{" "}
                            <span style={{ fontSize: "14px" }}>
                              {formatDate(conscentData?.consentSignTime)}
                            </span>
                          </h5>
                        </div>
                      </div>
                    )}
                </div>
                {/*Terms and condition information */}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentDeclaration;
