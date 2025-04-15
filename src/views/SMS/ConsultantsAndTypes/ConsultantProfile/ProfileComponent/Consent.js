import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import get from "../../../../../helpers/get";
import downloadPdf from "../../../../../assets/img/downloadPdf.png";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import logoLg from "../../../../../assets/img/Logo.svg";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import DOMPurify from "dompurify";
import { userTypes } from "../../../../../constants/userTypeConstant";

const Consent = ({ id }) => {
  const [consentData, setConsentData] = useState({});
  // const [success, setSuccess] = useState(false);
  // const userTypeId = localStorage.getItem("userType");
  // const history = useHistory();
  const componentRef = useRef();
  const [consultantData, setConsultantData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [emergencyInfo, setEmergencyInfo] = useState({});
  const userType = localStorage.getItem("userType");
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [consData, setConsData] = useState({});

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    userType === userTypes?.SystemAdmin
      ? get(`UserTermsAndConditions/Get/${userTypes?.Consultant}/${id}`).then(
          (res) => {
            setLoading(false);
            setCurrentUserDetails(res);
            console.log(res, "sakib");
          }
        )
      : get(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
          setLoading(false);
          setCurrentUserDetails(res);
          console.log(res, "sakib 1");
        });
  }, [id, userType]);

  useEffect(() => {
    get(`Consultant/GetGeneralInformation/${id}`).then((res) => {
      setConsData(res);
      console.log(res, "declaration");
    });
  }, [id]);

  useEffect(() => {
    get(`ConsultantProfile/GetConsent/${id}`).then((res) => {
      setConsentData(res);
    });
  }, [id]);

  useEffect(() => {
    get(`Consultant/Profile/${id}`).then((res) => {
      setConsultantData(res);
      console.log(res.branchName, "res");
      setContactInfo(res?.consultantContact);
    });

    get(`GroupPriceRange/ByConsultant/${id}`).then((res) => {
      setPriceRangeList(res);
    });
  }, [id]);

  useEffect(() => {
    get(`ConsultantEmergency/GetByConsultant/${id}`).then((action) => {
      setEmergencyInfo(action);
      console.log(action, "emergency");
    });
  }, [id]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      <Card className="p-4">
        <h5 className="mb-4">Consent</h5>

        {consentData === null || consentData?.isSigned === false ? (
          <p> Terms and Conditions is not signed yet</p>
        ) : (
          <>
            <span className="text-gray-70">
              Terms and Conditions Signed on:{" "}
              {dateFormate(consentData?.consentSignTime)}
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

            {/* <img
              src={downloadPdf}
              alt=""
              style={{ width: "156px" }}
              className="my-3"
            /> */}

            <span className="text-gray-70">
              Terms and Conditions Signed From Ip :{" "}
              {consentData?.deviceIp !== "undefined" && consentData?.deviceIp}
            </span>
          </>
        )}

        <div style={{ display: "none", margin: "20px" }}>
          <div ref={componentRef}>
            <div
              style={{
                display: "flex",
                padding: "60px 60px 0px 60px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div>
                  <span>
                    Full Name :{" "}
                    <span style={{ marginRight: "4px" }}>
                      {consultantData?.firstName}
                    </span>
                    {consultantData?.lastName}
                  </span>
                </div>
                <div>
                  <span>
                    Date of Birth : {dateFormate(consultantData?.dateOfBirth)}
                  </span>
                </div>

                <div>
                  <span>Document ID : {consultantData?.viewId}</span>
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
                        General Information
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
                        {consultantData?.nameTitle?.name}{" "}
                        {consultantData?.firstName} {consultantData?.lastName}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Consultant Type
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.consultantType?.name}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Recruitment Type
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.isAcceptedHome == true &&
                        consultantData?.isAcceptedEU_UK == true &&
                        consultantData?.isAcceptedInternational == true
                          ? "Home/UK, EU/EEU, International"
                          : consultantData?.isAcceptedHome == true &&
                            consultantData?.isAcceptedEU_UK == true &&
                            consultantData?.isAcceptedInternational == false
                          ? "Home/UK, EU/EEU"
                          : consultantData?.isAcceptedHome == true &&
                            consultantData?.isAcceptedEU_UK == false &&
                            consultantData?.isAcceptedInternational == false
                          ? "Home/UK"
                          : consultantData?.isAcceptedHome == false &&
                            consultantData?.isAcceptedEU_UK == true &&
                            consultantData?.isAcceptedInternational == true
                          ? "EU/EEU, International"
                          : consultantData?.isAcceptedHome == false &&
                            consultantData?.isAcceptedEU_UK == false &&
                            consultantData?.isAcceptedInternational == true
                          ? "International"
                          : consultantData?.isAcceptedHome == true &&
                            consultantData?.isAcceptedEU_UK == false &&
                            consultantData?.isAcceptedInternational == true
                          ? "Home/UK, International"
                          : "EU/EEU"}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Branch
                      </td>

                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.branchName}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Account Status
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.accountStatus?.statusName}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Registration Date
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.createdOn}
                      </td>
                    </tr>

                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        Have Right To Work
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.haveRightToWork == true ? "Yes" : "No"}
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
                        Phone Number
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {consultantData?.phoneNumber}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      <td
                        style={{
                          borderRight: "1px solid #dee2e6",
                          paddingLeft: "8px",
                        }}
                      >
                        House No
                      </td>
                      <td style={{ paddingLeft: "8px" }}>
                        {contactInfo?.houseNo}
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
                        {contactInfo?.addressLine}
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
                        {contactInfo?.country?.name}
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
                        {contactInfo?.city}
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
                        {contactInfo?.state}
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
                        {contactInfo?.zipCode}
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
                        {emergencyInfo?.personName}
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
                        {emergencyInfo?.relationship}
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
                        {emergencyInfo?.addressLine} <br />
                        {emergencyInfo?.city} <br />
                        {emergencyInfo?.state}
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
                        {emergencyInfo?.phoneNumber}
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
                        {emergencyInfo?.emailAddress}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/*Emergency Contact information */}

              {/*Bank Details information */}
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
                        Bank Details Information
                      </p>
                    </td>
                  </thead>
                </Table>
                {consultantData?.bankDetails?.map((data, i) => (
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
                          Account Name
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {data?.accountName}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Account Number
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {data?.accountNumber}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Bank Address
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {data?.bankAddress}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Bank Name
                        </td>
                        <td style={{ paddingLeft: "8px" }}>{data?.bankName}</td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          BIC
                        </td>
                        <td style={{ paddingLeft: "8px" }}>{data?.bic}</td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Sort Code
                        </td>
                        <td style={{ paddingLeft: "8px" }}>{data?.sortCode}</td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Swift
                        </td>
                        <td style={{ paddingLeft: "8px" }}>{data?.swift}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
              </div>

              {/*Current Commission Group information */}
              <div style={{ marginBottom: "40px" }}>
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
                        Current Commission Group
                        {priceRangeList.length > 0 ? (
                          <>: {priceRangeList[0]?.commissionGroup?.name}</>
                        ) : null}
                      </p>
                    </td>
                  </thead>
                </Table>
                <Table style={{ marginBottom: "2 rem" }}>
                  <thead style={{ backgroundColor: "#dfeeee " }}>
                    <tr style={{ border: "1px solid #dee2e6" }}>
                      {/* <th>Sl/No</th> */}
                      <th>Price Range</th>
                      <th>Range From</th>
                      <th>Range To</th>
                      <th>Commission Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRangeList?.map((range, i) => (
                      <tr
                        key={range.id}
                        style={{
                          textAlign: "center",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        {/* <th scope="row">{1 + i}</th> */}

                        <td
                          style={{
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          {range?.priceRangeName}
                        </td>

                        <td
                          style={{
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          {range?.rangeFrom}
                        </td>

                        <td
                          style={{
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          {range?.rangeTo}
                        </td>

                        <td
                          style={{
                            paddingLeft: "8px",
                            width: "50%",
                          }}
                        >
                          {range?.commissionAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/*Current Commission Group information */}

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
                        style={{ marginLeft: "-26px" }}
                        dangerouslySetInnerHTML={createMarkup(
                          currentUserDetails?.details
                        )}
                      ></div>
                      <div className="mt-4">
                        {" "}
                        <h5>
                          SIGNATURE:{" "}
                          <span className="signature-student">
                            {consData?.firstName} {consData?.lastName}
                          </span>
                        </h5>
                        <h5>
                          NAME OF THE EMPLOYEE:{" "}
                          <span style={{ fontSize: "14px" }}>
                            {consData?.firstName} {consData?.lastName}{" "}
                          </span>
                        </h5>
                        <h5>
                          Date:{" "}
                          <span style={{ fontSize: "14px" }}>
                            {formatDate(consentData?.consentSignTime)}
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
      </Card>
    </div>
  );
};

export default Consent;
