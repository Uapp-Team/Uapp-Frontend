import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
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
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ContactInformation = () => {
  const activetab = "8.1";
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [success, setSuccess] = useState(false);
  const { applicationStudentId } = useParams();
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
    get(`StudentEmergency/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        setOneData(res);
        setCountryValue(res?.countryId ? res?.countryId : 0);
        setReferenceName(res?.personName);
        setRelationship(res?.relationship);
        setPhoneNumber(res?.phoneNumber);
        setEmail(res?.emailAddress);
        setAddressLine(res?.addressLine);
        setCity(res?.city);
      }
    );
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

  const handleReferenceName = (e) => {
    setReferenceName(e.target.value);
    if (e.target.value === "") {
      setReferenceNameError("Reference name is required");
    } else {
      setReferenceNameError("");
    }
  };
  const handleInstitute = (e) => {
    setRelationship(e.target.value);
    if (e.target.value === "") {
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
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  const handleAddressLine = (e) => {
    setAddressLine(e.target.value);
    if (e.target.value === "") {
      setAddressLineError("Address line is required");
    } else {
      setAddressLineError("");
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

      post("StudentEmergency/Address", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        history.push(`/addPersonalStatement/${applicationStudentId}`);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });

        setButtonStatus(false);
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/addReference/${applicationStudentId}/${1}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Emergency Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={activetab}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="8.1">
              <p className="section-title">Emergency Contact</p>
              <Form onSubmit={handleSubmit}>
                {oneData?.id ? (
                  <input type="hidden" name="id" id="id" value={oneData?.id} />
                ) : null}
                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />

                <FormGroup row>
                  <Col lg="6" md="8">
                    <span>
                      <span className="text-danger">*</span> Person Name
                    </span>

                    <Input
                      type="text"
                      name="personName"
                      id="personName"
                      placeholder="Enter Reference Name"
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
                      country={"us"}
                      onChange={handlePhoneNumber}
                      value={phoneNumber ? phoneNumber : "1"}
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
                      defaultValue={oneData?.addressLine}
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
                      defaultValue={oneData?.city}
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
                      defaultValue={oneData?.state}
                    />
                  </Col>
                </FormGroup>

                <Row>
                  <Col lg="6" md="8">
                    <FormGroup className="d-flex justify-content-between mt-4">
                      <PreviousButton action={handlePrevious} />
                      {permissions?.includes(permissionList?.Edit_Student) ? (
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
