import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import ReactToPrint from "react-to-print";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import put from "../../../../../helpers/put";
import Loader from "../../../Search/Loader/Loader";
import GeneralForm from "./Component/GeneralForm";
import ContactForm from "./Component/ContactForm";
import UpdateProfilePhoto from "./Component/UpdateProfilePhoto";
import UpdateCoverPhoto from "./Component/UpdateCoverPhoto";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PersonalForm from "./Component/PersonalForm";
import EligibilityForm from "./Component/EligibilityForm";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import EmergencyContactForm from "./Component/EmergencyContactForm";

const EmployeeProfile = ({ userId }) => {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();
  const { addToast } = useToasts();
  const [employeeDetails, setemployeeDetails] = useState({});
  const [employeeImgDetails, setemployeeImgDetails] = useState({});
  const [employeeType, setemployeeType] = useState({});
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
  const [progress, setProgress] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [loading, setLoading] = useState(true);
  const [contactInfo, SetContactInfo] = useState({});
  const [personalInfo, SetPersonalInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [eligibilityInfo, setEligibilityInfo] = useState({});
  const [emergencyInfo, setEmergencyInfo] = useState({});

  useEffect(() => {
    get(`EmployeeProfile/ProfileHead/${id ? id : userId}`).then((action) => {
      console.log(action);
      setemployeeDetails(action);

      setemployeeImgDetails(action.profileImageMedia);
      setemployeeType(action.employeeType);
      setLoading(false);
    });
  }, [id, userId, success, loading]);

  useEffect(() => {
    get(`EmployeeContactInformation/GetByEmployeeId/${id ? id : userId}`).then(
      (action) => {
        SetContactInfo(action);
      }
    );
  }, [id, userId]);

  useEffect(() => {
    get(`Employee/GetPersonalInformation/${id ? id : userId}`).then(
      (action) => {
        SetPersonalInfo(action);
      }
    );
  }, [id, userId]);

  useEffect(() => {
    get(`Employee/GetGeneralInformation/${id ? id : userId}`).then((action) => {
      setGeneralInfo(action);
    });
  }, [id, userId]);

  useEffect(() => {
    get(`EmployeeEligibility/GetEmployeeEligibility/${id ? id : userId}`).then(
      (action) => {
        setEligibilityInfo(action);
      }
    );
  }, [id, userId]);

  useEffect(() => {
    get(
      `EmployeeEmergencyInformation/GetByEmployeeId/${id ? id : userId}`
    ).then((action) => {
      setEmergencyInfo(action);
      console.log(action, "emergency");
    });
  }, [id, userId]);

  const redirect = () => {
    history.push(`/providerComplianceGeneralInfo/${id ? id : userId}`);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/providerComplianceList");
  };

  const componentRef = useRef();

  const updateCoverPhoto = () => {
    setModalOpen(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setError(false);
    setFileList([]);
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

    const subData = new FormData(event.target);

    subData.append("coverImage", FileList[0]?.originFileObj);

    if (FileList.length < 1) {
      setError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      put(`Employee/UpdateCoverPhoto`, subData).then((res) => {
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

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      put(`Employee/UpdateProfilePhoto`, subData).then((res) => {
        setButtonStatus1(false);
        setProgress(false);
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div ref={componentRef}>
          <BreadCrumb
            title="Provider Compliance  Profile"
            backTo={id && "Provider Compliance "}
            path="/providerComplianceList"
          />

          <div className="uapp-employee-profile">
            <Row>
              <Col md="12">
                <div className="uapp-employee-profile-left">
                  <Card>
                    {/* update cover photo Start*/}
                    <UpdateCoverPhoto
                      employeeDetails={employeeDetails}
                      permissions={permissions}
                      permissionList={permissionList}
                      updateCoverPhoto={updateCoverPhoto}
                      modalOpen={modalOpen}
                      closeModal={closeModal}
                      handleSubmitCoverPhoto={handleSubmitCoverPhoto}
                      id={id}
                      handleCancel={handleCancel}
                      previewImage={previewImage}
                      text={text}
                      error={error}
                      handlePreview={handlePreview}
                      handleChange={handleChange}
                      previewVisible={previewVisible}
                      previewTitle={previewTitle}
                      buttonStatus={buttonStatus}
                      progress={progress}
                      FileList={FileList}
                    ></UpdateCoverPhoto>

                    {/* update cover photo End */}
                    <CardBody>
                      {/* update profile photo start */}
                      <UpdateProfilePhoto
                        employeeDetails={employeeDetails}
                        permissionList={permissionList}
                        permissions={permissions}
                        updateProfilePic={updateProfilePic}
                        modalOpen2={modalOpen2}
                        closeModal1={closeModal1}
                        handleSubmitProfilePhoto={handleSubmitProfilePhoto}
                        FileList1={FileList1}
                        id={id}
                        handlePreview1={handlePreview1}
                        handleChange1={handleChange1}
                        previewVisible1={previewVisible1}
                        previewTitle1={previewTitle1}
                        handleCancel1={handleCancel1}
                        previewImage1={previewImage1}
                        text1={text1}
                        error1={error1}
                        progress={progress}
                        buttonStatus1={buttonStatus1}
                        redirect={redirect}
                      ></UpdateProfilePhoto>
                      {/* update profile photo End */}

                      <div className="uapp-employee-profile-generalInfo px-2">
                        <Row className="mb-4">
                          <Col md="7">
                            <ul className="uapp-ul text-left">
                              <li className="d-flex">
                                <div>
                                  <h4>
                                    {employeeDetails?.firstName}{" "}
                                    {employeeDetails?.lastName}
                                  </h4>

                                  {employeeDetails?.email === null ? null : (
                                    <p>
                                      <i class="far fa-envelope pr-2"></i>

                                      {employeeDetails?.email}
                                    </p>
                                  )}

                                  {employeeDetails?.phone === null ? null : (
                                    <p>
                                      <i className="fas fa-phone pr-2"></i>
                                      {employeeDetails?.phone}
                                    </p>
                                  )}
                                </div>
                              </li>
                            </ul>
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
                                {employeeDetails?.uappRegistrationDate}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>

                  <GeneralForm generalInfo={generalInfo}></GeneralForm>
                  <PersonalForm personalInfo={personalInfo}></PersonalForm>
                  <ContactForm contactInfo={contactInfo}></ContactForm>
                  <EmergencyContactForm
                    emergencyInfo={emergencyInfo}
                  ></EmergencyContactForm>
                  <EligibilityForm
                    eligibilityInfo={eligibilityInfo}
                  ></EligibilityForm>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(EmployeeProfile);
