import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";

import moment from "moment";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import EligibilityForm from "./Component/EligibilityForm";
import SalesManagerNavigation from "../NavigationAndRegister/SalesManagerNavigation";

const StaffEligibility = () => {
  const activetab = "5";
  const userType = localStorage.getItem("userType");
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
  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);
  const [residencyError, setResidencyError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  // Id or Passport States
  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState(null);
  const [idPassportAttachment, setIdPassportAttachment] = useState(null);
  const [idPassportError, setIdPassportError] = useState("");

  // Proof of Address States
  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewImage4, setPreviewImage4] = useState("");
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState(null);
  const [proofOfAddressAttachment, setProofOfAddressAttachment] =
    useState(null);
  const [cvAttachment, setCvAttachment] = useState(null);
  const [proofOfAddressError, setProofOfAddressError] = useState("");

  // Proof of Right to Work States
  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewImage5, setPreviewImage5] = useState("");
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState(null);
  const [brpAttachment, setBrpAttachment] = useState(null);
  const [proofOfRightError, setProofOfRightError] = useState("");
  const [previewVisible6, setPreviewVisible6] = useState(false);
  const [previewImage6, setPreviewImage6] = useState("");
  const [previewTitle6, setPreviewTitle6] = useState("");
  const [FileList6, setFileList6] = useState(null);
  const [cvError, setCvError] = useState("");
  const [rightToWork, setRightToWork] = useState("false");
  const [eligibilityData, setEligibilityData] = useState({});
  const { salesTeamLeaderId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const [visa, setVisa] = useState("");
  const [visaError, setVisaError] = useState("");
  const [dateError, setDateError] = useState("");
  const [action, setAction] = useState({});

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    get(`EmployeeEligibility/GetEmployeeEligibility/${salesTeamLeaderId}`).then(
      (res) => {
        setEligibilityData(res);
        setIdPassportAttachment(
          res?.idOrPassport?.fileUrl ? res?.idOrPassport?.fileUrl : null
        );
        setProofOfAddressAttachment(
          res?.proofOfAddress?.fileUrl ? res?.proofOfAddress?.fileUrl : null
        );
        setBrpAttachment(res?.brp?.fileUrl ? res?.brp?.fileUrl : null);
        setCvAttachment(res?.cv?.fileUrl ? res?.cv?.fileUrl : null);
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

        setRightToWork(
          res?.haveRightToWork !== null ? `${res?.haveRightToWork}` : "false"
        );

        res?.expireDate
          ? setExDate(moment(new Date(res?.expireDate)).format("YYYY-MM-DD"))
          : setExDate(null);

        setVisa(res?.visaType);
      }
    );
  }, [success, salesTeamLeaderId]);

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

  function getBase643(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase643(file.originFileObj);
    }

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError("");
  };

  // Id or Passport Code End

  // Proof of Address Code Start

  function getBase644(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel4 = () => {
    setPreviewVisible4(false);
  };

  const handlePreview4 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase644(file.originFileObj);
    }

    setPreviewImage4(file.url || file.preview);
    setPreviewVisible4(true);
    setPreviewTitle4(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setProofOfAddressError("");
  };

  // Proof of Address Code End

  // Proof of Right to Work Code Start

  function getBase645(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel5 = () => {
    setPreviewVisible5(false);
  };

  const handlePreview5 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase645(file.originFileObj);
    }

    setPreviewImage5(file.url || file.preview);
    setPreviewVisible5(true);
    setPreviewTitle5(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setProofOfRightError("");
  };

  // Proof of Right to Work Code End

  // CV Start

  function getBase646(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel6 = () => {
    setPreviewVisible6(false);
  };

  const handlePreview6 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase646(file.originFileObj);
    }

    setPreviewImage6(file.url || file.preview);
    setPreviewVisible6(true);
    setPreviewTitle6(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

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
    setExDate(e);
    setDateError("");

    const today = new Date();
    const selectedDate = new Date(e);

    if (selectedDate <= today) {
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (uniCountryValue === 0) {
      isFormValid = false;
      setErrorC("Country of Citizenship is required");
    }
    if (uniCountryValue2 === 0) {
      isFormValid = false;
      setErrorC2("Country of Residence is required");
    }
    if (uniCountryValue !== uniCountryValue2 && residencyValue === 0) {
      isFormValid = false;
      setResidencyError("Residency status is required");
    }
    if (residencyValue === 2 && !visa) {
      isFormValid = false;
      setVisaError("Visa Type is required");
    }

    if (residencyValue === 2 && new Date(exDate) <= new Date()) {
      isFormValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
    }

    if (residencyValue === 2 && !exDate) {
      isFormValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa is required");
    }

    if (FileList3 === null && idPassportAttachment === null) {
      isFormValid = false;
      setIdPassportError("Id or Passport is required");
    }
    if (FileList4 === null && proofOfAddressAttachment === null) {
      isFormValid = false;
      setProofOfAddressError("Proof of Address file is required");
    }
    if (
      uniCountryValue !== uniCountryValue2 &&
      FileList5 === null &&
      brpAttachment === null
    ) {
      isFormValid = false;
      setProofOfRightError("File is required");
    }

    if (FileList6 === null && cvAttachment === null) {
      isFormValid = false;
      setCvError("CV is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    // if (exDate) {
    //   subData.append("expireDate", exDate);
    // }

    subData.append(
      "expireDate",
      residencyValue === 2 && uniCountryValue !== uniCountryValue2 ? exDate : ""
    );
    // subData.append("expireDate", exDate);
    subData.append("idOrPassportFile", FileList3);
    subData.append("proofOfAddressFile", FileList4);
    subData.append("BRPFile", FileList5);
    subData.append("CvFile", FileList6);
    var formIsValid = validateRegisterForm(subData);

    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post(`EmployeeEligibility/Eligibility`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList3(null);
          setFileList4(null);
          setFileList5(null);
          setFileList6(null);
          history.push("/salesTeamLeaderList");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const goBackward = () => {
    history.push(`/salesTeamLeaderEmergencyInformation/${salesTeamLeaderId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Sales Team Leader Eligibility Information"
        backTo={
          userType === userTypes?.Admin ||
          userType === userTypes?.AccountManager ||
          userType === userTypes?.ComplianceManager ||
          userType === userTypes?.AccountOfficer ||
          userType === userTypes?.FinanceManager ||
          userType === userTypes?.Editor
            ? null
            : "Sales Team Leader"
        }
        path={`/salesTeamLeaderList`}
      />

      <SalesManagerNavigation
        activetab={activetab}
        salesTeamLeaderId={salesTeamLeaderId}
        success={success}
        action={setAction}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="5">
              <p className="section-title">Eligibility Information</p>
              {/* Form Start */}
              <EligibilityForm
                handleSubmit={handleSubmit}
                salesTeamLeaderId={salesTeamLeaderId}
                eligibilityData={eligibilityData}
                countryDD={countryDD}
                uniCountryLabel={uniCountryLabel}
                uniCountryValue={uniCountryValue}
                selectUniCountry={selectUniCountry}
                errorc={errorc}
                countryDD2={countryDD2}
                uniCountryLabel2={uniCountryLabel2}
                uniCountryValue2={uniCountryValue2}
                selectUniCountry2={selectUniCountry2}
                errorc2={errorc2}
                residencyOptions={residencyOptions}
                residencyLabel={residencyLabel}
                residencyValue={residencyValue}
                selectResidency={selectResidency}
                residencyError={residencyError}
                exDate={exDate}
                onRadioValueChange={onRadioValueChange}
                rightToWork={rightToWork}
                FileList3={FileList3}
                setFileList3={setFileList3}
                idPassportAttachment={idPassportAttachment}
                setIdPassportAttachment={setIdPassportAttachment}
                handlePreview3={handlePreview3}
                handleChange3={handleChange3}
                previewVisible3={previewVisible3}
                previewTitle3={previewTitle3}
                handleCancel3={handleCancel3}
                previewImage3={previewImage3}
                idPassportError={idPassportError}
                setIdPassportError={setIdPassportError}
                FileList4={FileList4}
                setFileList4={setFileList4}
                proofOfAddressAttachment={proofOfAddressAttachment}
                handlePreview4={handlePreview4}
                handleChange4={handleChange4}
                previewVisible4={previewVisible4}
                previewTitle4={previewTitle4}
                handleCancel4={handleCancel4}
                previewImage4={previewImage4}
                proofOfAddressError={proofOfAddressError}
                setProofOfAddressError={setProofOfAddressError}
                FileList5={FileList5}
                setFileList5={setFileList5}
                brpAttachment={brpAttachment}
                handlePreview5={handlePreview5}
                handleChange5={handleChange5}
                previewVisible5={previewVisible5}
                previewTitle5={previewTitle5}
                handleCancel5={handleCancel5}
                previewImage5={previewImage5}
                proofOfRightError={proofOfRightError}
                setProofOfRightError={setProofOfRightError}
                FileList6={FileList6}
                setFileList6={setFileList6}
                cvAttachment={cvAttachment}
                handlePreview6={handlePreview6}
                handleChange6={handleChange6}
                previewVisible6={previewVisible6}
                previewTitle6={previewTitle6}
                handleCancel6={handleCancel6}
                cvError={cvError}
                setCvError={setCvError}
                progress={progress}
                buttonStatus={buttonStatus}
                goBackward={goBackward}
                handlevisaType={handlevisaType}
                visaError={visaError}
                handleDate={handleDate}
                dateError={dateError}
                setDateError={setDateError}
              ></EligibilityForm>
              {/* Form End */}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default StaffEligibility;
