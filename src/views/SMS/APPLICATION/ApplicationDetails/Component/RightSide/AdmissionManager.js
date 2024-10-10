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

const AdmissionManager = ({
  applicationInfo,
  uniId,
  id,
  managerId,
  setSuccess,
  success,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [modalOpen, setModalOpen] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [admissionManagerDD, setAdmissionManagerDD] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [managerError, setManagerError] = useState(false);

  const managerOptions = admissionManagerDD?.map((adm) => ({
    label: adm?.name,
    value: adm?.id,
  }));

  const handleChange = (uId) => {
    setModalOpen(true);
    get(`AdmissionManagerDD/University/${uId}`).then((res) => {
      setAdmissionManagerDD(res);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
  };

  const selectManager = (label, value) => {
    setManagerLabel(label);

    if (value === managerId) {
      setManagerValue(null);
    } else {
      setManagerValue(value);
    }
    setManagerError(false);
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();

    if (managerValue === 0) {
      setManagerError(true);
    } else {
      setProgress1(true);
      put(
        `ApplicationAdmissionManager/ChangeAdmissionManager/${id}/${managerValue}`
      ).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          setModalOpen(false);
          setSuccess(!success);
          setProgress1(false);
          setManagerLabel("Select Admission Manager");
          setManagerValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setProgress1(false);
        }
      });
    }
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <div className="d-flex justify-content-between">
          <div>
            {" "}
            <Row>
              <Col md="3">
                <div className="user-profile-pic">
                  {applicationInfo?.admissionManager?.admissionManagerMedia ===
                  null ? (
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
                        applicationInfo?.admissionManager?.admissionManagerMedia
                          ?.thumbnailUrl
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
                    <h5>Admission Manager</h5>
                    <div>
                      {permissions?.includes(
                        permissionList.Change_Admission_Manger
                      ) ? (
                        <>
                          {applicationInfo.applicationStatusId !== 13 &&
                          (userType === userTypes?.SystemAdmin ||
                            userType === userTypes?.Admin ||
                            userType === userTypes?.ProviderAdmin) ? (
                            <p
                              className="text-blue text-underline pointer "
                              onClick={() => handleChange(uniId)}
                            >
                              <i
                                class="far fa-edit"
                                style={{ color: "#619bff", cursor: "pointer" }}
                              ></i>
                            </p>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <p>
                    {" "}
                    {applicationInfo?.admissionManager?.firstName}{" "}
                    {applicationInfo?.admissionManager?.lastName}
                  </p>
                  <ul className="uapp-ul">
                    <li>
                      {" "}
                      <i className="far fa-envelope pr-1 pb-2"></i>{" "}
                      {applicationInfo?.admissionManager?.email}
                    </li>
                    {applicationInfo?.admissionManager?.phoneNumber ===
                    null ? null : (
                      <li>
                        {" "}
                        <i className="fas fa-phone pr-1"></i>{" "}
                        {applicationInfo?.admissionManager?.phoneNumber}
                      </li>
                    )}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          {/* <div>
            {permissions?.includes(permissionList.Change_Admission_Manger) ? (
              <>
                {applicationInfo.applicationStatusId !== 13 &&
                (userType === userTypes?.SystemAdmin ||
                  userType === userTypes?.Admin ||
                  userType === userTypes?.ProviderAdmin) ? (
                  <p
                    className="text-blue text-underline pointer "
                    onClick={() => handleChange(uniId)}
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
      </div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Change Admission Manager</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitChange}>
            <FormGroup row>
              <Col md="4">
                <span>
                  Admission Manager <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="8">
                <Select
                  options={managerOptions}
                  value={{
                    label: managerLabel,
                    value: managerValue,
                  }}
                  onChange={(opt) => selectManager(opt.label, opt.value)}
                  name="id"
                  id="id"
                  // isDisabled={univerTypeId !== undefined ? true : false}
                />

                {managerError ? (
                  <span className="text-danger">
                    Admission Manager is required
                  </span>
                ) : null}

                {managerValue == null ? (
                  <span className="text-danger">
                    Can not change to same admission manager
                  </span>
                ) : null}
              </Col>
            </FormGroup>

            <FormGroup>
              <CancelButton cancel={closeModal} />
              <SaveButton
                text="Submit"
                progress={progress1}
                buttonStatus={managerValue == null ? true : false}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AdmissionManager;
