import React from "react";
import { durationInfo } from "../../../../constants/presetData";

function FeesInfoTable({ courses, handleToggleFees, isVisible }) {
  return (
    <>
      <tr className="table-header cursor-pointer" onClick={handleToggleFees}>
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
        </tbody>
      )}
    </>
  );
}

export default FeesInfoTable;
