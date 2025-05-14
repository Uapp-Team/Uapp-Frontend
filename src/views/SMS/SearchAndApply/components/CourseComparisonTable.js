import React, { useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";
import { isDateWithin7Days } from "../../../../helpers/IsDateWithin7Days";
import "../SearchAndApply.css";
import CoursesOverviewTable from "./CoursesOverviewTable";
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
  const courseOverviewConfig = [
    { label: "Application Deadline", key: "maxApplicationDeadLine" },
    { label: "Start Date", key: "classStartDate" },
    {
      label: "Duration",
      key: "durationNames",
      subTitle: "Duration Details",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    {
      label: "Study Mode",
      key: "studyModes",
      subTitle: "Available Study Modes",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((id) => {
              const method = studyMode.find(
                (m) => m.id === parseInt(id.trim(), 10)
              );
              return method?.name;
            })
            .filter(Boolean)
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    {
      label: "Delivery Pattern",
      key: "deliveryMethods",
      subTitle: "Delivery Options",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((id) => {
              const method = deliveryMethods.find(
                (m) => m.id === parseInt(id.trim(), 10)
              );
              return method?.name;
            })
            .filter(Boolean)
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    { label: "Schedule", key: "classStartDate" },
  ];

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
            <tr
              className="table-headers cursor-pointer"
              onClick={handleToogleOverview}
            >
              <th className="fixed-col">
                <span>Course Overview</span>
              </th>
            </tr>
          </thead>
          {showOverview && <CoursesOverviewTable courses={courses} />}
        </table>
      </div>
      {courses.length > 3 && (
        <div className="scroll-arrow" onClick={scrollTable}>
          <AiOutlineRight size={10} className="arrow-icon" />
        </div>
      )}
    </div>
  );
};

export default CourseComparisonTable;
