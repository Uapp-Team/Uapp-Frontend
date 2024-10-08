import React from "react";
import { Button, FormGroup, Input, Col } from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const AddCommissionPriceInformation = (props) => {
  const {
    id,
    handleRange,
    handleFrom,
    handleTo,
    handleCommission,
    rangeName,
    setRangeName,
    from,
    setFrom,
    to,
    setTo,
    handleSubmit,
    commission,
    setCommission,
    data,
    progress,
    handleClear,
    rangeNameError,
    fromError,
    toError,
    commissionError,
  } = props;

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      <p className="section-title">
        {data?.id ? "Edit" : "Add"} Commission Information
      </p>

      <form onSubmit={handleSubmit}>
        {data?.id ? (
          <input type="hidden" name="id" id="id" value={data?.id} />
        ) : null}

        <input
          type="hidden"
          name="commissionGroupId"
          id="commissionGroupId"
          value={id}
        />

        <FormGroup row className="has-icon-left position-relative">
          <Col md="9">
            <FormGroup>
              <span>
                {" "}
                <span className="text-danger">*</span>
                Price Range Name
              </span>
              <Input
                type="text"
                name="priceRangeName"
                id="priceRangeName"
                value={rangeName}
                onChange={(e) => {
                  handleRange(e);
                }}
              />
              <span className="text-danger">{rangeNameError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Student Range From
              </span>
              <Input
                type="number"
                name="rangeFrom"
                id="rangeFrom"
                value={from}
                onChange={(e) => {
                  handleFrom(e);
                }}
              />
              <span className="text-danger">{fromError}</span>
            </FormGroup>
            <FormGroup>
              {" "}
              <span>
                {" "}
                <span className="text-danger">*</span>
                Student Range To
              </span>
              <Input
                type="number"
                name="rangeTo"
                id="rangeTo"
                value={to}
                onChange={(e) => {
                  handleTo(e);
                }}
              />
              <span className="text-danger">{toError}</span>
            </FormGroup>
            <FormGroup>
              {" "}
              <span>
                {" "}
                <span className="text-danger">*</span>
                Commission Amount
              </span>
              <Input
                type="number"
                name="commissionAmount"
                id="commissionAmount"
                value={commission}
                onChange={(e) => {
                  handleCommission(e);
                }}
              />
              <span className="text-danger">{commissionError}</span>
            </FormGroup>
            <FormGroup className="d-flex justify-content-end mt-3">
              {permissions?.includes(
                permissionList?.Configure_CommissionStucture
              ) ? (
                <>
                  <CancelButton cancel={handleClear} text="Clear" />
                  <SaveButton text="Submit" progress={progress} />
                </>
              ) : null}
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    </div>
  );
};

export default AddCommissionPriceInformation;
