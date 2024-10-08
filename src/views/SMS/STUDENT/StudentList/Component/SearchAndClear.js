import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import TagButton from "../../../../../components/buttons/TagButton";

import Branch from "../../../../../components/Dropdown/Filter";

const SearchAndClear = ({
  branch,
  branchLabel,
  setBranchLabel,
  branchValue,
  setBranchValue,
  studentTypeOption,
  studentTypeLabel,
  studentTypeValue,
  selectStudentType,
  type,
  searchStr,
  searchValue,
  handleClearSearch,
  handleKeyDown,
  userTypes,
  consultantLabel,
  consultantValue,
  consultantOption,
  selectConsultant,
  cId,
  statusLabel,
  statusValue,
  selectStatusType,
  statusOption,
  setStudentTypeLabel,
  setStudentTypeValue,
  setStatusValue,
  setStatusLabel,
  setConsultantValue,
  setConsultantLabel,
}) => {
  const userType = localStorage.getItem("userType");
  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="mb-2">
            <Col lg="4" md="3" sm="12" className="mb-2">
              <Select
                options={studentTypeOption}
                value={{ label: studentTypeLabel, value: studentTypeValue }}
                onChange={(opt) => selectStudentType(opt.label, opt.value)}
                name="UniversityTypeId"
                id="UniversityTypeId"
                isDisabled={type}
              />
            </Col>

            {userType !== userTypes?.Consultant ? (
              <Col lg="4" md="3" sm="12" className="mb-2">
                <Select
                  options={consultantOption}
                  value={{ label: consultantLabel, value: consultantValue }}
                  onChange={(opt) => selectConsultant(opt.label, opt.value)}
                  name="consultantId"
                  id="consultantId"
                  isDisabled={cId}
                />
              </Col>
            ) : null}
            <Col lg="4" md="3" sm="12" className="mb-2">
              <Select
                options={statusOption}
                value={{ label: statusLabel, value: statusValue }}
                onChange={(opt) => selectStatusType(opt.label, opt.value)}
                name="status"
                id="status"
              />
            </Col>

            {userType !== userTypes?.AdmissionManager &&
              userType !== userTypes?.ProviderAdmin &&
              userType !== userTypes?.AdmissionOfficer && (
                <>
                  {branch.length > 1 && (
                    <Col lg="4" md="3" sm="12" className="mb-2">
                      <Branch
                        data={branch}
                        label={branchLabel}
                        setLabel={setBranchLabel}
                        value={branchValue}
                        setValue={setBranchValue}
                        name=""
                        error={() => {}}
                        setError={() => {}}
                        action={() => {}}
                      />
                    </Col>
                  )}
                </>
              )}

            <Col lg="4" md="3" sm="12" className="mb-2">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="UAPP ID, Name, Email"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <div className="d-flex mt-1">
                  {studentTypeValue !== 0 ||
                  consultantValue !== 0 ||
                  statusValue !== 0
                    ? ""
                    : ""}
                  {studentTypeValue !== 0 ? (
                    <TagButton
                      label={studentTypeLabel}
                      setValue={() => setStudentTypeValue(0)}
                      setLabel={() => setStudentTypeLabel("Type")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                  {studentTypeValue !== 0 &&
                    (consultantValue !== 0 || statusValue !== 0 ? "" : "")}
                  {consultantValue !== 0 ? (
                    <TagButton
                      label={consultantLabel}
                      setValue={() => setConsultantValue(0)}
                      setLabel={() => setConsultantLabel("Select Consultant")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                  {consultantValue !== 0 && statusValue !== 0 ? "" : ""}
                  {statusValue !== 0 ? (
                    <TagButton
                      label={statusLabel}
                      setValue={() => setStatusValue(0)}
                      setLabel={() => setStatusLabel("Accounts Status")}
                    ></TagButton>
                  ) : (
                    ""
                  )}

                  {branchValue !== 0 ? (
                    <TagButton
                      label={branchLabel}
                      setValue={() => setBranchValue(0)}
                      setLabel={() => setBranchLabel("Select Branch")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {studentTypeValue !== 0 ||
                  consultantValue !== 0 ||
                  branchValue !== 0 ||
                  statusValue !== 0 ? (
                    <button className="tag-clear" onClick={handleClearSearch}>
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
    </div>
  );
};

export default SearchAndClear;
