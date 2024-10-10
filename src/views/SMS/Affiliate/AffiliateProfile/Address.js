import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { userTypes } from "../../../../constants/userTypeConstant";

const Address = ({ affiliateId, affiliateProfileData, referenceId }) => {
  const userType = localStorage.getItem("userType");
  return (
    <>
      <div className="col-12 border p-2 rounded mb-3">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <span className="card-heading">Address</span>
              {affiliateId === referenceId ||
              userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin ? (
                <Link to={`/affiliateContactInfo/${affiliateId}`}> Edit</Link>
              ) : null}
            </div>
            <hr />
            <Row className="text-gray">
              <Col md="4">
                <p>
                  <span>Address Line 1</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.addressLine1}</b>
                </p>
                <p>
                  <span>Address Line 2</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.addressLine2}</b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>City</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.city}</b>
                </p>
                <p>
                  <span>State/County</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.stateCountry}</b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>Zip/Post Code</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.zipPostCode}</b>
                </p>
                <p>
                  <span>Country</span>
                  <br />
                  <b>{affiliateProfileData?.data?.address?.country}</b>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Address;
