import React from "react";
import { currency, durationInfo } from "../../../../constants/presetData";

function FeesInfoTable({ courses, handleToogleFeesInfo, isVisible }) {
  return (
    <>
      <tr
        className="table-header cursor-pointer"
        onClick={handleToogleFeesInfo}
      >
        <th className="fixed-col">
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
                    {/* <ul>
                {checkHome?.length === 1 && (
                    <li>

                      <Row>
                        <Col xs={7}> Home/UK </Col>
                        <Col xs={5}>
                          {currency(quickViewData.localTutionFeeCurrencyId)}
                          {course?.localTutionFee}
                        </Col>
                      </Row>
                    </li>
                    )}
                    {checkEu?.length === 1 && (
                      <Row>
                        <Col xs={7}> EU/EEU</Col>
                        <Col xs={5}>
                          {currency(quickViewData.eU_TutionFeeCurrencyId)}
                          {quickViewData?.eU_TutionFee}
                        </Col>
                      </Row>
                    )}
                    {checkInt?.length === 1 && (
                      <Row>
                        <Col xs={7}> International </Col>
                        <Col xs={5}>
                          {currency(
                            quickViewData.internationalTutionCurrencyId
                          )}
                          {quickViewData?.internationalTutionFee}
                        </Col>
                      </Row>
                    )}
                </ul> */}
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
                {course?.campusNames ? (
                  <div className="table-course-title">Loan Available</div>
                ) : (
                  "-"
                )}
                <ul>
                  {course?.campusNames
                    ?.split(",")
                    .filter(Boolean)
                    .map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
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
