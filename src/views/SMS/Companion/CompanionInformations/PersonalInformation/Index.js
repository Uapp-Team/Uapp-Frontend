import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import get from "../../../../../helpers/get";
import Uget from "../../../../../helpers/Uget";
import Navigation from "../NavigationAndRegistration/Navigation";
import put from "../../../../../helpers/put";
import moment from "moment";
import PersonalForm from "./Component/PersonalForm";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { currentDate } from "../../../../../components/date/calenderFormate";
import { userTypes } from "../../../../../constants/userTypeConstant";
import post from "../../../../../helpers/post";
import Loader from "../../../Search/Loader/Loader";

const PersonalInformation = () => {
  // Profile Image States
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [profilePicError, setProfilePicError] = useState(false);
  // Cover Image States
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const activetab = "2";
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [gender, setGender] = useState([]);
  const [genderValue, setGenderValue] = useState(0);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalStatusValue, setMaritalStatusValue] = useState(0);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Dates, SetDate] = useState(currentDate);
  const [companionPersonalInfo, setCompanionPersonalInfo] = useState({});
  const [passport, setPassport] = useState("");
  const [passportError, setPassportError] = useState("");
  const [navVisibility, setNavVisibility] = useState({});
  const { companionId } = useParams();
  const { addToast } = useToasts();
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  // const [valid, setValid] = useState(true);
  const [birthDate, setBirthDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const minDate = "1950-01-01";
  const history = useHistory();
  const userId = localStorage.getItem("referenceId");
  const userType = localStorage.getItem("userType");
  const [consData, setConsData] = useState({});
  const userTypeId = localStorage.getItem("userType");
  const [companionParent, setCompanionParent] = useState([]);
  const [companionParentLabel, setCompanionParentLabel] = useState(
    "Select Parent Companion"
  );
  const [companionParentValue, setCompanionParentValue] = useState(0);
  const [parentError, setParentError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [arrLink, setarrLink] = useState([]);
  const [arrLinkError, setarrLinkError] = useState([]);
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantError, setConsultantError] = useState(false);

  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);
  const [loading, setLoading] = useState(false);

  const companionParentMenu = companionParent?.map(
    (companionParentOptions) => ({
      label: companionParentOptions?.name,
      value: companionParentOptions?.id,
    })
  );

  const selectParentCompanion = (label, value) => {
    setParentError(false);
    setCompanionParentLabel(label);
    setCompanionParentValue(value);
  };

  const consultantName = consultant?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantError(false);
    setconsultantLabel(label);
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
    setconsultantLabel("Select Consultant");
    setCompanionParentValue(0);
    setCompanionParentLabel("Select Parent Affiliate");
  };

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("MaritalStatusDD/Index").then((res) => {
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      setGender(res);
    });
  }, []);

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
    });

    get(`ConsultantDD/ByBranch/${branchValue}`).then((res) => {
      setConsultant(res);
    });

    get(`CompanionDD/Index/${consultantValue}`).then((res) => {
      setCompanionParent(res);
    });
  }, [branchValue, consultantValue]);

  useEffect(() => {
    Uget(`Companion/get-by/${companionId}`).then((res) => {
      console.log("personalInfo", res?.data);
      setCompanionPersonalInfo(res);
      setBranchValue(res?.data?.branchId == null ? 0 : res?.data?.branchId);
      setBranchLabel(
        res?.data?.branchName == "" ? "Select Branch" : res?.data?.branchName
      );
      setCompanionParentValue(
        res?.data?.parentCompanionId == null ? 0 : res?.data?.parentCompanionId
      );
      setCompanionParentLabel(
        res?.data?.parentCompanionName == ""
          ? "Select Parent Companion"
          : res?.data?.parentCompanionName
      );
      setconsultantLabel(
        res?.data?.consultantName == ""
          ? "Select Consultant"
          : res?.data?.consultantName
      );
      setConsultantValue(
        res?.data?.consultantId == null ? 0 : res?.data?.consultantId
      );
      setLastName(res?.data?.lastName);
      setFirstName(res?.data?.firstName);
      setPassport(res?.data?.passportId);
      setarrLink(res?.data?.companionLinks);
      setTitleValue(
        res?.data?.nameTittleId == null ? 0 : res?.data?.nameTittleId
      );

      setphoneNumber(res?.data?.phoneNumber);
      setGenderValue(res?.data?.genderId !== null ? res?.data?.genderId : 0);
      setMaritalStatusValue(
        res?.data?.maritalStatusId !== null ? res?.data?.maritalStatusId : 0
      );
      res?.data?.dateOfBirth &&
        setBirthDate(
          moment(new Date(res?.data?.dateOfBirth)).format("YYYY-MM-DD")
        );
      setLoading(false);
    });
  }, [success, companionId]);

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }
    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setProfilePicError(false);
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList1([]);
      setError("Only jpeg, jpg, png image is allowed");
      setProfilePicError(false);
    } else {
      setFileList1(fileList);
      setError("");
    }
  };

  // Profile Image Code End

  // Cover Image Code Start

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function getBase642(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase642(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList2([]);
      setError2("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList2(fileList);
      setError2("");
    }
  };

  // const validatePhoneNumber = (phoneNumber) => {
  //   const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

  //   return phoneNumberPattern.test(phoneNumber);
  // };

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
    // setValid(validatePhoneNumber(value));
  };

  const handleDate = (e) => {
    setBirthDate(e);
    if (e === "") {
      setDateError("Date of birth is required");
    } else {
      setDateError("");
    }
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(arrLink, "arrlink");
    const subdata = new FormData(event.target);
    subdata.append("dateOfBirth", birthDate);
    subdata.append("ProfileImageFile", FileList1[0]?.originFileObj);
    subdata.append("consultantCoverFile", FileList2[0]?.originFileObj);
    subdata.append("phoneNumber", phoneNumber);
    // subdata.append("companionLinks", "hi");
    subdata.append("companionLinks", JSON.stringify(arrLink).toString());

    let CheckFileIsValid = () => {
      if (companionPersonalInfo?.data?.companionProfileImage === null) {
        if (FileList1.length < 1 && userId === companionId) {
          setProfilePicError(true);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    let IsFormValid = () => {
      var isValid = true;

      if (genderValue === 0) {
        isValid = false;
        setGenderError(true);
      }
      if (!companionId || consultantValue === 0) {
        setConsultantError(true);
        isValid = false;
      }

      if (birthDate === null) {
        isValid = false;
        setDateError("Date of birth is required");
      }
      if (maritalStatusValue === 0) {
        isValid = false;
        setMaritalStatusError(true);
      }

      if (/[^a-zA-Z\s]/g.test(firstName)) {
        isValid = false;
        setFirstNameError("Number can not be allowed in the First Name");
      }

      if (/[^a-zA-Z\s]/g.test(lastName)) {
        isValid = false;
        setLastNameError("Number can not be allowed in the Last Name");
      }

      if (!passport) {
        isValid = false;
        setPassportError("Passport is required");
      }

      if (!phoneNumber) {
        isValid = false;
        setphoneNUmberError("Phone number is required");
      }
      if (phoneNumber?.length < 9) {
        isValid = false;
        setphoneNUmberError("Phone number required minimum 9 digit");
      }
      if (arrLink.length === 0) {
        isValid = false;
        setarrLinkError("one link must be added");
      }
      if (!CheckFileIsValid() && userId === companionId) {
        isValid = false;
        setProfilePicError(true);
      }
      return isValid;
    };

    if (IsFormValid()) {
      setButtonStatus(true);
      setProgress(true);
      post("Companion/update", subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        if (FileList1.length > 0) {
          setFileList1([]);
        }
        if (FileList2.length > 0) {
          setFileList2([]);
        }
        setButtonStatus(false);
        history.push(`/companionContactInfo/${companionId}`);
      });
    }
  };

  const handlePassportChange = (e) => {
    let data = e.target.value.trimStart();
    setPassport(data);
    if (data === "") {
      setPassportError("Passport is required");
    } else {
      setPassportError("");
    }
  };

  const handleFirstNameChange = (e) => {
    let data = e.target.value.trimStart();
    setFirstName(data);
    if (data === "") {
      setFirstNameError("First Name is required");
    } else if (/[^a-zA-Z\s]/g.test(data)) {
      setFirstNameError("Number can not be allowed in the First Name");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    let data = e.target.value.trimStart();
    setLastName(data);
    if (data === "") {
      setLastNameError("Last Name is required");
    } else if (/[^a-zA-Z\s]/g.test(data)) {
      setLastNameError("Number can not be allowed in the Last Name");
    } else {
      setLastNameError("");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Navigation
            title="Personal Information"
            activetab="1"
            companionId={companionId}
            success={success}
            action={() => {}}
          />
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="2">
                  <PersonalForm
                    handleSubmit={handleSubmit}
                    userTypeId={userTypeId}
                    userTypes={userTypes}
                    companionParentMenu={companionParentMenu}
                    companionParentLabel={companionParentLabel}
                    companionParentValue={companionParentValue}
                    parentError={parentError}
                    selectParentCompanion={selectParentCompanion}
                    titleError={titleError}
                    handleFirstNameChange={handleFirstNameChange}
                    handleLastNameChange={handleLastNameChange}
                    firstNameError={firstNameError}
                    lastNameError={lastNameError}
                    firstName={firstName}
                    lastName={lastName}
                    setTitleValue={setTitleValue}
                    setTitleError={setTitleError}
                    titleValue={titleValue}
                    title={title}
                    SetDate={SetDate}
                    Dates={Dates}
                    setPassport={setPassport}
                    passport={passport}
                    passportError={passportError}
                    handlePassportChange={handlePassportChange}
                    gender={gender}
                    setGenderValue={setGenderValue}
                    setGenderError={setGenderError}
                    genderValue={genderValue}
                    genderError={genderError}
                    maritalStatus={maritalStatus}
                    setMaritalStatusValue={setMaritalStatusValue}
                    setMaritalStatusError={setMaritalStatusError}
                    maritalStatusValue={maritalStatusValue}
                    maritalStatusError={maritalStatusError}
                    companionPersonalInfo={companionPersonalInfo}
                    FileList1={FileList1}
                    handlePreview1={handlePreview1}
                    handleChange1={handleChange1}
                    previewVisible1={previewVisible1}
                    previewTitle1={previewTitle1}
                    handleCancel1={handleCancel1}
                    previewImage1={previewImage1}
                    profilePicError={profilePicError}
                    error={error}
                    FileList2={FileList2}
                    handlePreview2={handlePreview2}
                    previewTitle2={previewTitle2}
                    previewVisible2={previewVisible2}
                    handleChange2={handleChange2}
                    handleCancel2={handleCancel2}
                    previewImage2={previewImage2}
                    error2={error2}
                    progress={progress}
                    buttonStatus={buttonStatus}
                    handlePhoneNumber={handlePhoneNumber}
                    phoneNUmberError={phoneNUmberError}
                    phoneNumber={phoneNumber}
                    dateError={dateError}
                    handleDate={handleDate}
                    setDateError={setDateError}
                    birthDate={birthDate}
                    minDate={minDate}
                    arrLink={arrLink}
                    setarrLink={setarrLink}
                    companionId={companionId}
                    setarrLinkError={setarrLinkError}
                    arrLinkError={arrLinkError}
                    consultantName={consultantName}
                    consultantLabel={consultantLabel}
                    consultantValue={consultantValue}
                    selectConsultant={selectConsultant}
                    consultantError={consultantError}
                    branchOptions={branchOptions}
                    branchValue={branchValue}
                    branchError={branchError}
                    branchLabel={branchLabel}
                    selectBranch={selectBranch}
                  ></PersonalForm>
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
