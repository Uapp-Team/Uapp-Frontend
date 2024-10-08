import React, { createRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../constants/constants";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";
import ButtonLoader from "../../Components/ButtonLoader";
import bulb from "../../../../assets/img/bulb.png";
import user from "../../../../assets/img/Uapp_fav.png";
import branch from "../../../../assets/img/branch.jpg";

const ComplianceOfficerNewProfile = () => {
  const [managerData, setManagerData] = useState({});
  const [applicationData, setApplicationData] = useState([]);
  const [admissionOfficer, setAdmissionOfficer] = useState([]);
  const complianceOfficerId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [success, setSuccess] = useState(false);

  const { addToast } = useToasts();

  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`ComplianceOfficer/Get/${complianceOfficerId}`).then((res) => {
      setManagerData(res);
      setApplicationData(res?.admissionManagerApplications);
      setAdmissionOfficer(res?.admissionOfficers);

      setLoading(false);
    });
  }, [success]);

  // Trial start

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
    setError1(false);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    // setFileList(fileList);

    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setText1("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList1(fileList);
      setText1("");
      setError1(false);
      setButtonStatus1(false);
    }
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("profileImage", FileList1[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setButtonStatus1(true);
      setProgress(true);
      put(`ComplianceOfficer/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList1([]);
          setModalOpen2(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <div className="row">
        {permissions?.includes(permissionList.Update_Employee) ? (
          <Modal
            isOpen={modalOpen2}
            toggle={closeModal1}
            className="uapp-modal"
          >
            <ModalHeader>Update Profile Photo</ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmitProfilePhoto}>
                <input
                  type="hidden"
                  name="id"
                  id="id"
                  value={complianceOfficerId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col className="ml-5" md="4">
                    <span>
                      Profile Photo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row d-flex">
                      <div className="col-md-6">
                        <>
                          <Upload
                            listType="picture-card"
                            multiple={false}
                            fileList={FileList1}
                            onPreview={handlePreview1}
                            onChange={handleChange1}
                            beforeUpload={(file) => {
                              return false;
                            }}
                          >
                            {FileList1.length < 1 ? (
                              <div
                                className="text-danger"
                                style={{ marginTop: 8 }}
                              >
                                <Icon.Upload />
                                <br />
                                <span>Upload Image Here</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </Upload>
                          <Modal
                            visible={previewVisible1}
                            title={previewTitle1}
                            footer={null}
                            onCancel={handleCancel1}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage1}
                            />
                          </Modal>

                          <span className="text-danger d-block">{text1}</span>

                          {error1 && (
                            <span className="text-danger">
                              Profile photo is required
                            </span>
                          )}
                        </>
                      </div>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <div className="d-flex justify-content-end">
                      <Button
                        color="danger"
                        onClick={closeModal1}
                        className="mr-1 mt-3"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="ml-1 mt-3"
                        color="primary"
                        disabled={buttonStatus1}
                      >
                        {progress ? <ButtonLoader /> : "Update"}
                      </Button>
                    </div>
                  </Col>
                </FormGroup>
              </form>
            </ModalBody>
          </Modal>
        ) : null}

        <div className="col-md-9 col-sm-12">
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-6 col-sm-12 left-adm-div">
                  <div className="adm-user-img">
                    {managerData?.complianceOfficerMedia?.thumbnailUrl ==
                    null ? (
                      <img src={user} alt="admission_manager_media" />
                    ) : (
                      <img
                        src={
                          rootUrl +
                          managerData?.complianceOfficerMedia?.thumbnailUrl
                        }
                        alt="compliance_officer_media"
                      />
                    )}

                    {permissions?.includes(
                      permissionList.Update_Employee
                    ) ? (
                      <span className="edit1-adm" onClick={updateProfilePic}>
                        <i
                          className="fas fa-camera"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                        </i>
                      </span>
                    ) : null}
                  </div>

                  <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                    <p className="adm-user-title">
                      {managerData?.nameTittleName} {managerData?.firstName} {}{" "}
                      {managerData?.lastName}{" "}
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 right-adm-div">
                  <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                    <div className="mb-1">
                      <span className="adm-provider-css-name2">
                        {managerData?.email}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="adm-provider-css-name2">
                        {managerData?.phoneNumber}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="adm-provider-css">
                        {managerData?.state?.name}
                      </span>
                    </div>
                  </div>

                  <div className="adm-user-img2">
                    <img src={bulb} alt="admission_manager_media" />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-3 col-sm-0">
          {managerData?.branch?.id === null ? null : (
            <Card className="uapp-employee-profile-right1">
              <div
                style={{
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
                className="uapp-profile-CardHeader"
              >
                <div className="uapp-circle-image margin-top-minus">
                  <img src={branch} />
                </div>

                <h5 className="pb-2">
                  <span>
                    {managerData?.branch?.name} <br />
                    {managerData?.branch?.branchCode} <br />
                    {managerData?.branch?.email}{" "}
                  </span>
                </h5>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    <li>
                      {" "}
                      <b>{managerData?.branch?.phoneNumber}</b>{" "}
                    </li>
                    <li>
                      {" "}
                      <i className="far fa-envelope"></i>{" "}
                      {managerData?.branch?.addressLine}{" "}
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceOfficerNewProfile;
