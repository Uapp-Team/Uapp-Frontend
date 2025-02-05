import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import editbtn from "../../../../../../../../assets/img/editbtn.png";
import uapploader from "../../../../../../../../assets/img/profile-img.png";
import roundimg from "../../../../../../../../assets/img/roundimg.svg";
import { permissionList } from "../../../../../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../../../../../constants/constants";
import { userTypes } from "../../../../../../../../constants/userTypeConstant";
import get from "../../../../../../../../helpers/get";
import put from "../../../../../../../../helpers/put";
import ButtonLoader from "../../../../../../Components/ButtonLoader";
// import profileCover from "../../../../../assets/img/profile-cover.png";
import profileCover from "../../../../../../../../assets/img/profile-cover.png";
import ImageUploadCrop from "../../../../../../../../components/ImageUpload/ImageUploadCrop";

const ProfileHead = ({ admissionManagerId, setHeadData, headData }) => {
  const [success, setSuccess] = useState(false);

  const userId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (admissionManagerId !== undefined) {
      get(`AddmissionManagerProfile/Head/${admissionManagerId}`).then((res) => {
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
      });

      get(`AccountStatusDD/Manager/${admissionManagerId}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    } else {
      get(`AddmissionManagerProfile/Head/${userId}`).then((res) => {
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
      });

      get(`AccountStatusDD/Manager/${userId}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    }
  }, [success, admissionManagerId, setHeadData, userId]);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);

    const accountStatusData = {
      ManagerId: parseInt(admissionManagerId),
      StatusId: value,
    };
    put("AdmissionManager/UpdateAccountStatusChange", accountStatusData).then(
      (res) => {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      }
    );
  };

  const updateCoverPhoto = () => {
    setModalOpen(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setFileList([]);
    setError(false);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
    setError1(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setText("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setText("");
      setError(false);
      setButtonStatus(false);
    }
  };

  const handleSubmitCoverPhoto = (event) => {
    event.preventDefault();
    // const subData = new FormData(event.target);
    // subData.append("coverImage", FileList[0]?.originFileObj);

    const subData = {
      id: admissionManagerId ? admissionManagerId : userId,
      coverImage: croppedImage,
    };
    // if (FileList.length < 1) {
    //   setError(true);
    // } else {
    setProgress(true);
    setButtonStatus(true);
    put(`AdmissionManager/UpdateCoverPhoto`, subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFileList([]);
        setModalOpen(false);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
    // }
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

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("profileImage", FileList1[0]?.originFileObj);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      put(`AdmissionManager/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
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
    <Card>
      <div className="uapp-employee-cover-image">
        <div
          className="bg-image-profile"
          style={{
            backgroundImage: `url(${
              headData?.admissionManagerCoverImageMedia
                ? rootUrl +
                  headData?.admissionManagerCoverImageMedia?.thumbnailUrl
                : profileCover
            })`,
          }}
        >
          {/* {headData?.admissionManagerCoverImageMedia == null ? (
            <img src={profileCover} alt="cover_img" />
          ) : (
            <img
              src={
                rootUrl +
                headData?.admissionManagerCoverImageMedia?.thumbnailUrl
              }
              alt="cover_img"
            />
          )} */}
          {permissions?.includes(permissionList.Update_AdmissionManager) ? (
            <div className="uplode-cover-image">
              <span onClick={updateCoverPhoto}>
                {" "}
                <i className="fas fa-camera" style={{ cursor: "pointer" }}>
                  {" "}
                </i>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <ImageUploadCrop
        modalOpen={modalOpen}
        closeModal={closeModal}
        heading="Update Cover Photo"
        onSubmit={handleSubmitCoverPhoto}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        error={error}
        errorText="Cover photo is required"
        progress={progress}
        buttonStatus={buttonStatus}
      />
      {/* cover photo edit modal starts here */}
      {/* <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Update Cover Photo</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitCoverPhoto}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={admissionManagerId ? admissionManagerId : userId}
            />
            <FormGroup row className="has-icon-left position-relative">
              <Col className="ml-5" md="4">
                <span>
                  Cover Photo <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row d-flex">
                  <div className="col-md-6">
                    <>
                      <Upload
                        listType="picture-card"
                        multiple={false}
                        fileList={FileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        {FileList.length < 1 ? (
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Image Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                      <span className="text-danger d-block">{text}</span>
                      {error && (
                        <span className="text-danger">
                          Cover photo is required
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
                    onClick={closeModal}
                    className="mr-1 mt-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ml-1 mt-3"
                    color="primary"
                    disabled={buttonStatus}
                  >
                    {progress ? <ButtonLoader /> : "Update"}
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </form>
        </ModalBody>
      </Modal> */}
      {/* cover photo edit modal ends here */}
      <CardBody>
        <div className="uapp-employee-profile-image-edit px-2">
          <Row>
            <Col>
              <div className="uapp-employee-profile-image">
                <div className="text-left">
                  <div className="profile-pic">
                    {headData?.admissionManagerProfileImageMedia == null ? (
                      <img
                        className="empProfileImg bg-white"
                        src={uapploader}
                        alt="img-desc"
                      />
                    ) : (
                      <img
                        className="empProfileImg"
                        src={
                          rootUrl +
                          headData?.admissionManagerProfileImageMedia
                            ?.thumbnailUrl
                        }
                        alt="img-desc"
                      />
                    )}

                    {permissions?.includes(
                      permissionList.Update_AdmissionManager
                    ) ? (
                      <div class="edit">
                        <span onClick={updateProfilePic}>
                          <i
                            className="fas fa-camera"
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                          </i>
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* profile photo edit modal starts here */}
        <Modal isOpen={modalOpen2} toggle={closeModal1} className="uapp-modal">
          <ModalHeader>Update Profile Photo</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitProfilePhoto}>
              <input
                type="hidden"
                name="id"
                id="id"
                value={admissionManagerId ? admissionManagerId : userId}
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
        {/* profile photo edit modal ends here */}

        <div className="uapp-employee-profile-generalInfo px-2">
          <Row className="mb-4">
            <Col md="7">
              <ul className="uapp-ul text-left">
                <li className="d-flex">
                  <div>
                    <h4>
                      {headData?.nameTitle?.name} {headData?.firstName}{" "}
                      {headData?.lastName}
                    </h4>
                    <p>{headData?.viewId}</p>

                    {headData?.email === null ? null : (
                      <p>
                        <i class="far fa-envelope pr-2"></i>
                        {headData?.email}
                      </p>
                    )}

                    {headData?.phoneNumber === null ? null : (
                      <p>
                        <i className="fas fa-phone pr-2"></i>
                        {headData?.phoneNumber &&
                        headData?.phoneNumber.includes("+")
                          ? headData?.phoneNumber
                          : headData?.phoneNumber &&
                            !headData?.phoneNumber.includes("+")
                          ? "+" + headData?.phoneNumber
                          : null}
                      </p>
                    )}

                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#707070",
                      }}
                    >
                      {headData?.branchName}
                    </span>
                    <br />

                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#A2A2A2",
                      }}
                    >
                      {headData?.consultantTypeName}
                    </span>
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      left: "10px",
                      top: "2px",
                      display: "flex",
                    }}
                  >
                    <div className="mr-1">
                      {permissions?.includes(
                        permissionList.Update_AdmissionManager
                      ) ? (
                        <Link
                          to={
                            admissionManagerId == undefined
                              ? `/admissionManagerGeneralInformation/${userId}`
                              : `/admissionManagerGeneralInformation/${admissionManagerId}`
                          }
                        >
                          <img src={editbtn} className="img-fluid" alt="" />
                        </Link>
                      ) : null}
                    </div>
                    {userTypeId !== userTypes?.AdmissionManager.toString() && (
                      <div className="ml-1">
                        <Link
                          to={`/admissionManagerDetails/${admissionManagerId}`}
                        >
                          <img src={roundimg} className="img-fluid" alt="" />
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                <li></li>
              </ul>

              <div className="d-flex">
                {userTypeId !== userTypes?.AdmissionManager && (
                  <Link
                    to={`/assignUniversity/${headData?.providerId}/${headData?.id}`}
                  >
                    <button className="consultant-profile-redesign-style px-3 py-2">
                      Universities
                    </button>
                  </Link>
                )}
                <Link
                  to={
                    admissionManagerId !== undefined
                      ? `/ApplicationListByAdmissionmanager/${admissionManagerId}`
                      : `/ApplicationListByAdmissionmanager/${userId}`
                  }
                >
                  <button
                    style={{ marginLeft: "23px" }}
                    className="consultant-profile-redesign-style px-3 py-2"
                  >
                    Applications
                  </button>
                </Link>
                <Link
                  to={
                    admissionManagerId !== undefined
                      ? `/admissionOfficerListFromAdmissionManagerList/${headData?.providerId}/${admissionManagerId}`
                      : `/admissionOfficerListFromAdmissionManagerList/${headData?.providerId}/${userId}`
                  }
                >
                  <button
                    style={{ marginLeft: "23px" }}
                    className="consultant-profile-redesign-style px-3 py-2"
                  >
                    Officers
                  </button>
                </Link>
              </div>
            </Col>

            <Col md="5" className="mt-4">
              <div className="text-md-right">
                <span
                  style={{
                    color: "#6B6B6B",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "5px",
                    marginLeft: "10px",
                  }}
                >
                  UAPP Registration Date
                </span>
              </div>

              <div className="text-md-right mb-2">
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#d4d4d4",
                  }}
                >
                  {headData?.createdOn}
                </span>
              </div>
              <ul className="uapp-ul text-right">
                {permissions?.includes(
                  permissionList?.AdmissionManager_Account_Status
                ) ? (
                  <>
                    {userTypeId === userTypes?.SystemAdmin.toString() ||
                    userTypeId === userTypes?.ProviderAdmin.toString() ? (
                      <div className="d-flex justify-content-md-end mb-2">
                        <Select
                          className=" w-50"
                          options={statusTypeMenu}
                          value={{ label: statusLabel, value: statusValue }}
                          onChange={(opt) =>
                            selectStatusType(opt.label, opt.value)
                          }
                          name="consultantTypeId"
                          id="consultantTypeId"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}
              </ul>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileHead;
