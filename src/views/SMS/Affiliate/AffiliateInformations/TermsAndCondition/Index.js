import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Button, Table } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ButtonLoader from "../../../Components/ButtonLoader";
import Navigation from "../NavigationAndRegistration/Navigation";
import put from "../../../../../helpers/put";
import { userTypes } from "../../../../../constants/userTypeConstant";
import icon_warning from "../../../../../assets/img/icons/icon_warning.png";
import icon_success from "../../../../../assets/img/icons/icons_success.png";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import ReactToPrint from "react-to-print";
import logoLg from "../../../../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import DOMPurify from "dompurify";
import Uget from "../../../../../helpers/Uget";

const ConsultantTermsInformation = () => {
  const activetab = "7";
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [conscentDataStatus, setConscentDataStatus] = useState(null);
  const [conscentSummary, setConscentSummaryData] = useState(null);
  const [conscentGet, setConscentGet] = useState(null);
  const { affiliateId } = useParams();
  const userTypeId = localStorage.getItem("userType");
  const [apiInfo, setAPiInfo] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [navVisibility, setNavVisibility] = useState({});
  const userType = localStorage.getItem("userType");
  ///////////////////////
  const componentRef = useRef();

  const [contactInfo, setContactInfo] = useState({});
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [emergencyInfo, setEmergencyInfo] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [consData, setConsData] = useState({});
  const [affiliateProfileData, setAffiliateProfileData] = useState({});

  /////////////////////////

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  // useEffect(() => {
  //   userType === userTypes?.SystemAdmin
  //     ? Uget(
  //         `UserTermsAndConditions/Get/${userTypes?.Consultant}/${affiliateId}`
  //       ).then((res) => {
  //         setLoading(false);
  //         setCurrentUserDetails(res);
  //         console.log(res, "sakib");
  //       })
  //     : Uget(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
  //         setLoading(false);
  //         setCurrentUserDetails(res);
  //         console.log(res, "sakib 1");
  //       });
  // }, [affiliateId, userType]);

  // useEffect(() => {
  //   get(`Consultant/GetGeneralInformation/${affiliateId}`).then((res) => {
  //     setConsData(res);
  //     console.log(res, "declaration");
  //   });
  // }, [affiliateId]);

  // useEffect(() => {
  //   get(`Consultant/Profile/${affiliateId}`).then((res) => {
  //     setAffiliateProfileData?.data(res);
  //     console.log(res?.branch?.name, "res");
  //     setContactInfo(res?.consultantContact);
  //   });

  //   get(`GroupPriceRange/ByConsultant/${affiliateId}`).then((res) => {
  //     setPriceRangeList(res);
  //   });
  // }, [affiliateId]);

  // useEffect(() => {
  //   get(`ConsultantEmergency/GetByConsultant/${affiliateId}`).then((action) => {
  //     setEmergencyInfo(action);
  //     console.log(action, "emergency");
  //   });
  // }, [affiliateId]);

  useEffect(() => {
    Uget(`Affiliate/get-by/${affiliateId}`).then((res) => {
      setAffiliateProfileData(res);
    });
  }, [affiliateId]);

  useEffect(() => {
    Uget(`AffiliateConsent/check-signed-status/${affiliateId}`).then((res) => {
      setConscentDataStatus(res);
    });
    Uget(`AffiliateConsent/get-summery/${affiliateId}`).then((res) => {
      setConscentSummaryData(res);
    });

    Uget(`AffiliateConsent/get-by/${affiliateId}`).then((res) => {
      setConscentGet(res);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data);
      });
  }, [affiliateId, success]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("affiliateId", affiliateId);
    subData.append("deviceIp", apiInfo?.IPv4);
    setProgress(true);
    post("AffiliateConsent/save", subData).then((res) => {
      setProgress(false);
      if (res?.data?.statusCode === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.title, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.title, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const sendEmail = () => {
    setButtonStatus(true);
    setProgress(true);
    // put(`ConsultantConscent/SendEmail/${affiliateId}`).then((res) => {
    //   setProgress(false);
    //   setButtonStatus(false);
    //   if (res?.status === 200 && res?.data?.isSuccess === true) {
    //     addToast("Email Sending is in Process", {
    //       appearance: "success",
    //       autoDismiss: true,
    //     });
    //     setSuccess(!success);
    //   } else {
    //     addToast(res?.data?.message, {
    //       appearance: "error",
    //       autoDismiss: true,
    //     });
    //   }
    // });
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <div>
      <Navigation
        title="Terms and Conditions"
        activetab="7"
        affiliateId={affiliateId}
        success={success}
      />

      <Card>
        <CardBody>
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
              <div className="text-center d-sm-w75">
                <h3>TERMS & CONDITIONS</h3>
                <p>
                  Please read consultant terms & Conditions here{" "}
                  <span style={{ fontSize: "16px" }}>
                    <Link to={`/affiliate-declaration/${affiliateId}`}>
                      here
                    </Link>
                  </span>
                  {/* <a href="https://smsheg.co.uk/privacypolicy.">
                    https://smsheg.co.uk/privacypolicy.
                  </a> */}
                  <br />
                  {/* You will not be able to apply without accepting the terms &
                  conditions */}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-1">
              <div className="d-sm-w75">
                {conscentDataStatus?.data == null ||
                conscentDataStatus?.data === false ? (
                  <div className="text-center">
                    <p className="text-warning">
                      Terms and conditions is not signed yet
                    </p>
                  </div>
                ) : (
                  <div
                    className="d-flex justify-content-between"
                    style={{ color: "#252525", opacity: ".7" }}
                  >
                    <div>
                      <span>
                        Signed on:{" "}
                        {formatDate(conscentGet?.data?.consentSignTime)}
                      </span>
                    </div>
                    <div>
                      <span>From IP:{conscentGet?.data?.deviceIp}</span>
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
                userTypeId === userTypes?.Admin.toString() ? (
                  <>
                    {conscentGet?.data === null ||
                    conscentGet?.data?.consentSignStatusId === 1 ? (
                      <div className="mb-1 text-center">
                        <div className="d-flex justify-content-center">
                          <img src={icon_warning} height="35" alt="" />
                        </div>
                        <h5 className="my-2">
                          Terms and Conditions has not signed yet
                        </h5>
                        <p>Send Email to Affiliate</p>
                        <Button
                          color="primary"
                          onClick={sendEmail}
                          disabled={buttonStatus}
                        >
                          {progress ? <ButtonLoader /> : "Send Email"}
                        </Button>
                      </div>
                    ) : conscentGet?.data !== null &&
                      conscentGet?.data?.consentSignStatusId === 2 ? (
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
                    ) : conscentGet?.data !== null &&
                      conscentGet?.data?.consentSignStatusId === 3 ? (
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
                      </div>
                    ) : null}
                  </>
                ) : userTypeId === userTypes?.Affiliate.toString() ? (
                  conscentDataStatus === null ||
                  conscentDataStatus?.data === false ? (
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
                      <Button color="primary" onClick={handleTerms}>
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
                        {affiliateProfileData?.data?.fullName}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span>
                      {" "}
                      Date of Birth :{" "}
                      {dateFormate(affiliateProfileData?.data?.dateOfBirth)}
                    </span>
                  </div>

                  <div>
                    <span>
                      Document ID : {affiliateProfileData?.data?.viewId}
                    </span>
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
                          {affiliateProfileData?.data?.fullName}{" "}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Passport ID
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {affiliateProfileData?.data?.passportId}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #dee2e6" }}>
                        <td
                          style={{
                            borderRight: "1px solid #dee2e6",
                            paddingLeft: "8px",
                          }}
                        >
                          Phone Number
                        </td>
                        <td style={{ paddingLeft: "8px" }}>
                          {affiliateProfileData?.data?.phoneNumber}
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
                          {affiliateProfileData?.data?.genderName}
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
                          {affiliateProfileData?.data?.maritalStatusName}
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
                          {affiliateProfileData?.data?.phoneNumber}
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
                          {affiliateProfileData?.data?.address?.addressLine1}
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
                          {affiliateProfileData?.data?.address?.addressLine2}
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
                          {affiliateProfileData?.data?.address?.country}
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
                          {affiliateProfileData?.data?.address?.city}
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
                          {affiliateProfileData?.data?.address?.stateCountry}
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
                          {affiliateProfileData?.data?.address?.zipPostCode}
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
                          {affiliateProfileData?.data?.contact?.personName}
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
                          {affiliateProfileData?.data?.contact?.relationship}
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
                          {affiliateProfileData?.data?.contact?.addressLine}
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
                          {affiliateProfileData?.data?.contact?.phoneNumber}
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
                          {affiliateProfileData?.data?.contact?.email}
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
                  {affiliateProfileData?.data?.bankDetails?.map((data, i) => (
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
                          <td style={{ paddingLeft: "8px" }}>
                            {data?.bankName}
                          </td>
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
                          <td style={{ paddingLeft: "8px" }}>
                            {data?.sortCode}
                          </td>
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

                {/*Terms and condition information */}
                <div style={{ marginBottom: "40px" }}>
                  {conscentSummary?.data?.termsAndConditions !==
                    "<p><br></p>" &&
                    conscentSummary?.data?.termsAndConditions !== "<p> </p>" &&
                    conscentSummary?.data?.termsAndConditions !==
                      "<h5><br></h5>" && (
                      <div>
                        {conscentSummary?.data?.userName && (
                          <h2 className="mb-3 ">
                            <b className="bg-u">
                              INDEX FOR UAPP{" "}
                              <span style={{ color: "#fc7300" }}>
                                {" "}
                                {conscentSummary?.data?.userName}
                              </span>{" "}
                              HANDBOOK
                            </b>
                          </h2>
                        )}

                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            currentUserDetails?.data?.termsAndConditions
                          )}
                        ></div>
                        <div className="mt-4">
                          {" "}
                          <h5>
                            SIGNATURE:{" "}
                            <span className="signature-student">
                              {affiliateProfileData?.data?.fullName}
                            </span>
                          </h5>
                          <h5>
                            NAME OF THE EMPLOYEE: :{" "}
                            <span style={{ fontSize: "14px" }}>
                              {affiliateProfileData?.data?.fullName}
                            </span>
                          </h5>
                          <h5>
                            Date:{" "}
                            <span style={{ fontSize: "14px" }}>
                              {affiliateProfileData?.data?.startedDate}
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

export default ConsultantTermsInformation;
