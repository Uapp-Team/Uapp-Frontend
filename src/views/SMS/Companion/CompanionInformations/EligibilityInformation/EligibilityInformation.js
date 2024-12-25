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
    "Select Country of Nationality"
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
  const [FileList3, setFileList3] = useState(null);
  const [idPassportFile, setIdPassportFile] = useState(null);
  const [idPassportError, setIdPassportError] = useState("");
  const [FileList4, setFileList4] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);
  const [proofOfAddressError, setProofOfAddressError] = useState("");
  const [FileList5, setFileList5] = useState(null);
  const [brpFile, setBrpFile] = useState(null);
  const [proofOfRightError, setProofOfRightError] = useState("");
  const [FileList6, setFileList6] = useState(null);
  const [cvFile, setCvFile] = useState(null);
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
  console.log(idPassportFile, proofOfAddressFile, cvFile, brpFile);

  const [visaType, setVisaType] = useState([]);
  const [visaTypeValue, setVisaTypeValue] = useState(0);
  console.log(visaTypeValue, "visa");
  const [visaTypeLabel, setVisaTypeLabel] = useState("Select Visa Type");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("visatypedd/get-all").then((res) => {
      setVisaType(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    Uget(`CompanionEligibility/get-by/${companionId}`).then((res) => {
      setEligibilityData(res?.data);
      setIdPassportFile(
        res?.data?.idOrPassport?.fileUrl
          ? res?.data?.idOrPassport?.fileUrl
          : null
      );
      setProofOfAddressFile(
        res?.data?.proofOfAddress?.fileUrl
          ? res?.data?.proofOfAddress?.fileUrl
          : null
      );
      setBrpFile(res?.data?.brp?.fileUrl ? res?.data?.brp?.fileUrl : null);
      setCvFile(res?.data?.cv?.fileUrl ? res?.data?.cv?.fileUrl : null);

      setUniCountryLabel(
        res?.data !== null
          ? res?.data?.citizenshipCountryName
          : "Select Country of Nationality"
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
      setVisaTypeLabel(
        res?.data?.visaType ? res?.data?.visaType : "Select Visa Type"
      );
      setVisaTypeValue();
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

  const visaTypeDD = visaType.map((visaTypeOptions) => ({
    label: visaTypeOptions?.name,
    value: visaTypeOptions?.id,
  }));

  const selectVisaType = (label, value) => {
    setVisaTypeLabel(label);
    setVisaTypeValue(value);
    setVisaError("");
  };

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
    setDateError("");

    const today = new Date();
    const selectedDate = new Date(e);

    if (selectedDate <= today) {
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
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
    if (residencyValue === 2 && visaTypeLabel === "") {
      isValid = false;
      setVisaError("Visa Type is required");
    }
    if (residencyValue === 2 && new Date(exDate) <= new Date()) {
      isValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
    }
    if (residencyValue === 2 && !exDate) {
      isValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa is required");
    }
    if (FileList3 === null && idPassportFile === null) {
      isValid = false;
      setIdPassportError("File is required");
    }

    if (FileList4 === null && proofOfAddressFile === null) {
      isValid = false;
      setProofOfAddressError("File is required");
    }

    if (
      uniCountryValue !== uniCountryValue2 &&
      FileList5 === null &&
      brpFile === null
    ) {
      isValid = false;
      setProofOfRightError("File is required");
    }

    if (FileList6 === null && cvFile === null) {
      isValid = false;
      setCvError("File is required");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("visa", visa);
    subData.append("idOrPassportFile", FileList3);
    subData.append("proofOfAddressFile", FileList4);
    subData.append("BRPFile", FileList5);
    subData.append("CvFile", FileList6);
    subData.append(
      "idOrPassportId",
      idPassportFile ? eligibilityData?.idOrPassportId : 0
    );
    subData.append(
      "proofOfAddressId",
      proofOfAddressFile ? eligibilityData?.proofOfAddressId : 0
    );
    subData.append("brpId", brpFile ? eligibilityData?.brpId : 0);
    subData.append("cvId", cvFile ? eligibilityData?.cvId : 0);

    if (exDate) {
      subData.append("expireDate", exDate);
    }
    subData.append("visaType", visaTypeLabel);
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
                idPassportFile={idPassportFile}
                setIdPassportFile={setIdPassportFile}
                idPassportError={idPassportError}
                setIdPassportError={setIdPassportError}
                FileList4={FileList4}
                setFileList4={setFileList4}
                proofOfAddressFile={proofOfAddressFile}
                setProofOfAddressFile={setProofOfAddressFile}
                proofOfAddressError={proofOfAddressError}
                setProofOfAddressError={setProofOfAddressError}
                FileList5={FileList5}
                setFileList5={setFileList5}
                brpFile={brpFile}
                setBrpFile={setBrpFile}
                proofOfRightError={proofOfRightError}
                setProofOfRightError={setProofOfRightError}
                FileList6={FileList6}
                setFileList6={setFileList6}
                cvFile={cvFile}
                setCvFile={setCvFile}
                handleChange6={handleChange6}
                cvError={cvError}
                setCvError={setCvError}
                progress={progress}
                buttonStatus={buttonStatus}
                visa={visa}
                visaError={visaError}
                handlevisaType={handlevisaType}
                dateError={dateError}
                setDateError={setDateError}
                handleDate={handleDate}
                handlePrevious={handlePrevious}
                visaType={visaType}
                visaTypeValue={visaTypeValue}
                visaTypeLabel={visaTypeLabel}
                visaTypeDD={visaTypeDD}
                selectVisaType={selectVisaType}
              ></EligibilityForm>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EligibilityInformation;
