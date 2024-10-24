import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  Button,
  Input,
  Col,
  Form,
  FormGroup,
} from "reactstrap";
import loader from "../../../../../assets/img/load.gif";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";
import Select from "react-select";
import { useHistory } from "react-router";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import { userTypes } from "../../../../../constants/userTypeConstant";
import CustomButtonRipple from "../../../Components/CustomButtonRipple";
import post from "../../../../../helpers/post";
import { rootUrl } from "../../../../../constants/constants";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const AddNewAdmissionOfficerPage = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);
  const [nameTitleError, setNameTitleError] = useState(false);
  const [providerDD, setProviderDD] = useState([]);
  const [providerLabel, setProviderLabel] = useState("Select Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [providerError, setProviderError] = useState(false);
  const [managerDDForm, setManagerDDForm] = useState([]);
  const [managerFormLabel, setManagerFormLabel] = useState(
    "Select Admission Manager"
  );
  const [managerFormValue, setManagerFormValue] = useState(0);
  const [managerFormError, setManagerFormError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [officerObj, setOfficerObj] = useState({});
  const [selectedId, setSelectedId] = useState(undefined);
  const history = useHistory();
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(false);
  const [mId, setMId] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
      setLoading(false);
    });

    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
      setLoading(false);
    });

    get("ProviderDD/Index").then((res) => {
      setProviderDD(res);
      setLoading(false);
    });
  }, []);

  const handlePass = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

  const managerMenuForm = managerDDForm.map((managerForm) => ({
    label: managerForm?.name,
    value: managerForm?.id,
  }));

  const selectManagerForm = (label, value) => {
    setManagerFormError(false);
    setManagerFormLabel(label);
    setManagerFormValue(value);
  };

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // Trial start

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
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError("");
    }
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setCountryError(false);
    setUniStateLabel("Select State");
    setUniStateValue(0);
  };

  const nameTitleMenu = nameTitleDD?.map((nameTitle) => ({
    label: nameTitle?.name,
    value: nameTitle?.id,
  }));

  //   select name title
  const selectNameTitle = (label, value) => {
    setNameTitleError(false);
    setNameTitleLabel(label);
    setNameTitleValue(value);
  };

  const providerMenu = providerDD?.map((provider) => ({
    label: provider?.name,
    value: provider?.id,
  }));

  //   select provider
  const selectProvider = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
    setManagerFormLabel("Select Admission Manager");
    setManagerFormValue(0);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setManagerDDForm(res);
    });
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  // on Close Modal
  const closeModal = () => {
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append(
      "admissionOfficerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    if (nameTitleValue === 0) {
      setNameTitleError(true);
    } else if (pass.length < 6) {
      setPassError("Password length can not be less than six digits");
    } else if (emailError == false) {
      setEmailError(emailError);
    } else if (uniCountryValue === 0) {
      setCountryError(true);
    } else if (providerValue === 0 && selectedId === undefined) {
      setProviderError(true);
    } else if (managerFormValue === 0 && selectedId === undefined) {
      setManagerFormError(true);
    } else {
      setOfficerObj({});
      setButtonStatus(true);
      setProgress(true);
      post(`AdmissionOfficer/Create`, subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess == true) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });

          history.push(`/admissionOfficerList`);
        } else {
          addToast(res.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleEmail = (e) => {
    get(`Consultant/OnChangeEmail/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  return (
    <div>
      <BreadCrumb title="Admission Officer Information" backTo="" path="" />
      {loading ? (
        <div className="text-center">
          <img src={loader} alt="" className="img-fluid" />
        </div>
      ) : (
        <div>
          <Card className="uapp-employee-search">
            <CardBody>
              <Form onSubmit={handleSubmit} className="mt-5">
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      Title <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={nameTitleMenu}
                      value={{
                        label: nameTitleLabel,
                        value: nameTitleValue,
                      }}
                      onChange={(opt) => selectNameTitle(opt.label, opt.value)}
                      name="nameTittleId"
                      id="nameTittleId"
                    />
                    {nameTitleError ? (
                      <span className="text-danger">Title is required</span>
                    ) : null}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      First Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      defaultValue={officerObj?.firstName}
                      placeholder="Type First Name"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      Last Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      defaultValue={officerObj?.lastName}
                      placeholder="Type Last Name"
                      required
                    />
                  </Col>
                </FormGroup>

                {selectedId === undefined ? (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="3">
                      <span>
                        Email <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        onBlur={handleEmail}
                        defaultValue={officerObj?.email}
                        placeholder="Type Your Email"
                        required
                      />
                      {!emailError ? (
                        <span className="text-danger">
                          Email already exists.
                        </span>
                      ) : null}
                    </Col>
                  </FormGroup>
                ) : null}

                {selectedId != undefined ? null : (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="3">
                      <span>
                        Password <span className="text-danger">*</span>
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Type Your Password"
                        required
                        onChange={handlePass}
                      />
                      <span className="text-danger">{passError}</span>
                    </Col>
                  </FormGroup>
                )}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      Phone Number <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      defaultValue={officerObj?.phoneNumber}
                      placeholder="Type Your Phone Number"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={countryDD}
                      value={{
                        label: uniCountryLabel,
                        value: uniCountryValue,
                      }}
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="countryId"
                      id="countryId"
                    />
                    {countryError ? (
                      <span className="text-danger">Country is required</span>
                    ) : null}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>State/County</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="stateName"
                      id="stateName"
                      placeholder="Type Your State/County"
                      defaultValue={officerObj?.stateName}
                    />
                  </Col>
                </FormGroup>

                {userType == userTypes?.ProviderAdmin ? (
                  <input
                    type="hidden"
                    name="providerId"
                    id="providerId"
                    value={mId}
                  />
                ) : (
                  <>
                    {selectedId != undefined ? null : (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            Provider <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Select
                            options={providerMenu}
                            value={{
                              label: providerLabel,
                              value: providerValue,
                            }}
                            onChange={(opt) =>
                              selectProvider(opt.label, opt.value)
                            }
                            name="providerId"
                            id="providerId"
                          />

                          {providerError ? (
                            <span className="text-danger">
                              Provider is required
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                    )}
                  </>
                )}

                {selectedId != undefined ? null : (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="3">
                      <span>
                        Admission Manager <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={managerMenuForm}
                        value={{
                          label: managerFormLabel,
                          value: managerFormValue,
                        }}
                        onChange={(opt) =>
                          selectManagerForm(opt.label, opt.value)
                        }
                        name="admissionmanagerId"
                        id="admissionmanagerId"
                      />

                      {managerFormError ? (
                        <span className="text-danger">
                          Admission manager is required
                        </span>
                      ) : null}
                    </Col>
                  </FormGroup>
                )}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      City <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={officerObj?.city}
                      placeholder="Type City Name"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>
                      Post Code <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="postCode"
                      id="postCode"
                      defaultValue={officerObj?.postCode}
                      placeholder="Type Post Code"
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="3">
                    <span>Image</span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {officerObj?.id ? (
                        <div className="col-md-3 mr-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              officerObj?.admissionOfficerMedia?.fileUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
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
                          <span className="text-danger d-block">{error}</span>
                        </>
                      </div>
                    </div>
                  </Col>
                </FormGroup>

                <div className="row">
                  <div className="col-md-9">
                    <div className="d-flex justify-content-end">
                      <Button
                        color="danger"
                        className="mr-1 mt-3"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>

                      <CustomButtonRipple
                        color={"primary"}
                        type={"submit"}
                        className={"ml-1 mt-3"}
                        name={progress ? <ButtonLoader /> : "Submit"}
                        permission={6}
                        isDisabled={buttonStatus}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddNewAdmissionOfficerPage;
