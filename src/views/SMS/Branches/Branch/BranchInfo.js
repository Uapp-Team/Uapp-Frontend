import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import branch from "../../../../assets/icon/branch.svg";

const BranchInfo = ({ id }) => {
  const [branchInfo, setBranchInfo] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`Branch/Get/${id}`).then((res) => {
      setBranchInfo(res);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="custom-card-border p-4 mb-30px">
            <Row className="align-items-center">
              <Col md={7}>
                <div className="d-flex justify-between-start align-items-center mb-30px">
                  <img
                    src={branch}
                    alt=""
                    width="42px"
                    height="40px"
                    className="mr-2"
                  />
                  <div>
                    <p className="text-gray-70 fw-500 mb-0">Branch Name</p>
                    <p className="fs-20px fw-600 mb-0">
                      {branchInfo?.name} {`(${branchInfo?.branchCode})`}
                    </p>
                  </div>
                </div>
                <p className="text-gray-70 fw-500 mb-0">
                  {branchInfo?.addressLine}
                </p>
              </Col>
              <Col md={5}>
                <ul className="uapp-ul text-md-right">
                  <li>
                    <i className="far fa-envelope pr-2"></i>
                    {branchInfo?.email}
                  </li>
                  {branchInfo?.phoneNumber === null ? null : (
                    <li>
                      <i className="fas fa-phone pr-2"></i>
                      {branchInfo?.phoneNumber}
                    </li>
                  )}
                </ul>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default BranchInfo;
