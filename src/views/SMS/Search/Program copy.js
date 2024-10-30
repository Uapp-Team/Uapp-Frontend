import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
// import booknark from "../../../assets/icon/bookmarkBg.png";

const Program = ({
  subjectInfo,
  i,
  userType,
  userTypes,
  permissions,
  permissionList,
  studentDataValue,
  toggleModal,
  checkEligibility,
  applicationTypes,
}) => {
  const isApply = subjectInfo?.applicationTypes?.includes(applicationTypes?.id);
  return (
    <>
      <div>
        {/* <p className="mb-10px d-sm-flex justify-content-start"> */}
        <p className="mb-10px  d-sm-flex justify-content-start">
          <span className="mr-4"> {subjectInfo?.educationLevelName}</span>
          <span className="d-block">
            <i class="fas fa-clock text-orange mr-1"></i>
            {subjectInfo?.duration}
          </span>
        </p>{" "}
        <Row className="mb-10px d-flex justify-content-between">
          <Col md="9">
            <div>
              <p className="mb-10px">
                <Link
                  className="fs-20px fw-700 text-black mb-10px"
                  to={`/subjectProfile/${subjectInfo?.subjectId}`}
                >
                  {subjectInfo?.title}
                </Link>
              </p>
              <span>
                <i class="fas fa-map-marker-alt fw-18px text-orange mr-2"></i>
                {subjectInfo?.campuses.length !== 0 && (
                  <>
                    {subjectInfo?.campuses?.map((item, i) => (
                      <Link
                        to={`/campusDetails/${item?.campusId}`}
                        className="text-underline mr-3"
                      >
                        {item?.campusName}
                      </Link>
                    ))}
                  </>
                )}
              </span>
            </div>
          </Col>
          <Col md="3">
            <div className="d-none d-md-block text-right">
              {permissions?.includes(permissionList.Add_Application) ? (
                <>
                  {isApply === true ? (
                    <>
                      {subjectInfo?.canApply === true ? (
                        <button
                          className="saved-button mb-1"
                          onClick={() => toggleModal()}
                        >
                          <span className="fs-16px fw-600"> Apply Now</span>
                        </button>
                      ) : (
                        <button className="btn-applied mb-1" disabled>
                          Already Applied
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {studentDataValue === "0" ? (
                        <span className="text-warning">
                          Please select a student
                        </span>
                      ) : (
                        <span style={{ color: "#7A8F90" }}>
                          Is not available for{applicationTypes?.name} student
                        </span>
                      )}
                      <br />
                      {/* <span className="text-warning">
                        {studentDataValue === "0"
                          ? "Please select a student"
                          : ` Is not available for ${applicationTypes?.name} student`}
                      </span> */}
                    </>
                  )}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
        {/* <div className="mb-10px d-flex justify-content-between"> */}
        <Row className="mb-10px">
          <Col sm={6}>
            {subjectInfo?.home_Fee ? (
              <>
                Home: {subjectInfo?.home_Fee} <br />{" "}
              </>
            ) : null}

            {subjectInfo?.eu_Fee ? (
              <>
                EU: {subjectInfo?.eu_Fee} <br />
              </>
            ) : null}

            {subjectInfo?.international_Fee ? (
              <>
                Int: {subjectInfo?.international_Fee} <br />
              </>
            ) : null}
          </Col>
          <Col sm={6} className="text-sm-right">
            <span className="text-green">
              {subjectInfo?.avarageApplicationFee ? (
                <>Application Fee: {subjectInfo?.applicationFeeCurrency} </>
              ) : (
                <div class="ribbon">Free to Apply</div>
              )}
            </span>
            <br />
            <br />
            <span>
              {subjectInfo?.intakes?.length < 1 ? null : (
                <>
                  <i class="far fa-calendar-alt"></i> -{" "}
                  {subjectInfo?.intakes?.map((int, i) => (
                    <>
                      {int?.intakeName}
                      {subjectInfo?.intakes.length !== i + 1 && ", "}
                    </>
                  ))}
                </>
              )}
            </span>
          </Col>
        </Row>
        <div className="d-block d-md-none">
          {permissions?.includes(permissionList.Add_Application) ? (
            <>
              {isApply === true ? (
                <>
                  {subjectInfo?.canApply === true ? (
                    <button
                      className="saved-button mb-1"
                      onClick={() => toggleModal()}
                    >
                      <span className="fs-16px fw-600"> Apply Now</span>
                    </button>
                  ) : (
                    <button className="btn-applied mb-1" disabled>
                      Already Applied
                    </button>
                  )}
                </>
              ) : (
                <span>
                  Is not available for {applicationTypes?.name} student
                </span>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Program;
