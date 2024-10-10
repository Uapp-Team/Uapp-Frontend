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
  const isLead = JSON?.parse(localStorage.getItem("IsLead"));
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
          <Col md="3" className="text-right d-none d-md-block">
            <span className="text-green">
              {subjectInfo?.avarageApplicationFee ? (
                <>Application Fee: {subjectInfo?.applicationFeeCurrency} </>
              ) : (
                <button class="ribbon">Free to Apply</button>
              )}
            </span>
            <br />
            <br />
            <>
              {studentDataValue === "0" ? (
                <span style={{ color: "#F87675", fontWeight: 600 }}>
                  Please select a student
                </span>
              ) : null}
              {/* {" "}
                  {!isApply && (
                    <span className="hide-text">
                      Not available for{applicationTypes?.name} student
                    </span>
                  )} */}

              <br />
              {/* <span className="text-warning">
                        {studentDataValue === "0"
                          ? "Please select a student"
                          : ` Is not available for ${applicationTypes?.name} student`}
                      </span> */}
            </>
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
            <div className="d-none d-md-block text-right">
              {permissions?.includes(permissionList.Add_Application) ? (
                <>
                  {isApply === true ? (
                    <>
                      {subjectInfo?.canApply === true ? (
                        <>
                          {subjectInfo?.isIntakeAvailable === true ? (
                            <>
                              {!isLead && (
                                <button
                                  className="saved-button mb-1"
                                  onClick={() => toggleModal()}
                                >
                                  <span className="fs-16px fw-600">
                                    Apply Now
                                  </span>
                                </button>
                              )}
                              <br />
                              <br />
                              <span>
                                {subjectInfo?.intakes?.length < 1 ? null : (
                                  <>
                                    <i class="far fa-calendar-alt"></i> -{" "}
                                    {subjectInfo?.intakes?.map((int, i) => (
                                      <>
                                        {int?.intakeName}
                                        {subjectInfo?.intakes.length !==
                                          i + 1 && ", "}
                                      </>
                                    ))}
                                  </>
                                )}
                              </span>
                            </>
                          ) : (
                            <>
                              <button className="btn-applied mb-1" disabled>
                                Apply Now
                              </button>
                              <br />
                              <br />
                              <span>No Intake available</span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <button className="btn-applied mb-1" disabled>
                            {subjectInfo?.applicationSummery}
                          </button>
                          <br />
                          <br />
                          <span>
                            {subjectInfo?.intakes?.length < 1 ? null : (
                              <>
                                <i class="far fa-calendar-alt"></i> -{" "}
                                {subjectInfo?.intakes?.map((int, i) => (
                                  <>
                                    {int?.intakeName}
                                    {subjectInfo?.intakes.length !== i + 1 &&
                                      ", "}
                                  </>
                                ))}
                              </>
                            )}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="position-relative">
                        {!isLead && (
                          <button className="btn-applied mb-1 cursor" disabled>
                            Apply Now
                          </button>
                        )}

                        {studentDataValue === "0" ? null : (
                          <p className="hide-text position-absolute">
                            Not available for {applicationTypes?.name} student
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
        <div className="d-block d-md-none">
          <span className="text-orange">
            {subjectInfo?.avarageApplicationFee ? (
              <>Application Fee: {subjectInfo?.applicationFeeCurrency} </>
            ) : (
              <span class="">Free to Apply</span>
            )}
          </span>
          <br />
          {permissions?.includes(permissionList.Add_Application) ? (
            <>
              {isApply === true ? (
                <>
                  {subjectInfo?.canApply === true ? (
                    <>
                      {subjectInfo?.isIntakeAvailable === true ? (
                        <button
                          className="saved-button mb-1"
                          onClick={() => toggleModal()}
                        >
                          <span className="fs-16px fw-600"> Apply Now</span>
                        </button>
                      ) : (
                        <span>No Intake available</span>
                      )}
                    </>
                  ) : (
                    <button className="btn-applied mb-1" disabled>
                      {subjectInfo?.applicationSummery}
                    </button>
                  )}
                </>
              ) : (
                <span style={{ color: "#7A8F90", fontWeight: 600 }}>
                  Not available for {applicationTypes?.name} student
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
