import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import get from "../../../../helpers/get";

import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import BranchManager from "../IndividualComponent/BranchManager";
import BranchInfo from "../Branch/BranchInfo";

const BranchManagerNewProfile = () => {
  const branchManagerId = localStorage.getItem("referenceId");
  const [manager, setManager] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`BranchManager/Get/${branchManagerId}`).then((res) => {
      console.log(res);
      setManager(res);
      setLoading(false);
    });
  }, [branchManagerId]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Branch Profile"
            // backTo="Branch Profile"
            // path={`/branchProfile/${manager?.branchId}`}
          />

          <Row>
            <Col md={8}>
              <BranchInfo id={manager?.branchId} />
            </Col>
            <Col md="4">
              <BranchManager id={manager?.branchId} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default BranchManagerNewProfile;
