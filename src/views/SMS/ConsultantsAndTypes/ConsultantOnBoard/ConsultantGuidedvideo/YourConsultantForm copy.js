import React from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import SaveButton from "../../../../../components/buttons/SaveButton";

const YourConsultantForm = ({
  handleSubmitVideoFor,
  branchOptions,
  branchLabel,
  branchValue,
  selectBranch,
  branchError,
  countryName,
  countryLabel,
  countryValue,
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

                  <Select
                    className="form-mt"
                    options={branchOptions}
                    value={{ label: branchLabel, value: branchValue }}
                    onChange={(opt) => selectBranch(opt.label, opt.value)}
                    name="BranchId"
                    id="BranchId"
                    // isDisabled={consultantRegisterId ? true : false}
                  />

                  {branchError && (
                    <span className="text-danger">Branch is required</span>
                  )}
                </FormGroup>
                <FormGroup className="has-icon-left position-relative">
                  <span>
                    <span className="text-danger">*</span> Country
                  </span>

                  <Select
                    options={countryName}
                    value={{ label: countryLabel, value: countryValue }}
                    onChange={(opt) => selectCountry(opt.label, opt.value)}
                    required
                  />
                  {countryError && (
                    <span className="text-danger">Country is required</span>
                  )}
                </FormGroup>

                <FormGroup className="has-icon-left position-relative">
                  <span>
                    {/* <span className="text-danger">*</span> */}
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
