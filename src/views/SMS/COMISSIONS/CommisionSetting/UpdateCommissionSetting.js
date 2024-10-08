import React from "react";
import { Button, Col, Form, FormGroup, Input } from "reactstrap";
import ReactQuill from "react-quill";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";

const UpdateCommissionSetting = ({
  handleSubmitCommission,
  data,
  value,
  modules,
  setValue,
  closeShowForm,
  permissions,
  permissionList,
  buttonStatus1,
  progress1,
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmitCommission} className="mt-5">
        <div className="hedding-titel d-flex justify-content-between mb-4">
          <div>
            <h5>
              {" "}
              <b>Update Commission Setting</b>{" "}
            </h5>

            <div className="bg-h"></div>
          </div>
        </div>
        <p className="text-danger">
          Note: Updating commission setting and policy will impact on commission
          calculation. Make sure that you acknowledge the risk.
        </p>
        <input type="hidden" name="id" id="id" value={data?.id} />

        <div className="container">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                Default Commission Percentage
                <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="9">
              <Input
                type="text"
                name="DefaultCommissionPercentage"
                id="DefaultCommissionPercentage"
                placeholder="
                    "
                required
                defaultValue={data?.defaultCommissionPercentage}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>
                Lower Commission Calculation Limit{" "}
                <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="9">
              <Input
                type="text"
                name="LowerCommissionLimit"
                id="LowerCommissionLimit"
                placeholder=""
                required
                defaultValue={data?.lowerCommissionLimit}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3">
              <span>Uapp Commission Policy</span>
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
            <Col md="3" style={{ display: "flex", justifyContent: "end" }}>
              <div className="ml-xl-4 ml-0 update">
                <Button
                  onClick={closeShowForm}
                  className={"mr-1 mt-3"}
                  color="danger"
                >
                  Cancel
                </Button>

                {permissions?.includes(permissionList.Edit_Student) ? (
                  <ButtonForFunction
                    type={"submit"}
                    name={progress1 ? <ButtonLoader /> : "Save"}
                    className={"mt-3 badge-primary"}
                    disable={buttonStatus1}
                  />
                ) : null}
              </div>
            </Col>
            {/* <col md="4"></col> */}
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};

export default UpdateCommissionSetting;
