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
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import containsDigit from "../../../../../helpers/nameContainDigit";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import Loader from "../../../Search/Loader/Loader";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

const Reference = () => {
  const history = useHistory();
  const { applicationStudentId } = useParams();
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [reference, setReference] = useState([]);
  const [referenceValue, setReferenceValue] = useState(0);

  const [refList, setRefList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [oneData, setOneData] = useState({});
  const { addToast } = useToasts();
  const [delData, setDelData] = useState({});
  const [progress, setProgress] = useState(false);
  const [referenceError, setReferenceError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [referenceName, setReferenceName] = useState("");
  const [referenceNameError, setReferenceNameError] = useState("");
  const [institute, setInstitute] = useState("");
  const [instituteError, setInstituteError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLineError, setAddressLineError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const [valid, setValid] = useState(true);
  const [emailExistError, setEmailExistError] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await get("CountryDD/index").then((res) => {
          setCountry(res);
        });

        await get(`Reference/GetByStudentId/${applicationStudentId}`).then(
          (res) => {
            setRefList(res, "response");
          }
        );

        await get(`ReferenceTypeDD/Index`).then((res) => {
          setReference(res);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  const handleDeletePermission = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Reference/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      get(`Reference/GetByStudentId/${applicationStudentId}`).then((res) => {
        setRefList(res);
      });
    });
    setOneData({});
    setReferenceValue(0);
    setCountryLabel("Select Country");
    setCountryValue(0);
    setReferenceName("");
    setInstitute("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setCityError("");
    setAddressLineError("");
    setCountryError(false);
    setEmailError("");
    setPhoneNumberError("");
    setInstituteError("");
    setReferenceNameError("");
    setReferenceError(false);
  };

  const handleUpdate = (id) => {
    setShowForm(true);
    get(`Reference/Get/${id}`).then((res) => {
      setOneData(res);
      setCountryLabel(res?.country?.name);
      setCountryValue(res?.country?.id);
      setReferenceValue(res?.referenceType?.id);
      setReferenceName(res?.referenceName);
      setInstitute(res?.institute_Company);
      setPhoneNumber(res?.phoneNumber);
      setEmail(res?.emailAddress);
      setAddressLine(res?.addressLine);
      setCity(res?.city);
      setState(res?.stateName);
    });

    setReferenceValue(0);
    setCountryLabel("Select Country");
    setCountryValue(0);
    setReferenceName("");
    setInstitute("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setCityError("");
    setState("");
    setStateError("");
    setAddressLineError("");
    setCountryError(false);
    setEmailError("");
    setPhoneNumberError("");
    setInstituteError("");
    setReferenceNameError("");
    setReferenceError(false);
  };

  if (showForm) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const onShow = () => {
    setShowForm(true);
    setReferenceValue(0);
    setCountryLabel("Select Country");
    setCountryValue(0);
    setReferenceName("");
    setInstitute("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine("");
    setCity("");
    setCityError("");
    setState("");
    setStateError("");
    setAddressLineError("");
    setCountryError(false);
    setEmailError("");
    setPhoneNumberError("");
    setInstituteError("");
    setReferenceNameError("");
    setReferenceError(false);
  };

  const offShow = () => {
    setShowForm(false);
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
    setInstitute(data);
    if (data === "") {
      setInstituteError("Institute is required");
    } else {
      setInstituteError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
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
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
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
        setEmailExistError(res);
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
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
    } else if (containsDigit(data)) {
      setCityError("City should not contain any digit");
    } else {
      setCityError("");
    }
  };

  const handleState = (e) => {
    let data = e.target.value.trimStart();
    setState(data);
    if (data === "") {
      setStateError("State is required");
    } else if (containsDigit(data)) {
      setStateError("State should not contain any digit");
    } else {
      setStateError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;

    if (referenceValue === 0) {
      isFormValid = false;
      setReferenceError(true);
    }
    if (!referenceName) {
      isFormValid = false;
      setReferenceNameError("Reference name is required");
    }
    if (!institute) {
      isFormValid = false;
      setInstituteError("Institute is required");
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

    if (!addressLine) {
      isFormValid = false;
      setAddressLineError("Address line is required");
    }
    if (!city) {
      isFormValid = false;
      setCityError("City is required");
    }
    if (!state) {
      isFormValid = false;
      setStateError("State is required");
    }
    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }
    return isFormValid;
  };

  const handleRegisterReference = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("phoneNumber", phoneNumber);

    if (validateRegisterForm()) {
      if (oneData?.id) {
        setButtonStatus(true);
        setProgress(true);
        put("Reference/Update", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setShowForm(false);
          setOneData({});
          setSuccess(!success);
          get(`Reference/GetByStudentId/${applicationStudentId}`).then(
            (res) => {
              setRefList(res);
              setReferenceValue(0);
              setCountryLabel("Select Country");
              setCountryValue(0);
              setReferenceName("");
              setInstitute("");
              setPhoneNumber("");
              setEmail("");
              setAddressLine("");
              setCity("");
            }
          );
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("Reference/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setShowForm(false);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            get(`Reference/GetByStudentId/${applicationStudentId}`).then(
              (res) => {
                setRefList(res);
                setReferenceValue(0);
                setCountryLabel("Select Country");
                setCountryValue(0);
                setReferenceName("");
                setInstitute("");
                setPhoneNumber("");
                setEmail("");
                setAddressLine("");
                setCity("");
              }
            );
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
  const goPrevious = () => {
    history.push(`/addExperience/${applicationStudentId}`);
  };
  const goForward = () => {
    history.push(`/addStudentEmergencyInformation/${applicationStudentId}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Reference Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentNavigation
            studentid={applicationStudentId}
            activetab={"8"}
            success={success}
            setSuccess={setSuccess}
            action={() => {}}
          />
          <Card>
            <CardBody>
              <p className="section-title">Reference Information</p>
              <div className="row mx-1 mb-3">
                {refList.length > 0 && (
                  <Table responsive className="table-bordered">
                    <thead className="tablehead">
                      <tr>
                        <th>Name</th>
                        <th>Relation</th>
                        <th>Institute/Company</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refList?.map((ref, i) => (
                        <tr key={ref.id}>
                          <td>{ref?.referenceName}</td>
                          <td>{ref?.referenceType.name}</td>
                          <td>{ref?.institute_Company}</td>
                          <td>+{ref?.phoneNumber}</td>
                          <td>{ref?.emailAddress}</td>
                          <td>
                            {permissions?.includes(
                              permissionList?.Edit_Student
                            ) ? (
                              <a href="#reference-form">
                                <span
                                  className="pointer text-body"
                                  onClick={() => handleUpdate(ref.id)}
                                >
                                  Edit
                                </span>
                              </a>
                            ) : null}
                            |{" "}
                            {permissions?.includes(
                              permissionList?.Edit_Student
                            ) ? (
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => toggleDanger(ref)}
                              >
                                Delete
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <ConfirmModal
                  text="Do You Want To Delete Reference Information?"
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  cancel={() => setDeleteModal(false)}
                  confirm={handleDeletePermission}
                />
              </div>

              {showForm || refList?.length < 1 ? (
                <div id="reference-form" className={showForm ? "form-top" : ""}>
                  <Form onSubmit={handleRegisterReference}>
                    <input
                      type="hidden"
                      name="studentId"
                      id="studentId"
                      value={applicationStudentId}
                    />

                    {oneData?.id ? (
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={oneData?.id}
                      />
                    ) : null}
                    <Row>
                      <Col lg="4" md="6" sm="8">
                        <FormGroup>
                          <span>
                            <span className="text-danger">*</span> Reference
                            Type
                          </span>

                          <div>
                            {reference?.map((tt) => (
                              <>
                                <input
                                  type="radio"
                                  name="referenceTypeId"
                                  id="referenceTypeId"
                                  value={tt?.id}
                                  onClick={() => {
                                    setReferenceValue(tt?.id);
                                    setReferenceError(false);
                                  }}
                                  checked={
                                    referenceValue === tt?.id ? true : false
                                  }
                                />

                                <label
                                  className="mr-3"
                                  style={{ fontWeight: 500, fontSize: "14px" }}
                                >
                                  {tt?.name}
                                </label>
                              </>
                            ))}
                          </div>

                          {referenceError && (
                            <span className="text-danger">
                              Reference type is required
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span> Reference Name
                        </span>

                        <Input
                          type="text"
                          name="referenceName"
                          id="referenceName"
                          placeholder="Enter Reference Name"
                          onChange={(e) => {
                            handleReferenceName(e);
                          }}
                          value={referenceName}
                        />
                        <span className="text-danger">
                          {referenceNameError}
                        </span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          <>
                            {referenceValue === 1
                              ? " Institute"
                              : " Institute/Company"}
                          </>
                        </span>

                        <Input
                          type="text"
                          name="institute_Company"
                          id="institute_Company"
                          placeholder="Enter Institute/Company"
                          onChange={(e) => {
                            handleInstitute(e);
                          }}
                          value={institute}
                        />
                        <span className="text-danger">{instituteError}</span>
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
                          <span className="text-danger">*</span>
                          Professional/Institutional Email
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
                          onChange={(opt) =>
                            selectCountry(opt.label, opt.value)
                          }
                          name="countryId"
                          id="countryId"
                          required
                        />
                        {countryError && (
                          <span className="text-danger">
                            Country is required
                          </span>
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
                        <span>
                          <span className="text-danger">*</span>State/County
                        </span>
                        <Input
                          type="text"
                          name="stateName"
                          id="stateName"
                          placeholder="Enter State/County"
                          onChange={(e) => {
                            handleState(e);
                          }}
                          value={state}
                        />
                        <span className="text-danger">{stateError}</span>
                      </Col>
                    </FormGroup>

                    <Row className="text-right">
                      <Col lg="6" md="8">
                        <FormGroup className="mt-2">
                          {refList.length > 0 && (
                            <CancelButton cancel={offShow} />
                          )}
                          {permissions?.includes(
                            permissionList?.Edit_Student
                          ) ? (
                            <SaveButton
                              progress={progress}
                              buttonStatus={buttonStatus}
                            />
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
              ) : (
                <FormGroup>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <a href="#reference-form" className="text-decoration-none">
                      <button
                        className="add-button"
                        onClick={onShow}
                        permission={6}
                      >
                        Add Another
                      </button>
                    </a>
                  ) : null}
                </FormGroup>
              )}

              <Row className="mt-4 ">
                <Col className="d-flex justify-content-between mt-4">
                  <PreviousButton action={goPrevious} />
                  {refList.length > 0 && (
                    <SaveButton text="Next" action={goForward} />
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default Reference;
