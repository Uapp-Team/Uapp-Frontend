import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import remove from "../../../../../helpers/remove";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

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
  const [idValue, setIdValue] = useState(0);
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
  const [stateError, setStateError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [action, setAction] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});

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
        setZipCode(res?.zipCode);
        setState(res?.state);
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

  const handleZipCode = (e) => {
    let data = e.target.value.trimStart();
    setZipCode(data);
    if (data === "") {
      setZipCodeError("Zip code is required");
    } else {
      setZipCodeError("");
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

  const handleCity = (e) => {
    let data = e.target.value.trimStart();
    setCity(data);
    if (data === "") {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };

  const handleState = (e) => {
    let data = e.target.value.trimStart();
    setState(data);
    if (data === "") {
      setStateError("State is required");
    } else {
      setStateError("");
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
      setZipCodeError("Post/Zip code is required");
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
        handleCancelAdd();
        // history.push(`/addPersonalStatement/${applicationStudentId}`);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setIdValue(0);
        setButtonStatus(false);
      });
    }
  };

  const handleDeletePermission = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`StudentEmergency/delete/${delData}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      get(`StudentEmergency/GetByStudentId/${applicationStudentId}`).then(
        (res) => {
          setOneData(res);
        }
      );
    });
    setCountryValue("");
    setReferenceName("");
    setRelationship("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setZipCode("");
    setState("");
  };

  const handleUpdate = (id) => {
    setShowForm(true);
    get(`StudentEmergency/Get/${id}`).then((res) => {
      setCountryValue(res?.countryId);
      setReferenceName(res?.personName);
      setRelationship(res?.relationship);
      setPhoneNumber(res?.phoneNumber);
      setEmail(res?.emailAddress);
      setAddressLine(res?.addressLine);
      setCity(res?.city);
      setZipCode(res?.zipCode);
      setState(res?.state);
      setIdValue(res?.id);
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  const handleCancelAdd = () => {
    setShowForm(false);
  };

  const onShow = () => {
    setShowForm(true);
    setCountryValue("");
    setReferenceName("");
    setRelationship("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setZipCode("");
    setState("");
  };

  const handlePrevious = () => {
    history.push(`/addReference/${applicationStudentId}/${1}`);
  };

  const goForward = () => {
    history.push(`/addPersonalStatement/${applicationStudentId}`);
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
        action={setAction}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="8.1">
              <p className="section-title">Emergency Contact</p>
              <div className="row mx-0 mb-3">
                {oneData.length > 0 && (
                  <Table responsive className="table-bordered">
                    <thead className="tablehead">
                      <tr>
                        <th>Person Name</th>
                        <th>Relationship</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Address Line</th>
                        <th>City</th>
                        <th>State/County</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oneData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.personName}</td>
                          <td>{item.relationship}</td>
                          <td>+{item.phoneNumber}</td>
                          <td>{item.emailAddress}</td>
                          <td>{item.countryName}</td>
                          <td>{item.addressLine}</td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>
                            <span>
                              {permissions?.includes(
                                permissionList?.Edit_Student
                              ) ? (
                                <a href="#experience-form">
                                  <span
                                    className="pointer text-body"
                                    onClick={() => handleUpdate(item?.id)}
                                  >
                                    Edit
                                  </span>
                                </a>
                              ) : null}{" "}
                              |{" "}
                              {permissions?.includes(
                                permissionList?.Edit_Student
                              ) ? (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => toggleDanger(item?.id)}
                                >
                                  Delete
                                </span>
                              ) : null}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <ConfirmModal
                  text="Do You Want To Delete Emergency Contact Information?"
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  confirm={handleDeletePermission}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  cancel={() => setDeleteModal(false)}
                />
              </div>
              {oneData.length < 1 || showForm ? (
                <Form onSubmit={handleSubmit}>
                  {idValue != 0 ? (
                    <input type="hidden" name="id" id="id" value={idValue} />
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
                      <span>State/County</span>
                      <Input
                        type="text"
                        name="state"
                        id="state"
                        onChange={(e) => {
                          handleState(e);
                        }}
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
                        placeholder="Enter Post/Zip Code"
                        id="zipCode"
                        name="zipCode"
                        onChange={(e) => {
                          handleZipCode(e);
                        }}
                        value={zipCode}
                      />
                      <span className="text-danger">{zipCodeError}</span>
                    </Col>
                  </FormGroup>

                  {/* <Row>
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
                  </Row> */}

                  <FormGroup row className="mt-2">
                    <Col lg="6" md="8" className="text-right">
                      {oneData.length > 0 && (
                        <CancelButton cancel={handleCancelAdd} />
                      )}
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <SaveButton
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      ) : null}
                    </Col>
                  </FormGroup>
                </Form>
              ) : (
                <>
                  {oneData.length > 0 && !showForm ? (
                    <>
                      {permissions?.includes(permissionList?.Edit_Student) ? (
                        <a
                          href="#experience-form"
                          className="text-decoration-none"
                        >
                          <button
                            className="add-button"
                            onClick={onShow}
                            permission={6}
                          >
                            Add Emergency Contact
                          </button>
                        </a>
                      ) : null}
                    </>
                  ) : null}
                </>
              )}

              <Row className="mt-4 ">
                <Col className="d-flex justify-content-between">
                  <PreviousButton action={handlePrevious} />
                  {oneData.length > 0 && (
                    <SaveButton text="Next" action={goForward} />
                  )}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactInformation;
