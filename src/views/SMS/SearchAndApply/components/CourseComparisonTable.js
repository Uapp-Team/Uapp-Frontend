import React, { useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import { BellIconDefault, BellIconRed } from "./icons";

const CourseComparisonTable = ({ courses }) => {
  const [showOverview, setShowOverview] = useState(true);

  const tableContainerRef = useRef(null);

  const handleToogleOverview = () => {
    setShowOverview((prev) => !prev);
  };
  const scrollTable = () => {
    if (tableContainerRef.current) {
      const scrollAmount = 200;
      tableContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="table-responsive-wrapper">
      <div className="table-container" ref={tableContainerRef}>
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
                    <div table-className="course-title">
                      {course.subjectName}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
            <tr className="table-header" onClick={handleToogleOverview}>
              <th className="fixed-col">
                <span>Course Overview</span>
              </th>
            </tr>
          </thead>
          {showOverview && (
            <tbody>
              <tr>
                <th className="fixed-col table-left">Application Deadline</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    {course?.maxApplicationDeadLine || "Not Set"}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="fixed-col table-left">Start Date</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    {course?.classStartDate || "Not Set"}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="fixed-col table-left">Duration</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    <div className="table-course-title">Duration</div>
                    <ul>
                      {course?.durationNames
                        ?.split(",")
                        .map((name, index) => <li key={index}>{name}</li>) ||
                        "Not Set"}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="fixed-col table-left">Study Mode</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    <div className="table-course-title">Study Mode</div>
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
                        .map((name, index) => <li key={index}>{name}</li>) ||
                        "Not Set"}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="fixed-col table-left">Delivery Pattern</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    <div className="table-course-title">Delivery Pattern</div>
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
                        .map((name, index) => <li key={index}>{name}</li>) ||
                        "Not Set"}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="fixed-col table-left">Schedule</th>
                {courses.map((course, cidx) => (
                  <td key={cidx} className="table-col">
                    {course?.classStartDate || "Not Set"}
                  </td>
                ))}
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="scroll-arrow" onClick={scrollTable}>
        <AiOutlineRight size={10} className="arrow-icon" />
      </div>
    </div>
  );
};

export default CourseComparisonTable;
