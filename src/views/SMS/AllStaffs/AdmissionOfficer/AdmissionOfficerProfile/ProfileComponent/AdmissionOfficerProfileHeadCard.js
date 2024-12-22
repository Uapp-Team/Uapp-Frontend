import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";

import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  Row,
} from "reactstrap";
import get from "../../../../../../helpers/get";
import put from "../../../../../../helpers/put";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import roundimg from "../../../../../../assets/img/roundimg.svg";
import editbtn from "../../../../../../assets/img/editbtn.png";
import ButtonLoader from "../../../../Components/ButtonLoader";
import { rootUrl } from "../../../../../../constants/constants";
import uapploader from "../../../../../../assets/img/profile-img.png";
import uapploader2 from "../../../../../../assets/img/profile-cover.png";
import Loader from "../../../../Search/Loader/Loader";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import ImageUploadCrop from "../../../../../../components/ImageUpload/ImageUploadCrop";

const AdmissionOfficerProfileHeadCard = ({
  id,
  userId,
  headData,
  setHeadData,
}) => {
  const [success, setSuccess] = useState(false);
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
  const [head, setHead] = useState({});
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      get(`AdmissionOfficerProfile/GetHead/${id}`).then((res) => {
        console.log("ProfileHead", res);
        setHead(res);
        setHeadData(res);
        setStatusLabel(res?.accountStatusName);
        setStatusValue(res?.accountStatusId);
      });

      get(`AccountStatusDD/Officer/${id}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    } else {
      get(`AdmissionOfficerProfile/GetHead/${userId}`).then((res) => {
        console.log(res);
        setHead(res);
        // setHeadData(res);
        setStatusLabel(res?.accountStatusName);
        setStatusValue(res?.accountStatusId);
      });

      get(`AccountStatusDD/Officer/${userId}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    }
  }, [success, id, userId, setHeadData]);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);

    const accountStatusData = {
      officerId: parseInt(id),
      statusId: value,
    };

    put(
      `AdmissionOfficerInformation/UpdateAccountStatusChange`,
      accountStatusData
    ).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
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
    // setFileList(fileList);

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
      id: id ? id : userId,
      coverImage: croppedImage,
    };

    // for(var x of subData.values()){
    //
    // }

    // if (FileList.length < 1) {
    //   setError(true);
    // } else {
    setProgress(true);
    setButtonStatus(true);
    put(`AdmissionOfficer/UpdateCoverPhoto`, subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
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

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
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
      setProgress(true);
      setButtonStatus1(true);
      put(`AdmissionOfficer/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <div className="uapp-employee-cover-image">
            <div
              className="bg-image-profile"
              style={{
                backgroundImage: `url(${
                  head?.coverImage
                    ? rootUrl + head?.coverImage?.thumbnailUrl
                    : uapploader2
                })`,
              }}
            >
              {/* {headData?.coverImage == null ? (
                <img src={uapploader2} alt="cover_img" />
              ) : (
                <img
                  src={rootUrl + headData?.coverImage?.thumbnailUrl}
                  alt="cover_img"
                />
              )} */}
              <div className="uplode-cover-image">
                {permissions?.includes(
                  permissionList.Update_AdmissionOfficer
                ) ? (
                  <span onClick={updateCoverPhoto}>
                    {" "}
                    <i className="fas fa-camera" style={{ cursor: "pointer" }}>
                      {" "}
                    </i>
                  </span>
                ) : null}
              </div>
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
                {id !== undefined ? (
                  <input type="hidden" name="id" id="id" value={id} />
                ) : (
                  <input type="hidden" name="id" id="id" value={userId} />
                )}

              

                <FormGroup row className="has-icon-left position-relative">
                  <Col className="ml-5" md="4">
                    <span>
                      Cover Photo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row d-flex">
                      {headData?.consultantCoverImageMedia !== null ? (
                                <div className="col-md-6">
                                  <Image
                                    width={104}
                                    height={104}
                                    src={
                                      rootUrl + headData?.consultantCoverImageMedia?.thumbnailUrl
                                    }
                                  />
                                </div>
                              ) : null}

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

          <CardBody>
            <div className="uapp-employee-profile-image-edit">
              <Row>
                <Col>
                  <div className="uapp-employee-profile-image">
                    <div className="text-left">
                      <div className="profile-pic">
                        {head?.profileImage == null ? (
                          <img
                            className="empProfileImg bg-white"
                            src={uapploader}
                            alt="img-desc"
                          />
                        ) : (
                          <img
                            className="empProfileImg"
                            src={rootUrl + head?.profileImage?.thumbnailUrl}
                            alt="img-desc"
                          />
                        )}

                        {permissions?.includes(
                          permissionList.Update_AdmissionOfficer
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
            <Modal
              isOpen={modalOpen2}
              toggle={closeModal1}
              className="uapp-modal"
            >
              <ModalHeader>Update Profile Photo</ModalHeader>

              <ModalBody>
                <form onSubmit={handleSubmitProfilePhoto}>
                  {id !== undefined ? (
                    <input type="hidden" name="id" id="id" value={id} />
                  ) : (
                    <input type="hidden" name="id" id="id" value={userId} />
                  )}

                  {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col className="ml-5" md="4">
                      <span>
                        Profile Photo <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <div className="row d-flex">
                        {/* {headData?.consultantCoverImageMedia !== null ? (
                                     <div className="col-md-6">
                                       <Image
                                         width={104}
                                         height={104}
                                         src={
                                           rootUrl + headData?.consultantCoverImageMedia?.thumbnailUrl
                                         }
                                       />
                                     </div>
                                   ) : null} */}

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

            <div className="uapp-employee-profile-generalInfo">
              <Row>
                <Col md="7" className="d-flex">
                  <div>
                    <h4>
                      {head?.nameTitle?.name} {head?.firstName} {head?.lastName}
                    </h4>
                    <p>{head?.viewId}</p>
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
                    {userTypeId !== userTypes?.AdmissionManager ? (
                      <div className="mr-1">
                        {permissions?.includes(
                          permissionList.Update_AdmissionOfficer
                        ) ? (
                          <Link
                            to={
                              id === undefined
                                ? `/admissionOfficerGeneralInfo/${userId}`
                                : `/admissionOfficerGeneralInfo/${id}`
                            }
                          >
                            <img src={editbtn} className="img-fluid" alt="" />
                          </Link>
                        ) : null}
                      </div>
                    ) : null}

                    {userTypeId !== userTypes?.AdmissionOfficer.toString() && (
                      <div className="ml-1">
                        <Link
                          to={
                            id === undefined
                              ? `/admissionOfficerDetailsInfo/${userId}`
                              : `/admissionOfficerDetailsInfo/${id}`
                          }
                        >
                          <img src={roundimg} className="img-fluid" alt="" />
                        </Link>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="7">
                  <ul className="uapp-ul text-left">
                    <li className="d-flex">
                      <div>
                        {userTypeId ===
                        userTypes?.AdmissionOfficer.toString() ? null : (
                          <>
                            {head?.email === null ? null : (
                              <p>
                                <i class="far fa-envelope pr-2"></i>
                                {head?.email}
                              </p>
                            )}

                            {head?.phone === null ? null : (
                              <p>
                                <i className="fas fa-phone pr-2"></i>
                                {head?.phone && head?.phone.includes("+")
                                  ? head?.phone
                                  : head?.phone && !head?.phone.includes("+")
                                  ? "+" + head?.phone
                                  : null}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  </ul>

                  <div className="d-flex">
                    {/* <Link
                      to={
                        id !== undefined
                          ? `/ApplicationListByAdmissionofficer/${id}`
                          : `/ApplicationListByAdmissionofficer/${userId}`
                      }
                    >
                      <button className="consultant-profile-redesign-style px-2 py-2">
                        Applications
                      </button>
                    </Link> */}

                    <Link
                      to={
                        id !== undefined
                          ? `/UniversityListByAdmissionofficer/${id}`
                          : `/UniversityListByAdmissionofficer/${userId}`
                      }
                      style={{ marginLeft: "23px" }}
                    >
                      <button className="consultant-profile-redesign-style px-2 py-2">
                        Universities
                      </button>
                    </Link>
                  </div>
                </Col>

                <Col md="5" className="text-md-right mt-3">
                  <span>UAPP Registration Date</span>
                  <br />
                  <span className="text-gray my-3">
                    {dateFormate(head?.uappRegistrationDate)}
                  </span>
                  <br />

                  {userTypeId === userTypes?.AdmissionManager.toString() ||
                  userTypeId === userTypes?.SystemAdmin.toString() ||
                  userTypeId === userTypes?.Admin.toString() ||
                  userTypeId === userTypes?.ProviderAdmin.toString() ||
                  userTypeId === userTypes?.AdmissionOfficer.toString() ? (
                    <ul className="uapp-ul text-right">
                      {/* {
                            permissions?.includes(permissionList?.Change_Status_Consultant) ?
                            <> */}
                      {!(
                        userTypeId === userTypes?.AdmissionOfficer.toString()
                      ) ? (
                        <div className="d-flex justify-content-md-end mb-2">
                          {permissions?.includes(
                            permissionList.AdmissionOfficer_Account_Status
                          ) ? (
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
                          ) : null}
                        </div>
                      ) : null}
                    </ul>
                  ) : null}
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default AdmissionOfficerProfileHeadCard;
