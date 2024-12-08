import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideModal = ({ data, action }) => {
  console.log(data);

  const dataList = data?.campusNames?.split(", ");
  return (
    <>
      <div className="aff-content-modal overflowY">
        <div className="d-flex justify-content-between mb-30px">
          <div>
            <span onClick={() => action && action()} className=" mr-0 pointer">
              <i class="fas fa-times ml-2"></i>
            </span>
          </div>
        </div>
        <hr className="mb-30px" />
        <div>
          <div className="d-flex justify-content-start">
            {/* <div className="justify-content-start pr-3">
              <img
                src={rootUrl + info?.logo}
                className="search-img-style"
                alt="logo-img"
              />
            </div> */}

            <div className="justify-content-start">
              <Link to={`/universityDetails/${data?.universityId}`}>
                <span className="intake-university-title-style mb-10px">
                  {data?.universityName}
                </span>
              </Link>
              <br />
              <span className="d-flex justify-content-start align-items-center">
                <i className="fas fa-location-dot fs-16px pr-2"></i>
                <span className="university-location-intake">
                  {data?.universityLocation}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-3">
            <p className="section-title">Total Course: {data?.courseCount}</p>
          </div>
          <div className="mt-3">
            <p className="section-title">Campus</p>
            <p>{data?.campusNames}</p>
          </div>
          <div className="mt-3">
            <p className="section-title">Intake</p>
            <p>{data?.intakeNames}</p>
          </div>
          <div className="mt-3">
            <p className="section-title">Recruitment Type</p>
            {data?.isAcceptHome === true ? (
              <span className="for-intake-table">Home</span>
            ) : null}
            {data?.isAcceptEU_UK === true ? (
              <span className="for-intake-table">Eu/Uk</span>
            ) : null}
            {data?.isAcceptInternational === true ? (
              <span className="for-intake-table">International</span>
            ) : null}
          </div>
          <div className="mt-3">
            <p className="section-title">Delivery pattern</p>
            <p>{data?.deliveryPatternNames}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideModal;
