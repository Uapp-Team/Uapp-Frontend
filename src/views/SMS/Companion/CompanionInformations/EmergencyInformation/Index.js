import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Navigation from "../NavigationAndRegistration/Navigation";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import Uget from "../../../../../helpers/Uget";

const ContactInformation = () => {
  const activetab = "4";
  const { companionId } = useParams();
  const [navVisibility, setNavVisibility] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [oneData, setOneData] = useState({});
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [referenceName, setReferenceName] = useState("");
  const [referenceNameError, setReferenceNameError] = useState("");
  const [relationship, setRelationship] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLineError, setAddressLineError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [street, setStreet] = useState("");
  const [route, setRoute] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });
  }, []);

  useEffect(() => {
    if (countryValue !== 0) {
      const filterData = country.filter((status) => {
        return status.id === countryValue;
      });
      setCountryLabel(filterData[0]?.name);
    }
  }, [country, countryValue]);

  useEffect(() => {
    // get(`ConsultantNavBar/Get/${affiliateId}`).then((res) => {
    //   console.log("consNav", res);
    //   setNavVisibility(res);
    // });

    Uget(`CompanionEmergencyContact/get-by/${companionId}`).then((res) => {
      setOneData(res);
      setCountryValue(res?.data?.countryId ? res?.data?.countryId : 0);
      setReferenceName(res?.data?.personName);
      setRelationship(res?.data?.relationship);
      setPhoneNumber(res?.data?.phoneNumber);
      setEmail(res?.data?.emailAddress);
      setAddressLine(res?.data?.addressLine);
      setCity(res?.data?.city);
      setZipCode(res?.data?.zipCode);
      setState(res?.data?.state);
    });
  }, [success, companionId]);

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

  const handleReferenceName = (e) => {
    let data = e.target.value.trimStart();
    setReferenceName(data);
    if (data === "") {
      setReferenceNameError("Reference name is required");
    } else {
      setReferenceNameError("");
    }
  };
  const handleInstitute = (e) => {
    let data = e.target.value.trimStart();
    setRelationship(data);
    if (data === "") {
      setRelationshipError("Relationship is required");
    } else {
      setRelationshipError("");
    }
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (value === "") {
      setPhoneNumberError("Phone number is required");
    } else if (value?.length < 9) {
      setPhoneNumberError("Phone number required minimum 9 digit");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleEmailError = (e) => {
    let data = e.target.value.trimStart();

    setEmail(data);
    if (data === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleAddressLine = (e) => {
    let data = e.target.value.trimStart();
    setAddressLine(data);
    if (data === "") {
      setAddressLineError("Address line is required");
    } else {
      setAddressLineError("");
    }
  };

  const handleZipCode = (e) => {
    let data = e.target.value.trimStart();
    setZipCode(data);
    if (data === "") {
      setZipCodeError("Zip code is required");
    } else {
      setZipCodeError("");
    }
  };

  const handleCity = (e) => {
    let data = e.target.value.trimStart();
    setCity(data);
    if (data === "") {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };

  const ValidateForm = () => {
    var isFormValid = true;

    if (!referenceName) {
      isFormValid = false;
      setReferenceNameError("Reference name is required");
    }
    if (!relationship) {
      isFormValid = false;
      setRelationshipError("Relationship is required");
    }
    if (!phoneNumber) {
      isFormValid = false;
      setPhoneNumberError("Phone number is required");
    }
    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setPhoneNumberError("Phone number required minimum 9 digit");
    }
    if (!email) {
      setEmailError("Email is required");
      isFormValid = false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }

    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }

    if (!addressLine) {
      isFormValid = false;
      setAddressLineError("Address line is required");
    }
    if (!city) {
      isFormValid = false;
      setCityError("City is required");
    }
    if (!zipCode) {
      isFormValid = false;
      setZipCodeError("Zip code is required");
    }

    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("phoneNumber", phoneNumber);

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);

      post("companionEmergencyContact/save", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        history.push(`/companionEligibilityInfo/${companionId}`);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });

        setButtonStatus(false);
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/companionContactInfo/${companionId}`);
  };

  let addressField = document.querySelector("#addressLine");
  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressField,
      {
        fields: ["address_components", "geometry"],
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", fillInAddress);
    function fillInAddress() {
      // Get the place details from the autocomplete object.
      const place = autocomplete.getPlace();
      console.log(place);
      for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        let componentType = component.types[0];
        switch (componentType) {
          case "street_number":
            setStreet(component.long_name);
            break;
          case "route":
            setRoute(component.long_name);
            break;
          case "locality":
            setCity(component.long_name);
            setCityError("");
            break;
          case "postal_town":
            setCityError("");
            setCity(component.long_name);
            break;
          case "administrative_area_level_1":
            setState(component.long_name);
            break;
          case "postal_code":
            setZipCode(component.long_name);
            setZipCodeError("");
            break;
          default:
          // code block
        }
      }
    }
    if (street !== "" || route !== "") {
      setAddressLine(street + " " + route);
    }
  }, [
    addressField,

    setAddressLine,
    setZipCodeError,
    setCity,
    setState,
    setZipCode,
    street,
    route,
    setCityError,
    setStreet,
    setRoute,
  ]);

  return (
    <div>
      <Navigation
        title="Emergency Information"
        activetab="3"
        companionId={companionId}
        success={success}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <p className="section-title">Emergency Contact</p>
              <Form onSubmit={handleSubmit}>
                {oneData?.id ? (
                  <input type="hidden" name="id" id="id" value={oneData?.id} />
                ) : null}
                <input
                  type="hidden"
                  name="CompanionId"
                  id="CompanionId"
                  value={companionId}
                />

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Full Name
                    </span>

                    <Input
                      type="text"
                      name="personName"
                      id="personName"
                      placeholder="Enter Full Name"
                      onChange={(e) => {
                        handleReferenceName(e);
                      }}
                      value={referenceName}
                    />
                    <span className="text-danger">{referenceNameError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Relationship
                    </span>

                    <Input
                      type="text"
                      name="relationship"
                      id="relationship"
                      placeholder="Enter Relationship"
                      onChange={(e) => {
                        handleInstitute(e);
                      }}
                      value={relationship}
                    />
                    <span className="text-danger">{relationshipError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8" className="phone-input-group">
                    <span>
                      <span className="text-danger">*</span>
                      Phone Number
                    </span>
                    <PhoneInput
                      className="w-100"
                      type="string"
                      name="phoneNumber"
                      id="phoneNumber"
                      country={"gb"}
                      enableLongNumbers={true}
                      onChange={handlePhoneNumber}
                      value={phoneNumber ? phoneNumber : ""}
                      inputProps={{
                        required: true,
                      }}
                    />

                    <span className="text-danger">{phoneNumberError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Email
                    </span>

                    <Input
                      type="text"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="Enter Email"
                      onChange={(e) => {
                        handleEmailError(e);
                      }}
                      value={email}
                    />
                    <span className="text-danger">{emailError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    {" "}
                    <span>
                      <span className="text-danger">*</span> Country
                    </span>
                    <Select
                      options={countryName}
                      value={{ label: countryLabel, value: countryValue }}
                      onChange={(opt) => selectCountry(opt.label, opt.value)}
                      name="countryId"
                      id="countryId"
                      required
                    />
                    {countryError && (
                      <span className="text-danger">Country is required</span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Address Line
                    </span>

                    <Input
                      type="text"
                      name="addressLine"
                      id="addressLine"
                      placeholder="Enter Address Line"
                      onChange={(e) => {
                        handleAddressLine(e);
                      }}
                      value={addressLine}
                    />
                    <span className="text-danger">{addressLineError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> City
                    </span>

                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter City"
                      onChange={(e) => {
                        handleCity(e);
                      }}
                      value={city}
                    />
                    <span className="text-danger">{cityError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    {" "}
                    <span>State/County</span>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Enter State/County"
                      value={state}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Zip/Post Code
                    </span>
                    <Input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Enter Post/Zip Code"
                      onChange={(e) => {
                        handleZipCode(e);
                      }}
                      value={zipCode}
                    />
                    <span className="text-danger">{zipCodeError}</span>
                  </Col>
                </FormGroup>

                <Row>
                  <Col lg="6" md="8">
                    <FormGroup className="d-flex justify-content-between mt-4">
                      <PreviousButton action={handlePrevious} />
                      {permissions?.includes(
                        permissionList?.Edit_Consultant
                      ) ? (
                        <SaveButton
                          text="Save and Next"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactInformation;
