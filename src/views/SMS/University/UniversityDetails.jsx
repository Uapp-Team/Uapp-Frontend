import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Table,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Axios from "axios";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import uapploader from "../../../assets/img/Uapp_fav.png";
import uapploader2 from "../../../assets/img/Asset 12Icon.svg";
import get from "../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import profileImage from "../../../assets/img/profile/user-uploads/user-07.jpg";
import { userTypes } from "../../../constants/userTypeConstant";
import { Image } from "antd";
import { useToasts } from "react-toast-notifications";

import EditDivButton from "../Components/EditDivButton";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const UniversityDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { addToast } = useToasts();
  const [universityInfo, setUniversityInfo] = useState({});
  const [financialInfo, setFinancialInfo] = useState({});
  const [universityFeatures, setUniversityFeatures] = useState({});
  const [galleryData, setGalleryData] = useState([]);
  const [appDocument, setAppDocument] = useState([]);
  const [tempDocument, setTempDocument] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  // const [notAvl, setNotAvl] = useState('n/a');

  // for fake data
  // const [users, setUsers] = useState([]);

  // for intake filter
  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Status");
  const [statusValue, setStatusValue] = useState(0);

  // subject list
  const [subList, setSubList] = useState([]);
  const [menus, setMenus] = useState([]);
  let [checked, setChecked] = useState([]);

  // for showing campus list
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  // end here

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

  // for adding campus
  const [modalOpen, setModalOpen] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [stateError, setStateError] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [universityStates, setUniversityStates] = useState([]);
  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);

  const [delGalName, setDelGalName] = useState("");
  const [delGalId, setDelGalId] = useState(0);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);

  const [data, setData] = useState({});
  const [score, setScore] = useState({});

  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [buttonStatus3, setButtonStatus3] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");

  const [buttonStatus4, setButtonStatus4] = useState(false);
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);
  const [error1, setError1] = useState(false);
  const [text1, setText1] = useState("");

  const userType = localStorage.getItem("userType");

  const history = useHistory();

  useEffect(() => {
    // const uCountryId = 0;
    // const uStateId = 0;
    // const uTypeId = 0;
    // const providerId = 0;

    get(`University/Get/${id}`).then((res) => {
      setUniversityInfo(res);
    });

    // get(
    //   `UniversityCampus/index?page=${currentPage}&pageSize${dataPerPage}&universityId=${id}&search=${searchStr}`
    // ).then((res) => {
    //   setCampusList(res.models);
    //   setSerialNum(res?.firstSerialNumber);
    //   // setEntity(res?.totalEntity);
    //   setLoading(false);

    //
    // });

    // for getting university campus list
    get(`UniversityCampus/GetByUniversity/${id}`).then((res) => {
      setCampusList(res);
      setLoading(false);
    });

    // for getting financial information
    get(`FinancialInformation/GetByUniversity/${id}`).then((res) => {
      //
      setFinancialInfo(res);
    });

    // for getting Features
    get(`UniversityFeatures/GetByUniversity/${id}`).then((res) => {
      setUniversityFeatures(res);
    });

    // for intake
    get("Intake/Index").then((res) => {
      setIntakeData(res);
    });

    get("IntakeStatus/GetAll").then((res) => {
      setIntakeStatusData(res);
    });

    // Course get by university
    get(`Subject/GetByUniversity/${id}`).then((res) => {
      setSubList(res);

      // setSubList(res);
    });

    // for university gallery
    get(`UniversityGallery/GetByUniversity/${id}`).then((res) => {
      setGallery(res);
    });

    // get(`UniversityApplicationDocument/GetByUniversity/${id}`).then((res) => {
    //   setAppDocument(res);
    // });

    get(`UniversityTemplateDocument/GetByUniversity/${id}`).then((res) => {
      setTempDocument(res);
    });

    get("UniversityCountryDD/Index").then((res) => {
      setCountryList(res);
    });

    get(`UniversityComission/GetByUniversity/${id}`).then((res) => {
      setData(res);
    });

    // get(`TestScoreRequirement/Index/${id}`).then((res) => {

    //   setScore(res);
    //   // setRequired(res?.isTestScoreRequired);
    //   // setIelts(res?.isIeltsMandatory);
    //   // setScore(res?.score);
    // });

    // for fake data
    // setUsers(userData);
  }, [id, callApi, currentPage, dataPerPage, searchStr, success]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // select University Country
  const selectUniCountry = (label, value) => {
    setCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);

    get(`UniversityStateDD/Index/${value}`).then((res) => {
      // setUniStateLabel(res.name)
      // setUniStateValue(res.id)
      setUniversityStates(res);
    });
    setUniStateLabel("Select State");
    setUniStateValue(0);

    get(`UniversityCityDD/Index/${value}`).then((res) => {
      setCity(res);
    });
    setCityLabel("Select City");
    setCityValue(0);
  };

  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  const cityOptions = city?.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  // select University State
  const selectUniState = (label, value) => {
    setStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const selectCampusCity = (label, value) => {
    setCityError(false);
    setCityLabel(label);
    setCityValue(value);
  };

  const handleSubmitCampus = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (uniCountryValue === 0) {
      setCountryError(true);
    } else if (unistateValue === 0) {
      setStateError(true);
    } else if (cityValue === 0) {
      setCityError(true);
    } else {
      setButtonStatus2(true);
      setProgress4(true);
      post(`UniversityCampus/Create`, subdata).then((res) => {
        setButtonStatus2(false);
        setProgress4(false);
        setSuccess(!success);
        setModalOpen(false);

        // setuniversityId(res?.data?.result?.universityId);
        if (res.status === 200 && res.data.isSuccess === true) {
          // setSubmitData(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setUniCountryLabel("Select Country");
          setUniCountryValue(0);
          setUniStateLabel("Select State");
          setUniStateValue(0);
          setCityLabel("Select City");
          setCityValue(0);
        }
      });
    }
  };

  const backToDashboard = () => {
    if (location.subjectDataUniversityId != undefined) {
      history.push(`/subjectProfile/${location.subjectDataUniversityId}`);
    } else if (location.providerId != undefined) {
      history.push(`/providerDetails/${location.providerId}`);
    } else {
      history.push("/universityList");
    }
  };

  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setIntakeLabel(" Intake...");
    setIntakeValue(0);
    setStatusLabel(" Status...");
    setStatusValue(0);
    // setCallApi((prev) => !prev);
  };

  // const selectSubjectName = (action) => {
  //   setMenus([]);
  //   checked = [];

  //
  //     setMenus(action);

  //     let defaultChecked = checked;
  //     if (action.length > 0) {
  //       for (let i = 0; i < action.length; i++) {
  //         const menu = action[i];
  //         if (menu.isChecked === true) {
  //           const id = menu.id.toString();
  //           defaultChecked.push(id);
  //           setChecked([...defaultChecked]);
  //         }
  //       }
  //     }
  //

  // };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;

    if (val === true) {
      menus.map((menu) => {
        const menuId = menu.id.toString();
        newChecked.push(menuId);
        document.getElementById(menu.id).checked = true;
      });
      setChecked([...newChecked]);
    } else {
      setChecked([...checked]);
    }
    // else if(val === false){
    //   eslint-disable-next-line no-lone-blocks
    //   {
    //         menus.map((menu) => {
    //           document.getElementById(menu.id).checked = false;
    //         });
    //         setChecked([]);
    //       }
    // }
    // if (val === false) {
    //   {
    //     menus.map((menu) => {
    //       document.getElementById(menu.id).checked = false;
    //     });
    //     setChecked([]);
    //   }
    // }
  };

  // on De Select all
  const handleDeselectAll = (e) => {
    const val = e.target.checked;

    if (val === true) {
      // eslint-disable-next-line no-lone-blocks
      {
        menus.map((menu) => {
          document.getElementById(menu.id).checked = false;
        });
        setChecked([]);
      }
    } else {
      setChecked([...checked]);
    }
  };

  // handling checkbox
  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      setChecked([...checked, id]);
    } else {
      // setChecked([]);
      const index = checked.indexOf(id);
      if (index > -1) {
        checked.splice(index, 1);
        setChecked([...checked]);
      }
    }
  };

  // const handleChange = (e) => {
  //   const { name, checked } = e.target;
  //   if (name === "allSelect") {
  //     let tmpUsers = subList.map((sub) => {
  //       return { ...sub, isChecked: checked };
  //     });
  //     setSubList(tmpUsers);
  //
  //   } else if (name === "allDeselect") {
  //     let tmpUsers = subList.map((sub) => {
  //       return { ...sub, isChecked: !checked };
  //     });
  //     setSubList(tmpUsers);
  //
  //   } else {
  //     let tmpUsers = subList.map((sub) =>
  //       sub.name === name ? { ...sub, isChecked: checked } : sub
  //     );
  //     setSubList(tmpUsers);
  //
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);

    for (var value of subdata.values()) {
    }
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  //

  const handleProfileEdit = (id) => {
    // localStorage.removeItem("id");
    // localStorage.removeItem('editMethod');
    // localStorage.setItem("id", id);
    // localStorage.setItem('editMethod','put');
    history.push({
      pathname: `/addUniversity/${id}`,
      uuId: id,
    });
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setFileError(false);
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

  const handleView = (gallery) => {
    setGalleryObj(gallery);
    setViewModalOpen(true);
  };

  const handleDelete = (gallery) => {
    setDelGalName(gallery?.mediaFileMedia?.fileName);
    setDelGalId(gallery?.id);
    setDeleteModal(true);
  };

  // on Close View Modal
  const closeViewModal = () => {
    // setGalleryObj({});
    setViewModalOpen(false);
  };

  // on Close Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelGalName("");
    setDelGalId(0);
  };

  const handleDeleteItem = (id) => {
    setButtonStatus1(true);
    setProgress3(true);
    const returnValue = remove(`UniversityGallery/Delete/${id}`).then(
      (action) => {
        setButtonStatus1(false);
        setProgress3(false);
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelGalName("");
        setDelGalId(0);
      }
    );
  };

  const handleCampusEdit = (id) => {
    history.push(`/addUniversityCampus/${id}`);
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
      setProgress2(true);
      Axios.post(`${rootUrl}UniversityGallery/Create`, subdata, config).then(
        (res) => {
          setButtonStatus(false);
          setProgress2(false);
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

  const redirecttoCampDetails = (campusId) => {
    history.push({
      pathname: `/campusDetails/${campusId}`,
      uniDetailId: id,
    });
  };

  const redirectToSubjectProfile = (subjectId) => {
    history.push({
      pathname: `/subjectProfile/${subjectId}`,
      uniDetailId: id,
    });
  };



  const handleAddUniversitySubject = () => {
    history.push(`/add-University-course/${id}`);
  };

  // on Close Modal
  const closeModal = () => {
    setCity([]);
    setUniversityStates([]);
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    setCityLabel("Select City");
    setCityValue(0);
    setModalOpen(false);
  };

  const updateCoverPhoto = () => {
    setModalOpen3(true);
  };

  // on Close Modal
  const closeModal2 = () => {
    setModalOpen3(false);
    setFileList([]);
    setError(false);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
    setError1(false);
  };

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

    subData.append("coverImageFile", FileList[0]?.originFileObj);
    if (FileList.length < 1) {
      setError(true);
    } else {
      setProgress(true);
      setButtonStatus3(true);
      put(`University/UpdateCoverPhoto`, subData).then((res) => {
        setButtonStatus3(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList([]);
          setModalOpen3(false);
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

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    // setFileList(fileList);

    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList2([]);
      setText1("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList2(fileList);
      setText1("");
      setError1(false);
      setButtonStatus4(false);
    }
  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList2([]);
  };

  const handleSubmitProfilePhoto = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("universityLogoFile", FileList2[0]?.originFileObj);

    // for(var x of subData.values()){
    //
    // }

    if (FileList2.length < 1) {
      setError1(true);
    } else {
      setButtonStatus4(true);
      setProgress1(true);
      put(`University/Updatelogo`, subData).then((res) => {
        setButtonStatus4(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList2([]);
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
      <BreadCrumb
        title="University Details"
        backTo={
          userType === userTypes?.Student ? null : (
            <>
              {" "}
              {location.subjectDataUniversityId !== undefined
                ? "Course Details"
                : location.providerId !== undefined
                  ? "Provider Details"
                  : "University"}
            </>
          )
        }
        path={
          userType === userTypes?.Student ? null : (
            <>
              {" "}
              {location.subjectDataUniversityId !== undefined
                ? `/subjectProfile/${location.subjectDataUniversityId}`
                : location.providerId !== undefined
                  ? `/providerDetails/${location.providerId}`
                  : "/universityList"}
            </>
          )
        }
      />

      <div className="uapp-employee-profile">
        <Row>
          <Col md="8">
            <Card>
              <div className="uapp-employee-cover-image">
                <div
                  className="bg-image-profile"
                  style={{
                    backgroundImage: `url(${universityInfo?.coverPhoto
                      ? rootUrl + universityInfo?.coverPhoto?.fileUrl
                      : uapploader2
                      })`,
                  }}
                >
                  {/* {universityInfo?.coverPhoto == null ? (
                    <img src={uapploader2} alt="cover_img" />
                  ) : (
                    <img
                      src={rootUrl + universityInfo?.coverPhoto?.fileUrl}
                      alt="cover_img"
                    />
                  )} */}
                  <div className="uplode-cover-image">
                    {permissions?.includes(permissionList.Edit_University) ? (
                      <span onClick={updateCoverPhoto}>
                        {" "}
                        <i
                          className="fas fa-camera"
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                        </i>
                      </span>
                    ) : null}
                  </div>
                  {/* </div> */}
                </div>
              </div>

              {/* cover photo edit modal starts here */}
              {permissions?.includes(permissionList.Edit_University) ? (
                <Modal
                  isOpen={modalOpen3}
                  toggle={closeModal2}
                  className="uapp-modal"
                >
                  <ModalHeader>Update Cover Photo</ModalHeader>

                  <ModalBody>
                    <form onSubmit={handleSubmitCoverPhoto}>
                      <input type="hidden" name="id" id="id" value={id} />

                      {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col className="ml-5" md="4">
                          <span>
                            Cover Photo <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <div className="row d-flex">
                            {/* {consultantData?.consultantCoverImageMedia !== null ? (
                          <div className="col-md-6">
                            <Image
                              width={104}
                              height={104}
                              src={
                                rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                              }
                            />
                          </div>
                        ) : null} */}

                            <div className="col-md-6">
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
                                <AntdModal
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
                                </AntdModal>

                                <span className="text-danger d-block">
                                  {text}
                                </span>

                                {error && (
                                  <span className="text-danger">
                                    Cover photo is required
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
                              onClick={closeModal2}
                              className="mr-1 mt-3"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="ml-1 mt-3"
                              color="primary"
                              disabled={buttonStatus3}
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
              {/* cover photo edit modal ends here */}
              <CardBody>
                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col>
                      <div className="uapp-employee-profile-image">
                        <div className="text-left">
                          <div className="profile-pic">
                            {universityInfo?.universityLogo == null ? (
                              <img
                                className="empProfileImg"
                                src={uapploader}
                                alt="profile_img"
                              />
                            ) : (
                              <img
                                className="empProfileImg"
                                src={
                                  rootUrl +
                                  universityInfo?.universityLogo?.thumbnailUrl
                                }
                                alt="profile_img"
                              />
                            )}

                            {permissions?.includes(
                              permissionList.Edit_University
                            ) ? (
                              <div class="edit">
                                <span onClick={updateProfilePic}>
                                  <i
                                    className="fas fa-camera"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {" "}
                                  </i>
                                </span>
                              </div>
                            ) : null}
                          </div>

                          {/* profile photo edit modal starts here */}
                          {permissions?.includes(
                            permissionList.Edit_University
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
                                    value={id}
                                  />

                                  {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

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
                                        {/* {consultantData?.consultantCoverImageMedia !== null ? (
                                   <div className="col-md-6">
                                     <Image
                                       width={104}
                                       height={104}
                                       src={
                                         rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                                       }
                                     />
                                   </div>
                                 ) : null} */}

                                        <div className="col-md-6">
                                          <>
                                            <Upload
                                              listType="picture-card"
                                              multiple={false}
                                              fileList={FileList2}
                                              onPreview={handlePreview2}
                                              onChange={handleChange2}
                                              beforeUpload={(file) => {
                                                return false;
                                              }}
                                            >
                                              {FileList2.length < 1 ? (
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
                                              visible={previewVisible2}
                                              title={previewTitle2}
                                              footer={null}
                                              onCancel={handleCancel2}
                                            >
                                              <img
                                                alt="example"
                                                style={{ width: "100%" }}
                                                src={previewImage2}
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
                                          disabled={buttonStatus4}
                                        >
                                          {progress1 ? (
                                            <ButtonLoader />
                                          ) : (
                                            "Update"
                                          )}
                                        </Button>
                                      </div>
                                    </Col>
                                  </FormGroup>
                                </form>
                              </ModalBody>
                            </Modal>
                          ) : null}
                          {/* profile photo edit modal ends here */}
                        </div>
                      </div>
                    </Col>

                    {permissions?.includes(permissionList.Edit_University) ? (
                      <>
                        {userType == userTypes?.Student ? null : (
                          <Col>
                            {/* <div className="uapp-employee-profile-Edit">
                        <div className="text-right">
                          <span> <i className="fas fa-pencil-alt"></i> </span>
                        </div>
                       </div> */}

                            <EditDivButton
                              className={"uapp-employee-profile-Edit"}
                              func={() => handleProfileEdit(id)}
                              permission={6}
                            />
                          </Col>
                        )}
                      </>
                    ) : null}
                  </Row>
                </div>

                <div className="uapp-employee-profile-generalInfo">
                  <Row>
                    <Col md="6">
                      <ul className="uapp-ul text-left">
                        <li>
                          <h4>
                            {universityInfo?.name} ({universityInfo?.shortName})
                          </h4>
                          {userType == userTypes?.SystemAdmin ? (
                            <h6 className="mt-2">
                              Contract Type:{" "}
                              {universityInfo?.contractType?.name}
                            </h6>
                          ) : null}
                        </li>

                        <li>{/* <h6>{employeeType.name}</h6> */}</li>
                      </ul>
                    </Col>

                    <Col md="6">
                      <ul className="uapp-ul text-right1">
                        <li>
                          <span>
                            {" "}
                            Foundation year : {universityInfo?.foundationYear}
                          </span>
                        </li>

                        <li>
                          <span>
                            {" "}
                            Global rank : {universityInfo?.globalRankNumber}
                          </span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Description</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                  </div>
                  <div>
                    <p className="pt-2">{universityInfo?.description}</p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* gallery starts here */}

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Gallery</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-8">
                      {gallery.length > 0 ? (
                        <div className="row row-cols-md-3 row-cols-sm-2 container-fluid">
                          {
                            // gallery.length === 0 ? (
                            //   <p>There is no gallery item added here.</p>
                            // ) : (
                            gallery.map((gall, i) => (
                              <div
                                key={i}
                                className="containerCustom pl-2 pb-2"
                              >
                                <img
                                  src={
                                    rootUrl + gall?.mediaFileMedia?.thumbnailUrl
                                  }
                                  alt="Avatar"
                                  className="image"
                                  style={{ width: "100%" }}
                                />

                                <div className="middle d-flex">
                                  <Button
                                    onClick={() => handleView(gall)}
                                    className="bg-success"
                                  >
                                    View
                                  </Button>
                                  {userType == userTypes?.Student ? null : (
                                    <Button
                                      onClick={() => handleDelete(gall)}
                                      className="bg-danger ml-1"
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))
                            // )
                          }

                          {/* Gallery view modal starts here */}

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
                                    galleryObj?.mediaFileMedia?.thumbnailUrl
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

                          {/* Gallery view modal ends here */}

                          {/* Gallery delete modal starts here */}

                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{delGalName}</b>?
                                Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                disabled={buttonStatus1}
                                color="danger"
                                onClick={() => handleDeleteItem(delGalId)}
                              >
                                {progress3 ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal>

                          {/* Gallery delete modal ends here */}
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
                                id="universityId"
                                name="universityId"
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
                                      // accept={"image/png, image/gif, image/jpeg"}
                                      accept={
                                        "image/png, image/jpeg, video/mp4"
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
                                {permissions?.includes(
                                  permissionList.Edit_University
                                ) ? (
                                  <CustomButtonRipple
                                    type={"submit"}
                                    className={"mr-1 mt-3 badge-primary"}
                                    name={progress2 ? <ButtonLoader /> : "Save"}
                                    permission={6}
                                    isDisabled={buttonStatus}
                                  />
                                ) : null}
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

            {/* gallery ends here */}

            {/* university information starts here */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>General Information</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {permissions?.includes(permissionList.Edit_University) ? (
                      <>
                        {userType == userTypes?.Student ? null : (
                          <div
                            className="text-right edit-style  p-3"
                            onClick={() => handleProfileEdit(id)}
                          >
                            <span>
                              {" "}
                              <i className="fas fa-pencil-alt pencil-style"></i>{" "}
                            </span>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <Table className="table-bordered mt-4">
                    <tbody>
                      <tr>
                        <td width="40%">
                          <b>University Status:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.isActive === true
                            ? "Active"
                            : "Inactive"}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Name:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.name} ({universityInfo?.shortName})
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>University Type:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityType?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Country:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityCountry?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>City:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityCity?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>State:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityState?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Global Rank:</b>
                        </td>

                        <td width="60%">{universityInfo?.globalRankNumber}</td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Foundation Year:</b>
                        </td>

                        <td width="60%">{universityInfo?.foundationYear}</td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Part Time Work Information:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.partTimeWorkInformation}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
            {/* university information ends here */}

            {/* camp list start */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Campus List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>

                    {permissions?.includes(permissionList.Edit_University) ? (
                      <>
                        {" "}
                        {userType == userTypes?.Student ? null : (
                          <ButtonForFunction
                            func={() => setModalOpen(true)}
                            className={"btn btn-uapp-add "}
                            icon={<i className="fas fa-plus"></i>}
                            name={" Add Campus"}
                            permission={6}
                          />
                        )}
                      </>
                    ) : null}

                    {/* campus adding modal starts here */}

                    <Modal
                      isOpen={modalOpen}
                      toggle={closeModal}
                      className="uapp-modal2"
                      size="lg"
                    >
                      <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                        <span className="text-white">University Campus</span>
                      </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={handleSubmitCampus}>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Input
                              type="hidden"
                              id="universityId"
                              name="universityId"
                              value={id}
                            />
                            {/* <Input
                              type="hidden"
                              id="Id"
                              name="Id"
                              value={selectedId}
                            /> */}
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Campus Name{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="text"
                                name="Name"
                                id="Name"
                                placeholder="Enter Campus Name"
                                required
                              />
                              {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Campus Country{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={countryDD}
                                value={{
                                  label: uniCountryLabel,
                                  value: uniCountryValue,
                                }}
                                onChange={(opt) =>
                                  selectUniCountry(opt.label, opt.value)
                                }
                                name="CampusCountryId"
                                id="CampusCountryId"
                              />

                              {countryError ? (
                                <span className="text-danger">
                                  Country is required
                                </span>
                              ) : null}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Campus State{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={universityStateName}
                                value={{
                                  label: uniStateLabel,
                                  value: unistateValue,
                                }}
                                onChange={(opt) =>
                                  selectUniState(opt.label, opt.value)
                                }
                                name="CampusStateId"
                                id="CampusStateId"
                              />

                              {stateError ? (
                                <span className="text-danger">
                                  State is required
                                </span>
                              ) : null}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Campus City{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={cityOptions}
                                value={{ label: cityLabel, value: cityValue }}
                                onChange={(opt) =>
                                  selectCampusCity(opt.label, opt.value)
                                }
                                name="campusCityId"
                                id="campusCityId"
                              />

                              {cityError && (
                                <span className="text-danger">
                                  Campus city is required
                                </span>
                              )}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Address Line
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="text"
                                name="AddressLine"
                                id="AddressLine"
                                placeholder="Enter Address Line"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Total Student
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="TotalStudent"
                                id="TotalStudent"
                                placeholder="Enter Total Student"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                International Student
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="InternationalStudent"
                                id="InternationalStudent"
                                placeholder="Enter International Student"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Average Tution Fee
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageTutionFee"
                                id="AvarageTutionFee"
                                placeholder="Avarage Tution Fee"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Average Living Cost
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageLivingCost"
                                id="AvarageLivingCost"
                                placeholder="Avarage Living Cost"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Average Application Fee
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageApplicationFee"
                                id="AvarageApplicationFee"
                                placeholder="Avarage Application Fee"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>
                                Estimated Total Cost
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="EstimatedTotalCost"
                                id="EstimatedTotalCost"
                                placeholder="Estimated Total Cost"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="3">
                              <span>Campus on Map </span>
                            </Col>
                            <Col md="6">
                              <Input
                                // type="textarea"
                                type="url"
                                rows="3"
                                name="EmbededMap"
                                id="EmbededMap"
                                placeholder="https://example.com"
                              // placeholder="Please type the src link only from the embed map"
                              />
                              <span className="text-danger">
                                Note: Please type the "src" link only from the
                                embed map
                              </span>
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            className="has-icon-left position-relative"
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              color="danger"
                              className="mr-1 mt-3"
                              onClick={closeModal}
                            >
                              Close
                            </Button>

                            {/* localStorage.getItem("updateUni") ? */}
                            {/* <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}

                            {/* <Button.Ripple
                        color="warning"
                        type="submit"
                        className="mr-1 mt-3"
                       
                      >
                        Submit
                      </Button.Ripple> */}

                            <CustomButtonRipple
                              color={"primary"}
                              type={"submit"}
                              className={"ml-1 mt-3"}
                              name={progress4 ? <ButtonLoader /> : "Submit"}
                              permission={6}
                              isDisabled={buttonStatus2}
                            />
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>

                    {/* campus adding modal ends here */}

                    {/* <div className="text-right edit-style  p-3" onClick={()=>handleCampusEdit(id)}>
                      <span>
                        {" "}
                        <i className="fas fa-pencil-alt pencil-style"></i>{" "}
                      </span>
                    </div> */}
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>
                  {campusList.length < 1 ? (
                    <p className="mt-4">There is no campus added here.</p>
                  ) : (
                    <>
                      {loading ? (
                        <h2 className="text-center">Loading...</h2>
                      ) : (
                        <div className="pt-3">
                          {campusList?.map((campus, i) => (
                            <li
                              key={i}
                              className="cursor-pointer hyperlink-hover"
                            >
                              <span
                                onClick={() => {
                                  history.push(`/campusDetails/${campus?.id}`);
                                }}
                              >
                                {campus?.name} - {campus?.addressLine}
                              </span>
                            </li>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
            {/* camp list end */}

            {/* all subject starts here */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Course List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3"> */}
                    {permissions?.includes(permissionList.Edit_Subjects) ? (
                      <>
                        {" "}
                        {userType == userTypes?.Student ? null : (
                          <ButtonForFunction
                            func={handleAddUniversitySubject}
                            className={"btn btn-uapp-add "}
                            icon={<i className="fas fa-plus"></i>}
                            name={" Add Course"}
                            permission={6}
                          />
                        )}
                      </>
                    ) : null}
                    {/* </div> */}
                  </div>
                  {subList.length < 1 ? (
                    <p className="mt-4">There is no Course added here.</p>
                  ) : (
                    <>
                      {loading ? (
                        <h2 className="text-center">Loading...</h2>
                      ) : (
                        <div className="table-responsive pt-3">
                          <Table
                            className="table-sm striped"
                            style={tableStyle}
                          >
                            <thead className="tablehead">
                              <tr style={{ textAlign: "center" }}>
                                <th scope="row">#</th>
                                <th>Course Name</th>
                                <th>Education Level</th>
                                <th>Department</th>
                                <th>Sub Department</th>
                                <th
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {subList?.map((sub, i) => (
                                <tr key={i} style={{ textAlign: "center" }}>
                                  <th scope="row">{serialNum + i}</th>

                                  <td>{sub?.name}</td>

                                  <td>{sub?.educationLevel?.name}</td>

                                  <td>{sub?.department?.name}</td>

                                  <td>{sub?.subDepartment?.name}</td>

                                  <td
                                    style={{ width: "8%" }}
                                    className="text-center"
                                  >
                                    <ButtonGroup variant="text">
                                      {/* <Link to={`/subjectProfile/${sub?.id}`}>
                                        <Button
                                          color="primary"
                                          className="mx-1 btn-sm"
                                        >
                                          {" "}
                                          <i className="fas fa-eye"></i>{" "}
                                        </Button>
                                      </Link> */}

                                      <ButtonForFunction
                                        func={() =>
                                          redirectToSubjectProfile(sub?.id)
                                        }
                                        className={"mx-1 btn-sm"}
                                        color={"primary"}
                                        icon={<i className="fas fa-eye"></i>}
                                      />
                                      {/* <Button color="dark" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-edit"></i>{" "}
                                </Button>
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i className="fas fa-trash-alt"></i>
                                </Button> */}
                                    </ButtonGroup>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
            {/* all subject ends here */}

            {/* intake filter */}

            {/* {subList.length < 1 ? null : (
              <Card className="uapp-employee-search mt-4">
                <CardBody className="search-card-body ms-3">
                  <div className="hedding-titel d-flex justify-content-between mb-4 mt-3">
                    <div>
                      <h5>
                        {" "}
                        <b>Course Intake</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Row>
                        <Col lg="5" md="4" sm="6" xs="6">
                          <Select
                            options={intakeDropDown}
                            value={{ label: intakeLabel, value: intakeValue }}
                            onChange={(opt) =>
                              selectIntakeType(opt.label, opt.value)
                            }
                            name="UniversityTypeId"
                            id="UniversityTypeId"
                          />
                        </Col>

                        <Col lg="5" md="4" sm="6" xs="6">
                          <Select
                            options={intakeStatusDropDown}
                            value={{ label: statusLabel, value: statusValue }}
                            onChange={(opt) =>
                              selectStatusType(opt.label, opt.value)
                            }
                            name="UniversityCountryId"
                            id="UniversityCountryId"
                          />
                        </Col>

                        <Col lg="2" md="4" sm="6" xs="6">
                         
                          <Button
                            type="submit"
                            className="btn btn-uapp-add btn btn-secondary"
                          >
                            Apply
                          </Button>
                        
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup>
                      <Row className="">
                        <Col lg="12" md="12" sm="12" xs="12">
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <div
                              className="mt-1 mx-1 d-flex btn-clear"
                              onClick={handleClearSearch}
                            >
                             
                              <span className="text-danger">
                                <i className="fa fa-times"></i> Clear
                              </span>
                            </div>

                            
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                     

                    <Input
                      type="hidden"
                      name="universityId"
                      id="universityId"
                      value={id}
                    />

                    <FormGroup>
                      <Row>
                        <Col sm="6" className="text-center">
                          

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              onChange={handleChange}
                              type="checkbox"
                              checked={
                                subList.filter((sub) => sub?.isChecked !== true)
                                  .length < 1
                              }
                              disabled={
                                subList.filter((sub) => sub?.isChecked !== true)
                                  .length < 1
                              }
                              name="allSelect"
                            />
                            <label className="form-check-label" htmlFor="">
                              <b>Select all</b>
                            </label>
                          </div>
                        </Col>

                        <Col sm="6" className="text-center">
                          

                          <div className="form-check ms-auto">
                            <input
                              className="form-check-input"
                              onChange={handleChange}
                              type="checkbox"
                              checked={
                                subList.filter(
                                  (sub) => sub?.isChecked !== false
                                ).length < 1
                              }
                              disabled={
                                subList.filter(
                                  (sub) => sub?.isChecked !== false
                                ).length < 1
                              }
                              name="allDeselect"
                            />
                            <label className="form-check-label" htmlFor="">
                              <b>Deselect all</b>
                            </label>
                          </div>
                        </Col>
                        <br />
                        <br />
                        

                        {subList?.map((sub, i) => (
                          <Col
                            xs="6"
                            sm="4"
                            md="3"
                            key={i}
                            className=""
                          >
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleChange}
                                name={sub.name}
                                checked={sub?.isChecked || false}
                                
                                value={sub?.id}
                              />
                              <label className="form-check-label" htmlFor="">
                                {sub.name}
                              </label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </FormGroup>

                    
                  </Form>
                </CardBody>
              </Card>
            )} */}

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Commission</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>

                  {JSON.stringify(data) === "{}" || data === null ? (
                    <p>There is no commission added here.</p>
                  ) : (
                    <div className="customCard rounded">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-4">
                              <h5> Home </h5>
                              <span>
                                Commission Type:{" "}
                                {data?.homeStudentComissionType == 1
                                  ? "Amount"
                                  : "Percentage"}
                              </span>
                              <br />

                              <span>
                                Installment:{" "}
                                {data?.homeStudentComissionInstallment}
                              </span>
                              <br />
                              <span>
                                Value: {data?.homeStudentComissionValue}
                              </span>
                            </div>

                            <div className="col-md-4">
                              <h5> International </h5>
                              <span>
                                Commission Type:{" "}
                                {data?.internationalStudentComissionType == 1
                                  ? "Amount"
                                  : "Percentage"}
                              </span>
                              <br />

                              <span>
                                Installment:{" "}
                                {data?.internationalStudentComissionInstallment}
                              </span>
                              <br />
                              <span>
                                Value:{" "}
                                {data?.internationalStudentComissionValue}
                              </span>
                            </div>

                            <div className="col-md-4">
                              <h5> EU/UK </h5>
                              <span>
                                Commission Type:{" "}
                                {data?.eU_UKStudentComissionType == 1
                                  ? "Amount"
                                  : "Percentage"}
                              </span>
                              <br />

                              <span>
                                Installment:{" "}
                                {data?.eU_UKStudentComissionInstallment}
                              </span>
                              <br />
                              <span>
                                Value: {data?.eU_UKStudentComissionValue}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Application Documents</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div>
                  </div>

                  {appDocument.length < 1 ? (
                    <p>There are no application documents added here.</p>
                  ) : (
                    <Table className="table-sm striped">
                      <thead className="">
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>Name</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appDocument?.map((application, i) => (
                          <tr
                            key={application?.id}
                            style={{ textAlign: "center" }}
                          >
                            <th scope="row">{i + 1}</th>
                            <td>{application?.document?.name}</td>
                            <td>
                              {application?.applicationTypeId === 1
                                ? "Home"
                                : application?.applicationTypeId === 2
                                ? "EU/UK"
                                : "International"}
                            </td>

                            <td>
                            <a
                              href={rootUrl + application?.document?.fileUrl}
                              target="_blank"
                              download
                            >
                              Download
                            </a>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </div> */}

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Template Documents</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>

                  {tempDocument.length < 1 ? (
                    <p>There are no template documents added here.</p>
                  ) : (
                    <Table className="table-sm striped">
                      <thead className="tablehead">
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Type</th>
                          <th>File</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempDocument?.map((temp, i) => (
                          <tr key={temp?.id} style={{ textAlign: "center" }}>
                            <th scope="row">{i + 1}</th>
                            <td>{temp?.name}</td>
                            <td>{temp?.description}</td>
                            <td>
                              {temp?.applicationTypeId === 1
                                ? "Home"
                                : temp?.applicationTypeId === 2
                                  ? "EU/UK"
                                  : "International"}
                            </td>
                            <td>
                              <a
                                href={rootUrl + temp?.templateFile?.fileUrl}
                                target="_blank"
                              // download
                              >
                                Download
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>

          <Col md="4">
            {universityInfo?.contractTypeId !== 1 ? (
              <>
                {userType == userTypes?.SystemAdmin ? (
                  <Card className="uapp-employee-profile-right1">
                    <div
                      style={{
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      }}
                      className="uapp-profile-CardHeader"
                    >
                      <div className="uapp-circle-image margin-top-minus">
                        {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                          null ? (
                          <img src={profileImage} alt="provider_img" />
                        ) : (
                          <img
                            src={
                              rootUrl +
                              universityInfo?.provider?.providerLogoMedia
                                ?.fileUrl
                            }
                            alt="provider_img"
                          />
                        )}
                      </div>

                      <h5>
                        {universityInfo?.provider?.name} (
                        {universityInfo?.provider?.providerViewId})
                      </h5>
                      <p> {universityInfo?.provider?.providerType?.name} </p>
                    </div>
                    <CardBody>
                      <div>
                        <ul className="uapp-ul text-center">
                          <li> {universityInfo?.provider?.addressLine} </li>
                          <li> {universityInfo?.provider?.email} </li>
                          <li> {universityInfo?.provider?.phoneNumber} </li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                ) : null}
              </>
            ) : (
              <>
                <Card className="uapp-employee-profile-right1">
                  <div
                    style={{
                      borderTopLeftRadius: "7px",
                      borderTopRightRadius: "7px",
                    }}
                    className="uapp-profile-CardHeader"
                  >
                    <div className="uapp-circle-image margin-top-minus">
                      {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                        null ? (
                        <img src={profileImage} alt="provider_img" />
                      ) : (
                        <img
                          src={
                            rootUrl +
                            universityInfo?.provider?.providerLogoMedia
                              ?.thumbnailUrl
                          }
                          alt="provider_img"
                        />
                      )}
                    </div>

                    <h5>
                      {universityInfo?.provider?.name} (
                      {universityInfo?.provider?.providerViewId})
                    </h5>
                    <p> {universityInfo?.provider?.providerType?.name} </p>
                  </div>
                  <CardBody>
                    <div>
                      <ul className="uapp-ul text-center">
                        <li> {universityInfo?.provider?.addressLine} </li>
                        <li> {universityInfo?.provider?.email} </li>
                        <li> {universityInfo?.provider?.phoneNumber} </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}
            {/* for showing provider information ends here */}

            {/* For showing financial cost */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Financial Cost</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {JSON.stringify(financialInfo) === "{}" ||
                  financialInfo === null ? (
                  <p>There is no financial information added here.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Average Tution Fee</span>
                      <p>
                        {universityInfo?.universityCountry?.id == 1
                          ? "£"
                          : universityInfo?.universityCountry?.id == 3
                            ? "CA$"
                            : universityInfo?.universityCountry?.id == 2
                              ? "$"
                              : universityInfo?.universityCountry?.id == 4
                                ? "€"
                                : null}
                        {financialInfo?.avarageTutionFee}
                      </p>
                    </div>

                    {/* <div className="d-flex justify-content-between">
                      <span>Average Application Fee</span>
                      <p>{universityInfo?.universityCountry?.id == 1 ?  '£' : universityInfo?.universityCountry?.id == 3 ? 'CA$' : universityInfo?.universityCountry?.id == 2 ? '$' : universityInfo?.universityCountry?.id == 4 ? '€' : null}{financialInfo?.avarageApplicationFee}</p>
                    </div> */}

                    <div className="d-flex justify-content-between">
                      <span>Average Living Cost</span>
                      <p>
                        {universityInfo?.universityCountry?.id == 1
                          ? "£"
                          : universityInfo?.universityCountry?.id == 3
                            ? "CA$"
                            : universityInfo?.universityCountry?.id == 2
                              ? "$"
                              : universityInfo?.universityCountry?.id == 4
                                ? "€"
                                : null}
                        {financialInfo?.avarageLivingCost}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Estimated Total Cost</span>
                      <p>
                        {universityInfo?.universityCountry?.id == 1
                          ? "£"
                          : universityInfo?.universityCountry?.id == 3
                            ? "CA$"
                            : universityInfo?.universityCountry?.id == 2
                              ? "$"
                              : universityInfo?.universityCountry?.id == 4
                                ? "€"
                                : null}
                        {financialInfo?.estimatedTotalCost}
                      </p>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
            {/* financial cost end here */}

            {/* features */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Features</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {JSON.stringify(universityFeatures) === "{}" ||
                  universityFeatures === null ? (
                  <p>There is no feature added here.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Accommodations</span>
                      <p>
                        {universityFeatures?.accommodations === false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Conditional Offer Letter</span>
                      <p>
                        {universityFeatures?.conditionalOfferLetter ===
                          false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Internship Participation</span>
                      <p>
                        {universityFeatures?.intershipParticipation ===
                          false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Practical Training</span>
                      <p>
                        {universityFeatures?.practicalTraining === false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Work While Studying</span>
                      <p>
                        {universityFeatures?.workWhileStudying === false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>

            {/* <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Test Score</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div>
                </div>

                {JSON.stringify(score) === "{}" || score === null ? (
                  <p>There is no test score added here.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Test Score Required</span>
                      <p>
                        {score?.isTestScoreRequired === false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>IELTS Mandatory</span>
                      <p>
                        {score?.isIeltsMandatory === false ? (
                          <i className="text-danger fas fa-times-circle"></i>
                        ) : (
                          <i className="text-success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      {
                        score?.isIeltsMandatory === false ?
                        <span>IELTS Equivalent Score</span> :
                        <span>IELTS Score</span>
                      }
                      <p>{score?.score}</p>
                    </div>
                  </>
                )}
              </CardBody>
            </Card> */}

            {/* show recruitment type starts here */}
            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Recruitment Type</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                <>
                  <div className="d-flex justify-content-between">
                    <span>Accept Home</span>
                    <p>
                      {universityInfo?.isAcceptHome === false ? (
                        <i className="text-danger fas fa-times-circle"></i>
                      ) : (
                        <i className="text-success fas fa-check-circle"></i>
                      )}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Accept EU/UK</span>
                    <p>
                      {universityInfo?.isAcceptEU_UK === false ? (
                        <i className="text-danger fas fa-times-circle"></i>
                      ) : (
                        <i className="text-success fas fa-check-circle"></i>
                      )}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Accept International</span>
                    <p>
                      {universityInfo?.isAcceptInternational === false ? (
                        <i className="text-danger fas fa-times-circle"></i>
                      ) : (
                        <i className="text-success fas fa-check-circle"></i>
                      )}
                    </p>
                  </div>
                </>
              </CardBody>
            </Card>
            {/* show recruitment type ends here */}

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

                {universityInfo?.locationOnGoogleMap === null ? (
                  <p>There is no embeded map added here.</p>
                ) : (
                  <>
                    <div className="">
                      <iframe
                        src={universityInfo?.locationOnGoogleMap}
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

export default UniversityDetails;
