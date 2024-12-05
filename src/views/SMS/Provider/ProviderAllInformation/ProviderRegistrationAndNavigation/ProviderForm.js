import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import { Card, CardBody, FormGroup, Input, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import Select from "react-select";

const ProviderForm = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [title, setTitle] = useState([]);
  const [name, setName] = useState("");
  const [providerNameError, setProviderNameError] = useState("");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providerId, setProviderId] = useState();
  const [emailExistError, setEmailExistError] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);

  const backtoList = () => {
    history.push(`/providerList`);
  };

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
      res?.length === 1 && setBranchValue(res[0].id);
    });

    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });
  }, []);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const handleProviderNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setProviderNameError("Company or institution name");
    } else {
      setProviderNameError("");
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last Name is required");
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
    var isFormValid = true;

    if (branchValue === 0) {
      setBranchError(true);
      isFormValid = false;
    }

    if (!name) {
      setProviderNameError("Company or institution name");
      isFormValid = false;
    }
    if (!firstName) {
      setFirstNameError("First Name is required");
      isFormValid = true;
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
      isFormValid = true;
    }
    if (titleValue === 0) {
      setTitleError(true);
      isFormValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      isFormValid = false;
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("BranchId", branchValue);
    formData.append("ProviderName", name);
    formData.append("NameTitleId", titleValue);
    formData.append("AdminEmail", email);
    formData.append("AdminFirstName", firstName);
    formData.append("AdminLastName", lastName);
    var formIsValid = validateRegisterForm(formData);

    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post("ProviderRegistration/Create", formData).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        if (action?.status === 200 && action?.data?.isSuccess === true) {
          setIsModalOpen(true);
          setProviderId(action?.data?.result);
          setTitleValue(0);
          setFirstName("");
          setLastName("");
          setEmail("");
          setTitleValue(0);
          setName("");
        } else {
          return;
        }
      });
    }
  };

  const goToProfile = () => {
    history.push(`/updateProvider/${providerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Add New Provider"
        backTo="Provider List"
        path="/providerList"
      />

      <Card>
        <CardBody>
          <p className="section-title">Provider Informations</p>
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
                Provider will have its own universities, admission managers,
                admission officers and will be able to manage applications on
                their universities.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Row>
              <Col md="4">
                {userType === userTypes?.SystemAdmin ? (
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
                      name="BranchId"
                      id="BranchId"
                      // isDisabled={branchId ? true : false}
                    />

                    {branchError && (
                      <span className="text-danger">Branch is required</span>
                    )}
                  </FormGroup>
                ) : null}
                <FormGroup>
                  <span>
                    {" "}
                    <span className="text-danger">*</span>
                    Company or Institution Name{" "}
                  </span>

                  <Input
                    className="inside-placeholder"
                    type="text"
                    placeholder="Enter the Name as Registered"
                    onChange={(e) => handleProviderNameChange(e)}
                    id="providerName"
                    name="providerName"
                    value={name}
                  />
                  <span className="text-danger">{providerNameError}</span>
                </FormGroup>

                <div className="mb-3">
                  <span style={{ fontWeight: "500", color: "#252525" }}>
                    Enter the details of the designated person
                  </span>
                </div>

                <FormGroup>
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

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>First Name
                  </span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleFirstNameChange(e);
                    }}
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    placeholder="Enter First Name"
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span> Last Name
                  </span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleLastNameChange(e);
                    }}
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter Last Name"
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>Email
                  </span>

                  <Input
                    className="form-mt"
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
                  <CancelButton cancel={backtoList} />
                  {permissions?.includes(permissionList.Add_Provider) ? (
                    <SaveButton
                      text="Create Provider"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>

      <ConfirmModal
        text="Provider added successfully"
        text2="Provider account has been created and an email is sent to the provider email address with login credentials."
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

export default ProviderForm;
