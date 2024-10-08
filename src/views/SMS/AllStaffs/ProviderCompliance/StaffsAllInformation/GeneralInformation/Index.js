import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import GeneralInformationForm from "./Component/GeneralInformationForm";
import StaffNavigation from "../NavigationAndRegister/StaffNavigation";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const StaffGeneralInformation = () => {
  const [title, setTitle] = useState([]);
  const [consType, setConsType] = useState([]);
  const [nameLabel, setNameLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState(
    "Select Provider Compliance  Type"
  );
  const [typeValue, setTypeValue] = useState(0);
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const [consultantError, setConsultantError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [submitData, setSubmitData] = useState(false);
  const [consData, setConsData] = useState({});
  const [success, setSuccess] = useState(false);
  const activetab = "1";
  const { providerComplianceId } = useParams();
  const userTypeId = localStorage.getItem("userType");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const [providerHelperId, setProviderHelperId] = useState(undefined);
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("ProviderDD/index").then((res) => {
      setBranch(res);
    });

    get(
      `ProviderCompliance/GetGeneralInformation/${providerComplianceId}`
    ).then((res) => {
      console.log("cons", res);
      setConsData(res);
      setSubmitData(true);
      setTypeValue(res?.employeType?.id);
      setTypeLabel(res?.employeType?.name);
      setParentValue(res?.parentConsultant?.id);
      setParentLabel(
        res?.parentConsultant?.firstName + " " + res?.parentConsultant?.lastName
      );
      setBranchValue(res?.provider?.id);
      setBranchLabel(res?.provider?.providerName);
      setTitleValue(res?.nameTittle?.id);
      setNameLabel(res?.nameTittle?.name);
      setHomeAccept(res?.isAcceptedHome);
      setUkAccept(res?.isAcceptedEU_UK);
      setIntAccept(res?.isAcceptedInternational);
      setFirstName(res?.firstName);
      setLastName(res?.lastName);
      setEmail(res?.email);
    });
  }, [success, providerComplianceId]);

  useEffect(() => {
    if (userTypeId === userTypes?.ProviderAdmin.toString()) {
      get(`ProviderHelper/GetProviderId/${userTypeId}/${userId}`).then(
        (res) => {
          console.log("providerId", res);
          setProviderHelperId(res);
        }
      );
    }
  }, [userTypeId, userId, providerHelperId]);

  const nameTitleMenu = title?.map((titleOptions) => ({
    label: titleOptions?.name,
    value: titleOptions?.id,
  }));

  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const selectNameTitle = (label, value) => {
    setTitleError(false);
    setNameLabel(label);
    setTitleValue(value);
  };

  const selectConsType = (label, value) => {
    setConsultantError(false);
    setTypeLabel(label);
    setTypeValue(value);
  };

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
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
        setEmailExistError(res);
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("isAcceptedHome", homeAccept);
    subdata.append("isAcceptedEU_UK", ukAccept);
    subdata.append("isAcceptedInternational", intAccept);

    for (var value of subdata) {
      console.log(value);
    }

    if (typeValue === 0) {
      setConsultantError(true);
    } else if (branchValue === 0) {
      setBranchError(true);
    } else if (titleValue === 0) {
      setTitleError(true);
    } else if (!firstName) {
      setFirstNameError("First name is required");
    } else if (!lastName) {
      setLastNameError("Last name is required");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post("ProviderCompliance/GeneralInformation", subdata).then((res) => {
        setProgress(false);

        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setSuccess(!success);
        history.push(
          `/providerCompliancePersonalInformation/${providerComplianceId}`
        );
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Provider Compliance  General Information"
        backTo="Provider Compliance "
        path={`/providerComplianceList`}
      />

      <StaffNavigation
        activetab={activetab}
        providerComplianceId={providerComplianceId}
      />
      <Card>
        <CardBody>
          <p className="section-title">General Information</p>
          {/* nav tabs start */}

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              {/* Form start */}

              <GeneralInformationForm
                handleSubmit={handleSubmit}
                providerComplianceId={providerComplianceId}
                consData={consData}
                branchOptions={branchOptions}
                branchLabel={branchLabel}
                branchValue={branchValue}
                selectBranch={selectBranch}
                branchError={branchError}
                userTypeId={userTypeId}
                userTypes={userTypes}
                consTypeMenu={consTypeMenu}
                typeLabel={typeLabel}
                typeValue={typeValue}
                consultantError={consultantError}
                nameTitleMenu={nameTitleMenu}
                nameLabel={nameLabel}
                nameValue={titleValue}
                selectNameTitle={selectNameTitle}
                selectConsType={selectConsType}
                titleError={titleError}
                progress={progress}
                buttonStatus={buttonStatus}
                handleFirstName={handleFirstName}
                firstNameError={firstNameError}
                handleLastName={handleLastName}
                lastNameError={lastNameError}
                title={title}
                setTitleValue={setTitleValue}
                titleValue={titleValue}
                setTitleError={setTitleError}
                email={email}
                handleEmailError={handleEmailError}
                emailExistError={emailExistError}
                emailError={emailError}
                firstName={firstName}
                lastName={lastName}
              ></GeneralInformationForm>
              {/* Form End */}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default StaffGeneralInformation;
