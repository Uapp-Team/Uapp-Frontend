import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Col,
  Row,
  InputGroup,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import Axios from "axios";
import { rootUrl } from "../../../../constants/constants";

import { useToasts } from "react-toast-notifications";
import { useEffect } from "react";
import get from "../../../../helpers/get";
import SubjectNavbar from "./Components/SubjectNavbar";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import CheckBoxByObj from "../../../../components/form/CheckBoxByObj";
import {
  deliveryMethods,
  deliverySchedules,
} from "../../../../constants/presetData";

const AddUniversitySubjectFee = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const activetab = "2";
  const history = useHistory();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [CurrencyDD, setCurrencyDD] = useState([]);
  const [deliverySchedule, setDeliverySchedule] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState([]);

  const [addLocalTutionFee, setAddLocalTutionFee] = useState(undefined);
  const [addIntTutionFee, setAddIntTutionFee] = useState(undefined);
  const [addEUTutionFee, setAddEUTutionFee] = useState(undefined);
  const [averageFee, setAverageFee] = useState(undefined);
  const [firstYearTuitionFee, setFirstYearTuitionFee] = useState(undefined);
  const [depositFee, setDepositFee] = useState(undefined);

  const [addLocalTutionFeeCurrencyvalue, setAddLocalTutionFeeCurrencyvalue] =
    useState("@");
  const [addLocalTutionFeeCurrencyId, setAddLocalTutionFeeCurrencyId] =
    useState(0);

  const [addIntTutionFeeCurrencyId, setAddIntTutionFeeCurrencyId] = useState(0);
  const [addIntTutionFeeCurrencyValue, setAddIntTutionFeeCurrencyValue] =
    useState("@");
  const [addEUTutionFeeCurrencyId, setAddEUTutionFeeCurrencyId] = useState(0);
  const [addEUTutionFeeCurrencyValue, setAddEUTutionFeeCurrencyValue] =
    useState("@");
  const [averageFeeCurrencyId, setAverageFeeCurrencyId] = useState(0);
  const [averageFeeCurrencyValue, setAverageFeeCurrencyValue] = useState("@");

  const [firstYearTuitionFeeId, setFirstYearTuitionFeeId] = useState(0);
  const [
    firstYearTuitionFeeCurrencyValue,
    setFirstYearTuitionFeeCurrencyValue,
  ] = useState("@");

  const [depositFeeId, setDepositFeeId] = useState(0);
  const [depositFeeCurrencyValue, setDepositFeeCurrencyValue] = useState("@");

  const { addToast } = useToasts();
  const { id, subjId } = useParams();

  useEffect(() => {
    get(`CurrencyDD/Index`).then((res) => {
      setCurrencyDD(res);
    });
  }, []);

  useEffect(() => {
    const initialStatus1 = CurrencyDD.filter((status) => {
      return status.id === addLocalTutionFeeCurrencyId;
    });
    const initialStatus2 = CurrencyDD.filter((status) => {
      return status.id === addIntTutionFeeCurrencyId;
    });
    const initialStatus3 = CurrencyDD.filter((status) => {
      return status.id === addEUTutionFeeCurrencyId;
    });
    const initialStatus4 = CurrencyDD.filter((status) => {
      return status.id === averageFeeCurrencyId;
    });
    const initialStatus5 = CurrencyDD.filter((status) => {
      return status.id === firstYearTuitionFeeId;
    });
    const initialStatus6 = CurrencyDD.filter((status) => {
      return status.id === depositFeeId;
    });

    setAddLocalTutionFeeCurrencyvalue(initialStatus1[0]?.name);
    setAddIntTutionFeeCurrencyValue(initialStatus2[0]?.name);
    setAddEUTutionFeeCurrencyValue(initialStatus3[0]?.name);
    setAverageFeeCurrencyValue(initialStatus4[0]?.name);
    setFirstYearTuitionFeeCurrencyValue(initialStatus5[0]?.name);
    setDepositFeeCurrencyValue(initialStatus6[0]?.name);
  }, [
    CurrencyDD,
    addLocalTutionFeeCurrencyId,
    addIntTutionFeeCurrencyId,
    addEUTutionFeeCurrencyId,
    averageFeeCurrencyId,
    firstYearTuitionFeeId,
    depositFeeId,
  ]);

  useEffect(() => {
    get(`SubjectFeeAndDeliveryPattern/Get/${subjId}`).then((res) => {
      setAddLocalTutionFeeCurrencyId(
        res?.localfeecurrencyid === 0 ? 2 : res?.localfeecurrencyid
      );
      setAddIntTutionFeeCurrencyId(
        res?.internationalfeecurrencyid === 0
          ? 2
          : res?.internationalfeecurrencyid
      );
      setAddEUTutionFeeCurrencyId(
        res?.eututionfeecurrencyid === 0 ? 2 : res?.eututionfeecurrencyid
      );
      setAverageFeeCurrencyId(
        res?.averageapplicationfeecurrencyid === 0
          ? 2
          : res?.averageapplicationfeecurrencyid
      );
      setFirstYearTuitionFeeId(
        res?.firstyeartutionfeecurrencyid === 0
          ? 2
          : res?.firstyeartutionfeecurrencyid
      );
      setDepositFeeId(
        res?.depositfeecurrencyid === 0 ? 2 : res?.depositfeecurrencyid
      );
      setAddLocalTutionFee(res?.localtutionfee);
      setAddIntTutionFee(res?.internationaltutionfee);
      setAddEUTutionFee(res?.eututionfee);
      setAverageFee(res?.averageapplicationfee);
      setFirstYearTuitionFee(res?.firstyeartutionfee);
      setDepositFee(res?.depositfee);
      setDeliverySchedule(res?.deliverySchedules);
      setDeliveryMethod(res?.deliveryMethods);
    });
  }, [subjId]);

  const AuthStr = localStorage.getItem("token");

  const currencyList = CurrencyDD.map((programOptions) => ({
    label: programOptions.name,
    value: programOptions.id,
  }));

  const selectCurrency1 = (label, value) => {
    setAddLocalTutionFeeCurrencyvalue(label);
    setAddLocalTutionFeeCurrencyId(value);
  };

  const selectCurrency2 = (label, value) => {
    setAddIntTutionFeeCurrencyValue(label);
    setAddIntTutionFeeCurrencyId(value);
  };

  const selectCurrency3 = (label, value) => {
    setAddEUTutionFeeCurrencyValue(label);
    setAddEUTutionFeeCurrencyId(value);
  };

  const selectCurrency4 = (label, value) => {
    setAverageFeeCurrencyValue(label);
    setAverageFeeCurrencyId(value);
  };

  const selectFirstYearTutionFeeCurrency = (label, value) => {
    setFirstYearTuitionFeeCurrencyValue(label);
    setFirstYearTuitionFeeId(value);
  };
  const selectDepositFeeCurrency = (label, value) => {
    setDepositFeeCurrencyValue(label);
    setDepositFeeId(value);
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = {
      online: deliveryMethod?.includes(1) ? true : false,
      onCampus: deliveryMethod?.includes(2) ? true : false,
      hybrid: deliveryMethod?.includes(3) ? true : false,

      evening: deliverySchedule?.includes(1) ? true : false,
      eveningweekend: deliverySchedule?.includes(2) ? true : false,
      standard: deliverySchedule?.includes(3) ? true : false,
      weekend: deliverySchedule?.includes(4) ? true : false,
      flexible: deliverySchedule?.includes(5) ? true : false,
      subjectId: subjId,
      localfeecurrencyid: addLocalTutionFeeCurrencyId,
      localtutionfee: addLocalTutionFee,
      internationalfeecurrencyid: addIntTutionFeeCurrencyId,
      internationaltutionfee: addIntTutionFee,
      eututionfeecurrencyid: addEUTutionFeeCurrencyId,
      eututionfee: addEUTutionFee,
      averageapplicationfeecurrencyid: averageFeeCurrencyId,
      averageapplicationfee: averageFee,
      firstyeartutionfeecurrencyid: firstYearTuitionFeeId,
      firstyeartutionfee: firstYearTuitionFee,
      depositfeecurrencyid: depositFeeId,
      depositfee: depositFee,
    };

    setProgress(true);
    Axios.post(`${rootUrl}SubjectFeeAndDeliveryPattern/Save`, subdata, {
      headers: {
        "Content-Type": "application/json",
        authorization: AuthStr,
      },
    }).then((res) => {
      setButtonStatus(false);
      setProgress(false);

      if (res.status === 200 && res.data.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push({
          pathname: `/add-university-course-test-score/${id}/${subjId}`,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    });
  };

  const handlePrevious = () => {
    history.push(`/add-University-course/${id}/${subjId}`);
  };

  return (
    <div>
      <SubjectNavbar
        title="Course Fee Information"
        activeTab={activetab}
        id={id}
        subjId={subjId}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <Form onSubmit={handleSubmit}>
                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="subjectId"
                    name="subjectId"
                    value={subjId}
                  />
                </FormGroup>
                <Row>
                  <Col md={7}>
                    <p className="section-title">Course Fee</p>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>Home Tution Fee</span>
                      </Col>
                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: addLocalTutionFeeCurrencyvalue,
                              value: addLocalTutionFeeCurrencyId,
                            }}
                            onChange={(opt) =>
                              selectCurrency1(opt.label, opt.value)
                            }
                            name="localfeecurrencyid"
                            id="localfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            onChange={(e) =>
                              setAddLocalTutionFee(e.target.value)
                            }
                            // defaultValue={localTutionFee}
                            defaultValue={addLocalTutionFee}
                            name="localtutionfee"
                            id="localtutionfee"
                            placeholder="Enter Home Tution Fee"
                            // required
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>Int. Tution Fee</span>
                      </Col>

                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: addIntTutionFeeCurrencyValue,
                              value: addIntTutionFeeCurrencyId,
                            }}
                            onChange={(opt) =>
                              selectCurrency2(opt.label, opt.value)
                            }
                            name="internationalfeecurrencyid"
                            id="internationalfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => setAddIntTutionFee(e.target.value)}
                            // defaultValue={intTutionFee}
                            defaultValue={addIntTutionFee}
                            placeholder="Enter International Tution Fee "
                            // required
                            name="internationaltutionfee"
                            id="internationaltutionfee"
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>
                          EU Tution Fee
                          {/* <span className="text-danger">*</span>{" "} */}
                        </span>
                      </Col>
                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: addEUTutionFeeCurrencyValue,
                              value: addEUTutionFeeCurrencyId,
                            }}
                            onChange={(opt) =>
                              selectCurrency3(opt.label, opt.value)
                            }
                            name="eututionfeecurrencyid"
                            id="eututionfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            name="eututionfee"
                            id="eututionfee"
                            onChange={(e) => setAddEUTutionFee(e.target.value)}
                            // defaultValue={euTutionFee}
                            defaultValue={addEUTutionFee}
                            placeholder="Enter EU Tution Fee"
                            // required
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>
                          Average Application Fee
                          {/* <span className="text-danger">*</span>{" "} */}
                        </span>
                      </Col>
                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: averageFeeCurrencyValue,
                              value: averageFeeCurrencyId,
                            }}
                            onChange={(opt) =>
                              selectCurrency4(opt.label, opt.value)
                            }
                            name="averageapplicationfeecurrencyid"
                            id="averageapplicationfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            name="averageapplicationfee"
                            id="averageapplicationfee"
                            onChange={(e) => setAverageFee(e.target.value)}
                            // defaultValue={euTutionFee}
                            defaultValue={averageFee}
                            placeholder="Enter Average Application Fee"
                            // required
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    {/* <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>
                          First Year Tution Fee
                        </span>
                      </Col>
                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: firstYearTuitionFeeCurrencyValue,
                              value: firstYearTuitionFeeId,
                            }}
                            onChange={(opt) =>
                              selectFirstYearTutionFeeCurrency(
                                opt.label,
                                opt.value
                              )
                            }
                            name="firstyeartutionfeecurrencyid"
                            id="firstyeartutionfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            name="firstyeartutionfee"
                            id="firstyeartutionfee"
                            onChange={(e) =>
                              setFirstYearTuitionFee(e.target.value)
                            }
                            defaultValue={firstYearTuitionFee}
                            placeholder="Enter First Year Tution Fee "
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup> */}
                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="col-5">
                        <span>
                          Deposit Fee
                          {/* <span className="text-danger">*</span>{" "} */}
                        </span>
                      </Col>
                      <Col className="col-5">
                        <InputGroup className="d-flex flex-nowrap">
                          <span className="pr-2">:</span>
                          <Select
                            options={currencyList}
                            value={{
                              label: depositFeeCurrencyValue,
                              value: depositFeeId,
                            }}
                            onChange={(opt) =>
                              selectDepositFeeCurrency(opt.label, opt.value)
                            }
                            name="depositfeecurrencyid"
                            id="depositfeecurrencyid"
                          />

                          <Input
                            type="number"
                            min="0"
                            name="depositfee"
                            id="depositfee"
                            onChange={(e) => setDepositFee(e.target.value)}
                            // defaultValue={euTutionFee}
                            defaultValue={depositFee}
                            placeholder="Enter Deposit Fee "
                            // required
                          />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <p className="section-title">Delivery Methods</p>
                    <CheckBoxByObj
                      register={() => {}}
                      name="deliveryMethods"
                      list={deliveryMethods}
                      defaultValue={deliveryMethod}
                      action={setDeliveryMethod}
                      className="mb-0"
                    />
                    <p className="section-title mt-3">Delivery Schedules</p>
                    <CheckBoxByObj
                      register={() => {}}
                      name="deliverySchedules"
                      list={deliverySchedules}
                      defaultValue={deliverySchedule}
                      action={setDeliverySchedule}
                      className="mb-0"
                    />
                  </Col>
                </Row>
                <Row className=" mt-4">
                  {" "}
                  <Col md="11" className="d-flex justify-content-between">
                    <PreviousButton action={handlePrevious} />
                    {permissions?.includes(permissionList?.Edit_Subjects) && (
                      <SaveButton
                        text="Save and Next"
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    )}
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

export default AddUniversitySubjectFee;
