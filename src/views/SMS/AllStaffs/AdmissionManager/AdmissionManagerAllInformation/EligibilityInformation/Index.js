import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";
import moment from "moment";
import post from "../../../../../../helpers/post";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import AdmissionManagerNav from "../NavigationAndRegister/AdmissionManagerNav";
import EligibilityForm from "./Component/EligibilityForm";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import { currentDate } from "../../../../../../components/date/calenderFormate";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const [navItem, setNavItem] = useState("");
  const { admissionManagerId } = useParams();
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
  const [exDate, setExDate] = useState(currentDate);
  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);
  const [residencyError, setResidencyError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  // Id or Passport States
  // const [previewVisible3, setPreviewVisible3] = useState(false);
  // const [previewImage3, setPreviewImage3] = useState("");
  // const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);
  const [idPassportError, setIdPassportError] = useState(false);
  // Proof of Address States
  // const [previewVisible4, setPreviewVisible4] = useState(false);
  // const [previewImage4, setPreviewImage4] = useState("");
  // const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState([]);
  const [proofOfAddressError, setProofOfAddressError] = useState(false);
  // Proof of Right to Work States
  // const [previewVisible5, setPreviewVisible5] = useState(false);
  // const [previewImage5, setPreviewImage5] = useState("");
  // const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState([]);
  const [proofOfRightError, setProofOfRightError] = useState("");
  // const [previewVisible6, setPreviewVisible6] = useState(false);
  // const [previewImage6, setPreviewImage6] = useState("");
  // const [previewTitle6, setPreviewTitle6] = useState("");
  const [FileList6, setFileList6] = useState([]);
  const [cvError, setCvError] = useState("");
  const [rightToWork, setRightToWork] = useState("false");
  const [eligibilityData, setEligibilityData] = useState({});
  const { addToast } = useToasts();
  const [visa, setVisa] = useState("");
  const [visaError, setVisaError] = useState("");
  // const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const history = useHistory();

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    get(
      `AdmissionManagerEligibility/GetEligibility/${admissionManagerId}`
    ).then((res) => {
      //
      console.log("eligibilitydata", res);
      setEligibilityData(res);
      setUniCountryLabel(
        res !== null
          ? res?.countryOfCitizenShip?.name
          : "Select Country of Citizenship"
      );
      setUniCountryValue(res !== null ? res?.countryOfCitizenShip?.id : 0);
      setUniCountryLabel2(
        res !== null ? res?.countryOfResidence?.name : "Select Residence"
      );
      setUniCountryValue2(res !== null ? res?.countryOfResidence?.id : 0);
      setResidencyLabel(
        res !== null ? res?.residencyStatus?.name : "Select Residency Status"
      );
      setResidencyValue(res !== null ? res?.residencyStatus?.id : "0");
      //   setRadioPracticalTraining();
      setRightToWork(
        res?.haveRightToWork !== null ? `${res?.haveRightToWork}` : "false"
      );
      // var datee = res?.expireDate;
      // var utcDate = new Date(datee);
      // var localeDate = utcDate.toLocaleString("en-CA");
      // const x = localeDate.split(",")[0];
      res?.expireDate
        ? setExDate(moment(new Date(res?.expireDate)).format("YYYY-MM-DD"))
        : setExDate(currentDate);

      setVisa(res?.visaType);
      // setDate(res?.expireDate);
    });
  }, [success, admissionManagerId]);

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
    setVisa(e.target.value);
    if (e.target.value === "") {
      setVisaError("Visa type is required");
    } else {
      setVisaError("");
    }
  };
  const handleDate = (e) => {
    setExDate(e.target.value);
    if (e.target.value === "") {
      setDateError("Expiry Date of Your BRP/TRP or Visa required");
    } else {
      setDateError("");
    }
  };

  const ValidForm = () => {
    let isFormValid = true;
    if (uniCountryValue === 0) {
      isFormValid = false;
      setErrorC("Country of nationality  is required");
    }
    if (uniCountryValue2 === 0) {
      isFormValid = false;
      setErrorC2("Country of residence is required");
    }
    if (uniCountryValue !== uniCountryValue2 && residencyValue === 0) {
      isFormValid = false;
      setResidencyError("Residency status is required");
    }
    if (residencyValue === 2 && !visa) {
      isFormValid = false;
      setVisaError("Visa Type is required");
    }
    if (residencyValue === 2 && !new Date(exDate).getDate()) {
      isFormValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa is required");
    }

    if (
      residencyValue === 2 &&
      FileList3.length === 0 &&
      eligibilityData?.idOrPassport?.fileUrl == null
    ) {
      isFormValid = false;
      setIdPassportError(true);
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("visa", visa);
    subData.append(
      "idOrPassportFile",
      FileList3.length === 0 ? null : FileList3[0]?.originFileObj
    );
    subData.append(
      "proofOfAddressFile",
      FileList4.length === 0 ? null : FileList4[0]?.originFileObj
    );
    subData.append(
      "BRPFile",
      FileList5.length === 0 ? null : FileList5[0]?.originFileObj
    );
    subData.append(
      "CvFile",
      FileList6.length === 0 ? null : FileList6[0]?.originFileObj
    );

    // for (var value of subData) {
    //   console.log(value);
    // }

    if (ValidForm()) {
      setButtonStatus(true);
      setProgress(true);
      post(`AdmissionManagerEligibility/Eligibility`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList3([]);
          setFileList4([]);
          setFileList5([]);
          setFileList6([]);
          userType !== userTypes?.AdmissionManager
            ? history.push(
                `/admissionManagersOfficerInformation/${admissionManagerId}`
              )
            : history.push(
                `/admissionManagerTermsInformation/${admissionManagerId}`
              );
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/admissionManagerEmergencyInformation/${admissionManagerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Eligibility Information"
        backTo={
          userType === userTypes?.AdmissionManager ? null : "Admission Manager"
        }
        path={`/admissionManagerList`}
      />
      <AdmissionManagerNav
        activetab={activetab}
        admissionManagerId={admissionManagerId}
        action={setNavItem}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <p className="section-title">Right to work Information </p>
            <TabPane tabId="5">
              <EligibilityForm
                handleSubmit={handleSubmit}
                admissionManagerId={admissionManagerId}
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
                onRadioValueChange={onRadioValueChange}
                rightToWork={rightToWork}
                FileList3={FileList3}
                handleChange3={handleChange3}
                idPassportError={idPassportError}
                FileList4={FileList4}
                handleChange4={handleChange4}
                proofOfAddressError={proofOfAddressError}
                FileList5={FileList5}
                handleChange5={handleChange5}
                proofOfRightError={proofOfRightError}
                FileList6={FileList6}
                handleChange6={handleChange6}
                cvError={cvError}
                progress={progress}
                buttonStatus={buttonStatus}
                visa={visa}
                visaError={visaError}
                handlevisaType={handlevisaType}
                dateError={dateError}
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

export default Index;
