import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import put from "../../../../../../helpers/put";
import ButtonLoader from "../../../../Components/ButtonLoader";
import AdmissionManagerNav from "../NavigationAndRegister/AdmissionManagerNav";
import icon_warning from "../../../../../../assets/img/icons/icon_warning.png";
import icon_success from "../../../../../../assets/img/icons/icons_success.png";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";

const Index = () => {
  const userType = localStorage.getItem("userType");

  const { admissionManagerId } = useParams();
  const activetab = "7";
  const history = useHistory();
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [conscentData, setConscentData] = useState({});
  const userTypeId = localStorage.getItem("userType");
  const [apiInfo, setAPiInfo] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(`AdmissionManagerConsent/Get/${admissionManagerId}`).then((res) => {
      setConscentData(res);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data);
      });
  }, [success, admissionManagerId]);

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("admissionManagerId", admissionManagerId);
    subData.append("IpAddress", apiInfo?.IPv4);
    setProgress(true);
    post("AdmissionManagerConsent/Sign", subData).then((res) => {
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
    put(`AdmissionManagerConsent/SendEmail/${admissionManagerId}`).then(
      (res) => {
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
      }
    );
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toString([], options);
  }

  const goBackward = () => {
    history.push(`/admissionManagersOfficerInformation/${admissionManagerId}`);
  };

  const goToProfile = () => {
    history.push(`/admissionManagerProfile/${admissionManagerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Terms and Conditions"
        backTo={
          userType === userTypes?.AdmissionManager ? null : "Admission Manager"
        }
        path={`/admissionManagerList`}
      />
      <AdmissionManagerNav
        activetab={activetab}
        admissionManagerId={admissionManagerId}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
              <div className="text-center d-sm-w75">
                <h3>TERMS & CONDITIONS</h3>
                <p>
                  Please read consultant terms & Conditions here{" "}
                  <a href="https://smsheg.co.uk/privacypolicy.">
                    https://smsheg.co.uk/privacypolicy.
                  </a>
                  <br />
                  You will not be able to apply without accepting the terms &
                  conditions
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-5 mb-1">
              <div className="d-sm-w75">
                {conscentData == null || conscentData?.isDeclared === false ? (
                  <div className="text-center">
                    <p className="text-warning">
                      Terms and conditions is not signed yet
                    </p>
                  </div>
                ) : conscentData?.isDeclared === true ? (
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
                      <span>From IP:{conscentData?.deviceIp}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="d-flex justify-content-center mb-5">
              <div
                className="text-center d-sm-w75 bg-terms p-5"
                style={{ borderRadius: "12px" }}
              >
                {userTypeId === userTypes?.SystemAdmin.toString() ||
                userTypeId === userTypes?.Admin.toString() ||
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
                        <p>Send Email to Admission Manager</p>
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
                        <button className="btn btn-warning">
                          <span className="fas fa-download"> </span>{" "}
                          <span> Download pdf</span>
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : userTypeId === userTypes?.AdmissionManager.toString() ? (
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
                      <button className="btn btn-warning">
                        <span className="fas fa-download"> </span>{" "}
                        <span> Download pdf</span>
                      </button>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <PreviousButton action={goBackward} />
            <SaveButton text="Go to profile" action={goToProfile} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Index;
