import { Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
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
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { currentDate } from "../../../../../components/date/calenderFormate";
import DMYPicker from "../../../../../components/form/DMYPicker";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../../constants/constants";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import put from "../../../../../helpers/put";
import Loader from "../../../Search/Loader/Loader";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

const PersonalInformation = () => {
  const { applicationStudentId } = useParams();
  const userId = localStorage.getItem("referenceId");
  const history = useHistory();
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [oneData, setOneData] = useState({});

  const activetab = "1";
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);

  const [countryBirth, setCountryBirth] = useState([]);
  const [countryBirthLabel, setCountryBirthLabel] = useState(
    "Select Birth Country"
  );
  const [countryBirthValue, setCountryBirthValue] = useState(0);

  const [countryResidence, setCountryResidence] = useState([]);

  const [countryResidenceLabel, setCountryResidenceLabel] = useState(
    "Select Residence Country"
  );

  const [countryResidenceValue, setCountryResidenceValue] = useState(0);
  const [gender, setGender] = useState([]);
  const [genderValue, setGenderValue] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalStatusValue, setMaritalStatusValue] = useState(0);
  const [nationality, setNationality] = useState([]);
  const [nationalityLabel, setNationalityLabel] =
    useState("Select Nationality");
  const [nationalityValue, setNationalityValue] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantError, setConsultantError] = useState(false);
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState("");
  const [passportError, setPassportError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [countryOfResidenceError, setCountryOfResidenceError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [issueDate, setIssueDate] = useState(null);
  const [issueDateError, setIssueDateError] = useState("");
  const [expireDate, setexpireDate] = useState(null);
  const [expireDateError, setexpireDateError] = useState("");
  const [dateError, setDateError] = useState("");
  const minDate = "1950-01-01";
  // const [phoneNUmber, setPhoneNumber] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [countryOfBirthError, setCountryOfBirthError] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (oneData?.profileImage?.fileUrl) {
      setFileList([
        {
          uid: "-1",
          name: "Profile Image",
          status: "done",
          url: rootUrl + oneData.profileImage.fileUrl,
        },
      ]);
    }
  }, [oneData]);

  useEffect(() => {
    get(`RecruitmentFrom/ByConsultant/${consultantValue}`).then((res) => {
      setNationality(res);
    });
  }, [consultantValue]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const branchRes = await get("BranchDD/index");
        setBranch(branchRes);

        const titleRes = await get("NameTittleDD/index");
        setTitle(titleRes);

        const maritalStatusRes = await get("MaritalStatusDD/Index");
        setMaritalStatus(maritalStatusRes);

        const genderRes = await get("GenderDD/Index");
        setGender(genderRes);

        get("CountryDD/index").then((res) => {
          setCountryBirth(res);
          setCountryResidence(res);
          // setNationality(res);
        });

        const countryRes = await get("CountryDD/index");
        setCountryBirth(countryRes);
        setCountryResidence(countryRes);

        // if (applicationStudentId) {
        //   const studentRes = await get(`Student/Get/${applicationStudentId}`);
        //   setConsultantLabel(
        //     `${studentRes?.consultant?.firstName || ""} ${
        //       studentRes?.consultant?.lastName || ""
        //     }`
        //   );
        //   setOneData(studentRes);
        //   setConsultantValue(studentRes?.consultantId);
        //   setFirstName(studentRes?.firstName);
        //   setLastName(studentRes?.lastName);
        //   setEmail(studentRes?.email);
        //   setTitleValue(studentRes?.nameTittle?.id || 0);
        //   setphoneNumber(studentRes?.phoneNumber);
        //   setPassport(studentRes?.passportNumber);
        //   setGenderValue(studentRes?.gender?.id || 0);
        //   setMaritalStatusValue(studentRes?.maritalStatus?.id || 0);
        //   setNationalityLabel(
        //     studentRes?.nationality?.name || "Select Nationality"
        //   );
        //   setNationalityValue(studentRes?.nationality?.id || 0);
        //   setCountryResidenceLabel(
        //     studentRes?.country?.name || "Select Residence Country"
        //   );
        //   setCountryResidenceValue(studentRes?.country?.id || 0);
        //   setCountryBirthLabel(
        //     studentRes?.countryOfBirth?.name || "Select Birth Country"
        //   );
        //   setCountryBirthValue(studentRes?.countryOfBirth?.id || 0);
        //   setBirthDate(studentRes?.dateOfBirth);
        //   setIssueDate(studentRes?.issueDate);
        //   setexpireDate(studentRes?.expireDate);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    get(`ConsultantDD/ByBranch/${branchValue}`).then((res) => {
      setConsultant(res);
    });
  }, [branchValue]);

  useEffect(() => {
    if (applicationStudentId) {
      get(`Student/Get/${applicationStudentId}`).then((res) => {
        setBranchValue(res?.branchId == null ? 0 : res?.branchId);
        setBranchLabel(
          res?.branchName == "" ? "Select Branch" : res?.branchName
        );
        setConsultantLabel(
          res?.consultant?.firstName + " " + res?.consultant?.lastName
        );
        setOneData(res);
        setConsultantValue(res?.consultantId);
        setFirstName(res?.firstName);
        setLastName(res?.lastName);
        setEmail(res?.email);
        setTitleValue(res?.nameTittle?.id == null ? 0 : res?.nameTittle?.id);
        // setPhoneNumber(res?.phoneNumber);
        setphoneNumber(res?.phoneNumber);
        setPassport(res?.passportNumber);
        setGenderValue(res?.gender?.id == null ? 0 : res?.gender?.id);
        setMaritalStatusValue(
          res?.maritalStatus?.id == null ? 0 : res?.maritalStatus?.id
        );
        setNationalityLabel(
          res?.nationality?.name == null
            ? "Select Nationality"
            : res?.nationality?.name
        );
        setNationalityValue(
          res?.nationality?.id == null ? 0 : res?.nationality?.id
        );
        setCountryResidenceLabel(
          res?.country?.name == null
            ? "Select Residence Country"
            : res?.country?.name
        );
        setCountryResidenceValue(
          res?.country?.id == null ? 0 : res?.country?.id
        );
        setCountryBirthLabel(
          res?.countryOfBirth?.name == null
            ? "Select Birth Country"
            : res?.countryOfBirth?.name
        );
        setCountryBirthValue(
          res?.countryOfBirth?.id == null ? 0 : res?.countryOfBirth?.id
        );
        setBirthDate(res?.dateOfBirth);
        setIssueDate(res?.issueDate);
        setexpireDate(res?.expireDate);
      });
    }
  }, [success, applicationStudentId]);

  // Trial start

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleFirstNameChange = (e) => {
    const str = e.target.value.trimStart();
    setFirstName(str);

    if (str === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    const str = e.target.value.trimStart();
    setLastName(str);
    if (str === "") {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };
  useEffect(() => {
    if (!birthDate) {
      return;
    }
    const year = birthDate.split("-")[0];
    const digitYear = Number(year);

    const currentYear = currentDate.split("-")[0];
    const digitCurrentYear = Number(currentYear);

    const calculateAge = digitCurrentYear - digitYear;

    if (calculateAge < 15) {
      setDateError("Birthdate is more than 15 years");
    } else {
      setDateError("");
    }
  }, [birthDate]);

  const handleDate = (selectedDate) => {
    if (selectedDate) {
      setBirthDate(selectedDate);
    } else {
      setDateError("Date of birth is required");
    }
  };
  const handlePassport = (e) => {
    setPassport(e.target.value);
    if (e.target.value === "") {
      setPassportError("Passport Id is required");
    } else {
      setPassportError("");
    }
  };

  const handleIssueDate = (e) => {
    setIssueDate(e);
    setIssueDateError("");
    if (expireDate) {
      const checkdate = new Date(e) > new Date(expireDate);
      checkdate && setIssueDateError("Issue date need to be previous date");
    }
  };

  const handleExpireDate = (e) => {
    setexpireDate(e);
    setexpireDateError("");
    if (issueDate) {
      const checkdate = new Date(e) > new Date(issueDate);
      !checkdate && setexpireDateError("Expire date needs to be later date");
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError("");
      setImgError(false);
    }
  };

  const countryResidenceName = countryResidence?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const countryBirthName = countryBirth?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country

  const selectCountryResidence = (label, value) => {
    setCountryOfResidenceError(false);
    setCountryResidenceLabel(label);
    setCountryResidenceValue(value);
  };
  const selectCountryBirth = (label, value) => {
    setCountryOfBirthError(false);
    setCountryBirthLabel(label);
    setCountryBirthValue(value);
  };

  const nationalityName = nationality?.map((cons) => ({
    label: cons.name,
    value: cons.id,
  }));

  // select  Marital Status
  const selectNationality = (label, value) => {
    setNationalityError(false);
    setNationalityLabel(label);
    setNationalityValue(value);
  };

  const consultantName = consultant?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Consultant
  const selectConsultant = (label, value) => {
    setConsultantError(false);
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
    setConsultantValue(0);
    setConsultantLabel("Select Consultant");
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    if (countryResidenceValue === 0) {
      isFormValid = false;
      setCountryOfResidenceError(true);
    }

    if (countryBirthValue === 0) {
      isFormValid = false;
      setCountryOfBirthError(true);
    }

    if (
      userType !== userTypes?.Consultant &&
      userType !== userTypes?.AdmissionManager &&
      userType !== userTypes?.AdmissionOfficer &&
      userType !== userTypes?.ProviderAdmin &&
      consultantValue === 0
    ) {
      setConsultantError(true);
      isFormValid = false;
    }

    if (genderValue === 0) {
      isFormValid = false;
      setGenderError(true);
    }
    if (!firstName) {
      isFormValid = false;
      setFirstNameError("First Name is required");
    }
    if (!lastName) {
      isFormValid = false;
      setLastNameError("Last Name is required");
    }
    if (birthDate == null) {
      isFormValid = false;
      setDateError("Date of birth is required");
    }

    if (!passport) {
      isFormValid = false;
      setPassportError("Passport Id is required");
    }
    if (issueDate === null) {
      isFormValid = false;
      setIssueDateError("Issue Date is required");
    }
    if (expireDate === null) {
      isFormValid = false;
      setexpireDateError("Expiry Date is required ");
    }
    if (maritalStatusValue === 0) {
      isFormValid = false;
      setMaritalStatusError(true);
    }
    if (nationalityValue === 0) {
      isFormValid = false;
      setNationalityError(true);
    }
    if (!phoneNumber) {
      isFormValid = false;
      setphoneNUmberError("Phone number is required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNUmberError("Phone number required minimum 9 digit");
    }

    // if (userType === userTypes.Student.toString()) {
    //   if (oneData?.profileImage == null && FileList?.length < 1) {
    //     isFormValid = false;
    //     setImgError(true);
    //   }
    // }
    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (birthDate != null) {
      subData.append("dateOfBirth", birthDate);
    }
    if (issueDate != null) {
      subData.append("issueDate", issueDate);
    }
    if (expireDate != null) {
      subData.append("expireDate", expireDate);
    }
    subData.append("phoneNumber", phoneNumber);
    if (FileList.length === 0) {
      subData.append("profileImageFile", null);
    } else {
      subData.append("profileImageFile", FileList[0]?.originFileObj);
    }

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      put("Student/Update", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);

        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList([]);
          history.push(
            `/addStudentContactInformation/${applicationStudentId}/${1}`
          );
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNUmberError("Phone number is required");
    } else if (value?.length < 9) {
      setphoneNUmberError("Phone number required minimum 9 digit");
    } else {
      setphoneNUmberError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  return (
    <div>
      <BreadCrumb
        title="Personal Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentNavigation
            studentid={applicationStudentId}
            activetab={"1"}
            success={success}
            setSuccess={setSuccess}
            action={() => {}}
          />
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="1">
                  <p className="section-title">Personal Information</p>
                  <Form onSubmit={handleSubmit}>
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={applicationStudentId}
                    />

                    <>
                      {userType === userTypes?.SystemAdmin.toString() ? (
                        <FormGroup row>
                          <Col lg="6" md="8">
                            {" "}
                            <span>
                              <span className="text-danger">*</span> Branch{" "}
                            </span>
                            <Select
                              className="form-mt"
                              options={branchOptions}
                              value={{ label: branchLabel, value: branchValue }}
                              onChange={(opt) =>
                                selectBranch(opt.label, opt.value)
                              }
                              // name="BranchId"
                              // id="BranchId"
                              // isDisabled={branchId ? true : false}
                            />
                            {branchError && (
                              <span className="text-danger">
                                Branch is required
                              </span>
                            )}
                          </Col>
                        </FormGroup>
                      ) : null}
                    </>

                    {userType === userTypes?.SystemAdmin.toString() ||
                    userType === userTypes?.Admin.toString() ||
                    userType === userTypes?.BranchAdmin.toString() ||
                    userType === userTypes?.ComplianceManager.toString() ? (
                      <FormGroup row>
                        <Col lg="6" md="8">
                          <span>
                            {" "}
                            <span className="text-danger">*</span> Consultant
                          </span>

                          <Select
                            options={consultantName}
                            value={{
                              label: consultantLabel,
                              value: consultantValue,
                            }}
                            onChange={(opt) =>
                              selectConsultant(opt.label, opt.value)
                            }
                            name="consultantId"
                            id="consultantId"
                            required
                          />

                          {consultantError && (
                            <span className="text-danger">
                              Consultant is required
                            </span>
                          )}
                        </Col>
                      </FormGroup>
                    ) : (
                      <input
                        type="hidden"
                        name="consultantId"
                        id="consultantId"
                        value={consultantValue}
                      />
                    )}

                    {/* <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          {" "}
                          <span className="text-danger">*</span> Title
                        </span>
                        <div>
                          {title?.map((tt) => (
                            <>
                              <input
                                type="radio"
                                name="nameTittleId"
                                id="nameTittleId"
                                value={tt?.id}
                                onClick={() => {
                                  setTitleValue(tt?.id);
                                  setTitleError(false);
                                }}
                                checked={titleValue === tt?.id ? true : false}
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

                        {titleError && (
                          <span className="text-danger">Title is required</span>
                        )} */}

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          {" "}
                          <span className="text-danger">*</span> Title
                        </span>
                        <div>
                          {title?.map((tt) => (
                            <>
                              <input
                                type="radio"
                                name="nameTittleId"
                                id="nameTittleId"
                                value={tt?.id}
                                onClick={() => {
                                  setTitleValue(tt?.id);
                                  setTitleError(false);
                                }}
                                checked={titleValue === tt?.id ? true : false}
                              />

                              <label
                                className="mr-3"
                                style={{
                                  fontWeight: 500,
                                  fontSize: "14px",
                                }}
                              >
                                {tt?.name}
                              </label>
                            </>
                          ))}
                        </div>

                        {titleError && (
                          <span className="text-danger">Title is required</span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          First Name
                        </span>

                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="Enter First Name"
                          onChange={(e) => {
                            handleFirstNameChange(e);
                          }}
                          value={firstName}
                        />
                        <span className="text-danger">{firstNameError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          Last Name
                        </span>

                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Enter Last Name"
                          onChange={(e) => {
                            handleLastNameChange(e);
                          }}
                          value={lastName}
                        />
                        <span className="text-danger">{lastNameError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <DMYPicker
                          label="Date Of Birth"
                          value={birthDate}
                          setValue={handleDate}
                          error={dateError}
                          action={setDateError}
                          required={true}
                        />
                      </Col>
                      <Col lg="6" md="8"></Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span> Passport/ID
                        </span>

                        <Input
                          type="text"
                          name="passportNumber"
                          id="passportNumber"
                          placeholder="Enter Passport Number"
                          onChange={(e) => handlePassport(e)}
                          value={passport}
                        />
                        <span className="text-danger">{passportError}</span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="6" md="8">
                        <DMYPicker
                          setValue={handleIssueDate}
                          label="Issue Date"
                          value={issueDate}
                          error={issueDateError}
                          // action={setIssueDateError}
                          name="issueDate"
                          id="issueDate"
                          required={true}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col lg="6" md="8">
                        <DMYPicker
                          label="Expire Date"
                          setValue={handleExpireDate}
                          error={expireDateError}
                          // action={setexpireDateError}
                          required={true}
                          value={expireDate}
                          name="expireDate"
                          id="expireDate"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          Gender
                        </span>

                        <div>
                          {gender?.map((tt) => (
                            <>
                              <input
                                type="radio"
                                name="genderId"
                                id="genderId"
                                value={tt?.id}
                                onClick={() => {
                                  setGenderValue(tt?.id);
                                  setGenderError(false);
                                }}
                                checked={genderValue === tt?.id ? true : false}
                              />

                              <label
                                className="mr-3"
                                style={{
                                  fontWeight: 500,
                                  fontSize: "14px",
                                }}
                              >
                                {tt?.name}
                              </label>
                            </>
                          ))}
                        </div>
                        {genderError && (
                          <span className="text-danger">
                            Gender is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          {" "}
                          <span className="text-danger">*</span>
                          Marital Status
                        </span>

                        <div>
                          {maritalStatus?.map((tt) => (
                            <>
                              <input
                                type="radio"
                                name="maritalStatusId"
                                id="maritalStatusId"
                                value={tt?.id}
                                onClick={() => {
                                  setMaritalStatusValue(tt?.id);
                                  setMaritalStatusError(false);
                                }}
                                checked={
                                  maritalStatusValue === tt?.id ? true : false
                                }
                              />

                              <label
                                className="mr-3"
                                style={{
                                  fontWeight: 500,
                                  fontSize: "14px",
                                }}
                              >
                                {tt?.name}
                              </label>
                            </>
                          ))}
                        </div>

                        {maritalStatusError && (
                          <span className="text-danger">
                            Marital status is required
                          </span>
                        )}
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

                        <span className="text-danger">{phoneNUmberError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          Email
                        </span>

                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        {" "}
                        <span>
                          <span className="text-danger">*</span> Country of
                          Birth
                        </span>
                        <Select
                          options={countryBirthName}
                          value={{
                            label: countryBirthLabel,
                            value: countryBirthValue,
                          }}
                          onChange={(opt) =>
                            selectCountryBirth(opt.label, opt.value)
                          }
                          name="countryOfBirthId"
                          id="countryOfBirthId"
                          required
                        />
                        {countryOfBirthError && (
                          <span className="text-danger">
                            Country Of Birth is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          Country Of Residence{" "}
                        </span>

                        <Select
                          options={countryResidenceName}
                          value={{
                            label: countryResidenceLabel,
                            value: countryResidenceValue,
                          }}
                          onChange={(opt) =>
                            selectCountryResidence(opt.label, opt.value)
                          }
                          name="countryOfCitizenship"
                          id="countryOfCitizenship"
                          required
                        />
                        {countryOfResidenceError && (
                          <span className="text-danger">
                            Country Of Residence is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col lg="6" md="8">
                        <span>
                          <span className="text-danger">*</span>
                          Country Of Nationality
                        </span>

                        <Select
                          options={nationalityName}
                          value={{
                            label: nationalityLabel,
                            value: nationalityValue,
                          }}
                          onChange={(opt) =>
                            selectNationality(opt.label, opt.value)
                          }
                          name="nationalityId"
                          id="nationalityId"
                          required
                        />

                        {nationalityError && (
                          <span className="text-danger">
                            Nationality is required
                          </span>
                        )}
                      </Col>
                    </FormGroup>

                    <Row>
                      <Col lg="6" md="8">
                        <FormGroup row>
                          <Col md="3">
                            {/* <span>
                          {userId === applicationStudentId && (
                            <span className="text-danger mr-1">*</span>
                          )}
                          Profile Image
                        </span> */}
                            <span>Profile Image</span>
                          </Col>
                          <Col md="5">
                            <div className="row">
                              <div className="col-md-6 pb-2 pr-3">
                                <Upload
                                  listType="picture-card"
                                  multiple={false}
                                  fileList={FileList}
                                  onPreview={handlePreview}
                                  onChange={handleChange}
                                  beforeUpload={(file) => {
                                    return false;
                                  }}
                                >
                                  {FileList.length < 1 ? (
                                    <div
                                      className="text-danger"
                                      style={{ marginTop: 8 }}
                                    >
                                      <Icon.Upload />
                                      {/* <br />
                                  <span>Upload Here</span> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Upload>
                                <Modal
                                  visible={previewVisible}
                                  title={previewTitle}
                                  footer={null}
                                  onCancel={handleCancel}
                                >
                                  <img
                                    alt="example"
                                    style={{ width: "100%" }}
                                    src={previewImage}
                                  />
                                </Modal>
                                <span className="text-danger d-block">
                                  {error}
                                </span>
                              </div>
                            </div>

                            {userType !== userTypes?.SystemAdmin.toString() ? (
                              <>
                                {" "}
                                {oneData?.profileImageId === null ? (
                                  <>
                                    {" "}
                                    {imgError ? (
                                      <span className="text-danger">
                                        Profile picture is required
                                      </span>
                                    ) : null}
                                  </>
                                ) : null}
                              </>
                            ) : null}
                          </Col>
                          <Col md="4" className="pt-4">
                            <span className="text-gray">
                              File size less than 2MB, keep visual elements
                              centered
                            </span>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row className="mt-4 text-right">
                      <Col lg="6" md="8">
                        {permissions?.includes(permissionList?.Edit_Student) ? (
                          <SaveButton
                            text="Save and Next"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        ) : null}
                      </Col>
                    </FormGroup>
                    {/* </Col>
                    </FormGroup> */}
                  </Form>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
