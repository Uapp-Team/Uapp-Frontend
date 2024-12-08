import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import TagButton from "../../../../../../components/buttons/TagButton";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";
import Typing from "../../../../../../components/form/Typing";
import get from "../../../../../../helpers/get";
import Filter from "../../../../../../components/Dropdown/Filter";

const AddMissionManagerClear = ({
  userType,
  userTypes,
  providerMenu,
  providerLabel,
  providerValue,
  selectProvider,
  branchLabel,
  setBranchLabel,
  branchValue,
  setBranchValue,
  searchStr,
  searchValue,
  handleKeyDown,
  handleClearSearch,
  setProviderLabel,
  setProviderValue,
  providerId,
  setIsTyping,
  setSearchStr,
  branch,
  setBranch,
}) => {
  return (
    <div>
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row>
            {branch.length > 1 && (
              <Col lg="6" md="6" sm="6" xs="12" className="mb-2">
                <Filter
                  data={branch}
                  label={branchLabel}
                  setLabel={setBranchLabel}
                  value={branchValue}
                  setValue={setBranchValue}
                />
              </Col>
            )}

            {userType === userTypes?.ProviderAdmin ? null : (
              <Col lg="6" md="6" sm="6" xs="12" className="mb-2">
                <Select
                  options={providerMenu}
                  value={{ label: providerLabel, value: providerValue }}
                  onChange={(opt) => selectProvider(opt.label, opt.value)}
                  name="providerId"
                  id="providerId"
                  isDisabled={providerId ? true : false}
                />
              </Col>
            )}

            <Col lg="6" md="6" sm="6" xs="12">
              <Typing
                name="search"
                id="search"
                placeholder="Name, Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
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

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <div className="mt-1">
                  {!providerId && providerValue !== 0 && (
                    <TagButton
                      label={providerLabel}
                      setValue={() => setProviderValue(0)}
                      setLabel={() => setProviderLabel("Select Provider")}
                    ></TagButton>
                  )}
                </div>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {!providerId && providerValue !== 0 ? (
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

export default AddMissionManagerClear;
