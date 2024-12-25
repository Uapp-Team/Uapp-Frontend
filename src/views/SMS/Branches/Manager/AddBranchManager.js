import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Form,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../components/buttons/SaveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BranchNavbar from "../Branch/BranchNavbar";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import { Image } from "antd";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddBranchManager = () => {
  const { branchId } = useParams();
  const history = useHistory();
  const activetab = "2";

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [imageError, setImageError] = useState(false);

  const [title, setTitle] = useState([]);
  // const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  // const [emailError, setEmailError] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [text, setText] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");
  const [branchManager, setBranchManager] = useState({});
  const [branchManagerId, setBranchManagerId] = useState(0);
  const { addToast } = useToasts();
  const [emailExistError, setEmailExistError] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });

    get(`BranchManager/GetbyBranch/${branchId}`).then((res) => {
      setBranchManager(res);
      setTitleValue(res?.nameTittle?.id == null ? 0 : res?.nameTittle?.id);
      setfirstName(res?.firstName);
      setlastName(res?.lastName);
      setemail(res?.email);
      setphoneNumber(res?.phoneNumber);
      setBranchManagerId(res?.id);
      console.log(res, "sakib");
    });
  }, []);

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

  const handleEmail = (e) => {
    let data = e.target.value.trimStart();
    setemail(data);
    if (data === "") {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)) {
      setEmailError("Email is not valid");
    } else {
      get(`EmailCheck/EmailCheck/${data}`).then((res) => {
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  const handlePassword = (e) => {
    let data = e.target.value;
    setpassword(data);
    if (data === "") {
      setpasswordError("Password is required");
    } else if (data.length < 6) {
      setpasswordError("Password length can not be less than six digits");
    } else {
      setpasswordError("");
    }
  };

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNumberError("Phone Number required");
    } else if (value?.length < 9) {
      setphoneNumberError("Phone number required minimum 9 digit");
    } else {
      setphoneNumberError("");
    }
  };

  //  Manager Image COde Start

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
    //  setFileList(fileList);
    setImageError(false);

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

  // manager Image code end

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

    if (!email) {
      isFormValid = false;
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }

    // if (emailExistError === false) {
    //   isFormValid = false;
    //   setEmailExistError(emailExistError);
    // }

    if (branchManagerId === 0 || branchManagerId === undefined) {
      if (!password) {
        isFormValid = false;
        setpasswordError("Password is required");
      } else if (password.length < 6) {
        setpasswordError("Password length can not be less than six digits");
      }
    }

    if (!phoneNumber) {
      isFormValid = false;
      setphoneNumberError("Phone Number required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNumberError("Phone number required minimum 9 digit");
    }

    // if (branchManagerId === 0) {
    //   if (FileList.length < 1) {
    //     isFormValid = false;
    //     setImageError(true);
    //   }
    // }

    if (branchManager?.managerImageMedia == null && FileList.length < 1) {
      isFormValid = false;
      setImageError(true);
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    subdata.append("phoneNumber", phoneNumber);
    subdata.append("managerImage", FileList[0]?.originFileObj);

    if (validateRegisterForm()) {
      if (branchManager?.branchId) {
        setButtonStatus(true);
        setProgress(true);
        put("BranchManager/Update", subdata).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
          }
          setButtonStatus(false);
          setProgress(false);
          history.push(`/addBranchConsultant/${branchId}`);
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`BranchManager/Create`, subdata).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            history.push(`/addBranchConsultant/${branchId}`);
          } else if (res?.status === 200 && res?.data?.isSuccess === false)
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          setButtonStatus(false);
          setProgress(false);
        });
      }
    }
  };

  return (
    <div>
      <div>
        <BranchNavbar
          activeTab={activetab}
          branchId={branchId}
        />
        <Card>
          <CardBody>
            <TabContent activeTab={activetab}>
              <TabPane tabId="2">
                {" "}
                <p className="section-title">Admin Information</p>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="branchId"
                    id="branchId"
                    value={branchId}
                  />
                  {branchManagerId !== 0 ? (
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={branchManagerId}
                    />
                  ) : (
                    <input type="hidden" name="id" id="id" value={0} />
                  )}
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
                          <span className="text-danger">
                            First Name required
                          </span>
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
                          <span className="text-danger">
                            Last Name required
                          </span>
                        )}
                      </FormGroup>

                      {branchManagerId === 0 ||
                      branchManagerId === undefined ? (
                        <FormGroup>
                          <span>
                            Email <span className="text-danger">*</span>
                          </span>

                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => {
                              handleEmail(e);
                            }}
                          />

                          <span className="text-danger">{emailError}</span>
                        </FormGroup>
                      ) : (
                        <FormGroup>
                          <span>
                            Email <span className="text-danger">*</span>
                          </span>

                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Email Address"
                            value={email}
                          />
                        </FormGroup>
                      )}

                      {branchManagerId === 0 ||
                      branchManagerId === undefined ? (
                        <FormGroup>
                          <span>
                            Password <span className="text-danger">*</span>{" "}
                          </span>

                          <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => {
                              handlePassword(e);
                            }}
                          />

                          <span className="text-danger">{passwordError}</span>
                        </FormGroup>
                      ) : null}

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

                        <span className="text-danger">{phoneNumberError}</span>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          {" "}
                          <span>
                            Admin Image <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="5">
                          <div className="row">
                            {branchManager?.managerImageMedia?.fileUrl ? (
                              <div className="col-md-6 pb-2 pr-3">
                                <Image
                                  width={104}
                                  height={104}
                                  src={
                                    rootUrl +
                                    branchManager?.managerImageMedia?.fileUrl
                                  }
                                />
                              </div>
                            ) : null}

                            <div className="col-md-6 pb-2 pr-3">
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
                                    {/* <br />
                                  <span>Upload Here</span> */}
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

                              {imageError ? (
                                <span className="text-danger">
                                  Image is required
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col md="4" className="pt-4">
                          <span className="text-gray">
                            File size less than 2MB, keep visual elements
                            centered
                          </span>
                        </Col>
                        {/* 
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
                        </Modal> */}
                      </FormGroup>

                      {permissions?.includes(permissionList.Edit_Branch) ? (
                        <FormGroup className="text-right">
                          <SaveButton
                            text="submit"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        </FormGroup>
                      ) : null}
                    </Col>
                  </Row>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddBranchManager;
