import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import Select from "react-select";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import TagButton from "../../../../../../components/buttons/TagButton";

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
  searchStr,
  searchValue,
  handleKeyDown,
  handleClearSearch,
  setManagerLabel,
  setManagerValue,
  setProLabel,
  setProValue,
}) => {
  // console.log(proValue);
  // console.log(managerValue);
  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row>
            {userType === userTypes?.AdmissionManager ||
            userType === userTypes?.ProviderAdmin ? null : (
              <Col lg="6" md="6" sm="12" xs="12" className="mb-2">
                <Select
                  options={providerMenu}
                  value={{ label: proLabel, value: proValue }}
                  onChange={(opt) => selectProviders(opt.label, opt.value)}
                  name="admissionmanagerId"
                  id="admissionmanagerId"
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
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Name"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "start" }}>
                <div className="d-flex mt-1">
                  {proValue !== 0 &&
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
                  {(proValue !== 0 &&
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
