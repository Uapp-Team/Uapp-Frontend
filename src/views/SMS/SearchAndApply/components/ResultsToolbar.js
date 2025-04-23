import React from "react";
import { FaExchangeAlt, FaHeart, FaSlidersH } from "react-icons/fa";
import courseIcon from "../../../../assets/icon/course.svg";
import "../SearchAndApply.css";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import { Student } from "../../../../components/core/User";

const ResultsToolbar = ({
  loading,
  isFavorite,
  setIsFavorite,
  favoriteList,
  mobileCard,
  setMobileCard,
  setFilterOpen,
  data,
}) => {
  return (
    <>
      <div className="d-none d-md-block">
        <div className="d-flex justify-content-between align-items-center flex-wrap pt-2 px-2 pb-0">
          {/* Left Section */}
          <div className="d-flex justify-content-between gap-2 align-items-center flex-wrap  mb-2">
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
          <div className="d-flex align-items-center flex-wrap mb-2">
            {Student() && (
              <button
                className={`action-btn mr-2 ${isFavorite && "tag-active"}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart className="mx-2" /> Favourites{" "}
                <span className="count">
                  {favoriteList?.length}
                  {/* {loading === false
                    ? data?.items?.[0]?.favoriteSubjectCount
                    : null} */}
                </span>
              </button>
            )}
            <button className="action-btn mr-2">
              <FaExchangeAlt className="mx-2" /> Compare{" "}
              <span className="count">0</span>
            </button>
            <button
              className="action-btn mr-2 d-none d-md-block"
              onClick={() => setMobileCard(!mobileCard)}
            >
              {mobileCard ? (
                <TfiViewGrid className="my-1" />
              ) : (
                <TfiViewList className="my-1" />
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
      </div>
      <div className="d-block d-md-none">
        <hr className="mt-0" />
        <div className="d-flex justify-content-between gap-2 align-items-center flex-wrap  mb-2 pl-25px pr-25px">
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
        <hr />
        <div className="d-flex justify-content-between pl-25px pr-25px">
          {Student() && (
            <button
              className={`action-btn mr-2 ${isFavorite && "tag-active"}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FaHeart className="mx-2" /> Favourites{" "}
              <span className="count">
                {!loading && data?.items?.[0]?.favoriteSubjectCount}
              </span>
            </button>
          )}

          <button className="action-btn mr-2">
            <FaExchangeAlt className="mx-2" /> Compare{" "}
            <span className="count">0</span>
          </button>
        </div>
        <hr className="mb-0" />
      </div>
    </>
  );
};

export default ResultsToolbar;
