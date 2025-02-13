import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { Image } from "antd";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import AdmissionManagerNav from "../NavigationAndRegister/AdmissionManagerNav";
import put from "../../../../../../helpers/put";
import get from "../../../../../../helpers/get";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import { rootUrl } from "../../../../../../constants/constants";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { currentDate } from "../../../../../../components/date/calenderFormate";
import PhoneInput from "react-phone-input-2";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Index = () => {
  // Profile Image States

  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [profilePicError, setProfilePicError] = useState(false);

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const activetab = "2";
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const [gender, setGender] = useState([]);

  const [genderValue, setGenderValue] = useState(0);
  const [genderError, setGenderError] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalStatusValue, setMaritalStatusValue] = useState(0);
  const [maritalStatusError, setMaritalStatusError] = useState(false);

  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const [success, setSuccess] = useState(false);

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState("");

  const [consPersonalInfo, setConsPersonalInfo] = useState({});
  const [passport, setPassport] = useState("");
  const [passportError, setPassportError] = useState("");

  const { admissionManagerId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get("MaritalStatusDD/Index").then((res) => {
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      setGender(res);
    });

    get(`AdmissionManager/GetPersonalInformation/${admissionManagerId}`).then(
      (res) => {
        console.log("personalInfo", res);
        setConsPersonalInfo(res);
        setPassport(res?.passportId);
        setphoneNumber(res?.phoneNumber);
        setGenderValue(res?.genderId !== null ? res?.genderId : 0);
        setMaritalStatusValue(
          res?.maritalStatusId !== null ? res?.maritalStatusId : 0
        );

        res?.dateOfBirth &&
          setDate(moment(new Date(res?.dateOfBirth)).format("YYYY-MM-DD"));
      }
    );
  }, [admissionManagerId]);

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const goPrevious = () => {
    history.push(`/admissionManagerGeneralInformation/${admissionManagerId}`);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }
    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setProfilePicError(false);
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setError("Only jpeg, jpg, png image is allowed");
      setProfilePicError(false);
    } else {
      setFileList1(fileList);
      setError("");
    }
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  //

  // Profile Image Code End

  // Cover Image Code Start

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function getBase642(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase642(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList2([]);
      setError2("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList2(fileList);
      setError2("");
    }
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    if (e.target.value === "") {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNUmberError("Phone number is required");
    } else if (value?.length < 9) {
      setphoneNUmberError("Phone number required minimum 9 digit");
    } else {
      setphoneNUmberError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const handlePassport = (e) => {
    let data = e.target.value.trimStart();
    setPassport(data);
    if (data === "") {
      setPassportError("Passport is required");
    } else {
      setPassportError("");
    }
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("admissionManagerProfileFile", FileList1[0]?.originFileObj);
    subdata.append("admissionManagerCoverFile", FileList2[0]?.originFileObj);
    subdata.append("phoneNumber", phoneNumber);

    // for (var value of subdata) {
    //   console.log(value);
    // }

    let CheckFileIsValid = () => {
      if (
        consPersonalInfo?.admissionManagerProfileImage == null &&
        userType === userTypes.AdmissionManager.toString()
      ) {
        if (FileList1.length < 1) {
          setProfilePicError(true);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    let ValidForm = () => {
      let isFormValid = true;
      if (!date) {
        isFormValid = false;
        setDateError(true);
      }
      if (genderValue === 0) {
        isFormValid = false;
        setGenderError(true);
      }
      if (maritalStatusValue === 0) {
        isFormValid = false;
        setMaritalStatusError(true);
      }

      if (!phoneNumber) {
        isFormValid = false;
        setphoneNUmberError("Phone number is required");
      }

      if (!passport) {
        isFormValid = false;
        setPassportError("Passport is required");
      }

      if (phoneNumber?.length < 9) {
        isFormValid = false;
        setphoneNUmberError("Phone number required minimum 9 digit");
      }

      if (!CheckFileIsValid()) {
        isFormValid = false;
        setProfilePicError(true);
      }
      return isFormValid;
    };

    if (ValidForm()) {
      setButtonStatus(true);
      setProgress(true);
      put("AdmissionManager/PersonalInformation", subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        if (FileList1.length > 0) {
          setFileList1([]);
        }
        if (FileList2.length > 0) {
          setFileList2([]);
        }
        setButtonStatus(false);
        history.push(
          `/admissionManagerContactInformation/${admissionManagerId}`
        );
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Personal Information"
        backTo={
          userType === userTypes?.AdmissionManager ? null : "Admission Manager"
        }
        path={`/admissionManagerList`}
      />

      <AdmissionManagerNav
        activetab={activetab}
        admissionManagerId={admissionManagerId}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <div>
                <p className="section-title">Personal Information</p>
                <Form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={admissionManagerId}
                  />

                  <FormGroup row>
                    <Col lg="6" md="8">
                      <span>
                        <span className="text-danger">*</span>
                        Date Of Birth
                      </span>

                      <Input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        onChange={(e) => {
                          handleDate(e);
                        }}
                        value={date}
                      />
                      {dateError && (
                        <span className="text-danger">
                          Birth date is required
                        </span>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="6" md="8">
                      <span>Passport/ID</span>

                      <Input
                        type="text"
                        name="passportId"
                        id="passportId"
                        placeholder="Enter Passport Number"
                        value={passport}
                        onChange={(e) => handlePassport(e)}
                      />
                      <span className="text-danger">{passportError}</span>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="6" md="8">
                      <span>
                        <span className="text-danger">*</span>Gender
                      </span>
                      <br />
                      {gender?.map((tt) => (
                        <>
                          <input
                            type="radio"
                            name="genderId"
                            id="genderId"
                            value={tt?.id}
                            onClick={() => {
                              setGenderValue(tt?.id);
                              setGenderError(false);
                            }}
                            checked={genderValue === tt?.id ? true : false}
                          />

                          <label
                            className="mr-3"
                            style={{ fontWeight: 500, fontSize: "14px" }}
                          >
                            {tt?.name}
                          </label>
                        </>
                      ))}
                      <br />
                      {genderError && (
                        <span className="text-danger">Gender is required</span>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="6" md="8">
                      <span>
                        {" "}
                        <span className="text-danger">*</span>Marital Status
                      </span>
                      <br />
                      {maritalStatus?.map((tt) => (
                        <>
                          <input
                            type="radio"
                            name="maritalStatusId"
                            id="maritalStatusId"
                            value={tt?.id}
                            onClick={() => {
                              setMaritalStatusValue(tt?.id);
                              setMaritalStatusError(false);
                            }}
                            checked={
                              maritalStatusValue === tt?.id ? true : false
                            }
                          />

                          <label
                            className="mr-3"
                            style={{ fontWeight: 500, fontSize: "14px" }}
                          >
                            {tt?.name}
                          </label>
                        </>
                      ))}
                      <br />
                      {maritalStatusError && (
                        <span className="text-danger">
                          Marital status is required
                        </span>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col lg="6" md="8" className="phone-input-group">
                      <span>
                        <span className="text-danger">*</span>
                        Phone Number
                      </span>
                      <PhoneInput
                        className="w-100"
                        type="string"
                        name="phoneNumber"
                        id="phoneNumber"
                        country={"gb"}
                        enableLongNumbers={true}
                        onChange={handlePhoneNumber}
                        value={phoneNumber ? phoneNumber : ""}
                        inputProps={{
                          required: true,
                        }}
                      />

                      <span className="text-danger">{phoneNUmberError}</span>
                    </Col>
                  </FormGroup>

                  <Row>
                    <Col lg="6" md="8">
                      <FormGroup row>
                        <Col md="3">
                          <span>
                            {consPersonalInfo?.admissionManagerProfileImage ==
                              null &&
                            userType ===
                              userTypes.AdmissionManager.toString() ? (
                              <span className="text-danger">*</span>
                            ) : null}
                            Profile Image
                          </span>
                        </Col>
                        <Col md="5">
                          <div className="row">
                            {consPersonalInfo?.admissionManagerProfileImage !=
                            null ? (
                              <div className="col-md-6">
                                <Image
                                  width={104}
                                  height={104}
                                  src={
                                    rootUrl +
                                    consPersonalInfo
                                      ?.admissionManagerProfileImage
                                      ?.thumbnailUrl
                                  }
                                />
                              </div>
                            ) : null}

                            <div className="col-md-6">
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
                                    <span>Upload Here</span>
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
                                {error}
                              </span>
                            </div>
                          </div>

                          {profilePicError && (
                            <span className="text-danger">
                              Profile photo is required
                            </span>
                          )}
                        </Col>
                        <Col md="4" className="pt-4">
                          <span className="text-gray">
                            File size less than 2MB, keep visual elements
                            centered
                          </span>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" md="8">
                      <FormGroup row>
                        <Col md="3">
                          <span>Cover Image</span>
                        </Col>
                        <Col md="5">
                          <div className="row">
                            {consPersonalInfo?.admissionManagerCoverImage !=
                            null ? (
                              <div className="col-md-6">
                                <Image
                                  width={104}
                                  height={104}
                                  src={
                                    rootUrl +
                                    consPersonalInfo?.admissionManagerCoverImage
                                      ?.thumbnailUrl
                                  }
                                />
                              </div>
                            ) : null}

                            <div className="col-md-6">
                              <Upload
                                listType="picture-card"
                                multiple={false}
                                fileList={FileList2}
                                onPreview={handlePreview2}
                                onChange={handleChange2}
                                beforeUpload={(file) => {
                                  return false;
                                }}
                              >
                                {FileList2.length < 1 ? (
                                  <div
                                    className="text-danger"
                                    style={{ marginTop: 8 }}
                                  >
                                    <Icon.Upload />
                                    <br />
                                    <span>Upload Here</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Upload>
                              <Modal
                                visible={previewVisible2}
                                title={previewTitle2}
                                footer={null}
                                onCancel={handleCancel2}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage2}
                                />
                              </Modal>
                              <span className="text-danger d-block">
                                {error2}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md="4" className="pt-4">
                          <span className="text-gray">
                            File size less than 2MB, keep visual elements
                            centered
                          </span>
                        </Col>
                      </FormGroup>
                      <FormGroup className="mt-4 d-flex justify-content-between">
                        <PreviousButton action={goPrevious} />
                        {permissions?.includes(
                          permissionList.Update_AdmissionManager
                        ) ? (
                          <SaveButton
                            text="Save and Next"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default Index;
