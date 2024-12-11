import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Upload } from "antd";
import * as Icon from "react-feather";
import uapploader from "../../../../../assets/img/profile-img.png";
import profileCover from "../../../../../assets/img/profile-cover.png";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import editbtn from "../../../../../assets/img/editbtn.png";
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
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import put from "../../../../../helpers/put";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import roundimg from "../../../../../assets/img/roundimg.svg";
import Loader from "../../../Search/Loader/Loader";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import ImageUploadCrop from "../../../../../components/ImageUpload/ImageUploadCrop";
import { AdminUsers } from "../../../../../components/core/User";
import Filter from "../../../../../components/Dropdown/Filter";
import { consultantTier } from "../../../../../constants/presetData";
import post from "../../../../../helpers/post";

const ProfileHeadCard = ({ id, status = false }) => {
  const userType = localStorage.getItem("userType");
  const [headData, setHeadData] = useState({});
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

  const [tierLabel, setTierLabel] = useState("Select Tier");
  const [tierValue, setTierValue] = useState(0);

  console.log(id);
  useEffect(() => {
    if (id !== undefined) {
      get(`ConsultantProfile/ProfileHead/${id}`).then((res) => {
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
        setTierValue(res?.tireStatusValue);
        setTierLabel(res?.tireStatus);
      });

      get(`AccountStatusDD/index/${id}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    } else {
      get(`ConsultantProfile/ProfileHead/${userId}`).then((res) => {
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
      });

      get(`AccountStatusDD/index/${userId}`).then((res) => {
        setStatusType(res);
        setLoading(false);
      });
    }
  }, [success, id, userId]);

  console.log(headData);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);

    const accountStatusData = {
      id: parseInt(id),
      accountStatusId: value,
    };

    put("Consultant/statuschange", accountStatusData).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const handleTier = (e) => {
    console.log(e);
    const accountStatusData = {
      id: parseInt(id),
      tireStatus: e,
    };
    put("consultant/change-tire-status", accountStatusData).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
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
    console.log("croppedImage", croppedImage);

    // const subData = new FormData(event.target);
    // subData.append("consultantCoverImage", FileList[0]?.originFileObj);

    const subData = {
      id: id ? id : userId,
      consultantCoverImage: croppedImage,
    };

    // if (FileList.length < 1) {
    //   setError(true);
    // } else {
    setProgress(true);
    setButtonStatus(true);
    put(`Consultant/UpdateCoverPhoto`, subData).then((res) => {
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

    subData.append("consultantProfileImage", FileList1[0]?.originFileObj);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      put(`Consultant/UpdateProfilePhoto`, subData).then((res) => {
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
  console.log(headData);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card>
            <div className="uapp-employee-cover-image">
              <div
                className="bg-image-profile"
                style={{
                  backgroundImage: `url(${
                    headData?.consultantCoverImageMedia
                      ? rootUrl + headData?.consultantCoverImageMedia?.fileUrl
                      : profileCover
                  })`,
                }}
              >
                <div className="uplode-cover-image">
                  {permissions?.includes(permissionList.Edit_Consultant) ? (
                    <span onClick={updateCoverPhoto}>
                      {" "}
                      <i
                        className="fas fa-camera"
                        style={{ cursor: "pointer" }}
                      >
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
            {/* <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader>Update Cover Photo</ModalHeader>

              <ModalBody>
                <form onSubmit={handleSubmitCoverPhoto}>
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={id ? id : userId}
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
            {/* cover photo edit modal ends here */}
            <CardBody>
              <div className="uapp-employee-profile-image-edit">
                <Row>
                  <Col>
                    <div className="uapp-employee-profile-image">
                      <div className="text-left">
                        <div className="profile-pic">
                          {headData?.consultantProfileImageMedia == null ? (
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
                                headData?.consultantProfileImageMedia?.fileUrl
                              }
                              alt="img-desc"
                            />
                          )}

                          {permissions?.includes(
                            permissionList.Edit_Consultant
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
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={id ? id : userId}
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

                              <span className="text-danger d-block">
                                {text1}
                              </span>

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
                  <Col md="7">
                    <ul className="uapp-ul text-left">
                      <li className="d-flex">
                        <div>
                          <h4 className="">{headData?.fullName}</h4>
                          <h5 className="">{headData?.designation}</h5>
                          <p>
                            {headData?.viewId} |{" "}
                            <i
                              className="fas fa-star"
                              style={{ color: "#FFB33E" }}
                            ></i>
                            {headData?.rating}
                          </p>

                          <>
                            {headData?.email === null ? null : (
                              <p>
                                <i class="far fa-envelope pr-2"></i>
                                {headData?.email}
                              </p>
                            )}

                            {headData?.phoneNumber === null ? null : (
                              <p>
                                <i className="fas fa-phone pr-2"></i>
                                {headData?.phoneNumber}
                              </p>
                            )}
                            {headData?.linkTypeId === null ? null : (
                              <p>
                                <a
                                  href={headData?.linkedIn_Facebook}
                                  target="blank"
                                >
                                  {headData?.linkTypeId === 1 && (
                                    <>
                                      <i class="fab fa-linkedin-in pr-2"></i>
                                      Linkedin
                                    </>
                                  )}
                                  {headData?.linkTypeId === 2 && (
                                    <>
                                      <i class="fab fa-facebook-f pr-2"></i>
                                      Facebook
                                    </>
                                  )}
                                  {/* {headData?.linkedIn_Facebook} */}
                                </a>
                              </p>
                            )}
                          </>
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
                              permissionList.Edit_Consultant
                            ) ? (
                              <Link
                                to={
                                  id === undefined
                                    ? `/consultantInformation/${userId}`
                                    : `/consultantInformation/${id}`
                                }
                              >
                                <img
                                  src={editbtn}
                                  alt=""
                                  className="img-fluid"
                                />
                              </Link>
                            ) : null}
                          </div>

                          {/* <div className="ml-1">
                            <Link
                              to={
                                id === undefined
                                  ? `/consultantDetails/${userId}`
                                  : `/consultantDetails/${id}`
                              }
                            >
                              <img
                                src={roundimg}
                                alt=""
                                className="img-fluid"
                              />
                            </Link>
                          </div> */}
                        </div>
                      </li>
                      <li></li>
                    </ul>
                    {!status && (
                      <div className="d-flex">
                        <Link
                          to={
                            userType !== userTypes?.Consultant.toString()
                              ? `/applicationsFromConsultant/${id}`
                              : `/applications/${userId}`
                          }
                        >
                          <button className="consultant-profile-redesign-style px-2 py-2">
                            Applications
                          </button>
                        </Link>

                        <Link
                          to={
                            userType !== userTypes?.Consultant.toString()
                              ? `/studentByConsultant/${id}`
                              : `/studentList/${userId}`
                          }
                          style={{ marginLeft: "23px" }}
                        >
                          <button className="consultant-profile-redesign-style px-2 py-2">
                            Students
                          </button>
                        </Link>

                        <Link
                          to={
                            userType !== userTypes?.Consultant.toString()
                              ? `/associates/${id}`
                              : `/associateList/${userId}`
                          }
                          style={{ marginLeft: "23px" }}
                        >
                          <button className="consultant-profile-redesign-style px-2 py-2">
                            Associates
                          </button>
                        </Link>
                      </div>
                    )}
                  </Col>

                  <Col md="5" className="text-md-right mt-3">
                    <span>UAPP Registration Date</span>
                    <br />
                    <span className="text-gray">{headData?.createdOn}</span>
                    <br />
                    {/* <span>{headData?.branchName}</span> */}
                    <p className="text-gray">{headData?.consultantTypeName}</p>

                    <ul className="uapp-ul text-md-right">
                      {permissions?.includes(
                        permissionList?.Change_Consultant_AccountStatus
                      ) ? (
                        <div className="d-flex justify-content-md-end mb-2">
                          <Select
                            className="w-50"
                            options={statusTypeMenu}
                            value={{
                              label: statusLabel,
                              value: statusValue,
                            }}
                            onChange={(opt) =>
                              selectStatusType(opt.label, opt.value)
                            }
                            name="consultantTypeId"
                            id="consultantTypeId"
                          />
                        </div>
                      ) : (
                        statusLabel
                      )}
                      <div className="d-flex justify-content-md-end mb-2">
                        {permissions?.includes(
                          permissionList.Change_Consultant_TireStatus
                        ) ? (
                          <Filter
                            className="w-50"
                            data={consultantTier}
                            label={tierLabel}
                            setLabel={setTierLabel}
                            value={tierValue}
                            setValue={setTierValue}
                            onChange={(l, v) => handleTier(v)}
                          />
                        ) : (
                          <span>{tierLabel !== "No Tier" && tierLabel}</span>
                        )}
                      </div>
                    </ul>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfileHeadCard;
