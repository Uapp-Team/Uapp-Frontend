import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import { logoutStorageHandler } from "../../../../../helpers/logoutStorageHandler";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { useHistory } from "react-router-dom";

const TandC = () => {
  const referenceId = localStorage.getItem("referenceId");
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [apiInfo, setAPiInfo] = useState("");
  const [conscent, setConscent] = useState(true);
  const [state, setstate] = useState(1);
  const [check, setCheck] = useState(false);
  const history = useHistory();
  useEffect(() => {
    get(`ConsultantConscent/Summery/${referenceId}`).then((res) => {
      console.log(res);
      setConscent(res);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data);
      });
  }, [referenceId]);
  console.log(apiInfo);
  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("ConsultantId", referenceId);
    subData.append("IpAddress", apiInfo?.IPv4);
    setProgress(true);
    post("ConsultantConscent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/consultantTermsInformation/${referenceId}`);
        window.location.reload();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <>
      {conscent?.isSigned === false && (
        <>
          <Modal isOpen={true} className="uapp-modal">
            <ModalBody style={{ padding: "30px" }}>
              {state === 1 ? (
                <>
                  <div className="text-center mb-3">
                    <i className="fas fa-exclamation-triangle text-orange fs-63px mb-2"></i>

                    <p className="text-orange fs-18px">
                      The T&Cs have been updated
                    </p>
                    <p>
                      Kindly review and accept the T&Cs by{" "}
                      <b>{conscent?.signBefore}</b>. Otherwise your account will
                      be <b>Inactive</b>
                    </p>
                  </div>
                  {/* <div className="mb-3"></div> */}
                  <div className="d-flex justify-content-between">
                    <CancelButton text="Logout" cancel={logoutStorageHandler} />
                    <SaveButton
                      text="View Terms & Conditions"
                      action={() => setstate(2)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="fs-18px fw-600">
                    Kindly read the revised Terms and Conditions
                  </p>
                  <div className="overflowY-300px py-2 mb-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: conscent?.termsAndConditions,
                      }}
                    />
                  </div>
                  <div className="my-2">
                    <div>
                      <input
                        onChange={(e) => {
                          setCheck(e.target.checked);
                        }}
                        type="checkbox"
                        name=""
                        value={check}
                        checked={check}
                      />
                      <span style={{ fontSize: "12px" }}>
                        {" "}
                        I have reviewed all the T&Cs thoroughly and I understand
                        them clearly.
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <CancelButton text="Logout" cancel={logoutStorageHandler} />

                    <SaveButton
                      text="Accept Terms & Conditions"
                      progress={progress}
                      action={() => handleTerms()}
                    />
                  </div>
                </>
              )}
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};

export default TandC;
