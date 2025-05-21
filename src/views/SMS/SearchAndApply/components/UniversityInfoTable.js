import React from "react";
import { rootUrl } from "../../../../constants/constants";

function UniversityInfoTable({ courses, handleToogleUniInfo, isVisible }) {
  return (
    <>
      <tr
        className="table-headers cursor-pointer"
        onClick={handleToogleUniInfo}
      >
        <th className="fixed-col" colSpan={courses.length + 1}>
          <span>University Info</span>
        </th>
      </tr>

      {isVisible && (
        <tbody>
          <tr>
            <th className="fixed-col table-left">Universiy Name</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {(
                  <div className="d-flex mb-2">
                    <img
                      className="h-48px w-48px mr-2 rounded"
                      src={rootUrl + course.universityLogoUrl}
                      alt=""
                    />
                    <div
                      className="d-flex flex-column"
                      style={{
                        height: "60px",
                      }}
                    >
                      <span className="fw-600 fs-14px">
                        {course.universityName}
                        {/* {course.universityName?.slice(0, 55)}
                        {course.universityName?.length > 55 && "..."} */}
                      </span>
                      <span className="fw-400 fs-12px">
                        {course?.universityLocation}
                      </span>
                    </div>
                  </div>
                ) || "-"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="fixed-col table-left">Global Ranking</th>
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
            <th className="fixed-col table-left">Campus Location</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.campusNames ? (
                  <div className="table-course-title">Campus Location</div>
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
          <tr>
            <th className="fixed-col table-left">Available Intakes</th>
            {courses.map((course, cidx) => (
              <td key={cidx} className="table-col">
                {course?.intakeNames
                  ? course?.intakeNames
                      ?.split(",")
                      .filter(Boolean)
                      .map((name, index) => (
                        <span key={index} className="filter-button">
                          {name}
                        </span>
                      ))
                  : "-"}
              </td>
            ))}
          </tr>
        </tbody>
      )}
    </>
  );
}

export default UniversityInfoTable;
