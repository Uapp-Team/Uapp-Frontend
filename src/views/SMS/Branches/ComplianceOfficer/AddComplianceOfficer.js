import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import { Image, Modal, Upload } from "antd";
import * as Icon from "react-feather";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddComplianceOfficer = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { complianceOfficerId } = useParams();

  const [submitData, setSubmitData] = useState(false);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [stateLabel, setStateLabel] = useState("Select State");
  const [stateValue, setStateValue] = useState(0);
  const [country, setCountry] = useState([]);
  const [officerInfo, setOfficerInfo] = useState({});
  const location = useLocation();

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);

  const [countryError, setCountryError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtoStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    get(`CountryDD/Index`).then((res) => {
      setCountry(res);
    });

    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });

    get("BranchDD/index").then((res) => {
      setBranch(res);
    });

    if (complianceOfficerId !== undefined) {
      get(`ComplianceOfficer/Get/${complianceOfficerId}`).then((res) => {
        setOfficerInfo(res);
        console.log("complianceManagerData", res);
        setCountryLabel(res?.country?.name);
        setCountryValue(res?.country.id);
        setStateLabel(res?.state?.name);
        setStateValue(res?.state?.id);
        setTitleLabel(res?.nameTittle?.name);
        setTitleValue(res?.nameTittle?.id);
        setBranchLabel(res?.branch?.name);
        setBranchValue(res?.branch?.id);
      });
    }
  }, []);

  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  // select University Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);

    setStateLabel("Select State");
  };

  // select  Title
  const selectTitle = (label, value) => {
    setTitleError(false);
    setTitleLabel(label);
    setTitleValue(value);
  };

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const backToCompOfficerList = () => {
    history.push("/complianceOfficerList");
  };

  const AuthStr = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    subdata.append(
      "complianceOfficerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    if (titleValue == 0) {
      setTitleError(true);
    } else if (branchValue == 0) {
      setBranchError(true);
    } else if (countryValue == 0) {
      setCountryError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else {
      if (complianceOfficerId) {
        setButtoStatus(true);
        setProgress(true);
        put("ComplianceOfficer/Update", subdata).then((res) => {
          setButtoStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSubmitData(true);
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: "/complianceOfficerList",
            });
          }
        });
      } else {
        setButtoStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}ComplianceOfficer/Create`, subdata, {
          headers: {
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtoStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSubmitData(true);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            history.push(`/complianceOfficerList`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleEmail = (e) => {
    get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Compliance Officer Information"
        backTo="Compliance Officer List"
        path="/complianceOfficerList"
      />
      <Card>
        <CardBody>
          <div>
            <Form className="mt-5" onSubmit={handleSubmit}>
              {complianceOfficerId ? (
                <Input
                  type="hidden"
                  value={complianceOfficerId}
                  name="id"
                  id="id"
                />
              ) : null}

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Title <span className="text-danger">*</span>
                  </span>
                </Col>
                <Col md="4">
                  <Select
                    options={nameTitle}
                    value={{ label: titleLabel, value: titleValue }}
                    onChange={(opt) => selectTitle(opt.label, opt.value)}
                    name="nameTittleId"
                    id="nameTittleId"
                    required
                  />

                  {titleError && (
                    <span className="text-danger">Title is required</span>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    First Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    required
                    defaultValue={officerInfo?.firstName}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Last Name <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    required
                    defaultValue={officerInfo?.lastName}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Email <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="4">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                    defaultValue={officerInfo?.email}
                    onBlur={handleEmail}
                  />
                  {!emailError ? (
                    <span className="text-danger">Email already exists</span>
                  ) : null}
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>Phone Number</span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    defaultValue={officerInfo?.phoneNumber}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>Post Code</span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="postCode"
                    id="postCode"
                    placeholder="Enter Post Code"
                    defaultValue={officerInfo?.postCode}
                  />
                </Col>
              </FormGroup>

              {complianceOfficerId ? null : (
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Password <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      required
                      //   defaultValue={branchInfo?.branchCode}
                    />
                  </Col>
                </FormGroup>
              )}

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Branch <span className="text-danger">*</span>
                  </span>
                </Col>
                <Col md="4">
                  <Select
                    options={branchOptions}
                    value={{ label: branchLabel, value: branchValue }}
                    onChange={(opt) => selectBranch(opt.label, opt.value)}
                    name="BranchId"
                    id="BranchId"
                  />

                  {branchError && (
                    <span className="text-danger">Branch is required</span>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Country <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="4">
                  <Select
                    options={countryName}
                    value={{ label: countryLabel, value: countryValue }}
                    onChange={(opt) => selectCountry(opt.label, opt.value)}
                    name="countryId"
                    id="countryId"
                    required
                  />
                  {countryError ? (
                    <span className="text-danger">Country is required</span>
                  ) : null}
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>State/County</span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="stateName"
                    id="stateName"
                    placeholder="Enter State/County"
                    defaultValue={officerInfo?.stateName}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    City <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="4">
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter City Name"
                    required
                    defaultValue={officerInfo?.city}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>Image</span>
                </Col>
                <Col md="4">
                  <div className="row">
                    {officerInfo?.complianceOfficerMedia ? (
                      <div className="col-md-4">
                        <Image
                          width={104}
                          height={104}
                          src={
                            rootUrl +
                            officerInfo?.complianceOfficerMedia?.thumbnailUrl
                          }
                        />
                      </div>
                    ) : null}
                    <div className="col-md-4">
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
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Image Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        open={previewVisible}
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
                    </div>
                  </div>
                  <span className="text-danger d-block">{error}</span>
                </Col>
              </FormGroup>

              <div className="row">
                <div className="col-md-6 d-flex justify-content-end">
                  <Button
                    color="danger"
                    className="mr-1 mt-3"
                    onClick={backToCompOfficerList}
                  >
                    Cancel
                  </Button>

                  <ButtonForFunction
                    type={"submit"}
                    className={"ml-1 mt-3 badge-primary"}
                    name={progress ? <ButtonLoader /> : "Submit"}
                    permission={6}
                    disable={buttonStatus}
                  />
                </div>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddComplianceOfficer;
