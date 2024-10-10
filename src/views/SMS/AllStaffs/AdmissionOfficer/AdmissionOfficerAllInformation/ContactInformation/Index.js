import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Form, TabContent, TabPane } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import ContactInformationForm from "./Component/ContactInformationForm";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import AdmissionOfficerNavigation from "../NavigationAndRegister/AdmissionOfficerNavigation";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const Index = () => {
  const userType = localStorage.getItem("userType");

  const { admissionOfficerId } = useParams();
  const [navItem, setNavItem] = useState("");
  const activetab = "3";
  const history = useHistory();
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [houseNoError, setHouseNoError] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [cityN, setCityN] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [addressData, setAddressData] = useState({});
  const { addToast } = useToasts();
  const [phoneNumber, setphoneNumber] = useState("");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`AdmissionOfficerAddress/GetByOfficer/${admissionOfficerId}`).then(
      (res) => {
        console.log("address", res);
        setAddressData(res);
        setAddressData(res);
        setCountryLabel(
          res?.country?.name == null ? "Select Country" : res?.country?.name
        );
        setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);
        setphoneNumber(res?.cellPhoneNumber);
        setHouseNo(res?.houseNo !== null ? res?.houseNo : null);
        setAddressLine(
          res?.addressLine !== "undefined" ? res?.addressLine : ""
        );
        setCityN(res?.city !== null ? res?.city : null);
        setState(res?.state !== null ? res?.state : "");
        setZipCode(res?.zipCode !== null ? res?.zipCode : null);
      }
    );
  }, [success, admissionOfficerId]);

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleCity = (e) => {
    let data = e.target.value.trimStart();
    setCityN(data);
    if (data === "") {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };
  const handleHouse = (e) => {
    let data = e.target.value.trimStart();
    setHouseNo(data);
    if (data === "") {
      setHouseNoError("Address line 1 is required");
    } else {
      setHouseNoError("");
    }
  };
  const handleAddressLine = (e) => {
    setAddressLine(e.target.value);
    // if (e.target.value === "") {
    //   setAddressLineError("Address line 2 is required");
    // } else {
    //   setAddressLineError("");
    // }
  };
  const handleZipCode = (e) => {
    let data = e.target.value.trimStart();
    setZipCode(data);
    if (data === "") {
      setZipCodeError("Zip/post code is required");
    } else {
      setZipCodeError("");
    }
  };

  const ValidForm = () => {
    let isFormValid = true;

    if (!houseNo) {
      isFormValid = false;
      setHouseNoError("Address line 1 is required");
    }
    if (!cityN) {
      isFormValid = false;
      setCityError("City is required");
    }
    if (!zipCode) {
      isFormValid = false;
      setZipCodeError("Zip/post code is required");
    }
    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }
    return isFormValid;
  };

  console.log("addressLine", addressLine);

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    subData.append("cellPhoneNumber", phoneNumber);
    subData.append("houseNo", houseNo);
    subData.append("addressLine", addressLine);
    subData.append("city", cityN);
    subData.append("state", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("admissionOfficerId", admissionOfficerId);
    subData.append("id", addressData === false ? 0 : addressData?.id);

    for (var value of subData) {
      console.log(value);
    }

    if (ValidForm()) {
      setButtonStatus(true);
      setProgress(true);

      post("AdmissionOfficerAddress/Address", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        setButtonStatus(false);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        history.push(`/admissionOfficerEmergencyInfo/${admissionOfficerId}`);
      });
    }
  };

  const handlePrevious = () => {
    history.push(`/admissionOfficerPersonalInfo/${admissionOfficerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Officer Contact Information"
        backTo={
          userType === userTypes?.AdmissionOfficer ? null : "Admission Officer"
        }
        path={`/admissionOfficerList`}
      />

      <AdmissionOfficerNavigation
        activetab={activetab}
        admissionOfficerId={admissionOfficerId}
        action={setNavItem}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form onSubmit={handleSubmit}>
                <p className="section-title">Contact Information</p>
                <ContactInformationForm
                  // phoneNumberError={phoneNumberError}
                  // handlePhoneNumber={handlePhoneNumber}
                  handleCity={handleCity}
                  cityError={cityError}
                  houseNoError={houseNoError}
                  handleHouse={handleHouse}
                  handleAddressLine={handleAddressLine}
                  // addressLineError={addressLineError}
                  handleZipCode={handleZipCode}
                  zipCodeError={zipCodeError}
                  admissionOfficerId={admissionOfficerId}
                  countryLabel={countryLabel}
                  countryValue={countryValue}
                  success={success}
                  countryError={countryError}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  countryName={countryName}
                  selectCountry={selectCountry}
                  phoneNumber={phoneNumber}
                  setphoneNumber={setphoneNumber}
                  houseNo={houseNo}
                  setHouseNo={setHouseNo}
                  setAddressLine={setAddressLine}
                  addressLine={addressLine}
                  cityN={cityN}
                  setCityN={setCityN}
                  state={state}
                  setState={setState}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                  setHouseNoError={setHouseNoError}
                  setCityError={setCityError}
                  setZipCodeError={setZipCodeError}
                  handlePrevious={handlePrevious}
                  navItem={navItem}
                />
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default Index;
