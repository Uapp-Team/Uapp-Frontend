import React, { useEffect, useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Button,
} from "reactstrap";
import get from "../../../../helpers/get";
import coverImage from "../../../../assets/img/Asset 12Icon.svg";
import ReactToPrint from "react-to-print";
import { rootUrl } from "../../../../constants/constants";
import EditDivButton from "../../Components/EditDivButton";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { userTypes } from "../../../../constants/userTypeConstant";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import uapploader from "../../../../assets/img/Uapp_fav.png";
import { Upload, Image } from "antd";
import * as Icon from "react-feather";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import Loader from "../../Search/Loader/Loader";

const StudentNewProfile = () => {
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [studentDetails, setStudentDetails] = useState({});
  const [date, setDate] = useState("");
  const [isHaveDisability, setIsHaveDisability] = useState(false);
  const [isHaveCriminalConvictions, setIsHaveCriminalConvictions] =
    useState(false);
  const [educationInfos, setEducationInfos] = useState([]);
  const [serialNum, setSerialNum] = useState(1);
  const [gMatResult, setGMatResult] = useState({});
  const [greResult, setGreResult] = useState({});
  const [studentTestScore, setStudentTestScore] = useState([]);
  const [experience, setExperience] = useState([]);
  const [reference, setReference] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [conscentData, setConscentData] = useState({});
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [blackList, setBlackList] = useState(null);
  const history = useHistory();
  const { addToast } = useToasts();
  const sId = localStorage.getItem("referenceId");
  const [apiInfo, setAPiInfo] = useState("");

  // English Course Names

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});
  const [application, setApplication] = useState([]);
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    get(`PrefferedCourse/Index/${sId}`).then((res) => {
      setCourseList(res);
    });

    get(`StudentConsent/Get/${sId}`).then((res) => {
      setConscentData(res);
      setLoading(false);
    });

    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res?.json())
      .then((data) => {
        setAPiInfo(data?.IPv4);
        setLoading(false);
      });

    get(`Ielts/Index/${sId}`).then((res) => {
      setIelts(res);
      setLoading(false);
    });

    get(`Duolingo/Index/${sId}`).then((res) => {
      setDuolingo(res);
      setLoading(false);
    });

    get(`Toefl/Index/${sId}`).then((res) => {
      setToefl(res);
      setLoading(false);
    });

    get(`FunctionalSkill/Index/${sId}`).then((res) => {
      setFunctions(res);
      setLoading(false);
    });

    get(`Gcse/Index/${sId}`).then((res) => {
      setGcse(res);
      setLoading(false);
    });

    get(`Pearson/Index/${sId}`).then((res) => {
      setPearson(res);
      setLoading(false);
    });

    get(`Other/Index/${sId}`).then((res) => {
      setOthers(res);
      setLoading(false);
    });

    get(`Pte/Index/${sId}`).then((res) => {
      setPte(res);
      setLoading(false);
    });

    get(`StudentApplication/Index/${sId}`).then((res) => {
      setApplication(res);
      setLoading(false);
    });
  }, [sId, success]);

  useEffect(() => {
    get(`PreffereCourse/Index/${sId}`).then((res) => {
      setCourseList(res);
    });
  }, [sId, success]);

  useEffect(() => {
    get(`StudentProfile/Get/${sId}`).then((res) => {
      setContactData(res?.studentContactInfos);
      setBlackList(res?.blackList);
      setStudentDetails(res);
      setIsHaveDisability(res?.profileOtherInfo?.isHaveDisability);
      setIsHaveCriminalConvictions(
        res?.profileOtherInfo?.isHaveCriminalConvictions
      );
      setEducationInfos(res?.educationInfos);
      setGMatResult(res?.gmatScoreInfo);
      setGreResult(res?.greScoreInfo);
      setStudentTestScore(res?.studentTestScoreInfo);
      setExperience(res?.experienceinfo);
      setReference(res?.referenceInfo);

      var datee = res?.dateOfBirth;
      var utcDate = new Date(datee);
      var localeDte = utcDate.toLocaleString("en-CA");
      var bDate = localeDte?.split(",");
      setDate(bDate[0]);
    });
  }, [sId, success, loading]);

  const backToStudentList = () => {
    history.push("/studentList");
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  const handleEditFromProfilePage = (data) => {
    history.push(`/addStudentInformation/${sId}/${1}`);
  };

  const gotoFromProfilePage = (data) => {
    history.push(`/applicationDetails/${sId}/${sId}`);
  };

  const handleUpdatePersonalStatement = () => {
    history.push(`/addPersonalStatement/${sId}/${1}`);
  };

  const handleUpdatePersonalInformation = (data) => {
    history.push(`/addStudentInformation/${sId}/${1}`);
  };

  const handleUpdateTestScores = (data) => {
    history.push(`/addTestScore/${sId}/${1}`);
  };

  const handleUpdateContactInformation = (data) => {
    history.push(`/addStudentContactInformation/${sId}/${1}`);
  };

  const handleUpdateOtherInformation = (data) => {
    history.push(`/addOtherinformation/${sId}/${1}`);
  };

  const handleUpdateEducationalInformation = (data) => {
    history.push(`/addStudentEducationalInformation/${sId}/${1}`);
  };

  const handleUpdateGREAndGMATScores = (data) => {
    history.push(`/addTestScore/${sId}/${1}`);
  };

  const handleUpdateExperience = (data) => {
    history.push(`/addExperience/${sId}/${1}`);
  };

  const handleUpdateReference = (data) => {
    history.push(`/addReference/${sId}/${1}`);
  };

  const componentRef = useRef();

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
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
    subData.append("profileImageFile", FileList1[0]?.originFileObj);
    setButtonStatus1(true);
    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      put(`Student/UpdateProfilePhoto`, subData).then((res) => {
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

  const handleTerms = (event) => {
    const subData = new FormData();

    subData.append("StudentId", sId);
    subData.append("IpAddress", apiInfo);
    setProgress(true);
    post("StudentConsent/Sign", subData).then((res) => {
      setProgress(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div ref={componentRef}>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <div className="d-flex align-items-center">
                <div className="mt-1">
                  <h3 className="text-white">Student Profile</h3>
                </div>
                <div className="ml-2">
                  <ReactToPrint
                    trigger={() => (
                      <span
                        className="text-white cursor-pointer"
                        title="Print to pdf"
                      >
                        <i className="fas fa-print"></i>
                      </span>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>

              {userType == userTypes?.Student ? null : (
                <div className="page-header-back-to-home">
                  <span onClick={backToStudentList} className="text-white">
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Student
                    List
                  </span>
                </div>
              )}
            </CardHeader>
          </Card>

          <div className="uapp-employee-profile">
            <Row>
              <Col md="8">
                <div className="uapp-employee-profile-left">
                  <Card>
                    <div className="uapp-employee-cover-image">
                      <div
                        className="bg-image-profile"
                        style={{
                          backgroundImage: `url(${coverImage})`,
                          width: "100%",
                          backgroundSize: "contain",
                        }}
                      ></div>
                    </div>
                    <CardBody>
                      <div className="uapp-employee-profile-image-edit">
                        <Row>
                          <Col>
                            <div className="uapp-employee-profile-image">
                              <div className="text-left">
                                <div className="profile-pic">
                                  {studentDetails?.profileImage == null ? (
                                    <img
                                      className="empProfileImg"
                                      src={uapploader}
                                      alt="profile_img"
                                    />
                                  ) : (
                                    <img
                                      className="empProfileImg"
                                      src={
                                        rootUrl +
                                        studentDetails?.profileImage?.fileUrl
                                      }
                                      alt="profile_img"
                                    />
                                  )}
                                  {permissions?.includes(
                                    permissionList.Edit_Student
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
                                  permissionList.Edit_Student
                                ) ? (
                                  <Modal
                                    isOpen={modalOpen2}
                                    toggle={closeModal1}
                                    className="uapp-modal"
                                  >
                                    <ModalHeader>
                                      Update Profile Photo
                                    </ModalHeader>

                                    <ModalBody>
                                      <form onSubmit={handleSubmitProfilePhoto}>
                                        <input
                                          type="hidden"
                                          name="id"
                                          id="id"
                                          value={sId}
                                        />

                                        <FormGroup
                                          row
                                          className="has-icon-left position-relative"
                                        >
                                          <Col className="ml-5" md="4">
                                            <span>
                                              Profile Photo{" "}
                                              <span className="text-danger">
                                                *
                                              </span>{" "}
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
                                                        <span>
                                                          Upload Image Here
                                                        </span>
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
                                                {progress ? (
                                                  <ButtonLoader />
                                                ) : (
                                                  "Update"
                                                )}
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

                          <Col>
                            {permissions?.includes(
                              permissionList.Update_Student_info
                            ) ? (
                              <EditDivButton
                                className={"uapp-employee-profile-Edit"}
                                func={() =>
                                  handleEditFromProfilePage(studentDetails)
                                }
                                permission={6}
                              />
                            ) : null}
                          </Col>
                        </Row>
                      </div>

                      <div className="uapp-employee-profile-generalInfo">
                        <Row>
                          <Col md="6">
                            <ul className="uapp-ul text-left">
                              <li>
                                <h4>
                                  {studentDetails?.nameTittle}{" "}
                                  {studentDetails?.firstName}{" "}
                                  {studentDetails.lastName} (
                                  {studentDetails?.studentViewId})
                                </h4>
                              </li>
                            </ul>
                          </Col>

                          <Col md="6">
                            <ul className="uapp-ul text-right1">
                              {/*  */}

                              <li>
                                <span> Email : {studentDetails?.email}</span>
                              </li>

                              <li>
                                <span>
                                  {" "}
                                  Phone Number : {studentDetails?.phoneNumber}
                                </span>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>

                  {/* personal statement */}
                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Personal Statement</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() => handleUpdatePersonalStatement()}
                              permission={6}
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="pt-2">
                            {
                              studentDetails?.profilePersonalStatement
                                ?.statement
                            }
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* personal info */}
                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Personal Information</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Update_Student_info
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() =>
                                handleUpdatePersonalInformation(studentDetails)
                              }
                              permission={6}
                            />
                          ) : null}
                        </div>
                        <Table className="table-bordered mt-4">
                          <tbody>
                            <tr>
                              <td width="40%">
                                <b>Title:</b>
                              </td>

                              <td width="60%">{studentDetails?.nameTittle}</td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Name:</b>
                              </td>

                              <td width="60%">
                                {studentDetails?.firstName}{" "}
                                {studentDetails?.lastName}
                              </td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Gender:</b>
                              </td>

                              <td width="60%">{studentDetails?.gender}</td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Date of birth:</b>
                              </td>

                              <td width="60%">{date}</td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Birth country:</b>
                              </td>

                              <td width="60%">
                                {studentDetails?.birthCountry}
                              </td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Nationality:</b>
                              </td>

                              <td width="60%">{studentDetails?.nationality}</td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Marital status:</b>
                              </td>

                              <td width="60%">
                                {studentDetails?.maritalStatus}
                              </td>
                            </tr>

                            <tr>
                              <td width="40%">
                                <b>Passport no:</b>
                              </td>

                              <td width="60%">
                                {studentDetails?.passportNumber}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>

                  {/* contact info */}
                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Contact Information</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() =>
                                handleUpdateContactInformation(studentDetails)
                              }
                              permission={6}
                            />
                          ) : null}
                        </div>

                        {contactData.map((contact, i) => (
                          <>
                            <div className="hedding-titel d-flex justify-content-between mt-3">
                              <div>
                                <h5>
                                  {" "}
                                  <b>{contact?.addressType?.name}</b>{" "}
                                </h5>

                                <div className="bg-h"></div>
                              </div>
                            </div>
                            <Table className="table-bordered mt-4 mb-5">
                              <tbody key={i}>
                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>House no:</b>
                                    </span>
                                  </td>

                                  <td width="60%">{contact?.houseNo}</td>
                                </tr>

                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>Phone number:</b>
                                    </span>
                                  </td>

                                  <td width="60%">
                                    {contact?.cellPhoneNumber}
                                  </td>
                                </tr>

                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>Country:</b>
                                    </span>
                                  </td>

                                  <td width="60%">{contact?.country?.name}</td>
                                </tr>

                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>City:</b>
                                    </span>
                                  </td>

                                  <td width="60%">{contact?.city}</td>
                                </tr>

                                {contact?.state !== null ? (
                                  <tr>
                                    <td width="40%">
                                      <span>
                                        {" "}
                                        <b>State/County:</b>
                                      </span>
                                    </td>

                                    <td width="60%">{contact?.state}</td>
                                  </tr>
                                ) : null}

                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>Zip code:</b>
                                    </span>
                                  </td>

                                  <td width="60%">{contact?.zipCode}</td>
                                </tr>

                                <tr>
                                  <td width="40%">
                                    <span>
                                      {" "}
                                      <b>Address line:</b>
                                    </span>
                                  </td>

                                  <td width="60%">{contact?.addressLine}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </>
                        ))}
                      </CardBody>
                    </Card>
                  </div>

                  {/* other info */}
                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Other Information</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() =>
                                handleUpdateOtherInformation(studentDetails)
                              }
                              permission={6}
                            />
                          ) : null}
                        </div>

                        <Table className="table-bordered mt-4">
                          <tbody>
                            <tr>
                              <td width="40%">
                                <span>
                                  {" "}
                                  <b>Have disability:</b>
                                </span>
                              </td>

                              <td width="60%">
                                {isHaveDisability ? (
                                  <span>Yes</span>
                                ) : (
                                  <span>No</span>
                                )}
                              </td>
                            </tr>

                            {isHaveDisability ? (
                              <tr>
                                <td width="40%">
                                  <span>
                                    {" "}
                                    <b>Disability description:</b>
                                  </span>
                                </td>

                                <td width="60%">
                                  {
                                    studentDetails?.profileOtherInfo
                                      ?.disabilityDescription
                                  }
                                </td>
                              </tr>
                            ) : null}

                            <tr>
                              <td width="40%">
                                <span>
                                  {" "}
                                  <b>Have criminal convictions:</b>
                                </span>
                              </td>

                              <td width="60%">
                                {isHaveCriminalConvictions ? (
                                  <span>Yes</span>
                                ) : (
                                  <span>No</span>
                                )}
                              </td>
                            </tr>

                            {isHaveCriminalConvictions ? (
                              <tr>
                                <td width="40%">
                                  <span>
                                    {" "}
                                    <b>Criminal convictions description:</b>
                                  </span>
                                </td>

                                <td width="60%">
                                  {
                                    studentDetails?.profileOtherInfo
                                      ?.criminalConvictionsDescription
                                  }
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>

                  {/* educational info */}
                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Educational Information</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() =>
                                handleUpdateEducationalInformation(
                                  studentDetails
                                )
                              }
                              permission={6}
                            />
                          ) : null}
                        </div>

                        {educationInfos.length < 1 ? (
                          <span>
                            There is no educational information added here.
                          </span>
                        ) : (
                          <div className="table-responsive pt-3">
                            <Table
                              className="table-sm striped"
                              style={tableStyle}
                            >
                              <thead className="tablehead">
                                <tr style={{ textAlign: "center" }}>
                                  <th>#</th>
                                  <th>Institute</th>
                                  <th>Education Level</th>
                                  <th>Course</th>
                                  <th>Duration</th>
                                  <th>Grade</th>
                                  <th>Still Studying</th>
                                  <th>Study Duration</th>
                                </tr>
                              </thead>
                              <tbody>
                                {educationInfos?.map((edu, i) => (
                                  <tr key={i} style={{ textAlign: "center" }}>
                                    <th scope="row">{serialNum + i}</th>
                                    <td>{edu?.nameOfInstitution}</td>

                                    <td>{edu?.educationLevelName}</td>

                                    <td>{edu?.qualificationSubject}</td>

                                    <td>{edu?.duration}</td>

                                    <td>{edu?.finalGrade}</td>
                                    <td>
                                      {edu?.stillStudying === false ? (
                                        <span>No</span>
                                      ) : (
                                        <span>Yes</span>
                                      )}
                                    </td>
                                    <td>
                                      {edu?.stillStudying === false ? (
                                        <div>
                                          {handleDate(
                                            edu?.attendedInstitutionFrom
                                          )}{" "}
                                          to{" "}
                                          {handleDate(
                                            edu?.attendedInstitutionTo
                                          )}
                                        </div>
                                      ) : (
                                        <div>
                                          {handleDate(
                                            edu?.attendedInstitutionFrom
                                          )}{" "}
                                          to {<div>ongoing</div>}
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>

                  <div className=" row info-item mt-4">
                    <div
                      className="col-md-6 mt-2"
                      style={{ textAlign: "left" }}
                    >
                      <Card className="test-score-card-style2">
                        <CardBody className="">
                          <div className="hedding-titel d-flex justify-content-between mb-1">
                            <div>
                              <h5>
                                {" "}
                                <b>GRE Information</b>{" "}
                              </h5>

                              <div className="bg-h"></div>
                            </div>

                            {permissions?.includes(
                              permissionList?.Edit_Student
                            ) ? (
                              <EditDivButton
                                className={"text-right edit-style  p-3"}
                                func={() =>
                                  handleUpdateGREAndGMATScores(studentDetails)
                                }
                                permission={6}
                              />
                            ) : null}
                          </div>

                          {greResult !== null ? (
                            <>
                              <h6>
                                Quantitative Score:{" "}
                                {greResult?.quantitativeScore}
                              </h6>
                              <h6>
                                Quantitative Rank: {greResult?.quantitativeRank}
                              </h6>
                              <h6>Verbal Score: {greResult?.verbalScore}</h6>
                              <h6>Verbal Rank: {greResult?.verbalRank}</h6>
                              <h6>Writing Score: {greResult?.writingScore}</h6>
                              <h6>Writing Rank: {greResult?.writingRank}</h6>
                            </>
                          ) : (
                            <span>GRE information is not added.</span>
                          )}
                        </CardBody>
                      </Card>
                    </div>

                    <div
                      className="col-md-6 mt-2"
                      style={{ textAlign: "left" }}
                    >
                      <Card className=" test-score-card-style2">
                        <CardBody className="">
                          <div className="hedding-titel d-flex justify-content-between mb-1">
                            <div>
                              <h5>
                                {" "}
                                <b>GMAT Information</b>{" "}
                              </h5>

                              <div className="bg-h"></div>
                            </div>

                            {permissions?.includes(
                              permissionList.Edit_Student
                            ) ? (
                              <EditDivButton
                                className={"text-right edit-style  p-3"}
                                func={() =>
                                  handleUpdateGREAndGMATScores(studentDetails)
                                }
                                permission={6}
                              />
                            ) : null}
                          </div>

                          {gMatResult !== null ? (
                            <>
                              <h6>
                                Quantitative Score:{" "}
                                {gMatResult?.quantitativeScore}
                              </h6>
                              <h6>
                                Quantitative Rank:{" "}
                                {gMatResult?.quantitativeRank}
                              </h6>
                              <h6>Verbal Score: {gMatResult?.verbalScore}</h6>
                              <h6>Verbal Rank: {gMatResult?.verbalRank}</h6>
                              <h6>Total Score: {gMatResult?.totalScore}</h6>
                              <h6>Total Rank: {gMatResult?.totalRank}</h6>
                              <h6>Writing Score: {gMatResult?.writingScore}</h6>
                              <h6>Writing Rank: {gMatResult?.writingRank}</h6>
                            </>
                          ) : (
                            <span>GMAT information is not added.</span>
                          )}
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Test Scores</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>
                        </div>

                        {ielts?.id ||
                        duolingo?.id ||
                        toefl?.id ||
                        functions?.id ||
                        gcse?.id ||
                        pearson?.id ||
                        others?.id ||
                        pte?.id ? (
                          <div className="row mt-3">
                            {ielts?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        IELTS Score
                                      </h5>

                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Overall: {ielts?.overall}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Speaking: {ielts?.speaking}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          reading: {ielts?.reading}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Writing: {ielts?.writing}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Listening: {ielts?.listening}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Exam Date:{" "}
                                          {handleDate(ielts?.examDate)}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}

                            {duolingo?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        DUOLINGO Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Literacy: {duolingo?.leteracy}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Comprehension:{" "}
                                          {duolingo?.comprehension}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Conversation: {duolingo?.conversation}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Production: {duolingo?.production}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Exam Date:{" "}
                                          {handleDate(duolingo?.examDate)}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {duolingo?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}

                            {toefl?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        TOEFL Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Overall: {toefl?.overall}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Speaking: {toefl?.speaking}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          reading: {toefl?.reading}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Writing: {toefl?.writing}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Listening: {toefl?.listening}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Exam Date:{" "}
                                          {handleDate(toefl?.examDate)}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {toefl?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}
                            {functions?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        Functional Skill Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Overall: {functions?.overall}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Speaking: {functions?.speaking}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          reading: {functions?.reading}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Writing: {functions?.writing}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Listening: {functions?.listening}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Exam Date:{" "}
                                          {handleDate(functions?.examDate)}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {functions?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}

                            {gcse?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        GCSE Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Result: {gcse?.result}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {gcse?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}

                            {pearson?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        PEARSON Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Result: {pearson?.result}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {pearson?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}

                            {others?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        Other Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Test Name: {others?.testName}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Overall Score: {others?.scoreOverall}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {others?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}
                            {pte?.id ? (
                              <div
                                className="col-md-6 mt-2"
                                style={{ textAlign: "left" }}
                              >
                                <Card className=" test-score-card-style">
                                  <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="test-score-title-style2">
                                        PTE Score
                                      </h5>
                                      {permissions?.includes(
                                        permissionList.Edit_Student
                                      ) ? (
                                        <ButtonForFunction
                                          className={"my-3"}
                                          func={() =>
                                            handleUpdateTestScores(
                                              studentDetails
                                            )
                                          }
                                          name={"View"}
                                          color={"primary"}
                                          permission={6}
                                        />
                                      ) : null}
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <div>
                                        <span className="bank-account-info-text">
                                          Overall: {pte?.overall}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Speaking: {pte?.speaking}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Reading: {pte?.reading}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Writing: {pte?.writing}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          Listening: {pte?.listening}
                                        </span>
                                        <br />
                                        <span className="bank-account-info-text">
                                          IELTS Equivalent Score:{" "}
                                          {pte?.ieltsEquivalent}
                                        </span>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <div className="mt-3">Test score is not added.</div>
                        )}
                      </CardBody>
                    </Card>
                  </div>

                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Experience</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() =>
                                handleUpdateExperience(studentDetails)
                              }
                              permission={6}
                            />
                          ) : null}
                        </div>

                        {experience.length < 1 ? (
                          <span>There is no experience added here.</span>
                        ) : (
                          <div className="table-responsive pt-3">
                            <Table
                              className="table-sm striped"
                              style={tableStyle}
                            >
                              <thead className="tablehead">
                                <tr style={{ textAlign: "center" }}>
                                  <th>#</th>
                                  <th>Company Name</th>
                                  <th>Job Title</th>
                                  <th>Employment Details</th>
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Still Working?</th>
                                </tr>
                              </thead>
                              <tbody>
                                {experience?.map((ex, i) => (
                                  <tr key={i} style={{ textAlign: "center" }}>
                                    <th scope="row">{serialNum + i}</th>
                                    <td>{ex?.companyName}</td>
                                    <td>{ex?.jobTitle}</td>
                                    <td>{ex?.employeementDetails}</td>
                                    <td>{handleDate(ex?.startDate)}</td>
                                    <td>
                                      {ex?.isStillWorking ? (
                                        <span>Not Available</span>
                                      ) : (
                                        <span>{handleDate(ex?.endDate)}</span>
                                      )}
                                    </td>
                                    <td>
                                      {ex?.isStillWorking ? (
                                        <span>Yes</span>
                                      ) : (
                                        <span>No</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>

                  <div className=" info-item mt-4">
                    <Card>
                      <CardBody>
                        <div className="hedding-titel d-flex justify-content-between">
                          <div>
                            <h5>
                              {" "}
                              <b>Reference</b>{" "}
                            </h5>

                            <div className="bg-h"></div>
                          </div>

                          {permissions?.includes(
                            permissionList.Edit_Student
                          ) ? (
                            <EditDivButton
                              className={"text-right edit-style  p-3"}
                              func={() => handleUpdateReference(studentDetails)}
                              permission={6}
                            />
                          ) : null}
                        </div>

                        {reference.length < 1 ? (
                          <span>There is no reference added here.</span>
                        ) : (
                          <div className="table-responsive pt-3">
                            <Table
                              className="table-sm striped"
                              style={tableStyle}
                            >
                              <thead className="tablehead">
                                <tr style={{ textAlign: "center" }}>
                                  <th>#</th>
                                  <th>Address Line</th>
                                  <th>City</th>
                                  <th>Country</th>
                                  <th>Email</th>
                                  <th>Institute Company</th>
                                  <th>Phone Number</th>
                                  <th>Reference Name</th>
                                  <th>Reference Type</th>
                                  <th>State/County</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reference?.map((ref, i) => (
                                  <tr key={i} style={{ textAlign: "center" }}>
                                    <th scope="row">{serialNum + i}</th>
                                    <td>{ref?.addressLine}</td>

                                    <td>{ref?.city}</td>

                                    <td>{ref?.country}</td>

                                    <td>{ref?.emailAddress}</td>

                                    <td>{ref?.institute_Company}</td>

                                    <td>{ref?.phoneNumber}</td>

                                    <td>{ref?.referenceName}</td>

                                    <td>{ref?.referenceTypeName}</td>

                                    <td>{ref?.stateName}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        )}
                      </CardBody>
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
                      {studentDetails?.consultant
                        ?.consultantProfileImageMedia == null ? (
                        <img src={uapploader} alt="consultant_photo" />
                      ) : (
                        <img
                          src={
                            rootUrl +
                            studentDetails?.consultant
                              ?.consultantProfileImageMedia?.thumbnailUrl
                          }
                          alt="consultant_photo"
                        />
                      )}
                    </div>

                    <h5>
                      {studentDetails?.consultant?.firstName}{" "}
                      {studentDetails?.consultant?.lastName}
                    </h5>
                    <p> Consultant </p>
                  </div>
                  <CardBody>
                    <div>
                      <ul className="uapp-ul text-center">
                        <li> {studentDetails?.consultant?.email} </li>
                        <li> {studentDetails?.consultant?.phoneNumber} </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>

                {userType == userTypes?.Student ? (
                  <>
                    <Card className="p-3">
                      <div className="hedding-titel d-flex justify-content-between">
                        <div>
                          <h5>
                            {" "}
                            <b>Application</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                      </div>

                      {application.length > 0 ? (
                        <>
                          {application?.map((app, i) => (
                            <div key={i}>
                              <div className="notice-item card-widget mt-3 ">
                                <div className="notice-titel-student-profile">
                                  {permissions?.includes(
                                    permissionList.View_Application_Details
                                  ) ? (
                                    <Button
                                      color="primary"
                                      onClick={() => gotoFromProfilePage(app)}
                                    >
                                      View
                                    </Button>
                                  ) : null}
                                </div>
                                <span className="std-uni-stl">
                                  {app?.subject?.name}
                                </span>
                                <br />
                                <span className="std-sub-stl">
                                  {app?.university?.name}
                                </span>
                                <br />
                                <span>{app?.intake?.name}</span>
                                <br />
                                <span>{app?.applicationStatus?.name}</span>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : null}
                    </Card>
                  </>
                ) : null}

                {parseInt(localStorage.getItem("userType")) ===
                userTypes?.Student ? (
                  <Card className="p-3">
                    <div className="hedding-titel d-flex justify-content-between mb-2">
                      <div>
                        <h5>
                          {" "}
                          <b>Consent</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>

                    {conscentData == null ||
                    conscentData?.isDeclared == false ? (
                      <div className="notice-item card-widget mt-3 ">
                        <div className="text-center">
                          <span>
                            Consent is not signed yet.{" "}
                            <Link to={`/studentDeclaration/${sId}`}>
                              View terms and conditions.
                            </Link>{" "}
                          </span>

                          <div>
                            {permissions?.includes(
                              permissionList.Edit_Student
                            ) ? (
                              <ButtonForFunction
                                func={handleTerms}
                                name={
                                  progress ? <ButtonLoader /> : "Sign Consent"
                                }
                                className={"badge-primary mt-2"}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-1 text-left ms-md-4  ">
                        <span>
                          Conscent Sign Date:{" "}
                          <span className="">
                            {" "}
                            {conscentData?.consentSignTime !== null
                              ? handleDate(conscentData?.consentSignTime)
                              : null}
                          </span>
                        </span>
                        <br />
                        <span>
                          Conscent Signed From Ip:
                          <span className="">
                            {" "}
                            {conscentData?.consentFromIp}
                          </span>
                        </span>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card className="p-3">
                    <div className="hedding-titel d-flex justify-content-between">
                      <div>
                        <h5>
                          {" "}
                          <b>Consent</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>

                    {!(
                      conscentData == null || conscentData?.isDeclared == false
                    ) ? (
                      <div className="notice-item card-widget mt-3 ">
                        <div className="notice-description">
                          <div className="d-flex">
                            <span>Consent Signed </span>
                            <span
                              className="text-success"
                              style={{
                                fontSize: "15px",
                                fontWeight: "700",
                                marginLeft: "10px",
                              }}
                            >
                              <i class="fa-solid fa-check"></i>{" "}
                            </span>
                          </div>
                          <span>
                            Date:{" "}
                            {conscentData?.consentSignTime !== null
                              ? handleDate(conscentData?.consentSignTime)
                              : null}{" "}
                          </span>
                          <br />
                          <span>From Ip: {conscentData?.consentFromIp}</span>
                          <div className="text-center mt-2">
                            <Button className="badge-primary">Download</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="notice-item card-widget mt-3 ">
                        <div className="text-center">
                          <span>Student has not signed consent yet. </span>
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentNewProfile;
