import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import BinCard from "./BinCard";
import Uget from "../../../../helpers/Uget";

const CountingCards = () => {
  const [binCount, setBinCount] = useState({});

  useEffect(() => {
    Uget(`RecycleBin/Index`).then((res) => {
      setBinCount(res?.data);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <Row>
          <Col lg={3} sm={6} className="pb-4">
            <BinCard
              title="Application"
              value={binCount?.applicationCount}
              link={`/recycle/application`}
              icon={<i class="fas fa-user"></i>}
            />
          </Col>

          <Col lg={3} sm={6} className="pb-4">
            <BinCard
              title="Subject"
              value={binCount?.subjectCount}
              link={`/recycle/subjects`}
              icon={<i class="fas fa-book-reader"></i>}
            />
          </Col>

          {/* <Col className="pb-4">
            <BinCard
              title="Campus"
              value={binCount?.universityCount}
              link={`/recycle/university`}
              icon={<i class="fas fa-building"></i>}
            />
          </Col> */}

          <Col lg={3} sm={6} className="pb-4">
            <BinCard
              title="University"
              value={binCount?.universityCount}
              link={`/recycle/university`}
              icon={<i class="fas fa-university"></i>}
            />
          </Col>

          <Col lg={3} sm={6} className="pb-4">
            <BinCard
              title="Branch"
              value={binCount?.branchCount}
              link={`/recycle/branchManager`}
              icon={<i class="fas fa-briefcase"></i>}
            />
          </Col>
        </Row>
      </div>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <p className="fs-18px fw-600">Users</p>
        <Row>
          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Admission Manager"
              value={binCount?.admissionManagerCount}
              link={`/recycle/admissionManager`}
            />
          </Col>
          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Admission Officer"
              value={binCount?.admissionOfficerCount}
              link={`/recycle/admissionOfficer`}
            />
          </Col>
          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Affiliate"
              value={binCount?.affiliateCount}
              link={`/recycle/affiliate`}
            />
          </Col>

          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Companion"
              value={binCount?.companionCount}
              link={`/recycle/companion`}
            />
          </Col>

          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Consultant"
              value={binCount?.consultantCount}
              link={`/recycle/consultant`}
            />
          </Col>

          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Provider Admin"
              value={binCount?.providerAdminCount}
              link={`/recycle/providerAdmin`}
            />
          </Col>

          <Col lg={2} sm={6} className="pb-4">
            <BinCard
              title="Student"
              value={binCount?.studentCount}
              link={`/recycle/student`}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CountingCards;
