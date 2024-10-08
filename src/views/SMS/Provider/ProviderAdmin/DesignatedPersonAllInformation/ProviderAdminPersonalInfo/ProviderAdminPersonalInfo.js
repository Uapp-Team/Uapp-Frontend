import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import {
  Card,
  CardBody,
  CardHeader,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import { Image } from "antd";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import { rootUrl } from "../../../../../../constants/constants";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import put from "../../../../../../helpers/put";
import get from "../../../../../../helpers/get";
import ProviderAdminNavigation from "../ProviderAdminRegistrationAndNavigation/ProviderAdminNavigation";
import moment from "moment";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const ProviderAdminPersonalInfo = () => {
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [profilePicError, setProfilePicError] = useState(false);
  // Cover Image States
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [activetab, setActivetab] = useState("2");
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [gender, setGender] = useState([]);
  const [genderValue, setGenderValue] = useState(0);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalStatusValue, setMaritalStatusValue] = useState(0);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Dates, SetDate] = useState("");
  const [officerPersonalInfo, setOfficerPersonalInfo] = useState({});
  const [passport, setPassport] = useState("");
  const { providerId, providerAdminId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const userTypeId = localStorage.getItem("userType");

  useEffect(() => {
    get("MaritalStatusDD/Index").then((res) => {
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      setGender(res);
    });

    get(`ProviderAdminInfo/GetPersonalInformation/${providerAdminId}`).then(
      (res) => {
        console.log("personalInfo", res);
        setOfficerPersonalInfo(res);
        setPassport(res?.passportId);
        setGenderValue(res?.genderId !== null ? res?.genderId : 0);
        setMaritalStatusValue(
          res?.maritalStatusId !== null ? res?.maritalStatusId : 0
        );
        SetDate(moment(new Date(res?.dateOfBirth)).format("YYYY-MM-DD"));
      }
    );
  }, [success]);

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const goNext = () => {
    history.push(`/providerAdminContactInfo/${providerId}/${providerAdminId}`);
  };

  const goPrevious = () => {
    history.push(`/providerAdminGeneralInfo/${providerId}/${providerAdminId}`);
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

  // Profile Image Code End

  // Cover Image Code Start

  function getBase64(file) {
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
      file.preview = await getBase64(file.originFileObj);
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

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("providerAdminProfileFile", FileList1[0]?.originFileObj);
    subdata.append("providerAdminCoverFile", FileList2[0]?.originFileObj);

    // for (var value of subdata) {
    //   console.log(value);
    // }

    let CheckFileIsValid = () => {
      if (officerPersonalInfo?.providerAdminProfileMedia == null) {
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

    let IsFormValid = () => {
      if (genderValue == 0) {
        setGenderError(true);
        return false;
      } else if (maritalStatusValue == 0) {
        setMaritalStatusError(true);
        return false;
      } else if (!CheckFileIsValid()) {
        setProfilePicError(true);
        return false;
      } else return true;
    };

    if (IsFormValid()) {
      setButtonStatus(true);
      setProgress(true);
      put("ProviderAdminInfo/PersonalInformation", subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess == true ? "success" : "error",
          autoDismiss: true,
        });
        if (FileList1.length > 0) {
          setFileList1([]);
        }
        if (FileList2.length > 0) {
          setFileList2([]);
        }
        setButtonStatus(false);
      });
    }
  };

  const onGoUniProfile = () => {
    history.push(`/providerAdminProfile/${providerAdminId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Designated Person Information"
        backTo="Provider Admin Profile"
        path="/providerList"
      />

      <Card>
        <CardBody>
          <ProviderAdminNavigation
            activetab={activetab}
            providerId={providerId}
            providerAdminId={providerAdminId}
          />

          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <Form onSubmit={handleSubmit} className="mt-5">
                <input
                  type="hidden"
                  name="id"
                  id="id"
                  value={providerAdminId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Date Of Birth <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      onChange={(e) => SetDate(e.target.value)}
                      defaultValue={Dates}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Passport/ID</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="passportId"
                      id="passportId"
                      placeholder="Enter Passport Number"
                      onChange={(e) => setPassport(e.target.value)}
                      defaultValue={passport}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative my-4">
                  <Col md="2">
                    <span>
                      Gender <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
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
                          checked={genderValue == tt?.id ? true : false}
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

                <FormGroup row className="has-icon-left position-relative my-4">
                  <Col md="2">
                    <span>
                      Marital Status <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
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
                          checked={maritalStatusValue == tt?.id ? true : false}
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

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Phone Number <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      required
                      defaultValue={officerPersonalInfo?.phoneNumber}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Profile Image <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {officerPersonalInfo?.providerAdminProfileMedia !=
                      null ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              officerPersonalInfo?.providerAdminProfileMedia
                                ?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
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
                        <span className="text-danger d-block">{error}</span>
                      </div>
                    </div>

                    {profilePicError && (
                      <span className="text-danger">
                        Profile photo is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Cover Image</span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {officerPersonalInfo?.providerAdminCoverMedia != null ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              officerPersonalInfo?.providerAdminCoverMedia
                                ?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
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
                        <span className="text-danger d-block">{error2}</span>
                      </div>
                    </div>
                  </Col>
                </FormGroup>

                <div className="row">
                  <div className="col-md-8 d-flex justify-content-end">
                    <ButtonForFunction
                      type={"submit"}
                      className={"mt-3 ml-1"}
                      color={"primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      disable={buttonStatus}
                    />
                  </div>
                </div>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ButtonForFunction
                  className={" mt-3 btn-warning"}
                  icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                  name={"Previous"}
                  func={goPrevious}
                />

                <Button.Ripple
                  onClick={goNext}
                  className="mr-1 mt-3 btn-warning"
                >
                  Next
                  <i className="fas fa-arrow-right-long ml-1"></i>
                </Button.Ripple>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAdminPersonalInfo;
