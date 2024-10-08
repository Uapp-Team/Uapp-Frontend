import React from "react";
import { Card } from "reactstrap";

const RatingBreakdown = () => {
  return (
    <Card className="p-4">
      <h5>Rating Breakdown</h5>
      <hr />
      <div className="d-flex text-gray-70">
        <p className="d-flex align-items-center mr-3">
          Recommend to a friend
          <i className="fas fa-star ml-2" style={{ color: "#FFB33E" }}></i>5
        </p>
        <p className="d-flex align-items-center mr-3">
          Helpful And Informative
          <i className="fas fa-star ml-2" style={{ color: "#FFB33E" }}></i>5
        </p>
        <p className="d-flex align-items-center mr-3">
          consultant communication level
          <i className="fas fa-star ml-2" style={{ color: "#FFB33E" }}></i>5
        </p>
      </div>
    </Card>
  );
};

export default RatingBreakdown;
