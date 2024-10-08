import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import ProviderNavigation from "../ProviderRegistrationAndNavigation/ProviderNavigation";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import UpdateProviderAddressInformation from "./Component/UpdateProviderAddressInformation";
import AddressFormComponent from "./Component/AddressFormComponent";
import AddressFormComponentParmanent from "./Component/AddressFormComponentParmanent";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const ProviderAddress = () => {
  const userType = localStorage.getItem("userType");
  const { id } = useParams();
  const activetab = "2";
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryLabel2, setCountryLabel2] = useState("Select Country");
  const [countryValue2, setCountryValue2] = useState(0);
  const [addressTypeLabel2, setAddressTypeLabel2] = useState("Address Type");
  const [addressTypeValue2, setAddressTypeValue2] = useState(0);
  const [oneData, setOneData] = useState({});
  const [contactList, setContactList] = useState([]);
  const [livingdata, setLivingData] = useState(null);
  const [permanentData, setPermanentData] = useState(null);
  const [showMailingForm, setShowMailingForm] = useState(false);
  const [showPermanentForm, setShowPermanentForm] = useState(false);
  const [bothAdressType, setBothAddressType] = useState(null);
  const [bothAdressTypeError, setBothAddressTypeError] = useState("");
  const [countryError2, setCountryError2] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [houseNo2, setHouseNo2] = useState("");

  const [addressLine3, setAddressLine3] = useState("");
  const [cityN, setCityN] = useState("");
  const [cityN3, setCityN3] = useState("");
  const [state3, setState3] = useState("");
  const [zipCode3, setZipCode3] = useState("");
  const mailingAddressId = 1;
  const permanentAddressId = 2;
  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLineError, setAddressLineError] = useState("");
  const [addressLineError2, setAddressLineError2] = useState("");
  const [city, setCity] = useState("");
  const [cityN2, setCityN2] = useState("");
  const [cityError, setCityError] = useState("");
  const [cityError2, setCityError2] = useState("");
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  const [stateError, setStateError] = useState("");
  const [stateError2, setStateError2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCode2, setZipCode2] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [zipCodeError2, setZipCodeError2] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get("UniversityCountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`ProviderAddress/get/${id}`).then((res) => {
      setContactList(res);
      setLivingData(
        res[0]?.addressType === 1
          ? res[0]
          : res[1]?.addressType === 1
          ? res[1]
          : null
      );
      setPermanentData(
        res[0]?.addressType === 2
          ? res[0]
          : res[1]?.addressType === 2
          ? res[1]
          : null
      );
    });
  }, [success, id]);

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

  const selectCountry2 = (label, value) => {
    setCountryError2(false);
    setCountryLabel2(label);
    setCountryValue2(value);
  };

  const handleAddressLine = (e) => {
    setAddressLine(e.target.value);
    if (e.target.value === "") {
      setAddressLineError("Address line 1 is required");
    } else {
      setAddressLineError("");
    }
  };
  const handleAddressLine2 = (e) => {
    setAddressLine2(e.target.value);
    if (e.target.value === "") {
      setAddressLineError2("Address line 1 is required");
    } else {
      setAddressLineError2("");
    }
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    if (e.target.value === "") {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };
  const handleCityN2 = (e) => {
    setCityN2(e.target.value);
    if (e.target.value === "") {
      setCityError2("City is required");
    } else {
      setCityError2("");
    }
  };
  const handleState = (e) => {
    setState(e.target.value);
    if (e.target.value === "") {
      setStateError("State/County is required");
    } else {
      setStateError("");
    }
  };
  const handleState2 = (e) => {
    setState2(e.target.value);
    if (e.target.value === "") {
      setStateError2("State/County is required");
    } else {
      setStateError2("");
    }
  };
  const handleZipCode = (e) => {
    setZipCode(e.target.value);
    if (e.target.value === "") {
      setZipCodeError("Zip code is required");
    } else {
      setZipCodeError("");
    }
  };
  const handleZipCode2 = (e) => {
    setZipCode2(e.target.value);
    if (e.target.value === "") {
      setZipCodeError2("Zip code is required");
    } else {
      setZipCodeError2("");
    }
  };

  const validateContactForm = () => {
    var isFormValid = true;

    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }
    if (countryValue2 === 0) {
      isFormValid = false;
      setCountryError2(true);
    }
    if (!addressLine) {
      isFormValid = false;
      setAddressLineError("Address line 1 is required");
    }
    if (!city) {
      isFormValid = false;
      setCityError("City is required");
    }
    if (!state) {
      isFormValid = false;
      setStateError("State/County is required");
    }
    if (!zipCode) {
      isFormValid = false;
      setZipCodeError("Zip code is required");
    }
    if (!addressLine2) {
      isFormValid = false;
      setAddressLineError2("Address line 1 is required");
    }
    if (!state2) {
      isFormValid = false;
      setStateError2("State/County is required");
    }
    if (!cityN2) {
      isFormValid = false;
      setCityError2("City is required");
    }
    if (!zipCode2) {
      isFormValid = false;
      setZipCodeError2("Zip code is required");
    }
    if (bothAdressType === null) {
      isFormValid = false;
      setBothAddressTypeError("Must select one option");
    }
    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    const subData1 = new FormData(event.target);

    subData.append("houseNo", houseNo);
    subData.append("addressLine", addressLine);
    subData.append("city", city);
    subData.append("state", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("ProviderId", id);
    subData.append("addressType", mailingAddressId);

    subData1.append("houseNo", houseNo2);
    subData1.append("addressLine", addressLine2);
    subData1.append("city", cityN2);
    subData1.append("state", state2);
    subData1.append("zipCode", zipCode2);
    subData1.append("countryId", countryValue2);
    subData1.append("providerId", id);
    subData1.append("addressType", permanentAddressId);

    var formIsValid = validateContactForm();

    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post("ProviderAddress/Submit", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
        }
      });

      post("ProviderAddress/Submit", subData1).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          history.push(`/adminInformation/${id}`);
        }
      });
    }
  };

  const validateUpdateForm = () => {
    var isFormValid = true;

    if (!addressLine2) {
      isFormValid = false;
      setAddressLineError2("Address line 1 is required");
    }
    if (!state2) {
      isFormValid = false;
      setStateError2("State/County is required");
    }
    if (!cityN2) {
      isFormValid = false;
      setCityError2("City is required");
    }
    if (!zipCode2) {
      isFormValid = false;
      setZipCodeError2("Zip code is required");
    }
    if (countryValue2 === 0) {
      isFormValid = false;
      setCountryError2(true);
    }
    return isFormValid;
  };

  const handleSubmitIndividual = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    const subData1 = new FormData(event.target);
    subData1.append("id", oneData?.id);
    subData1.append("addressType", oneData?.addressType);
    subData.append("addressType", oneData?.addressType);
    var formIsValid = validateUpdateForm();

    if (formIsValid) {
      if (oneData?.id === null) {
        setOneData({});
        setButtonStatus(true);
        setProgress(true);
        post("ProviderAddress/Submit", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowMailingForm(false);
            setShowPermanentForm(false);
            setCountryLabel2("Country");
            setCountryValue2(0);
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
        post("ProviderAddress/Submit", subData1).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setShowMailingForm(false);
            setShowPermanentForm(false);
            setCountryLabel2("Country");
            setCountryValue2(0);
            setOneData({});
            setAddressTypeLabel2("Address Type");
            setAddressTypeValue2(0);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleUpdateLiving = (res, add) => {
    console.log(res);
    setOneData(res);
    if (add === "mailing") {
      setShowPermanentForm(false);
      setShowMailingForm(true);
    } else {
      setShowMailingForm(false);
      setShowPermanentForm(true);
    }
    setAddressLine2("");
    setHouseNo2("");
    setCityN2("");
    setState2("");
    setZipCode2("");
    setCountryLabel2("");
    setCountryValue2(0);

    // get(`ProviderAddress/GetById/${id}`).then((res) => {
    if (res === 1) {
      setAddressTypeLabel2("Mailing Address");
      setAddressTypeValue2(1);
      setOneData(res);
      setAddressLine2(res?.addressline);
      setHouseNo2(res?.houseNo);
      setCityN2(res?.city);
      setState2(res?.state);
      setZipCode2(res?.zipCode);
    } else {
      setAddressTypeLabel2("Permanent Address");
      setAddressTypeValue2(2);
      setOneData(res);
      setAddressLine2(res?.addressline);
      setHouseNo2(res?.houseNo);
      setCityN2(res?.city);
      setState2(res?.state);
      setZipCode2(res?.zipCode);
    }
    setCountryLabel2(
      res?.country?.name === null ? "Country" : res?.country?.name
    );
    setCountryValue2(res?.countryId === null ? 0 : res?.countryId);

    // });
  };

  const closeShowForm = () => {
    setOneData({});
    setCountryLabel2("Country");
    setCountryValue2(0);
    setShowMailingForm(false);
    setShowPermanentForm(false);
  };

  const handleBothAddressType = (e) => {
    setBothAddressType(e.target.value);
    setBothAddressTypeError("");

    if (e.target.value === "true") {
      setCountryLabel2(countryLabel);
      setCountryValue2(countryValue);
      setCountryError2("");
      setHouseNo2(houseNo);
      setAddressLine2(addressLine);
      setAddressLineError2("");
      setCityN2(city);
      setCityError2("");
      setState2(state);
      setStateError2("");
      setZipCode2(zipCode);
      setZipCodeError2("");
    }

    if (e.target.value === "false") {
      setCountryLabel2("Country");
      setCountryValue2(0);

      setHouseNo2("");
      setAddressLine2("");
      setCityN2("");
      setState2("");
      setZipCode2("");
    }
  };

  const handlePrevious = () => {
    history.push(`/updateProvider/${id}`);
  };
  const handleNext = () => {
    history.push(`/adminInformation/${id}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Provider Address"
        backTo={userType === userTypes?.ProviderAdmin ? null : "Provider"}
        path="/providerList"
      />
      <ProviderNavigation id={id} activetab={"2"}></ProviderNavigation>
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              {contactList.length > 0 ? (
                <>
                  <p className="section-title">Provider Address</p>
                  <div className="row mx-0 mb-3">
                    {livingdata !== null ? (
                      <div
                        className="col-12 border p-2 rounded"
                        style={{ textAlign: "left" }}
                      >
                        <Card>
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span className="card-heading">
                                Registered Address
                              </span>
                              {!showMailingForm && (
                                <>
                                  {permissions?.includes(
                                    permissionList.Edit_Provider
                                  ) ? (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleUpdateLiving(
                                          livingdata,
                                          "mailing"
                                        )
                                      }
                                    >
                                      Edit
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </div>
                            <hr />
                            {showMailingForm ? (
                              <UpdateProviderAddressInformation
                                handleSubmitIndividual={handleSubmitIndividual}
                                addressTypeLabel2={addressTypeLabel2}
                                id={id}
                                oneData={oneData}
                                addressLine2={addressLine2}
                                cityN2={cityN2}
                                state2={state2}
                                zipCode2={zipCode2}
                                countryName={countryName}
                                countryLabel2={countryLabel2}
                                countryValue2={countryValue2}
                                selectCountry2={selectCountry2}
                                countryError2={countryError2}
                                closeShowForm={closeShowForm}
                                setAddressLine2={setAddressLine2}
                                setCityN2={setCityN2}
                                setState2={setState2}
                                setZipCode2={setZipCode2}
                                progress={progress}
                                buttonStatus={buttonStatus}
                                handleAddressLine2={handleAddressLine2}
                                addressLineError2={addressLineError2}
                                setHouseNo2={setHouseNo2}
                                houseNo2={houseNo2}
                                handleCityN2={handleCityN2}
                                cityError2={cityError2}
                                handleState2={handleState2}
                                stateError2={stateError2}
                                handleZipCode2={handleZipCode2}
                                zipCodeError2={zipCodeError2}
                                setCityError2={setCityError2}
                                setStateError2={setStateError2}
                                setZipCodeError2={setZipCodeError2}
                              />
                            ) : (
                              <Row className="text-gray">
                                <Col md="4">
                                  <p>
                                    <span>Address Line</span>
                                    <br />
                                    <b>{livingdata?.addressline}</b>
                                    <br />
                                    <b> {livingdata?.houseNo}</b>
                                  </p>
                                </Col>
                                <Col md="4">
                                  <p>
                                    <span>City</span>
                                    <br />
                                    <b>{livingdata?.city}</b>
                                  </p>
                                  <p>
                                    <span>State/County</span>
                                    <br />
                                    <b>{livingdata?.state}</b>
                                  </p>
                                </Col>
                                <Col md="2">
                                  <p>
                                    <span>Zip/Post Code</span>
                                    <br />
                                    <b> {livingdata?.zipCode}</b>
                                  </p>
                                  <p>
                                    <span>Country</span>
                                    <br />
                                    <b> {livingdata?.country?.name}</b>
                                  </p>
                                </Col>
                              </Row>
                            )}
                          </CardBody>
                        </Card>
                      </div>
                    ) : null}
                  </div>

                  <div className="row mx-0 mb-3">
                    {permanentData !== null ? (
                      <div
                        className="col-12 border p-2 rounded"
                        style={{ textAlign: "left" }}
                      >
                        <Card>
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span className="card-heading">
                                Office Address
                              </span>
                              {!showPermanentForm && (
                                <>
                                  {permissions?.includes(
                                    permissionList.Edit_Provider
                                  ) ? (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleUpdateLiving(
                                          permanentData,
                                          "parmanent"
                                        )
                                      }
                                    >
                                      Edit
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </div>
                            <hr />
                            {showPermanentForm ? (
                              <UpdateProviderAddressInformation
                                handleSubmitIndividual={handleSubmitIndividual}
                                addressTypeLabel2={addressTypeLabel2}
                                id={id}
                                oneData={oneData}
                                addressLine2={addressLine2}
                                houseNo2={houseNo2}
                                cityN2={cityN2}
                                state2={state2}
                                zipCode2={zipCode2}
                                countryName={countryName}
                                countryLabel2={countryLabel2}
                                countryValue2={countryValue2}
                                selectCountry2={selectCountry2}
                                countryError2={countryError2}
                                closeShowForm={closeShowForm}
                                setAddressLine2={setAddressLine2}
                                setCityN2={setCityN2}
                                setState2={setState2}
                                setZipCode2={setZipCode2}
                                progress={progress}
                                buttonStatus={buttonStatus}
                                handleAddressLine2={handleAddressLine2}
                                addressLineError2={addressLineError2}
                                setHouseNo2={setHouseNo2}
                                handleCityN2={handleCityN2}
                                cityError2={cityError2}
                                handleState2={handleState2}
                                stateError2={stateError2}
                                handleZipCode2={handleZipCode2}
                                zipCodeError2={zipCodeError2}
                                setCityError2={setCityError2}
                                setStateError2={setStateError2}
                                setZipCodeError2={setZipCodeError2}
                              />
                            ) : (
                              <Row className="text-gray">
                                <Col md="4">
                                  <p>
                                    <span>Address Line</span>
                                    <br />
                                    <b>{permanentData?.addressline}</b>
                                    <br />
                                    <b> {permanentData?.houseNo}</b>
                                  </p>
                                </Col>
                                <Col md="4">
                                  <p>
                                    <span>City</span>
                                    <br />
                                    <b>{permanentData?.city}</b>
                                  </p>
                                  <p>
                                    <span>State/County</span>
                                    <br />
                                    <b>{permanentData?.state}</b>
                                  </p>
                                </Col>
                                <Col md="2">
                                  <p>
                                    <span>Zip/Post Code</span>
                                    <br />
                                    <b> {permanentData?.zipCode}</b>
                                  </p>
                                  <p>
                                    <span>Country</span>
                                    <br />
                                    <b> {permanentData?.country?.name}</b>
                                  </p>
                                </Col>
                              </Row>
                            )}
                          </CardBody>
                        </Card>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                // Add new form when there will be no data starts here
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg="6" md="8">
                      <AddressFormComponent
                        addressName={"Registered Address"}
                        id={id}
                        countryLabel={countryLabel}
                        countryValue={countryValue}
                        bothAdressType={bothAdressType}
                        handleBothAddressType={handleBothAddressType}
                        countryError={countryError}
                        countryName={countryName}
                        selectCountry={selectCountry}
                        mailingAddressId={mailingAddressId}
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
                        handleAddressLine={handleAddressLine}
                        addressLineError={addressLineError}
                        handleCity={handleCity}
                        cityError={cityError}
                        city={city}
                        handleState={handleState}
                        stateError={stateError}
                        handleZipCode={handleZipCode}
                        zipCodeError={zipCodeError}
                        setCity={setCity}
                        setCityError={setCityError}
                        setStateError={setStateError}
                        setZipCodeError={setZipCodeError}
                        setBothAddressTypeError={setBothAddressTypeError}
                        bothAdressTypeError={bothAdressTypeError}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" md="8">
                      {bothAdressType ? (
                        <AddressFormComponentParmanent
                          addressName={"Office Address"}
                          id={id}
                          countryLabel2={countryLabel2}
                          countryValue2={countryValue2}
                          countryError2={countryError2}
                          countryName2={countryName}
                          selectCountry2={selectCountry2}
                          permanentAddressId={permanentAddressId}
                          houseNo2={houseNo2}
                          setHouseNo2={setHouseNo2}
                          setAddressLine2={setAddressLine2}
                          addressLine2={addressLine2}
                          cityN2={cityN2}
                          setCityN2={setCityN2}
                          state2={state2}
                          setState2={setState2}
                          zipCode2={zipCode2}
                          setZipCode2={setZipCode2}
                          city={city}
                          handleAddressLine2={handleAddressLine2}
                          addressLineError2={addressLineError2}
                          handleState2={handleState2}
                          stateError2={stateError2}
                          setStateError2={setStateError2}
                          handleCityN2={handleCityN2}
                          setCityError2={setCityError2}
                          cityError2={cityError2}
                          handleZipCode2={handleZipCode2}
                          zipCodeError2={zipCodeError2}
                          setZipCodeError2={setZipCodeError2}
                        />
                      ) : null}
                    </Col>
                  </Row>

                  <FormGroup row className="">
                    <Col
                      lg="6"
                      md="8"
                      className="d-flex justify-content-between mt-4"
                    >
                      <PreviousButton action={handlePrevious} />
                      {permissions?.includes(permissionList.Edit_Provider) ? (
                        <SaveButton
                          text="Save and Next"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      ) : null}
                    </Col>
                  </FormGroup>
                </Form>
                // Add new form when there will be no data ends here
              )}

              {/* update and particular add form ends here*/}

              {contactList.length > 0 ? (
                <Row className="mt-4">
                  <Col className="d-flex justify-content-between mt-4">
                    <PreviousButton action={handlePrevious} />
                    <SaveButton text="Next" action={handleNext} />
                  </Col>
                </Row>
              ) : null}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAddress;
