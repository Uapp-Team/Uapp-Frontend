import React, { useState } from "react";
import { Col, Form, FormGroup, Input } from "reactstrap";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import ReactQuill from "react-quill";

const AddCommissionSetting = ({
  progress,
  value,
  setValue,
  buttonStatus,
  handleSubmit,
  modules,
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit} className="mt-5">
        <div className="hedding-titel d-flex justify-content-between mb-4">
          <div>
            <h5>
              {" "}
              <b>Add Commission Setting</b>{" "}
            </h5>

            <div className="bg-h"></div>
          </div>
        </div>
        <div className="container">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                Commission Percentage <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="9">
              <Input
                type="number"
                name="DefaultCommissionPercentage"
                id="DefaultCommissionPercentage"
                placeholder="Commission Percentage"
                required
                // defaultValue={data?.defaultCommissionPercentage}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                Commission Limit <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="9">
              <Input
                type="number"
                name="LowerCommissionLimit"
                id="LowerCommissionLimit"
                placeholder="Commission Limit"
                required
                // defaultValue={data?.lowerCommissionLimit}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                Commission Policy
                {/* <span className="text-danger">*</span>{" "} */}
              </span>
            </Col>
            <Col md="9">
              <div>
                <ReactQuill
                  theme="snow"
                  value={value}
                  modules={modules}
                  className="commission-Policy"
                  onChange={setValue}
                />
              </div>
            </Col>
          </FormGroup>

          <FormGroup
            row
            className="has-icon-left position-relative"
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "100px",
            }}
          >
            <Col md="1">
              <ButtonForFunction
                type={"submit"}
                name={progress ? <ButtonLoader /> : "Save"}
                className={"mt-3 badge-primary"}
                disable={buttonStatus}
              />
            </Col>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};

export default AddCommissionSetting;
