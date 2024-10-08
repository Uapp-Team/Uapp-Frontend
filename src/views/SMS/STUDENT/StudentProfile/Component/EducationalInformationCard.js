import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const EducationalInformationCard = ({ sId }) => {
  const [educationInfos, setEducationInfos] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`EducationInformation/GetByStudentId/${sId}`).then((res) => {
      setEducationInfos(res);
    });
  }, [sId]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <div>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Educational Information</b>{" "}
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentEducationalInformation/${sId}/${1}`}>
                Edit
              </Link>
            ) : null}
          </td>
        </thead>
      </Table>

      {educationInfos.length > 0 &&
        educationInfos?.map((edu, i) => (
          <div
            className="col-12 border p-2 rounded mb-3"
            key={edu.id}
            style={{ textAlign: "left" }}
          >
            <Card>
              <CardBody>
                <span className="card-heading">{edu?.nameOfInstitution}</span>
                <div className="d-flex text-gray-70">
                  <span className="pr-4">
                    <i className="fas fa-map-marker-alt pr-2"></i>
                    {edu?.instituteAddress}
                  </span>
                  <span>
                    <i className="fas fa-phone pr-2"></i>
                    {edu?.instituteContactNumber}
                  </span>
                </div>
                <hr />
                <Row className="text-gray">
                  <Col md="3">
                    <p>
                      <span>Attended From</span>
                      <br />
                      <b>{handleDate(edu?.attendedInstitutionFrom)}</b>
                    </p>
                    <p>
                      <span>Attended To</span>
                      <br />
                      <b>
                        {edu?.qualificationAchieved === true &&
                          handleDate(edu?.attendedInstitutionTo)}
                      </b>
                    </p>
                  </Col>
                  <Col md="3">
                    <p>
                      <span>Education Level</span>
                      <br />
                      <b>{edu?.educationLevel?.name}</b>
                    </p>
                    <p>
                      <span>Qualification Course</span>
                      <br />
                      <b> {edu?.qualificationSubject}</b>
                    </p>
                  </Col>
                  <Col md="3">
                    <p>
                      <span>Duration</span>
                      <br />
                      <b>{edu?.duration}</b>
                    </p>
                    <p>
                      <span>Result In Percentage</span>
                      <br />
                      <b>{edu?.finalGrade}</b>
                    </p>
                  </Col>
                  <Col md="3">
                    <p>
                      <span>Country of Education</span>
                      <br />
                      <b> {edu?.countryOfEducation?.name}</b>
                    </p>
                    <p>
                      <span>Language of Institution</span>
                      <br />
                      <b>{edu?.languageOfInstitution}</b>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ))}
      {educationInfos.length === 0 && (
        <p className="pl-10px">Education information is not added.</p>
      )}
    </div>
  );
};

export default EducationalInformationCard;
