import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  TabContent,
  TabPane,
} from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../helpers/put";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import ContactFormComponent from "./Component/ContactFormComponent";
import ContactFormForPermanent from "./Component/ContactFormForPermanent";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import UpdateContactInformation from "./Component/UpdateContactInformation";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const ContactInformation = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const { applicationStudentId } = useParams();
  const history = useHistory();
  const activetab = "2";
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryLabel2, setCountryLabel2] = useState("Select Country");
  const [countryValue2, setCountryValue2] = useState(0);
  // const [countryLabel3, setCountryLabel3] = useState("Select Country");
  // const [countryValue3, setCountryValue3] = useState(0);
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
  const [countryError, setCountryError] = useState(false);
  const [countryError2, setCountryError2] = useState(false);
  // const [countryError3, setCountryError3] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [houseNo, setHouseNo] = useState("");
  const [houseNo2, setHouseNo2] = useState("");
  // const [houseNo2, setHouseNo2] = useState("");
  // const [addressLine2, setAddressLine2] = useState("");
  // const [cityN, setCityN] = useState("");
  // const [cityN2, setCityN2] = useState("");
  // const [state2, setState2] = useState("");
  // const [zipCode2, setZipCode2] = useState("");
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
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`StudentAddress/GetByStudentId/${applicationStudentId}`).then((res) => {
      setContactList(res);
      setLivingData(
        res[0]?.addressTypeId === 1
          ? res[0]
          : res[1]?.addressTypeId === 1
          ? res[1]
          : null
      );
      setPermanentData(
        res[0]?.addressTypeId === 2
          ? res[0]
          : res[1]?.addressTypeId === 2
          ? res[1]
          : null
      );
    });
  }, [success, applicationStudentId]);

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
    const str = e.target.value.trimStart();
    setAddressLine(str);
    if (str === "") {
      setAddressLineError("Address line 1 is required");
    } else {
      setAddressLineError("");
    }
  };
  const handleAddressLine2 = (e) => {
    const str = e.target.value.trimStart();
    setAddressLine2(str);
    if (str === "") {
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
    subData.append("stateName", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("studentId", applicationStudentId);
    subData.append("addressTypeId", mailingAddressId);

    subData1.append("houseNo", houseNo2);
    subData1.append("addressLine", addressLine2);
    subData1.append("city", cityN2);
    subData1.append("stateName", state2);
    subData1.append("zipCode", zipCode2);
    subData1.append("countryId", countryValue2);
    subData1.append("studentId", applicationStudentId);
    subData1.append("addressTypeId", permanentAddressId);

    var formIsValid = validateContactForm();
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post("StudentAddress/Create", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
        }
      });

      post("StudentAddress/Create", subData1).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          history.push(
            `/addStudentApplicationInformation/${applicationStudentId}/${1}`
          );
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
    subData.append("id", oneData?.id);
    subData.append("addressTypeId", addressTypeValue2);
    subData.append("houseNo", houseNo2);
    subData.append("addressLine", addressLine2);
    subData.append("city", cityN2);
    subData.append("stateName", state2);
    subData.append("zipCode", zipCode2);
    subData.append("countryId", countryValue2);
    subData.append("studentId", applicationStudentId);

    var formIsValid = validateUpdateForm();
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      put("StudentAddress/Update", subData).then((res) => {
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
  };

  const handleUpdateLiving = (id, add) => {
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
    get(`StudentAddress/GetById/${id}`).then((res) => {
      if (res?.addressTypeId === 1) {
        setAddressTypeLabel2("Mailing Address");
        setAddressTypeValue2(1);
        setOneData(res);
        setAddressLine2(res?.addressLine);
        setHouseNo2(res?.houseNo);
        setCityN2(res?.city);
        setState2(res?.stateName);
        setZipCode2(res?.zipCode);
      } else {
        setAddressTypeLabel2("Permanent Address");
        setAddressTypeValue2(2);
        setOneData(res);
        setAddressLine2(res?.addressLine);
        setHouseNo2(res?.houseNo);
        setCityN2(res?.city);
        setState2(res?.stateName);
        setZipCode2(res?.zipCode);
      }

      setCountryLabel2(
        res?.countryName === null ? "Country" : res?.countryName
      );
      setCountryValue2(res?.countryId === null ? 0 : res?.countryId);
    });
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
    history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
  };
  const handleNext = () => {
    history.push(
      `/addStudentApplicationInformation/${applicationStudentId}/${1}`
    );
  };

  return (
    <div>
      <BreadCrumb
        title="Contact Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"2"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              {contactList.length > 0 ? (
                <>
                  <p className="section-title">Addresses</p>
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
                                Mailing Address
                              </span>
                              {permissions?.includes(
                                permissionList?.Edit_Student
                              ) ? (
                                <>
                                  {!showMailingForm && (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleUpdateLiving(
                                          livingdata?.id,
                                          "mailing"
                                        )
                                      }
                                    >
                                      Edit
                                    </span>
                                  )}
                                </>
                              ) : null}
                            </div>
                            <hr />
                            {showMailingForm ? (
                              <UpdateContactInformation
                                handleSubmitIndividual={handleSubmitIndividual}
                                addressTypeLabel2={addressTypeLabel2}
                                applicationStudentId={applicationStudentId}
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
                                    <b>{livingdata?.addressLine}</b>
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
                                Permanent Address
                              </span>

                              {permissions?.includes(
                                permissionList?.Edit_Student
                              ) ? (
                                <>
                                  {" "}
                                  {!showPermanentForm && (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleUpdateLiving(
                                          permanentData?.id,
                                          "parmanent"
                                        )
                                      }
                                    >
                                      Edit
                                    </span>
                                  )}
                                </>
                              ) : null}
                            </div>
                            <hr />
                            {showPermanentForm ? (
                              <UpdateContactInformation
                                handleSubmitIndividual={handleSubmitIndividual}
                                addressTypeLabel2={addressTypeLabel2}
                                applicationStudentId={applicationStudentId}
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
                                    <b>{permanentData?.addressLine}</b>
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
                      <ContactFormComponent
                        addressName={"Mailing Address"}
                        studentId={applicationStudentId}
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
                        setAddressLineError={setAddressLineError}
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
                        <ContactFormForPermanent
                          addressName={"Permanent Address"}
                          studentId={applicationStudentId}
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

                  <FormGroup row className=" mt-4">
                    <Col
                      lg="6"
                      md="8"
                      className="d-flex justify-content-between"
                    >
                      <PreviousButton action={handlePrevious} />
                      {permissions?.includes(permissionList?.Edit_Student) ? (
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
                <FormGroup className="d-flex justify-content-between mt-4">
                  <PreviousButton action={handlePrevious} />
                  <SaveButton text="Next" action={handleNext} />
                </FormGroup>
              ) : null}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactInformation;
