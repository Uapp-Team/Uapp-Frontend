import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Form, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import ContactInformationForm from "./Component/ContactInformationForm";
import SalesManagerNavigation from "../NavigationAndRegister/SalesManagerNavigation";

const SalesManagerContactInformation = () => {
  const { salesManagerId } = useParams();
  const userType = localStorage.getItem("userType");
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
  const [action, setAction] = useState({});

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`EmployeeContactInformation/GetByEmployeeId/${salesManagerId}`).then(
      (res) => {
        console.log("address", res);
        setAddressData(res);
        setCountryLabel(
          res?.country?.name == null ? "Select Country" : res?.country?.name
        );
        setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);
        setphoneNumber(
          res?.cellPhoneNumber !== null ? res?.cellPhoneNumber : null
        );
        setHouseNo(res?.houseNo !== null ? res?.houseNo : null);
        setAddressLine(res?.addressLine);
        setCityN(res?.city !== null ? res?.city : null);
        setState(res?.state);
        setZipCode(res?.zipCode !== null ? res?.zipCode : null);
      }
    );
  }, [success, salesManagerId]);

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
    setCityN(e.target.value);
    if (e.target.value === "") {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };
  const handleHouse = (e) => {
    setHouseNo(e.target.value);
    if (e.target.value === "") {
      setHouseNoError("Address line 1 is required");
    } else {
      setHouseNoError("");
    }
  };
  const handleAddressLine = (e) => {
    const data = e.target.value.trimStart();
    setAddressLine(data);
    // if (e.target.value === "") {
    //   setAddressLineError("Address line 2 is required");
    // } else {
    //   setAddressLineError("");
    // }
  };
  const handleZipCode = (e) => {
    setZipCode(e.target.value);
    if (e.target.value === "") {
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
  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    subData.append("cellPhoneNumber", phoneNumber);
    subData.append("houseNo", houseNo);
    subData.append("city", cityN);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("employeeId", salesManagerId);
    subData.append("id", addressData === null ? 0 : addressData?.id);

    if (ValidForm()) {
      setButtonStatus(true);
      setProgress(true);
      post("EmployeeContactInformation/Create", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        history.push(`/salesManagerEmergencyInformation/${salesManagerId}`);
      });
    }
  };

  const handlePrevious = () => {
    history.push(`/salesManagerPersonalInformation/${salesManagerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Sales Manager Contact Information"
        backTo={
          userType === userTypes?.Admin ||
          userType === userTypes?.AccountManager ||
          userType === userTypes?.ComplianceManager ||
          userType === userTypes?.AccountOfficer ||
          userType === userTypes?.FinanceManager ||
          userType === userTypes?.Editor
            ? null
            : "Sales Manager"
        }
        path={`/salesManagerList`}
      />

      <SalesManagerNavigation
        activetab={activetab}
        salesManagerId={salesManagerId}
        success={success}
        action={setAction}
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
                  salesManagerId={salesManagerId}
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
                />
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default SalesManagerContactInformation;
