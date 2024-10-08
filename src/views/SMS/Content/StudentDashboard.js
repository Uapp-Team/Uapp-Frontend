import { Image, Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import * as Icon from "react-feather";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import put from "../../../helpers/put";
import { permissionList } from "../../../constants/AuthorizationConstant";

const StudentDashboard = () => {
  const [FileList1, setFileList1] = useState([]);
  const [profilePicError, setProfilePicError] = useState(false);
  const [error, setError] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [livingdata, setLivingData] = useState(null);
  const [livingdata1, setLivingData1] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [oneData, setOneData] = useState({});
  const [progress2, setProgress2] = useState(false);
  const [permanentAsLiving, setPermanentAsLiving] = useState(false);

  const [iframe, setIframe] = useState("");

  const { addToast } = useToasts();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`StudentDashboard/GetValue`).then((res) => {
      console.log("Student Dashboard Data:", res);
      setData(res);
    });
  }, [success]);

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
  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("banner", FileList1[0]?.originFileObj);

    if (FileList1?.length < 1) {
      setProfilePicError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);
      post("StudentDashboard/Create", subdata).then((res) => {
        setProgress(false);
        // setSuccess(!success);
        setIframe("");
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess == true ? "success" : "error",
          autoDismiss: true,
        });
        if (FileList1.length > 0) {
          setFileList1([]);
        }
        setButtonStatus(false);
      });
    }
  };

  const handleUpdateButton = (id) => {
    setShowForm(true);
    get(`StudentDashboard/GetValue`).then((res) => {
      console.log("dashboard data ", res);
      setData(res);
    });
  };

  const handleSubmitDashboard = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("banner", FileList1[0]?.originFileObj);

    setButtonStatus1(true);
    setProgress1(true);
    put(`StudentDashboard/Update`, subData).then((res) => {
      setButtonStatus1(false);
      setProgress1(false);
      if (FileList1.length > 0) {
        setFileList1([]);
      }
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
      setShowForm(false);
      setData({});
    });
  };

  if (showForm == true) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const closeShowForm = () => {
    setData({});

    setShowForm(false);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Student Dashboard Content</h3>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          {data !== null ? (
            <Card>
              <CardBody className="shadow">
                <Row>
                  <Col md="4">
                    <h6 className="bank-account-info-text">Video Frame:</h6>

                    <h5 className="test-score-title-styles">
                      {" "}
                      {data?.videoIframe}{" "}
                    </h5>
                  </Col>

                  <Col md="4">
                    <h6 className="bank-account-info-text">Banner Img:</h6>

                    <img
                      className=""
                      style={{ width: "300px" }}
                      src={rootUrl + data.bannerImage}
                      alt="banner"
                    ></img>
                  </Col>
                  <Col md="4">
                    <Button
                      type="button"
                      color="primary"
                      className="bankCard-style"
                      onClick={() => handleUpdateButton(data?.id)}
                    >
                      {" "}
                      <i className="fas fa-edit"></i>{" "}
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ) : (
            <Form onSubmit={handleSubmit} className="mt-5">
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Become Consultant Banner{" "}
                    <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <div className="row">
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
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        open={previewVisible1}
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
                  <span>
                    Video Iframe <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="textarea"
                    name="videoIframe"
                    id="videoIframe"
                    rows={5}
                    value={iframe}
                    onChange={(e) => setIframe(e.target.value)}
                    placeholder="Write here"
                    required
                  />

                  <div className="text-danger">
                    <span>
                      Note: Please type the "src" link only from the embed video
                    </span>
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
          )}
        </CardBody>
        <CardBody>
          {/* update and particular add form starts here*/}
          {showForm ? (
            <Form
              // id="scrollDown"
              onSubmit={handleSubmitDashboard}
              className="mt-5"
            >
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Update Content</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <input type="hidden" name="id" id="id" value={data?.id} />

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Video Frame<span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    name="videoIframe"
                    id="videoIframe"
                    placeholder="Video Frame"
                    required
                    defaultValue={data?.videoIframe}
                  />
                </Col>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Banner Image <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <div className="row">
                    {data?.bannerImage != null ? (
                      <div className="col-md-3">
                        <Image
                          width={104}
                          height={104}
                          src={rootUrl + data.bannerImage}
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
                          <div className="text-danger" style={{ marginTop: 8 }}>
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
                </Col>
              </FormGroup>

              <FormGroup
                row
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Col md="6">
                  <div style={{ marginLeft: "35px" }} className="ml-xl-5 ml-0">
                    <Button
                      onClick={closeShowForm}
                      className={"mr-1 mt-3"}
                      color="danger"
                    >
                      Cancel
                    </Button>

                    {permissions?.includes(
                      permissionList.Edit_Student
                    ) ? (
                      <ButtonForFunction
                        type={"submit"}
                        name={progress1 ? <ButtonLoader /> : "Save"}
                        className={"mt-3 badge-primary"}
                        disable={buttonStatus1}
                      />
                    ) : null}
                  </div>
                </Col>
                <col md="4"></col>
              </FormGroup>
            </Form>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentDashboard;
