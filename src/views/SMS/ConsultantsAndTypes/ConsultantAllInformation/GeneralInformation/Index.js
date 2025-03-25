import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import {
  BranchAdmin,
  BranchManager,
} from "../../../../../components/core/User";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import GeneralInformationForm from "./Component/GeneralInformationForm";

const GeneralInformation = () => {
  const [nameTitle, setNameTitle] = useState([]);
  const [consParent, setConsParent] = useState([]);
  const [consType, setConsType] = useState([]);
  const [nameLabel, setNameLabel] = useState("Select Title");
  const [nameValue, setNameValue] = useState(0);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState("Select Consultant Type");
  const [typeValue, setTypeValue] = useState(0);
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const [consultantError, setConsultantError] = useState(false);
  const [parentError, setParentError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  // const [submitData, setSubmitData] = useState(false);
  const [consData, setConsData] = useState({});
  const [success, setSuccess] = useState(false);
  const [navVisibility, setNavVisibility] = useState({});
  const activetab = "1";
  const { consultantRegisterId } = useParams();

  const userTypeId = localStorage.getItem("userType");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const history = useHistory();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });
    get("BranchDD/index").then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });

    get("ConsultantTypeDD/index").then((res) => {
      setConsType(res);
    });
  }, []);

  useEffect(() => {
    get(`ParentConsultantDD/Index/${consultantRegisterId}`).then((res) => {
      setConsParent(res);
    });
  }, [consultantRegisterId]);

  useEffect(() => {
    get(`ConsultantNavBar/GetNavbar/${consultantRegisterId}`).then((res) => {
      setNavVisibility(res);
    });

    get(`Consultant/GetGeneralInformation/${consultantRegisterId}`).then(
      (res) => {
        setConsData(res);
        // setSubmitData(true);
        setTypeValue(res?.consultantType?.id);
        setTypeLabel(res?.consultantType?.name);
        setParentValue(
          res?.parentConsultant?.id ? res?.parentConsultant?.id : 0
        );
        setParentLabel(
          res?.parentConsultant?.firstName
            ? res?.parentConsultant?.firstName +
                " " +
                res?.parentConsultant?.lastName
            : "Select Parent Consultant"
        );
        setBranchValue(res?.branch?.id);
        setBranchLabel(res?.branch?.name);
        // setNameValue(res?.nameTittle?.id);
        setTitleValue(res?.nameTittle?.id == null ? 0 : res?.nameTittle?.id);
        setNameLabel(res?.nameTittle?.name);
        setHomeAccept(res?.isAcceptedHome);
        setUkAccept(res?.isAcceptedEU_UK);
        setIntAccept(res?.isAcceptedInternational);
        setFirstName(res?.firstName);
        setLastName(res?.lastName);
      }
    );
  }, [success, consultantRegisterId]);

  const nameTitleMenu = nameTitle?.map((titleOptions) => ({
    label: titleOptions?.name,
    value: titleOptions?.id,
  }));
  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));
  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const selectNameTitle = (label, value) => {
    setTitleError(false);
    setNameLabel(label);
    setNameValue(value);
  };

  const selectParentCons = (label, value) => {
    setParentError(false);
    setParentLabel(label);
    setParentValue(value);
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
    setTypeLabel("Select Consultant Type");
    setTypeValue(0);
    setParentLabel("Select Parent Consultant");
    setParentValue(0);
  };

  const handleFirstNameChange = (e) => {
    let data = e.target.value.trimStart();
    setFirstName(data);
    if (data === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    let data = e.target.value.trimStart();
    setLastName(data);
    if (data === "") {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (userTypeId !== userTypes?.Consultant && typeValue === 0) {
      isValid = false;
      setConsultantError(true);
    }

    // if (typeValue === 0) {
    //   isValid = false;
    //   setConsultantError(true);
    // }

    if (
      userTypeId !== userTypes?.Consultant &&
      homeAccept === false &&
      ukAccept === false &&
      intAccept === false
    ) {
      isValid = false;
      setAcceptError(true);
    }

    // if (homeAccept === false && ukAccept === false && intAccept === false) {
    //   isValid = false;
    //   setAcceptError(true);
    // }

    // if (userTypeId !== userTypes?.Consultant && parentValue === 0) {
    //   isValid = false;
    //   setParentError(true);
    // }

    if (consData?.isDefaultConsultant === true) {
      setParentError(false);
    } else {
      if (userTypeId !== userTypes?.Consultant && parentValue === 0) {
        isValid = false;
        setParentError(true);
      } else {
        setParentError(false);
      }
    }

    if (titleValue === 0) {
      isValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isValid = false;
      setFirstNameError("First name is required");
    }
    if (!lastName) {
      isValid = false;
      setLastNameError("Last name is required");
    }
    return isValid;
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

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);

      post("Consultant/GeneralInformation", subdata).then((res) => {
        setProgress(false);

        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        setSuccess(!success);
        history.push(`/consultantPersonalInformation/${consultantRegisterId}`);
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Consultant General Information"
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
          {/* nav tabs start */}

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <GeneralInformationForm
                handleSubmit={handleSubmit}
                consData={consData}
                firstName={firstName}
                lastName={lastName}
                handleFirstNameChange={handleFirstNameChange}
                handleLastNameChange={handleLastNameChange}
                handleEmail={handleEmail}
                firstNameError={firstNameError}
                consultantRegisterId={consultantRegisterId}
                userTypeId={userTypeId}
                userTypes={userTypes}
                consTypeMenu={consTypeMenu}
                typeLabel={typeLabel}
                typeValue={typeValue}
                selectConsType={selectConsType}
                consultantError={consultantError}
                setHomeAccept={setHomeAccept}
                setAcceptError={setAcceptError}
                setUkAccept={setUkAccept}
                setIntAccept={setIntAccept}
                acceptError={acceptError}
                consParentMenu={consParentMenu}
                homeAccept={homeAccept}
                ukAccept={ukAccept}
                intAccept={intAccept}
                parentLabel={parentLabel}
                parentValue={parentValue}
                parentError={parentError}
                branchOptions={branchOptions}
                branchLabel={branchLabel}
                branchValue={branchValue}
                selectParentCons={selectParentCons}
                selectBranch={selectBranch}
                branchError={branchError}
                nameTitleMenu={nameTitleMenu}
                nameLabel={nameLabel}
                nameValue={nameValue}
                titleError={titleError}
                selectNameTitle={selectNameTitle}
                progress={progress}
                buttonStatus={buttonStatus}
                setFirstNameError={setFirstNameError}
                lastNameError={lastNameError}
                setTitleError={setTitleError}
                setTitleValue={setTitleValue}
                titleValue={titleValue}
                title={title}
              ></GeneralInformationForm>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default GeneralInformation;
