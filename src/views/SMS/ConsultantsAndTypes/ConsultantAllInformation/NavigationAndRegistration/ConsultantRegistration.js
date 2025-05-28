import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import {
  BranchAdmin,
  BranchManager,
} from "../../../../../components/core/User";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";

const ConsultantRegistration = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { branchId } = useParams();
  const [consParent, setConsParent] = useState([]);
  const [consSalesTeamLeader, setConsSalesTeamLeader] = useState([]);
  const [consType, setConsType] = useState([]);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);
  const [SalesTeamLeaderLabel, setSalesTeamLeaderLabel] = useState(
    "Select Sales Team Leader"
  );
  const [SalesTeamLeaderValue, setSalesTeamLeaderValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState("Select Consultant Type");
  const [typeValue, setTypeValue] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [homeAccept, setHomeAccept] = useState(true);
  const [ukAccept, setUkAccept] = useState(true);
  const [intAccept, setIntAccept] = useState(true);
  const [acceptError, setAcceptError] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const [consultantError, setConsultantError] = useState(false);
  const [parentError, setParentError] = useState(false);
  const [SalesTeamLeaderError, setSalesTeamLeaderError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState();
  const [emailExistError, setEmailExistError] = useState(true);
  const userTypeId = localStorage.getItem("userType");

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
    get(`ConsultantDD/ByBranch/${branchValue}`).then((res) => {
      setConsParent(res);
    });

    get(`SalesTeamLeaderDD/Index/${branchValue}`).then((res) => {
      setConsSalesTeamLeader(res);
    });

    get("ConsultantTypeDD/index").then((res) => {
      setConsType(res);
    });
  }, [branchValue]);

  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));

  const consSalesTeamLeaderMenu = consSalesTeamLeader?.map(
    (consSalesTeamLeaderOptions) => ({
      label: consSalesTeamLeaderOptions?.name,
      value: consSalesTeamLeaderOptions?.id,
    })
  );

  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const selectParentCons = (label, value) => {
    setParentError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const selectSalesTeamLeaderCons = (label, value) => {
    setSalesTeamLeaderError(false);
    setSalesTeamLeaderLabel(label);
    setSalesTeamLeaderValue(value);
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

  const handleEmailError = (e) => {
    let data = e.target.value.trimStart();
    setEmail(data);
    if (data === "") {
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

  const ValidateForm = () => {
    var isValid = true;

    if (typeValue === 0) {
      isValid = false;
      setConsultantError(true);
    }
    if (homeAccept === false && ukAccept === false && intAccept === false) {
      isValid = false;
      setAcceptError(true);
    }
    if (BranchAdmin() || BranchManager()) {
      setParentError(false);
    } else {
      if (parentValue === 0) {
        isValid = false;
        setParentError(true);
      } else {
        setParentError(false);
      }
    }
    // if (BranchAdmin() || BranchManager()) {
    //   setSalesTeamLeaderError(false);
    // } else {
    //   if (SalesTeamLeaderValue === 0) {
    //     isValid = false;
    //     setSalesTeamLeaderError(true);
    //   } else {
    //     setSalesTeamLeaderError(false);
    //   }
    // }
    if (titleValue === 0) {
      isValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isValid = false;
      setFirstNameError("First Name is required");
    }
    if (!lastName) {
      isValid = false;
      setLastNameError("Last Name is required");
    }
    if (!email) {
      isValid = false;
      setEmailError("Email is required");
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isValid = false;
      setEmailError("Email is not Valid");
    }

    if (emailExistError === false) {
      isValid = false;
      setEmailExistError(emailExistError);
    }
    return isValid;
  };

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
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      post("Consultant/GeneralInformation", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          setIsModalOpen(true);
          setRegisterId(res?.data?.result?.id);
          setTypeValue(0);
          setTypeLabel("Select Consultant Type");
          setHomeAccept(false);
          setUkAccept(false);
          setIntAccept(false);
          setParentValue(0);
          setParentLabel("Select Parent Consultant");
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

  const ToConsultantList = () => {
    history.push("/consultantList");
  };

  const goToProfile = () => {
    history.push(`/consultantInformation/${registerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Add Consultant"
        backTo="Consultant List"
        path="/consultantList"
      />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <p className="section-title"> Consultant Details </p>

            <div className="mt-1 mb-4 d-flex justify-between cardborder">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <div className="pl-3">
                <span>
                  Provide information below to create a consultant account
                </span>
              </div>
            </div>
            <Row>
              <Col lg="6" md="6">
                {userTypeId === userTypes?.SystemAdmin ? (
                  <>
                    {" "}
                    {branch.length > 1 ? (
                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          Branch <span className="text-danger"></span>
                        </span>

                        <Select
                          className="form-mt"
                          options={branchOptions}
                          value={{ label: branchLabel, value: branchValue }}
                          onChange={(opt) => selectBranch(opt.label, opt.value)}
                          name="BranchId"
                          id="BranchId"
                          isDisabled={branchId ? true : false}
                        />

                        {branchError && (
                          <span className="text-danger">
                            Branch is required
                          </span>
                        )}
                      </FormGroup>
                    ) : (
                      <input
                        type="hidden"
                        name="BranchId"
                        id="BranchId"
                        value={branchValue}
                      />
                    )}
                  </>
                ) : null}

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>Consultant Type
                  </span>

                  <Select
                    className="form-mt"
                    options={consTypeMenu}
                    value={{ label: typeLabel, value: typeValue }}
                    onChange={(opt) => selectConsType(opt.label, opt.value)}
                    name="consultantTypeId"
                    id="consultantTypeId"
                  />

                  {consultantError && (
                    <span className="text-danger">
                      Consultant type is required.
                    </span>
                  )}
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>Recruitment Type
                  </span>

                  <Row>
                    <Col xs="2" sm="12" md="3" className="mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={homeAccept === true}
                          onChange={(e) => {
                            setHomeAccept(false);
                            setHomeAccept(!homeAccept);
                            setAcceptError(false);
                          }}
                        />
                        <span className="mr-2">Home/UK </span>
                      </FormGroup>
                    </Col>

                    <Col xs="2" sm="12" md="3" className="mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={ukAccept === true}
                          onChange={(e) => {
                            setUkAccept(false);
                            setUkAccept(!ukAccept);
                            setAcceptError(false);
                          }}
                        />
                        <span className="mr-2">EU/EEU </span>
                      </FormGroup>
                    </Col>

                    <Col xs="2" sm="12" md="3" className="mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={intAccept === true}
                          onChange={(e) => {
                            setIntAccept(false);
                            setIntAccept(!intAccept);
                            setAcceptError(false);
                          }}
                        />
                        <span className="mr-2">International </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  {acceptError ? (
                    <span className="text-danger">
                      Recruitment type is required.
                    </span>
                  ) : null}
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    {!BranchAdmin() && !BranchManager() && (
                      <span className="text-danger">*</span>
                    )}
                    Parent Consultant
                  </span>

                  <Select
                    className="form-mt"
                    options={consParentMenu}
                    value={{ label: parentLabel, value: parentValue }}
                    onChange={(opt) => selectParentCons(opt.label, opt.value)}
                    name="parentConsultantId"
                    id="parentConsultantId"
                  />

                  {parentError && (
                    <span className="text-danger">
                      Parent consultant is required.
                    </span>
                  )}
                </FormGroup>
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    {/* {!BranchAdmin() && !BranchManager() && (
                      <span className="text-danger">*</span>
                    )} */}
                    Sales Team Leader
                  </span>

                  <Select
                    className="form-mt"
                    options={consSalesTeamLeaderMenu}
                    value={{
                      label: SalesTeamLeaderLabel,
                      value: SalesTeamLeaderValue,
                    }}
                    onChange={(opt) =>
                      selectSalesTeamLeaderCons(opt.label, opt.value)
                    }
                    name="salesTeamLeaderId"
                    id="salesTeamLeaderId"
                  />

                  {/* {SalesTeamLeaderError && (
                    <span className="text-danger">
                      Sales Team Leader is required.
                    </span>
                  )} */}
                </FormGroup>

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
                  <CancelButton cancel={ToConsultantList} />

                  {permissions?.includes(permissionList?.Add_Consultant) && (
                    <SaveButton
                      text="Create Consultant"
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
        text="Consultant added successfully"
        text2="Consultant account has been created and an email is sent to the consultant email address with login credentials."
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

export default ConsultantRegistration;
