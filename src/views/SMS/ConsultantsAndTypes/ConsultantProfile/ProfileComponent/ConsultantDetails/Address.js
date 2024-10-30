import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Address = ({ id }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`ConsultantAddress/GetByConsultant/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <div className="col-12 border p-2 rounded mb-3">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <span className="card-heading">Consultant Address</span>
              {permissions?.includes(permissionList.Edit_Consultant) ? (
                <Link to={`/consultantContactInformation/${id}`}> Edit</Link>
              ) : null}
            </div>
            <hr />
            <Row className="text-gray">
              <Col md="4">
                <p>
                  <span>Address Line 1</span>
                  <br />
                  <b>{data?.houseNo}</b>
                </p>
                <p>
                  <span>Address Line 2</span>
                  <br />
                  <b>{data?.addressLine}</b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>City</span>
                  <br />
                  <b>{data?.city}</b>
                </p>
                <p>
                  <span>State/County</span>
                  <br />
                  <b>{data?.state}</b>
                </p>
              </Col>
              <Col md="4">
                <p>
                  <span>Zip/Post Code</span>
                  <br />
                  <b>{data?.zipCode}</b>
                </p>
                <p>
                  <span>Country</span>
                  <br />
                  <b>{data?.country?.name}</b>
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
