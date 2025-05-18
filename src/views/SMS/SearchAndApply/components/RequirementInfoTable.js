import React from "react";

function RequirementInfoTable({
  courses,
  handleToogleRequirementInfo,
  isVisible,
}) {
  return (
    <>
      <tr
        className="table-header cursor-pointer"
        onClick={handleToogleRequirementInfo}
      >
        <th className="fixed-col">
          <span>Requirements</span>
        </th>
      </tr>
      {isVisible && (
        <tbody>
          <tr>
            <th className="fixed-col table-left">Academic Qualification</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {(
                  <div className="d-flex align-items-center">
                    <span className="fs-14px fw-600 mr-1">
                      #{course?.globalRankNumber}
                    </span>
                    <span className="fs-12px">Global Rank</span>
                  </div>
                ) || "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">English Language</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {(
                  <div className="d-flex align-items-center">
                    <span className="fs-14px fw-600 mr-1">
                      #{course?.globalRankNumber}
                    </span>
                    <span className="fs-12px">Global Rank</span>
                  </div>
                ) || "-"}
              </td>
            ))}
          </tr>
        </tbody>
      )}
    </>
  );
}

export default RequirementInfoTable;
