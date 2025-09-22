import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import Filter from "../../../../components/Dropdown/Filter";
import icon_info from "../../../../assets/img/icons/icon_info.png";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import TagButton from "../../../../components/buttons/TagButton";

const SearchAndClear = ({
  branchId,
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
  check,
  setCheck,
  setCompanionLabel,
  companionLabel,
  companionValue,
  setCompanionValue,
  handleReset,
}) => {
  const userType = localStorage.getItem("userType");
  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  return (
    <div>
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row className="">
            {branch.length > 1 && (
              <Col lg="4" md="3" sm="12" className="mb-2 ">
                <Filter
                  data={branch}
                  label={branchLabel}
                  setLabel={setBranchLabel}
                  value={branchValue}
                  setValue={setBranchValue}
                />
              </Col>
            )}

            {adminPermission ? (
              <Col lg="4" md="3" sm="12" className="mb-2 ">
                <Select
                  options={consultantOption}
                  value={{ label: consultantLabel, value: consultantValue }}
                  onChange={(opt) => selectConsultant(opt.label, opt.value)}
                  name="consultantId"
                  id="consultantId"
                  isDisabled={cId ? true : false}
                />
              </Col>
            ) : null}

            <Col lg="4" md="3" sm="12" className="mb-2 ">
              <DefaultDropdown
                label={companionLabel}
                setLabel={setCompanionLabel}
                value={companionValue}
                setValue={setCompanionValue}
                url="ReferrerDD"
                name="status"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </Col>

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
              <div className="mt-1 d-flex justify-between">
                <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                <div className="pl-2" style={{ paddingTop: "2px" }}>
                  <span>Name should not include title.</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div className="d-flex justify-between-start">
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {userType === userTypes?.SystemAdmin && branchValue !== 0 ? (
                    <TagButton
                      label={branchLabel}
                      setValue={() => setBranchValue(0)}
                      setLabel={() => setBranchLabel("Select branch")}
                    />
                  ) : (
                    ""
                  )}
                  {adminPermission && consultantValue !== 0 ? (
                    <TagButton
                      label={consultantLabel}
                      setValue={() => setConsultantValue(0)}
                      setLabel={() => setConsultantLabel("Select Consultant")}
                    ></TagButton>
                  ) : (
                    ""
                  )}{" "}
                  {consultantValue !== 0 && companionValue !== 0 ? "" : ""}
                  {companionValue !== 0 ? (
                    <TagButton
                      label={companionLabel}
                      setValue={() => setCompanionValue(0)}
                      setLabel={() => setCompanionLabel("Select Referrer")}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear mb-2">
                  {(userType === userTypes?.SystemAdmin && branchValue !== 0) ||
                  (adminPermission && consultantValue !== 0) ||
                  companionValue !== 0 ? (
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
    </div>
  );
};

export default SearchAndClear;
