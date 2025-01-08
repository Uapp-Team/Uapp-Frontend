import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { userTypes } from "../../../../constants/userTypeConstant";

const BankDetails = ({ companionProfileData, companionId, referenceId }) => {
  const userType = localStorage.getItem("userType");
  const [data, setData] = useState({});

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Bank Details</b>
          </td>
          <td className="border-0 text-right">
            {companionId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/companionBankInfo/${companionId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      {companionProfileData?.data?.bankDetails.map((details) => (
        <div className="col-12 border p-2 rounded mb-3" key={details?.id}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <span className="card-heading">{details?.bankName}</span>
              </div>
              <hr />
              <Row className="text-gray">
                <Col md="4">
                  <p>
                    <span>Account name</span>
                    <br />
                    <b>{details?.accountName}</b>
                  </p>
                  <p>
                    <span>Account number</span>
                    <br />
                    <b>{details?.accountNumber}</b>
                  </p>
                </Col>
                <Col md="4">
                  <p>
                    <span>Sort code</span>
                    <br />
                    <b>{details?.sortCode}</b>
                  </p>
                  <p>
                    <span>Bank Address</span>
                    <br />
                    <b>{details?.bankAddress}</b>
                  </p>
                </Col>
                <Col md="4">
                  <p>
                    <span>BIC</span>
                    <br />
                    <b>{details?.bic}</b>
                  </p>
                  <p>
                    <span>SWIFT</span>
                    <br />
                    <b>{details?.swift}</b>
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

export default BankDetails;
