import { Upload } from "antd";
import React, { useEffect, useState } from "react";
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
import * as Icon from "react-feather";
import ToggleSwitch2 from "../../../Components/ToggleSwitch2";
import ButtonLoader from "../../../Components/ButtonLoader";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
// import { rootUrl } from "../../../../../constants/constants";
import profileCover from "../../../../../assets/img/profile-cover.png";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import put from "../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import user1 from "../../../../../assets/img/user-1.svg";
import user2 from "../../../../../assets/img/user-2.svg";
import user3 from "../../../../../assets/img/user-3.svg";
import { Link } from "react-router-dom";
import editbtn from "../../../../../assets/img/editbtn.png";
import { userTypes } from "../../../../../constants/userTypeConstant";
import Loader from "../../../Search/Loader/Loader";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import ImageUploadCrop from "../../../../../components/ImageUpload/ImageUploadCrop";

export default function StudentProfileHeadComponent({ studentid }) {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const [blackList, setBlackList] = useState(null);
  const userType = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);

  const [studentDetails, setStudentDetails] = useState({});

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [text, setText] = useState("");
  const [modalOpen2, setModalOpen2] = useState(false);
  const [FileList1, setFileList1] = useState([]);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [error1, setError1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [text1, setText1] = useState("");

  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  useEffect(() => {
    get(`StudentProfile/ProfileHead/${studentid}`).then((res) => {
      console.log(res);
      setStudentDetails(res);
      setLoading(false);
      setBlackList(res?.blackList);
    });
  }, [studentid, success]);

  const updateCoverPhoto = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setFileList([]);
    setError(false);
  };

  const handleSubmitCoverPhoto = (event) => {
    event.preventDefault();
    // const subData = new FormData(event.target);

    // subData.append("id", studentid);
    // subData.append("coverImageFile", croppedImage);
    const subData = {
      id: studentid,
      coverImageFile: croppedImage,
    };
    // if (FileList.length < 1) {
    //   setError(true);
    // } else {
    setProgress(true);
    setButtonStatus(true);
    put(`Student/UpdateCoverPhoto`, subData).then((res) => {
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

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };
  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("profileImageFile", FileList1[0]?.originFileObj);
    setButtonStatus1(true);
    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      put(`Student/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus1(false);
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
  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handleBlacklist = (e, SId) => {
    const subData = {
      id: SId,
    };

    put(`Student/UpdateAccountStatus/${studentid}`, subData).then((res) => {
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
        setSuccess(!success);
      }
    });
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
                  studentDetails?.coverImage
                    ? rootUrl + studentDetails?.coverImage?.fileUrl
                    : profileCover
                })`,
              }}
            >
              {/* <img
                src={
                  studentDetails?.coverImage
                    ? rootUrl + studentDetails?.coverImage?.fileUrl
                    : profileCover
                }
                alt=""
              /> */}

              <div className="uplode-cover-image">
                {permissions?.includes(permissionList?.Change_CoverPhoto) ? (
                  <span onClick={updateCoverPhoto}>
                    <i
                      className="fas fa-camera"
                      style={{ cursor: "pointer" }}
                    ></i>
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

          {/* <Modal isOpen={modalOpen} toggle={closeModal}>
            <ModalHeader>Update Cover Photo</ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmitCoverPhoto}>
                <input type="hidden" name="id" id="id" value={studentid} />

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
                        {studentDetails?.profileImage === null ? (
                          <>
                            {studentDetails?.genderId === 1 ? (
                              <img
                                className="empProfileImg"
                                src={user1}
                                alt="profile_img"
                              />
                            ) : studentDetails?.genderId === 2 ? (
                              <img
                                className="empProfileImg"
                                src={user2}
                                alt="profile_img"
                              />
                            ) : (
                              <img
                                className="empProfileImg"
                                src={user3}
                                alt="profile_img"
                              />
                            )}
                          </>
                        ) : (
                          <img
                            className="empProfileImg"
                            src={
                              rootUrl + studentDetails?.profileImage?.fileUrl
                            }
                            alt="profile_img"
                          />
                        )}
                        {permissions?.includes(
                          permissionList.Change_ProfilePhoto
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

                      {/* profile photo edit modal starts here */}
                      {permissions?.includes(
                        permissionList.Change_ProfilePhoto
                      ) ? (
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
                                value={studentid}
                              />

                              <FormGroup
                                row
                                className="has-icon-left position-relative"
                              >
                                <Col className="ml-5" md="4">
                                  <span>
                                    Profile Photo{" "}
                                    <span className="text-danger">*</span>{" "}
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
                                              style={{
                                                marginTop: 8,
                                              }}
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
                                            style={{
                                              width: "100%",
                                            }}
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
                      ) : null}
                      {/* profile photo edit modal ends here */}
                    </div>
                  </div>
                </Col>

                {/* <Col>
              {permissions?.includes(permissionList.Update_Student_info) ? (
                <EditDivButton
                  className={"uapp-employee-profile-Edit"}
                  func={() => handleEditFromProfilePage(studentDetails)}
                  permission={6}
                />
              ) : null}
            </Col> */}
              </Row>
            </div>

            <div className="uapp-employee-profile-generalInfo">
              <Row>
                <Col md="7">
                  <ul className="uapp-ul text-left">
                    <li className="d-flex">
                      <div>
                        <h4>{studentDetails?.fullName}</h4>
                        <p>{studentDetails?.viewId}</p>
                        {studentDetails?.email === null ? null : (
                          <p>
                            <i class="far fa-envelope pr-2"></i>
                            {studentDetails?.email}
                          </p>
                        )}

                        {studentDetails?.phoneNumber === null ? null : (
                          <p>
                            <i className="fas fa-phone pr-2"></i>
                            {studentDetails?.phoneNumber &&
                            studentDetails?.phoneNumber.includes("+")
                              ? studentDetails?.phoneNumber
                              : studentDetails?.phoneNumber &&
                                !studentDetails?.phoneNumber.includes("+")
                              ? "+" + studentDetails?.phoneNumber
                              : null}
                          </p>
                        )}
                      </div>
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div className="ml-2">
                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <Link
                              to={`/addStudentInformation/${studentid}/${1}`}
                            >
                              <img src={editbtn} alt="" className="img-fluid" />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  </ul>
                </Col>

                <Col md="5" className="text-md-right">
                  <span>UAPP Registration Date</span>
                  <br />
                  <span className="text-gray mb-1">
                    {studentDetails?.registrationDate}
                  </span>
                  <br />
                  <br />
                  <ul className="uapp-ul text-right1">
                    {userType !== userTypes?.Student ? (
                      <div className="d-flex justify-content-end">
                        <div>
                          <span className="mr-1">Blacklist : </span>
                        </div>
                        {permissions?.includes(
                          permissionList?.Change_Student_Account_Status
                        ) ? (
                          <ToggleSwitch2
                            style={{ marginRight: "4px" }}
                            checked={
                              blackList === null
                                ? false
                                : blackList === false
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              handleBlacklist(e, studentDetails?.id);
                            }}
                          />
                        ) : null}
                      </div>
                    ) : null}
                    {/* {permissions?.includes(permissionList.Change_Status_Student) ? (
                  <>
                
                  </>
                ) : null} */}
                  </ul>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
