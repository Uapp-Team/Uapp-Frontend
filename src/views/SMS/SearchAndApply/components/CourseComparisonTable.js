import React from "react";
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import { BellIconDefault, BellIconRed } from "./icons";

const CourseComparisonTable = ({ courses }) => {
  const fixedLabels = [
    { label: "Start Date", key: "startDate" },
    { label: "Duration", key: "durationOptions" },
    { label: "Study Mode", key: "studyModes" },
    { label: "Delivery Pattern", key: "deliveryPattern" },
    { label: "Schedule", key: "schedule" },
  ];

  return (
    <div className="table-responsive-wrapper">
      <div className="table-container">
        <table bordered className="comparison-table">
          <thead>
            <tr>
              <th className="fixed-col top-left">
                Course selected: {courses.length}
              </th>
              {courses.map((course, idx) => (
                <th key={idx} className="course-header-cell">
                  <div>
                    <span className="card-date">
                      {isDateWithin7Days(course.maxApplicationDeadLine) ? (
                        <BellIconRed />
                      ) : (
                        <BellIconDefault />
                      )}{" "}
                      {course.maxApplicationDeadLine}
                    </span>
                  </div>
                  <div className="course-header">
                    <div className="course-date">{course.date}</div>
                    <div className="course-title">{course.subjectName}</div>
                    <div className="fast-track">Fast Track</div>
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              <th className="fixed-col">Course Overview</th>
              {courses.map((_, idx) => (
                <td key={idx}></td>
              ))}
            </tr>
          </thead>
          <tbody>
            {fixedLabels.map((item, idx) => (
              <tr key={idx}>
                <th className="fixed-col">{item.label}</th>
                {courses.map((course, cidx) => (
                  <td key={cidx}>
                    {Array.isArray(course[item.key])
                      ? course[item.key].map((val, i) => (
                          <div key={i}>• {val}</div>
                        ))
                      : course[item.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseComparisonTable;
