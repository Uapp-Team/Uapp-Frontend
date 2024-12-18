import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { currentDate } from "../../../../../components/date/calenderFormate";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import put from "../../../../../helpers/put";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import PersonalForm from "./Component/PersonalForm";

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
  const [consPersonalInfo, setConsPersonalInfo] = useState({});
  const [passport, setPassport] = useState("");
  const [passportError, setPassportError] = useState("");
  const [navVisibility, setNavVisibility] = useState({});
  const { consultantRegisterId } = useParams();
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

  useEffect(() => {
    get("MaritalStatusDD/Index").then((res) => {
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      setGender(res);
    });

    get(`ConsultantNavBar/Get/${consultantRegisterId}`).then((res) => {
      //
      console.log("consNav", res);
      setNavVisibility(res);
    });

    get(`Consultant/GetPersonalInformation/${consultantRegisterId}`).then(
      (res) => {
        console.log("personalInfo", res);
        setConsPersonalInfo(res);
        setPassport(res?.passportId !== null ? res.passportId : "");
        setphoneNumber(res?.phoneNumber);
        setGenderValue(res?.genderId !== null ? res?.genderId : 0);
        setMaritalStatusValue(
          res?.maritalStatusId !== null ? res?.maritalStatusId : 0
        );
        res?.dateOfBirth &&
          setBirthDate(moment(new Date(res?.dateOfBirth)).format("YYYY-MM-DD"));
      }
    );
  }, [success, consultantRegisterId]);

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
    const subdata = new FormData(event.target);
    subdata.append("consultantProfileFile", FileList1[0]?.originFileObj);
    subdata.append("consultantCoverFile", FileList2[0]?.originFileObj);
    subdata.append("phoneNumber", phoneNumber);
    subdata.append("dateOfBirth", birthDate);

    let CheckFileIsValid = () => {
      if (consPersonalInfo?.consultantProfileImage === null) {
        if (FileList1.length < 1 && userId === consultantRegisterId) {
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
      if (birthDate === null) {
        isValid = false;
        setDateError("Date of birth is required");
      }
      if (passport === "") {
        isValid = false;
        setPassportError("Passport/ID is required");
      }
      if (maritalStatusValue === 0) {
        isValid = false;
        setMaritalStatusError(true);
      }
      if (!phoneNumber) {
        isValid = false;
        setphoneNUmberError("Phone number is required");
      }
      if (phoneNumber?.length < 9) {
        isValid = false;
        setphoneNUmberError("Phone number required minimum 9 digit");
      }
      if (!CheckFileIsValid() && userId === consultantRegisterId) {
        isValid = false;
        setProfilePicError(true);
      }
      return isValid;
    };

    if (IsFormValid()) {
      setButtonStatus(true);
      setProgress(true);
      put("Consultant/PersonalInformation", subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
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
        history.push(`/consultantContactInformation/${consultantRegisterId}`);
      });
    }
  };

  const handlePrevious = () => {
    history.push(`/consultantInformation/${consultantRegisterId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Consultant Personal Information"
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
            <TabPane tabId="2">
              <PersonalForm
                handleSubmit={handleSubmit}
                consultantRegisterId={consultantRegisterId}
                SetDate={SetDate}
                Dates={Dates}
                setPassport={setPassport}
                passport={passport}
                passportError={passportError}
                setPassportError={setPassportError}
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
                consPersonalInfo={consPersonalInfo}
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
                handlePrevious={handlePrevious}
                birthDate={birthDate}
                minDate={minDate}
              ></PersonalForm>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonalInformation;
