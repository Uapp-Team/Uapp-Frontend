import React, { createRef, useEffect, useState } from "react";
// import 'react-dropzone-uploader/dist/styles.css'
import { connect, useSelector } from "react-redux";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import Axios from "axios";

import { rootUrl } from "../../../../constants/constants";
import { padding } from "@mui/system";
import get from "../../../../helpers/get";
import PicturesWall from "../UniversityLogo";
import CoverPicturesWall from "../UniversityCover";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../Components/ButtonForFunction";

import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";

import { Image } from "antd";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../constants/userTypeConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddProviderUniversity = () => {
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversitiesType] = useState([]);
  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [activetab, setActivetab] = useState("1");
  const [description, setDescription] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type...");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniTypeError, setUniTypeError] = useState(false);
  const [provider, setProvider] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select University Country..."
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);

  const [uniStateLabel, setUniStateLabel] = useState(
    "Select University State..."
  );
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select University City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);

  const [achome, setAcHome] = useState(false);
  const [aceu, setAcEu] = useState(false);
  const [acint, setAcInt] = useState(false);

  const [contractTypeDD, setContractTypeDD] = useState([]);
  const [contractTypeLabel, setContractTypeLabel] = useState(
    "Select Contract Type..."
  );
  const [contractTypeValue, setContractTypeValue] = useState(0);
  const [contractTypeError, setContractTypeError] = useState(false);

  const [logoFiles, setLogoFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);

  const [exactCoverFile, setExactCoverFile] = useState({});
  const [exactLogoFile, setExactLogoFile] = useState({});

  // const [coverDropzoneError, setCoverDropzoneError] = useState("");
  const [coverDropzoneError, setCoverDropzoneError] = useState(false);
  // const [logoDropzoneError, setLogoDropzoneError] = useState("");
  const [logoDropzoneError, setLogoDropzoneError] = useState(false);

  const [submitData, setSubmitData] = useState(false);
  const [universityId, setUniversityId] = useState(undefined);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const location = useLocation();
  const { providerProfileId, univerId } = useParams();

  const [providerProId, setProviderProId] = useState(
    location?.providerProfileId
  );

  const AuthStr = localStorage.getItem("token");

  const [logoFile, setLogoFile] = useState({});
  const [coverFile, setCoverFile] = useState({});
  const [universityData, setUniversityData] = useState({});
  const [uniId, setUniId] = useState(undefined);
  const [check, setCheck] = useState(true);

  // For uploading university logo
  const [FileList1, setFileList1] = useState([]);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");

  // For uploading university cover image
  const [FileList2, setFileList2] = useState([]);
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const styleLabelBold = {
    // fontWeight: "bold"
  };

  //   const [providerValue, setProviderValue] = useState(0);

  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");

  const handleChange1 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList1(fileList);
      setLogoDropzoneError(false);
      setError("");
    }
  };

  const handleChange2 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList2([]);
      setError2("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList2(fileList);
      setCoverDropzoneError(false);
      setError2("");
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

  const handleCancel2 = () => {
    setPreviewVisible2(false);
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

  //   useEffect(()=>{
  //     get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{

  //         setProviderValue(res != 0 ? res : 0);

  //     })
  //   },[userType, referenceId])

  useEffect(() => {
    get("ProviderDD/Index")
      .then((res) => {
        setProvider(res);
      })
      .catch();
    get("UniversityCountryDD/Index")
      .then((res) => {
        setUniverSityCountries(res);
      })
      .catch();
    get("UniversityTypeDD/Index")
      .then((res) => {
        setUniversitiesType(res);
      })
      .catch();
    // get("UniversityState/Index")
    //   .then((res) => {
    //     setUniversityStates(res);
    //   })
    //   .catch();
    get("ContractTypeDD/Index")
      .then((res) => {
        setContractTypeDD(res);
        //
      })
      .catch();

    if (univerId != undefined) {
      get(`University/get/${univerId}`).then((res) => {
        setContractTypeLabel(res?.contractType?.name);
        setContractTypeValue(res?.contractType?.id);
        setUniversityData(res);
        setProviderTypeLabel(res?.provider?.name);
        setProviderTypeValue(res?.provider?.value);
        setUniTypeLabel(res?.universityType?.name);
        setUniTypeValue(res?.universityType?.id);
        setUniCountryLabel(res?.universityCountry?.name);
        setUniCountryValue(res?.universityCountry?.id);
        setUniStateLabel(res?.universityState?.name);
        setUniStateValue(res?.universityState?.id);
        setCityLabel(res?.universityCity?.name);
        setCityValue(res?.universityCity?.id);
        setAcHome(`${res?.isAcceptHome}`);
        setAcEu(`${res?.isAcceptEU_UK}`);
        setAcInt(`${res?.isAcceptInternational}`);
        setUniId(res?.id);
        setCheck(false);
      });
    }

    if (universityId != undefined) {
      get(`University/get/${universityId}`).then((res) => {
        setContractTypeLabel(res?.contractType?.name);
        setContractTypeValue(res?.contractType?.id);
        setUniversityData(res);
        setProviderTypeLabel(res?.provider?.name);
        setProviderTypeValue(res?.provider?.value);
        setUniTypeLabel(res?.universityType?.name);
        setUniTypeValue(res?.universityType?.id);
        setUniCountryLabel(res?.universityCountry?.name);
        setUniCountryValue(res?.universityCountry?.id);
        setUniStateLabel(res?.universityState?.name);
        setUniStateValue(res?.universityState?.id);
        setCityLabel(res?.universityCity?.name);
        setCityValue(res?.universityCity?.id);
        setAcHome(`${res?.isAcceptHome}`);
        setAcEu(`${res?.isAcceptEU_UK}`);
        setAcInt(`${res?.isAcceptInternational}`);
        setUniId(res?.id);
        setCheck(false);
      });
    }
  }, [univerId, universityId]);

  // const logoResult =  useSelector((state) => state.UniversityLogoImageReducer.universityLogoImage);
  // const coverResult = useSelector((state)=> state.UniversityCoverImageReducer.universityCoverImage);

  const [providerTypeLabel, setProviderTypeLabel] =
    useState("Select Provider...");
  const [providerTypeValue, setProviderTypeValue] = useState(0);

  const handleHome = (event) => {
    setAcHome(event.target.value);
  };

  const handleEu = (event) => {
    setAcEu(event.target.value);
  };

  const handleInt = (event) => {
    setAcInt(event.target.value);
  };

  const selectContractType = (label, value) => {
    setContractTypeError(false);
    setContractTypeLabel(label);
    setContractTypeValue(value);
  };

  const contractMenu = contractTypeDD.map((contract) => ({
    label: contract?.name,
    value: contract?.id,
  }));

  const myForm = createRef();

  const history = useHistory();

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    // subdata.append("UniversityLogoFile", logoResult[0]?.originFileObj);
    // subdata.append("CoverImageFile", coverResult[0]?.originFileObj);

    subdata.append(
      "UniversityLogoFile",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );
    subdata.append(
      "CoverImageFile",
      FileList2.length == 0 ? null : FileList2[0]?.originFileObj
    );

    //  watch form data values
    // for (var value of subdata.values()) {

    // }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: AuthStr,
      },
    };

    // if(providerTypeValue === 0){
    //
    // setProviderTypeError(true);
    // }
    if (uniTypeValue === 0) {
      setUniTypeError(true);
    } else if (contractTypeValue === 0) {
      setContractTypeError(true);
    } else if (uniCountryValue === 0) {
      setUniCountryError(true);
    } else if (unistateValue === 0) {
      setUniStateError(true);
    } else if (cityValue === 0) {
      // setCityError('University city is required');
      setCityError(true);
    } else if (FileList1.length < 1 && check) {
      setLogoDropzoneError(true);
    }
    // if(FileList1.length>=1 && uniId != undefined ){
    //   setLogoDropzoneError(false);
    // }
    else if (FileList2.length < 1 && check) {
      setCoverDropzoneError(true);
    }
    // if(FileList2.length>=1 && uniId != undefined)
    // {
    //   setCoverDropzoneError(false);
    // }
    else {
      if (uniId != undefined) {
        setButtonStatus(true);
        setProgress(true);
        put("University/Update", subdata, config).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            history.push(
              `/addProviderUniversityCampus/${providerProfileId}/${uniId}`
            );
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}University/Create`, subdata, config).then(
          (res) => {
            setButtonStatus(false);
            setProgress(false);
            //  .setItem("id", res.data.result.id);
            const uniID = res.data.result.id;
            setUniversityId(uniID);

            if (res.status === 200 && res.data.isSuccess === true) {
              setSubmitData(true);
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              history.push({
                pathname: `/addProviderUniversityCampus/${providerProfileId}/${uniID}`,
                id: uniID,
              });
            }
          }
        );
      }
    }
  };

  // select University Type
  const selectUniType = (label, value) => {
    setUniTypeError(false);
    setUniTypeLabel(label);
    setUniTypeValue(value);
  };

  const searchStateByCountry = (countryValue) => {
    get(`UniversityStateDD/Index/${countryValue}`).then((res) => {
      setUniversityStates(res);
    });
    get(`UniversityCityDD/Index/${countryValue}`).then((res) => {
      setCity(res);
    });
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("Select University State");
    setUniStateValue(0);
    setCityLabel("Select University City");
    setCityValue(0);
    searchStateByCountry(value);
  };

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const cityOptions = city?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  const selectUniCity = (label, value) => {
    setCityError(false);
    setCityLabel(label);
    setCityValue(value);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);

    if (univerId != undefined) {
      if (tab == "2") {
        history.push(
          `/addProviderUniversityCampus/${providerProfileId}/${univerId}`
        );
      }
      // if (tab == "3") {
      //   history.push(`/addProviderUniversityTestScore/${providerProfileId}/${univerId}`);
      // }
      if (tab == "3") {
        history.push(
          `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`
        );
      }
      if (tab == "4") {
        history.push(
          `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`
        );
      }
      if (tab == "5") {
        history.push(
          `/addProviderUniversityGallery/${providerProfileId}/${univerId}`
        );
      }
      // if (tab == "7") {
      //   history.push(`/addProviderUniversityApplicationDocument/${providerProfileId}/${univerId}`);
      // }
      if (tab == "6") {
        history.push(
          `/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`
        );
      }
      if (tab == "7") {
        history.push(
          `/addProviderUniversityCommission/${providerProfileId}/${univerId}`
        );
      }
    } else {
      if (tab == "2") {
        history.push(
          `/addProviderUniversityCampus/${providerProfileId}/${universityId}`
        );
      }
      // if (tab == "3") {
      //   history.push(`/addProviderUniversityTestScore/${providerProfileId}/${univerId}`);
      // }
      if (tab == "3") {
        history.push(
          `/addProviderUniversityFinancial/${providerProfileId}/${universityId}`
        );
      }
      if (tab == "4") {
        history.push(
          `/addProviderUniversityFeatures/${providerProfileId}/${universityId}`
        );
      }
      if (tab == "5") {
        history.push(
          `/addProviderUniversityGallery/${providerProfileId}/${universityId}`
        );
      }
      // if (tab == "7") {
      //   history.push(`/addProviderUniversityApplicationDocument/${universityId}`);
      // }
      if (tab == "6") {
        history.push(
          `/addProviderUniversityTemplateDocument/${providerProfileId}/${universityId}`
        );
      }
      if (tab == "7") {
        history.push(
          `/addProviderUniversityCommission/${providerProfileId}/${universityId}`
        );
      }
    }
  };

  const universityTypeName = universityTypes?.map((uniType) => ({
    label: uniType.name,
    value: uniType.id,
  }));
  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  // redirect to dashboard
  const backToProviderDetails = () => {
    history.push(`/providerDetails/${providerProfileId}`);
  };

  // redirect to Next Page
  const onNextPage = () => {
    const uniID = universityId;
    if (uniId != undefined) {
      history.push(
        `/addProviderUniversityCampus/${providerProfileId}/${uniId}`
      );
    } else {
      history.push({
        pathname: `/addProviderUniversityCampus/${providerProfileId}/${uniID}`,
        id: uniID,
      });
    }
  };

  const handleCancelAdd = () => {
    history.push(`/providerDetails/${providerProfileId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="University Information"
        backTo="Provider Details"
        path={`/providerDetails/${providerProfileId}`}
      />

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Basic Information
              </NavLink>
            </NavItem>
            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Campuses
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Campuses
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Test Score
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Test Score
                </NavLink>
              )}
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Financial
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Financial
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Features
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "4"}>
                  Features
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Gallery
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Gallery
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                  Application Document
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "7"}>
                  Application Document
                </NavLink>
              )}
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                  Template Document
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "6"}>
                  Template Document
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                  Commission
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "7"}>
                  Commission
                </NavLink>
              )}
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>University Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
                </div>
                {
                  // method == 'put' ?
                  uniId != undefined ? (
                    <>
                      <input type="hidden" name="id" id="id" value={uniId} />

                      <input
                        type="hidden"
                        name="providerId"
                        id="providerId"
                        value={universityData?.providerId}
                      />
                    </>
                  ) : null
                }
                {uniId === undefined && providerProfileId !== undefined ? (
                  <Input
                    type="hidden"
                    name="providerId"
                    id="providerId"
                    value={providerProfileId}
                  />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      defaultValue={universityData?.name}
                      placeholder="Write University Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Short Name{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="ShortName"
                      id="ShortName"
                      defaultValue={universityData?.shortName}
                      placeholder="Write University Short Name"
                      pattern="[A-Za-z]{1,15}"
                      title="You can type maximum 15 characters. You can't type any space and special character."
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityTypeName}
                      value={{ label: uniTypeLabel, value: uniTypeValue }}
                      onChange={(opt) => selectUniType(opt.label, opt.value)}
                      name="UniversityTypeId"
                      id="UniversityTypeId"
                    />

                    {uniTypeError ? (
                      <span className="text-danger">
                        University type is required
                      </span>
                    ) : null}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Contract Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={contractMenu}
                      value={{
                        label: contractTypeLabel,
                        value: contractTypeValue,
                      }}
                      onChange={(opt) =>
                        selectContractType(opt.label, opt.value)
                      }
                      name="contractTypeId"
                      id="contractTypeId"
                    />

                    {contractTypeError ? (
                      <span className="text-danger">
                        Contract type is required
                      </span>
                    ) : null}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityCountryName}
                      value={{ label: uniCountryLabel, value: uniCountryValue }}
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="UniversityCountryId"
                      id="UniversityCountryId"
                    />

                    {uniCountryError && (
                      <span className="text-danger">
                        University country is required
                      </span>
                    )}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University State <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityStateName}
                      value={{ label: uniStateLabel, value: unistateValue }}
                      onChange={(opt) => selectUniState(opt.label, opt.value)}
                      name="UniversityStateId"
                      id="UniversityStateId"
                    />

                    {uniStateError && (
                      <span className="text-danger">
                        University state is required
                      </span>
                    )}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University City <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={cityOptions}
                      value={{ label: cityLabel, value: cityValue }}
                      onChange={(opt) => selectUniCity(opt.label, opt.value)}
                      name="universityCityId"
                      id="universityCityId"
                    />

                    {cityError && (
                      <span className="text-danger">
                        University city is required
                      </span>
                    )}
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Global Rank </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="GlobalRankNumber"
                      id="GlobalRankNumber"
                      defaultValue={universityData?.globalRankNumber}
                      placeholder="Write University Global Rank"
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Foundation Year </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="FoundationYear"
                      id="FoundationYear"
                      defaultValue={universityData?.foundationYear}
                      placeholder="Write University Foundation Year"
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                {/* <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Required Minimum Result (%) </span> <span className="text-danger">*</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="RequiredResult"
                      id="RequiredResult"
                      defaultValue={universityData?.requiredResult}
                      placeholder="Write Minimum Result"
                      required
                      max={100}
                    />
                  </Col>
                </FormGroup> */}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>University Description</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="Description"
                      id="Description"
                      rows="3"
                      // value={description}
                      defaultValue={universityData?.description}
                      placeholder="Write Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Location </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      defaultValue={universityData?.location}
                      placeholder="Write University Location"
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Location on Map</span>
                  </Col>
                  <Col md="6">
                    <Input
                      // type="textarea"
                      type="url"
                      name="locationOnGoogleMap"
                      id="locationOnGoogleMap"
                      rows="3"
                      // value={description}
                      defaultValue={universityData?.locationOnGoogleMap}
                      // placeholder="Location on Google Map"
                      placeholder="https://example.com"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="text-danger">
                      Note: Please type the "src" link only from the embed map
                    </span>
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Part Time Work Information </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="PartTimeWorkInformation"
                      id="PartTimeWorkInformation"
                      rows="3"
                      defaultValue={universityData?.partTimeWorkInformation}
                      placeholder="Write Part Time Work Information"
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Logo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {universityData?.universityLogo ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              universityData?.universityLogo?.thumbnailUrl
                            }
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

                    {logoDropzoneError && (
                      <span className="text-danger">Logo is required</span>
                    )}
                    <span className="text-danger d-block">{error}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Cover Photo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {universityData?.coverPhoto ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl + universityData?.coverPhoto?.thumbnailUrl
                            }
                          />
                        </div>
                      ) : null}

                      <div className="col-md-3">
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
                              <span>Upload</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <AntdModal
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
                        </AntdModal>
                      </div>
                    </div>

                    {/* <CoverPicturesWall/> */}

                    {coverDropzoneError && (
                      <span className="text-danger">
                        Cover photo is required
                      </span>
                    )}
                    <span className="text-danger">{error2}</span>
                  </Col>
                </FormGroup>

                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Recruitment Type</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
                </div>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Home/UK </span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptHome"
                        onChange={handleHome}
                        name="isAcceptHome"
                        value="true"
                        checked={achome == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptHome"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptHome"
                        onChange={handleHome}
                        name="isAcceptHome"
                        value="false"
                        checked={achome == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptHome"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>EU/EEU </span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptEU_UK"
                        onChange={handleEu}
                        name="isAcceptEU_UK"
                        value="true"
                        checked={aceu == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptEU_UK"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptEU_UK"
                        onChange={handleEu}
                        name="isAcceptEU_UK"
                        value="false"
                        checked={aceu == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptEU_UK"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>International </span>
                  </Col>
                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptInternational"
                        onChange={handleInt}
                        name="isAcceptInternational"
                        value="true"
                        checked={acint == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptInternational"
                        style={styleLabelBold}
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptInternational"
                        onChange={handleInt}
                        name="isAcceptInternational"
                        value="false"
                        checked={acint == "false"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptInternational"
                        style={styleLabelBold}
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                {/* <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup> */}
                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}

                  <Col md="1">
                    <Button
                      className={"mr-0 mt-3"}
                      onClick={handleCancelAdd}
                      color={"danger"}
                    >
                      Cancel
                    </Button>
                  </Col>

                  <Col md="4">
                    {permissions?.includes(
                      permissionList?.Add_University ||
                        permissionList?.Edit_University
                    ) ? (
                      <ButtonForFunction
                        type={"submit"}
                        className={"mr-0 mt-3 badge-primary"}
                        name={progress ? <ButtonLoader /> : "Save"}
                        disable={buttonStatus}
                      />
                    ) : null}
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                }}
              >
                {/* <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                /> */}

                <ButtonForFunction
                  func={onNextPage}
                  disable={uniId == undefined ? true : false}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProviderUniversity;
