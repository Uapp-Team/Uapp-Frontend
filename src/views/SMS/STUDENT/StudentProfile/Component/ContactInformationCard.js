import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ContactInformationCard = ({ sId, contactData, setContactData }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  console.log(sId);
  useEffect(() => {
    get(`StudentAddress/GetByStudentId/${sId}`).then((res) => {
      setContactData(res);
    });
  }, [sId, setContactData]);
  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Contact Information</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentContactInformation/${sId}/${1}`}>Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      {contactData?.map((contact, i) => (
        <div
          className="col-12 border p-2 rounded mb-3"
          style={{ textAlign: "left" }}
        >
          <Card>
            <CardBody>
              <span className="card-heading">{contact?.addressType?.name}</span>
              <hr />
              <Row className="text-gray">
                <Col md="4">
                  <p>
                    <span>Address Line 1</span>
                    <br />
                    <b>{contact?.addressLine}</b>
                  </p>
                  <p>
                    <span>Address Line 2</span>
                    <br />
                    <b>{contact?.houseNo}</b>
                  </p>
                </Col>
                <Col md="4">
                  <p>
                    <span>City</span>
                    <br />
                    <b>{contact?.city}</b>
                  </p>
                  <p>
                    <span>State/County</span>
                    <br />
                    <b>{contact?.state}</b>
                  </p>
                </Col>
                <Col md="4">
                  <p>
                    <span>Zip/Post Code</span>
                    <br />
                    <b> {contact?.zipCode}</b>
                  </p>
                  <p>
                    <span>Country</span>
                    <br />
                    <b> {contact?.country?.name}</b>
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

export default ContactInformationCard;
