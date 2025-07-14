import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import put from "../../../../../../helpers/put";
import PersonalInformationForm from "./Component/PersonalInformationForm";
import SalesTeamLeaderNavigation from "../NavigationAndRegister/SalesTeamLeaderNavigation";

const SalesManagerPersonalInformation = () => {
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
  const [Dates, SetDate] = useState(null);
  const [DatesError, SetDateError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [valid, setValid] = useState(true);
  const [consPersonalInfo, setConsPersonalInfo] = useState({});
  const [passport, setPassport] = useState("");
  const [passportError, setPassportError] = useState(false);
  const { salesTeamLeaderId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [action, setAction] = useState({});

  useEffect(() => {
    get("MaritalStatusDD/Index").then((res) => {
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      setGender(res);
    });

    get(`Employee/GetPersonalInformation/${salesTeamLeaderId}`).then((res) => {
      console.log("personalInfo", res);
      setConsPersonalInfo(res);
      setPassport(res?.passportId);
      setGenderValue(res?.genderId !== null ? res?.genderId : 0);
      setMaritalStatusValue(
        res?.maritalStatusId !== null ? res?.maritalStatusId : 0
      );

      res?.dateOfBirth &&
        SetDate(moment(new Date(res?.dateOfBirth)).format("YYYY-MM-DD"));

      setPhone(res?.phoneNumber);
      // SetDate(res?.dateOfBirth);
    });
  }, [success, salesTeamLeaderId]);

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const goNext = () => {
    history.push(`/salesTeamLeaderContactInformation/${salesTeamLeaderId}`);
  };

  const goPrevious = () => {
    history.push(`/salesTeamLeaderGeneralInformation/${salesTeamLeaderId}`);
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

  const handleDate = (e) => {
    if (e) {
      SetDate(e);
    } else {
      SetDateError("Birth date is required");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
    setPhone(value);
    if (value === "") {
      setPhoneError("Phone number is required");
    } else if (value?.length < 9) {
      setPhoneError("Phone number required minimum 9 digit");
    } else {
      setPhoneError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("dateOfBirth", Dates);
    subdata.append("EmployeeProfileFile", FileList1[0]?.originFileObj);
    subdata.append("EmployeeCoverFile", FileList2[0]?.originFileObj);
    subdata.append("phoneNumber", phone);

    let CheckFileIsValid = () => {
      if (
        consPersonalInfo?.employeeProfileImage == null &&
        userType !== userTypes.SystemAdmin.toString() &&
        userType !== userTypes.Admin.toString()
      ) {
        if (FileList1.length < 1) {
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
      let isFormValid = true;

      if (!Dates) {
        isFormValid = false;
        SetDateError("Birth date is required");
      }

      if (passport === null || passport === "") {
        isFormValid = false;
        setPassportError(true);
      }

      if (!phone) {
        isFormValid = false;
        setPhoneError("Phone number is required");
      }

      if (phone?.length < 9) {
        isFormValid = false;
        setPhoneError("Phone number required minimum 9 digit");
      }

      if (genderValue === 0) {
        isFormValid = false;
        setGenderError(true);
      }

      if (maritalStatusValue === 0) {
        isFormValid = false;
        setMaritalStatusError(true);
      }
      if (!CheckFileIsValid()) {
        isFormValid = false;
        setProfilePicError(true);
      }
      return isFormValid;
    };

    if (IsFormValid()) {
      setButtonStatus(true);
      setProgress(true);
      put("Employee/PersonalInformation", subdata).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess == true ? "success" : "error",
          autoDismiss: true,
        });
        if (FileList1.length > 0) {
          setFileList1([]);
        }
        if (FileList2.length > 0) {
          setFileList2([]);
        }
        setButtonStatus(false);
        history.push(`/salesTeamLeaderContactInformation/${salesTeamLeaderId}`);
      });
    }
  };

  const onGoUniProfile = () => {
    history.push(`/salesTeamLeaderProfile/${salesTeamLeaderId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Sales Team Leader Personal Information"
        backTo={
          userType === userTypes?.Admin ||
          userType === userTypes?.AccountManager ||
          userType === userTypes?.ComplianceManager ||
          userType === userTypes?.AccountOfficer ||
          userType === userTypes?.FinanceManager ||
          userType === userTypes?.Editor
            ? null
            : "Sales Team Leader"
        }
        path={`/salesTeamLeaderList`}
      />

      <SalesTeamLeaderNavigation
        salesTeamLeaderId={salesTeamLeaderId}
        activetab={activetab}
        success={success}
        action={setAction}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <p className="section-title">Personal Information</p>
              {/* Form Start */}
              <PersonalInformationForm
                handleSubmit={handleSubmit}
                salesTeamLeaderId={salesTeamLeaderId}
                Dates={Dates}
                SetDate={SetDate}
                DatesError={DatesError}
                setDateError={SetDateError}
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
                error={error}
                profilePicError={profilePicError}
                FileList2={FileList2}
                handlePreview2={handlePreview2}
                handleChange2={handleChange2}
                previewVisible2={previewVisible2}
                previewTitle2={previewTitle2}
                handleCancel2={handleCancel2}
                previewImage2={previewImage2}
                error2={error2}
                progress={progress}
                buttonStatus={buttonStatus}
                handleDate={handleDate}
                phoneError={phoneError}
                goPrevious={goPrevious}
                phone={phone}
                handlePhoneNumber={handlePhoneNumber}
              ></PersonalInformationForm>

              {/* Form End */}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default SalesManagerPersonalInformation;
