import { useParams } from "react-router-dom";
import React, { useRef } from "react";
import { Card, Col, Row } from "reactstrap";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import StudentParentConsultant from "./Component/StudentParentConsultant";
import StudentProfileHeadComponent from "./Component/StudentProfileHeadComponent";
import Application from "./Component/Application";
import Consent from "./Component/Consent";
import ProfilePreview from "./ProfilePreview";

const StudentProfile = () => {
  const { sId } = useParams();
  const componentRef = useRef();

  return (
    <>
      <BreadCrumb
        title="Student Profile"
        backTo="Student List"
        path="/studentList"
      />
      <div ref={componentRef}>
        <div className="uapp-employee-profile">
          <Row>
            <Col md="8">
              <div className="uapp-employee-profile-left">
                <StudentProfileHeadComponent studentid={sId} />
                <Card className="p-4">
                  <Application id={sId} />
                </Card>
                <ProfilePreview sId={sId} />
              </div>
            </Col>

            <Col md="4">
              <StudentParentConsultant id={sId} />
              <Consent id={sId} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
