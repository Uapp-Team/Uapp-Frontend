import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Form,
  FormGroup,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import get from "../../../../helpers/get";
import Select from "react-select";
import { connect } from "react-redux";
import Axios from "axios";
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../components/buttons/CancelButton";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import SaveButton from "../../../../components/buttons/SaveButton";
import Currency from "../../../../components/Dropdown/Currency";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddCampus = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { uniId } = useParams();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  const [universityStates, setUniversityStates] = useState([]);
  const [uniStateLabel, setUniStateLabel] = useState("Select Campus State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Campus Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select Campus City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [campusName, setCampusName] = useState("");
  const [campusNameError, setCampusNameError] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLineError, setAddressLineError] = useState("");

  const [totalStudent, settotalStudent] = useState(0);
  const [intStudent, setintStudent] = useState(0);
  const [tutionFee, settutionFee] = useState(0);
  const [livingCost, setlivingCost] = useState(0);
  const [applicationFee, setapplicationFee] = useState(0);
  const [estimatedTotal, setestimatedTotal] = useState(0);
  const [newId, setNewId] = useState();

  const [avarageApplicationFeeCurrencyId, setAvarageApplicationFeeCurrencyId] =
    useState(1);
  const [avarageLivingCostCurrencyId, setAvarageLivingCostCurrencyId] =
    useState(1);
  const [avarageTutionFeeCurrencyId, setAvarageTutionFeeCurrencyId] =
    useState(1);
  const [estimatedTotalCostCurrencyId, setEstimatedTotalCostCurrencyId] =
    useState(1);

  useEffect(() => {
    get(`UniversityCountryDD/Index`).then((res) => {
      setUniverSityCountries(res);
    });
  }, []);

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setAvarageApplicationFeeCurrencyId(value);
    setAvarageLivingCostCurrencyId(value);
    setAvarageTutionFeeCurrencyId(value);
    setEstimatedTotalCostCurrencyId(value);
    get(`UniversityStateDD/Index/${value}`).then((res) => {
      setUniversityStates(res);
    });
    setUniStateLabel("Select Campus State");
    setUniStateValue(0);
    get(`UniversityCityDD/Index/${value}`).then((res) => {
      setCity(res);
    });
    setCityLabel("Select Campus City");
    setCityValue(0);
  };

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const selectCampusCity = (label, value) => {
    setCityError(false);
    setCityLabel(label);
    setCityValue(value);
  };

  const AuthStr = localStorage.getItem("token");

  const handleCampusName = (e) => {
    setCampusName(e.target.value);
    if (e.target.value === "") {
      setCampusNameError("Campus name is required");
    } else {
      setCampusNameError("");
    }
  };
  const handleAddressLine = (e) => {
    setAddressLine(e.target.value);
    if (e.target.value === "") {
      setAddressLineError(" Address line is required");
    } else {
      setAddressLineError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;

    if (!campusName) {
      isFormValid = false;
      setCampusNameError("Campus name is required");
    }
    if (uniCountryValue === 0) {
      isFormValid = false;
      setUniCountryError(true);
    }
    if (unistateValue === 0) {
      isFormValid = false;
      setUniStateError(true);
    }
    if (cityValue === 0) {
      isFormValid = false;
      setCityError(true);
    }
    if (!addressLine) {
      isFormValid = false;
      setAddressLineError(" Address line is required");
    }
    return isFormValid;
  };

  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));
  const cityOptions = city?.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  //   on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    if (validateRegisterForm()) {
      // if (selectedId === 0) {
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}UniversityCampus/Create`, subdata, {
        headers: {
          "Content-Type": "application/json",
          authorization: AuthStr,
        },
      }).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setNewId(res?.data?.result?.id);
          setIsModalOpen(true);
          setCampusName("");
          setAddressLine("");
          setUniCountryLabel("Select Campus Country");
          setUniCountryValue(0);
          setUniStateLabel("Select Campus State");
          setUniStateValue(0);
          setCityLabel("Select Campus City");
          setCityValue(0);
          settotalStudent(0);
          setintStudent(0);
          settutionFee(0);
          setlivingCost(0);
          setapplicationFee(0);
          setestimatedTotal(0);
          setSuccess(!success);
        }
      });
    }
  };

  const cancel = () => {
    history.push(`/campusList/${uniId}`);
  };
  const goToProfile = () => {
    history.push(`/CampusAssignSubject/${uniId}/${newId}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Add Campus"
        backTo="University Campus List"
        path={`/campusList/${uniId}`}
      />

      <Card>
        <CardBody>
          <p className="section-title pl-4">Add Campus</p>

          <Form onSubmit={handleSubmit}>
            <Input
              type="hidden"
              id="universityId"
              name="universityId"
              value={uniId}
            />

            <Row>
              <Col lg="5" md="6">
                <FormGroup>
                  <Col>
                    <span>
                      <span className="text-danger">*</span> Campus name{" "}
                    </span>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      value={campusName}
                      placeholder="Write The Campus Name"
                      onChange={(e) => {
                        handleCampusName(e);
                      }}
                    />
                    <span className="text-danger">{campusNameError}</span>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <span>
                      <span className="text-danger">*</span> Campus country{" "}
                    </span>
                  </Col>
                  <Col>
                    <Select
                      options={universityCountryName}
                      value={{
                        label: uniCountryLabel,
                        value: uniCountryValue,
                      }}
                      required
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="CampusCountryId"
                      id="CampusCountryId"
                    />

                    {uniCountryError && (
                      <span className="text-danger">
                        University country is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <span>
                      <span className="text-danger">*</span> Campus state{" "}
                    </span>
                  </Col>
                  <Col>
                    <Select
                      options={universityStateName}
                      value={{
                        label: uniStateLabel,
                        value: unistateValue,
                      }}
                      required
                      onChange={(opt) => selectUniState(opt.label, opt.value)}
                      name="CampusStateId"
                      id="CampusStateId"
                    />

                    {uniStateError && (
                      <span className="text-danger">
                        University state is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <span>
                      <span className="text-danger">*</span> Campus city{" "}
                    </span>
                  </Col>
                  <Col>
                    <Select
                      options={cityOptions}
                      value={{
                        label: cityLabel,
                        value: cityValue,
                      }}
                      onChange={(opt) => selectCampusCity(opt.label, opt.value)}
                      name="campusCityId"
                      id="campusCityId"
                    />

                    {cityError && (
                      <span className="text-danger">
                        University city is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <span>
                      <span className="text-danger">*</span> Address line{" "}
                    </span>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="AddressLine"
                      id="addressLine"
                      value={addressLine}
                      placeholder="Write Address Line"
                      onChange={(e) => {
                        handleAddressLine(e);
                      }}
                    />
                    <span className="text-danger">{addressLineError}</span>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col>
                    <span>University on map</span>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>http://</InputGroupText>
                      <Input
                        type="url"
                        rows="4"
                        name="EmbededMap"
                        id="EmbededMap"
                        // defaultValue={universityCampusObject?.embededMap}
                        placeholder="example.com"
                      />
                    </InputGroup>
                    <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                      Please type the "src" link only from the embed map.
                    </span>
                  </Col>
                </FormGroup>
              </Col>

              <Col lg="4" md="5" className="pl-sm-30px mr-sm-30px">
                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    Total student:{" "}
                  </span>
                  <span className="col-md-6">
                    <Input
                      type="number"
                      name="TotalStudent"
                      id="TotalStudent"
                      min="0"
                      value={totalStudent}
                      onChange={(e) => {
                        settotalStudent(e.target.value);
                      }}
                    />
                  </span>
                </div>

                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    International student:{" "}
                  </span>
                  <span className="col-md-6">
                    <Input
                      type="number"
                      min="0"
                      name="InternationalStudent"
                      id="InternationalStudent"
                      value={intStudent}
                      onChange={(e) => {
                        setintStudent(e.target.value);
                      }}
                    />
                  </span>
                </div>

                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    Avg. tuition fee:{" "}
                  </span>
                  <InputGroup className="col-md-6 d-flex flex-nowrap">
                    <Currency
                      currencyId={avarageTutionFeeCurrencyId}
                      setCurrencyId={setAvarageTutionFeeCurrencyId}
                      name="avarageTutionFeeCurrency"
                      error={() => {}}
                      setError={() => {}}
                    />
                    <Input
                      type="number"
                      min="0"
                      name="AvarageTutionFee"
                      id="AvarageTutionFee"
                      value={tutionFee}
                      onChange={(e) => {
                        settutionFee(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>

                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    Avg. living cost:{" "}
                  </span>
                  <InputGroup className="col-md-6 d-flex flex-nowrap">
                    <Currency
                      currencyId={avarageLivingCostCurrencyId}
                      setCurrencyId={setAvarageLivingCostCurrencyId}
                      name="avarageLivingCostCurrency"
                      error={() => {}}
                      setError={() => {}}
                    />
                    <Input
                      type="number"
                      min="0"
                      name="AvarageLivingCost"
                      id="AvarageLivingCost"
                      value={livingCost}
                      onChange={(e) => {
                        setlivingCost(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>

                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    Avg. application fee:{" "}
                  </span>
                  <InputGroup className="col-md-6 d-flex flex-nowrap">
                    <Currency
                      currencyId={avarageApplicationFeeCurrencyId}
                      setCurrencyId={setAvarageApplicationFeeCurrencyId}
                      name="avarageApplicationFeeCurrency"
                      error={() => {}}
                      setError={() => {}}
                    />

                    <Input
                      type="number"
                      min="0"
                      name="AvarageApplicationFee"
                      id="AvarageApplicationFee"
                      value={applicationFee}
                      onChange={(e) => {
                        setapplicationFee(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>

                <div className="row d-flex align-items-center mb-1">
                  <span className="col-md-6 text-md-right">
                    Estimated total cost:{" "}
                  </span>
                  <InputGroup className="col-md-6 d-flex flex-nowrap">
                    <Currency
                      currencyId={estimatedTotalCostCurrencyId}
                      setCurrencyId={setEstimatedTotalCostCurrencyId}
                      name="estimatedTotalCostCurrency"
                      error={() => {}}
                      setError={() => {}}
                    />

                    <Input
                      type="number"
                      min="0"
                      name="EstimatedTotalCost"
                      id="EstimatedTotalCost"
                      value={estimatedTotal}
                      onChange={(e) => {
                        setestimatedTotal(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg="9" md="11">
                <FormGroup className="d-flex justify-content-between">
                  <CancelButton cancel={cancel} />
                  {permissions?.includes(permissionList?.Add_University) && (
                    <SaveButton
                      text="Add Campus"
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
        text="Campus added successfully"
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

// export default CampusList;

const mapStateToProps = (state) => ({
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(AddCampus);
