import React, { useEffect } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const ContactInformationCard = ({ sId, contactData, setContactData }) => {
  useEffect(() => {
    get(`StudentAddress/GetByStudentId/${sId}`).then((res) => {
      setContactData(res);
      console.log(res, "contact");
    });
  }, [sId, setContactData]);
  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Contact Information</b>
          </td>
          <td className="border-0 text-right"></td>
        </thead>
      </Table>

      {contactData.map((contact, i) => (
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
                    <span>House No</span>
                    <br />
                    <b>{contact?.houseNo}</b>
                  </p>
                  <p>
                    <span>Address Line</span>
                    <br />
                    <b>{contact?.addressLine}</b>
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
