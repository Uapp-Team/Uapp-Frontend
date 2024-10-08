import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Label,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";

import get from "../../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../../constants/constants";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import remove from "../../../../helpers/remove";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import { userTypes } from "../../../../constants/userTypeConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const CampusDetails = () => {
  const { id } = useParams();
  const userType = localStorage.getItem("userType");

  const { addToast } = useToasts();
  const location = useLocation();
  const [campusInfo, setCampusInfo] = useState({});
  const [subList, setSubList] = useState([]);
  const [subList1, setSubList1] = useState([]);
  const history = useHistory();
  const [subLabel, setSubLabel] = useState("Select Course");
  const [subValue, setSubValue] = useState(0);
  const [radioIsAcceptHome, setRadioIsAcceptHome] = useState("false");
  const [radioIsAcceptUk, setRadioIsAcceptUk] = useState("true");
  const [radioIsAcceptInt, setRadioIsAcceptInt] = useState("false");

  const [subjectList, setSubjectList] = useState([]);

  const [data, setData] = useState({});

  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [intakeError, setIntakeError] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [checked1, setChecked1] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);

  // For uploading Gallary
  const [FileList1, setFileList1] = useState([]);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [fileError, setFileError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [galleryObj, setGalleryObj] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal1, setDeleteModal1] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [buttonStatus3, setButtonStatus3] = useState(false);
  const [buttonStatus4, setButtonStatus4] = useState(false);
  const [buttonStatus5, setButtonStatus5] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress5, setProgress5] = useState(false);

  const [uniId, setUniId] = useState(undefined);

  const [delGalName, setDelGalName] = useState("");
  const [delGalId, setDelGalId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [subError, setSubError] = useState(false);

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

  const handleDeleteData = () => {
    setButtonStatus2(true);
    setProgress2(true);
    remove(`UniversityCampusSubject/Delete/${data?.id}`).then((res) => {
      setButtonStatus2(false);
      setProgress2(false);

      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setData({});
      setDeleteModal1(false);
      setSuccess(!success);
    });
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setFileError(false);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  useEffect(() => {
    get(`UniversityCampus/Get/${id}`).then((res) => {
      setCampusInfo(res);

      setUniId(res?.university?.id);
    });

    // Course get by university
    get(`UniversityCampusSubject/GetUnassigned/${id}`).then((res) => {
      setSubList(res);
    });

    get(`Subject/GetByCampusIdWithIntake/${id}`).then((res) => {
      setSubList1(res);
    });

    get(`Subject/GetByCampusIdWithIntake/${id}`).then((res) => {
      setSubjectIds(res);
      let defaultChecked = checked1;
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          const per = res[i];
          if (per?.isIntakeExists === true) {
            const ids = per.subjectId.toString();
            defaultChecked.push(ids);
            setChecked1([...defaultChecked]);
          }
        }
      }
    });

    // for intake
    get("Intake/Index").then((res) => {
      setIntakeData(res);
    });

    get("IntakeStatus/GetAll").then((res) => {
      setIntakeStatusData(res);
    });
    get(`CampusGallery/GetByCampusId/${id}`).then((res) => {
      setGallery(res);
    });

    get(`UniversityCampusSubject/GetByCampus/${id}`).then((res) => {
      setSubjectList(res);
    });
  }, [id, success]);

  // for intake dropdown
  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };

  const selectStatusType = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const taggleModal = () => {
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
    setSubValue(0);
    setSubLabel("Select Course");
    setDeleteModal2(!deleteModal2);
  };

  const toggleEdit = (data) => {
    setData(data);
    setRadioIsAcceptHome(`${data?.isAcceptHome}`);
    setRadioIsAcceptInt(`${data?.isAcceptInternational}`);
    setRadioIsAcceptUk(`${data?.isAcceptEU_UK}`);
    setSubValue(data?.subject?.id);
    // setSubLabel("Select Course");

    setDeleteModal2(true);
  };

  // for subject dropdown
  const subMenu = subList.map((subOptions) => ({
    label: subOptions.name,
    value: subOptions.id,
  }));

  const selectSubject = (label, value) => {
    setSubError(false);
    setSubLabel(label);
    setSubValue(value);
  };

  // on change radio button starts here
  const onValueChangeIsAcceptHome = (event) => {
    setRadioIsAcceptHome(event.target.value);
  };

  const onValueChangeIsAcceptUk = (event) => {
    setRadioIsAcceptUk(event.target.value);
  };

  const onValueChangeIsAcceptInt = (event) => {
    setRadioIsAcceptInt(event.target.value);
  };
  // on change radio button ends here

  // on change Feature starts here
  // const handleFeatureChange = e =>{
  //   const {name, checked} = e.target;
  //   if(name === "isAcceptHome"){
  //     setIsAcceptHome(!isAcceptHome);
  //   }
  //   else if(name === "isAcceptEU_UK"){
  //     setIsAcceptUk(isAcceptUk);
  //   }
  //   else{
  //     setIsAcceptInt(!isAcceptInt);
  //   }
  // }
  // on change Feature ends here

  // Delete Modal

  const toggleDanger = (data) => {
    setData(data);

    setDeleteModal1(true);
  };


  const handleUpdateData = (e) => {
    e.preventDefault();

    const subData = {
      id: data?.id,
      campusId: id,
      subjectId: subValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    setButtonStatus4(true);
    setProgress3(true);
    put(`UniversityCampusSubject/Update`, subData).then((res) => {
      setButtonStatus4(false);
      setProgress3(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setData({});
        setDeleteModal2(false);
        setRadioIsAcceptHome("false");
        setRadioIsAcceptUk("true");
        setRadioIsAcceptInt("false");
        setSubValue(0);
        setSubLabel("Select Course");
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handleSingleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      campusId: id,
      subjectId: subValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };
    if (subValue == 0) {
      setSubError(true);
    } else {
      setButtonStatus3(true);
      setProgress4(true);
      post(`UniversityCampusSubject/Create`, subData).then((res) => {
        setButtonStatus3(false);
        setProgress4(false);

        if (res?.data?.isSuccess == true && res?.status == 200) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setSubLabel("Select Course");
          setSubValue(0);
          setRadioIsAcceptHome("false");
          setRadioIsAcceptUk("true");
          setRadioIsAcceptInt("false");
        }
      });
    }
  };

  // for multiple assign starts here
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tmpUsers = subList.map((sub) => {
        return { ...sub, isChecked: checked };
      });
      setSubList(tmpUsers);
    } else if (name === "allDeselect") {
      let tmpUsers = subList.map((sub) => {
        return { ...sub, isChecked: !checked };
      });
      setSubList(tmpUsers);
    } else {
      let tmpUsers = subList.map((sub) =>
        sub.name === name ? { ...sub, isChecked: checked } : sub
      );
      setSubList(tmpUsers);
    }
  };
  // for multiple assign ends here

  // for feature checkboxes
  const handleFeatureHome = (e) => {
    const { name, id, checked, disabled } = e.target;

    const features = subList.map((data) =>
      data?.id.toString() === id.toString()
        ? { ...data, isAcceptHome: checked }
        : data
    );
    setSubList(features);

    // if(data?.isChecked === true){
    //     setSubList({...data, isAcceptHome: homeAccept})
    // }
  };

  const handleFeatureUk = (e) => {
    const { name, id, checked } = e.target;

    const features = subList.map((data) =>
      data?.id.toString() === id.toString()
        ? { ...data, isAcceptUk: checked }
        : data
    );
    setSubList(features);

    // if(data?.isChecked === true){
    //     setSubList({...data, isAcceptHome: homeAccept})
    // }
  };

  const handleFeatureInt = (e) => {
    const { name, id, checked } = e.target;

    const features = subList.map((data) =>
      data?.id.toString() === id.toString()
        ? { ...data, isAcceptInt: checked }
        : data
    );
    setSubList(features);

    // if(data?.isChecked === true){
    //     setSubList({...data, isAcceptHome: homeAccept})
    // }
  };

  const AuthStr = localStorage.getItem("token");

  const handleGalleryPost = (e) => {
    e.preventDefault();

    const subdata = new FormData(e.target);

    for (let i = 0; i < FileList1.length; i++) {
      subdata.append(`mediaFile`, FileList1[i]?.originFileObj);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: AuthStr,
      },
    };

    if (FileList1.length < 1) {
      setFileError(true);
    } else {
      setLoading(true);
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}CampusGallery/Create`, subdata, config).then(
        (res) => {
          setButtonStatus(false);
          setProgress(false);
          setSuccess(!success);
          setFileList1([]);
          setFileError(false);
          setLoading(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          // history.push("/addUniversityApplicationDocument");
        }
      );
    }
  };

  const handleView = (gallery) => {
    setGalleryObj(gallery);
    setViewModalOpen(true);
  };

  const handleDelete = (gallery) => {
    setDelGalName(gallery?.mediaFileMedia?.fileName);
    setDelGalId(gallery?.id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelGalName("");
    setDelGalId(0);
  };

  // on Close View Modal
  const closeViewModal = () => {
    // setGalleryObj({});
    setViewModalOpen(false);
  };

  const handleDeleteItem = (ids) => {
    setButtonStatus1(true);
    setProgress1(true);
    const returnValue = remove(`CampusGallery/Delete/${ids}`).then((action) => {
      setButtonStatus1(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelGalName("");
      setDelGalId(0);
    });
  };

  const handleSubjectAssignInIntake = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);

    // for (let i = 0; i < subList1.length; i++) {
    subdata.append(`subjectIds`, checked1);
    // }

    for (let value of subdata) {
    }

    const config = {
      headers: {
        authorization: AuthStr,
      },
    };

    // setLoading(true);

    if (intakeValue === 0) {
      setIntakeError(true);
    } else if (statusValue === 0) {
      setStatusError(true);
    } else {
      setButtonStatus5(true);
      setProgress5(true);
      Axios.post(
        `${rootUrl}SubjectIntake/AssignToSubjectRange`,
        subdata,
        config
      ).then((res) => {
        setButtonStatus5(false);
        setProgress5(false);
        // setSubjectIds([]);
        setIntakeLabel("Select Intake");
        setIntakeValue(0);
        setStatusLabel("Select Status");
        setStatusValue(0);
        setSuccess(!success);
        setChecked1([]);
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };

  // onChange checkbox
  const handleCheck = (e) => {
    let ids = e.target.id;
    let val = e.target.checked;

    if (val == true) {
      if (!checked1?.includes(ids)) {
        setChecked1([...checked1, ids]);
      }
    } else {
      const newD = ids;
      const res = checked1.filter((c) => c != newD);
      setChecked1(res);
    }
  };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    if (val == true) {
      subjectIds.map((per) => {
        const perId = per?.subjectId.toString();
        newChecked.push(perId);
        document.getElementById(per?.subjectId).checked = true;
      });
      setChecked1([...newChecked]);
    }

    if (val == false) {
      {
        subjectIds.map((per) => {
          document.getElementById(per.subjectId).checked = false;
        });
        setChecked1([]);
      }
    }
  };

  const handleMultipleSubjects = () => {
    history.push(`/assignMultipleSubject/${id}`);
  };

  const redirectToCampusEdit = () => {
    history.push({
      pathname: `/addUniversityCampus/${uniId}`,
      uniCampId: id,
    });
  };

  const handleCancelForm = () => {
    setSubLabel("Select Course");
    setSubValue(0);
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
  };

  const handleClearSearch = () => {
    setStatusLabel("Select Status");
    setStatusValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
  };

  return (
    <div>
      <BreadCrumb
        title="Campus Details"
        backTo={
          location.uniDetailId != undefined ? "University Details" : "Campus"
        }
        path={
          location.uniDetailId != undefined
            ? `/universityDetails/${location.uniDetailId}`
            : `/campusList/${uniId}`
        }
      />
      <div className="uapp-employee-profile">
        <Row>
          <Col md="8">
            <Card>
              <CardBody>
                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col>
                      <div>
                        <div className="text-left">
                          <h4 className="ml-2">{campusInfo?.name}</h4>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      {userType == userTypes?.Student ? null : (
                        <div className="uapp-employee-profile-Edit">
                          <div className="text-right">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={redirectToCampusEdit}
                            >
                              {" "}
                              <i className="fas fa-pencil-alt"></i>{" "}
                            </span>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>

                <div className="uapp-employee-profile-generalInfo">
                  <Row>
                    <Col md="6">
                      <ul className="uapp-ul text-left">
                        <li>
                          International student :{" "}
                          {campusInfo?.internationalStudent}
                        </li>

                        <li>Total student : {campusInfo?.totalStudent}</li>

                        <li>
                          <span>
                            {" "}
                            Address : {campusInfo?.addressLine}
                            {","} {campusInfo?.campusCity}{" "}
                          </span>
                        </li>
                      </ul>
                    </Col>

                    <Col md="6">
                      <ul className="uapp-ul text-right1">
                        <li>
                          {/* <span> Coursem : {subjectData?.programLevel?.name} </span> */}
                        </li>

                        <li>
                          {/* <span> Duration : {subjectData?.duration}</span> */}
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

            {/* campus gallery starts here */}
            <div className=" info-item mt-4">
              <Card className="uapp-employee-search">
                <CardBody className="search-card-body">
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Gallery</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                 </div> */}
                  </div>

                  <div className="row mt-5">
                    <div className="col-md-8">
                      {gallery.length > 0 ? (
                        <div className="row row-cols-md-3 row-cols-sm-2 container-fluid g-4">
                          {gallery.map((gall, i) => (
                            <div key={i} className="containerCustom pl-2 pb-2">
                              <img
                                src={
                                  rootUrl + gall?.mediaFileMedia?.thumbnailUrl
                                }
                                alt="Avatar"
                                className="image"
                                style={{ width: "100%" }}
                              />
                              {userType == userTypes?.Student ? null : (
                                <div className="middle d-flex">
                                  <Button
                                    onClick={() => handleView(gall)}
                                    className="bg-success"
                                  >
                                    View
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(gall)}
                                    className="bg-danger ml-2"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}

                          {/* view modal starts here */}

                          <Modal
                            size="50%"
                            isOpen={viewModalOpen}
                            toggle={closeViewModal}
                            className="uapp-modal2"
                          >
                            <ModalBody>
                              {/* <img
                              className="w-100 mx-auto"
                              src={
                                rootUrl + galleryObj?.mediaFileMedia?.fileUrl
                              }
                              alt=""
                            /> */}
                              {galleryObj?.mediaFileMedia?.mediaType === 1 ? (
                                <img
                                  src={
                                    rootUrl +
                                    galleryObj?.mediaFileMedia?.fileUrl
                                  }
                                  alt="gallery_image"
                                  className="image"
                                  style={{ width: "100%" }}
                                />
                              ) : galleryObj?.mediaFileMedia?.mediaType ===
                                3 ? (
                                <video
                                  src={
                                    rootUrl +
                                    galleryObj?.mediaFileMedia?.fileUrl
                                  }
                                  width="100%"
                                  height="100%"
                                  controls
                                >
                                  The browser does not support videos.
                                </video>
                              ) : (
                                <span>This format cannot be opened.</span>
                              )}
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                className=""
                                color="danger"
                                onClick={closeViewModal}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </Modal>

                          {/* view modal ends here */}

                          {/* delete modal starts here */}

                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{delGalName}</b>{" "}
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                disabled={buttonStatus1}
                                color="danger"
                                onClick={() => handleDeleteItem(delGalId)}
                              >
                                {progress1 ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal>

                          {/* view modal ends here */}
                        </div>
                      ) : (
                        <p>There is no gallery item added here.</p>
                      )}
                    </div>
                    {userType == userTypes?.Student ? null : (
                      <div className="col-md-4">
                        <div className="customCard rounded">
                          <Form className="ml-2" onSubmit={handleGalleryPost}>
                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Input
                                type="hidden"
                                id="campusId"
                                name="campusId"
                                value={id}
                              />
                              {/* <Input type="hidden" id="Id" name="Id" value={selectedId} /> */}
                            </FormGroup>

                            <FormGroup>
                              <span>
                                Select Files{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                              {loading ? (
                                <h4 className="text-center mt-4">
                                  Uploading...
                                </h4>
                              ) : (
                                <div className="row mt-4">
                                  {/* {universityData?.universityLogo ? (
                                  <div className="col-md-3">
                                    <Image
                                      width={104}
                                      height={104}
                                      src={
                                        rootUrl +
                                        universityData?.universityLogo
                                          ?.thumbnailUrl
                                      }
                                    />
                                  </div>
                                ) : null} */}

                                  <div className="col-md-3">
                                    <Upload
                                      accept={
                                        "image/png, image/jpeg, image/jpg, video/mp4"
                                      }
                                      listType="picture-card"
                                      multiple={true}
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
                                          <span>Upload</span>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </Upload>
                                    <AntdModal
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
                                    </AntdModal>
                                  </div>
                                </div>
                              )}
                              {fileError && (
                                <span className="text-danger">
                                  At least one file is required
                                </span>
                              )}
                            </FormGroup>

                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                              style={{ display: "flex", justifyContent: "end" }}
                            >
                              <Col md="5">
                                <CustomButtonRipple
                                  type={"submit"}
                                  className={"mr-1 mt-3 badge-primary"}
                                  name={progress ? <ButtonLoader /> : "Save"}
                                  permission={6}
                                  isDisabled={buttonStatus}
                                />
                              </Col>
                            </FormGroup>
                          </Form>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
            {/* campus gallery ends here */}

            {/* table start  */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-2">
                    <div>
                      <h5>
                        {" "}
                        <b>Course List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>

                    {/* <div className="text-right edit-style  p-3">
                      <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                    </div> */}
                  </div>

                  {subjectList.length < 1 ? (
                    <span>There is no data available.</span>
                  ) : (
                    <div className="table-responsive pt-3">
                      <Table className="table-sm striped">
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            <th>SL/NO</th>
                            <th>Course</th>
                            <th>EU/UK</th>
                            <th>Home</th>
                            <th>International</th>
                            {userType == userTypes?.Student ? null : (
                              <th
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {subjectList?.map((sub, i) => (
                            <tr key={i} style={{ textAlign: "center" }}>
                              <th scope="row">{1 + i}</th>

                              <td>{sub?.subject?.name}</td>
                              <td>
                                {sub?.isAcceptEU_UK ? (
                                  <span>Yes</span>
                                ) : (
                                  <span>No</span>
                                )}
                              </td>
                              <td>
                                {sub?.isAcceptHome ? (
                                  <span>Yes</span>
                                ) : (
                                  <span>No</span>
                                )}
                              </td>
                              <td>
                                {sub?.isAcceptInternational ? (
                                  <span>Yes</span>
                                ) : (
                                  <span>No</span>
                                )}
                              </td>

                              {userType == userTypes?.Student ? null : (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  <ButtonGroup variant="text">
                                    <Button
                                      onClick={() => toggleEdit(sub)}
                                      color="warning"
                                      className="mx-1 btn-sm"
                                    >
                                      {" "}
                                      <i className="fas fa-edit"></i>{" "}
                                    </Button>

                                    <Button
                                      onClick={() => toggleDanger(sub)}
                                      color="danger"
                                      className="mx-1 btn-sm"
                                    >
                                      {" "}
                                      <i className="fas fa-trash"></i>{" "}
                                    </Button>
                                  </ButtonGroup>
                                  <Modal
                                    isOpen={deleteModal1}
                                    toggle={() =>
                                      setDeleteModal1(!deleteModal1)
                                    }
                                    className="uapp-modal"
                                  >
                                    <ModalBody>
                                      <p>
                                        Are You Sure to Delete this ? Once
                                        Deleted it can't be Undone!
                                      </p>
                                    </ModalBody>

                                    <ModalFooter>
                                      <Button
                                        disabled={buttonStatus2}
                                        color="danger"
                                        onClick={handleDeleteData}
                                      >
                                        {progress2 ? <ButtonLoader /> : "YES"}
                                      </Button>
                                      <Button
                                        onClick={() => setDeleteModal1(false)}
                                      >
                                        NO
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                  <Modal
                                    isOpen={deleteModal2}
                                    toggle={taggleModal}
                                    className="uapp-modal"
                                  >
                                    <ModalBody>
                                      <Form onSubmit={handleUpdateData}>
                                        <p className="pt-3">
                                          <b>Course Features</b>
                                        </p>
                                        <FormGroup row>
                                          <Col md="6">
                                            <span>Home </span>
                                          </Col>

                                          <Col md="6">
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptHome"
                                                onChange={
                                                  onValueChangeIsAcceptHome
                                                }
                                                name="isAcceptHome"
                                                value="true"
                                                checked={
                                                  radioIsAcceptHome == "true"
                                                }
                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptHome"
                                              >
                                                Yes
                                              </Label>
                                            </FormGroup>

                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptHome"
                                                onChange={
                                                  onValueChangeIsAcceptHome
                                                }
                                                name="isAcceptHome"
                                                value="false"
                                                checked={
                                                  radioIsAcceptHome == "false"
                                                }
                                              />

                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptHome"
                                              >
                                                No
                                              </Label>
                                            </FormGroup>
                                          </Col>
                                        </FormGroup>

                                        <FormGroup row className="">
                                          <Col md="6">
                                            <span>EU/UK </span>
                                          </Col>

                                          <Col md="6">
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptEU_UK"
                                                onChange={
                                                  onValueChangeIsAcceptUk
                                                }
                                                name="isAcceptEU_UK"
                                                value="true"
                                                checked={
                                                  radioIsAcceptUk == "true"
                                                }
                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptEU_UK"
                                              >
                                                Yes
                                              </Label>
                                            </FormGroup>

                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptEU_UK"
                                                onChange={
                                                  onValueChangeIsAcceptUk
                                                }
                                                name="isAcceptEU_UK"
                                                value="false"
                                                checked={
                                                  radioIsAcceptUk == "false"
                                                }
                                              />

                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptEU_UK"
                                              >
                                                No
                                              </Label>
                                            </FormGroup>
                                          </Col>
                                        </FormGroup>

                                        <FormGroup row className="">
                                          <Col md="6">
                                            <span>International </span>
                                          </Col>

                                          <Col md="6">
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptInternational"
                                                onChange={
                                                  onValueChangeIsAcceptInt
                                                }
                                                name="isAcceptInternational"
                                                value="true"
                                                checked={
                                                  radioIsAcceptInt == "true"
                                                }
                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptInternational"
                                              >
                                                Yes
                                              </Label>
                                            </FormGroup>

                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="isAcceptInternational"
                                                onChange={
                                                  onValueChangeIsAcceptInt
                                                }
                                                name="isAcceptInternational"
                                                value="false"
                                                checked={
                                                  radioIsAcceptInt == "false"
                                                }
                                              />

                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="isAcceptInternational"
                                              >
                                                No
                                              </Label>
                                            </FormGroup>
                                          </Col>
                                        </FormGroup>

                                        <FormGroup
                                          className="has-icon-left position-relative"
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        >
                                          <Button.Ripple
                                            onClick={taggleModal}
                                            // type="submit"
                                            color="danger"
                                            className="mr-1 mt-3"
                                          >
                                            Cancel
                                          </Button.Ripple>

                                          <Button.Ripple
                                            disabled={buttonStatus4}
                                            type="submit"
                                            className="mr-1 mt-3 badge-primary"
                                          >
                                            {progress3 ? (
                                              <ButtonLoader />
                                            ) : (
                                              "Submit"
                                            )}
                                          </Button.Ripple>
                                        </FormGroup>
                                      </Form>
                                    </ModalBody>
                                  </Modal>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
            {/* subject list table  end  */}

            {/* Assign single subject */}
            {userType == userTypes?.Student ? null : (
              <div className=" info-item mt-4">
                <Card className="uapp-employee-search">
                  <CardBody className="search-card-body">
                    <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Assign Course</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                 </div> */}
                    </div>

                    <Form onSubmit={handleSingleSubmit}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            Course <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Select
                            options={subMenu}
                            value={{ label: subLabel, value: subValue }}
                            onChange={(opt) =>
                              selectSubject(opt.label, opt.value)
                            }
                            name="id"
                            id="id"
                          />
                          {subError ? (
                            <span className="text-danger">
                              Course is required
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>

                      <p className="mt-5">
                        <b>Course Features :</b>
                      </p>
                      <FormGroup row className="">
                        <Col md="4">
                          <span>Home</span>
                        </Col>

                        <Col md="4">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="true"
                              checked={radioIsAcceptHome == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptHome"
                              onChange={onValueChangeIsAcceptHome}
                              name="isAcceptHome"
                              value="false"
                              checked={radioIsAcceptHome == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptHome"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="4">
                          <span>EU/UK</span>
                        </Col>

                        <Col md="4">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="true"
                              checked={radioIsAcceptUk == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptEU_UK"
                              onChange={onValueChangeIsAcceptUk}
                              name="isAcceptEU_UK"
                              value="false"
                              checked={radioIsAcceptUk == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptEU_UK"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup row className="">
                        <Col md="4">
                          <span>International </span>
                        </Col>

                        <Col md="4">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="true"
                              checked={radioIsAcceptInt == "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              Yes
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="isAcceptInternational"
                              onChange={onValueChangeIsAcceptInt}
                              name="isAcceptInternational"
                              value="false"
                              checked={radioIsAcceptInt == "false"}
                            />

                            <Label
                              className="form-check-label"
                              check
                              htmlFor="isAcceptInternational"
                            >
                              No
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Col md="7">
                          <div className="ml-3 mt-4">
                            <Button.Ripple
                              onClick={handleCancelForm}
                              color="danger"
                              className=" mt-3"
                            >
                              Reset
                            </Button.Ripple>

                            <Button.Ripple
                              disabled={buttonStatus3}
                              type="submit"
                              className="ml-md-2 mt-3 badge-primary"
                            >
                              {progress4 ? <ButtonLoader /> : "Submit"}
                            </Button.Ripple>
                          </div>
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            )}

            {/* assign multiple Courses starts here */}
            {userType == userTypes?.Student ? null : (
              <div className=" info-item mt-4">
                <Card className="uapp-employee-search">
                  <CardBody className="search-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="hedding-titel d-flex justify-content-between mb-2">
                        <div>
                          <h5>
                            {" "}
                            <b>Assign Multiple Courses</b>{" "}
                          </h5>

                          <div className="bg-h"></div>
                        </div>
                      </div>

                      <div>
                        <Button
                          onClick={handleMultipleSubjects}
                          color="primary"
                        >
                          Assign Courses
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
            {/* assign multiple Courses ends here */}

            {/* subject intake starts here */}
            {userType == userTypes?.Student ? null : (
              <div className=" info-item mt-4">
                <Card className="uapp-employee-search">
                  <CardBody className="search-card-body">
                    <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5>
                          {" "}
                          <b>Course Intake</b>{" "}
                        </h5>

                        <div className="bg-h"></div>
                      </div>

                      {/* <div className="text-right edit-style  p-3">
                      <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                    </div> */}
                    </div>

                    {subjectIds.length < 1 ? (
                      <p>There is no Course added here.</p>
                    ) : (
                      <Form onSubmit={handleSubjectAssignInIntake}>
                        <Input
                          type="hidden"
                          id="campusId"
                          name="campusId"
                          value={id}
                        />
                        <FormGroup>
                          <Row>
                            <Col lg="5" md="4" sm="6" xs="6">
                              <Select
                                options={intakeDropDown}
                                value={{
                                  label: intakeLabel,
                                  value: intakeValue,
                                }}
                                onChange={(opt) =>
                                  selectIntakeType(opt.label, opt.value)
                                }
                                name="intakeId"
                                id="intakeId"
                              />
                              {intakeError ? (
                                <span className="text-danger">
                                  Intake is required
                                </span>
                              ) : null}
                            </Col>

                            <Col lg="5" md="4" sm="6" xs="6">
                              <Select
                                options={intakeStatusDropDown}
                                value={{
                                  label: statusLabel,
                                  value: statusValue,
                                }}
                                onChange={(opt) =>
                                  selectStatusType(opt.label, opt.value)
                                }
                                name="statusId"
                                id="statusId"
                              />
                              {statusError ? (
                                <span className="text-danger">
                                  Status is required
                                </span>
                              ) : null}
                            </Col>

                            <Col lg="2" md="4" sm="6" xs="6">
                              {/* <div className='d-flex justify-content-center'> */}
                              <Button
                                disabled={buttonStatus5}
                                type="submit"
                                className="btn btn-uapp-add btn btn-secondary"
                              >
                                {progress5 ? <ButtonLoader /> : "Assign"}
                              </Button>
                              {/* </div> */}
                            </Col>
                          </Row>
                        </FormGroup>

                        <FormGroup>
                          <Row className="">
                            <Col lg="12" md="12" sm="12" xs="12">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <div
                                  className="mt-1 mx-1 d-flex btn-clear"
                                  onClick={handleClearSearch}
                                >
                                  {/* <Icon.X  className='text-danger' />*/}
                                  <span className="text-danger">
                                    <i className="fa fa-times"></i> Clear
                                  </span>
                                </div>

                                {/* <div className="mt-2 mx-1">
                        <span className="btn btn-primary">Export</span>
                      </div> */}
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>

                        {/* {
                      intakeValue != 0 || statusValue != 0 ? */}
                        <FormGroup>
                          <Row>
                            <Col sm="12">
                              {subjectIds.length > 0 && (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    onChange={(e) => handleSelectAll(e)}
                                    type="checkbox"
                                    name=""
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor=""
                                  >
                                    Select All
                                  </label>
                                </div>
                              )}
                            </Col>
                            {subjectIds?.map((per) => (
                              <Col xs="6" sm="4" md="3" key={per.subjectId}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    onChange={(e) => handleCheck(e)}
                                    type="checkbox"
                                    name=""
                                    id={per?.subjectId}
                                    checked={
                                      checked1.includes(`${per?.subjectId}`)
                                        ? true
                                        : false
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor=""
                                  >
                                    {per?.subjectName}
                                  </label>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </FormGroup>
                        {/* :
                    null
                    } */}
                      </Form>
                    )}
                  </CardBody>
                </Card>
              </div>
            )}
            {/* subject intake test ends here */}

            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>

          {/* side columns */}
          <Col md="4">
            {/* for showing university information starts here */}
            <Card className="uapp-employee-profile-right1">
              <div
                style={{
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
                className="uapp-profile-CardHeader"
              >
                <div className="uapp-circle-image margin-top-minus">
                  <img
                    src={
                      rootUrl +
                      campusInfo?.university?.universityLogo?.thumbnailUrl
                    }
                    alt="university_img"
                  />
                </div>

                <h5>
                  {campusInfo?.university?.name} (
                  {campusInfo?.university?.shortName})
                </h5>
                <p> {campusInfo?.university?.universityType?.name} </p>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    {campusInfo?.university?.universityCity?.name &&
                      campusInfo?.university?.universityState?.name &&
                      campusInfo?.university?.universityCountry?.name ? (
                      <li>
                        {campusInfo?.university?.universityCity?.name}
                        {","} {campusInfo?.university?.universityState?.name}
                        {","} {campusInfo?.university?.universityCountry?.name}
                      </li>
                    ) : (
                      <p>No data available</p>
                    )}
                  </ul>
                </div>
              </CardBody>
            </Card>
            {/* for showing university information ends here */}

            {/* For showing tution fee */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Financial</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                <div className="d-flex justify-content-between">
                  <span>Average Application Fee :</span>
                  <p>€{campusInfo?.avarageApplicationFee}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Average Tution Fee :</span>
                  <p>€{campusInfo?.avarageTutionFee}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Average Living Cost :</span>
                  <p>€{campusInfo?.avarageLivingCost}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Estimated Total Cost :</span>
                  <p>€{campusInfo?.estimatedTotalCost}</p>
                </div>
              </CardBody>
            </Card>
            {/* tution fee ends here */}

            {/* embedded map starts here */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Location</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {campusInfo?.embededMap === null ? (
                  <p>There is no embeded map added here.</p>
                ) : (
                  <>
                    <div className="">
                      <iframe
                        src={campusInfo?.embededMap}
                        width="100%"
                        height="300"
                        loading="lazy"
                        style={{ border: "0" }}
                        referrerpolicy="no-referrer-when-downgrade"
                        title="efef"
                      ></iframe>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>

            {/* embedded map ends here */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CampusDetails;
