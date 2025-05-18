import React from "react";

function RequirementInfoTable({
  courses,
  handleToogleRequirementInfo,
  isVisible,
}) {
  return (
    <>
      <tr
        className="table-headers cursor-pointer"
        onClick={handleToogleRequirementInfo}
      >
        <th className="fixed-col" colSpan={courses.length + 1}>
          <span>Requirements</span>
        </th>
      </tr>
      {isVisible && (
        <tbody>
          <tr>
            <th className="fixed-col table-left">Academic Qualification</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.eligibility?.requiredResultInPercentage ? (
                  <div className="table-course-title">
                    Academic Qualification
                  </div>
                ) : (
                  "-"
                )}
                <ul>
                  {course?.eligibility?.requiredResultInPercentage && (
                    <li>{course?.eligibility?.requiredResultInPercentage}</li>
                  )}
                </ul>
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">English Language</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.eligibility?.englishLanguages?.length > 0 ? (
                  <div className="table-course-title">English Language</div>
                ) : (
                  "-"
                )}
                <ul>
                  {course?.eligibility?.englishLanguages?.map((item, index) => (
                    <li>
                      {item}
                      {index ===
                        course?.eligibility.englishLanguages.length - 2 &&
                        " or"}
                    </li>
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

export default RequirementInfoTable;
