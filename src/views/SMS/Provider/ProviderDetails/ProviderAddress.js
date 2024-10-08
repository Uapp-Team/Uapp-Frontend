import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import get from "../../../../helpers/get";

const ProviderAddress = ({ id }) => {
  // const [contactList, setContactList] = useState([]);
  const [livingdata, setLivingData] = useState(null);
  const [permanentData, setPermanentData] = useState(null);

  useEffect(() => {
    get(`ProviderAddress/get/${id}`).then((res) => {
      // setContactList(res);
      setLivingData(
        res[0]?.addressType === 1
          ? res[0]
          : res[1]?.addressType === 1
          ? res[1]
          : null
      );
      setPermanentData(
        res[0]?.addressType === 2
          ? res[0]
          : res[1]?.addressType === 2
          ? res[1]
          : null
      );
    });
  }, [id]);

  return (
    <>
      {livingdata !== null ? (
        <div className="custom-card-border p-4 mb-3">
          <div className="d-flex justify-content-between">
            <span className="card-heading">Registered Address</span>
          </div>
          <hr />
          <Row className="text-gray">
            <Col md="4">
              <p>
                <span>Address Line</span>
                <br />
                <b>{livingdata?.addressline}</b>
                <br />
                <b> {livingdata?.houseNo}</b>
              </p>
            </Col>
            <Col md="4">
              <p>
                <span>City</span>
                <br />
                <b>{livingdata?.city}</b>
              </p>
              <p>
                <span>State/County</span>
                <br />
                <b>{livingdata?.state}</b>
              </p>
            </Col>
            <Col md="2">
              <p>
                <span>Zip/Post Code</span>
                <br />
                <b> {livingdata?.zipCode}</b>
              </p>
              <p>
                <span>Country</span>
                <br />
                <b> {livingdata?.country?.name}</b>
              </p>
            </Col>
          </Row>
        </div>
      ) : null}

      {permanentData !== null ? (
        <div className="custom-card-border p-4">
          <div className="d-flex justify-content-between">
            <span className="card-heading">Office Address</span>
          </div>
          <hr />
          <Row className="text-gray">
            <Col md="4">
              <p>
                <span>Address Line</span>
                <br />
                <b>{permanentData?.addressline}</b>
                <br />
                <b> {permanentData?.houseNo}</b>
              </p>
            </Col>
            <Col md="4">
              <p>
                <span>City</span>
                <br />
                <b>{permanentData?.city}</b>
              </p>
              <p>
                <span>State/County</span>
                <br />
                <b>{permanentData?.state}</b>
              </p>
            </Col>
            <Col md="2">
              <p>
                <span>Zip/Post Code</span>
                <br />
                <b> {permanentData?.zipCode}</b>
              </p>
              <p>
                <span>Country</span>
                <br />
                <b> {permanentData?.country?.name}</b>
              </p>
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default ProviderAddress;
