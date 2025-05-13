import React from "react";
import { ArrowLeftIcon } from "./components/icons";

function Compare() {
  return (
    <>
      <section>
        <div>
          <h5>Course comparing</h5>
          <div className="d-flex align-items-center">
            {" "}
            <span className="mr-2">
              <ArrowLeftIcon />
            </span>{" "}
            <span className="fs-20px fw-500"> Back </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Compare;
