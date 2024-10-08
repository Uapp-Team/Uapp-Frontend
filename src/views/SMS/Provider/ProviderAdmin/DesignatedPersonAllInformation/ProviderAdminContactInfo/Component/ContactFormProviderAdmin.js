import React from "react";
import { Col, FormGroup, Input } from "reactstrap";
import Select from "react-select";

const ContactFormProviderAdmin = ({
  providerAdminId,
  countryLabel,
  countryValue,
  success,
  addressTypeLabel,
  addressTypeValue,
  addressError,
  countryError,
  buttonStatus,
  progress,
  countryName,
  selectCountry,
  mailingAddressId,
  addressTypeName,
  selectAddressType,
  addressName,
  phnNo,
  setPhnNo,
  houseNo,
  setHouseNo,
  setAddressLine,
  addressLine,
  cityN,
  setCityN,
  state,
  setState,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="mt-4">
      {/* <Form onSubmit={handleSubmit} className="mt-5"> */}

      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
            Phone Number <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <Input
            type="text"
            onChange={(e) => setPhnNo(e.target.value)}
            defaultValue={phnNo}
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
            onChange={(e) => setHouseNo(e.target.value)}
            placeholder="Enter house no."
            defaultValue={houseNo}
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
            onChange={(e) => setAddressLine(e.target.value)}
            defaultValue={addressLine}
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
            onChange={(e) => setCityN(e.target.value)}
            defaultValue={cityN}
            placeholder="Enter City"
            required
          />
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>State/County</span>
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Enter State/County"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
            Zip/Post Code <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
          <Input
            type="text"
            placeholder="Enter Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
            defaultValue={zipCode}
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
            required
          />

          {countryError && (
            <span className="text-danger">Country is required</span>
          )}
        </Col>
      </FormGroup>
    </div>
  );
};

export default ContactFormProviderAdmin;
