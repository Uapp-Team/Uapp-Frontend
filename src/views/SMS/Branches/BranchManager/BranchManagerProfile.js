import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import { Image, Upload } from "antd";
import * as Icon from "react-feather";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import Loader from "../../Search/Loader/Loader";
import bulb from "../../../../assets/img/bulb.png";
import user from "../../../../assets/img/Uapp_fav.png";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const BranchManagerProfile = () => {
  const { branchManagerId } = useParams();
  const history = useHistory();
  const [manager, setManager] = useState({});

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [text1, setText1] = useState("");
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  const backToBranchProfile = () => {
    history.push(`/branchProfile/${manager?.branchId}`);
  };

  useEffect(() => {
    get(`BranchManager/Get/${branchManagerId}`).then((res) => {
      setManager(res);
      setLoading(false);
    });
  }, [success]);

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();
    setProgress(true);
    const subData = new FormData(event.target);

    subData.append("managerImage", FileList1[0]?.originFileObj);

    setButtonStatus1(true);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      put(`BranchManager/UpdateProfilePhoto`, subData).then((res) => {
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

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Branch Manager Profile"
            backTo="Branch Profile"
            path={`/branchProfile/${manager?.branchId}`}
          />

          <Row>
            <Col md="12">
              <div className="row">
                {permissions?.includes(permissionList.Edit_Branch) ? (
                  <Modal
                    isOpen={modalOpen2}
                    toggle={closeModal1}
                    className="uapp-modal"
                  >
                    <ModalHeader>Update Profile Photo</ModalHeader>

                    <ModalBody>
                      <form onSubmit={handleSubmitProfilePhoto}>
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={branchManagerId}
                        />

                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col className="ml-5" md="4">
                            <span>
                              Profile Photo{" "}
                              <span className="text-danger">*</span>{" "}
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
                                        <span>Upload Image Here</span>
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
                                {progress ? <ButtonLoader /> : "Update"}
                              </Button>
                            </div>
                          </Col>
                        </FormGroup>
                      </form>
                    </ModalBody>
                  </Modal>
                ) : null}

                <div className="col-md-10 col-sm-12">
                  <Card>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6 col-sm-12 left-adm-div">
                          <div className="adm-user-img">
                            {manager?.managerImageMedia == null ? (
                              <img src={user} alt="admission_manager_media" />
                            ) : (
                              <img
                                src={
                                  rootUrl +
                                  manager?.managerImageMedia?.thumbnailUrl
                                }
                                alt="branch_manager_media"
                              />
                            )}

                            {permissions?.includes(
                              permissionList.Edit_Branch
                            ) ? (
                              <span
                                className="edit1-adm"
                                onClick={updateProfilePic}
                              >
                                <i
                                  className="fas fa-camera"
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                </i>
                              </span>
                            ) : null}
                          </div>

                          <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                            <p className="adm-user-title">
                              {manager?.nameTittle?.name} {manager?.firstName}{" "}
                              {manager?.lastName}{" "}
                            </p>

                            <p>
                              <span className="adm-provider-css">Branch: </span>
                              <span
                                className="adm-provider-css-name"
                                onClick={() => {
                                  history.push(
                                    `/branchProfile/${manager?.branchId}`
                                  );
                                }}
                              >
                                {manager?.branch?.name}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-12 right-adm-div">
                          <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                            <div className="mb-1">
                              <span className="adm-provider-css-name2">
                                {manager?.email}
                              </span>
                            </div>

                            <div className="mb-1">
                              <span className="adm-provider-css-name2">
                                {manager?.phoneNumber}
                              </span>
                            </div>

                            <div className="mb-1">
                              <span className="adm-provider-css">
                                {manager?.branch?.addressLine}
                              </span>
                            </div>
                          </div>

                          <div className="adm-user-img2">
                            <img src={bulb} alt="admission_manager_media" />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="col-md-2 col-sm-0"></div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default BranchManagerProfile;
