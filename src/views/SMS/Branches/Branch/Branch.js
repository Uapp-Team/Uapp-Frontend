import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Currency from "../../../../components/Dropdown/Currency";
import BranchNavbar from "./BranchNavbar";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Uget from "../../../../helpers/Uget";

const Branch = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { branchId } = useParams();

  const activetab = "1";
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);

  const [country, setCountry] = useState([]);

  const [countryError, setCountryError] = useState(false);
  // const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtoStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [name, setname] = useState("");
  const [addressLine, setaddressLine] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [telePhoneNumber, settelePhoneNumber] = useState("");
  const [branchCode, setbranchCode] = useState("");
  const [stateName, setstateName] = useState("");

  const [nameError, setnameError] = useState(false);
  const [addressLineError, setaddressLineError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const [branchExistError, setBranchExistError] = useState(true);
  console.log(branchExistError);

  const [phoneNumberError, setphoneNumberError] = useState("");
  const [telePhoneNumberError, settelePhoneNumberError] = useState("");
  const [branchCodeError, setbranchCodeError] = useState("");
  const [stateNameError, setstateNameError] = useState(false);

  const [branchCurrencyId, setBranchCurrencyId] = useState(2);
  const [branchCurrencyIdError, setBranchCurrencyIdError] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`CountryDD/Index`).then((res) => {
      setCountry(res);
    });

    get(`Branch/Get/${branchId}`).then((res) => {
      console.log("branch information", res);
      setname(res?.name);
      setaddressLine(res?.addressLine);
      setemail(res?.email);
      setphoneNumber(res?.phoneNumber);
      settelePhoneNumber(res?.telePhoneNumber);
      setbranchCode(res?.branchCode);
      setstateName(res?.stateName);
      setBranchCurrencyId(res?.currencyId);
      setCountryLabel(res?.country?.name);
      setCountryValue(res?.country.id);
      // setStateLabel(res?.state?.name);
      // setStateValue(res?.state?.id);
    });
  }, [branchId]);

  // const searchStateByCountry = (countryValue) => {
  //   get(`StateDD/Index/${countryValue}`)
  //   .then(res => {

  //     setState(res);
  //   })
  // }

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // const stateName = state?.map((branchState) => ({
  //   label: branchState.name,
  //   value: branchState.id,
  // }));

  // select University Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);

    // setStateLabel("Select State");
  };

  // select University State
  // const selectState = (label, value) => {
  //   setStateError(false);

  //   setStateLabel(label);
  //   setStateValue(value);
  // };

  const handleName = (e) => {
    let data = e.target.value.trimStart();
    setname(data);
    if (data === "") {
      setnameError(true);
    } else {
      setnameError(false);
    }
  };

  const handleaddressLine = (e) => {
    let data = e.target.value.trimStart();
    setaddressLine(data);
    if (data === "") {
      setaddressLineError(true);
    } else {
      setaddressLineError(false);
    }
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

  const handleTelephone = (value) => {
    settelePhoneNumber(value);
    if (value === "") {
      settelePhoneNumberError("TelePhone Number required");
    } else if (value?.length < 9) {
      settelePhoneNumberError("TelePhone number required minimum 9 digit");
    } else {
      settelePhoneNumberError("");
    }
  };

  // const handleBranchCode = (e) => {
  //   let data = e.target.value;
  //   setbranchCode(data);
  //   if (data === "") {
  //     setbranchCodeError("Branch Code required");
  //   } else if (data) {
  //     Uget(`Branch/check-branch-code-duplication?&branchCode=${data}`).then(
  //       (res) => {
  //         if (!res) {
  //           setbranchCodeError("Branch code is already exists");
  //         } else {
  //           setbranchCodeError("");
  //         }
  //       }
  //     );
  //   } else {
  //     setbranchCodeError("");
  //   }
  // };

  const handleBranchCode = (e) => {
    let data = e.target.value;
    setbranchCode(data);
    if (data === "") {
      setbranchCodeError("Branch Code required");
    } else {
      Uget(`Branch/check-branch-code-duplication?&branchCode=${data}`).then(
        (res) => {
          console.log(res, "vai plz");

          setBranchExistError(res?.data);
          if (!branchExistError) {
            setbranchCodeError("Branch code already exists");
          } else {
            setbranchCodeError("");
          }
        }
      );
    }
  };

  const handleState = (e) => {
    let data = e.target.value.trimStart();
    setstateName(data);
    if (data === "") {
      setstateNameError(true);
    } else {
      setstateNameError(false);
    }
  };

  const AuthStr = localStorage.getItem("token");

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!name) {
      isFormValid = false;
      setnameError(true);
    }
    if (!addressLine) {
      isFormValid = false;
      setaddressLineError(true);
    }
    if (!branchCode) {
      isFormValid = false;
      setbranchCodeError("Branch Code required");
    }

    if (branchExistError === true) {
      isFormValid = false;
      setBranchExistError(branchExistError);
    }
    if (!phoneNumber) {
      isFormValid = false;
      setphoneNumberError("Phone Number required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNumberError("Phone number required minimum 9 digit");
    }

    if (!telePhoneNumber) {
      isFormValid = false;
      settelePhoneNumberError("TelePhone Number required");
    }

    if (telePhoneNumber?.length < 9) {
      isFormValid = false;
      settelePhoneNumberError("TelePhone number required minimum 9 digit");
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

    if (countryValue === 0) {
      isFormValid = false;
      setCountryError(true);
    }
    if (!stateName) {
      isFormValid = false;
      setstateNameError(true);
    }

    if (branchCurrencyId === 0) {
      isFormValid = false;
      setBranchCurrencyIdError(true);
    }
    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    subdata.append("phoneNumber", phoneNumber);
    subdata.append("telePhoneNumber", telePhoneNumber);

    //  watch form data values
    // for (var value of subdata) {
    // }

    if (validateRegisterForm()) {
      if (branchId) {
        setButtoStatus(true);
        setProgress(true);
        put("Branch/Update", subdata).then((res) => {
          setButtoStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });

            history.push(`/branchManager/${branchId}`);
          }
        });
      } else {
        setButtoStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}Branch/Create`, subdata, {
          headers: {
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtoStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/branchManager/${res?.data?.result?.id}`);
          }
        });
      }
    }
  };

  const handleEmail = (e) => {
    let data = e.target.value;
    setemail(data);
    if (data === "") {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)) {
      setEmailError("Email is not valid");
    } else {
      get(`EmailCheck/EmailCheck/${data}`).then((res) => {
        setEmailExistError(res);
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  // const handleEmail = (e) => {
  //   let data = e.target.value.trimStart();
  //   setemail(data);

  //   if (data === "") {
  //     setEmailError("Email is required");
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)) {
  //     setEmailError("Email is not valid");
  //   } else {
  //     get(`EmailCheck/EmailCheck/${data}`).then((res) => {
  //       if (!res) {
  //         setEmailError("Email already exists");
  //       } else {
  //         setEmailError("");
  //       }
  //     });
  //   }
  // };

  const cancelForm = () => {
    history.push("/branchList");
  };

  return (
    <div>
      <BranchNavbar
        title="Course Test Score"
        activeTab={activetab}
        branchId={branchId}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <p className="section-title">Branch Information</p>
              <Form className="mt-4" onSubmit={handleSubmit}>
                {branchId ? (
                  <input type="hidden" value={branchId} name="id" id="id" />
                ) : null}

                <Row>
                  <Col lg="6" md="8">
                    <FormGroup>
                      <span>
                        Branch Name <span className="text-danger">*</span>{" "}
                      </span>

                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Branch Name"
                        value={name}
                        onChange={(e) => {
                          handleName(e);
                        }}
                      />
                      {nameError && (
                        <span className="text-danger">
                          Branch Name required
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <span>
                        Address Line <span className="text-danger">*</span>{" "}
                      </span>

                      <Input
                        type="text"
                        name="addressLine"
                        id="addressLine"
                        placeholder="Enter Address Line"
                        value={addressLine}
                        onChange={(e) => {
                          handleaddressLine(e);
                        }}
                      />
                      {addressLineError && (
                        <span className="text-danger">
                          Address Line required
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <span>
                        Email <span className="text-danger">*</span>{" "}
                      </span>

                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => {
                          handleEmail(e);
                        }}
                      />

                      <span className="text-danger">{emailError}</span>
                    </FormGroup>

                    <FormGroup>
                      <span>Phone Number</span>
                      <span className="text-danger">*</span>

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
                    <FormGroup>
                      <span>Telephone Number</span>
                      <span className="text-danger">*</span>

                      <PhoneInput
                        type="string"
                        name="telePhoneNumber"
                        id="telePhoneNumber"
                        country={"gb"}
                        enableLongNumbers={true}
                        onChange={handleTelephone}
                        value={telePhoneNumber ? telePhoneNumber : ""}
                        inputProps={{
                          required: true,
                        }}
                      />

                      <span className="text-danger">
                        {telePhoneNumberError}
                      </span>
                    </FormGroup>

                    <FormGroup>
                      <span>
                        Branch Code <span className="text-danger">*</span>{" "}
                      </span>

                      <Input
                        type="text"
                        name="branchCode"
                        id="branchCode"
                        placeholder="Enter Branch Code"
                        value={branchCode}
                        onChange={(e) => {
                          handleBranchCode(e);
                        }}
                      />
                      <span className="text-danger">{branchCodeError}</span>
                    </FormGroup>

                    <FormGroup>
                      <span>
                        Country <span className="text-danger">*</span>{" "}
                      </span>

                      <Select
                        options={countryName}
                        value={{ label: countryLabel, value: countryValue }}
                        onChange={(opt) => selectCountry(opt.label, opt.value)}
                        name="countryId"
                        id="countryId"
                        required
                      />
                      {countryError ? (
                        <span className="text-danger">Country is required</span>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <span>State/County</span>
                      <span className="text-danger">*</span>{" "}
                      <Input
                        type="text"
                        name="stateName"
                        id="stateName"
                        placeholder="Enter State/County"
                        value={stateName}
                        onChange={(e) => {
                          handleState(e);
                        }}
                      />
                      {stateNameError && (
                        <span className="text-danger">
                          State / Country is required
                        </span>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <span>
                        Branch Currency <span className="text-danger">*</span>
                      </span>
                      <input
                        type="hidden"
                        value={branchCurrencyId}
                        name="currencyId"
                      />
                      <Currency
                        currencyId={branchCurrencyId}
                        setCurrencyId={setBranchCurrencyId}
                        name="currencyId"
                        error={branchCurrencyIdError}
                        setError={setBranchCurrencyIdError}
                        isDisabled={true}
                      />
                    </FormGroup>

                    <FormGroup className="text-right">
                      <CancelButton cancel={cancelForm} />

                      {permissions?.includes(permissionList.Edit_Branch) ? (
                        <SaveButton
                          text="submit"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default Branch;
