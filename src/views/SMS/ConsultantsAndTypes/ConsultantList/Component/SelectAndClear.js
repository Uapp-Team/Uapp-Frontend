import React, { useState } from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import TagButton from "../../../../../components/buttons/TagButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import Typing from "../../../../../components/form/Typing";
import Filter from "../../../../../components/Dropdown/Filter";
import { consultantTier } from "../../../../../constants/presetData";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

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
  setBranchLabel,
  setBranchValue,
  setEmpLabel,
  setEmpValue,
  statusTypeMenu,
  statusLabel,
  statusValue,
  setStatusLabel,
  setStatusValue,
  selectStatusType,
  handleKeyDown,
  handleReset,
  check,
  setCheck,
  checkBac,
  setCheckBac,
  tierLabel,
  setTierLabel,
  tierValue,
  setTierValue,
  setIsTyping,
  userTypeId,
  consSalesTeamLeaderMenu,
  SalesTeamLeaderLabel,
  SalesTeamLeaderValue,
  selectSalesTeamLeaderCons,
  setSalesTeamLeaderValue,
  setSalesTeamLeaderLabel,
  salesTrainingStatusLabel,
  salesTrainingStatusValue,
  salesTrainingStatusMenu,
  salesTrainingStatusType,
  setSalesTrainingStatusLabel,
  setSalesTrainingStatusValue,
  countryLabel,
  countryName,
  countryValue,
  selectCountry,
  nationalityCountryLabel,
  nationalityCountryName,
  nationalityCountryValue,
  selectNationalityCountry,
  setCountryLabel,
  setCountryValue,
  setNationalityCountryLabel,
  setNationalityCountryValue,
  data,
}) => {
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Card className="uapp-employee-search zindex-100">
      <CardBody>
        <Row>
          {branchOptions.length < 2 ? null : (
            <Col className="uapp-mb mb-2" md="3" sm="12">
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
          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Select
              options={countryName}
              value={{ label: countryLabel, value: countryValue }}
              onChange={(opt) => selectCountry(opt.label, opt.value)}
              name="countryId"
              id="countryId"
            />
          </Col>

          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Select
              options={nationalityCountryName}
              value={{
                label: nationalityCountryLabel,
                value: nationalityCountryValue,
              }}
              onChange={(opt) => selectNationalityCountry(opt.label, opt.value)}
              name="countryOfCitizenShipId"
              id="countryOfCitizenShipId"
            />
          </Col>

          {userTypeId === userTypes?.SystemAdmin ||
          userTypeId === userTypes?.Admin ||
          userTypeId === userTypes?.BranchAdmin ||
          userTypeId === userTypes?.BranchManager ||
          userTypeId === userTypes?.SalesManager ? (
            <Col className="uapp-mb mb-2" md="3" sm="12">
              <Select
                className="form-mt"
                options={consSalesTeamLeaderMenu}
                value={{
                  label: SalesTeamLeaderLabel,
                  value: SalesTeamLeaderValue,
                }}
                onChange={(opt) =>
                  selectSalesTeamLeaderCons(opt.label, opt.value)
                }
                name="salesTeamLeaderId"
                id="salesTeamLeaderId"
              />
            </Col>
          ) : null}
          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Select
              options={empOptiopns}
              value={{ label: empLabel, value: empValue }}
              onChange={(opt) => selectEmployeeType(opt.label, opt.value)}
              name="employeeType"
              id="employeeType"
              isDisabled={type ? true : false}
            />
          </Col>

          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Select
              options={statusTypeMenu}
              value={{
                label: statusLabel,
                value: statusValue,
              }}
              onChange={(opt) => selectStatusType(opt.label, opt.value)}
              name="consultantTypeId"
              id="consultantTypeId"
              // isDisabled={type ? true : false}
            />
          </Col>

          {permissions?.includes(
            permissionList.Change_Consultant_Sales_Training_Status
          ) ? (
            <>
              <Col className="uapp-mb mb-2" md="3" sm="12">
                <Select
                  options={salesTrainingStatusMenu}
                  value={{
                    label: salesTrainingStatusLabel,
                    value: salesTrainingStatusValue,
                  }}
                  onChange={(opt) =>
                    salesTrainingStatusType(opt.label, opt.value)
                  }
                  name="salesTrainingStatus"
                  id="salesTrainingStatus"
                  // isDisabled={type ? true : false}
                />
              </Col>
            </>
          ) : null}

          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Filter
              data={[
                {
                  id: null,
                  name: "All Tier",
                },
                ...consultantTier,
              ]}
              label={tierLabel}
              setLabel={setTierLabel}
              value={tierValue}
              setValue={setTierValue}
            />
          </Col>

          <Col className="uapp-mb mb-2" md="3" sm="12">
            <Typing
              name="search"
              placeholder="Id, Name, Email ,Phone number"
              value={searchStr}
              setValue={setSearchStr}
              setIsTyping={setIsTyping}
              onKeyDown={handleKeyDown}
            />

            <div className="mt-1 d-flex justify-between ">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <div className="pl-2" style={{ paddingTop: "2px" }}>
                <span>Name should not include title.</span>
              </div>
            </div>
          </Col>
          <Col
            className="uapp-mb mt-3 mb-2 d-flex justify-content-between"
            md="3"
            sm="12"
          >
            <div>
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={check}
              />{" "}
              <span>Is From Student?</span>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setCheckBac(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={checkBac}
              />{" "}
              <span>BAC Certificate</span>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col className="uapp-mb mb-2" md="2" sm="12">
            <div>
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={check}
              />{" "}
              <span>Is From Student?</span>
            </div>
          </Col>
          <Col className="uapp-mb mb-2" md="2" sm="12">
            <div>
              <input
                onChange={(e) => {
                  setCheckBac(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={checkBac}
              />{" "}
              <span>BAC Certificate</span>
            </div>
          </Col>
        </Row> */}

        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <div className="mt-1 mx-1" style={{ display: "flex" }}>
                {countryValue !== 0 ||
                nationalityCountryValue !== 0 ||
                salesTrainingStatusValue !== 0 ||
                SalesTeamLeaderValue !== 0 ||
                empValue !== 0 ||
                branchValue !== 0 ||
                statusValue !== 0
                  ? ""
                  : ""}

                {countryValue !== 0 ? (
                  <TagButton
                    label={countryLabel}
                    setValue={() => setCountryValue(0)}
                    setLabel={() => setCountryLabel("Select Country")}
                  ></TagButton>
                ) : (
                  ""
                )}

                {countryValue !== 0 &&
                  (nationalityCountryValue !== 0 ||
                  salesTrainingStatusValue !== 0 ||
                  SalesTeamLeaderValue !== 0 ||
                  empValue !== 0 ||
                  branchValue !== 0 ||
                  statusValue !== 0
                    ? ""
                    : "")}

                {nationalityCountryValue !== 0 ? (
                  <TagButton
                    label={nationalityCountryLabel}
                    setValue={() => setNationalityCountryValue(0)}
                    setLabel={() =>
                      setNationalityCountryLabel("Select Nationality")
                    }
                  ></TagButton>
                ) : (
                  ""
                )}

                {nationalityCountryValue !== 0 &&
                  (salesTrainingStatusValue !== 0 ||
                  SalesTeamLeaderValue !== 0 ||
                  empValue !== 0 ||
                  branchValue !== 0 ||
                  statusValue !== 0
                    ? ""
                    : "")}

                {salesTrainingStatusValue !== 0 ? (
                  <TagButton
                    label={salesTrainingStatusLabel}
                    setValue={() => setSalesTrainingStatusValue(0)}
                    setLabel={() =>
                      setSalesTrainingStatusLabel("Select Sales Training")
                    }
                  ></TagButton>
                ) : (
                  ""
                )}
                {salesTrainingStatusValue !== 0 &&
                  (SalesTeamLeaderValue !== 0 ||
                  empValue !== 0 ||
                  branchValue !== 0 ||
                  statusValue !== 0
                    ? ""
                    : "")}

                {SalesTeamLeaderValue !== 0 ? (
                  <TagButton
                    label={SalesTeamLeaderLabel}
                    setValue={() => setSalesTeamLeaderValue(0)}
                    setLabel={() =>
                      setSalesTeamLeaderLabel("Select Sales Team Leader")
                    }
                  ></TagButton>
                ) : (
                  ""
                )}
                {SalesTeamLeaderValue !== 0 &&
                  (empValue !== 0 || branchValue !== 0 || statusValue !== 0
                    ? ""
                    : "")}

                {empValue !== 0 ? (
                  <TagButton
                    label={empLabel}
                    setValue={() => setEmpValue(0)}
                    setLabel={() => setEmpLabel("Select Consultant Type")}
                  ></TagButton>
                ) : (
                  ""
                )}

                {empValue !== 0 &&
                  (branchValue !== 0 || statusValue !== 0 ? "" : "")}

                {branchValue !== 0 ? (
                  <TagButton
                    label={branchLabel}
                    setValue={() => setBranchValue(0)}
                    setLabel={() => setBranchLabel("Select Status")}
                  />
                ) : (
                  ""
                )}

                {branchValue !== 0 && statusValue !== 0 ? "" : ""}

                {statusValue !== 0 ? (
                  <TagButton
                    label={statusLabel}
                    setValue={() => setStatusValue(0)}
                    setLabel={() => setStatusLabel("Account Status")}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="mt-1 mx-0 d-flex btn-clear">
                {countryValue !== 0 ||
                nationalityCountryValue !== 0 ||
                salesTrainingStatusValue !== 0 ||
                SalesTeamLeaderValue !== 0 ||
                empValue !== 0 ||
                branchValue !== 0 ||
                statusValue !== 0 ? (
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
