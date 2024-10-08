import Select from "react-select";
import React from "react";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import TagButton from "../../../../../../components/buttons/TagButton";

const AddMissionManagerClear = ({
  userType,
  userTypes,
  providerMenu,
  providerLabel,
  providerValue,
  selectProvider,
  searchStr,
  searchValue,
  handleKeyDown,
  handleClearSearch,
  setProviderLabel,
  setProviderValue,
  providerId,
}) => {
  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row>
            {userType === userTypes?.ProviderAdmin ? null : (
              <Col lg="6" md="6" sm="6" xs="12" className="mb-2">
                <Select
                  options={providerMenu}
                  value={{ label: providerLabel, value: providerValue }}
                  onChange={(opt) => selectProvider(opt.label, opt.value)}
                  name="providerId"
                  id="providerId"
                />
              </Col>
            )}

            <Col lg="6" md="6" sm="6" xs="12">
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
                <div className="mt-1">
                  {providerValue !== 0 && (
                    <TagButton
                      label={providerLabel}
                      setValue={() => setProviderValue(0)}
                      setLabel={() => setProviderLabel("Select Provider")}
                    ></TagButton>
                  )}
                </div>
                <div className="mt-1 mx-1 d-flex btn-clear">
                  {providerValue !== 0 ? (
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
