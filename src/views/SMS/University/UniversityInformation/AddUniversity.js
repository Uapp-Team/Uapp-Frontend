import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Axios from "axios";

import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import { Image } from "antd";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import { userTypes } from "../../../../constants/userTypeConstant";
import Currency from "../../../../components/Dropdown/Currency";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddUniversity = (props) => {
  const { univerId, provideId } = useParams();

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  const [universityTypes, setUniversitiesType] = useState([]);
  const [universityStates, setUniversityStates] = useState([]);
  const [activetab, setActivetab] = useState("1");
  const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniTypeError, setUniTypeError] = useState(false);
  const [provider, setProvider] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select University Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);
  const [uniStateLabel, setUniStateLabel] = useState("Select University State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);
  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select University City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);
  const [contractTypeDD, setContractTypeDD] = useState([]);
  const [contractTypeLabel, setContractTypeLabel] = useState(
    "Select Contract Type"
  );
  const [contractTypeValue, setContractTypeValue] = useState(0);
  const [contractTypeError, setContractTypeError] = useState(false);
  const [coverDropzoneError, setCoverDropzoneError] = useState(false);
  const [logoDropzoneError, setLogoDropzoneError] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const AuthStr = localStorage.getItem("token");
  const [universityData, setUniversityData] = useState({});
  const [uniId, setUniId] = useState(undefined);
  // const [check, setCheck] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  // const [universityId, setUniversityId] = useState(undefined);
  const { addToast } = useToasts();
  const location = useLocation();
  const [homeCurrencyId, sethomeCurrencyId] = useState(0);
  const [homeCurrencyIdError, sethomeCurrencyIdError] = useState(false);
  const [internationalCurrencyId, setinternationalCurrencyId] = useState(0);
  const [internationalCurrencyIdError, setinternationalCurrencyIdError] =
    useState(false);
  // For uploading university logo
  const [FileList1, setFileList1] = useState([]);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [logoText, setLogoText] = useState("");

  // For uploading university cover image
  const [FileList2, setFileList2] = useState([]);
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [coverText, setCoverText] = useState("");
  const [providerValue, setProviderValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const [providerTypeLabel, setProviderTypeLabel] = useState("Select Provider");
  const [providerTypeValue, setProviderTypeValue] = useState(0);
  const [providerTypeError, setProviderTypeError] = useState(false);
  const [universityName, setUniversityName] = useState("");
  const [universityNameError, setUniversityNameError] = useState("");
  const [universityShortName, setUniversityShortName] = useState("");
  // const [universityShortNameError, setUniversityShortNameError] = useState("");
  const [locations, setLocations] = useState("");
  const [locationError, setLocationError] = useState("");
  const [OfficialWebsite, setOfficialWebsite] = useState("");
  const [OfficialWebsiteError, setOfficialWebsiteError] = useState("");
  const [CollectionWebsite, setCollectionWebsite] = useState("");
  // const [CollectionWebsiteError, setCollectionWebsiteError] = useState("");
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);

  const handleChange1 = ({ fileList }) => {
    console.log("fileList", fileList);
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setLogoText("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList1(fileList);
      setLogoText("");
    }

    setLogoDropzoneError(false);
  };

  const handleChange2 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList2([]);
      setCoverText("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList2(fileList);
      setCoverText("");
    }
    setCoverDropzoneError(false);
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
  console.log(userType, referenceId);

  useEffect(() => {
    get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(
      (res) => {
        console.log("Pid", res);
        setProviderValue(res !== 0 ? res : 0);
      }
    );
  }, [userType, referenceId]);

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });
  }, []);

  useEffect(() => {
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
    get("ContractTypeDD/Index")
      .then((res) => {
        setContractTypeDD(res);
      })
      .catch();
  }, [univerId, provideId, providerValue]);

  useEffect(() => {
    get(`ProviderDD/Index/${branchValue}`)
      .then((res) => {
        setProvider(res);
        if (provideId) {
          const result = res?.find((ans) => ans?.id.toString() === provideId);
          setProviderTypeLabel(result?.name);
          setProviderTypeValue(result?.id);
        } else if (providerValue) {
          const result = res?.find((ans) => ans?.id === providerValue);

          setProviderTypeLabel(result?.name);
          setProviderTypeValue(result?.id);
        }
      })
      .catch();
  }, [provideId, providerValue, branchValue]);

  useEffect(() => {
    if (univerId !== undefined) {
      get(`University/get/${univerId}`).then((res) => {
        console.log(res);
        setLoading(false);
        sethomeCurrencyId(res?.homeCurrencyId);
        setinternationalCurrencyId(res?.internationalCurrencyId);
        setContractTypeLabel(res?.contractType?.name);
        setContractTypeValue(res?.contractType?.id);
        setUniversityData(res);
        setBranchValue(res?.branchId);
        setBranchLabel(res?.branchName);
        setProviderTypeLabel(res?.provider?.name);
        setProviderTypeValue(res?.provider?.id);
        setUniTypeLabel(res?.universityType?.name);
        setUniTypeValue(res?.universityType?.id);
        setUniCountryLabel(res?.universityCountry?.name);
        setUniCountryValue(res?.universityCountry?.id);
        setUniStateLabel(res?.universityState?.name);
        setUniStateValue(res?.universityState?.id);
        setCityLabel(res?.universityCity?.name);
        setCityValue(res?.universityCity?.id);
        setUniId(res?.id);
        // setCheck(false);
        setUniversityName(res?.name);
        setUniversityShortName(res?.shortName);
        setLocations(res?.location);
        setOfficialWebsite(res?.officialWebsite);
        setCollectionWebsite(res?.dataCollectionWebsite);
      });
    } else {
      setLoading(false);
    }
  }, [univerId]);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
    setProviderTypeValue(0);
    setProviderTypeLabel("Select Provider");
  };

  const selectProviderType = (label, value) => {
    setProviderTypeError(false);
    setProviderTypeLabel(label);
    setProviderTypeValue(value);
  };

  const providerMenu = provider.map((providerOptions) => ({
    label: providerOptions.name,
    value: providerOptions.id,
  }));

  const selectContractType = (label, value) => {
    setContractTypeError(false);
    setContractTypeLabel(label);
    setContractTypeValue(value);
  };

  const contractMenu = contractTypeDD.map((contract) => ({
    label: contract?.name,
    value: contract?.id,
  }));

  // Logo file handle

  const myForm = createRef();

  const history = useHistory();

  const handleUniversityName = (e) => {
    let data = e.target.value.trimStart();
    setUniversityName(data);
    if (data === "") {
      setUniversityNameError("University name is required");
    } else {
      setUniversityNameError("");
    }
  };
  const handleOfficialWebsite = (e) => {
    let data = e.target.value.trimStart();
    setOfficialWebsite(data);
    if (data === "") {
      setOfficialWebsiteError("Official Website is required");
    } else {
      setOfficialWebsiteError("");
    }
  };
  const handleCollectionWebsite = (e) => {
    let data = e.target.value.trimStart();
    setCollectionWebsite(data);
    // if (data === "") {
    //   setCollectionWebsiteError("Collection Website is required");
    // } else {
    //   setCollectionWebsiteError("");
    // }
  };

  const handleUniversityShortName = (e) => {
    const string = e.target.value;
    console.log(string);
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    console.log(format.test(string));
    setUniversityShortName(e.target.value);
    // if (string === "") {
    //   setUniversityShortNameError("University short name is required");
    // } else if (string.match(format)) {
    //   setUniversityShortNameError("Special character are not allowed");
    // } else if (string.indexOf(" ") !== -1) {
    //   setUniversityShortNameError("Space are not allowed");
    // } else if (string.length > 10) {
    //   setUniversityShortNameError("Maximum 10 characters allowed");
    // } else {
    //   setUniversityShortNameError("");
    // }
  };
  const handleLocation = (e) => {
    let data = e.target.value.trimStart();
    setLocations(data);
    if (data === "") {
      setLocationError("Location is required");
    } else {
      setLocationError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;

    if (
      userType === userTypes?.SystemAdmin.toString() ||
      userType === userTypes?.Admin.toString() ||
      userType === userTypes?.Editor.toString()
    ) {
      if (providerTypeValue === 0) {
        isFormValid = false;
        setProviderTypeError(true);
      }
    }

    if (!universityName) {
      isFormValid = false;
      setUniversityNameError("University name is required");
    }
    // if (!universityShortName) {
    //   isFormValid = false;
    //   setUniversityShortNameError("University short name is required");
    // }
    if (uniTypeValue === 0) {
      isFormValid = false;
      setUniTypeError(true);
    }
    if (contractTypeValue === 0) {
      isFormValid = false;
      setContractTypeError(true);
    }
    if (uniCountryValue === 0) {
      isFormValid = false;
      setUniCountryError(true);
    }
    if (unistateValue === 0) {
      isFormValid = false;
      setUniStateError(true);
    }
    if (cityValue === 0) {
      isFormValid = false;
      setCityError(true);
    }
    if (homeCurrencyId === 0) {
      isFormValid = false;
      sethomeCurrencyIdError(true);
    }
    if (internationalCurrencyId === 0) {
      isFormValid = false;
      setinternationalCurrencyIdError(true);
    }
    if (!locations) {
      isFormValid = false;
      setLocationError("Location is required");
    }
    if (!OfficialWebsite) {
      isFormValid = false;
      setOfficialWebsiteError("Official Website is required");
    }
    // if (!CollectionWebsite) {
    //   isFormValid = false;
    //   setCollectionWebsiteError("Collection Website is required");
    // }
    if (FileList1.length < 1 && !universityData?.universityLogo) {
      isFormValid = false;
      setLogoDropzoneError(true);
    }
    if (FileList2.length < 1 && !universityData?.coverPhoto) {
      isFormValid = false;
      setCoverDropzoneError(true);
    }
    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("providerId", providerTypeValue);
    subdata.append(
      "UniversityLogoFile",
      FileList1.length === 0 ? null : FileList1[0]?.originFileObj
    );
    subdata.append(
      "CoverImageFile",
      FileList2.length === 0 ? null : FileList2[0]?.originFileObj
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: AuthStr,
      },
    };

    if (validateRegisterForm()) {
      setLogoText("");
      setCoverText("");
      if (uniId !== undefined) {
        setButtonStatus(true);
        setProgress(true);
        put("University/Update", subdata, config).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });

            history.push(`/addUniversityCampus/${uniId}`);
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
            const uniID = res?.data?.result?.id;

            if (res.status === 200 && res.data.isSuccess === true) {
              setSubmitData(true);
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              history.push({
                pathname: `/addUniversityCampus/${uniID}`,
                id: uniID,
              });
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
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
    if (univerId !== undefined) {
      if (tab === "2") {
        history.push(`/addUniversityCampus/${univerId}`);
      }
      if (tab === "3") {
        history.push(`/addUniversityFinancial/${univerId}`);
      }
      if (tab === "4") {
        history.push(`/addUniversityFeaturesGallery/${univerId}`);
      }

      if (tab === "5") {
        history.push(`/addUniversityTemplateDocument/${univerId}`);
      }
      if (tab === "6") {
        history.push(`/addUniversityFunding/${univerId}`);
      }
      if (tab === "7") {
        history.push(`/addUniversityRequirements/${univerId}`);
      }

      if (tab === "8") {
        history.push(`/addUniversityRecruitmentType/${univerId}`);
      }
      if (tab === "9") {
        history.push(`/addUniversityCommission/${univerId}`);
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

  const handleCancelAdd = () => {
    history.push("/universityList");
  };
  return (
    <div>
      <BreadCrumb
        title="University Information"
        backTo={
          location.uuId !== undefined ? "University Details" : "University"
        }
        path={
          location.uuId !== undefined
            ? `/universityDetails/${location.uuId}`
            : "/universityList"
        }
      />

      <Nav tabs>
        <NavItem>
          <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
            Basic Info.
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
              Features and gallery
            </NavLink>
          ) : (
            <NavLink disabled active={activetab === "4"}>
              Features and gallery
            </NavLink>
          )}
        </NavItem>

        <NavItem>
          {submitData || univerId ? (
            <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
              Template Doc.
            </NavLink>
          ) : (
            <NavLink disabled active={activetab === "5"}>
              Template Doc.
            </NavLink>
          )}
        </NavItem>

        <NavItem>
          {submitData || univerId ? (
            <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
              Funding
            </NavLink>
          ) : (
            <NavLink disabled active={activetab === "6"}>
              Funding
            </NavLink>
          )}
        </NavItem>

        <NavItem>
          {submitData || univerId ? (
            <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
              Requirement
            </NavLink>
          ) : (
            <NavLink disabled active={activetab === "7"}>
              Requirement
            </NavLink>
          )}
        </NavItem>

        <NavItem>
          {submitData || univerId ? (
            <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
              Recruit. Type
            </NavLink>
          ) : (
            <NavLink disabled active={activetab === "8"}>
              Recruit. Type
            </NavLink>
          )}
        </NavItem>
        {/* {(userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin) && (
              <NavItem>
                {submitData || univerId ? (
                  <NavLink
                    active={activetab === "9"}
                    onClick={() => toggle("9")}
                  >
                    Commission
                  </NavLink>
                ) : (
                  <NavLink disabled active={activetab === "9"}>
                    Commission
                  </NavLink>
                )}
              </NavItem>
            )} */}
      </Nav>

      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="1">
                  <Form ref={myForm} onSubmit={handleSubmit}>
                    <p className="section-title">University Information</p>
                    {uniId !== undefined ? (
                      <>
                        <input type="hidden" name="id" id="id" value={uniId} />
                      </>
                    ) : null}
                    <Row>
                      {userType === userTypes?.SystemAdmin.toString() ? (
                        <Col md="4">
                          {" "}
                          <FormGroup className="has-icon-left position-relative">
                            <span>
                              <span className="text-danger">*</span> Branch{" "}
                            </span>

                            <Select
                              className="form-mt"
                              options={branchOptions}
                              value={{ label: branchLabel, value: branchValue }}
                              onChange={(opt) =>
                                selectBranch(opt.label, opt.value)
                              }
                              // name="BranchId"
                              // id="BranchId"
                              isDisabled={univerId ? true : false}
                            />

                            {branchError && (
                              <span className="text-danger">
                                Branch is required
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      ) : null}
                    </Row>

                    <Row>
                      {userType === userTypes?.SystemAdmin.toString() ||
                      userType === userTypes?.Admin.toString() ||
                      userType === userTypes?.BranchAdmin.toString() ||
                      userType === userTypes?.Editor.toString() ? (
                        <Col md="4">
                          <FormGroup>
                            <span>
                              <span className="text-danger">*</span> Provider
                            </span>

                            <Select
                              options={providerMenu}
                              value={{
                                label: providerTypeLabel,
                                value: providerTypeValue,
                              }}
                              onChange={(opt) =>
                                selectProviderType(opt.label, opt.value)
                              }
                              name="providerId"
                              id="providerId"
                              isDisabled={provideId ? true : false}
                            />

                            {providerTypeError && (
                              <span className="text-danger">
                                Provider is required
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col md="4">
                          <FormGroup>
                            <span>
                              <span className="text-danger">*</span> Provider
                            </span>

                            <Select
                              isDisabled
                              value={{
                                label: providerTypeLabel,
                                value: providerTypeValue,
                              }}
                              name="providerId"
                              id="providerId"
                            />

                            {providerTypeError && (
                              <span className="text-danger">
                                Provider is required
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      )}

                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> Contract type{" "}
                          </span>

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
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> University
                            name
                          </span>

                          <Input
                            type="text"
                            name="Name"
                            id="Name"
                            onChange={(e) => {
                              handleUniversityName(e);
                            }}
                            value={universityName}
                            placeholder="Write University Name"
                          />
                          <span className="text-danger">
                            {universityNameError}
                          </span>
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> University
                            country{" "}
                          </span>

                          <Select
                            options={universityCountryName}
                            value={{
                              label: uniCountryLabel,
                              value: uniCountryValue,
                            }}
                            onChange={(opt) =>
                              selectUniCountry(opt.label, opt.value)
                            }
                            name="UniversityCountryId"
                            id="UniversityCountryId"
                          />

                          {uniCountryError && (
                            <span className="text-danger">
                              University country is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            {/* <span className="text-danger">*</span>  */}
                            University short name
                          </span>

                          <Input
                            type="text"
                            name="ShortName"
                            id="ShortName"
                            value={universityShortName}
                            onChange={(e) => {
                              handleUniversityShortName(e);
                            }}
                            placeholder="Write University Short Name"
                            pattern="[A-Za-z]{1,10}"
                            // title="You can type maximum 15 characters. You can't type any space and special character."
                          />
                          {/* <span className="text-danger">
                            {universityShortNameError}
                          </span> */}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> University
                            state{" "}
                          </span>

                          <Select
                            options={universityStateName}
                            value={{
                              label: uniStateLabel,
                              value: unistateValue,
                            }}
                            onChange={(opt) =>
                              selectUniState(opt.label, opt.value)
                            }
                            name="UniversityStateId"
                            id="UniversityStateId"
                          />

                          {uniStateError && (
                            <span className="text-danger">
                              University state is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> University
                            type{" "}
                          </span>

                          <Select
                            options={universityTypeName}
                            value={{ label: uniTypeLabel, value: uniTypeValue }}
                            onChange={(opt) =>
                              selectUniType(opt.label, opt.value)
                            }
                            name="UniversityTypeId"
                            id="UniversityTypeId"
                          />

                          {uniTypeError ? (
                            <span className="text-danger">
                              University type is required
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> University
                            city{" "}
                          </span>

                          <Select
                            options={cityOptions}
                            value={{ label: cityLabel, value: cityValue }}
                            onChange={(opt) =>
                              selectUniCity(opt.label, opt.value)
                            }
                            name="universityCityId"
                            id="universityCityId"
                          />

                          {cityError && (
                            <span className="text-danger">
                              University city is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>Foundation year </span>

                          <Input
                            type="text"
                            name="FoundationYear"
                            id="FoundationYear"
                            defaultValue={universityData?.foundationYear}
                            placeholder="Write University Foundation Year"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>University on map</span>

                          <InputGroup>
                            <InputGroupText>http://</InputGroupText>
                            <Input
                              type="url"
                              name="locationOnGoogleMap"
                              id="locationOnGoogleMap"
                              rows="3"
                              defaultValue={universityData?.locationOnGoogleMap}
                              placeholder="example.com"
                            />
                          </InputGroup>
                          <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                            Please type the "src" link only from the embed map.
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>Global rank </span>

                          <Input
                            type="number"
                            name="GlobalRankNumber"
                            id="GlobalRankNumber"
                            defaultValue={universityData?.globalRankNumber}
                            placeholder="Write University Global Rank"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> Location{" "}
                          </span>

                          <Input
                            type="text"
                            name="location"
                            id="location"
                            value={locations}
                            onChange={(e) => {
                              handleLocation(e);
                            }}
                            placeholder="Write University Location"
                          />
                          <span className="text-danger">{locationError}</span>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>Home/EU Commission Currency </span>

                          <Currency
                            currencyId={homeCurrencyId}
                            setCurrencyId={sethomeCurrencyId}
                            name="homeCurrencyId"
                            error={homeCurrencyIdError}
                            setError={sethomeCurrencyIdError}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>International Commission Currency</span>

                          <Currency
                            currencyId={internationalCurrencyId}
                            setCurrencyId={setinternationalCurrencyId}
                            name="internationalCurrencyId"
                            error={internationalCurrencyIdError}
                            setError={setinternationalCurrencyIdError}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>University description </span>

                          <Input
                            type="textarea"
                            name="Description"
                            id="Description"
                            rows="3"
                            defaultValue={universityData?.description}
                            placeholder="Write Description"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>Part time work information</span>

                          <Input
                            type="textarea"
                            name="PartTimeWorkInformation"
                            id="PartTimeWorkInformation"
                            rows="3"
                            defaultValue={
                              universityData?.partTimeWorkInformation
                            }
                            placeholder="Write Part Time Work Information"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span>
                            Official Website
                          </span>

                          <Input
                            type="text"
                            name="officialWebsite"
                            id="officialWebsite"
                            placeholder="Write Official Website"
                            onChange={(e) => {
                              handleOfficialWebsite(e);
                            }}
                            value={OfficialWebsite}
                          />
                          <span className="text-danger">
                            {OfficialWebsiteError}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <span>
                            {/* <span className="text-danger">*</span>  */}
                            Data Collection Website
                          </span>

                          <Input
                            type="text"
                            name="dataCollectionWebsite"
                            id="dataCollectionWebsite"
                            placeholder="Write Data Collection Website"
                            onChange={(e) => {
                              handleCollectionWebsite(e);
                            }}
                            value={CollectionWebsite}
                          />
                          {/* <span className="text-danger">
                            {CollectionWebsiteError}
                          </span> */}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FormGroup className="has-icon-left position-relative">
                          <Row>
                            <Col md="3">
                              <span>
                                {" "}
                                <span className="text-danger">*</span>University
                                logo:{" "}
                              </span>
                            </Col>
                            <Col md="5">
                              <div className="row">
                                {universityData?.universityLogo ? (
                                  <div className="col-md-6">
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
                                ) : null}

                                <div className="col-md-6">
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

                              <span className="text-danger d-block">
                                {logoText}
                              </span>

                              {logoDropzoneError && (
                                <span className="text-danger">
                                  Logo is required
                                </span>
                              )}
                            </Col>
                            <Col md="4" className="pt-4">
                              <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                                File size less than 2MB, keep visual elements
                                centered
                              </span>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FormGroup className="has-icon-left position-relative">
                          <Row>
                            <Col md="3">
                              <span className="text-danger">*</span>University
                              cover photo:{" "}
                            </Col>
                            <Col md="5">
                              <div className="row">
                                {universityData?.coverPhoto ? (
                                  <div className="col-md-6">
                                    <Image
                                      width={104}
                                      height={104}
                                      src={
                                        rootUrl +
                                        universityData?.coverPhoto?.thumbnailUrl
                                      }
                                    />
                                  </div>
                                ) : null}

                                <div className="col-md-6">
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
                                    open={previewVisible2}
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

                              <span className="text-danger d-block">
                                {coverText}
                              </span>

                              {coverDropzoneError && (
                                <span className="text-danger">
                                  Cover photo is required
                                </span>
                              )}
                            </Col>
                            <Col md="3" className="pt-4">
                              <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                                File size less than 2MB, keep visual elements
                                centered
                              </span>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup className="text-right">
                          <CancelButton cancel={handleCancelAdd} />
                          {permissions?.includes(
                            permissionList.Add_University ||
                              permissionList.Edit_University
                          ) && (
                            <SaveButton
                              text="Save and Next"
                              progress={progress}
                              buttonStatus={buttonStatus}
                            />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(AddUniversity);
