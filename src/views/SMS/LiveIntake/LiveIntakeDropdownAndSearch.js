import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Typing from "../../../components/form/Typing";
import Filter from "../../../components/Dropdown/Filter";
import DefaultDropdownU from "../../../components/Dropdown/DefaultDropdownU";

const LiveIntakeDropdownAndSearch = ({
  setIsTyping,
  setSearchStr,
  searchStr,
  handleKeyDown,
  intakeRngDD,
  setIntakeRngDD,
  setIntakeRngLabel,
  intakeRngLabel,
  setIntakeRngValue,
  intakeRngValue,
  intake,
  setIntake,
  universityDD,
  universityLabel,
  universityValue,
  setUniversityLabel,
  setUniversityValue,
  campusDD,
  campusLabel,
  campusValue,
  setCampusLabel,
  setCampusValue,
  recruitmentDD,
  recruitmentLabel,
  recruitmentValue,
  setRecruitmentLabel,
  setRecruitmentValue,
  deliveryPatternDD,
  deliveryPatternLabel,
  deliveryPatternValue,
  setDeliveryPatternLabel,
  setDeliveryPatternValue,
}) => {
  return (
    <div>
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="3" md="3" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              <Typing
                name="search"
                id="search"
                placeholder="Name, Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={handleKeyDown}
              />
            </Col>

            <Col
              lg="9"
              md="9"
              sm="12"
              xs="12"
              className="mt-md-0 mt-sm-3 d-flex justify-content-md-end justify-content-sm-start"
            >
              <div
                className=" mr-4 mb-1 d-flex align-items-center"
                style={{ marginTop: "-17px" }}
              >
                <span className="mr-1 fw-500">Intake Range:</span>
                <Filter
                  data={intakeRngDD}
                  label={intakeRngLabel}
                  setLabel={setIntakeRngLabel}
                  value={intakeRngValue}
                  setValue={setIntakeRngValue}
                  action={() => {}}
                  isDisabled={false}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg="2" md="2" sm="2" xs="12" className="mb-2">
              <DefaultDropdownU
                label={universityLabel}
                setLabel={setUniversityLabel}
                value={universityValue}
                setValue={setUniversityValue}
                url="University/get-dd"
                className="mb-3"
              />
            </Col>
            <Col lg="2" md="2" sm="2" xs="12" className="mb-2">
              <Filter
                data={campusDD}
                label={campusLabel}
                setLabel={setCampusLabel}
                value={campusValue}
                setValue={setCampusValue}
                action={() => {}}
                isDisabled={false}
              />
            </Col>
            <Col lg="2" md="2" sm="2" xs="12" className="mb-2">
              <Filter
                data={recruitmentDD}
                label={recruitmentLabel}
                setLabel={setRecruitmentLabel}
                value={recruitmentValue}
                setValue={setRecruitmentValue}
                action={() => {}}
                isDisabled={false}
              />
            </Col>
            <Col lg="2" md="2" sm="2" xs="12" className="mb-2">
              <Filter
                data={deliveryPatternDD}
                label={deliveryPatternLabel}
                setLabel={setDeliveryPatternLabel}
                value={deliveryPatternValue}
                setValue={setDeliveryPatternValue}
                action={() => {}}
                isDisabled={false}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default LiveIntakeDropdownAndSearch;
