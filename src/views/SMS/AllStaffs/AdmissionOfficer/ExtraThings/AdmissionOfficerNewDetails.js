import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";
import { Upload } from "antd";
import * as Icon from "react-feather";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../../constants/constants";
import ButtonLoader from "../../../Components/ButtonLoader";
import Loader from "../../../Search/Loader/Loader";
import bulb from "../../../assets/img/bulb.png";
import user from "../../../assets/img/Uapp_fav.png";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerNewDetails = () => {
  const [officerObj, setOfficerObj] = useState({});
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");
  const [success, setSuccess] = useState(false);
  const [admissionManagerList, setAdmissionManagerList] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const officerId = localStorage.getItem("referenceId");
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`AdmissionOfficer/Profile/${officerId}`).then((res) => {
      setOfficerObj(res);
      setAdmissionManagerList(res?.admissionManager);

      setLoading(false);
    });
  }, [officerId, success]);

  const backToAdmissionofficerList = () => {
    // if(location.managerId != undefined && location.providerId != undefined){
    //     history.push(`/providerAdmissionManager/${location.managerId}/${location.providerId}`)
    // }
    // else{
    //     history.push("/admissionOfficerList");
    // }
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  const handlRedirectToAdmissionManagerDetails = (manager) => {
    history.push({
      pathname: `/providerAdmissionManager/${manager?.id}/${officerObj?.providerId}`,
      officerId: officerId,
    });
  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

    subData.append("profileImage", FileList1[0]?.originFileObj);

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setButtonStatus1(true);
      setProgress(true);
      put(`AdmissionOfficer/UpdateProfilePhoto`, subData).then((res) => {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Admission Officer Details"
            backTo={
              location.managerId != undefined &&
              location.providerId != undefined
                ? "Admission Manager Details"
                : " Admission Officer"
            }
            path={`/admissionOfficerList`}
          />

          <div className="row">
            <div className="col-md-9 col-sm-12">
              {permissions?.includes(
                permissionList.Update_AdmissionOfficer
              ) ? (
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
                        value={officerId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col className="ml-5" md="4">
                          <span>
                            Profile Photo <span className="text-danger">*</span>{" "}
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

              <Card>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 left-adm-div">
                      <div className="adm-user-img">
                        {officerObj?.admissionOfficerMedia?.thumbnailUrl ==
                        null ? (
                          <img src={user} alt="admission_manager_media" />
                        ) : (
                          <img
                            src={
                              rootUrl +
                              officerObj?.admissionOfficerMedia?.thumbnailUrl
                            }
                            alt="admission_manager_media"
                          />
                        )}

                        {permissions?.includes(
                          permissionList.Update_AdmissionOfficer
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
                          {officerObj?.nameTittleName} {officerObj?.firstName}{" "}
                          {} {officerObj?.lastName}{" "}
                        </p>

                        <p>
                          <span className="adm-provider-css">Provider: </span>
                          <span
                            className="adm-provider-css-name"
                            onClick={() => {
                              history.push(
                                `/providerDetails/${officerObj?.providerId}`
                              );
                            }}
                          >
                            {officerObj?.providerName}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-12 right-adm-div">
                      <div className="adm-manager-user-info ml-md-5 ml-ms-0">
                        <div className="mb-1">
                          <span className="adm-provider-css-name2">
                            {officerObj?.email}
                          </span>
                        </div>

                        <div className="mb-1">
                          <span className="adm-provider-css-name2">
                            {officerObj?.phoneNumber}
                          </span>
                        </div>

                        <div className="mb-1">
                          <span className="adm-provider-css">
                            {officerObj?.stateName}
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

            <div className="col-md-3 col-sm-12"></div>
          </div>

          <div className=" info-item mt-4">
            <div className="row">
              <div className="col-md-9 col-sm-12">
                <Card style={{ height: "300px" }}>
                  <CardBody>
                    <div className="hedding-titel d-flex justify-content-between">
                      <div>
                        <h5>
                          {" "}
                          <b>Assigned Universities</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                    </div>

                    <div className="table-responsive pt-3">
                      <Table className="table-sm striped" style={tableStyle}>
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            <th>#</th>
                            <th>Accept EU_UK</th>
                            <th>Accept Home</th>
                            <th>Accept International</th>
                            <th>Name</th>
                            <th>Short Name</th>
                            <th>City</th>
                            <th>Founded</th>
                            <th>Global Ranking</th>
                            <th>Part Time Work Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          {officerObj?.admissionOfficerUniversities?.map(
                            (uni, i) => (
                              <tr key={i} style={{ textAlign: "center" }}>
                                <th scope="row">{1 + i}</th>
                                <td>
                                  {uni?.isAcceptEU_UK ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>
                                  {uni?.isAcceptHome ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>
                                  {uni?.isAcceptInternational ? (
                                    <span>True</span>
                                  ) : (
                                    <span>False</span>
                                  )}
                                </td>

                                <td>{uni?.university?.name}</td>

                                <td>{uni?.university?.shortName}</td>

                                <td>{uni?.university?.universityCity}</td>

                                <td>{uni?.university?.foundationYear}</td>

                                <td>{uni?.university?.globalRankNumber}</td>
                                <td>
                                  {uni?.university?.partTimeWorkInformation}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="col-md-3 col-sm-12">
                <Card className="container">
                  <div className="hedding-titel d-flex justify-content-between ms-1 pt-3">
                    <div>
                      <h5>
                        {" "}
                        <b>Admission Managers</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>
                  <div style={{ height: "230px", overflowY: "scroll" }}>
                    {admissionManagerList?.map((manager, i) => (
                      <div key={i} className="rounded mt-3">
                        <div className="d-flex justify-content-between mt-4">
                          <div>
                            {permissions?.includes(
                              permissionList.View_Admission_manager_info
                            ) ? (
                              <div className="cursor-pointer hyperlink-hover">
                                <span
                                  onClick={() =>
                                    handlRedirectToAdmissionManagerDetails(
                                      manager
                                    )
                                  }
                                >
                                  {manager?.nameTittleName} {manager?.firstName}{" "}
                                  {manager?.lastName}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span>
                                  {manager?.nameTittleName} {manager?.firstName}{" "}
                                  {manager?.lastName}
                                </span>
                              </div>
                            )}

                            <span>{manager?.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className=" info-item mt-4">
            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between">
                  <div>
                    <h5>
                      {" "}
                      <b>Assigned Courses</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                </div>

                <div className="table-responsive pt-3">
                  <Table className="table-sm striped" style={tableStyle}>
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        <th>#</th>
                        <th>Course</th>
                        <th>University</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officerObj?.assignedSubjects?.map((sub, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <th scope="row">{1 + i}</th>
                          <td>{sub?.subjectName}</td>

                          <td>
                            {sub?.universityShortName} -{" "}
                            {sub?.universityFullName}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionOfficerNewDetails;
