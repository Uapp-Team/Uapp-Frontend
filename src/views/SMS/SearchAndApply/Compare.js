import React from "react";
import { useHistory } from "react-router-dom";
import CourseComparisonTable from "./components/CourseComparisonTable";
import { ArrowLeftIcon } from "./components/icons";

function Compare() {
  const router = useHistory();
  const items = localStorage.getItem("comparedItems");
  const courses = JSON.parse(items) || [];

  return (
    <>
      <section>
        <div>
          <h5>Course comparing</h5>
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => router.goBack()}
          >
            {" "}
            <span className="mr-2">
              <ArrowLeftIcon />
            </span>{" "}
            <span className="fs-20px fw-500"> Back </span>
          </div>
          <CourseComparisonTable courses={courses} />
        </div>
      </section>
    </>
  );
}

export default Compare;
