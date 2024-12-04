import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";
import { Card, CardBody, Form, FormGroup, Col, Input, Row } from "reactstrap";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AddAdmissionOfficerReg = () => {
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
  const { providerId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admissionOfficerId, setAdmissionOfficerId] = useState();

  const { commonId } = useParams();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");
  const [providerHelperId, setProviderHelperId] = useState(undefined);
  const [managerDDForm, setManagerDDForm] = useState([]);
  const [managerFormLabel, setManagerFormLabel] = useState(
    "Select Admission Manager"
  );
  const [managerFormValue, setManagerFormValue] = useState(0);
  const [managerFormError, setManagerFormError] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const branchId = branch.map((brn) => brn.id);

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });

    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });
  }, []);

  useEffect(() => {
    get(`ProviderDD/Index/${branchValue}`).then((res) => {
      setProvider(res);
    });
  }, [branchValue]);

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
    if (commonId !== undefined) {
      get(`AdmissionManagerDD/Index/${commonId}`).then((res) => {
        console.log(res);
        setManagerDDForm(res);
      });
    }

    if (
      userType === userTypes?.ProviderAdmin.toString() ||
      userType === userTypes?.AdmissionManager.toString()
    ) {
      get(`ProviderHelper/GetProviderId/${userType}/${userId}`).then((res) => {
        setProviderHelperId(res);
      });

      get(`AdmissionManagerDD/Index/${providerHelperId}`).then((res) => {
        console.log(res);
        setManagerDDForm(res);
      });
    }
  }, [commonId, userType, userId, providerHelperId]);

  console.log("commonId", commonId);
  console.log("userTypeId", userType);
  console.log("userId", userId);
  console.log("providerHelperId", providerHelperId);

  const providerOptions = provider?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const managerMenuForm = managerDDForm.map((managerForm) => ({
    label: managerForm?.name,
    value: managerForm?.id,
  }));

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
    setProviderLabel("Select Provider");
    setProviderValue(0);
  };

  const selectProvider = (label, value) => {
    setProviderError(false);
    setProviderLabel(label);
    setProviderValue(value);
    setManagerFormLabel("Select Admission Manager");
    setManagerFormValue(0);
    get(`AdmissionManagerDD/Index/${value}`).then((res) => {
      setManagerDDForm(res);
    });
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
    if (
      userType !== userTypes?.ProviderAdmin &&
      userType !== userTypes?.AdmissionManager &&
      userType !== userTypes?.BranchAdmin &&
      userType !== userTypes?.BranchManager &&
      branchValue === 0
    ) {
      setBranchError(true);
      isFormValid = false;
    }

    if (
      commonId === undefined &&
      userType !== userTypes?.ProviderAdmin.toString() &&
      userType !== userTypes?.AdmissionManager.toString() &&
      providerValue === 0
    ) {
      isFormValid = false;
      setProviderError(true);
    }
    if (
      managerFormValue === 0 &&
      userType !== userTypes?.AdmissionManager.toString()
    ) {
      isFormValid = false;
      setManagerFormError(true);
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
    // subdata.append("admissionManager", admissionManager);
    for (var value of subdata) {
      console.log(value);
    }
    var formIsValid = validateRegisterForm();

    if (providerId === undefined) {
      if (formIsValid === true) {
        setButtonStatus(true);
        setProgress(true);
        post(`AdmissionOfficerInformation/GeneralInformation`, subdata).then(
          (res) => {
            setProgress(false);

            setButtonStatus(false);

            if (res.status === 200 && res.data.isSuccess === true) {
              setIsModalOpen(true);
              setAdmissionOfficerId(res?.data?.result?.id);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setTitleValue(0);
              setFirstName("");
              setLastName("");
              setEmail("");
            } else {
              return;
            }
          }
        );
      }
    } else {
      if (formIsValid === true) {
        setButtonStatus(true);
        setProgress(true);
        post(`AdmissionOfficerInformation/GeneralInformation`, subdata).then(
          (res) => {
            setProgress(false);

            addToast(res?.data?.message, {
              appearance: res?.data?.isSuccess === true ? "success" : "error",
              autoDismiss: true,
            });
            setButtonStatus(false);

            if (res.status === 200 && res.data.isSuccess === true) {
              setIsModalOpen(true);
              setAdmissionOfficerId(res?.data?.result?.id);
              setProviderLabel("Select Provider");
              setProviderValue(0);
              setTitleValue(0);
              setFirstName("");
              setLastName("");
              setEmail("");
            } else {
              return;
            }
          }
        );
      }
    }
  };

  const goBack = () => {
    history.push("/admissionOfficerList");
  };
  const goToProfile = () => {
    history.push(`/admissionOfficerPersonalInfo/${admissionOfficerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Officer General Information"
        backTo="Admission Officer"
        path="/admissionOfficerList"
      />

      <Card>
        <CardBody>
          <p className="section-title">Create A New Admission Officer</p>
          <div
            className="mt-1 mb-4 d-flex justify-between"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <img
              className="pt-2"
              style={{ height: "100%" }}
              src={icon_info}
              alt=""
            />{" "}
            <div className="pl-3">
              <span>
                An Admission Officer will be working as associate of admission
                manager
              </span>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                {/* {providerId !== undefined ? (
                  <input
                    type="hidden"
                    name="providerId"
                    id="providerId"
                    value={providerId}
                  />
                ) : null}

                {providerId === undefined ? (
                  <FormGroup>
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

                    {providerError && (
                      <span className="text-danger">Provider is required</span>
                    )}
                  </FormGroup>
                ) : null} */}

                {userType !== userTypes?.AdmissionManager.toString() &&
                userType !== userTypes?.ProviderAdmin.toString() &&
                userType !== userTypes?.BranchAdmin &&
                userType !== userTypes?.BranchManager ? (
                  <FormGroup className="has-icon-left position-relative">
                    <span>
                      <span className="text-danger">*</span> Branch{" "}
                      <span className="text-danger"></span>
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

                {commonId === undefined &&
                userType !== userTypes?.AdmissionManager.toString() &&
                userType !== userTypes?.ProviderAdmin.toString() ? (
                  <FormGroup>
                    <span>
                      Provider <span className="text-danger">*</span>{" "}
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
                ) : userType === userTypes?.ProviderAdmin.toString() ||
                  userType === userTypes?.AdmissionManager.toString() ? (
                  <input
                    type="hidden"
                    name="providerId"
                    value={providerHelperId}
                  />
                ) : (
                  // <input type="hidden" name="providerId" value={commonId} />
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

                {userType === userTypes?.AdmissionManager.toString() ? (
                  <input
                    type="hidden"
                    name="admissionManagerId"
                    value={userId}
                  />
                ) : (
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
                          name="NameTittleId"
                          id="NameTittleId"
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
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>
                <FormGroup className="text-right">
                  <CancelButton cancel={goBack} />
                  {permissions?.includes(
                    permissionList.Add_AdmissionOfficer
                  ) ? (
                    <SaveButton
                      text="Create Admission Officer"
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

      <ConfirmModal
        text="Admission Officer added successfully"
        text2="Admission Officer account has been created and an email is sent to the Admission Officer email address with login credentials."
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Add Another"
        yesText="Complete Profile"
        cancel={() => setIsModalOpen(false)}
        confirm={goToProfile}
        permissionName={permissionList.Update_AdmissionOfficer}
      />
    </div>
  );
};

export default AddAdmissionOfficerReg;
