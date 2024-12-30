import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Form, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import ConsultantContactForm from "./Component/ConsultantContactForm";

const ContactInformation = () => {
  const activetab = "3";
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [houseNoError, setHouseNoError] = useState("");
  const [addressLine, setAddressLine] = useState(null);
  // const [addressLineError, setAddressLineError] = useState("");
  const [cityN, setCityN] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [addressData, setAddressData] = useState({});
  const [navVisibility, setNavVisibility] = useState({});
  const { consultantRegisterId } = useParams();
  const { addToast } = useToasts();
  const [phoneNumber, setphoneNumber] = useState("");
  const history = useHistory();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`ConsultantNavBar/GetNavbar/${consultantRegisterId}`).then((res) => {
      setNavVisibility(res);
    });

    get(`ConsultantAddress/GetByConsultant/${consultantRegisterId}`).then(
      (res) => {
        setAddressData(res);
        setCountryLabel(
          res?.country?.name == null ? "Select Country" : res?.country?.name
        );
        setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);
        // setphoneNumber(
        //   res?.cellPhoneNumber !== null ? res?.cellPhoneNumber : null
        // );
        setphoneNumber(res?.cellPhoneNumber);
        setHouseNo(res?.houseNo !== null ? res?.houseNo : null);
        setAddressLine(res?.addressLine ? res?.addressLine : null);
        setCityN(res?.city !== null ? res?.city : null);
        setState(res?.state !== null ? res?.state : "");
        setZipCode(res?.zipCode !== null ? res?.zipCode : null);
      }
    );
  }, [success, consultantRegisterId]);

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

  const ValidateForm = () => {
    var isValid = true;
    if (countryValue === 0) {
      isValid = false;
      setCountryError(true);
    }
    if (!cityN) {
      isValid = false;
      setCityError("City is required");
    }
    if (!houseNo) {
      isValid = false;
      setHouseNoError("Address line 1 is required");
      // } else if (!addressLine) {
      //   setAddressLineError("Address line 2 is required");
    }
    if (!zipCode) {
      isValid = false;
      setZipCodeError("Zip/post code is required");
    }
    return isValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("cellPhoneNumber", phoneNumber);
    subData.append("houseNo", houseNo);
    subData.append("addressLine", addressLine === null ? "" : addressLine);
    subData.append("city", cityN);
    subData.append("state", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("consultantId", consultantRegisterId);
    subData.append("id", addressData === false ? 0 : addressData?.id);

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);

      post("ConsultantAddress/Address", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        history.push(`/consultantEmergencyInformation/${consultantRegisterId}`);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });

        setButtonStatus(false);
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/consultantPersonalInformation/${consultantRegisterId}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Consultant Contact Information"
        backTo={userType === userTypes?.Consultant ? null : "Consultant"}
        path={`/consultantList`}
      />

      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form onSubmit={handleSubmit}>
                <p className="section-title">Address</p>
                <ConsultantContactForm
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
                  consultantntId={consultantRegisterId}
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
                  setCityError={setCityError}
                  setZipCodeError={setZipCodeError}
                  handlePrevious={handlePrevious}
                />
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactInformation;
