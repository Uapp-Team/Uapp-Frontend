import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import Uget from "../../../../../helpers/Uget";
import Navigation from "../NavigationAndRegistration/Navigation";
import EligibilityForm from "./Component/EligibilityForm";

const EligibilityInformation = () => {
  const activetab = "5";
  const [success, setSuccess] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Country of Citizenship"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [errorc, setErrorC] = useState("");
  const [uniCountryLabel2, setUniCountryLabel2] = useState("Select Residence");
  const [uniCountryValue2, setUniCountryValue2] = useState(0);
  const [errorc2, setErrorC2] = useState("");
  const [exDate, setExDate] = useState(null);
  const [exDateError, setExDateError] = useState("");
  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);
  const [residencyError, setResidencyError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [FileList3, setFileList3] = useState([]);
  const [idPassportError, setIdPassportError] = useState(false);
  const [FileList4, setFileList4] = useState([]);
  const [proofOfAddressError, setProofOfAddressError] = useState(false);
  const [FileList5, setFileList5] = useState([]);
  const [proofOfRightError, setProofOfRightError] = useState("");
  const [FileList6, setFileList6] = useState([]);
  const [cvError, setCvError] = useState("");
  const [rightToWork, setRightToWork] = useState("false");
  const [eligibilityData, setEligibilityData] = useState({});
  const [navVisibility, setNavVisibility] = useState({});
  const { companionId } = useParams();
  const { addToast } = useToasts();
  const [visa, setVisa] = useState("");
  const [visaError, setVisaError] = useState("");
  const [dateError, setDateError] = useState("");
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewFileType, setPreviewFileType] = useState("");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    Uget(`CompanionEligibility/get-by/${companionId}`).then((res) => {
      setEligibilityData(res?.data);
      setUniCountryLabel(
        res?.data !== null
          ? res?.data?.citizenshipCountryName
          : "Select Country of Citizenship"
      );
      setUniCountryValue(
        res?.data !== null ? res?.data?.countryOfCitizenShipId : 0
      );
      setUniCountryLabel2(
        res?.data !== null ? res?.data?.residencyName : "Select Residence"
      );
      setUniCountryValue2(
        res?.data !== null ? res?.data?.countryOfResidenceId : 0
      );
      setResidencyLabel(
        res?.data !== null
          ? res?.data?.residencyStatusName
          : "Select Residency Status"
      );
      setResidencyValue(
        res?.data !== null ? res?.data?.residencyStatusId : "0"
      );
      //   setRadioPracticalTraining();
      setRightToWork(
        res?.data?.haveRightToWork !== null
          ? `${res?.data?.haveRightToWork}`
          : "false"
      );
      setExDate(
        res?.data?.expireDate
          ? moment(new Date(res?.data?.expireDate)).format("YYYY-MM-DD")
          : null
      );
      setVisa(res?.data?.visaType);
      // setDate(res?.expireDate);
    });
  }, [success, companionId]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  const countryDD2 = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // select Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setErrorC("");
    if (uniCountryValue === uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };

  // select residence
  const selectUniCountry2 = (label, value) => {
    setUniCountryLabel2(label);
    setUniCountryValue2(value);
    setErrorC2("");
    if (uniCountryValue === uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };

  const residencyOptions = residency?.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  const selectResidency = (label, value) => {
    setResidencyError("");
    setResidencyLabel(label);
    setResidencyValue(value);
  };
  // Id or Passport Code Start

  // function getBase643(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel3 = () => {
  //   setPreviewVisible3(false);
  // };

  // const handlePreview3 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase643(file.originFileObj);
  //   }
  //   setPreviewImage3(file.url || file.preview);
  //   setPreviewVisible3(true);
  //   setPreviewTitle3(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview3 = async (file) => {
    console.log(file, "siam");

    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage(file.preview || file.url);
      setPreviewFileType(fileType);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage(pdfPreview);
      setPreviewVisible(true);
      setPreviewFileType(fileType);
      setPreviewTitle(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage(googleViewer);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
      setPreviewFileType(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  // Id or Passport Code End

  // Proof of Address Code Start

  // function getBase644(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel4 = () => {
  //   setPreviewVisible4(false);
  // };

  // const handlePreview4 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase644(file.originFileObj);
  //   }
  //   setPreviewImage4(file.url || file.preview);
  //   setPreviewVisible4(true);
  //   setPreviewTitle4(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setProofOfAddressError(false);
  };
  // Proof of Address Code End

  // Proof of Right to Work Code Start

  // function getBase645(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel5 = () => {
  //   setPreviewVisible5(false);
  // };

  // const handlePreview5 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase645(file.originFileObj);
  //   }

  //   setPreviewImage5(file.url || file.preview);
  //   setPreviewVisible5(true);
  //   setPreviewTitle5(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setProofOfRightError("");
  };
  // Proof of Right to Work Code End

  // CV Start

  // function getBase646(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel6 = () => {
  //   setPreviewVisible6(false);
  // };

  // const handlePreview6 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase646(file.originFileObj);
  //   }

  //   setPreviewImage6(file.url || file.preview);
  //   setPreviewVisible6(true);
  //   setPreviewTitle6(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange6 = ({ fileList }) => {
    setFileList6(fileList);
    setCvError("");
  };
  // cv End

  // on change radio button
  const onRadioValueChange = (event) => {
    setRightToWork(event.target.value);
  };

  const handlevisaType = (e) => {
    let data = e.target.value.trimStart();
    setVisa(data);
    if (data === "") {
      setVisaError("Visa type is required");
    } else {
      setVisaError("");
    }
  };
  const handleDate = (e) => {
    setExDate(e);
    if (e === "") {
      setDateError("Expiry Date of Your BRP/TRP or Visa required");
    } else {
      setDateError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;
    if (uniCountryValue === 0) {
      isValid = false;
      setErrorC("Country of nationality  is required");
    }
    if (uniCountryValue2 === 0) {
      isValid = false;
      setErrorC2("Country of residence is required");
    }
    if (uniCountryValue !== uniCountryValue2 && residencyValue === 0) {
      isValid = false;
      setResidencyError("Residency status is required");
    }
    if (residencyValue === 2 && !visa) {
      isValid = false;
      setVisaError("Visa Type is required");
    }
    if (residencyValue === 2 && !exDate) {
      isValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa is required");
    }
    if (
      residencyValue === 2 &&
      FileList3.length === 0 &&
      eligibilityData?.idOrPassport?.fileUrl == null
    ) {
      isValid = false;
      setIdPassportError(true);
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("visa", visa);
    subData.append(
      "idOrPassportFile",
      FileList3.length === 0 ? null : FileList3[0]?.originFileObj
    );
    if (FileList3.length !== 0) {
      subData.append("idOrPassportId", eligibilityData?.idOrPassportId);
    }
    subData.append(
      "proofOfAddressFile",
      FileList4.length === 0 ? null : FileList4[0]?.originFileObj
    );
    if (FileList4.length !== 0) {
      subData.append("proofOfAddressId", eligibilityData?.proofOfAddressId);
    }
    subData.append(
      "BRPFile",
      FileList5.length === 0 ? null : FileList5[0]?.originFileObj
    );
    if (FileList5.length !== 0) {
      subData.append("brpId", eligibilityData?.brpId);
    }
    subData.append(
      "CvFile",
      FileList6.length === 0 ? null : FileList6[0]?.originFileObj
    );
    if (FileList6.length !== 0) {
      subData.append("cvId", eligibilityData?.cvId);
    }
    if (exDate) {
      subData.append("expireDate", exDate);
    }
    console.log(subData);
    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      post(`CompanionEligibility/save`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.data?.statusCode === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.title, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList3([]);
          setFileList4([]);
          setFileList5([]);
          setFileList6([]);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        history.push(`/companionBankInfo/${companionId}`);
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/companionEmergencyInfo/${companionId}`);
  };

  return (
    <div>
      <Navigation
        title="Eligibility Information"
        activetab="4"
        companionId={companionId}
        success={success}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <p className="section-title">Right to work Information </p>
            <TabPane tabId="5">
              <EligibilityForm
                handleSubmit={handleSubmit}
                companionId={companionId}
                eligibilityData={eligibilityData}
                countryDD={countryDD}
                uniCountryLabel={uniCountryLabel}
                uniCountryValue={uniCountryValue}
                errorc={errorc}
                selectUniCountry={selectUniCountry}
                countryDD2={countryDD2}
                uniCountryLabel2={uniCountryLabel2}
                uniCountryValue2={uniCountryValue2}
                selectUniCountry2={selectUniCountry2}
                errorc2={errorc2}
                residencyValue={residencyValue}
                residencyOptions={residencyOptions}
                selectResidency={selectResidency}
                residencyError={residencyError}
                residencyLabel={residencyLabel}
                exDate={exDate}
                exDateError={exDateError}
                onRadioValueChange={onRadioValueChange}
                rightToWork={rightToWork}
                FileList3={FileList3}
                setFileList3={setFileList3}
                handleChange3={handleChange3}
                idPassportError={idPassportError}
                FileList4={FileList4}
                setFileList4={setFileList4}
                handleChange4={handleChange4}
                proofOfAddressError={proofOfAddressError}
                FileList5={FileList5}
                setFileList5={setFileList5}
                handleChange5={handleChange5}
                proofOfRightError={proofOfRightError}
                FileList6={FileList6}
                setFileList6={setFileList6}
                handleChange6={handleChange6}
                cvError={cvError}
                progress={progress}
                buttonStatus={buttonStatus}
                visa={visa}
                visaError={visaError}
                handlevisaType={handlevisaType}
                dateError={dateError}
                setDateError={setDateError}
                handleDate={handleDate}
                handlePrevious={handlePrevious}
              ></EligibilityForm>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EligibilityInformation;
