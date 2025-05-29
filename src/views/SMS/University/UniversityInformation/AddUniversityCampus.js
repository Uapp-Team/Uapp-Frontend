import Axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router";
import Select from "react-select";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  TabContent,
  TabPane,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import ButtonLoader from "../../Components/ButtonLoader";
import UniversityNavbar from "../Components/UniversityNavbar";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import Currency from "../../../../components/Dropdown/Currency";
import CurrencyValue from "../../../../components/Dropdown/CurrencyValue";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddUniversityCampus = (props) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [universityCampusList, setuniversityCampusList] = useState([]);
  const [universityCampusObject, setuniversityCampusObject] = useState({});
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  const [universityStates, setUniversityStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uniStateLabel, setUniStateLabel] = useState("Select Campus State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Campus Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);
  const activetab = "2";
  const { univerId } = useParams();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [selectedId, setSelectedId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [UniversityCampusName, setUniversityCampusName] = useState("");
  const [UniversityCampusId, setUniversityCampusId] = useState(0);
  const [city, setCity] = useState([]);
  const [cityLabel, setCityLabel] = useState("Select Campus City");
  const [cityValue, setCityValue] = useState(0);
  const [cityError, setCityError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const forms = true;
  const [campusName, setCampusName] = useState("");
  // const [totalStudent, setTotalStudent] = useState(0);
  const [campusNameError, setCampusNameError] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressLineError, setAddressLineError] = useState("");
  const history = useHistory();
  const [currencyDD, setCurrencyDD] = useState([]);
  const [totalStudent, settotalStudent] = useState(0);
  const [intStudent, setintStudent] = useState(0);
  const [tutionFee, settutionFee] = useState(0);
  const [livingCost, setlivingCost] = useState(0);
  const [applicationFee, setapplicationFee] = useState(0);
  const [estimatedTotal, setestimatedTotal] = useState(0);
  // const [forms, setForms] = useState(true);

  const [avarageApplicationFeeCurrencyId, setAvarageApplicationFeeCurrencyId] =
    useState(1);
  const [avarageLivingCostCurrencyId, setAvarageLivingCostCurrencyId] =
    useState(1);
  const [avarageTutionFeeCurrencyId, setAvarageTutionFeeCurrencyId] =
    useState(1);
  const [estimatedTotalCostCurrencyId, setEstimatedTotalCostCurrencyId] =
    useState(1);

  let uniId;
  if (location.id) {
    uniId = location.id;
  } else {
    uniId = "";
  }

  useEffect(() => {
    get(`CurrencyDD/Index`).then((res) => {
      setCurrencyDD(res);
    });

    get(`UniversityCountryDD/Index`).then((res) => {
      setUniverSityCountries(res);
    });
  }, []);

   useEffect(() => {
    get(`UniversityStateDD/Index/${uniCountryValue}`).then((res) => {
      setUniversityStates(res);
    });
  }, [uniCountryValue])


  useEffect(() => {
      if (unistateValue !==0) {
        get(`UniversityCityDD/Index/${uniCountryValue}/${unistateValue}`).then((res) => {
      setCity(res);
    });
    }
  }, [uniCountryValue,unistateValue])

  useEffect(() => {
    get(`UniversityCampus/GetByUniversity/${univerId}`).then((action) => {
      setLoading(false);
      setuniversityCampusList(action);

      console.log("unicamp Data", action);
      if (action.length > 0) {
        setShowForm(true);
      } else {
        setShowForm(false);
        setSelectedId(0);
      }
    });
  }, [success, uniId, univerId]);

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setAvarageApplicationFeeCurrencyId(value);
    setAvarageLivingCostCurrencyId(value);
    setAvarageTutionFeeCurrencyId(value);
    setEstimatedTotalCostCurrencyId(value);
  
    setUniStateLabel("Select Campus State");
    setUniStateValue(0);
   setCity([]);
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

  const goPrevious = () => {
    history.push(`/addUniversity/${univerId}`);
  };
  const goForward = () => {
    history.push(`/addUniversityFinancial/${univerId}`);
  };

  const handleCampusName = (e) => {
    let data = e.target.value.trimStart();
    setCampusName(data);
    if (data === "") {
      setCampusNameError("Campus name is required");
    } else {
      setCampusNameError("");
    }
  };
  const handleAddressLine = (e) => {
    let data = e.target.value.trimStart();
    setAddressLine(data);
    if (data === "") {
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

  //   on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    if (validateRegisterForm()) {
      if (selectedId === 0) {
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
            setCampusName("");
            setUniCountryLabel("Select Campus Country");
            setUniCountryValue(0);
            setUniStateLabel("Select Campus State");
            setUniStateValue(0);
            setCityLabel("Select Campus City");
            setCityValue(0);
            setAddressLine("");
            settotalStudent(0);
            setintStudent(0);
            settutionFee(0);
            setlivingCost(0);
            setapplicationFee(0);
            setestimatedTotal(0);
            setAvarageApplicationFeeCurrencyId(1);
            setAvarageLivingCostCurrencyId(1);
            setAvarageTutionFeeCurrencyId(1);
            setEstimatedTotalCostCurrencyId(1);
            setSuccess(!success);
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put(`UniversityCampus/Update`, subdata).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setShowForm(true);
            setSelectedId(0);
            setCampusName("");
            setuniversityCampusObject({});
            setUniCountryLabel("Select Campus Country");
            setUniCountryValue(0);
            setUniStateLabel("Select Campus State");
            setUniStateValue(0);
            setCityLabel("Select Campus City");
            setCityValue(0);
            setAddressLine("");
            settotalStudent(0);
            setintStudent(0);
            settutionFee(0);
            setlivingCost(0);
            setapplicationFee(0);
            setestimatedTotal(0);
            setAvarageApplicationFeeCurrencyId(1);
            setAvarageLivingCostCurrencyId(1);
            setAvarageTutionFeeCurrencyId(1);
            setEstimatedTotalCostCurrencyId(1);
            setSuccess(!success);
          }
        });
      }
    }
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

  const toggleDanger = (p) => {
    setUniversityCampusId(p?.id);
    setUniversityCampusName(p?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    setButtonStatus(true);
    setProgress1(true);
    remove(`UniversityCampus/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setUniversityCampusId(0);
      setUniversityCampusName("");
    });
  };

  const handleUpdate = (id) => {
    setShowForm(false);

    get(`UniversityCampus/Get/${id}`).then((action) => {
      setuniversityCampusObject(action);
      setCampusName(action?.name);
      setAddressLine(action?.addressLine);
      selectUniCountry(
        action?.universityCountry?.name,
        action?.universityCountry?.id
      );
      setUniStateLabel(action?.universityState?.name);
      setUniStateValue(action?.campusStateId);
      setSelectedId(action?.id);
      setCityLabel(action?.universityCity?.name);
      setCityValue(action?.universityCity?.id);
      settotalStudent(action?.totalStudent);
      setintStudent(action?.internationalStudent);
      settutionFee(action?.avarageTutionFee);
      setlivingCost(action?.avarageLivingCost);
      setapplicationFee(action?.avarageApplicationFee);
      setestimatedTotal(action?.estimatedTotalCost);
      setAvarageApplicationFeeCurrencyId(action?.avarageApplicationFeeCurrency);
      setAvarageLivingCostCurrencyId(action?.avarageLivingCostCurrency);
      setAvarageTutionFeeCurrencyId(action?.avarageTutionFeeCurrency);
      setEstimatedTotalCostCurrencyId(action?.estimatedTotalCostCurrency);
    });
  };

  const onShow = () => {
    setShowForm(false);
  };

  const cancel = () => {
    setShowForm(true);
    setSelectedId(0);
    setCampusName("");
    setuniversityCampusObject({});
    setUniCountryLabel("Select Campus Country");
    setUniCountryValue(0);
    setUniStateLabel("Select Campus State");
    setUniStateValue(0);
    setCityLabel("Select Campus City");
    setCityValue(0);
    setAddressLine("");
    settotalStudent(0);
    setintStudent(0);
    settutionFee(0);
    setlivingCost(0);
    setapplicationFee(0);
    setestimatedTotal(0);
    setAvarageApplicationFeeCurrencyId(1);
    setAvarageLivingCostCurrencyId(1);
    setAvarageTutionFeeCurrencyId(1);
    setEstimatedTotalCostCurrencyId(1);
  };

  return (
    <div>
      <BreadCrumb
        title="University Campus Information"
        backTo={
          location.uniCampId !== undefined ? "Campus Details" : "University"
        }
        path={
          location.uuId !== undefined
            ? `/campusDetails/${location.uniCampId}`
            : "/universityList"
        }
      />

      <UniversityNavbar activetab={activetab} univerId={univerId} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="2">
                  <p className="section-title">Campuses List</p>

                  {universityCampusList?.map((uniCampus, i) => (
                    <div key={uniCampus.id} style={{ textAlign: "left" }}>
                      <Card className="uniCampusCard mt-4">
                        <CardBody>
                          <Row>
                            <Col md="6">
                              <p
                                style={{
                                  fontSize: "20px",
                                  opacity: "1",
                                  textTransform: "uppercase",
                                  fontWeight: "700",
                                }}
                              >
                                {" "}
                                {uniCampus?.name}{" "}
                              </p>
                              <p
                                style={{
                                  fontSize: "16px",
                                  opacity: "1",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                {uniCampus?.university?.name}
                                {uniCampus?.university?.shortName &&
                                  `(${uniCampus?.university?.shortName})`}
                              </p>
                              <br />
                              <p>
                                {" "}
                                {uniCampus?.universityCity?.name},{" "}
                                {uniCampus?.universityState?.name},{" "}
                                {uniCampus?.universityCountry?.name}{" "}
                              </p>
                              <p> {uniCampus?.addressLine}</p>
                            </Col>

                            <Col md="4">
                              <p>Total Student : {uniCampus?.totalStudent}</p>
                              <p>
                                International Student :{" "}
                                {uniCampus?.internationalStudent}
                              </p>
                              <p>
                                Avarage Tution Fee :{" "}
                                <CurrencyValue
                                  currencyList={currencyDD}
                                  currencyId={
                                    uniCampus?.avarageTutionFeeCurrency
                                  }
                                />
                                {uniCampus?.avarageTutionFee}
                              </p>
                              <p>
                                Avarage Living Cost :{" "}
                                <CurrencyValue
                                  currencyList={currencyDD}
                                  currencyId={
                                    uniCampus?.avarageLivingCostCurrency
                                  }
                                />
                                {uniCampus?.avarageLivingCost}
                              </p>
                              <p>
                                Avarage Application Fee :{" "}
                                <CurrencyValue
                                  currencyList={currencyDD}
                                  currencyId={
                                    uniCampus?.avarageApplicationFeeCurrency
                                  }
                                />
                                {uniCampus?.avarageApplicationFee}
                              </p>
                              <p>
                                Estimated Total Cost :{" "}
                                <CurrencyValue
                                  currencyList={currencyDD}
                                  currencyId={
                                    uniCampus?.estimatedTotalCostCurrency
                                  }
                                />
                                {uniCampus?.estimatedTotalCost}
                              </p>
                            </Col>

                            <Col md="2" className="text-right">
                              {permissions?.includes(
                                permissionList.Edit_University
                              ) && (
                                <p>
                                  <a href="#campus-form">
                                    <span
                                      className="pointer text-white"
                                      onClick={() =>
                                        handleUpdate(uniCampus?.id)
                                      }
                                    >
                                      Edit
                                    </span>
                                  </a>
                                  |
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => toggleDanger(uniCampus)}
                                  >
                                    Delete
                                  </span>
                                </p>
                              )}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                  <ConfirmModal
                    text="Do You Want To Delete This Campus? Once Deleted it can't be Undone "
                    isOpen={deleteModal}
                    toggle={() => {
                      setDeleteModal(!deleteModal);
                      setUniversityCampusId(0);
                      setUniversityCampusName("");
                    }}
                    cancel={() => {
                      setDeleteModal(!deleteModal);
                      setUniversityCampusId(0);
                      setUniversityCampusName("");
                    }}
                    buttonStatus={buttonStatus}
                    progress={progress}
                    confirm={() => handleDeletePermission(UniversityCampusId)}
                  />
                  {permissions?.includes(permissionList.Edit_University) && (
                    <>
                      {showForm === false && forms === true ? (
                        <>
                          <div
                            id="campus-form"
                            className={showForm ? "pb-5" : ""}
                          ></div>
                          <Card
                            className="mt-2"
                            style={{
                              border: "0.5px solid rgba(37, 37, 37, 0.12)",
                              borderRadius: "12px",
                            }}
                          >
                            <CardBody>
                              <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                  <Input
                                    type="hidden"
                                    id="universityId"
                                    name="universityId"
                                    value={univerId}
                                  />
                                  <Input
                                    type="hidden"
                                    id="Id"
                                    name="Id"
                                    value={selectedId}
                                  />
                                </FormGroup>

                                <Row>
                                  <Col md="5">
                                    <FormGroup>
                                      <Col>
                                        <span>
                                          <span className="text-danger">*</span>{" "}
                                          Campus name{" "}
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
                                        <span className="text-danger">
                                          {campusNameError}
                                        </span>
                                      </Col>
                                    </FormGroup>

                                    <FormGroup>
                                      <Col>
                                        <span>
                                          <span className="text-danger">*</span>{" "}
                                          Campus country{" "}
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
                                          onChange={(opt) =>
                                            selectUniCountry(
                                              opt.label,
                                              opt.value
                                            )
                                          }
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
                                          <span className="text-danger">*</span>{" "}
                                          Campus state{" "}
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
                                          onChange={(opt) =>
                                            selectUniState(opt.label, opt.value)
                                          }
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
                                          <span className="text-danger">*</span>{" "}
                                          Campus city{" "}
                                        </span>
                                      </Col>
                                      <Col>
                                        <Select
                                          options={cityOptions}
                                          value={{
                                            label: cityLabel,
                                            value: cityValue,
                                          }}
                                          onChange={(opt) =>
                                            selectCampusCity(
                                              opt.label,
                                              opt.value
                                            )
                                          }
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
                                          <span className="text-danger">*</span>{" "}
                                          Address line{" "}
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
                                        <span className="text-danger">
                                          {addressLineError}
                                        </span>
                                      </Col>
                                    </FormGroup>

                                    <FormGroup>
                                      <Col>
                                        <span>University on map</span>
                                      </Col>
                                      <Col>
                                        <InputGroup>
                                          <InputGroupText>
                                            http://
                                          </InputGroupText>
                                          <Input
                                            type="url"
                                            rows="4"
                                            name="EmbededMap"
                                            id="EmbededMap"
                                            defaultValue={
                                              universityCampusObject?.embededMap
                                            }
                                            placeholder="example.com"
                                          />
                                        </InputGroup>
                                        <span
                                          style={{
                                            color: "rgba(0, 0, 0, 0.45)",
                                          }}
                                        >
                                          Please type the "src" link only from
                                          the embed map.
                                        </span>
                                      </Col>
                                    </FormGroup>
                                  </Col>

                                  <Col
                                    lg="5"
                                    md="5"
                                    className="pl-sm-30px mr-sm-30px"
                                  >
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
                                          currencyId={
                                            avarageTutionFeeCurrencyId
                                          }
                                          setCurrencyId={
                                            setAvarageTutionFeeCurrencyId
                                          }
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
                                          currencyId={
                                            avarageLivingCostCurrencyId
                                          }
                                          setCurrencyId={
                                            setAvarageLivingCostCurrencyId
                                          }
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
                                          currencyId={
                                            avarageApplicationFeeCurrencyId
                                          }
                                          setCurrencyId={
                                            setAvarageApplicationFeeCurrencyId
                                          }
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
                                          currencyId={
                                            estimatedTotalCostCurrencyId
                                          }
                                          setCurrencyId={
                                            setEstimatedTotalCostCurrencyId
                                          }
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
                                  <Col md={10}>
                                    <FormGroup className="text-right">
                                      <Col>
                                        <CancelButton cancel={cancel} />

                                        {permissions?.includes(
                                          permissionList.Edit_University
                                        ) && (
                                          <SaveButton
                                            progress={progress}
                                            buttonStatus={buttonStatus}
                                          />
                                        )}
                                      </Col>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </CardBody>
                          </Card>
                        </>
                      ) : (
                        <>
                          {forms === true ? (
                            <a
                              href="#campus-form"
                              className="text-decoration-none"
                            >
                              <button
                                id="campus-form"
                                className="add-button"
                                onClick={onShow}
                                permission={6}
                              >
                                Add campus
                              </button>
                            </a>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                  <Row className="mt-4">
                    <Col className="d-flex justify-content-between mt-4">
                      <PreviousButton action={goPrevious} />

                      <SaveButton text="Next" action={goForward} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(AddUniversityCampus);
