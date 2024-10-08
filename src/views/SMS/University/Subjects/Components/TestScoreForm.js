import React from "react";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { Form, FormGroup, Input, Col, Row } from "reactstrap";
import ButtonLoader from "../../../Components/ButtonLoader";

const TestScoreForm = ({
  submitScore,
  subjId,
  otherData,
  handleIeltsReq4,
  ieltsReq4,
  handleIeltsScore4,
  handleGreRequired4,
  greRequired4,
  handleGreScore4,
  handleGmatRequired4,
  gmatRequired4,
  handleGmatScore4,
  setShowForm,
  progress5,
  applicationTypeId,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Form onSubmit={submitScore}>
      <input type="hidden" name="subjectId" id="subjectId" value={subjId} />

      <input
        type="hidden"
        name="applicationTypeId"
        id="applicationTypeId"
        value={applicationTypeId}
      />

      {otherData?.testScore?.id ? (
        <input
          type="hidden"
          name="id"
          id="id"
          value={otherData?.testScore?.id}
        />
      ) : null}
      <Row>
        <Col md="3">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="8">
              <span>IELTS is Mandatory</span>
            </Col>
            <Col md="4">
              <Input
                className="ml-1"
                type="checkbox"
                onChange={handleIeltsReq4}
                checked={ieltsReq4}
              />
            </Col>
          </FormGroup>

          {ieltsReq4 ? (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span> IELTS Score
                </span>
                <Input
                  type="number"
                  name="IELTSscore"
                  id="IELTSscore"
                  min="5.5"
                  step="any"
                  placeholder="Ex: 7.5"
                  defaultValue={otherData?.testScore?.ieltSscore}
                  onChange={handleIeltsScore4}
                />
              </FormGroup>
            </>
          ) : (
            <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> IELTS Equivalent Score
              </span>

              <Input
                type="number"
                name="IELTSscore"
                id="IELTSscore"
                min="0"
                step="any"
                placeholder="Ex: 7.5"
                defaultValue={otherData?.testScore?.ieltSscore}
                required
                onChange={handleIeltsScore4}
              />
            </FormGroup>
          )}

          <FormGroup row className="has-icon-left position-relative">
            <Col md="8">
              <span>GRE is Mandatory</span>
            </Col>
            <Col md="4">
              <Input
                className="ml-1"
                type="checkbox"
                onChange={handleGreRequired4}
                checked={greRequired4}
              />
            </Col>
          </FormGroup>

          {greRequired4 ? (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span> GRE Score
                </span>

                <Input
                  type="number"
                  name="greScore"
                  id="greScore"
                  min="0"
                  step="any"
                  placeholder="Ex: 550"
                  defaultValue={otherData?.testScore?.greScore}
                  required
                  onChange={handleGreScore4}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>GRE Score</span>

                <Input
                  type="number"
                  name="greScore"
                  id="greScore"
                  min="0"
                  step="any"
                  placeholder="Ex: 550"
                  defaultValue={otherData?.testScore?.greScore}
                  onChange={handleGreScore4}
                />
              </FormGroup>
            </>
          )}

          <FormGroup row className="has-icon-left position-relative">
            <Col md="8">
              <span>GMAT is Mandatory</span>
            </Col>
            <Col md="4">
              <Input
                className="ml-1"
                type="checkbox"
                onChange={handleGmatRequired4}
                checked={gmatRequired4}
              />
            </Col>
          </FormGroup>

          {gmatRequired4 ? (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span> GMAT Score
                </span>

                <Input
                  type="number"
                  name="gmatScore"
                  id="gmatScore"
                  min="0"
                  step="any"
                  placeholder="Ex: 500"
                  defaultValue={otherData?.testScore?.gmatScore}
                  required
                  onChange={handleGmatScore4}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>GMAT Score</span>

                <Input
                  type="number"
                  name="gmatScore"
                  id="gmatScore"
                  min="0"
                  step="any"
                  placeholder="Ex: 500"
                  defaultValue={otherData?.testScore?.gmatScore}
                  onChange={handleGmatScore4}
                />
              </FormGroup>
            </>
          )}
        </Col>
      </Row>
      <div className="row">
        <div className="col-md-4 d-flex justify-content-start">
          {permissions?.includes(permissionList.Edit_Student) ||
          permissions?.includes(permissionList.Edit_Student) ? (
            <>
              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="save-button" type="submit">
                Save
              </button>
              {progress5 ? (
                <span>
                  <ButtonLoader />
                </span>
              ) : (
                <></>
              )}
            </>
          ) : null}
        </div>
      </div>
    </Form>
  );
};

export default TestScoreForm;
