import React, { useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
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
                    <div className="course-title">{course.subjectName}</div>
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
              {[
                {
                  label: "Application Deadline",
                  key: "maxApplicationDeadLine",
                },
                { label: "Start Date", key: "classStartDate" },
                { label: "Duration", key: "duration" },
                { label: "Study Mode", key: "studyMode" },
                { label: "Delivery Pattern", key: "deliveryMethods" },
                { label: "Schedule", key: "classStartDate" },
              ].map((row, idx) => (
                <tr key={idx}>
                  <th className="fixed-col table-left">{row.label}</th>
                  {courses.map((course, cidx) => (
                    <td key={cidx} className="table-col">
                      {course?.[row.key] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="scroll-arrow" onClick={scrollTable}>
        <AiOutlineRight size={30} className="arrow-icon" />
      </div>
    </div>
  );
};

export default CourseComparisonTable;
