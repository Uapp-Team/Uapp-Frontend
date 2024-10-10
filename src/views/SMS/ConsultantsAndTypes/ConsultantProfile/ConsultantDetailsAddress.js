import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import get from "../../../../helpers/get";

const ConsultantAddressAddress = ({ id }) => {
  const [ConsultantAddress, setConsultantAddress] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ConsultantAddress/GetByConsultant/${id}`).then((res) => {
      setConsultantAddress(res);
      console.log(res, "Consultant address");
    });
  }, [id, setConsultantAddress]);
  return (
    <div className="mb-4">
      <>
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Contact Information</b>
            </td>
          </thead>
        </Table>

        {ConsultantAddress ? (
          <div
            className="col-12 border p-2 rounded mb-3"
            style={{ textAlign: "left" }}
          >
            <Card>
              <CardBody>
                <Row className="text-gray">
                  <Col md="4">
                    <p>
                      <span>House No</span>
                      <br />
                      <b>{ConsultantAddress?.houseNo}</b>
                    </p>
                    <p>
                      <span>Address Line</span>
                      <br />
                      <b>{ConsultantAddress?.addressLine}</b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>City</span>
                      <br />
                      <b>{ConsultantAddress?.city}</b>
                    </p>
                    <p>
                      <span>State/County</span>
                      <br />
                      <b>{ConsultantAddress?.state}</b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>Zip/Post Code</span>
                      <br />
                      <b> {ConsultantAddress?.zipCode}</b>
                    </p>
                    <p>
                      <span>Country</span>
                      <br />
                      <b> {ConsultantAddress?.country?.name}</b>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ) : (
          <span className="pl-10px">No Contact added.</span>
        )}
      </>
    </div>
  );
};

export default ConsultantAddressAddress;
