import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import uapploader from "../../../assets/img/Uapp_fav.png";
import uapploader2 from "../../../assets/img/Asset 12Icon.svg";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
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
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const AssociateProfile = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});
  const [registrationDate, setRegistrationDate] = useState("");

  const [serialNum, setSerialNum] = useState(1);

  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);

  const [priceRangeList, setPriceRangeList] = useState([]);
  const [commissionGroupList, setCommissionGrouplist] = useState([]);

  const [success, setSuccess] = useState(false);

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

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

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

    get(`GroupPriceRange/ByConsultant/${id}`).then((res) => {
      setPriceRangeList(res);
      setLoading(false);
    });

    get(`ConsultantCommissionGroup/Index/${id}`).then((res) => {
      setCommissionGrouplist(res);
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
    history.push("/associateList");
  };

  const handleUpdateBankDetailsFromProfile = () => {
    history.push(`/consultantBankDetails/${id}`);
  };

  const handleUpdateAssociateProfile = () => {
    history.push(`/associateInformation/${id}`);
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

  const redirectToParentConsultantProfile = () => {
    history.push(`/consultantProfile/${consultantData?.parentConsultantId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Associate Profile"
            backTo="Associates"
            path={`/associateList`}
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
                              ? consultantData?.consultantCoverImageMedia
                                  ?.fileUrl
                              : uapploader2
                          })`,
                        }}
                      >
                        {/* {consultantData?.consultantCoverImageMedia == null ? (
                            <img src={uapploader2} alt="cover_img" />
                          ) : (
                            <img
                              src={
                                rootUrl +
                                consultantData?.consultantCoverImageMedia
                                  ?.fileUrl
                              }
                              alt="cover_img"
                            />
                          )} */}
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

                          {permissions?.includes(
                            permissionList.Add_Associate
                          ) ? (
                            <Col>
                              {/* <EditDivButton
                              className={"uapp-employee-profile-Edit"}
                              func={handleUpdateAssociateProfile}
                              permission={6}
                            /> */}
                            </Col>
                          ) : null}
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
                          <Col md="6">
                            <ul className="uapp-ul text-left">
                              <li>
                                <h4>
                                  {consultantData?.nameTitle?.name}{" "}
                                  {consultantData?.firstName}{" "}
                                  {consultantData?.lastName} (
                                  {consultantData?.viewId})
                                </h4>
                              </li>

                              <li></li>
                            </ul>
                          </Col>

                          <Col md="6">
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

                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel">
                          <h5>
                            {" "}
                            <b>General Information</b>{" "}
                          </h5>
                          <div className="bg-h"></div>
                        </div>
                        <Table className="table-bordered mt-4">
                          <tbody>
                            <tr>
                              <td width="40%">
                                <b> Title:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.nameTitle?.name}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b> Name:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.firstName}{" "}
                                {consultantData?.lastName}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b> Consultant Type:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.consultantType?.name}
                              </td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Recruitment Type:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.recruitmentType?.name}
                              </td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Branch:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.branch?.name}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b> Account Status:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.accountStatus?.statusName}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b> Residency Status: </b>
                              </td>

                              <td width="60%">
                                {consultantData?.residencyStatus?.name}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b>Visa Status: </b>
                              </td>

                              <td width="60%">
                                {consultantData?.visaStatus?.name}
                              </td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b>Registration Date:</b>
                              </td>

                              <td width="60%">{registrationDate}</td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b>Have Right To Work:</b>
                              </td>

                              <td width="60%">
                                {consultantData?.haveRightToWork == null
                                  ? "No"
                                  : "Yes"}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>

                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel">
                          <h5>
                            {" "}
                            <b>Contact Information</b>{" "}
                          </h5>
                          <div className="bg-h"></div>
                        </div>

                        <Table className="table-bordered mt-4">
                          <tbody>
                            <tr>
                              <td width="40%">
                                <b> Phone Number:</b>
                              </td>

                              <td width="60%">{consultantData?.phoneNumber}</td>
                            </tr>
                            <tr>
                              <td width="40%">
                                <b>Email:</b>
                              </td>

                              <td width="60%">{consultantData?.email}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Bank Details */}
                  <div className=" info-item mt-4">
                    <Card>
                      <div className="hedding-titel d-flex justify-content-between">
                        <div>
                          <h5>
                            {" "}
                            <b>Bank Details</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                      </div>

                      {consultantData?.bankDetails?.length > 0 ? (
                        <div className="row">
                          {consultantData?.bankDetails?.map((data, i) => (
                            <div className="col-md-6 col-sm-12" key={i}>
                              <Card>
                                <CardBody className="consultant-card-shadow-style d-flex justify-content-between">
                                  <div className="p-3">
                                    <b>Account Name:</b>{" "}
                                    <span>{data?.accountName}</span>
                                    <br />
                                    <b>Account Number:</b>{" "}
                                    <span>{data?.accountNumber}</span>
                                    <br />
                                    <b>Bank Address:</b>{" "}
                                    <span>{data?.bankAddress}</span>
                                    <br />
                                    <b>Bank Name:</b>{" "}
                                    <span>{data?.bankName}</span>
                                    <br />
                                    <b>BIC:</b> <span>{data?.bic}</span>
                                    <br />
                                    <b>Sort Code:</b>{" "}
                                    <span>{data?.sortCode}</span>
                                    <br />
                                    <b>Swift:</b> <span>{data?.swift}</span>
                                  </div>
                                  {permissions?.includes(
                                    permissionList.Edit_Consultant
                                  ) ? (
                                    <div className="edit-style mt-md-3">
                                      <span>
                                        {" "}
                                        <i
                                          className="fas fa-pencil-alt pencil-style"
                                          onClick={
                                            handleUpdateBankDetailsFromProfile
                                          }
                                        ></i>{" "}
                                      </span>
                                    </div>
                                  ) : null}
                                </CardBody>
                              </Card>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="my-4">
                          There is no data available here.
                        </span>
                      )}
                    </Card>
                  </div>

                  {/* commission starts here */}

                  <div className=" info-item mt-4">
                    <Card>
                      <div className="hedding-titel d-flex justify-content-between">
                        <div>
                          <h5>
                            {" "}
                            <b>
                              Current Commission Group{" "}
                              {priceRangeList.length > 0 ? (
                                <>
                                  : {priceRangeList[0]?.commissionGroup?.name}
                                </>
                              ) : null}
                            </b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                      </div>

                      {priceRangeList.length < 1 ? (
                        <p className="mt-4">There is no data available here.</p>
                      ) : (
                        <div className="table-responsive container mt-4">
                          <Table id="table-to-xls">
                            <thead className="tablehead">
                              <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th>Price Range</th>
                                <th>Range From</th>
                                <th>Range To</th>
                                <th>Commission Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {priceRangeList?.map((range, i) => (
                                <tr
                                  key={range.id}
                                  style={{ textAlign: "center" }}
                                >
                                  <th scope="row">{1 + i}</th>

                                  <td>{range?.priceRangeName}</td>

                                  <td>{range?.rangeFrom}</td>

                                  <td>{range?.rangeTo}</td>

                                  <td>{range?.commissionAmount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* commission history starts here */}

                  {commissionGroupList.length > 1 ? (
                    <div className=" info-item mt-4">
                      <Card>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Consultant Commission Group History</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>
                        </div>

                        <span className="ml-3 mt-3">
                          <b>Assigned Commission Groups</b>
                        </span>
                        <div className="table-responsive container mt-2">
                          <Table id="table-to-xls">
                            <thead className="tablehead">
                              <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th>Name</th>
                                <th>Applications</th>
                                <th>Status</th>
                                <th>Date Range</th>
                                {/* <th>Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {commissionGroupList?.map((commission, i) => (
                                <tr
                                  key={commission?.id}
                                  style={{ textAlign: "center" }}
                                >
                                  <th scope="row">{1 + i}</th>
                                  <td>{commission?.commissionGroup?.name}</td>

                                  <td>{commission?.applicationCount}</td>

                                  <td>
                                    {commission?.isActive == false
                                      ? "Deactivated"
                                      : "Active"}
                                  </td>

                                  <td>
                                    {handleDate(commission?.createdOn)}
                                    {" to "}
                                    {handleDate(commission?.updatedOn)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                    </div>
                  ) : null}

                  {/* commission history ends here */}

                  {/* commission ends here */}

                  <div className=" info-item mt-4">
                    <Card>
                      <div className="hedding-titel">
                        <h5>
                          {" "}
                          <b>Documents</b>{" "}
                        </h5>
                        <div className="bg-h"></div>
                      </div>

                      {/* <div className="row text-center">
                      <div className="col-md-4 col-sm-12">
                        <Card className="shadow-lg">
                          <CardBody>
                            <Image
                              width={180}
                              height={104}
                              src={
                                rootUrl +
                                consultantData?.idOrPassportMedia?.fileUrl
                              }
                            />
  
                            <br />
                            <br />
  
                            <b>Id or Passport</b>
                          </CardBody>
                        </Card>
                      </div>
  
                      <div className="col-md-4 col-sm-12">
                        <Card className="shadow-lg">
                          <CardBody>
                            <Image
                              width={180}
                              height={104}
                              src={
                                rootUrl +
                                consultantData?.proofOfAddressMedia?.fileUrl
                              }
                            />
  
                            <br />
                            <br />
  
                            <b>Proof of Address</b>
                          </CardBody>
                        </Card>
                      </div>
  
                      {
                        consultantData?.proofOfRightToWorkMedia?.fileUrl !== null ?
                        <div className="col-md-4 col-sm-12">
                        <Card className="shadow-lg">
                          <CardBody>
                            <Image
                              width={180}
                              height={104}
                              src={
                                rootUrl +
                                consultantData?.proofOfRightToWorkMedia?.fileUrl
                              }
                            />
  
                            <br />
                            <br />
  
                            <b>Proof of Right to Work</b>
                          </CardBody>
                        </Card>
                      </div>
                      :
                      null
                      }
  
                    </div> */}

                      {consultantData?.idOrPassportMedia == null &&
                      consultantData?.proofOfAddressMedia == null &&
                      consultantData?.proofOfRightToWorkMedia == null ? (
                        <div className="my-4">
                          There are no documents added here.
                        </div>
                      ) : (
                        <Table className="table-bordered mt-4">
                          <tbody>
                            <tr>
                              {consultantData?.idOrPassportMedia !== null ? (
                                <>
                                  <td width="40%">
                                    <b>Id or Passport: </b>
                                  </td>

                                  <td width="60%">
                                    <div className="d-flex">
                                      <ButtonForFunction
                                        color={"success"}
                                        func={() => setViewModalOpen(true)}
                                        className={"btn mr-2"}
                                        name={"View"}
                                        permission={6}
                                      />

                                      <Button
                                        // color="primary"
                                        className="btn btn-uapp-add"
                                      >
                                        <a
                                          style={{
                                            textDecoration: "none",
                                            color: "white",
                                          }}
                                          href={
                                            rootUrl +
                                            consultantData?.idOrPassportMedia
                                              ?.fileUrl
                                          }
                                          target="_blank"
                                          // download
                                        >
                                          Download
                                        </a>
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              ) : null}
                            </tr>

                            <tr>
                              {consultantData?.proofOfAddressMedia !== null ? (
                                <>
                                  <td width="40%">
                                    <b>Proof of Address: </b>
                                  </td>

                                  <td width="60%">
                                    <div className="d-flex">
                                      <ButtonForFunction
                                        color={"success"}
                                        func={() => setViewModalOpen1(true)}
                                        className={"btn mr-2"}
                                        name={"View"}
                                        permission={6}
                                      />

                                      <Button
                                        // color="primary"
                                        className="btn btn-uapp-add"
                                      >
                                        <a
                                          style={{
                                            textDecoration: "none",
                                            color: "white",
                                          }}
                                          href={
                                            rootUrl +
                                            consultantData?.proofOfAddressMedia
                                              ?.fileUrl
                                          }
                                          target="_blank"
                                          // download
                                        >
                                          Download
                                        </a>
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              ) : null}
                            </tr>

                            <tr>
                              {consultantData?.proofOfRightToWorkMedia !==
                              null ? (
                                <>
                                  <td width="40%">
                                    <b>Proof of Right to Work: </b>
                                  </td>

                                  <td width="60%">
                                    <div className="d-flex">
                                      <ButtonForFunction
                                        color={"success"}
                                        func={() => setViewModalOpen2(true)}
                                        className={"btn mr-2"}
                                        name={"View"}
                                        permission={6}
                                      />

                                      <Button
                                        // color="primary"
                                        className="btn btn-uapp-add"
                                      >
                                        <a
                                          style={{
                                            textDecoration: "none",
                                            color: "white",
                                          }}
                                          href={
                                            rootUrl +
                                            consultantData
                                              ?.proofOfRightToWorkMedia?.fileUrl
                                          }
                                          target="_blank"
                                          // download
                                        >
                                          Download
                                        </a>
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              ) : null}
                            </tr>
                          </tbody>
                        </Table>
                      )}

                      {/* id or Password modal starts here */}

                      <Modal
                        size={
                          consultantData?.idOrPassportMedia?.mediaType == 4
                            ? "xl"
                            : "50%"
                        }
                        isOpen={viewModalOpen}
                        toggle={closeViewModal}
                        className={
                          consultantData?.idOrPassportMedia?.mediaType == 4
                            ? ""
                            : "uapp-modal2"
                        }
                      >
                        <ModalHeader>Id or Passport</ModalHeader>
                        <ModalBody
                          className={
                            consultantData?.idOrPassportMedia?.mediaType == 4
                              ? "modalHeight"
                              : ""
                          }
                        >
                          {/* <Form> */}

                          {consultantData?.idOrPassportMedia?.mediaType == 1 ? (
                            <img
                              src={
                                rootUrl +
                                consultantData?.idOrPassportMedia?.fileUrl
                              }
                              alt="gallery_image"
                              className="image"
                              style={{ width: "100%" }}
                            />
                          ) : consultantData?.idOrPassportMedia?.mediaType ==
                            4 ? (
                            <iframe
                              src={
                                rootUrl +
                                consultantData?.idOrPassportMedia?.fileUrl
                              }
                              // frameBorder="0"
                              // scrolling="auto"
                              // scrolling="no"
                              height="100%"
                              width="100%"
                              title="docs"
                            ></iframe>
                          ) : (
                            <span>
                              This type of file cannot be displayed. You can
                              download it by{" "}
                              <a
                                // style={{textDecoration: "none", color: "white"}}
                                href={
                                  rootUrl +
                                  consultantData?.idOrPassportMedia?.fileUrl
                                }
                                target="_blank"
                                // download
                              >
                                clicking here.
                              </a>
                            </span>
                          )}
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            className="mr-1 mt-3"
                            onClick={closeViewModal}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>

                      {/* id or Password modal ends here */}

                      {/* Proof of address modal starts here */}
                      <Modal
                        size={
                          consultantData?.proofOfAddressMedia?.mediaType == 4
                            ? "xl"
                            : "50%"
                        }
                        isOpen={viewModalOpen1}
                        toggle={closeViewModal1}
                        className={
                          consultantData?.proofOfAddressMedia?.mediaType == 4
                            ? ""
                            : "uapp-modal2"
                        }
                      >
                        <ModalHeader>Proof of Address</ModalHeader>
                        <ModalBody
                          className={
                            consultantData?.proofOfAddressMedia?.mediaType == 4
                              ? "modalHeight"
                              : ""
                          }
                        >
                          {/* <Form> */}

                          {consultantData?.proofOfAddressMedia?.mediaType ==
                          1 ? (
                            <img
                              src={
                                rootUrl +
                                consultantData?.proofOfAddressMedia?.fileUrl
                              }
                              alt="gallery_image"
                              className="image"
                              style={{ width: "100%" }}
                            />
                          ) : consultantData?.proofOfAddressMedia?.mediaType ==
                            4 ? (
                            <iframe
                              src={
                                rootUrl +
                                consultantData?.proofOfAddressMedia?.fileUrl
                              }
                              // frameBorder="0"
                              // scrolling="auto"
                              // scrolling="no"
                              height="100%"
                              width="100%"
                              title="docs"
                            ></iframe>
                          ) : (
                            <span>
                              This type of file cannot be displayed. You can
                              download it by{" "}
                              <a
                                // style={{textDecoration: "none", color: "white"}}
                                href={
                                  rootUrl +
                                  consultantData?.proofOfAddressMedia?.fileUrl
                                }
                                target="_blank"
                                // download
                              >
                                clicking here.
                              </a>
                            </span>
                          )}
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            className="mr-1 mt-3"
                            onClick={closeViewModal1}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>
                      {/* Proof of address modal ends here */}

                      {/* Proof of Right to Work modal starts here */}
                      <Modal
                        size={
                          consultantData?.proofOfRightToWorkMedia?.mediaType ==
                          4
                            ? "xl"
                            : "50%"
                        }
                        isOpen={viewModalOpen2}
                        toggle={closeViewModal2}
                        className={
                          consultantData?.proofOfRightToWorkMedia?.mediaType ==
                          4
                            ? ""
                            : "uapp-modal2"
                        }
                      >
                        <ModalHeader>Proof of Right to Work</ModalHeader>
                        <ModalBody
                          className={
                            consultantData?.proofOfRightToWorkMedia
                              ?.mediaType == 4
                              ? "modalHeight"
                              : ""
                          }
                        >
                          {/* <Form> */}

                          {consultantData?.proofOfRightToWorkMedia?.mediaType ==
                          1 ? (
                            <img
                              src={
                                rootUrl +
                                consultantData?.proofOfRightToWorkMedia?.fileUrl
                              }
                              alt="gallery_image"
                              className="image"
                              style={{ width: "100%" }}
                            />
                          ) : consultantData?.proofOfRightToWorkMedia
                              ?.mediaType == 4 ? (
                            <iframe
                              src={
                                rootUrl +
                                consultantData?.proofOfRightToWorkMedia?.fileUrl
                              }
                              // frameBorder="0"
                              // scrolling="auto"
                              // scrolling="no"
                              height="100%"
                              width="100%"
                              title="docs"
                            ></iframe>
                          ) : (
                            <span>
                              This type of file cannot be displayed. You can
                              download it by{" "}
                              <a
                                // style={{textDecoration: "none", color: "white"}}
                                href={
                                  rootUrl +
                                  consultantData?.proofOfRightToWorkMedia
                                    ?.fileUrl
                                }
                                target="_blank"
                                // download
                              >
                                clicking here.
                              </a>
                            </span>
                          )}
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            className="mr-1 mt-3"
                            onClick={closeViewModal2}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </Modal>
                      {/* Proof of Right to Work modal ends here */}
                    </Card>
                  </div>
                </div>
              </Col>

              <Col md="4">
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
                    <p>
                      {" "}
                      {
                        consultantData?.parentConsultant?.consultantType?.name
                      }{" "}
                    </p>
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

                <Card>
                  <CardBody>
                    <div className="hedding-titel mb-3">
                      <h5>
                        {" "}
                        <b>Important Links</b>{" "}
                      </h5>
                      <div className="bg-h"></div>
                    </div>

                    <div className="d-flex justify-content-between">
                      {permissions?.includes(
                        permissionList.View_Student_list
                      ) ? (
                        <LinkButton
                          url={`/studentListByConsultant/${id}`}
                          className={"btn btn-uapp-add "}
                          name={"Students"}
                          permission={6}
                        />
                      ) : null}

                      {/* <LinkButton
                      url={`/applicationsByConsultant/${id}`}
                      className={"btn btn-uapp-add "}
                      name={"Application"}
                      permission={6}
                    /> */}

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

                      {permissions?.includes(
                        permissionList.View_Application_Transactions
                      ) ? (
                        <ButtonForFunction
                          func={redirectToApplicationTransaction}
                          className={"btn btn-uapp-add "}
                          name={"Transactions"}
                          permission={6}
                        />
                      ) : null}
                    </div>
                  </CardBody>
                </Card>

                <Card className="p-3">
                  {/* <h6> Notice</h6>
                  <span className="bg-wg bg-width"></span> */}
                  <div className="hedding-titel mb-1">
                    <h5>
                      {" "}
                      <b>Notice</b>{" "}
                    </h5>
                    <div className="bg-h"></div>
                  </div>

                  <div className="notice-item card-widget mt-3 ">
                    <div className="notice-titel">
                      <h6> Super Admin</h6>
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

                  <div className="notice-item card-widget mt-3 ">
                    <div className="notice-titel">
                      <h6> Super Admin</h6>
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

                  <div className="notice-item card-widget mt-3 ">
                    <div className="notice-titel">
                      <h6> Super Admin</h6>
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

                  <div className="notice-item card-widget mt-3 ">
                    <div className="notice-titel">
                      <h6> Super Admin</h6>
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
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default AssociateProfile;
