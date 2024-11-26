import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";

import { Card, CardBody, Form, FormGroup, Row, Col, Input } from "reactstrap";
import icon_info from "../../../assets/img/icons/icon_info.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { userTypes } from "../../../constants/userTypeConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import Uget from "../../../helpers/Uget";
import Filter from "../../../components/Dropdown/Filter";

const AddMenuForm = () => {
  const { affiliateId, id } = useParams();
  const userType = localStorage.getItem("userType");
  const [parentList, setParentList] = useState([]);
  const [parentLabel, setParentLabel] = useState("Select Parent");
  const [parentValue, setParentValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState("Select Type");
  const [typeValue, setTypeValue] = useState(0);
  console.log(typeValue);

  // const [consultantError, setConsultantError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [parentError, setParentError] = useState(false);

  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [firstNameError, setFirstNameError] = useState("");
  const [title, setTitle] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState();
  const [emailExistError, setEmailExistError] = useState(true);
  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");

  useEffect(() => {
    get("MenuItem/GetMenuItems").then((res) => {
      setParentList(res);
    });
  }, []);

  const parentName = parentList?.map((cons) => ({
    label: cons?.title,
    value: cons?.id,
  }));

  const selectParent = (label, value) => {
    // setConsultantError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const handleTitleChange = (e) => {
    let data = e.target.value.trimStart();
    setTitle(data);
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

    if (!title) {
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

            setLastName("");
            setEmail("");
          }
        } else {
          return;
        }
      });
    }
  };

  const ToMenuList = () => {
    history.push("/menu-list");
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
      <BreadCrumb
        title="Add Affiliate"
        backTo={"Menu List"}
        path={"/menu-list"}
      />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <p className="section-title"> Menu Details </p>

            <div className="mt-1 mb-4 d-flex justify-between cardborder">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <div className="pl-3">
                <span>Menu Information Below To Create A Menu.</span>
              </div>
            </div>
            <Row>
              <Col lg="6" md="6">
                <input
                  type="hidden"
                  name="id"
                  id="id"
                  // value={installment?.applicationTransactionId}
                />

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>Title
                  </span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={title}
                    placeholder="Enter Title"
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>NavLink</span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleLastNameChange(e);
                    }}
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter NavLink"
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>Type</span>

                  <Filter
                    data={[
                      {
                        id: 1,
                        name: "Items",
                      },
                      {
                        id: 2,
                        name: "Collapse",
                      },
                    ]}
                    label={typeLabel}
                    setLabel={setTypeLabel}
                    value={typeValue}
                    setValue={setTypeValue}
                    action={() => {}}
                  />
                </FormGroup>

                {typeValue === 2 ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Parent Name
                    </span>

                    <Select
                      options={parentName}
                      value={{
                        label: parentLabel,
                        value: parentValue,
                      }}
                      onChange={(opt) => selectParent(opt.label, opt.value)}
                      name="consultantId"
                      id="consultantId"
                    />
                  </FormGroup>
                ) : null}

                <FormGroup>
                  <span>Icon</span>

                  <Input
                    className="form-mt"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Icon"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>

                <FormGroup>
                  <span>Display Order</span>

                  <Input
                    className="form-mt"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Display Order"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>
                <FormGroup>
                  <span>Children</span>

                  <Input
                    className="form-mt"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Children"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>

                <FormGroup className="text-right">
                  <CancelButton cancel={ToMenuList} />

                  {/* {permissions?.includes(permissionList?.Add_Consultant) && ( */}
                  <SaveButton
                    text="Create Menu"
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

export default AddMenuForm;
