import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import { Card, CardBody, Form, FormGroup, Row, Col, Input } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CancelButton from "../../../../../components/buttons/CancelButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userTypes } from "../../../../../constants/userTypeConstant";

const Registration = () => {
  const { affiliateId, id } = useParams();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("referenceId");
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const [consParent, setConsParent] = useState([]);
  // const [consType, setConsType] = useState([]);
  const [parentLabel, setParentLabel] = useState("Select Parent Affiliate");
  const [parentValue, setParentValue] = useState(affiliateId ? affiliateId : 0);
  // const [branchLabel, setBranchLabel] = useState("Select Branch");
  // const [branchValue, setBranchValue] = useState(0);
  // const [branchError, setBranchError] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [consultantError, setConsultantError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [parentError, setParentError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState();
  const [emailExistError, setEmailExistError] = useState(true);
  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);

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
      setConsultant(res);
      res?.length === 1 && setConsultantValue(res[0].id);
    });
  }, [branchValue]);

  useEffect(() => {
    get(`AffiliateDD/Index/${consultantValue}`).then((res) => {
      setConsParent(res);

      if (affiliateId) {
        const result = res?.find((ans) => ans?.id.toString() === affiliateId);
        setParentLabel(result?.name);
      }
    });
  }, [affiliateId, consultantValue]);

  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));

  const selectParentCons = (label, value) => {
    // setParentError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
    setConsultantValue(0);
    setconsultantLabel("Select Consultant");
    setParentValue(0);
    setParentLabel("Select Parent Affiliate");
  };

  const consultantName = consultant?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantError(false);
    setconsultantLabel(label);
    setConsultantValue(value);
    setParentValue(0);
    setParentLabel("Select Parent Affiliate");
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

  const handlePhoneNumber = (value) => {
    setphoneNumber(value);
    if (value === "") {
      setphoneNUmberError("Phone number is required");
    } else if (value?.length < 9) {
      setphoneNUmberError("Phone number required minimum 9 digit");
    } else {
      setphoneNUmberError("");
    }
    // setphoneNumber(value);
    // setValid(validatePhoneNumber(value));
  };

  const ValidateForm = () => {
    var isValid = true;

    // if (typeValue === 0) {
    //   isValid = false;
    //   setConsultantError(true);
    // }
    // if (homeAccept === false && ukAccept === false && intAccept === false) {
    //   isValid = false;
    //   setAcceptError(true);
    // }
    // if (parentValue === 0) {
    //   isValid = false;
    //   setParentError(true);
    // }

    if (branchValue === 0) {
      setBranchError(true);
      isValid = false;
    }

    if (!affiliateId && consultantValue === 0) {
      setConsultantError(true);
      isValid = false;
    }

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

    if (!phoneNumber) {
      isValid = false;
      setphoneNUmberError("Phone number is required");
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("phoneNumber", phoneNumber);
    for (var value of subdata) {
      console.log(value);
    }

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      post("AffiliateRegister", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          if (userType === userTypes?.Consultant) {
            history.push(`/affiliateAddSuccess`);
          } else {
            setIsModalOpen(true);
            setRegisterId(res?.data?.result);
            !affiliateId && setParentValue(0);
            !affiliateId && setParentLabel("Select Parent Consultant");
            setTitleValue(0);
            setFirstName("");
            setLastName("");
            setEmail("");
          }
        } else {
          return;
        }
      });
    }
  };

  const ToConsultantList = () => {
    history.push("/affiliate-List");
  };

  const goToProfile = () => {
    affiliateId && userType === userTypes?.SystemAdmin
      ? history.push(`/affiliate-team-List/${affiliateId}`)
      : affiliateId
      ? history.push(`/affiliate-team-List`)
      : history.push(`/affiliatePersonalInfo/${registerId}`);
  };

  // const goToProfile = () => {
  //   affiliateId
  //     ? history.push(`/affiliate-team-List`)
  //     : history.push(`/affiliatePersonalInfo/${registerId}`);
  // };

  return (
    <div>
      {userType === userTypes?.Consultant ? (
        <BreadCrumb
          title="Add Affiliate"
          backTo="My Affiliate List"
          path={"/ConsultantByAffiliateList"}
        />
      ) : (
        <BreadCrumb
          title="Add Affiliate"
          backTo={affiliateId ? "My Team List" : "Affiliate List"}
          path={affiliateId ? `/affiliate-team-List` : "/affiliate-List"}
        />
      )}

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <p className="section-title"> Affiliate Details </p>

            <div className="mt-1 mb-4 d-flex justify-between cardborder">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <div className="pl-3">
                <span>
                  Affiliate Information Below To Create Affiliate Account.
                </span>
              </div>
            </div>
            <Row>
              <Col lg="6" md="6">
                {/* <FormGroup>
                  <span>Branch</span>
                  <DefaultDropdown
                    label={branchLabel}
                    setLabel={setBranchLabel}
                    value={branchValue}
                    setValue={setBranchValue}
                    url="BranchDD/Index"
                    name="branchId"
                    error={branchError}
                    setError={setBranchError}
                    errorText="Branch is Required"
                    action={() => {}}
                  />
                </FormGroup> */}
                {!affiliateId && (
                  <>
                    {userType === userTypes?.SystemAdmin.toString() ? (
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
                          <span className="text-danger">
                            Branch is required
                          </span>
                        )}
                      </FormGroup>
                    ) : null}
                  </>
                )}

                {!affiliateId && (
                  <>
                    {" "}
                    {userType === userTypes?.Consultant.toString() ? (
                      <>
                        {userId && (
                          <>
                            <input
                              type="hidden"
                              id="consultantId"
                              name="consultantId"
                              value={userId}
                            />
                            <p className="fw-600">
                              {current_user?.displayName}
                            </p>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {id ? (
                          <input
                            type="hidden"
                            id="consultantId"
                            name="consultantId"
                            value={id}
                          />
                        ) : (
                          <>
                            {userType !== userTypes?.Affiliate && (
                              <FormGroup>
                                <span>
                                  {" "}
                                  <span className="text-danger">*</span>
                                  Consultant
                                </span>

                                <Select
                                  options={consultantName}
                                  value={{
                                    label: consultantLabel,
                                    value: consultantValue,
                                  }}
                                  onChange={(opt) =>
                                    selectConsultant(opt.label, opt.value)
                                  }
                                  name="consultantId"
                                  id="consultantId"
                                />
                                {consultantError && (
                                  <span className="text-danger">
                                    Consultant is required
                                  </span>
                                )}
                              </FormGroup>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {affiliateId ? (
                  <>
                    {" "}
                    <input
                      type="hidden"
                      id="parentAffiliateId"
                      name="parentAffiliateId"
                      value={affiliateId}
                    />
                  </>
                ) : (
                  <>
                    {userType === userTypes?.SystemAdmin.toString() ||
                    userType === userTypes?.Admin.toString() ||
                    userType === userTypes?.Affiliate ||
                    userType === userTypes?.Consultant ? (
                      <FormGroup>
                        <span>Parent Affiliate</span>

                        <Select
                          className="form-mt"
                          options={consParentMenu}
                          value={{ label: parentLabel, value: parentValue }}
                          onChange={(opt) =>
                            selectParentCons(opt.label, opt.value)
                          }
                          name="parentAffiliateId"
                          id="parentAffiliateId"
                          isDisabled={affiliateId ? true : false}
                        />
                      </FormGroup>
                    ) : null}
                  </>
                )}

                <FormGroup>
                  <span>
                    {" "}
                    <span className="text-danger">*</span> Title
                  </span>
                  <div>
                    {title?.map((tt) => (
                      <>
                        <input
                          key={tt?.id}
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

                <FormGroup>
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

                <FormGroup>
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

                <FormGroup className="phone-input-group">
                  <span>
                    <span className="text-danger">*</span>
                    Phone Number
                  </span>
                  <PhoneInput
                    className="w-100"
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
                  <span className="text-danger">{phoneNUmberError}</span>{" "}
                </FormGroup>
                <FormGroup className="text-right">
                  <CancelButton cancel={ToConsultantList} />

                  {/* {permissions?.includes(permissionList?.Add_Consultant) && ( */}
                  <SaveButton
                    text="Create Affiliate"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                  {/* )} */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <ConfirmModal
        text="Affiliate added successfully"
        text2="Affiliate account has been created and an email is sent to the affiliate email address with login credentials."
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Add Another"
        yesText={affiliateId ? "Return" : "Complete Profile"}
        cancel={() => setIsModalOpen(false)}
        confirm={goToProfile}
      />
    </div>
  );
};

export default Registration;
