import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import Filter from "../../../../components/Dropdown/Filter";
import icon_info from "../../../../assets/img/icons/icon_info.png";
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
}) => {
  const userType = localStorage.getItem("userType");
  return (
    <div>
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row className="">
            {userType !== userTypes?.Consultant ? (
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
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchAndClear;
