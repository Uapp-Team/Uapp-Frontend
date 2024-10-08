import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import ContactFormComponent from "../../STUDENT/StudentsAllInformation/StudentsContactInformation/Component/ContactFormComponent";
import ContactFormForPermanent from "../../STUDENT/StudentsAllInformation/StudentsContactInformation/Component/ContactFormForPermanent";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const StudentContactForm = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  const history = useHistory();
  const [activetab, setActivetab] = useState("3");
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);

  const [country2, setCountry2] = useState([]);
  const [countryLabel2, setCountryLabel2] = useState("Country");
  const [countryValue2, setCountryValue2] = useState(0);

  const [bothAdressType, setBothAddressType] = useState(null);
  const [mailingAddressId, setMailingAddressId] = useState(1);
  const [permanentAddressId, setPermanentAddressId] = useState(2);

  const [addressType, setAddressType] = useState([]);

  const [addressTypeLabel, setAddressTypeLabel] = useState("Address Type");
  const [addressTypeValue, setAddressTypeValue] = useState(0);
  const [oneData, setOneData] = useState({});

  const [countryError, setCountryError] = useState(false);
  const [countryError2, setCountryError2] = useState(false);

  const [addressError, setAddressError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [houseNo, setHouseNo] = useState("");
  const [houseNo2, setHouseNo2] = useState("");

  const [addressLine, setAddressLine] = useState("");
  const [addressLine2, setAddressLine2] = useState("");

  const [cityN, setCityN] = useState("");
  const [cityN2, setCityN2] = useState("");

  const [state, setState] = useState("");
  const [state2, setState2] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [zipCode2, setZipCode2] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
      setCountry2(res);
    });

    // get("AddressTypeDD/Index").then((res) => {
    //   setAddressType(res);
    // });
  }, [success]);

  const backToStudentProfile = () => {
    history.push(`/studentProfile/${id}`);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const countryName2 = country2?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry2 = (label, value) => {
    setCountryError2(false);
    setCountryLabel2(label);
    setCountryValue2(value);
  };

  // const addressTypeName = addressType.map((add) => ({
  //   label: add?.name,
  //   value: add?.id,
  // }));

  // const selectAddressType = (label, value) => {
  //   setAddressError(false);
  //   setAddressTypeLabel(label);
  //   setAddressTypeValue(value);
  // };

  const handleBothAddressType = (e) => {
    setBothAddressType(e.target.value);
    console.log("value", e.target.value);
    if (e.target.value == "true") {
      setCountryLabel2(countryLabel);
      setCountryValue2(countryValue);

      setHouseNo2(houseNo);
      setAddressLine2(addressLine);
      setCityN2(cityN);
      setState2(state);
      setZipCode2(zipCode);
    }

    if (e.target.value == "false") {
      setCountryLabel2("Country");
      setCountryValue2(0);
      setHouseNo2("");
      setAddressLine2("");
      setCityN2("");
      setState2("");
      setZipCode2("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    const subData1 = new FormData(event.target);

    // subData.append("useForBoth", bothAdressType);
    subData.append("houseNo", houseNo);
    subData.append("addressLine", addressLine);
    subData.append("city", cityN);
    subData.append("stateName", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("studentId", id);
    subData.append("addressTypeId", mailingAddressId);

    // subData1.append("useForBoth", bothAdressType);
    subData1.append("houseNo", houseNo2);
    subData1.append("addressLine", addressLine2);
    subData1.append("city", cityN2);
    subData1.append("stateName", state2);
    subData1.append("zipCode", zipCode2);
    subData1.append("countryId", countryValue2);
    subData1.append("studentId", id);
    subData1.append("addressTypeId", permanentAddressId);

    // subData1.append("useForBoth", bothAdressType);

    // for (var value of subData) {
    //   console.log("Sub", value);
    // }

    // for (var valu of subData1) {
    //   console.log("Sub1", valu)
    // }

    if (countryValue == 0) {
      setCountryError(true);
    } else if (countryValue2 == 0) {
      setCountryError2(true);
    } else {
      setButtonStatus(true);
      setProgress(true);
      post("StudentAddress/Create", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          // addToast(res?.data?.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          history.push(`/studentApplication/${id}`);
        }
      });

      post("StudentAddress/Create", subData1).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/studentApplication/${id}`);
        }
      });
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Contact Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> 28% Completed
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          {/* <Form onSubmit={handleSubmit} className="mt-5">
            <input type="hidden" name="studentId" id="studentId" value={id} />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Address Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={addressTypeName}
                  value={{
                    label: addressTypeLabel,
                    value: addressTypeValue,
                  }}
                  onChange={(opt) => selectAddressType(opt.label, opt.value)}
                  name="addressTypeId"
                  id="addressTypeId"
                  required
                />

                

                {addressError && (
                  <span className="text-danger">Address type is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Use as both permanent and living address</span>
              </Col>
              <Col md="6">
                <Input
                  className="ml-1"
                  type="checkbox"
                  // name='check'
                  // id='check'
                  onChange={handleBothAddressType}
                  checked={bothAdressType}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Phone Number <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="cellPhoneNumber"
                  id="cellPhoneNumber"
                  placeholder="Enter Phone Number"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  House No. <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="houseNo"
                  id="houseNo"
                  placeholder="Enter house no."
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Address Line <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="addressLine"
                  id="addressLine"
                  placeholder="Enter Address Line"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  City <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter City"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  State
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Enter State"
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Zip Code <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  placeholder="Enter Zip Code"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Country <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={countryName}
                  value={{ label: countryLabel, value: countryValue }}
                  onChange={(opt) => selectCountry(opt.label, opt.value)}
                  name="countryId"
                  id="countryId"
                  required
                />

                {countryError && (
                  <span className="text-danger">Country is required</span>
                )}
              </Col>
            </FormGroup>

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                <ButtonForFunction
                  type={"submit"}
                  name={progress ? <ButtonLoader /> : "Save & Next"}
                  className={"mr-1 mt-3 badge-primary"}
                  disable={buttonStatus}
                />
              </div>
            </div>
          </Form> */}

          <Form onSubmit={handleSubmit}>
            <ContactFormComponent
              addressName={"Mailing Address"}
              studentId={id}
              countryLabel={countryLabel}
              countryValue={countryValue}
              success={success}
              bothAdressType={bothAdressType}
              handleBothAddressType={handleBothAddressType}
              // addressTypeLabel={addressTypeLabel}
              // addressTypeValue={addressTypeValue}
              countryError={countryError}
              // addressError={addressError}
              buttonStatus={buttonStatus}
              progress={progress}
              countryName={countryName}
              selectCountry={selectCountry}
              mailingAddressId={mailingAddressId}
              houseNo={houseNo}
              setHouseNo={setHouseNo}
              setAddressLine={setAddressLine}
              addressLine={addressLine}
              cityN={cityN}
              setCityN={setCityN}
              state={state}
              setState={setState}
              zipCode={zipCode}
              setZipCode={setZipCode}
              // addressTypeName={addressTypeName}
              // selectAddressType={selectAddressType}
            />

            {/* {bothAdressType !== null ? ( */}
            <ContactFormForPermanent
              addressName={"Permanent Address"}
              studentId={id}
              countryLabel2={countryLabel2}
              countryValue2={countryValue2}
              success={success}
              // bothAdressType={bothAdressType}
              // handleBothAddressType={handleBothAddressType}
              // addressTypeLabel={addressTypeLabel}
              // addressTypeValue={addressTypeValue}
              countryError2={countryError2}
              // addressError={addressError}
              // buttonStatus={buttonStatus}
              // progress={progress}
              countryName2={countryName2}
              selectCountry2={selectCountry2}
              permanentAddressId={permanentAddressId}
              houseNo2={houseNo2}
              setHouseNo2={setHouseNo2}
              setAddressLine2={setAddressLine2}
              addressLine2={addressLine2}
              cityN2={cityN2}
              setCityN2={setCityN2}
              state2={state2}
              setState2={setState2}
              zipCode2={zipCode2}
              setZipCode2={setZipCode2}
              // addressTypeName={addressTypeName}
              // selectAddressType={selectAddressType}
            />
            {/* ) : null} */}

            <div className="row">
              <div className="col-md-8 d-flex justify-content-end">
                {permissions?.includes(permissionList.Edit_Student) ? (
                  <ButtonForFunction
                    type={"submit"}
                    name={progress ? <ButtonLoader /> : "Save"}
                    className={"mr-1 mt-3 badge-primary"}
                    // disable={buttonStatus}
                  />
                ) : null}
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentContactForm;
