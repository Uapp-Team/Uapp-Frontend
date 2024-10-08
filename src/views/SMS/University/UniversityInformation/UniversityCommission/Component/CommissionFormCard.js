import React from "react";
import { Card, CardBody, Form, Input } from "reactstrap";
import { useState } from "react";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import Select from "react-select";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const CommissionFormCard = ({ level, uniId, i }) => {
  const [paymentType, setPaymentType] = useState(
    level?.comissionInfo?.comissionType
  );
  const range = {
    from: 0,
    to: 0,
    comissionAmount: 0,
  };

  const { addToast } = useToasts();
  const [hasRange, setHasRange] = useState(
    level?.comissionInfo ? level?.comissionInfo?.hasRange : false
  );
  const [rangeForms, setRangeForms] = useState(
    level?.comissionInfo?.commissionRanges
      ? level?.comissionInfo?.commissionRanges
      : [range]
  );
  console.log(level);
  console.log(rangeForms);
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

  const addForm = () => {
    const input = [...rangeForms];
    input.push(range);
    setRangeForms(input);
  };

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
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("hasRange", hasRange);
    subdata.append("rangeForms", JSON.stringify(rangeForms));
    let value = 0;

    for (value of subdata) {
      console.log("valuesss", value);
    }

    post(`UniversityComission/post`, subdata).then((res) => {
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
            name="universityCommissionId"
            value={
              level?.comissionInfo
                ? level?.comissionInfo?.universityCommissionId
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
                <p className="commission-text pr-3 ">Payment type</p>
                <Select
                  options={commissionOptions}
                  defaultValue={
                    level?.comissionInfo
                      ? {
                          label: commissionOptions.find(
                            (obj) =>
                              obj.value === level?.comissionInfo?.comissionType
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
              <div className="d-flex m-1 align-items-center">
                <p className="commission-text pr-3">Installment</p>
                <Input
                  style={{ width: "15%", margin: "2px 0" }}
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
              </div>

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
                <div className="d-flex m-1 align-items-center">
                  <p className="commission-text pr-3">Amount</p>
                  <Input
                    style={{ width: "15%" }}
                    defaultValue={
                      level?.comissionInfo
                        ? level?.comissionInfo?.comissionAmount
                        : ""
                    }
                    type="number"
                    name="comissionAmount"
                    id="comissionAmount"
                    placeholder="Amount"
                    min="1"
                    required
                  />
                  {paymentType === 2 && <b className="pl-1">%</b>}
                </div>
              ) : (
                <>
                  {rangeForms?.map((item, i) => (
                    <div key={i} className="d-flex m-1 align-items-center">
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
                            fontSize: "16px",
                          }}
                          className="text-white px-2 py-1 ml-1"
                          onClick={() => addForm()}
                        >
                          <strong> + </strong>
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <p className="commission-text pr-3">Note</p>
              <Input
                style={{ height: "130px" }}
                defaultValue={
                  level?.comissionInfo ? level?.comissionInfo?.note : ""
                }
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
  );
};

export default CommissionFormCard;
