import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Form,
  Input,
  Row,
} from "reactstrap";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { Image } from "antd";
import { rootUrl } from "../../../../constants/constants";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../components/buttons/SaveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BranchManagerInformation = () => {
  const { branchId, managerId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const [branchManagerInfo, setBranchManagerInfo] = useState({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [title, setTitle] = useState([]);
  // const [titleLabel, setTitleLabel] = useState("Select");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  const [text, setText] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [phoneNumberError, setphoneNumberError] = useState(false);

  useEffect(() => {
    get(`BranchManager/Get/${managerId}`).then((res) => {
      setBranchManagerInfo(res);
      // setTitleLabel(res?.nameTittle?.name);
      setTitleValue(res?.nameTittle?.id);
      setfirstName(res?.firstName);
      setlastName(res?.lastName);
      setphoneNumber(res?.phoneNumber);
    });

    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });
  }, [managerId]);

  const handleFirstName = (e) => {
    let data = e.target.value.trimStart();
    setfirstName(data);
    if (data === "") {
      setfirstNameError(true);
    } else {
      setfirstNameError(false);
    }
  };

  const handleLastName = (e) => {
    let data = e.target.value.trimStart();
    setlastName(data);
    if (data === "") {
      setlastNameError(true);
    } else {
      setlastNameError(false);
    }
  };

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNumberError(true);
    } else {
      setphoneNumberError(false);
    }
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
    }
  };

  sessionStorage.setItem("BranchManagerId", branchManagerInfo?.id);

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isFormValid = false;
      setfirstNameError(true);
    }
    if (!lastName) {
      isFormValid = false;
      setlastNameError(true);
    }

    if (!phoneNumber) {
      isFormValid = false;
      setphoneNumberError(true);
    }

    return isFormValid;
  };

  const handleUpdateManagerInformation = (e) => {
    e.preventDefault();

    const subData = new FormData(e.target);
    subData.append("phoneNumber", phoneNumber);
    subData.append("managerImage", FileList[0]?.originFileObj);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (validateRegisterForm()) {
      setButtonStatus(true);
      setProgress(true);

      put(`BranchManager/Update`, subData, config).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.go(-1);
          // history.push(`/branchProfile/${branchManagerInfo?.branchId}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        setButtonStatus(false);
        setProgress(false);
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Branch Admin Information"
        // backTo="Branch Profile"
        // path={`/branchProfile/${branchId}`}
      />

      <Card>
        <CardBody>
          <p className="section-title">Update Admin Information</p>
          <Form className="mt-4" onSubmit={handleUpdateManagerInformation}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={branchManagerInfo?.id}
            />
            <input
              type="hidden"
              name="email"
              id="email"
              value={branchManagerInfo?.email}
            />

            <input
              type="hidden"
              name="branchId"
              id="branchId"
              value={branchManagerInfo?.branchId}
            />

            <Row>
              <Col lg="6" md="8">
                <FormGroup>
                  <span>
                    Title <span className="text-danger">*</span>{" "}
                  </span>

                  <div>
                    {title?.map((tt) => (
                      <>
                        <input
                          type="radio"
                          name="nameTittleId"
                          id="nameTittleId"
                          value={tt?.id}
                          onChange={() => {
                            setTitleValue(tt?.id);
                            setTitleError(false);
                          }}
                          checked={titleValue === tt?.id ? true : false}
                        />

                        <label
                          className="mr-3"
                          style={{ fontWeight: 500, fontSize: "14px" }}
                        >
                          {tt?.name}
                        </label>
                      </>
                    ))}
                  </div>

                  {titleError && (
                    <span className="text-danger">Title is required</span>
                  )}
                </FormGroup>
                <FormGroup>
                  <span>
                    First Name <span className="text-danger">*</span>
                  </span>

                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => {
                      handleFirstName(e);
                    }}
                  />
                  {firstNameError && (
                    <span className="text-danger">First Name required</span>
                  )}
                </FormGroup>
                <FormGroup>
                  <span>
                    Last Name <span className="text-danger">*</span>{" "}
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => {
                      handleLastName(e);
                    }}
                  />
                  {lastNameError && (
                    <span className="text-danger">Last Name required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <span>
                    Phone Number <span className="text-danger">*</span>
                  </span>

                  <PhoneInput
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

                  {phoneNumberError && (
                    <span className="text-danger">Phone Number required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <span>
                    Manager Image <span className="text-danger">*</span>{" "}
                  </span>

                  <div className="d-flex">
                    {branchManagerInfo?.managerImageMedia !== null ? (
                      <div className="me-2">
                        <Image
                          width={104}
                          height={104}
                          src={
                            rootUrl +
                            branchManagerInfo?.managerImageMedia?.fileUrl
                          }
                        />
                      </div>
                    ) : null}

                    <div className="ml-2">
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

                      <span className="text-danger d-block">{text}</span>
                    </div>
                  </div>
                </FormGroup>

                {/* <FormGroup>
                  <span>
                    Manager Image <span className="text-danger">*</span>{" "}
                  </span>

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

                  <span className="text-danger d-block">{text}</span>

                  {imageError ? (
                    <span className="text-danger">Image is required</span>
                  ) : null}
                </FormGroup> */}

                <FormGroup className="text-right">
                  <SaveButton
                    text="submit"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </FormGroup>
              </Col>
            </Row>

            {/* <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Title <span className="text-danger">*</span>{" "}
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
                  placeholder="Enter branch name"
                  required
                  defaultValue={branchManagerInfo?.firstName}
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
                  placeholder="Enter branch name"
                  required
                  defaultValue={branchManagerInfo?.lastName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Phone Number <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={branchManagerInfo?.phoneNumber}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Manager Image <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
                <div className="d-flex">
                  {branchManagerInfo?.managerImageMedia !== null ? (
                    <div className="me-2">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          branchManagerInfo?.managerImageMedia?.fileUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="ml-2">
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

                    <span className="text-danger d-block">{text}</span>
                  </div>
                </div>
              </Col>
            </FormGroup>

            <FormGroup
              row
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Col md="6">
                <div className="d-flex justify-content-end">
                  <Button
                    className="mt-3 mr-1"
                    color="danger"
                    onClick={() => {
                      history.push(`/branchProfile/${branchId}`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button.Ripple
                    type="submit"
                    className="ml-1 mt-3 badge-primary"
                  >
                    {progress ? <ButtonLoader /> : "Submit"}
                  </Button.Ripple>
                </div>
              </Col>
            </FormGroup> */}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BranchManagerInformation;
