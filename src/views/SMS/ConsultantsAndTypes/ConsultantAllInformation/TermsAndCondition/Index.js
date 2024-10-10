import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Button, Table } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ButtonLoader from "../../../Components/ButtonLoader";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
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

const ConsultantTermsInformation = () => {
  const activetab = "9";
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [conscentData, setConscentData] = useState({});
  const { consultantRegisterId } = useParams();
  const userTypeId = localStorage.getItem("userType");
  const [apiInfo, setAPiInfo] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [navVisibility, setNavVisibility] = useState({});
  const userType = localStorage.getItem("userType");
  ///////////////////////
  const componentRef = useRef();
  const [consultantData, setConsultantData] = useState({});
  console.log(consultantData, "consultantData");
  const [contactInfo, setContactInfo] = useState({});
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [emergencyInfo, setEmergencyInfo] = useState({});
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [consData, setConsData] = useState({});
  const [check, setCheck] = useState(false);
  /////////////////////////

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    userType === userTypes?.SystemAdmin
      ? get(
          `UserTermsAndConditions/Get/${userTypes?.Consultant}/${consultantRegisterId}`
        ).then((res) => {
          setLoading(false);
          setCurrentUserDetails(res);
          console.log(res, "sakib");
        })
      : get(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
          setLoading(false);
          setCurrentUserDetails(res);
          console.log(res, "sakib 1");
        });
  }, [consultantRegisterId, userType]);

  useEffect(() => {
    get(`Consultant/GetGeneralInformation/${consultantRegisterId}`).then(
      (res) => {
        setConsData(res);
      }
    );
  }, [consultantRegisterId]);

  useEffect(() => {
    get(`Consultant/Profile/${consultantRegisterId}`).then((res) => {
      setConsultantData(res);
      console.log(res?.branch?.name, "res");
      setContactInfo(res?.consultantContact);
    });

    get(`GroupPriceRange/ByConsultant/${consultantRegisterId}`).then((res) => {
      setPriceRangeList(res);
    });
  }, [consultantRegisterId]);

  useEffect(() => {
    get(`ConsultantEmergency/GetByConsultant/${consultantRegisterId}`).then(
      (action) => {
        setEmergencyInfo(action);
        console.log(action, "emergency");
      }
    );
  }, [consultantRegisterId]);

  useEffect(() => {
    get(`ConsultantConscent/Get/${consultantRegisterId}`).then((res) => {
      console.log(res);
      setConscentData(res);
    });

    get(`ConsultantNavBar/Get/${consultantRegisterId}`).then((res) => {
      setNavVisibility(res);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data);
      });
  }, [consultantRegisterId, success]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("ConsultantId", consultantRegisterId);
    subData.append("IpAddress", apiInfo?.IPv4);
    setProgress(true);
    post("ConsultantConscent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
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

  const sendEmail = () => {
    setButtonStatus(true);
    setProgress(true);
    put(`ConsultantConscent/SendEmail/${consultantRegisterId}`).then((res) => {
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

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  return (
    <>
      <BreadCrumb
        title="Terms and Conditions"
        backTo={userType === userTypes?.Consultant ? null : "Consultant"}
        path={`/consultantList`}
      />
      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />

      <Card>
        <CardBody>
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
              <div className="text-center d-sm-w75">
                <h3>TERMS & CONDITIONS</h3>
                <p>
                  Please read consultant terms & Conditions{" "}
                  <span style={{ fontSize: "16px" }}>
                    <Link
                      to={`/consultant-declaration/${consultantRegisterId}`}
                    >
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

            <div className="d-flex justify-content-center mt-5 mb-1">
              <div className="d-sm-w75">
                {conscentData == null || conscentData?.isSigned === false ? (
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
                        {conscentData?.consentSignStatusId !== 3 &&
                          formatDate(conscentData?.consentSignTime)}
                      </span>
                    </div>
                    <div>
                      <span>
                        From IP:
                        {conscentData?.consentSignStatusId !== 3 &&
                          conscentData?.deviceIp}
                      </span>
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
                userTypeId === userTypes?.BranchManager.toString() ||
                userTypeId === userTypes?.ComplianceManager.toString() ? (
                  <>
                    {conscentData === null ||
                    conscentData?.consentSignStatusId === 1 ? (
                      <div className="mb-1 text-center">
                        <div className="d-flex justify-content-center">
                          <img src={icon_warning} height="35" alt="" />
                        </div>
                        <h5 className="my-2">
                          Terms and Conditions has not signed yet
                        </h5>
                        <p>Send Email to Consultant</p>
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
                      </div>
                    ) : null}
                  </>
                ) : userTypeId === userTypes?.Consultant.toString() ? (
                  conscentData === null || conscentData?.isSigned === false ? (
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
                          />
                          <span style={{ fontSize: "12px" }}>
                            {" "}
                            I have reviewed all the T&Cs thoroughly and I
                            understand them clearly.
                          </span>
                        </div>
                      </div>

                      <Button
                        color="primary"
                        onClick={handleTerms}
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
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
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
                    {consultantData?.firstName}
                  </span>
                  {consultantData?.lastName}
                </span>
              </div>
              <div>
                <span>
                  {" "}
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
                        ? "Home, EU/UK, International"
                        : consultantData?.isAcceptedHome == true &&
                          consultantData?.isAcceptedEU_UK == true &&
                          consultantData?.isAcceptedInternational == false
                        ? "Home, EU/UK"
                        : consultantData?.isAcceptedHome == true &&
                          consultantData?.isAcceptedEU_UK == false &&
                          consultantData?.isAcceptedInternational == false
                        ? "Home"
                        : consultantData?.isAcceptedHome == false &&
                          consultantData?.isAcceptedEU_UK == true &&
                          consultantData?.isAcceptedInternational == true
                        ? "EU/UK, International"
                        : consultantData?.isAcceptedHome == false &&
                          consultantData?.isAcceptedEU_UK == false &&
                          consultantData?.isAcceptedInternational == true
                        ? "International"
                        : consultantData?.isAcceptedHome == true &&
                          consultantData?.isAcceptedEU_UK == false &&
                          consultantData?.isAcceptedInternational == true
                        ? "Home, International"
                        : "EU/UK"}
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
                      {consultantData?.parentConsultant?.branch?.name}
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
                      {consultantData?.haveRightToWork == null ? "No" : "Yes"}
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
                    <td style={{ paddingLeft: "8px" }}>{contactInfo?.city}</td>
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
                    <td style={{ paddingLeft: "8px" }}>{contactInfo?.state}</td>
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
                      {/* <td scope="row">{1 + i}</td> */}

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
                          {consData?.firstName} {consData?.lastName}
                        </span>
                      </h5>
                      <h5>
                        NAME OF THE EMPLOYEE: :{" "}
                        <span style={{ fontSize: "14px" }}>
                          {consData?.firstName} {consData?.lastName}{" "}
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
    </>
  );
};

export default ConsultantTermsInformation;
