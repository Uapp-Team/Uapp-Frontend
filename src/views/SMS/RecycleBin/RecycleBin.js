import React from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import CountingCards from "./Components/CountingCards";

const RecycleBin = () => {
  return (
    <>
      <BreadCrumb title="Recycle Bin" backTo="" path="" />

      <div className="d-flex justify-content-between my-4">
        <p className="fs-24px fw-600 mb-0">Overview</p>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 col-12">
          <CountingCards />
        </div>
      </div>

      {/* <h1 className="text-center my-5 py-5">We are launching soon</h1> */}
    </>
  );
};

export default RecycleBin;
