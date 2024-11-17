import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import TagButton from "../../../../../../components/buttons/TagButton";
import icon_info from "../../../../../../assets/img/icons/icon_info.png";
import Typing from "../../../../../../components/form/Typing";
import get from "../../../../../../helpers/get";
import Filter from "../../../../../../components/Dropdown/Filter";

const SelectAndClear = ({
  userType,
  providerMenu,
  proLabel,
  proValue,
  selectProviders,
  providerId,
  managerMenu,
  managerLabel,
  managerValue,
  selectManager,
  managerId,
  branchLabel,
  setBranchLabel,
  branchValue,
  setBranchValue,
  searchStr,
  searchValue,
  handleKeyDown,
  handleClearSearch,
  setManagerLabel,
  setManagerValue,
  setProLabel,
  setProValue,
  setIsTyping,
  setSearchStr,
}) => {
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });
  }, [setBranchLabel, setBranchValue]);
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

            {userType === userTypes?.AdmissionManager ||
            userType === userTypes?.ProviderAdmin ? null : (
              <Col lg="6" md="6" sm="12" xs="12" className="mb-2">
                <Select
                  options={providerMenu}
                  value={{ label: proLabel, value: proValue }}
                  onChange={(opt) => selectProviders(opt.label, opt.value)}
                  name="providerId"
                  id="providerId"
                  isDisabled={providerId !== undefined ? true : false}
                />
              </Col>
            )}
            {userType === userTypes?.AdmissionManager ? null : (
              <Col lg="6" md="6" sm="12" xs="12">
                <Select
                  options={managerMenu}
                  value={{ label: managerLabel, value: managerValue }}
                  onChange={(opt) => selectManager(opt.label, opt.value)}
                  name="admissionmanagerId"
                  id="admissionmanagerId"
                  isDisabled={managerId !== undefined ? true : false}
                />
              </Col>
            )}

            <Col lg="6" md="6" sm="12" xs="12">
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

          <Row className="mt-2">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <div className="d-flex mt-1">
                  {!providerId &&
                  proValue !== 0 &&
                  userType !== userTypes?.ProviderAdmin &&
                  userType !== userTypes?.AdmissionManager ? (
                    <TagButton
                      label={proLabel}
                      setValue={() => setProValue(0)}
                      setLabel={() => setProLabel("Select Provider")}
                    ></TagButton>
                  ) : (
                    ""
                  )}

                  {managerValue !== 0 &&
                  userType !== userTypes?.AdmissionManager ? (
                    <TagButton
                      label={managerLabel}
                      setValue={() => setManagerValue(0)}
                      setLabel={() =>
                        setManagerLabel("Select Admission Manager")
                      }
                    ></TagButton>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-1 mx-0 d-flex btn-clear">
                  {(!providerId &&
                    proValue !== 0 &&
                    userType !== userTypes?.ProviderAdmin &&
                    userType !== userTypes?.AdmissionManager) ||
                  (managerValue !== 0 &&
                    userType !== userTypes?.AdmissionManager) ? (
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

export default SelectAndClear;
