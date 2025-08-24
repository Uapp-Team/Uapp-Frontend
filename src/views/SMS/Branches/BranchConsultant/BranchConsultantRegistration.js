import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Row,
  Form,
  FormGroup,
  Col,
  Input,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import SaveButton from "../../../../components/buttons/SaveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BranchNavbar from "../Branch/BranchNavbar";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../Components/ButtonForFunction";
import AssignBranchConsultantModal from "./AssignBranchConsultantModal";

const BranchConsultantRegistration = () => {
  const [titleValue, setTitleValue] = useState(0);
  const [nameTitle, setNameTitle] = useState([]);
  // const [consParent, setConsParent] = useState([]);
  // const [consType, setConsType] = useState([]);
  // const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  // const [parentValue, setParentValue] = useState(0);
  // const [typeLabel, setTypeLabel] = useState("Select Consultant Type");
  // const [typeValue, setTypeValue] = useState(0);

  // const [consultantError, setConsultantError] = useState(false);
  // const [parentError, setParentError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const { branchId } = useParams();
  const activetab = "3";
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [branchConsultant, setBranchConsultant] = useState({});
  const [consultantRegisterId, setConsultantRegisterId] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setNameTitle(res);
    });
  }, []);

  useEffect(() => {
    get(`BranchConsultant/DefaultConsultant/${branchId}`).then((res) => {
      setBranchConsultant(res);
      setemail(res?.email);
      setlastName(res?.lastName);
      setfirstName(res?.firstName);
      setphoneNumber(res?.phoneNumber);
      setTitleValue(res?.nameTittleId == null ? 0 : res?.nameTittleId);
      setConsultantRegisterId(res?.id);
      res?.isAcceptedHome && setHomeAccept(res?.isAcceptedHome);
      res?.isAcceptedEU_UK && setUkAccept(res?.isAcceptedEU_UK);
      res?.isAcceptedInternational &&
        setIntAccept(res?.isAcceptedInternational);
      console.log(res, "branch consultant");
    });
  }, [success, branchId]);

  

  const handleFirstName = (e) => {
    let data = e.target.value.trimStart();
    setfirstName(data);
    if (data === "") {
      setfirstNameError(true);
    } else {
      setfirstNameError(false);
    }
  };

  const handleLastName = (e) => {
    let data = e.target.value.trimStart();
    setlastName(data);
    if (data === "") {
      setlastNameError(true);
    } else {
      setlastNameError(false);
    }
  };

  const handleEmail = (e) => {
    let data = e.target.value.trimStart();
    setemail(data);
    if (data === "") {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)) {
      setEmailError("Email is not valid");
    } else {
      get(`EmailCheck/EmailCheck/${data}`).then((res) => {
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  const handlePassword = (e) => {
    let data = e.target.value;
    setpassword(data);
    if (data === "") {
      setpasswordError("Password is required");
    } else if (data.length < 6) {
      setpasswordError("Password length can not be less than six digits");
    } else {
      setpasswordError("");
    }
  };
 const closeModal = () => {
    setModalOpen(false);
  };
  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNumberError("Phone Number required");
    } else if (value?.length < 9) {
      setphoneNumberError("Phone number required minimum 9 digit");
    } else {
      setphoneNumberError("");
    }
  };

 

  const validateRegisterForm = () => {
    let isFormValid = true;

   

    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }

    if (!firstName) {
      isFormValid = false;
      setfirstNameError(true);
    }

    if (!lastName) {
      isFormValid = false;
      setlastNameError(true);
    }

    if (homeAccept === false && ukAccept === false && intAccept === false) {
      isFormValid = false;
      setAcceptError(true);
    }

    if (!email) {
      isFormValid = false;
      setEmailError("Email is required");
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }

    if (!phoneNumber) {
      isFormValid = false;
      setphoneNumberError("Phone Number required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNumberError("Phone number required minimum 9 digit");
    }

    if (consultantRegisterId === 0 || consultantRegisterId === undefined) {
      if (!password) {
        isFormValid = false;
        setpasswordError("Password is required");
      } else if (password.length < 6) {
        setpasswordError("Password length can not be less than six digits");
      }
    }

    return isFormValid;
  };

  console.log(homeAccept, ukAccept, intAccept);

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    subdata.append("phoneNumber", phoneNumber);
    subdata.append("isAcceptedHome", homeAccept);
    subdata.append("isAcceptedEU_UK", ukAccept);
    subdata.append("isAcceptedInternational", intAccept);
    if (validateRegisterForm()) {
      console.log("first");
      if (branchConsultant?.branchId) {
        setButtonStatus(true);
        setProgress(true);
        put("BranchConsultant/UpdateDefaultConsultant", subdata).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
          }
          setSuccess(!success);
          setButtonStatus(false);
          setProgress(false);
          history.push(`/branchProfile/${branchId}`);
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("BranchConsultant/RegisterToBranch", subdata).then((res) => {
          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess === true ? "success" : "error",
            autoDismiss: true,
          });

          if (res.status === 200 && res.data.isSuccess === true) {
            history.push(`/branchProfile/${branchId}`);
          } else {
            return;
          }
          setButtonStatus(false);
          setProgress(false);
        });
      }
    }
  };
  return (
    <div>
      <BranchNavbar activeTab={activetab} branchId={branchId} />
            <Col lg="5" md="5" sm="12" xs="12">
              <div className="d-sm-flex">
                <ButtonForFunction
                  func={() => setModalOpen(true)}
                  className={"btn btn-uapp-add mr-2 "}
                  icon={<i className="fas fa-plus"></i>}
                  name={"Assign Consultant"}
                />
              </div>
            </Col>
          <br></br>
      <Card>
        <CardBody>
          
          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              
              <p className="section-title">Consultant Information</p>
              <Form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="hidden"
                  name="branchId"
                  id="branchId"
                  value={branchId}
                />

                {consultantRegisterId !== 0 ? (
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={consultantRegisterId}
                  />
                ) : (
                  <input type="hidden" name="id" id="id" value={0} />
                )}
                <Row>
                  <Col lg="6" md="8">
                    <FormGroup>
                      <span>
                        Title <span className="text-danger">*</span>{" "}
                      </span>

                      <div>
                        {nameTitle?.map((tt) => (
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
                      <span>First Name</span>

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
                      {firstNameError && (
                        <span className="text-danger">First Name required</span>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <span>Last Name</span>

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
                      {lastNameError && (
                        <span className="text-danger">Last Name required</span>
                      )}
                    </FormGroup>
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        <span className="text-danger">*</span>Recruitment Type
                      </span>

                      <Row>
                        <Col xs="2" sm="12" md="3" className="text-center mt-2">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              checked={homeAccept}
                              onChange={(e) => {
                                setHomeAccept(!homeAccept);
                              }}
                            />
                            <span className="mr-2">Home/UK </span>
                          </FormGroup>
                        </Col>

                        <Col xs="2" sm="12" md="3" className="text-center mt-2">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              checked={ukAccept}
                              onChange={(e) => {
                                setUkAccept(!ukAccept);
                              }}
                            />
                            <span className="mr-2">EU/EEU </span>
                          </FormGroup>
                        </Col>

                        <Col xs="2" sm="12" md="3" className="text-center mt-2">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              checked={intAccept}
                              onChange={(e) => {
                                setIntAccept(!intAccept);
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
                    {consultantRegisterId === 0 ||
                    consultantRegisterId === undefined ? (
                      <FormGroup>
                        <span>
                          Email <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email Address"
                          value={email}
                          onChange={(e) => {
                            handleEmail(e);
                          }}
                        />

                        <span className="text-danger">{emailError}</span>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <span>
                          Email <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email Address"
                          value={email}
                        />
                      </FormGroup>
                    )}

                    {consultantRegisterId === 0 ||
                    consultantRegisterId === undefined ? (
                      <FormGroup>
                        <span>
                          Password <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => {
                            handlePassword(e);
                          }}
                          autoComplete="false"
                        />

                        <span className="text-danger">{passwordError}</span>
                      </FormGroup>
                    ) : null}

                    <FormGroup>
                      <span>Phone Number</span>

                      <PhoneInput
                        type="string"
                        name="phoneNumber"
                        id="phoneNumber"
                        country={"gb"}
                        enableLongNumbers={true}
                        onChange={handlePhoneNumber}
                        value={phoneNumber ? phoneNumber : ""}
                        inputProps={{
                          required: true,
                        }}
                      />

                      <span className="text-danger">{phoneNumberError}</span>
                    </FormGroup>

                    {permissions?.includes(permissionList.Edit_Branch) ? (
                      <FormGroup className="text-right">
                        <SaveButton
                          text="Submit"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      </FormGroup>
                    ) : null}
                  </Col>
                </Row>
                <div>
                  <Modal
                    isOpen={modalOpen}
                    toggle={closeModal}
                    className="uapp-modal2"
                    size="lg"
                  >
                    <ModalHeader>
                      <span></span>
                    </ModalHeader>
                    <ModalBody>
                      <AssignBranchConsultantModal
                        branchId={branchId}
                        setModalOpen={setModalOpen}
                        success={success}
                        setSuccess={setSuccess}
                      />
                    </ModalBody>
                  </Modal>
                </div>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default BranchConsultantRegistration;
