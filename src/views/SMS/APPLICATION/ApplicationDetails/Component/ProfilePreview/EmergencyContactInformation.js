import React, { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import get from "../../../../../../helpers/get";

const EmergencyContactInformation = ({
  sId,
  emergencyContactList,
  setEmergencyContactList,
}) => {
  useEffect(() => {
    get(`StudentEmergency/GetByStudentId/${sId}`).then((res) => {
      console.log("StudentEmergency", res);
      setEmergencyContactList(res);
    });
  }, [sId, setEmergencyContactList]);

  return (
    <>
      <div
        className="col-12 border p-2 rounded mb-3"
        style={{ textAlign: "left" }}
      >
        <Card>
          <CardBody>
            <span className="card-heading">Emergency Contact</span>
            <hr />
            <Row className="text-gray">
              <Col md="4">
                <p>
                  <span>Name </span>
                  <br />
                  <b>{emergencyContactList?.personName}</b>
                </p>
                <p>
                  <span>Relation</span>
                  <br />
                  <b> {emergencyContactList?.relationship}</b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>Phone</span>
                  <br />
                  <b> {emergencyContactList?.phoneNumber}</b>
                </p>
                <p>
                  <span>Email</span>
                  <br />
                  <b> {emergencyContactList?.emailAddress} </b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>Address</span>
                  <br />
                  <b>
                    {emergencyContactList?.state} {emergencyContactList?.city}
                  </b>
                </p>
                <p>
                  <span>Country</span>
                  <br />
                  <b> {emergencyContactList?.country?.name}</b>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default EmergencyContactInformation;
