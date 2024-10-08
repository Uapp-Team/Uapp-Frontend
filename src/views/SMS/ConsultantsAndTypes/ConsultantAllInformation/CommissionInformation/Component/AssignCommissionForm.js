import React from "react";
import { FormGroup, Form, Col, Button } from "reactstrap";
import ButtonLoader from "../../../../Components/ButtonLoader";
import CustomButtonRipple from "../../../../Components/CustomButtonRipple";
import Select from "react-select";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
// import icon_info from "../../../../../assets/img/icons/icon_info.png";

const AssignCommissionForm = ({
  handleSubmit,
  consultantRegisterId,
  commissionMenu,
  commissionValue,
  commissionLabel,
  selectCommission,
  commissionError,
  checked,
  setChecked,
  priceRangeList,
  setShowForm,
  setCommissionLabel,
  setCommissionValue,
  showForm,
  progress,
  buttonStatus,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <>
      {permissions?.includes(permissionList?.Assign_Commission_Group) ? (
        <div
          className="mt-1 mb-4 d-flex justify-content-between cardborder"
          style={{ backgroundColor: "#F8FAFA" }}
        >
          <Form onSubmit={handleSubmit} className="mt-1">
            <input
              type="hidden"
              name="consultantId"
              id="consultantId"
              value={consultantRegisterId}
            />
            <p className="Assign-Commission">
              Assign Commission (This commission group will be default
              commission group and all existings will be disabled)
            </p>

            <FormGroup row className="has-icon-left position-relative">
              <>
                <Col md="6">
                  <Select
                    options={commissionMenu}
                    value={{ label: commissionLabel, value: commissionValue }}
                    onChange={(opt) => selectCommission(opt.label, opt.value)}
                    name="commissionGroupId"
                    id="commissionGroupId"
                  />

                  {commissionError && (
                    <span className="text-danger">
                      Commission group is required
                    </span>
                  )}
                </Col>
              </>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <>
                <Col md="6">
                  <div className="d-flex">
                    <span>
                      {" "}
                      <label className="switch">
                        <input
                          type="checkbox"
                          defaultChecked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </span>
                    <span className="ml-1" style={{ marginTop: "-2px" }}>
                      Applies for all applications
                    </span>
                  </div>
                </Col>
              </>
            </FormGroup>
            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "left" }}
            >
              {priceRangeList.length < 1 ? null : (
                <CancelButton
                  cancel={() => {
                    setShowForm(!showForm);
                    setCommissionLabel("Select Commission");
                    setCommissionValue(0);
                    setChecked(false);
                  }}
                />
              )}

              <SaveButton progress={progress} buttonStatus={buttonStatus} />
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="12">
                <div className="mt-1 d-flex justify-between cardborder">
                  <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                  <div className="pl-3">
                    <span>
                      Note : If a new commission group is applied to all
                      applications, the commission amount will be changed and it
                      cannot be reverted.
                    </span>
                  </div>
                </div>
              </Col>
            </FormGroup>
          </Form>
        </div>
      ) : null}
    </>
  );
};

export default AssignCommissionForm;
