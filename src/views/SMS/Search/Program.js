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
}) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-24px">
        {/* <p className="mb-10px d-sm-flex justify-content-start"> */}
        <p className="mb-10px  d-sm-flex justify-content-start">
          <span className="mr-4"> {subjectInfo?.educationLevelName}</span>
          <span className="d-block">
            <i class="fas fa-clock text-orange mr-1"></i>
            {subjectInfo?.duration}
          </span>
        </p>
        <div className="mb-10px d-flex justify-content-between">
          <div>
            <p className="mb-10px">
              <Link
                className="fs-20px fw-700 text-orange mb-10px"
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

          <div className="d-none d-md-block text-right">
            {permissions?.includes(permissionList.Add_Application) ? (
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
            ) : null}
          </div>
        </div>

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
                <>Application Fee: {subjectInfo?.international_Fee} </>
              ) : (
                "Free to Apply"
              )}
            </span>
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
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Program;
