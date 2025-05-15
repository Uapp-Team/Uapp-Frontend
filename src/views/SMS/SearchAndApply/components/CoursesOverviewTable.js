import React from "react";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";

function CoursesOverviewTable({ courses }) {
  return (
    <tbody>
      <tr>
        <th className="fixed-col table-left">Application Deadline</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.maxApplicationDeadLine || "-"}
          </td>
        ))}
      </tr>
      <tr>
        <th className="fixed-col table-left">Start Date</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.maxClassStartDate || "-"}
          </td>
        ))}
      </tr>
      <tr>
        <th className="fixed-col table-left">Duration</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.durationNames ? (
              <div className="table-course-title">Duration</div>
            ) : (
              "-"
            )}

            <ul>
              {course?.durationNames
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
        <th className="fixed-col table-left">Study Mode</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.studyModes ? (
              <div className="table-course-title">Study Mode</div>
            ) : (
              "-"
            )}
            <ul>
              {course?.studyModes
                ?.split(",")
                .map((id) => {
                  const method = studyMode.find(
                    (m) => m.id === parseInt(id.trim(), 10)
                  );
                  return method?.name;
                })
                .filter(Boolean)
                .map((name, index) => <li key={index}>{name}</li>) || "-"}
            </ul>
          </td>
        ))}
      </tr>
      <tr>
        <th className="fixed-col table-left">Delivery Pattern</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.deliveryMethods ? (
              <div className="table-course-title">Delivery Pattern</div>
            ) : (
              "-"
            )}
            <ul>
              {course?.deliveryMethods
                ?.split(",")
                .map((id) => {
                  const method = deliveryMethods.find(
                    (m) => m.id === parseInt(id.trim(), 10)
                  );
                  return method?.name;
                })
                .filter(Boolean)
                .map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
            </ul>
          </td>
        ))}
      </tr>
      <tr>
        <th className="fixed-col table-left">Schedule</th>
        {courses.map((course, cidx) => (
          <td key={cidx} className="table-col">
            {course?.classStartDate || "-"}
          </td>
        ))}
      </tr>
    </tbody>
  );
}

export default CoursesOverviewTable;
