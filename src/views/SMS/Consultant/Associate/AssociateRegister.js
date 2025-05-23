import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import icon_info from "../../../../assets/img/icons/icon_info.png";

import { Card, CardBody, Form, FormGroup, Col, Input, Row } from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../constants/userTypeConstant";

const AssociateRegister = () => {
  const { id } = useParams();
  console.log(id, "consultant Id");
  const userType = localStorage.getItem("userType");
  const [consParent, setConsParent] = useState([]);
  const [parentError, setParentError] = useState(false);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);

  // const [consType, setConsType] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

  // const referenceId = localStorage.getItem("referenceId");
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("ConsultantDD/ByUser").then((res) => {
      setConsParent(res);
    });

    // get("ConsultantTypeDD/index").then((res) => {
    //   setConsType(res);
    // });
  }, []);

  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));

  const selectParentCons = (label, value) => {
    setParentError(false);
    setParentLabel(label);
    setParentValue(value);
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

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    

   if (userType === userTypes?.SystemAdmin && parentValue === 0) {
  isFormValid = false;
  setParentError(true);
}

if (userType === userTypes?.SalesManager && parentValue === 0) {
  isFormValid = false;
  setParentError(true);
}

    // if (parentValue === 0) {
    //   isFormValid = false;
    //   setParentError(true);
    // }

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
      post("Associate/Register", subdata).then((res) => {
        setProgress(false);

        setButtonStatus(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          history.push(`/associateAddSuccess`);
        } else {
          return;
        }
      });
    }
  };

  const ToBack = () => {
    id ? history.push(`/associates/${id}`) : history.push(`/associateList`);
  };

  return (
    <div>
      <BreadCrumb
        title="Associate Registration"
        backTo="Associates"
        path={id ? `/associates/${id}` : `/associateList`}
      />

      <Card>
        <CardBody>
          <p className="section-title">Create A Associate</p>

          <div className="mt-1 mb-4 d-flex justify-between cardborder">
            <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
            <div className="pl-3">
              <span>
                Associate Information Below To Create Associate Account.
              </span>
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            {/* {id ? (
              <input
                type="hidden"
                id="consultantId"
                name="consultantId"
                value={id}
              />
            ) : (
              <input
                type="hidden"
                id="consultantId"
                name="consultantId"
                value={userId}
              />
            )} */}
            {userType === userTypes?.SalesManager && (
              <input
                type="hidden"
                id="consultantId"
                name="consultantId"
                value={parentValue}
              />
            )}

            <Row>
              <Col md="6">
                {userType === userTypes?.SalesManager && (
                  <FormGroup className="has-icon-left position-relative">
                    <span>
                      Parent Consultant <span className="text-danger">*</span>{" "}
                    </span>
                    <Select
                      options={consParentMenu}
                      value={{ label: parentLabel, value: parentValue }}
                      onChange={(opt) => selectParentCons(opt.label, opt.value)}
                      // name="parentConsultantId"
                      // id="parentConsultantId"
                    />

                    {/* {parentError && (
                      <span className="text-danger">
                        Parent consultant is required
                      </span>
                    )} */}
                  </FormGroup>
                )}

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Title
                  </span>
                  <div>
                    {title?.map((tt) => (
                      <span key={tt?.id}>
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
                      </span>
                    ))}
                  </div>

                  {titleError && (
                    <span className="text-danger">Title is required</span>
                  )}
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    First Name <span className="text-danger">*</span>{" "}
                  </span>

                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    onChange={(e) => {
                      handleFirstName(e);
                    }}
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    Last Name <span className="text-danger">*</span>{" "}
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      handleLastName(e);
                    }}
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    Email <span className="text-danger">*</span>{" "}
                  </span>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />

                  <span className="text-danger">{emailError}</span>
                </FormGroup>
                <FormGroup>
                  <CancelButton cancel={ToBack} />
                  <SaveButton
                    text="Create Associate"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssociateRegister;
