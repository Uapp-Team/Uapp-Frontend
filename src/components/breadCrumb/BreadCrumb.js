import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";

const BreadCrumb = ({ title, backTo, path }) => {
  const history = useHistory();

  // redirect to dashboard
  const backTodashboard = () => {
    history.push(`/`);
  };

  // redirect to back
  const back = () => {
    history.push(path);
  };

  // redirect to backUrl
  const backUrl = () => {
    history.go(-1);
  };

  return (
    <>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <div className="d-md-flex p-2">
            <h5 className="page-header-left-nav" onClick={backTodashboard}>
              <i class="fa fa-home" style={{ marginRight: "4px" }}></i>
              Dashboard /
            </h5>
            {backTo && (
              <h5 className="page-header-left-nav" onClick={back}>
                {backTo} /
              </h5>
            )}
            <h5 className="page-header-left-title"> {title}</h5>
          </div>
          <div className="page-header-back-to-home p-2">
            <span className="text-white" onClick={backUrl}>
              <i class="fas fa-arrow-circle-left"></i> Back
            </span>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default BreadCrumb;
