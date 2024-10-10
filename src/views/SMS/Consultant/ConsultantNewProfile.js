import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import uapploader from "../../../assets/img/Uapp_fav.png";
import uapploader2 from "../../../assets/img/Asset 12Icon.svg";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import editbtn from "../../../assets/img/editbtn.png";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import roundimg from "../../../assets/img/roundimg.svg";

import { useHistory, useLocation } from "react-router";
// import coverImage from '../../../../assets/img/profile/user-uploads/cover.jpg'
// import profileImage from '../../../../assets/img/profile/user-uploads/user-07.jpg'
import coverImage from "../../../assets/img/profile/user-uploads/cover.jpg";
import profileImage from "../../../assets/img/profile/user-uploads/user-07.jpg";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import put from "../../../helpers/put";
import EditDivButton from "../Components/EditDivButton";
import LinkButton from "../Components/LinkButton";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import Loader from "../Search/Loader/Loader";
import ConsultantRatingList from "./ConsultantRatingList";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { dateFormate } from "../../../components/date/calenderFormate";

const ConsultantNewProfile = () => {
  const location = useLocation();
  const history = useHistory();
  const id = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});
  const [registrationDate, setRegistrationDate] = useState("");

  const [serialNum, setSerialNum] = useState(1);

  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);

  const [success, setSuccess] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);
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

  useEffect(() => {
    get(`Consultant/Profile/${id}`).then((res) => {
      setConsultantData(res);
      setStatusLabel(res?.accountStatus?.statusName);
      setStatusValue(res?.accountStatus?.id);

      var datee = res?.createdOn;
      var utcDate = new Date(datee);
      var localeDte = utcDate.toLocaleString("en-CA");
      var localeDte2 = localeDte.split(",")[0];
      var localeDte3 = localeDte2.replace("/", "-");

      setRegistrationDate(localeDte3.replace("/", "-"));
      setLoading(false);
    });

    get(`AccountStatusDD/index/${id}`).then((res) => {
      setStatusType(res);
      setLoading(false);
    });
  }, [success, id]);

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

  // redirect to dashboard
  const backToConsultantList = () => {
    history.push("/consultantList");
  };

  const handleUpdateBankDetailsFromProfile = () => {
    history.push(`/consultantBankDetails/${id}`);
  };

  const handleUpdateConsultantProfile = () => {
    history.push(`/consultantInformation/${id}`);
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const redirectToApplications = (consultantId) => {
    history.push({
      pathname: `/applicationsFromConsultant/${consultantId}`,
      consultantIdFromConsultantList: consultantId,
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

    const subData = new FormData(event.target);

    subData.append("consultantCoverImage", FileList[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList.length < 1) {
      setError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      put(`Consultant/UpdateCoverPhoto`, subData).then((res) => {
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
    }
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

    subData.append("consultantProfileImage", FileList1[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      put(`Consultant/UpdateProfilePhoto`, subData).then((res) => {
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

  const redirectToApplicationTransaction = () => {
    history.push(`/applicationTransactionFromConsultant/${id}`);
  };

  // on Close Modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const closeViewModal1 = () => {
    setViewModalOpen1(false);
  };

  const closeViewModal2 = () => {
    setViewModalOpen2(false);
  };

  const redirectToParentConsultantProfile = () => {
    history.push(`/consultantProfile/${consultantData?.parentConsultantId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <BreadCrumb
            title="Consultant Profile"
            backTo={
              !(userTypeId === userTypes?.Consultant) ? "Consultant" : null
            }
            path={
              !(userTypeId === userTypes?.Consultant) ? `/consultantList` : null
            }
          />

          <div className="uapp-employee-profile">
            <Row>
              <Col md="8">
                <div className="uapp-employee-profile-left">
                  <Card>
                    <div className="uapp-employee-cover-image">
                      <div
                        className="bg-image-profile"
                        style={{
                          backgroundImage: `url(${
                            consultantData?.consultantCoverImageMedia
                              ? rootUrl +
                                consultantData?.consultantCoverImageMedia
                                  ?.fileUrl
                              : uapploader2
                          })`,
                        }}
                      >
                        {/* {
                        (consultantData?.consultantCoverImageMedia == null) ?
                        <img
                        src={uapploader2}
                        alt="cover_img"
                      />
                      :
                      <img
                      src={
                        rootUrl +
                        consultantData?.consultantCoverImageMedia?.fileUrl
                      }
                      alt="cover_img"
                    />
                       } */}
                        <div className="uplode-cover-image">
                          {permissions?.includes(
                            permissionList.Edit_Consultant
                          ) ? (
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

                    {/* cover photo edit modal starts here */}
                    <Modal
                      isOpen={modalOpen}
                      toggle={closeModal}
                      className="uapp-modal"
                    >
                      <ModalHeader>Update Cover Photo</ModalHeader>

                      <ModalBody>
                        <form onSubmit={handleSubmitCoverPhoto}>
                          <input type="hidden" name="id" id="id" value={id} />

                          {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col className="ml-5" md="4">
                              <span>
                                Cover Photo{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <div className="row d-flex">
                                {/* {consultantData?.consultantCoverImageMedia !== null ? (
                                <div className="col-md-6">
                                  <Image
                                    width={104}
                                    height={104}
                                    src={
                                      rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                                    }
                                  />
                                </div>
                              ) : null} */}

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

                                    <span className="text-danger d-block">
                                      {text}
                                    </span>

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
                    </Modal>
                    {/* cover photo edit modal ends here */}
                    <CardBody>
                      <div className="uapp-employee-profile-image-edit">
                        <Row>
                          <Col>
                            <div className="uapp-employee-profile-image">
                              <div className="text-left">
                                <div className="profile-pic">
                                  {consultantData?.consultantProfileImageMedia ==
                                  null ? (
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
                                        consultantData
                                          ?.consultantProfileImageMedia?.fileUrl
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
                            <input type="hidden" name="id" id="id" value={id} />

                            {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

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
                                  {/* {consultantData?.consultantCoverImageMedia !== null ? (
                                     <div className="col-md-6">
                                       <Image
                                         width={104}
                                         height={104}
                                         src={
                                           rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
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
                                <h4>
                                  {consultantData?.nameTitle?.name}{" "}
                                  {consultantData?.firstName}{" "}
                                  {consultantData?.lastName} (
                                  {consultantData?.viewId})
                                </h4>

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
                                      <Link to={`/consultantInformation/${id}`}>
                                        <img
                                          src={editbtn}
                                          className="img-fluid"
                                        />
                                      </Link>
                                    ) : null}
                                  </div>

                                  <div className="ml-1">
                                    <Link to={`/consultantDetails/${id}`}>
                                      <img
                                        src={roundimg}
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </li>

                              <li></li>
                            </ul>
                            <br />
                            <br />
                            <br />
                            <br />

                            <div className="d-flex">
                              <Link
                                to={`/applicationsFromConsultant/${id}`}
                                style={{ marginLeft: "23px" }}
                              >
                                <button className="consultant-profile-redesign-style px-2 py-2">
                                  Applications
                                </button>
                              </Link>

                              <Link
                                to={`/studentListByConsultant/${id}`}
                                style={{ marginLeft: "23px" }}
                              >
                                <button className="consultant-profile-redesign-style px-2 py-2">
                                  Students
                                </button>
                              </Link>

                              <Link
                                to={`/consultantDetails/${id}`}
                                style={{ marginLeft: "23px" }}
                              >
                                <button className="consultant-profile-redesign-style px-2 py-2">
                                  Associates
                                </button>
                              </Link>
                            </div>
                          </Col>

                          <Col md="5" className="mt-4">
                            <div className="text-right">
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

                            <div className="text-right mb-2">
                              <span
                                style={{
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  color: "#d4d4d4",
                                }}
                              >
                                {dateFormate(consultantData?.createdOn)}
                              </span>
                            </div>
                            <ul className="uapp-ul text-right">
                              {permissions?.includes(
                                permissionList?.Change_Status_Consultant
                              ) ? (
                                <>
                                  {!(userTypeId == userTypes?.Consultant) ? (
                                    <div className="d-flex justify-content-end mb-2">
                                      <Select
                                        className=" w-50"
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
                                  ) : null}
                                </>
                              ) : null}

                              <li>
                                <span> Email : {consultantData?.email}</span>
                              </li>

                              <li>
                                <span>
                                  {" "}
                                  Phone Number : {consultantData?.phoneNumber}
                                </span>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>

                  <ConsultantRatingList id={id} />
                </div>
              </Col>

              <Col md="4">
                {consultantData?.parentConsultantId === null ? null : (
                  <Card className="uapp-employee-profile-right1">
                    <div
                      style={{
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      }}
                      className="uapp-profile-CardHeader"
                    >
                      <div className="uapp-circle-image margin-top-minus">
                        {consultantData?.parentConsultant
                          ?.consultantProfileImageMedia == null ? (
                          <img src={profileImage} alt="profile_img" />
                        ) : (
                          <img
                            src={
                              rootUrl +
                              consultantData?.parentConsultant
                                ?.consultantProfileImageMedia?.fileUrl
                            }
                            alt="profile_img"
                          />
                        )}
                      </div>

                      <h5>
                        {userTypeId == userTypes?.SystemAdmin ||
                        userTypeId == userTypes?.Admin ? (
                          <span
                            onClick={redirectToParentConsultantProfile}
                            style={{ cursor: "pointer" }}
                          >
                            {consultantData?.parentConsultant?.nameTitle?.name}{" "}
                            {consultantData?.parentConsultant?.firstName}{" "}
                            {consultantData?.parentConsultant?.lastName}{" "}
                          </span>
                        ) : (
                          <span>
                            {consultantData?.parentConsultant?.nameTitle?.name}{" "}
                            {consultantData?.parentConsultant?.firstName}{" "}
                            {consultantData?.parentConsultant?.lastName}{" "}
                          </span>
                        )}
                      </h5>
                      {userTypeId == userTypes?.Consultant ? null : (
                        <p>
                          {" "}
                          {
                            consultantData?.parentConsultant?.consultantType
                              ?.name
                          }{" "}
                        </p>
                      )}
                    </div>
                    <CardBody>
                      <div>
                        <ul className="uapp-ul text-center">
                          {userTypeId == userTypes?.SystemAdmin ||
                          userTypeId == userTypes?.Admin ? (
                            <li>
                              {" "}
                              {
                                consultantData?.parentConsultant?.accountStatus
                                  ?.statusName
                              }{" "}
                            </li>
                          ) : null}
                          <li>
                            {" "}
                            <b>
                              {consultantData?.parentConsultant?.branch?.name}
                            </b>{" "}
                          </li>
                          <li>
                            {" "}
                            <i className="far fa-envelope"></i>{" "}
                            {consultantData?.parentConsultant?.email}{" "}
                          </li>
                          {consultantData?.parentConsultant?.phoneNumber ==
                          null ? null : (
                            <li>
                              {" "}
                              <i className="fas fa-phone"></i>{" "}
                              {consultantData?.parentConsultant?.phoneNumber}{" "}
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Important Links Card */}

                {/* <Card>
                <CardBody>
                <div className="hedding-titel mb-3">
                  <h5>
                    {" "}
                    <span style={{fontSize: '16px', fontWeight: '600', color: '#707070'}}>Important Links</span>{" "}
                  </h5>
                  <div className="bg-h"></div>
                </div>

                  
  
                  <div className="d-flex flex-wrap">

                  {permissions?.includes(
                      permissionList.View_Application_transaction_List
                    ) ? (
                   
                      <Link to={`/applicationTransactionFromConsultant/${id}`}>
                         <button className="consultant-profile-redesign-style2 px-4 py-2 mr-1"> Transactions</button>
                      </Link>
                   


                    ) : null}



                    {permissions?.includes(
                      permissionList.View_Student_list
                    ) ? (
                     

                      <Link to={`/studentListByConsultant/${id}`}>
                      <button className="consultant-profile-redesign-style2 px-4 py-2 ml-1">Students</button>
                      </Link>
                    ) : null}
  
                   
  
                    {permissions?.includes(
                      permissionList.View_Application_List
                    ) ? (
                      <ButtonForFunction
                        func={() => redirectToApplications(id)}
                        className={"btn btn-uapp-add "}
                        name={"Applications"}
                        permission={6}
                      />
                    ) : null}

                  
                    
                  </div>
                </CardBody>
              </Card> */}

                <Card>
                  <CardBody>
                    <div className="hedding-titel mb-3">
                      <h5>
                        {" "}
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#707070",
                          }}
                        >
                          Rating Breakdown
                        </span>{" "}
                      </h5>
                      <div className="bg-h"></div>
                    </div>

                    <div>
                      <span
                        style={{
                          color: "#878A99",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        Recommend to a friend {"      "} {}
                      </span>
                    </div>
                  </CardBody>
                </Card>

                {userTypeId == userTypes?.Consultant ? (
                  <Card className="p-3">
                    <div className="hedding-titel mb-1">
                      <h5>
                        {" "}
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#707070",
                          }}
                        >
                          Notice
                        </span>{" "}
                      </h5>
                      <div className="bg-h"></div>
                    </div>

                    <div className="mt-3 ">
                      <div className="notice-titel">
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "14px",
                            color: "495057",
                          }}
                        >
                          {" "}
                          Super Admin
                        </span>
                        <span> 10/12/2021</span>
                      </div>
                      <div className="notice-description">
                        <span>
                          {" "}
                          No Qualifications required !! University of Suffolk
                          London & Manchester Campus, Oct 2021 Intake.{" "}
                        </span>
                        <div className="uapp-read-more-btn">
                          <a className="" href="javascript:void(0)">
                            {" "}
                            Read More{" "}
                            <span>
                              {" "}
                              <i className="fas fa-long-arrow-alt-right"></i>{" "}
                            </span>{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : null}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultantNewProfile;
