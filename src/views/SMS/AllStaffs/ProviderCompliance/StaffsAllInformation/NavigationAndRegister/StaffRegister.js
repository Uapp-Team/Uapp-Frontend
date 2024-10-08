import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Form, FormGroup, Col, Input, Row } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const StaffRegister = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");
  const { commonId } = useParams();
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  // const [consType, setConsType] = useState([]);
  // const [typeLabel, setTypeLabel] = useState(
  //   "Select Provider Compliance  Type"
  // );
  // const [typeValue, setTypeValue] = useState(0);
  const [providerHelperId, setProviderHelperId] = useState(undefined);

  const [provider, setProvider] = useState([]);
  const [providerLabel, setProviderLabel] = useState("Select Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [providerError, setProviderError] = useState(false);
  // const [consultantError, setConsultantError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providerComplianceId, setStaffId] = useState();

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("ProviderDD/index").then((res) => {
      setProvider(res);
    });
  }, []);

  useEffect(() => {
    const filterData = provider.filter((status) => {
      return status.id.toString() === commonId;
    });

    if (filterData?.length === 1) {
      setProviderValue(filterData[0]?.id);
      setProviderLabel(filterData[0]?.name);
    }
  }, [provider, commonId]);

  useEffect(() => {
    if (userTypeId === userTypes?.ProviderAdmin.toString()) {
      get(`ProviderHelper/GetProviderId/${userTypeId}/${userId}`).then(
        (res) => {
          setProviderHelperId(res);
        }
      );
    }
  }, [userTypeId, userId]);

  const branchOptions = provider?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
  };

  // const handleEmail = (e) => {
  //   get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
  //     setEmailError(res);
  //   });
  // };

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

  const validateRegisterForm = () => {
    let isFormValid = true;

    // if (typeValue === 0) {
    //   isFormValid = false;
    //   setConsultantError(true);
    // }
    if (
      commonId === undefined &&
      userTypeId !== userTypes?.ProviderAdmin.toString() &&
      providerValue === 0
    ) {
      isFormValid = false;
      setProviderError(true);
    }
    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isFormValid = false;
      setFirstNameError("First name is required");
    }
    if (!lastName) {
      isFormValid = false;
      setLastNameError("Last name is required");
    }
    if (!email) {
      isFormValid = false;
      setEmailError("Email is required");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }
    if (emailExistError === false) {
      isFormValid = false;
      setEmailExistError(emailExistError);
    }
    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    var formIsValid = validateRegisterForm();

    if (formIsValid === true) {
      setButtonStatus(true);
      setProgress(true);
      post("ProviderCompliance/GeneralInformation", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          setStaffId(res?.data?.result?.id);
          setIsModalOpen(true);
          setProviderLabel("Select Branch");
          setProviderValue(0);
          setTitleValue(0);
          setFirstName("");
          setLastName("");
          setEmail("");
        } else {
          return;
        }
      });
    }
  };

  const goToProfile = () => {
    history.push(
      `/providerCompliancePersonalInformation/${providerComplianceId}`
    );
  };

  const ToBack = () => {
    history.push("/providerComplianceList");
  };

  return (
    <div>
      <BreadCrumb
        title="Provider Compliance  General Information"
        backTo="Provider Compliance "
        path="/providerComplianceList"
      />

      <Card>
        <CardBody>
          <p className="section-title">Create A New Provider Compliance </p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                {commonId === undefined &&
                userTypeId !== userTypes?.ProviderAdmin.toString() ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Provider
                    </span>

                    <Select
                      options={branchOptions}
                      value={{
                        label: providerLabel,
                        value: providerValue,
                      }}
                      onChange={(opt) => selectBranch(opt.label, opt.value)}
                      name="providerId"
                      id="providerId"
                    />
                    {providerError ? (
                      <span className="text-danger">Provider is required</span>
                    ) : null}
                  </FormGroup>
                ) : userTypeId === userTypes?.ProviderAdmin.toString() ? (
                  <input
                    type="hidden"
                    name="providerId"
                    value={providerHelperId}
                  />
                ) : (
                  <FormGroup>
                    <Select
                      isDisabled
                      value={{
                        label: providerLabel,
                        value: providerValue,
                      }}
                      name="providerId"
                      id="providerId"
                    />
                  </FormGroup>
                )}

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Title
                  </span>
                  <div>
                    {title?.map((tt) => (
                      <>
                        <input
                          type="radio"
                          name="nameTitleId"
                          id="nameTitleId"
                          value={tt?.id}
                          onChange={() => {
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
                  )}
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> First Name
                  </span>

                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    placeholder="Enter First Name"
                    onChange={(e) => {
                      handleFirstName(e);
                    }}
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Last Name
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      handleLastName(e);
                    }}
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Email
                  </span>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>

                <FormGroup className="text-right">
                  <CancelButton cancel={ToBack} />
                  {permissions?.includes(permissionList?.Add_Provider) && (
                    <SaveButton
                      text="Create Provider Compliance "
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <ConfirmModal
        text="Provider Compliance  added successfully"
        text2="An email is sent to the Provider Compliance email with login credentials"
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Add Another"
        yesText="Complete Profile"
        cancel={() => setIsModalOpen(false)}
        confirm={goToProfile}
      />
    </div>
  );
};

export default StaffRegister;
