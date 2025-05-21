import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NoDataImage from "../../../assets/img/no-data.svg";
import CourseComparisonTable from "./components/CourseComparisonTable";
import { ArrowLeftIcon } from "./components/icons";

function Compare() {
  const router = useHistory();
  const items = localStorage.getItem("comparedItems");
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("comparedItems")) || []
  );

  const handleCoursesUpdate = (updatedCourses) => {
    setCourses(updatedCourses);
  };

  return (
    <>
      <section>
        <div>
          <h5>Course comparing</h5>
          <button className="back-button" onClick={() => router.goBack()}>
            {" "}
            <span className="mr-2">
              <ArrowLeftIcon />
            </span>{" "}
            <span className="fs-20px fw-500"> Back </span>
          </button>
          {courses.length > 0 ? (
            <CourseComparisonTable
              courses={courses}
              onCoursesUpdate={handleCoursesUpdate}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <img src={NoDataImage} alt="" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Compare;
