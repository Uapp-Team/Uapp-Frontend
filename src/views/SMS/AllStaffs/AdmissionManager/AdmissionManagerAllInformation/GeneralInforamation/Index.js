import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { Card, CardBody, Form, Row, Col, FormGroup, Input } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import AdmissionManagerNav from "../NavigationAndRegister/AdmissionManagerNav";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Index = () => {
  const userType = localStorage.getItem("userType");

  const activetab = "1";
  const { admissionManagerId } = useParams();
  const [provider, setProvider] = useState([]);
  const [providerValue, setProviderValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Select Provider");
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
  const [multiProvider, setMultiProvider] = useState([]);
  const userTypeId = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");
  const [providerHelperId, setProviderHelperId] = useState(undefined);
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
      res?.length === 1 && setBranchValue(res[0].id);
    });
  }, []);

  useEffect(() => {
    get(`ProviderDD/Index/${branchValue}`).then((res) => {
      setProvider(res);
    });
  }, [branchValue]);

  useEffect(() => {
    get(`AdmissionManager/GetGeneralInformation/${admissionManagerId}`).then(
      (res) => {
        setProviderValue(res?.providerId);
        setProviderLabel(res?.provider?.providerName);
        setBranchValue(res?.branchId);
        setBranchLabel(res?.branch?.name);
        setMultiProvider(res?.providerList);
        setTitleValue(res?.nameTittle?.id);
        setFirstName(res?.firstName);
        setLastName(res?.lastName);
        setEmail(res?.email);
      }
    );
  }, [admissionManagerId]);

  useEffect(() => {
    // if (userTypeId === userTypes?.ProviderAdmin.toString()) {
    get(`ProviderHelper/GetProviderId/${userTypeId}/${userId}`).then((res) => {
      console.log("providerId", res);
      setProviderHelperId(res);
    });
    // }
  }, [userTypeId, userId, providerHelperId]);

  const providerOptions = provider?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectProvider = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
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
    setMultiProvider([]);
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
      post("AdmissionManager/GeneralInformation", subdata).then((res) => {
        setProgress(false);

        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setButtonStatus(false);

        history.push(
          `/admissionManagerPersonalInformation/${admissionManagerId}`
        );
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Manager General Information"
        backTo={
          userType === userTypes?.AdmissionManager ? null : "Admission Manager"
        }
        path={`/admissionManagerList`}
      />

      <AdmissionManagerNav
        activetab={activetab}
        admissionManagerId={admissionManagerId}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <p className="section-title">General Information</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <input type="hidden" name="id" value={admissionManagerId} />

                {/* <FormGroup>
                  <span>
                    <span className="text-danger">*</span>
                    Provider
                    <span className="text-danger"></span>
                  </span>

                  <Select
                    options={branchOptions}
                    value={{ label: providerLabel, value: providerValue }}
                    onChange={(opt) => selectBranch(opt.label, opt.value)}
                    name="providerId"
                    id="providerId"
                  />

                  {branchError && (
                    <span className="text-danger">Provider is required</span>
                  )}
                </FormGroup> */}
                {userType === userTypes?.SystemAdmin ? (
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

                {userType !== userTypes?.ProviderAdmin.toString() ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span>
                      Provider
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

                    <Select
                      isMulti
                      name="providerIds"
                      id="providerIds"
                      onChange={(e) => {
                        setMultiProvider(e);
                      }}
                      options={providerOptions}
                      value={multiProvider}
                      className="mt-1"
                    />
                  </FormGroup>
                ) : (
                  <input
                    type="hidden"
                    name="providerId"
                    value={providerHelperId}
                  />
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
                    permissionList.Update_AdmissionManager
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
