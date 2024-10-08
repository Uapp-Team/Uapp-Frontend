import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Form,
  Button,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const BranchManager = () => {
  const { branchId } = useParams();
  const history = useHistory();
  const [submitData, setSubmitData] = useState(false);

  const [branchManagerInfo, setBranchManagerInfo] = useState({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [check, setCheck] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  const [emailError, setEmailError] = useState(true);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  const [text, setText] = useState("");

  const backToBranchList = () => {
    history.push("/branchList");
  };

  const handlePass = (e) => {
    setPass(e.target.value);
    setPassError("");
  };

  const { addToast } = useToasts();

  useEffect(() => {
    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });
  }, []);

  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));

  // select  Title
  const selectTitle = (label, value) => {
    setTitleError(false);
    setTitleLabel(label);
    setTitleValue(value);
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

  const AuthStr = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append(
      "managerImage",
      FileList.length > 0 ? FileList[0].originFileObj : null
    );
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: AuthStr,
      },
    };

    if (titleValue == 0) {
      setTitleError(true);
    } else if (emailError == false) {
      setEmailError(emailError);
    } else if (pass?.length < 6) {
      setPassError("Password length can not be less than six digits");
    } else if (FileList.length < 1 && check) {
      setImageError(true);
    } else {
      setButtonStatus(true);
      Axios.post(`${rootUrl}BranchManager/Create`, subdata, config).then(
        (res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            setSubmitData(true);

            history.push(`/branchProfile/${branchId}`);
          } else if (res?.status == 200 && res?.data?.isSuccess == false)
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });

          setSubmitData(true);
        }
      );
    }
  };

  const handleEmail = (e) => {
    get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
      setEmailError(res);
    });
  };

  return (
    <div>
      <div>
        <BreadCrumb
          title="Add Branch Manager Information"
          backTo="Branch"
          path={`/branchList`}
        />
        <Card>
          <CardBody>
            <Form className="mt-5" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="branchId"
                id="branchId"
                value={branchId}
              />

              <FormGroup row className="has-icon-left position-relative">
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
                    placeholder="Enter Last Name"
                    required
                    defaultValue={branchManagerInfo?.lastName}
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
                    defaultValue={branchManagerInfo?.email}
                    onBlur={handleEmail}
                  />
                  {!emailError ? (
                    <span className="text-danger">Email already exists</span>
                  ) : null}
                </Col>
              </FormGroup>

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
                    defaultValue={branchManagerInfo?.password}
                    onChange={handlePass}
                  />
                  <span className="text-danger">{passError}</span>
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
                    placeholder="Enter Phone Number"
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
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={() => {
                        history.push(`/branchProfile/${branchId}`);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="ml-1 mt-3 badge-primary"
                      disabled={buttonStatus}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
                <ToastContainer />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BranchManager;
