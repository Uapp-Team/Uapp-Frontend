import React from "react";
import { FaExchangeAlt, FaHeart, FaSlidersH } from "react-icons/fa";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import courseIcon from "../../../../assets/icon/course.svg";
import { Student } from "../../../../components/core/User";
import "../SearchAndApply.css";
import { ArrowLeftRightIcon } from "./icons";

const ResultsToolbar = ({
  data,
  isFavorite,
  setIsFavorite,
  favorites,
  mobileCard,
  setMobileCard,
  setFilterOpen,
}) => {
  return (
    <>
      <div className="d-none d-md-block">
        <hr className="margin0" />
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-16px pb-0">
          {/* Left Section */}
          <div className="d-flex justify-content-between gap-2 align-items-center flex-wrap  mb-16px">
            {/* <span className="tag mr-2">0 Result</span> */}
            <span className="tag tag-active mr-2">
              <img
                src={courseIcon}
                alt="course"
                className="w-20px h-20px mr-2"
              />{" "}
              {data?.total} Courses
            </span>
            {/* <span className="tag">
              <img
                src={universityIcon}
                alt="course"
                className="w-20px h-20px mr-2"
              />
              0 University
            </span> */}
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center flex-wrap mb-16px">
            {Student() && (
              <button
                className={`action-btn mr-2 ${isFavorite && "tag-active"}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart className="mx-2" /> Favourites{" "}
                <span className="count">{favorites}</span>
              </button>
            )}
            <button className="action-btn mr-2">
              <span className="mr-2">
                <ArrowLeftRightIcon />
              </span>{" "}
              Compare <span className="count">0</span>
            </button>
            <button
              className="action-btn mr-2 d-none d-md-block"
              onClick={() => setMobileCard(!mobileCard)}
            >
              {mobileCard ? (
                <TfiViewList className="my-1" />
              ) : (
                <TfiViewGrid className="my-1" />
              )}
            </button>
            <button
              className="action-btn filters-btn d-none d-md-block"
              onClick={() => setFilterOpen()}
            >
              <FaSlidersH size={20} className="mx-2" /> All filters
            </button>
          </div>
        </div>
        <hr className="margin0" />
      </div>
      <div className="d-block d-md-none">
        <hr className="margin0" />
        <div className="d-flex justify-content-between gap-2 align-items-center flex-wrap mt-16px mb-16px">
          {/* <span className="tag mr-2">0 Result</span> */}
          <span className="tag tag-active mr-2">
            <img src={courseIcon} alt="course" className="w-20px h-20px mr-2" />{" "}
            {data?.total} Courses
          </span>
          {/* <span className="tag">
            <img
              src={universityIcon}
              alt="course"
              className="w-20px h-20px mr-2"
            />
            0 University
          </span> */}
        </div>
        <hr className="margin0" />
        <div className="d-flex justify-content-between mt-16px mb-16px">
          {Student() && (
            <button
              className={`action-btn mr-2 ${isFavorite && "tag-active"}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FaHeart className="mx-2" /> Favourites{" "}
              <span className="count">{favorites}</span>
            </button>
          )}

          <button className="action-btn mr-2">
            <FaExchangeAlt className="mx-2" /> Compare{" "}
            <span className="count">0</span>
          </button>
        </div>
        <hr className="margin0" />
      </div>
    </>
  );
};

export default ResultsToolbar;
