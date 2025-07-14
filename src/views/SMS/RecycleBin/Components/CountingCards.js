import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import BinCard from "./BinCard";
import Uget from "../../../../helpers/Uget";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const CountingCards = () => {
  const [binCount, setBinCount] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    Uget(`RecycleBin/Index`).then((res) => {
      setBinCount(res?.data);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <Row>
          {permissions?.includes(permissionList?.Restore_Application) ? (
            <>
              <Col lg={3} sm={6} className="pb-4">
                <BinCard
                  title="Application"
                  value={binCount?.applicationCount}
                  link={`/recycle/application`}
                  icon={<i class="fas fa-user"></i>}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Subject) ? (
            <>
              {" "}
              <Col lg={3} sm={6} className="pb-4">
                <BinCard
                  title="Subject"
                  value={binCount?.subjectCount}
                  link={`/recycle/subjects`}
                  icon={<i class="fas fa-book-reader"></i>}
                />
              </Col>
            </>
          ) : null}

          {/* <Col className="pb-4">
            <BinCard
              title="Campus"
              value={binCount?.universityCount}
              link={`/recycle/university`}
              icon={<i class="fas fa-building"></i>}
            />
          </Col> */}

          {permissions?.includes(permissionList?.Restore_University) ? (
            <>
              {" "}
              <Col lg={3} sm={6} className="pb-4">
                <BinCard
                  title="University"
                  value={binCount?.universityCount}
                  link={`/recycle/university`}
                  icon={<i class="fas fa-university"></i>}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Branch) ? (
            <>
              {" "}
              <Col lg={3} sm={6} className="pb-4">
                <BinCard
                  title="Branch"
                  value={binCount?.branchCount}
                  link={`/recycle/branch`}
                  icon={<i class="fas fa-briefcase"></i>}
                />
              </Col>
            </>
          ) : null}
        </Row>
      </div>
      <div className="custom-card-border pt-4 px-4 mb-30px">
        <p className="fs-18px fw-600">Users</p>
        <Row>
          {permissions?.includes(permissionList?.Restore_Admission_Manager) ? (
            <>
              {" "}
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Admission Manager"
                  value={binCount?.admissionManagerCount}
                  link={`/recycle/admissionManager`}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Admission_Officer) ? (
            <>
              {" "}
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Admission Officer"
                  value={binCount?.admissionOfficerCount}
                  link={`/recycle/admissionOfficer`}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Affiliate) ? (
            <>
              {" "}
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Affiliate"
                  value={binCount?.affiliateCount}
                  link={`/recycle/affiliate`}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Ambassador) ? (
            <>
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Companion"
                  value={binCount?.companionCount}
                  link={`/recycle/companion`}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Consultant) ? (
            <>
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Consultant"
                  value={binCount?.consultantCount}
                  link={`/recycle/consultant`}
                />
              </Col>
            </>
          ) : null}
          {permissions?.includes(permissionList?.Restore_ProviderAdmin) ? (
            <>
              {" "}
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Provider Admin"
                  value={binCount?.providerAdminCount}
                  link={`/recycle/providerAdmin`}
                />
              </Col>
            </>
          ) : null}

          {permissions?.includes(permissionList?.Restore_Student) ? (
            <>
              {" "}
              <Col lg={2} sm={6} className="pb-4">
                <BinCard
                  title="Student"
                  value={binCount?.studentCount}
                  link={`/recycle/student`}
                />
              </Col>
            </>
          ) : null}
        </Row>
      </div>
    </>
  );
};

export default CountingCards;
