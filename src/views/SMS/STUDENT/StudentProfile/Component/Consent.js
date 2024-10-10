import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Table } from "reactstrap";
import get from "../../../../../helpers/get";
import downloadPdf from "../../../../../assets/img/downloadPdf.png";
import { userTypes } from "../../../../../constants/userTypeConstant";
import vector from "../../../../../assets/img/Vector.png";
import { rootUrl } from "../../../../../constants/constants";
import logoLg from "../../../../../assets/img/Logo.svg";
import ReactToPrint from "react-to-print";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const Consent = ({
  sId,
  studentDetails,
  contactData,
  emergencyContactList,
  applicationData,
  fundingData,
  educationalInfos,
  ielts,
  duolingo,
  toefl,
  functions,
  gcse,
  pearson,
  others,
  pte,
  greData,
  gmatData,
  experienceInfo,
  referenceList,
  studentStatement,
  result,
  otherInformation,
}) => {
  const [conscentData, setConscentData] = useState({});

  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();
  const componentRef = useRef();

  useEffect(() => {
    get(`StudentConsent/Get/${sId}`).then((res) => {
      setConscentData(res);
    });
  }, [sId]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  // const handleDate = (e) => {
  //   let format =
  //     new Date(e).getDate() +
  //     "-" +
  //     (new Date(e).getMonth() + 1) +
  //     "-" +
  //     new Date(e).getFullYear();

  //   return format;
  // };

  const handleConsent = () => {
    history.push(`/studentDeclaration/${localStorage.getItem("referenceId")}`);
  };
  return (
    <div>
      <Card className="p-4">
        <h5 className="mb-4">Consent</h5>

        {conscentData === null || conscentData?.isDeclared === false ? (
          <>
            <p> Consent is not signed yet</p>
            {userTypeId === userTypes?.Student.toString() ? (
              <>
                <div className="d-flex flex-wrap justify-content-center">
                  <div style={{ cursor: "pointer" }}>
                    <div className="std-consent-and-profile">
                      <img
                        src={vector}
                        className="img-fluid dashbard-img-style1"
                        alt=""
                      />
                      <span onClick={handleConsent}>Sign Consent</span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <span className="text-gray-70">
              Consent Signed on: {conscentData?.consentSignTime}
            </span>

            <div className="my-3">
              <ReactToPrint
                trigger={() => (
                  <button className="btn btn-consultant-profile-pdf">
                    <span className="fas fa-download"> </span>{" "}
                    <span> Download pdf</span>
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>

            <span className="text-gray-70">
              Conscent Signed From Ip: {conscentData?.consentFromIp}
            </span>
          </>
        )}

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
                        {studentDetails?.phoneNumber}
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

                {contactData?.map((contact, i) => (
                  <>
                    {" "}
                    <span
                      className="card-heading"
                      style={{ marginLeft: "8px", marginBottom: "10px" }}
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
                        {emergencyContactList?.personName}
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
                        {emergencyContactList?.relationship}
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
                        {emergencyContactList?.addressLine} <br />
                        {emergencyContactList?.city} <br />
                        {emergencyContactList?.state}
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
                        {emergencyContactList?.phoneNumber}
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
                        {emergencyContactList?.emailAddress}
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
                        <a href={rootUrl + fundingData?.fileUrl} target="blank">
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

                {educationalInfos?.length > 0 &&
                  educationalInfos?.map((edu, i) => (
                    <>
                      <span
                        className="card-heading"
                        style={{ marginLeft: "8px" }}
                      >
                        {edu?.nameOfInstitution}
                      </span>
                      <div
                        className="d-flex text-gray-70"
                        style={{ paddingLeft: "8px", marginBottom: "10px" }}
                      >
                        <span className="pr-4" style={{ marginRight: "7px" }}>
                          <i
                            className="fas fa-map-marker-alt pr-2"
                            style={{ marginRight: "5px" }}
                          ></i>
                          {edu?.instituteAddress}
                        </span>
                        <span>
                          <i
                            className="fas fa-phone pr-2"
                            style={{ marginRight: "5px" }}
                          ></i>
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
                              Attended From
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
                              Attended To
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
                          style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                            style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                              reading
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                              reading
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                              reading
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                        style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                              reading
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
                      style={{ marginLeft: "8px", marginBottom: "20px" }}
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
                            Relation
                          </td>
                          <td style={{ paddingLeft: "8px" }}>
                            {ref?.referenceType.name}
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
                            {ref?.phoneNumber}
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
                {result && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: `10px`,
                      border: `0.5px solid rgba(37, 37, 37, 0.12`,
                      background: `#fff`,
                      padding: `20px`,
                      marginBottom: `1.5rem`,
                    }}
                  >
                    <div>
                      <p style={{ marginBottom: 0 }}>
                        Identical Words: {result?.score?.identicalWords}
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        Related Words: {result?.score?.relatedMeaningWords}
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        Minor Words: {result?.score?.minorChangedWords}
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h3
                        className={
                          result?.score?.aggregatedScore < 25
                            ? `text-success fw-600`
                            : result?.score?.aggregatedScore < 50
                            ? `text-warning fw-600`
                            : `text-danger fw-600`
                        }
                        style={{ marginBottom: 0 }}
                      >
                        {result?.score?.aggregatedScore}%
                      </h3>
                      <h6
                        className={
                          result?.score?.aggregatedScore < 25
                            ? `text-success fw-600`
                            : result?.score?.aggregatedScore < 50
                            ? `text-warning fw-600`
                            : `text-danger fw-600`
                        }
                        style={{ marginBottom: 0 }}
                      >
                        Plagiarism
                      </h6>
                    </div>
                  </div>
                )}
                <p
                  className="pl-10px"
                  style={{ paddingLeft: "10px", textAlign: "justify" }}
                >
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

              {/* Concent signs*/}

              {conscentData?.isDeclared === true ? (
                <>
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
                            Declaration
                          </p>
                        </td>
                      </thead>
                    </Table>
                    <div>
                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        1. INTRODUCTION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          1.1.Overview of the Declaration
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          This AGREEMENT, (the "Agreement,") is a legally
                          binding document establishing the rights and
                          obligations between UAPP, herein referred to as "the
                          Firm," and the undersigned student, “the Student” in
                          relation to the Student's application for admission to
                          a university facilitated by the Firm. By affixing
                          their signature to this Agreement, the Student
                          acknowledges their full understanding of the terms
                          herein and willingly agrees to be bound by them
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          1.2 Purpose of the Declaration
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The primary purpose of this Agreement is to clearly
                          articulate the rights, responsibilities, and
                          obligations on the part of the Student herein
                          expressed are in consideration for the Firm agreeing
                          to use its best endeavours to facilitate and support
                          the Student’s application for registration to study at
                          a Partner University. Without prejudice to the
                          following any breach this Agreement by the Student may
                          result in amongst other detriments, delay, refusal or
                          rejection of application for registration, withdrawal
                          of offer or cancellation of registration without
                          reimbursement of any fees paid as well as action by
                          the Firm or other affected third parties. By affixing
                          their signature to this Agreement, the Student
                          acknowledges their full understanding of the terms
                          herein and willingly agrees to be bound by them. This
                          Agreement serves as a comprehensive guide, fostering
                          transparency and a shared commitment to the successful
                          navigation of the university admission process.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        2. CONSENT FOR DATA PROCESSING
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          2.1 Explicit Consent for Processing Personal Data
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student, hereby acknowledges and expressly grants
                          the Firm, full and unambiguous consent to process,
                          collect, and store personal data This includes, but is
                          not limited to, information provided in this form and
                          any additional data obtained from other sources, such
                          as academic records and reference letters. This
                          consent is granted for the explicit purpose of
                          facilitating the university admission process,
                          including document verification, communication
                          pertaining to the admission process, and any
                          legitimate reasons connected with the student's
                          enrolment. The Student understands that failure to
                          provide the necessary information may impede the
                          Firm's ability effectively to facilitate the admission
                          process.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          2.2 Clarification on Data Processing for Admission
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student expressly agrees to permit the Firm to
                          process special category data as defined under the
                          General Data Protection Regulation (GDPR). Such
                          processing will be undertaken solely for the purposes
                          explicitly indicated in this declaration. The Student
                          understands that special category data may include,
                          but is not limited to, information pertaining to
                          health, disabilities, or other sensitive details
                          relevant to the university admission process. The Firm
                          commits to handle such data with the utmost
                          confidentiality and only utilize it for the purposes
                          explicitly specified in this agreement.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          2.3 Agreement for Special Category Data Processing
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Firm confirms and the Student accepts that any
                          data so collected and or processed in accordance with
                          2.1 and 2.2 above shall only be kept for the purposes
                          of carrying out the obligations of this Agreement and
                          confirmation of full compliance therewith by both
                          parties. Except in exceptional circumstances the Firm
                          confirms that any such data shall be kept only as long
                          as necessary to facilitate the application of the
                          Student for registration and any subsequent
                          verification. Unless with the Student’s consent or
                          prevented by outside events, such as but not limited
                          to any investigation into the Student’s application,
                          the data provided by the Student other than that
                          needed for basic record and statistical purposes, will
                          be destroyed by the Firm at the end of the academic
                          period for which the application was made.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        3. DOCUMENT AND INFORMATION SUBMISSION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          3.1 Student's Responsibility for Document Submission
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student, affirms their understanding and
                          unequivocal acknowledgment of their responsibility for
                          the comprehensive and timely submission of all
                          requisite documents pertinent to the university
                          admission process facilitated by "the Firm". The
                          student acknowledges that the Firm relies implicitly
                          on the authenticity, accuracy, and completeness of the
                          submitted documents to fulfil its commitment to
                          facilitating the admission process. Any deviation from
                          this responsibility, including delays or omissions in
                          document submission, may substantially hinder the
                          Firm's ability to provide effective support throughout
                          the application process including those which are time
                          sensitive and the consequences of such delays are to
                          be borne by the Student.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          3.2 Consequences for Providing False Information
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          In alignment with the principles of transparency and
                          integrity, the Student acknowledges that the
                          submission of any information which is or is deemed by
                          the Firm or any relevant University to be, false,
                          fraudulent, or misleading is prohibited. Such
                          information includes, but is not limited to, the
                          presentation of forged documents, misrepresentation of
                          academic achievements, or engagement in any form of
                          deceptive practices. The student comprehends that
                          engaging in such practices may result in severe
                          consequences, including but not limited to, immediate
                          termination of the Firm's services, withdrawal of
                          university applications, and, if deemed necessary,
                          legal actions pursued to the fullest extent permitted
                          by law. The student hereby acknowledges the gravity of
                          providing accurate, authentic, and truthful
                          information as an absolute prerequisite for
                          maintaining the integrity of the admission process and
                          ensuring the lawful pursuit of their academic goals.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        4. CONTACT INFORMATION AND COMMUNICATION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          4.1 Requirement for Updated Contact Information
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The student explicitly commits to promptly inform the
                          Firm forthwith, within a maximum of one (1) calendar
                          days, of any changes to their contact details, which
                          includes but is not limited to email address, phone
                          number, residence address, and emergency contact
                          information. This proactive commitment is integral to
                          ensuring uninterrupted and effective communication
                          during the entire admission process. For instance, if
                          there are delays exceeding the stipulated one-day
                          period in updating contact information, the Firm may
                          face challenges in providing timely updates,
                          notifications, or responding promptly to the student's
                          inquiries. This could potentially lead to
                          misunderstandings, missed deadlines, and disruptions
                          in the admission process, the responsibility of which
                          will be fully borne by the student.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          4.2 Prompt Notification of Changes in Contact
                          Information
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The student acknowledges and understands that timely
                          communication is not only a courtesy but an essential
                          element of the admission process. Therefore, the
                          Student commits to promptly, accurately, and
                          comprehensively notify the Firm of any changes in
                          contact information. This includes providing detailed
                          information about the changes, the effective date of
                          the changes, and any alternative means of contact
                          during the transitional period. The student
                          acknowledges that failure to provide such timely
                          updates may lead to missed communications, potential
                          delays in the application process, and hinder the
                          Firm's ability to convey essential information related
                          to the admission process. In practical terms, if there
                          are delays or failure in communication due to outdated
                          contact information, it may result in missed
                          deadlines, critical updates not reaching the student,
                          and potential setbacks in the admission process.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          4.3 Agreement on Communication Preferences
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          By entering into this legally binding Agreement, the
                          Student explicitly recognizes the pivotal role of
                          effective and streamlined communication in the
                          successful execution of the university admission
                          process. The student commits to collaborating with the
                          Firm in establishing and adhering to explicit
                          communication preferences. This includes defining
                          preferred communication modes (e.g., email, phone,
                          video calls) and the agreed-upon frequency of
                          communication, ensuring that preferences are not only
                          communicated but consistently maintained throughout
                          the admission process. The student understands and
                          acknowledges that adherence to these preferences
                          enhances the overall efficiency of the admission
                          process. Should there be misunderstandings or delays
                          in communication due to the failure to follow the
                          agreed-upon communication preferences, this could
                          potentially lead to misaligned expectations,
                          disruptions in the admission process, and, in extreme
                          cases, misinformation.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          4.4 Sharing of Credentials
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The applicant agrees that, under no circumstances,
                          will any credential (including but not limited to Bank
                          Details, Card PIN, Email Credentials and Student
                          Finance account credentials) be shared, which might
                          give access to sensitive information about the
                          applicant, to any of the employees of the firm or
                          third party.In an unfortunate case, wherein any such
                          information is shared by the applicant (with their own
                          consent), and losses are incurred (including but not
                          limited to financial losses), the applicant will be
                          held responsible and will bear the full responsibility
                          of the loss. In such a case, the applicant cannot hold
                          the firm accountable or demand for repayment of any
                          losses incurred.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        5. FINANCIAL DECLARATIONS AND OBLIGATIONS
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          5.1 Understanding of Financial Criteria
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          The Student, enters into this Agreement with an
                          acknowledgment of the paramount importance of
                          thoroughly understanding and strictly adhering to the
                          multifaceted financial criteria established by the
                          Firm. This includes understanding the financial
                          application process, detailed criteria governing
                          financial assistance, and a proactive commitment to
                          staying informed about any updates or modifications to
                          these criteria throughout the entirety of the
                          university admission process. Failure by the Student
                          to make and keep themselves fully aware of such
                          criteria and to adhere to same may not only jeopardize
                          their eligibility for financial assistance but may
                          also result in misapplications, delayed financial
                          processing, and the potential inability to secure
                          financial support in a timely manner.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          5.2 Declaration of Highest Qualification for Financial
                          Applications
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student acknowledges a continuing obligation to
                          provide accurate information concerning their highest
                          level of qualification. This declaration applies to
                          academic qualifications obtained in the United Kingdom
                          and earned overseas. The Student acknowledges the
                          gravity of this commitment, recognizing that any
                          discrepancies, inaccuracies, or misrepresentations in
                          this declaration may result in a spectrum of
                          consequences outlined explicitly within this
                          agreement. The Student acknowledges that any
                          Inaccurate declaration of the highest qualification is
                          not merely a procedural misstep; it holds the
                          potential to lead to misapplication or miscalculation
                          of financial assistance, thereby affecting the
                          Student’s financial standing and ability to meet the
                          financial obligations intricately tied to the
                          admission process of the university.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          5.3 Acknowledgment of Financial Obligations
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student acknowledges the financial obligations
                          intricately associated with the university admission
                          process facilitated by the Firm. The firm provides all
                          its services for free of cost. However, in case there
                          is a fee associated with the university application,
                          it shall be informed to the user through the UAPP
                          platform itself. This fee includes, but is by no means
                          limited to, application fees, tuition, accommodation
                          costs, and any other pertinent financial obligations
                          explicitly communicated by the Firm. In any case where
                          applicant needs to pay an additional fee, the fees
                          will be directly paid to the university and not to the
                          firm or any employee of the firm. The Student commits,
                          without reservation, to fulfilling these financial
                          obligations promptly and precisely, strictly adhering
                          to the timelines specified by the Firm in accordance
                          to university requirements. In case, any such
                          financial obligations are not mentioned on the
                          platform, then student understands that the services
                          are free. Failure to fulfil financial obligations
                          promptly is not merely a procedural lapse; it holds
                          significant consequences. Such failures may result in
                          consequential delays in the admission process,
                          potential withdrawal of applications, and, critically,
                          may impact the Student's eligibility for financial
                          assistance not only in the current academic period but
                          also in subsequent academic periods. In the
                          unfortunate case, wherein no information of additional
                          financial obligations is explicitly mentioned on the
                          UAPP platform and the Student has paid any fees to the
                          agents/consultants/third parties without
                          consulting/communicating the same to the firm, the
                          student cannot hold the firm accountable / liable for
                          any losses (including but not limited to financial
                          loss).
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        6. QUALIFICATION VERIFICATION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          6.1 Accuracy and Authenticity of Provided Documents
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student agrees to uphold the integrity of the
                          university admission process facilitated by the Firm,
                          This commitment extends to ensuring the accuracy and
                          authenticity of all qualifications submitted for
                          admission. The student recognizes their personal
                          responsibility and that the Firm relies extensively on
                          the veracity of the qualifications provided by the
                          Student to support the admission process. This
                          obligation is a fundamental assurance by the Student
                          relied upon by the Firm in order to maintain the
                          fairness and credibility of the admission process,
                          ensuring that all stakeholders can trust the
                          information provided.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          6.2 Consent for Verification and Cross-Checking of
                          Documents
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          With full awareness of the significance of ensuring
                          the authenticity of documents, the Student grants
                          consent and authority to the Firm to employ all
                          necessary means to verify and cross-check the
                          submitted qualifications. This may involve contacting
                          educational institutions, relevant certification
                          bodies, or any other authoritative entities to
                          validate the accuracy and legitimacy of the provided
                          qualifications in which case the Student gives
                          authority to same to release such personal information
                          and documentation regarding the Student to the Firm as
                          they may from time to time request.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          6.3 Consequences of False Declaration
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          In certifying the authenticity of the documents
                          submitted for admission purposes, the student
                          unequivocally acknowledges that these documents are
                          genuine, awarded legitimately, and hold accurate
                          representation of their academic achievements. The
                          Student understands and acknowledges that providing
                          false declarations is not only ethically unacceptable
                          but may be deemed as malpractice and/or fraud by
                          either the Firm and or third parties.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        7. COMPLIANCE AND DECLARATION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          7.1 Commitment to Immigration Rules (For International
                          Students)
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          In solemn commitment to the legality of the admission
                          process, the undersigned Student explicitly pledges to
                          strictly adhere to all immigration rules and
                          regulations applicable to international students. This
                          commitment is foundational to the integrity of the
                          admission process, ensuring that the Student's
                          academic journey aligns seamlessly with legal
                          requirements. Non-compliance may introduce
                          complexities, potentially resulting in visa
                          complications, admission delays, or, in extreme cases,
                          jeopardizing the Student's ability to pursue studies.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          7.2 Requirement for Criminal Convictions/Health
                          Disclosures
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student acknowledges and willingly embraces the
                          obligation to transparently disclose any pertinent
                          information concerning criminal convictions and health
                          matters. This obligation is a cornerstone of the
                          admission process, fostering a comprehensive
                          understanding of the Student's background necessary
                          for informed decision-making. Failure to fulfil this
                          obligation may lead to complications, affecting
                          program eligibility and potentially triggering legal
                          consequences, thereby safeguarding the firm and
                          partner universities.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          7.3 Assurance of Legal Complianc
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student will comply with all pertinent academic
                          and admission policies, regulations, and applicable
                          laws. Breach of legal compliance may result in severe
                          consequences, including the rejection of applications,
                          potential legal actions, and reputational damage to
                          the Firm.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          7.4 Confirmation of Representation Accuracy
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student affirms to the firm that all
                          representations made during the admission process will
                          be accurate. Inaccurate representations may impede the
                          firm's ability to make well-informed decisions,
                          potentially leading to application rejection, legal
                          ramifications, and jeopardizing the overall integrity
                          of the admission process.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          7.5 Agreement to Indemnify
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student will indemnify and hold harmless the firm
                          for any claims, liabilities, or legal actions arising
                          from the Student's actions, representations, or
                          omissions during the admission process. Failure to
                          uphold this agreement may expose the Applicant to
                          legal liabilities, financial consequences, and
                          potential legal actions initiated by the Firm or
                          affected parties who also rely on the Student’s
                          fulfillment of their obligations under this Agreement.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          8.1 Pledge to Maintain Confidentiality
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student will maintain the utmost confidentiality
                          regarding any information obtained during the
                          admission process. This extends to all details,
                          including, but not limited to, application materials,
                          communication content, proprietary information shared
                          by the Firm, or partner universities, and any other
                          confidential information. The Student acknowledges
                          that any unauthorized disclosure or use of such
                          confidential information may lead to severe
                          consequences, including, but not limited to, legal
                          actions, claims for damages, reputational harm to the
                          Firm, and potential ramifications for the Student’s
                          application such as application rejection or legal
                          actions by third parties.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          8.2 Agreement on Ownership of Intellectual Property
                          Rights
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student acknowledges and expressly agrees to the
                          ownership rights of the Firm over any items created,
                          developed, or shared during the admission process.
                          These items include, but are not limited to, content,
                          materials, ideas, innovations, and any creative work
                          produced as part of the collaborative efforts between
                          the Student and the Firm. The Student further agrees
                          not to contest any claim by the Firm to such rights
                          over such items property owned by the Firm and
                          understands that any unauthorized use, reproduction,
                          or such claim may lead to legal disputes, claims for
                          damages, and reputational harm to both the Firm and
                          the Student.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        9. DEADLINE ADHERENCE AND DISPUTE RESOLUTION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          9.1 Commitment to Adhere to Deadlines
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student agreesto adhere to all deadlines
                          stipulated by the Firm throughout the admission
                          process. The Student acknowledges that timely
                          adherence to deadlines is crucial for the efficient
                          processing of their application and that any failure
                          to meet deadlines may result in, inter alia, the
                          rejection of applications and the potential of legal
                          by the Firm and or third parties.
                        </p>
                      </span>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          9.2 Agreement on Dispute Resolution Process
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          In the event of any dispute, both parties agree to
                          engaging in good faith negotiations to seek an
                          amicable resolution failing which they agree to the
                          joint appointment of a mediator the costs of which
                          will be borne equally and that no court action should
                          be commenced prior to such mediation.
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        10. Termination of this Agreement
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          This Agreement will terminate upon the earlier of the
                          following: - <br />
                          1) The expiry of 28 days’ written (including by
                          confirmed email set out below) notice given by either
                          Party. <br />
                          2) The first anniversary of the signing of this
                          Agreemen
                        </p>
                      </span>

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        11. POLICY UNDERSTANDING AND TERMINATION
                      </p>

                      <span className="conscentText-style">
                        <p
                          style={{
                            paddingLeft: "8px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          11.1 Acknowledgment of Responsibilities and
                          Termination Conditions
                        </p>
                        <p
                          style={{
                            paddingLeft: "8px",
                          }}
                        >
                          {" "}
                          The Student acknowledges, accepts, and fully
                          understands the responsibilities outlined in this
                          Agreement, as well as the specific conditions under
                          which termination of the admission process may occur.
                          The Student recognizes that any failure to meet
                          responsibilities or adhere to termination conditions
                          may result in legal consequences, financial
                          liabilities, and reputational harm to both the Firm
                          and the Applicant. For any harm to the firm’s
                          reputation due to negligence by applicant, the
                          applicant will be held solely responsible and will
                          have to bear the consequences, as applicable.
                        </p>
                      </span>
                      <br />
                      <br />
                      <br />
                      <br />

                      <p
                        style={{
                          paddingLeft: "8px",
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        By entering my email ID below, I, the undersigned
                        Applicant, affirm that I have thoroughly read,
                        understood, and willingly agreed to the terms and
                        conditions outlined in this Student Declaration Form. I
                        acknowledge the significance of adhering to the
                        commitments, responsibilities, and deadlines set forth
                        in this Agreement. <br /> <br /> Furthermore, I
                        understand that any deviation from the agreed-upon terms
                        may result in consequences, including but not limited to
                        application rejection, financial liabilities, and
                        potential legal actions. This declaration signifies my
                        commitment to a transparent, responsible, and legally
                        compliant engagement with UAPP throughout the university
                        admission and enrolment process. <br />
                        <br /> I confirm that I have had the opportunity to seek
                        independent legal advice before signing and that the
                        Firm is entering this Agreement at my request.
                      </p>

                      <br />
                      <br />
                      <br />
                    </div>

                    <br />
                    <br />
                    <div
                      style={{
                        paddingLeft: "8px",
                      }}
                    >
                      <p> Student Email: {studentDetails?.email}</p>
                      <p>
                        Consent Status:{" "}
                        {conscentData?.isDeclared === true ? (
                          <b>Signed</b>
                        ) : (
                          <b>Not Signed</b>
                        )}
                      </p>
                      <p>
                        Date & Time: {formatDate(conscentData?.consentSignTime)}
                      </p>
                      <p>IP: {conscentData?.consentFromIp}</p>
                      <p>
                        <b style={{ marginRight: "7px" }}>Signature:</b>
                        <span className="signature-student">
                          {studentDetails?.firstName} {studentDetails?.lastName}
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              ) : null}

              {/* Concent signs*/}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Consent;
