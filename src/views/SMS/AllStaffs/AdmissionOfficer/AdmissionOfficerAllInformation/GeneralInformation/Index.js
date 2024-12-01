import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { Card, CardBody, Form, Row, Col, FormGroup, Input } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import AdmissionOfficerNavigation from "../NavigationAndRegister/AdmissionOfficerNavigation";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const activetab = "1";
  const { admissionOfficerId } = useParams();

  const [provider, setProvider] = useState([]);
  const [providerLabel, setProviderLabel] = useState("Select Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [providerError, setProviderError] = useState(false);
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [title, setTitle] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const userId = localStorage.getItem("referenceId");
  const [providerHelperId, setProviderHelperId] = useState(undefined);
  const [managerDDForm, setManagerDDForm] = useState([]);
  const [managerFormLabel, setManagerFormLabel] = useState(
    "Select Admission Manager"
  );
  const [managerFormValue, setManagerFormValue] = useState(0);
  const [managerFormError, setManagerFormError] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);
  const branchId = branch.map((brn) => brn.id);

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("BranchDD/index").then((res) => {
      setBranch(res);
    });
  }, []);

  useEffect(() => {
    if (userType === userTypes?.BranchAdmin) {
      get(`ProviderDD/Index/${branchId}`).then((res) => {
        setProvider(res);
      });
    } else {
      get(`ProviderDD/Index/${branchValue}`).then((res) => {
        setProvider(res);
      });
    }
  }, [branchValue, userType]);

  useEffect(() => {
    get(`AdmissionManagerDD/Index/${providerValue}`).then((res) => {
      setManagerDDForm(res);
    });
  }, [providerValue]);

  useEffect(() => {
    get(
      `AdmissionOfficerInformation/GetGeneralInformation/${admissionOfficerId}`
    ).then((res) => {
      console.log("dataaa", res);
      setProviderValue(res?.providerId);
      setProviderLabel(res?.provider?.providerName);
      setBranchValue(res?.branchId);
      setBranchLabel(res?.branch?.name);
      setManagerFormValue(res?.admissionManagerId);

      setManagerFormLabel(
        `${res?.admissionManager.firstName} ${res?.admissionManager.lastName}`
      );
      setTitleValue(res?.nameTittle?.id);
      setFirstName(res?.firstName);
      setLastName(res?.lastName);
      setEmail(res?.email);
    });
  }, [admissionOfficerId]);

  useEffect(() => {
    if (userType === userTypes?.ProviderAdmin.toString()) {
      get(`ProviderHelper/GetProviderId/${userType}/${userId}`).then((res) => {
        console.log("providerId", res);
        setProviderHelperId(res);
      });
      get(`AdmissionManagerDD/Index/${providerHelperId}`).then((res) => {
        console.log(res);
        setManagerDDForm(res);
      });
    }
  }, [userType, userId, providerHelperId]);

  const providerOptions = provider?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const managerMenuForm = managerDDForm.map((managerForm) => ({
    label: managerForm?.name,
    value: managerForm?.id,
  }));

  const selectProvider = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
    setManagerFormLabel("Select Admission Manager");
    setManagerFormValue(0);
  };

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);

    setProviderValue(0);
    setProviderLabel("Select Provider");
  };

  const selectManagerForm = (label, value) => {
    setManagerFormError(false);
    setManagerFormLabel(label);
    setManagerFormValue(value);
  };

  const handleFirstName = (e) => {
    let data = e.target.value.trimStart();
    setFirstName(data);
    if (data === "") {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastName = (e) => {
    let data = e.target.value.trimStart();
    setLastName(data);
    if (data === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (
      userType !== userTypes?.BranchAdmin &&
      userType !== userTypes?.BranchManager &&
      branchValue === 0
    ) {
      setBranchError(true);
      isFormValid = false;
    }

    if (
      userType !== userTypes?.ProviderAdmin.toString() &&
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
    if (emailExistError === false) {
      isFormValid = false;
      setEmailExistError(emailExistError);
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("providerId", providerValue);

    var formIsValid = validateRegisterForm();
    if (formIsValid === true) {
      setButtonStatus(true);
      setProgress(true);
      post(`AdmissionOfficerInformation/GeneralInformation`, subdata).then(
        (res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setProgress(false);
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setButtonStatus(false);
            history.push(`/admissionOfficerPersonalInfo/${admissionOfficerId}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: "true",
            });
          }
        }
      );
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Officer General Information"
        backTo={
          userType === userTypes?.AdmissionOfficer ? null : "Admission Officer"
        }
        path={`/admissionOfficerList`}
      />

      <AdmissionOfficerNavigation
        activetab={activetab}
        admissionOfficerId={admissionOfficerId}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <p className="section-title">General Information</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <input type="hidden" name="id" value={admissionOfficerId} />

                {userType !== userTypes?.AdmissionManager &&
                userType !== userTypes?.ProviderAdmin.toString() &&
                userType !== userTypes?.BranchAdmin &&
                userType !== userTypes?.BranchManager ? (
                  <FormGroup className="has-icon-left position-relative">
                    <span>
                      <span className="text-danger">*</span> Branch{" "}
                    </span>

                    <Select
                      className="form-mt"
                      options={branchOptions}
                      value={{ label: branchLabel, value: branchValue }}
                      onChange={(opt) => selectBranch(opt.label, opt.value)}
                      // name="BranchId"
                      // id="BranchId"
                      // isDisabled={branchId ? true : false}
                    />

                    {branchError && (
                      <span className="text-danger">Branch is required</span>
                    )}
                  </FormGroup>
                ) : null}

                {userType !== userTypes?.AdmissionManager.toString() &&
                userType !== userTypes?.ProviderAdmin.toString() ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Provider
                    </span>

                    <Select
                      options={providerOptions}
                      value={{
                        label: providerLabel,
                        value: providerValue,
                      }}
                      onChange={(opt) => selectProvider(opt.label, opt.value)}
                      name="providerId"
                      id="providerId"
                    />
                    {providerError ? (
                      <span className="text-danger">Provider is required</span>
                    ) : null}
                  </FormGroup>
                ) : (
                  <input
                    type="hidden"
                    name="providerId"
                    value={providerHelperId}
                  />
                )}

                {/* <input type="hidden" name="admissionManagerId" value={0} /> */}

                {userType !== userTypes?.AdmissionManager ? (
                  <FormGroup>
                    <span>
                      Admission Manager <span className="text-danger">*</span>{" "}
                    </span>

                    <Select
                      options={managerMenuForm}
                      value={{
                        label: managerFormLabel,
                        value: managerFormValue,
                      }}
                      onChange={(opt) =>
                        selectManagerForm(opt.label, opt.value)
                      }
                      name="admissionManagerId"
                      id="admissionManagerId"
                    />

                    {managerFormError ? (
                      <span className="text-danger">
                        Admission manager is required
                      </span>
                    ) : null}
                  </FormGroup>
                ) : null}

                <FormGroup>
                  <span>
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
                    <span className="text-danger">*</span>
                    First Name
                  </span>

                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => {
                      handleFirstName(e);
                    }}
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>
                    Last Name
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => {
                      handleLastName(e);
                    }}
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>
                    Email
                  </span>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                  />
                  <span className="text-danger">{emailError}</span>
                  {!emailExistError ? (
                    <span className="text-danger">Email already exists</span>
                  ) : null}
                </FormGroup>
                <FormGroup className="mt-4 text-right">
                  {permissions?.includes(
                    permissionList.Update_AdmissionOfficer
                  ) ? (
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
        </CardBody>
      </Card>
    </div>
  );
};
export default Index;
