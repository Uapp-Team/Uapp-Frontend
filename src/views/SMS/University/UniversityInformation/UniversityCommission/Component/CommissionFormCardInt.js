import React from "react";
import { Card, CardBody, Form, Input } from "reactstrap";
import { useState } from "react";
import Select from "react-select";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../../../Components/ButtonForFunction";

const CommissionFormCardInt = ({ level, uniId, uniCountryList, i }) => {
  const [paymentType, setPaymentType] = useState(
    level?.comissionInfo?.comissionType
  );
  const range = {
    from: 0,
    to: 0,
    comissionAmount: 0,
  };
  const countryObject = {
    countryId: 1,
    comissionType: 1,
    installment: 0,
    amount: 0,
    hasRange: false,
    range: [
      {
        from: 0,
        to: 0,
        amount: 0,
      },
    ],
  };
  const { addToast } = useToasts();
  const [hasRange, setHasRange] = useState(
    level?.comissionInfo ? level?.comissionInfo?.hasRange : false
  );
  const [rangeForms, setRangeForms] = useState(
    level?.comissionInfo?.commissionRanges.length > 0
      ? level?.comissionInfo?.commissionRanges
      : [range]
  );
  const [isCountry, setIsCountry] = useState(
    level?.comissionInfo ? level?.comissionInfo?.hasCountrySpecific : false
  );
  const [countryForms, setCountryForms] = useState(
    level?.comissionInfo?.countryCommissions.length > 0
      ? level?.comissionInfo?.countryCommissions
      : [countryObject]
  );
  console.log(countryForms);

  // RangeForm Data set
  const handlefromInput = (index, event) => {
    const values = [...rangeForms];
    values[index].from = event.target.value;
    setRangeForms(values);
  };
  const handletoInput = (index, event) => {
    const values = [...rangeForms];
    values[index].to = event.target.value;
    setRangeForms(values);
  };
  const handleComissionAmountInput = (index, event) => {
    const values = [...rangeForms];
    values[index].comissionAmount = event.target.value;
    setRangeForms(values);
  };

  // CountryForm Data set
  const handleCountryInput = (i, event) => {
    const values = [...countryForms];
    values[i].countryId = event;
    setCountryForms(values);
  };
  const handleComissionType = (i, event) => {
    const values = [...countryForms];
    values[i].comissionType = event.value;
    setCountryForms(values);
  };
  const handleInstallmentInput = (i, event) => {
    const values = [...countryForms];
    values[i].installment = event.target.value;
    setCountryForms(values);
  };
  const handleAmountInput = (i, event) => {
    const values = [...countryForms];
    values[i].amount = event.target.value;
    setCountryForms(values);
  };
  const handleHasRange = (i, event) => {
    const values = [...countryForms];
    values[i].hasRange = event;
    setCountryForms(values);
  };
  const handleRangefromInput = (i, j, event) => {
    const values = [...countryForms];
    values[i].range[j].from = event.target.value;
    setCountryForms(values);
  };
  const handleRangetoInput = (i, j, event) => {
    const values = [...countryForms];
    values[i].range[j].to = event.target.value;
    setCountryForms(values);
  };
  const handleRangeamountInput = (i, j, event) => {
    const values = [...countryForms];
    values[i].range[j].amount = event.target.value;
    setCountryForms(values);
  };

  const addForm = () => {
    const input = [...rangeForms];
    input.push(range);
    setRangeForms(input);
  };

  const addRange = (i) => {
    const values = [...countryForms];
    values[i].range.push({
      from: 0,
      to: 0,
      amount: 0,
    });
    setCountryForms(values);
  };

  const addCountry = () => {
    const values = [...countryForms];
    values.push(countryObject);
    setCountryForms(values);
  };

  // useEffect(() => {
  //   get(`InternationalComission/GetCountries/${uniId}`).then((res) => {
  //     setUniCountryList(res);
  //     setLoading(false);
  //   });
  // }, [uniId]);
  const uniCountryName = uniCountryList.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const commissionTypeList = [
    {
      id: 1,
      name: "Amount",
    },
    {
      id: 2,
      name: "Percentage",
    },
  ];

  const commissionOptions = commissionTypeList?.map((type) => ({
    label: type?.name,
    value: type?.id,
  }));

  const handleSubmit = (event) => {
    console.log(countryForms);
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("hasRange", hasRange);
    subdata.append("hasCountrySpecific", isCountry);
    subdata.append("rangeForms", JSON.stringify(rangeForms));
    subdata.append("countryForms", JSON.stringify(countryForms));
    let value = 0;

    for (value of subdata) {
      console.log("valuesss", value);
    }

    post(`InternationalComission/post`, subdata).then((res) => {
      console.log("res", res);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Card key={i} className="CampusCard">
        <CardBody className="shaodw">
          <Form onSubmit={handleSubmit}>
            <input type="hidden" name="universityId" value={uniId} />
            <input
              type="hidden"
              name="educationLevelId"
              value={level?.educationLevelId}
            />
            <input
              type="hidden"
              name="internationalCommissionId"
              value={
                level?.comissionInfo
                  ? level?.comissionInfo?.internationalCommissionId
                  : 0
              }
            />

            <h3 style={{ color: "#979797" }} className="mb-2">
              {level?.educationLevelName}
            </h3>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex m-1 align-items-center">
                  <p className="commission-text pr-3 mt-2">Payment type</p>
                  <Select
                    options={commissionOptions}
                    defaultValue={
                      level?.comissionInfo
                        ? {
                            label: commissionOptions.find(
                              (obj) =>
                                obj.value ===
                                level?.comissionInfo?.comissionType
                            ).label,
                            value: level?.comissionInfo?.comissionType,
                          }
                        : { label: "Amount", value: 1 }
                    }
                    onChange={(e) => setPaymentType(e.value)}
                    name="comissionType"
                    id="comissionType"
                  />
                </div>
                <p className="commission-text bold mx-1 mt-3">Default</p>
                <div className="d-flex m-1 align-items-center">
                  <p className="commission-text pr-3 mt-2">Installment</p>
                  <Input
                    style={{ width: "15%" }}
                    type="number"
                    defaultValue={
                      level?.comissionInfo
                        ? level?.comissionInfo?.comissionInstallment
                        : ""
                    }
                    name="comissionInstallment"
                    id="comissionInstallment"
                    placeholder="Installment"
                    min="1"
                    required
                  />
                  <p className="commission-text px-3 mt-2">Amount</p>
                  <Input
                    style={{ width: "15%" }}
                    type="number"
                    defaultValue={
                      level?.comissionInfo
                        ? level?.comissionInfo?.comissionAmount
                        : ""
                    }
                    name="comissionAmount"
                    id="comissionAmount"
                    placeholder="Amount"
                    min="1"
                    required
                  />
                  {paymentType === 2 && <b className="pl-1">%</b>}
                </div>
                <div className="d-flex m-1 align-items-center">
                  <p className="commission-text pr-3 mt-2">
                    Country specific condition
                  </p>
                  <input
                    type="radio"
                    value="Yes"
                    onClick={() => setIsCountry(true)}
                    checked={isCountry === true && true}
                  />
                  <label
                    className="mt-2 px-2"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    Yes
                  </label>
                  <input
                    type="radio"
                    value="No"
                    onClick={() => setIsCountry(false)}
                    checked={isCountry === false && true}
                  />
                  <label
                    className="mt-2 px-2"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    No
                  </label>
                </div>
                {isCountry === false ? (
                  <>
                    <div className="d-flex m-1 align-items-center">
                      <p className="commission-text pr-3 mt-2">
                        Conditional range available
                      </p>
                      <input
                        type="radio"
                        value="Yes"
                        onClick={() => setHasRange(true)}
                        checked={hasRange === true && true}
                      />
                      <label
                        className="mt-2 px-2"
                        style={{ fontWeight: 500, fontSize: "14px" }}
                      >
                        Yes
                      </label>
                      <input
                        type="radio"
                        value="No"
                        onClick={() => setHasRange(false)}
                        checked={hasRange === false && true}
                      />
                      <label
                        className="mt-2 px-2"
                        style={{ fontWeight: 500, fontSize: "14px" }}
                      >
                        No
                      </label>
                    </div>
                    {hasRange === false ? (
                      <></>
                    ) : (
                      <>
                        {rangeForms?.map((item, i) => (
                          <div
                            key={i}
                            className="d-flex m-1 align-items-center"
                          >
                            <p className="commission-text pr-3">From</p>
                            <Input
                              style={{ width: "15%" }}
                              type="number"
                              defaultValue={item.from}
                              onChange={(event) => handlefromInput(i, event)}
                              min="1"
                              required
                            />
                            <p className="commission-text px-3">To</p>
                            <Input
                              style={{ width: "15%" }}
                              type="number"
                              defaultValue={item.to}
                              onChange={(event) => handletoInput(i, event)}
                              min="1"
                              required
                            />
                            <p className="commission-text px-3">Amount</p>
                            <Input
                              style={{ width: "30%" }}
                              type="number"
                              defaultValue={item.comissionAmount}
                              onChange={(event) =>
                                handleComissionAmountInput(i, event)
                              }
                              placeholder="Amount"
                              min="1"
                              required
                            />
                            {paymentType === 2 && <b className="pl-1">%</b>}
                            {i === rangeForms.length - 1 && (
                              <span
                                style={{
                                  cursor: "pointer",
                                  background: "#019088",
                                  borderRadius: "3px",
                                  fontSize: "18px",
                                }}
                                className="text-white px-2 py-1 m-2"
                                onClick={() => addForm()}
                              >
                                <strong> + </strong>
                              </span>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {countryForms.length > 0 &&
                      countryForms?.map((item, i) => (
                        <div
                          style={{
                            border: "1px solid rgba(37, 37, 37, 0.12)",
                          }}
                          className="rounded p-2 my-2"
                          key={i}
                        >
                          <div className="d-flex m-1 align-items-center">
                            <p className="commission-text pr-3 mt-2">Country</p>
                            <Select
                              options={uniCountryName}
                              defaultValue={
                                item?.countryId
                                  ? {
                                      label: uniCountryName.find(
                                        (obj) => obj.value === item?.countryId
                                      ).label,
                                      value: item?.countryId,
                                    }
                                  : {
                                      label: uniCountryName.find(
                                        (obj) => obj.value === 1
                                      ).label,
                                      value: 1,
                                    }
                              }
                              onChange={(event) =>
                                handleCountryInput(i, event.value)
                              }
                            />
                          </div>
                          <div className="d-flex m-1 align-items-center">
                            <p className="commission-text pr-3 mt-2">
                              Payment type
                            </p>
                            <Select
                              options={commissionOptions}
                              defaultValue={
                                level?.comissionInfo
                                  ? {
                                      label: commissionOptions.find(
                                        (obj) =>
                                          obj.value === item?.comissionType
                                      ).label,
                                      value: item?.comissionType,
                                    }
                                  : { label: "Amount", value: 1 }
                              }
                              onChange={(event) =>
                                handleComissionType(i, event)
                              }
                            />
                            <p className="commission-text px-3 mt-2">
                              Installment
                            </p>
                            <Input
                              style={{ width: "15%" }}
                              type="number"
                              defaultValue={item.installment}
                              onChange={(event) =>
                                handleInstallmentInput(i, event)
                              }
                              placeholder="Installment"
                              min="1"
                              required
                            />
                          </div>
                          <div className="d-flex m-1 align-items-center">
                            <p className="commission-text pr-3 mt-2">
                              Conditional range available
                            </p>
                            <input
                              type="radio"
                              value="Yes"
                              onClick={() => handleHasRange(i, true)}
                              checked={item.hasRange === true && true}
                            />
                            <label
                              className="mt-2 px-2"
                              style={{ fontWeight: 500, fontSize: "14px" }}
                            >
                              Yes
                            </label>
                            <input
                              type="radio"
                              value="No"
                              onClick={() => handleHasRange(i, false)}
                              checked={item.hasRange === false && true}
                            />
                            <label
                              className="mt-2 px-2"
                              style={{ fontWeight: 500, fontSize: "14px" }}
                            >
                              No
                            </label>
                          </div>
                          {item.hasRange === false ? (
                            <div className="d-flex m-1 align-items-center">
                              <p className="commission-text pr-3 mt-2">
                                Amount
                              </p>
                              <Input
                                style={{ width: "15%" }}
                                type="number"
                                defaultValue={item.amount}
                                onChange={(event) =>
                                  handleAmountInput(i, event)
                                }
                                placeholder="Amount"
                                min="1"
                                required
                              />
                              {item?.comissionType === 2 && (
                                <b className="pl-1">%</b>
                              )}
                            </div>
                          ) : (
                            <>
                              {countryForms[i].range?.map((rangeItem, j) => (
                                <div
                                  key={j}
                                  className="d-flex m-1 align-items-center"
                                >
                                  <div
                                    style={{ width: "90%" }}
                                    className="d-flex align-items-center"
                                  >
                                    <p className="commission-text pr-3">From</p>
                                    <Input
                                      style={{ width: "15%" }}
                                      type="number"
                                      defaultValue={rangeItem.from}
                                      onChange={(event) =>
                                        handleRangefromInput(i, j, event)
                                      }
                                      min="1"
                                      required
                                    />
                                    <p className="commission-text px-3">To</p>
                                    <Input
                                      style={{ width: "15%" }}
                                      type="number"
                                      defaultValue={rangeItem.to}
                                      onChange={(event) =>
                                        handleRangetoInput(i, j, event)
                                      }
                                      min="1"
                                      required
                                    />

                                    <p className="commission-text px-3">
                                      Amount
                                    </p>
                                    <Input
                                      style={{ width: "30%" }}
                                      type="number"
                                      defaultValue={rangeItem.amount}
                                      onChange={(event) =>
                                        handleRangeamountInput(i, j, event)
                                      }
                                      placeholder="Amount"
                                      min="1"
                                      required
                                    />
                                    {item?.comissionType === 2 && (
                                      <b className="pl-1">%</b>
                                    )}
                                  </div>
                                  <div style={{ width: "5%" }}>
                                    {j === countryForms[i].range.length - 1 && (
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          background: "#019088",
                                          borderRadius: "3px",
                                        }}
                                        className="text-white px-2 py-1 m-2"
                                        onClick={() => addRange(i)}
                                      >
                                        <strong> + </strong>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      ))}
                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                        border: "1px solid rgba(37, 37, 37, 0.12)",
                      }}
                      className="text-center rounded my-1"
                      onClick={() => addCountry()}
                    >
                      <strong> + </strong>
                    </div>
                  </>
                )}
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <p className="commission-text pr-3">Note</p>
                <Input
                  style={{ height: "130px" }}
                  type="textarea"
                  name="note"
                  id="note"
                  placeholder="Write here"
                />
              </div>
            </div>
            <div className="text-right mt-2">
              <ButtonForFunction
                color={"primary"}
                type={"submit"}
                className={"ml-lg-3 ml-sm-1"}
                name={"Save"}
                permission={6}
              />
            </div>
          </Form>
        </CardBody>
      </Card>
      {/* )} */}
    </>
  );
};

export default CommissionFormCardInt;
