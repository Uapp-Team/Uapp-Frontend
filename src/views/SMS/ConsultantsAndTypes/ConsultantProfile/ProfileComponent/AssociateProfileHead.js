import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import * as Icon from "react-feather";
import uapploader from "../../../../../assets/img/profile-img.png";
import profileCover from "../../../../../assets/img/profile-cover.png";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  Row,
} from "reactstrap";

import { useHistory } from "react-router";

import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import put from "../../../../../helpers/put";

import ButtonLoader from "../../../Components/ButtonLoader";

import { userTypes } from "../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const AssociateProfileHead = ({ id }) => {
  const [headData, setHeadData] = useState({});
  const [success, setSuccess] = useState(false);
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (id !== undefined) {
      get(`Associate/ProfileHead/${id}`).then((res) => {
        console.log(res, 123456789);
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
      });
    } else {
      get(`Associate/ProfileHead/${userId}`).then((res) => {
        console.log(res, 123456789);
        setHeadData(res);
        setStatusLabel(res?.accountStatus?.statusName);
      });
    }
  }, [success, id, userId]);

  const history = useHistory();

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});

  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);

  const [text, setText] = useState("");

  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);
  const [registrationDate, setRegistrationDate] = useState("");
  const [text1, setText1] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);

    const accountStatusData = {
      id: parseInt(id),
      accountStatusId: value,
    };

    put("Consultant/statuschange", accountStatusData).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const updateCoverPhoto = () => {
    setModalOpen(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setFileList([]);
    setError(false);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
    setError1(false);
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
    // setFileList(fileList);

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
      setError(false);
      setButtonStatus(false);
    }
  };

  const handleSubmitCoverPhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("consultantCoverImage", FileList[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList.length < 1) {
      setError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      put(`Consultant/UpdateCoverPhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList([]);
          setModalOpen(false);
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

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("consultantProfileImage", FileList1[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList1.length < 1) {
      setError1(true);
    } else {
      setProgress(true);
      setButtonStatus1(true);
      put(`Consultant/UpdateProfilePhoto`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
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
    <div>
      <Card>
        <div className="uapp-employee-cover-image">
          <div
            className="bg-image-profile"
            style={{
              backgroundImage: `url(${
                headData?.consultantCoverImageMedia
                  ? rootUrl + headData?.consultantCoverImageMedia?.fileUrl
                  : profileCover
              })`,
            }}
          ></div>
        </div>

        <CardBody>
          <div className="uapp-employee-profile-image-edit">
            <Row>
              <Col>
                <div className="uapp-employee-profile-image">
                  <div className="text-left">
                    <div className="profile-pic">
                      {headData?.consultantProfileImageMedia == null ? (
                        <img
                          className="empProfileImg bg-white"
                          src={uapploader}
                          alt="img-desc"
                        />
                      ) : (
                        <img
                          className="empProfileImg"
                          src={
                            rootUrl +
                            headData?.consultantProfileImageMedia?.fileUrl
                          }
                          alt="img-desc"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="uapp-employee-profile-generalInfo">
            <Row>
              <Col md="7">
                <div>
                  <h4 className="">
                    {headData?.nameTitle?.name} {headData?.firstName}{" "}
                    {headData?.lastName}
                  </h4>
                  <h5 className="">{headData?.designation}</h5>
                  <p>{headData?.viewId}</p>

                  {headData?.email === null ? null : (
                    <p>
                      <i class="far fa-envelope pr-2"></i>
                      {headData?.email}
                    </p>
                  )}

                  {headData?.phoneNumber === null ? null : (
                    <p>
                      <i className="fas fa-phone pr-2"></i>
                      {headData?.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="d-flex">
                  <button
                    className="consultant-profile-redesign-style px-2 py-2"
                    onClick={() => {
                      history.push(
                        `/applicationsFromAssociate/${headData?.id}`
                      );
                    }}
                  >
                    Applications ({headData?.applicationCount})
                  </button>

                  <button
                    style={{ marginLeft: "23px" }}
                    className="consultant-profile-redesign-style px-2 py-2"
                    onClick={() => {
                      history.push(`/studentByConsultant/${headData?.id}`);
                    }}
                  >
                    Students ({headData?.studentCount})
                  </button>

                  <button
                    style={{ marginLeft: "23px" }}
                    className="consultant-profile-redesign-style px-2 py-2"
                    onClick={() => {
                      history.push(`/associates/${headData?.id}`);
                    }}
                  >
                    Associates ({headData?.associateCount})
                  </button>
                </div>
              </Col>

              <Col md="5" className="text-md-right mt-3">
                <span>UAPP Registration Date</span>
                <br />
                <span className="text-gray">
                  {headData?.createdOn}
                  {/* {dateFormate(headData?.createdOn)} */}
                </span>
                <br />
                {/* <span>{headData?.branchName}</span> */}
                <br />
                <ul className="uapp-ul text-md-right">
                  {permissions?.includes(
                    permissionList?.Change_Consultant_AccountStatus
                  ) ? (
                    <div className="d-flex justify-content-md-end mb-2">
                      <Select
                        className=" w-50"
                        options={statusTypeMenu}
                        value={{
                          label: statusLabel,
                          value: statusValue,
                        }}
                        onChange={(opt) =>
                          selectStatusType(opt.label, opt.value)
                        }
                        name="consultantTypeId"
                        id="consultantTypeId"
                      />
                    </div>
                  ) : (
                    statusLabel
                  )}
                </ul>
                <p className="text-gray">{headData?.consultantTypeName}</p>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssociateProfileHead;
