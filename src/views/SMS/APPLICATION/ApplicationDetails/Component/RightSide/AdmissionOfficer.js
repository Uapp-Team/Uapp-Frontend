import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import {
  Col,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";
import { rootUrl } from "../../../../../../constants/constants";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import put from "../../../../../../helpers/put";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AdmissionOfficer = ({
  applicationInfo,
  uniId,
  id,
  officerId,
  setSuccess,
  success,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [modalOpen1, setModalOpen1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [officerDD, setOfficerDD] = useState([]);
  const [officerLabel, setOfficerLabel] = useState("Select Admission Officer");
  const [officerValue, setOfficerValue] = useState(0);
  const [officerError, setOfficerError] = useState(false);

  const handleChange1 = (uId) => {
    setModalOpen1(true);
    get(`AdmissionOfficerDD/University/${uId}`).then((res) => {
      setOfficerDD(res);
    });
  };

  const closeModal1 = () => {
    setModalOpen1(false);
    setOfficerLabel("Select Admission Officer");
    setOfficerValue(0);
  };

  const officerOptions = officerDD?.map((ado) => ({
    label: ado?.name,
    value: ado?.id,
  }));

  const selectOfficer = (label, value) => {
    setOfficerLabel(label);

    if (value === officerId) {
      setOfficerValue(null);
    } else {
      setOfficerValue(value);
    }
    setOfficerError(false);
  };

  const handleSubmitChange1 = (e) => {
    e.preventDefault();

    if (officerValue === 0) {
      setOfficerError(true);
    } else {
      setProgress2(true);
      put(
        `ApplicationAdmissionOfficer/ChangeAdmissionOfficer/${id}/${officerValue}`
      ).then((res) => {
        // setButtonStatus(false);
        // setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setModalOpen1(false);
          setSuccess(!success);
          setProgress2(false);
          setOfficerLabel("Select Admission Officer");
          setOfficerValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setProgress2(false);
        }
      });
    }
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-3 ">
        {applicationInfo?.admissionOfficer === null ? (
          <>
            <h5>Admission Officer is not assigned here.</h5>
            <FormGroup className="mt-4">
              {userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin ||
              userType === userTypes?.ProviderAdmin ? (
                <SaveButton text="Assign" action={() => handleChange1(uniId)} />
              ) : null}
            </FormGroup>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                <Row>
                  <Col md="3">
                    <div className="user-profile-pic">
                      {applicationInfo?.admissionOfficer
                        ?.admissionOfficerMedia === null ? (
                        <img
                          src={profileImage}
                          alt="profile_img"
                          // style={{
                          //   width: "150px",
                          //   height: "150px",
                          //   borderRadius: "7px",
                          // }}
                        />
                      ) : (
                        <img
                          src={
                            rootUrl +
                            applicationInfo?.admissionOfficer
                              ?.admissionOfficerMedia?.thumbnailUrl
                          }
                          alt="profile_img"
                          // style={{
                          //   width: "150px",
                          //   height: "150px",
                          //   borderRadius: "7px",
                          // }}
                        />
                      )}
                    </div>
                  </Col>
                  <Col md="9">
                    <div>
                      <div className="d-flex justify-content-between">
                        <h5>Admission Officer</h5>
                        <div>
                          {permissions?.includes(
                            permissionList.Change_Admission_Officer
                          ) ? (
                            <>
                              {applicationInfo?.applicationSubStatusId !== 38 &&
                              (userType === userTypes?.SystemAdmin ||
                                userType === userTypes?.Admin ||
                                userType === userTypes?.ProviderAdmin) ? (
                                <p
                                  className="text-blue text-underline pointer "
                                  onClick={() => handleChange1(uniId)}
                                >
                                  <i
                                    class="far fa-edit"
                                    style={{
                                      color: "#619bff",
                                      cursor: "pointer",
                                    }}
                                  ></i>
                                </p>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>

                      <p>
                        {" "}
                        {applicationInfo?.admissionOfficer?.firstName}{" "}
                        {applicationInfo?.admissionOfficer?.lastName}
                      </p>
                      <ul className="uapp-ul">
                        <li>
                          {" "}
                          <i className="far fa-envelope pr-1 pb-2"></i>{" "}
                          {applicationInfo?.admissionOfficer?.email}
                        </li>
                        {applicationInfo?.admissionOfficer?.phoneNumber ===
                        null ? null : (
                          <li>
                            {" "}
                            <i className="fas fa-phone pr-1"></i>{" "}
                            {applicationInfo?.admissionOfficer?.phoneNumber}
                          </li>
                        )}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
              {/* <div>
                {permissions?.includes(
                  permissionList.Change_Admission_Officer
                ) ? (
                  <>
                    {applicationInfo?.applicationSubStatusId !== 38 &&
                    (userType === userTypes?.SystemAdmin ||
                      userType === userTypes?.Admin ||
                      userType === userTypes?.ProviderAdmin) ? (
                      <p
                        className="text-blue text-underline pointer "
                        onClick={() => handleChange1(uniId)}
                      >
                        <i
                          class="far fa-edit"
                          style={{ color: "#619bff", cursor: "pointer" }}
                        ></i>
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div> */}
            </div>
          </>
        )}
      </div>
      <Modal isOpen={modalOpen1} toggle={closeModal1} className="uapp-modal">
        <ModalHeader>Change Admission Officer</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitChange1}>
            <FormGroup row>
              <Col md="4">
                <span>
                  Admission Officer <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="8">
                <Select
                  options={officerOptions}
                  value={{
                    label: officerLabel,
                    value: officerValue,
                  }}
                  onChange={(opt) => selectOfficer(opt.label, opt.value)}
                  name="id"
                  id="id"
                  // isDisabled={univerTypeId !== undefined ? true : false}
                />

                {officerError ? (
                  <span className="text-danger">
                    Admission Officer is required
                  </span>
                ) : null}

                {officerValue == null ? (
                  <span className="text-danger">
                    Can not change to same admission officer
                  </span>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup>
              <CancelButton cancel={closeModal1} />
              <SaveButton
                text="Submit"
                progress={progress2}
                buttonStatus={officerValue == null ? true : false}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AdmissionOfficer;
