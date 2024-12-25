import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import get from "../../../../../helpers/get";

const EmergencyContactCard = ({
  sId,
  emergencyContactList,
  setEmergencyContactList,
  activity,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`StudentEmergency/GetByStudentId/${sId}`).then((res) => {
      setEmergencyContactList(res);
    });
  }, [sId, setEmergencyContactList]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Emergency Contact Information</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentEmergencyInformation/${sId}/${1}`}>
                Edit
              </Link>
            ) : null}
          </td>
        </thead>
      </Table>
      {emergencyContactList?.length > 0 &&
        emergencyContactList?.map((contact, i) => (
          <div
            key={i}
            className="col-12 border p-2 rounded mb-3"
            style={{ textAlign: "left" }}
          >
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <span className="card-heading">
                    Emergency Contact {i + 1}
                  </span>
                </div>
                <hr />
                <Row className="text-gray">
                  <Col md="4">
                    <p>
                      <span>Name </span>
                      <br />
                      <b>{contact?.personName}</b>
                    </p>
                    <p>
                      <span>Relation</span>
                      <br />
                      <b> {contact?.relationship}</b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>Phone</span>
                      <br />
                      <b>
                        {contact?.phoneNumber &&
                        contact?.phoneNumber.includes("+")
                          ? contact?.phoneNumber
                          : contact?.phoneNumber &&
                            !contact?.phoneNumber.includes("+")
                          ? "+" + contact?.phoneNumber
                          : null}
                      </b>
                    </p>
                    <p>
                      <span>Email</span>
                      <br />
                      <b> {contact?.emailAddress} </b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>Address</span>
                      <br />
                      <b>
                        {contact?.city && contact?.city}{" "}
                        {contact?.state && "," + contact?.state}
                      </b>
                    </p>
                    <p>
                      <span>Country</span>
                      <br />
                      <b> {contact?.countryName}</b>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ))}
    </>
  );
};

export default EmergencyContactCard;
