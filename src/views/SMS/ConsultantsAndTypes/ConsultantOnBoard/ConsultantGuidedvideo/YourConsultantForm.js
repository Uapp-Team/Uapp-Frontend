import React from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import SaveButton from "../../../../../components/buttons/SaveButton";
import DefaultDropdownU from "../../../../../components/Dropdown/DefaultDropdownU";
import DefaultDropdown from "../../../../../components/Dropdown/DefaultDropdown";

const YourConsultantForm = ({
  handleSubmitVideoFor,
  branchOptions,
  branchLabel,
  branchValue,
  setBranchError,
  setBranchValue,
  setBranchLabel,
  selectBranch,
  branchError,
  countryName,
  countryLabel,
  setCountryLabel,
  countryValue,
  setCountryValue,
  setCountryError,
  selectCountry,
  countryError,
  homeAccept,
  setAcceptError,
  setHomeAccept,
  intAccept,
  setIntAccept,
  ukAccept,
  setUkAccept,
  acceptError,
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmitVideoFor}>
        <Card>
          <CardBody>
            <h5 className="fw-bold mb-3">video For</h5>
            <Row>
              <Col lg="8" md="8">
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>
                    Branch
                  </span>

                  <DefaultDropdown
                    label={branchLabel}
                    setLabel={setBranchLabel}
                    value={branchValue}
                    setValue={setBranchValue}
                    url="BranchDD/index"
                    name="BranchId"
                    selectAll={true}
                    error={branchError}
                    setError={setBranchError}
                    errorText="Branch is required"
                    action={() => {}}
                  />
                </FormGroup>
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span> Country
                  </span>
                  <DefaultDropdown
                    label={countryLabel}
                    setLabel={setCountryLabel}
                    value={countryValue}
                    setValue={setCountryValue}
                    url="CountryDD/index"
                    // name="BranchId"
                    selectAll={true}
                    error={countryError}
                    setError={setCountryError}
                    errorText="Country is required"
                    action={() => {}}
                  />
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span>
                    <b> Recruitment Type</b>
                  </span>

                  <Row>
                    <Col xs="2" sm="12" md="3" className="text-center mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => {
                            setHomeAccept(e.target.checked);
                            setAcceptError(false);
                          }}
                          checked={homeAccept}
                        />
                        <span className="mr-2">Home/UK </span>
                      </FormGroup>
                    </Col>

                    <Col xs="2" sm="12" md="3" className="text-center mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => {
                            setUkAccept(e.target.checked);
                            setAcceptError(false);
                          }}
                          checked={ukAccept}
                        />
                        <span className="mr-2">EU/EEU </span>
                      </FormGroup>
                    </Col>

                    <Col xs="2" sm="12" md="3" className="text-center mt-2">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => {
                            setIntAccept(e.target.checked);
                            setAcceptError(false);
                            console.log("Tria testing", e.target.checked);
                          }}
                          checked={intAccept}
                        />
                        <span className="mr-2">International </span>
                      </FormGroup>
                    </Col>
                  </Row>
                  {acceptError ? (
                    <span className="text-danger">
                      Recruitment type is required
                    </span>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <FormGroup className="mt-4 text-left">
          <SaveButton
            text="Continue"
            // progress={progress}
            // buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default YourConsultantForm;
