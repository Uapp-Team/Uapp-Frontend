import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import TagButton from "../../../../../../components/buttons/TagButton";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const SelectAndClear = ({
  empOptiopns,
  empLabel,
  empValue,
  selectEmployeeType,
  type,
  branchOptions,
  branchLabel,
  branchValue,
  selectBranch,
  searchStr,
  setSearchStr,
  handleKeyDown,
  setBranchLabel,
  setBranchValue,
  setEmpLabel,
  setEmpValue,
  handleReset,
}) => {
  const userTypeId = localStorage.getItem("userType");

  return (
    <Card className="uapp-employee-search">
      <CardBody>
        <Row>
          <Col className="uapp-mb" md="4" sm="12">
            <Select
              options={empOptiopns}
              value={{ label: empLabel, value: empValue }}
              onChange={(opt) => selectEmployeeType(opt.label, opt.value)}
              name="employeeType"
              id="employeeType"
              isDisabled={type ? true : false}
            />
          </Col>

          {userTypeId !== userTypes?.BranchManager && (
            <Col className="uapp-mb" md="4" sm="12">
              <Select
                options={branchOptions}
                value={{ label: branchLabel, value: branchValue }}
                onChange={(opt) => selectBranch(opt.label, opt.value)}
                name="branchId"
                id="branchId"
                isDisabled={type ? true : false}
              />
            </Col>
          )}

          <Col className="uapp-mb" md="4" sm="12" style={{ display: "flex" }}>
            <Input
              style={{ height: "2.7rem" }}
              type="text"
              name="search"
              value={searchStr}
              id="search"
              placeholder="Id, Name, Email"
              onChange={(e) => setSearchStr(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <div className="mt-1 mx-1" style={{ display: "flex" }}>
                {empValue !== 0 || branchValue !== 0 ? "" : ""}
                {empValue !== 0 ? (
                  <TagButton
                    label={empLabel}
                    setValue={() => setEmpValue(0)}
                    setLabel={() => setEmpLabel("Select Staff Type")}
                  ></TagButton>
                ) : (
                  ""
                )}{" "}
                {empValue !== 0 && branchValue !== 0 ? "" : ""}
                {branchValue !== 0 ? (
                  <TagButton
                    label={branchLabel}
                    setValue={() => setBranchValue(0)}
                    setLabel={() => setBranchLabel("Select branch")}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="mt-1 mx-0 d-flex btn-clear">
                {empValue !== 0 || branchValue !== 0 ? (
                  <button className="tag-clear" onClick={handleReset}>
                    Clear All
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SelectAndClear;
