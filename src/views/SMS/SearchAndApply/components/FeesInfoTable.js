import React from "react";
import { Col, Row } from "reactstrap";
import { currency, durationInfo } from "../../../../constants/presetData";

function FeesInfoTable({ courses, handleToogleFeesInfo, isVisible }) {
  return (
    <>
      <tr
        className="table-headers cursor-pointer"
        onClick={handleToogleFeesInfo}
      >
        <th className="fixed-col" colSpan={courses.length + 1}>
          <span>Fees, Funding, & Scholarships</span>
        </th>
      </tr>
      {isVisible && (
        <tbody>
          <tr>
            <th className="fixed-col table-left">Tuition Fee</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.durationTypeId > 0 ? (
                  <>
                    <div className="table-course-title">
                      Tuition fee ({durationInfo(course?.durationTypeId)?.ly})
                    </div>
                    <ul>
                      {course.studentType?.some((type) =>
                        typeof type === "string"
                          ? type === "Home/UK"
                          : type?.name === "Home/UK"
                      ) && (
                        <li>
                          <Row>
                            <Col xs={7}>Home/UK</Col>
                            <Col xs={5}>
                              {currency(course.localTutionFeeCurrencyId)}
                              {course?.localTutionFee}
                            </Col>
                          </Row>
                        </li>
                      )}
                      {course.studentType?.some((type) =>
                        typeof type === "string"
                          ? type === "EU/EEA"
                          : type?.name === "EU/EEA"
                      ) && (
                        <li>
                          <Row>
                            <Col xs={7}>EU/EEA</Col>
                            <Col xs={5}>
                              {currency(course.eU_TutionFeeCurrencyId)}
                              {course?.eU_TutionFee}
                            </Col>
                          </Row>
                        </li>
                      )}
                      {course.studentType?.some((type) =>
                        typeof type === "string"
                          ? type === "International"
                          : type?.name === "International"
                      ) && (
                        <li>
                          <Row>
                            <Col xs={7}>International</Col>
                            <Col xs={5}>
                              {currency(course.internationalTutionCurrencyId)}
                              {course?.internationalTutionFee}
                            </Col>
                          </Row>
                        </li>
                      )}
                    </ul>
                  </>
                ) : (
                  "-"
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">Deposit Required</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.depositFee && (
                  <span className="fw-600">
                    {currency(course.depositFeeCurrencyId)} {course.depositFee}
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">Application Fee</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.avarageApplicationFee && (
                  <span className="fw-600">
                    {currency(course.avarageApplicationFeeCurrencyId)}{" "}
                    {course.avarageApplicationFee}
                  </span>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">Scholarships</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.isScholarshipAvailable ? (
                  <span className="card-tag mr-2" key="loan">
                    Scholarship Available
                  </span>
                ) : (
                  "-"
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">Loan Available</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.subjectInfo?.isGovernmentLoan ||
                course?.subjectInfo?.isPrivateLoan ? (
                  <div className="table-course-title">Loan Available</div>
                ) : (
                  "-"
                )}
                <ul>
                  {course?.subjectInfo?.isGovernmentLoan && (
                    <li>Government Loan</li>
                  )}
                  {course?.subjectInfo?.isPrivateLoan && <li>Private Loan</li>}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      )}
    </>
  );
}

export default FeesInfoTable;
