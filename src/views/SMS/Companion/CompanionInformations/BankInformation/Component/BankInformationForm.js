import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Row, Label } from "reactstrap";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const BankInformationForm = ({
  handleSubmit,
  fetchedData,
  companionId,
  progress,
  buttonStatus,
  cancel,
  bankNameError,
  handleBankName,
  handleAccountName,
  accountNameError,
  handleAccountNumber,
  accountNumberError,
  handleShortCode,
  shortCodeError,
  bankDetailsData,
  bankName,
  accountName,
  accountNumber,
  shortCode,
  isDefault,
  setIsDefault,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div className="">
      <Form onSubmit={handleSubmit}>
        <p className="section-title">Bank details</p>
        <input
          type="hidden"
          name="companionId"
          id="companionId"
          value={companionId}
        />
        {fetchedData?.id && (
          <input type="hidden" name="id" id="id" value={fetchedData?.id} />
        )}
        <Row>
          <Col lg="6" md="8">
            <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> Bank Name
              </span>

              <Input
                type="text"
                name="bankName"
                id="bankName"
                placeholder="Enter Bank Name"
                onChange={(e) => {
                  handleBankName(e);
                }}
                value={bankName}
              />
              <span className="text-danger">{bankNameError}</span>
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> Account Holder Name
              </span>

              <Input
                type="text"
                name="accountName"
                id="accountName"
                placeholder="Enter Account Holder Name"
                onChange={(e) => {
                  handleAccountName(e);
                }}
                value={accountName}
              />
              <span className="text-danger">{accountNameError}</span>
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> Account Number
              </span>

              <Input
                type="text"
                name="accountNumber"
                id="accountNumber"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => {
                  handleAccountNumber(e);
                }}
              />
              <span className="text-danger">{accountNumberError}</span>
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>
                {" "}
                <span className="text-danger">*</span> Sort Code
              </span>

              <Input
                type="text"
                name="sortCode"
                id="sortCode"
                placeholder="Enter Sort Code"
                value={shortCode}
                onChange={(e) => {
                  handleShortCode(e);
                }}
              />
              <span className="text-danger">{shortCodeError}</span>
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>Swift </span>

              <Input
                type="text"
                name="swift"
                id="swift"
                placeholder="Enter Swift"
                defaultValue={fetchedData?.swift}
              />
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>BIC </span>

              <Input
                type="text"
                name="bIC"
                id="bIC"
                placeholder="Enter BIC"
                defaultValue={fetchedData?.bic}
              />
            </FormGroup>
            <FormGroup className="has-icon-left position-relative">
              <span>Bank Address </span>

              <Input
                type="text"
                name="bankAddress"
                id="bankAddress"
                placeholder="Enter Bank Address"
                defaultValue={fetchedData?.bankAddress}
              />
            </FormGroup>

            {bankDetailsData?.length < 1 ? null : (
              <>
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>
                    Use This Bank For Transaction.
                  </span>
                  <br />

                  <FormGroup check inline className="form-mt">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="isDefault"
                      value={true}
                      checked={isDefault === true}
                      onChange={() => setIsDefault(!isDefault)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isDefault"
                    >
                      Yes
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="IsDefault"
                      value={false}
                      checked={isDefault === false}
                      onChange={() => setIsDefault(!isDefault)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isDefault"
                    >
                      No
                    </Label>
                  </FormGroup>
                </FormGroup>
              </>
            )}
          </Col>
        </Row>

        <Row className="text-right">
          <Col lg="6" md="8">
            <FormGroup>
              {bankDetailsData.length > 0 && <CancelButton cancel={cancel} />}

              {permissions?.includes(permissionList?.Edit_Consultant) && (
                <SaveButton progress={progress} buttonStatus={buttonStatus} />
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BankInformationForm;
