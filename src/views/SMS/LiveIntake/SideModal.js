import React, { useState } from "react";
import { Link } from "react-router-dom";
import { rootUrl } from "../../../constants/constants";

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
            <p className="section-title">Total Course: {data?.totalCourse}</p>
          </div>
          <div className="mt-3">
            <p className="section-title">Campus:</p>
            {data?.campuses?.map((campus, i, array) => (
              <span key={campus?.id} className="for-intake-table">
                {campus?.name}
                {/* {i < array.length - 1 && ", "} */}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <p className="section-title">Intake:</p>
            {data?.intakes?.map((intake, i, array) => (
              <span key={intake?.id} className="for-intake-table">
                {intake?.name}
                {/* {i < array.length - 1 && ", "} */}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <p className="section-title">Recruitment Type:</p>
            {data?.isAcceptHome === true ? (
              <span className="for-intake-table">Home/UK</span>
            ) : null}
            {data?.isAcceptEU_UK === true ? (
              <span className="for-intake-table">EU/EEU</span>
            ) : null}
            {data?.isAcceptInternational === true ? (
              <span className="for-intake-table">International</span>
            ) : null}
          </div>
          <div className="mt-3">
            <p className="section-title">Delivery pattern:</p>
            <p>{data?.deliveryPatternNames}</p>
          </div>
          <div className="mt-3">
            <p className="section-title">Admission Managers: </p>
            {data?.admissionManagers?.map((adm, i, array) => (
              <div key={adm?.id} className="d-flex mb-3">
                <img
                  className="live-intake-c-image"
                  src={rootUrl + adm?.profileImageUrl}
                  alt="adm_logo"
                />{" "}
                <div className="ml-3">
                  <p>Name: {adm?.name}</p>
                  <p>Email: {adm?.email}</p>
                  <p>Phone: {adm?.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideModal;
