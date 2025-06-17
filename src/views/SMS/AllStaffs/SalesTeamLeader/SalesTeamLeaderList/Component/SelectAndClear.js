import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Select from "react-select";
import TagButton from "../../../../../../components/buttons/TagButton";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";
import Typing from "../../../../../../components/form/Typing";
import { AdminUsers } from "../../../../../../components/core/User";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const SelectAndClear = ({
  userType,
  branchId,
  branchOptions,
  branchLabel,
  branchValue,
  selectBranch,
  searchStr,
  setSearchStr,
  handleKeyDown,
  setBranchLabel,
  setBranchValue,
  handleReset,
  setIsTyping,
}) => {
  return (
    <Card className="uapp-employee-search">
      <CardBody className="search-card-body">
        <Row>
          {AdminUsers() && (
            <Col className="uapp-mb" md="4" sm="12">
              <Select
                options={branchOptions}
                value={{ label: branchLabel, value: branchValue }}
                onChange={(opt) => selectBranch(opt.label, opt.value)}
                name="branchId"
                id="branchId"
                isDisabled={branchId ? true : false}
              />
            </Col>
          )}

          <Col className="uapp-mb" md="4" sm="12">
            <Typing
              name="search"
              placeholder="Id, Name, Email"
              value={searchStr}
              setValue={setSearchStr}
              setIsTyping={setIsTyping}
              onKeyDown={handleKeyDown}
            />

            <div className="mt-1 d-flex justify-between-start">
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
                {branchValue !== 0 ? "" : ""}
                {userType === userTypes?.SystemAdmin && branchValue !== 0 ? (
                  <TagButton
                    label={branchLabel}
                    setValue={() => setBranchValue(0)}
                    setLabel={() => setBranchLabel("Select branch")}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="mt-1 mx-0 d-flex btn-clear mb-2">
                {userType === userTypes?.SystemAdmin && branchValue !== 0 ? (
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
