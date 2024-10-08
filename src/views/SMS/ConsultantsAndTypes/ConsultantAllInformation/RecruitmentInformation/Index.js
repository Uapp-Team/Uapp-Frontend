import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Row,
} from "reactstrap";
import get from "../../../../../helpers/get";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import put from "../../../../../helpers/put";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ConsultantRecruitment = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const activetab = "7";
  const [success, setSuccess] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryList, setUniCountryList] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [navVisibility, setNavVisibility] = useState({});
  const [countryArray, setCountryArray] = useState("");
  const [uniCountryArray, setUniCountryArray] = useState("");
  const [isGlobalRecruiting, setIsGlobalRecruiting] = useState(false);
  const [isForGlobalRecruitment, setIsForGlobalRecruitment] = useState(false);
  const [fromCountryList, setFromCountryList] = useState([]);
  const [forCountryList, setForCountryList] = useState([]);
  const { consultantRegisterId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const [countrySpecificError, setCountrySpecificError] = useState(false);
  const [uniucountrySpecificError, setUniCountrySpecificError] =
    useState(false);

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("UniversityCountryDD/index").then((res) => {
      setUniCountryList(res);
    });

    get(`ConsultantRecruitment/get/${consultantRegisterId}`).then((res) => {
      setIsGlobalRecruiting(res?.isGlobalRecruiting);
      setFromCountryList(res?.recruitingCountries);
      setIsForGlobalRecruitment(res?.isForGlobalRecruitment);
      setForCountryList(res?.recruitmentForCountries);
    });

    get(`ConsultantNavBar/Get/${consultantRegisterId}`).then((res) => {
      //
      console.log("consNav", res);
      setNavVisibility(res);
    });
  }, [success, consultantRegisterId]);

  const countryName = countryList.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const uniCountryName = uniCountryList.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const handleOnchange = (data) => {
    let newArray = [];
    for (let x of data) {
      newArray.push(x?.value);
    }
    setCountryArray(newArray.toString());
    if (countryArray.length === 0) {
      setCountrySpecificError(false);
    }

    console.log(countryArray);
  };

  const handleOnchange2 = (data) => {
    let newArray2 = [];
    for (let x of data) {
      newArray2.push(x?.value);
    }
    setUniCountryArray(newArray2.toString());
    if (uniCountryArray.length === 0) {
      setUniCountrySpecificError(false);
    }
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      isGlobalRecruiting === false &&
      !countryArray &&
      fromCountryList.length === 0
    ) {
      setCountrySpecificError(true);
    } else if (
      isForGlobalRecruitment === false &&
      !uniCountryArray &&
      forCountryList.length === 0
    ) {
      setUniCountrySpecificError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);

      put(
        `ConsultantRecruitment/save?consultantid=${consultantRegisterId}&recruitingtype=${isGlobalRecruiting}&recruitingcountring=${countryArray}&recruitmenttype=${isForGlobalRecruitment}&recruitmentfor=${uniCountryArray}`
      ).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setButtonStatus(false);
        history.push(
          `/consultantCommissionInformation/${consultantRegisterId}`
        );
      });
    }
  };

  const toggleDeleteFromCountry = (name, cId, e) => {
    put(`RecruitmentFrom/Remove?id=${cId}`).then((res) => {
      console.log("response", res);
      addToast(res?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const toggleDeleteForCountry = (name, cId, e) => {
    put(`RecruitmentFor/Remove?id=${cId}`).then((res) => {
      console.log("response", res);
      addToast(res?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };
  const handlePrevious = () => {
    history.push(`/consultantBankInformation/${consultantRegisterId}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Consultant Recruitment Information"
        backTo=" Consultant Profile"
        path={`/consultantList`}
      />

      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="7">
              <p className="section-title">Recruitment Information</p>
              <Form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="consultantId"
                  id="consultantId"
                  value={consultantRegisterId}
                />
                <Row>
                  <Col lg="4" md="7" sm="8">
                    <FormGroup>
                      <div className="d-flex m-1 align-items-center">
                        <span className="pr-3">Recruiting From</span>
                        <input
                          type="radio"
                          value="Yes"
                          onClick={() => setIsGlobalRecruiting(true)}
                          checked={isGlobalRecruiting === true && true}
                        />
                        <label className="mt-2 px-2">Global</label>
                        <input
                          type="radio"
                          value="No"
                          onClick={() => setIsGlobalRecruiting(false)}
                          checked={isGlobalRecruiting === false && true}
                        />
                        <label className="mt-2 px-2">Country Specific</label>
                      </div>
                    </FormGroup>
                    {isGlobalRecruiting === false && (
                      <FormGroup>
                        <span>
                          {" "}
                          <span className="text-danger">*</span>
                          Specific Countries
                        </span>

                        <Select
                          isMulti
                          options={countryName}
                          onChange={(opt) => handleOnchange(opt)}
                          name="countryOfCitizenShipId"
                          id="countryOfCitizenShipId"
                        />
                        {countrySpecificError && (
                          <span className="text-danger">
                            Countries Specific is required.
                          </span>
                        )}

                        <div className="d-flex flex-wrap mt-2">
                          {fromCountryList.map((country, i) => (
                            <div key={i} className="mr-1 mb-1">
                              <button type="button" className="tag-button">
                                {country?.name}
                                <span
                                  className=" btn pr-0 pl-1 py-0"
                                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                                  onClick={(e) =>
                                    toggleDeleteFromCountry(
                                      country?.name,
                                      country?.id,
                                      e
                                    )
                                  }
                                >
                                  X
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </FormGroup>
                    )}
                    <FormGroup>
                      <div className="d-flex m-1 align-items-center">
                        <span className="pr-3">Recruitment For</span>
                        <input
                          type="radio"
                          value="Yes"
                          onClick={() => setIsForGlobalRecruitment(true)}
                          checked={isForGlobalRecruitment === true && true}
                        />
                        <label className="mt-2 px-2">Global</label>
                        <input
                          type="radio"
                          value="No"
                          onClick={() => setIsForGlobalRecruitment(false)}
                          checked={isForGlobalRecruitment === false && true}
                        />
                        <label className="mt-2 px-2">Country Specific</label>
                      </div>
                    </FormGroup>

                    {isForGlobalRecruitment === false && (
                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          <span className="text-danger">*</span> Specific
                          Countries
                        </span>

                        <Select
                          isMulti
                          options={uniCountryName}
                          onChange={(opt) => handleOnchange2(opt)}
                          name="countryOfCitizenShipId"
                          id="countryOfCitizenShipId"
                        />
                        {uniucountrySpecificError && (
                          <span className="text-danger">
                            Countries Specific is required.
                          </span>
                        )}

                        <div className="d-flex flex-wrap mt-2">
                          {forCountryList.map((country, i) => (
                            <div key={i} className="mr-1 mb-1">
                              <button type="button" className="tag-button">
                                {country?.name}
                                <span
                                  className=" btn pr-0 pl-1 py-0"
                                  style={{ color: "rgba(0, 0, 0, 0.45)" }}
                                  onClick={(e) =>
                                    toggleDeleteForCountry(
                                      country?.name,
                                      country?.id,
                                      e
                                    )
                                  }
                                >
                                  X
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </FormGroup>
                    )}
                    <FormGroup className="d-flex justify-content-between mt-4">
                      <PreviousButton action={handlePrevious} />
                      {permissions?.includes(
                        permissionList?.Edit_Consultant
                      ) && (
                        <SaveButton
                          text="Save and Next"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      )}
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

export default ConsultantRecruitment;
