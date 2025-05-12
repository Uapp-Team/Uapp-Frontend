import React from "react";
import { FaExchangeAlt, FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import courseIcon from "../../../../assets/icon/course.svg";
import { Student } from "../../../../components/core/User";
import "../SearchAndApply.css";

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
              {data?.favCount ? data?.favCount : data?.total} Courses
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
                <LuHeart
                  className="mx-2"
                  color={isFavorite ? "orange" : "black"}
                  fill={isFavorite ? "orange" : "black"}
                />{" "}
                Favourites{" "}
                <span className="count">{favorites ? favorites : "0"}</span>
              </button>
            )}
            {/* <button className="action-btn mr-2">
              <span className="mr-2">
                <ArrowLeftRightIcon />
              </span>{" "}
              Compare <span className="count">0</span>
            </button> */}
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
            <div
              className="action-btn filters-btn-lg d-none d-md-block"
              onClick={() => setFilterOpen()}
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                >
                  <path
                    d="M12.7943 13.875C11.9193 13.875 11.1797 13.5729 10.5755 12.9688C9.97135 12.3646 9.66927 11.625 9.66927 10.75C9.66927 9.875 9.97135 9.13542 10.5755 8.53125C11.1797 7.92708 11.9193 7.625 12.7943 7.625C13.6693 7.625 14.4089 7.92708 15.013 8.53125C15.6172 9.13542 15.9193 9.875 15.9193 10.75C15.9193 11.625 15.6172 12.3646 15.013 12.9688C14.4089 13.5729 13.6693 13.875 12.7943 13.875ZM12.7943 12.2083C13.197 12.2083 13.5408 12.066 13.8255 11.7812C14.1102 11.4965 14.2526 11.1528 14.2526 10.75C14.2526 10.3472 14.1102 10.0035 13.8255 9.71875C13.5408 9.43403 13.197 9.29167 12.7943 9.29167C12.3915 9.29167 12.0477 9.43403 11.763 9.71875C11.4783 10.0035 11.3359 10.3472 11.3359 10.75C11.3359 11.1528 11.4783 11.4965 11.763 11.7812C12.0477 12.066 12.3915 12.2083 12.7943 12.2083ZM1.33594 11.5833V9.91667H8.0026V11.5833H1.33594ZM3.21094 6.375C2.33594 6.375 1.59635 6.07292 0.992187 5.46875C0.388021 4.86458 0.0859375 4.125 0.0859375 3.25C0.0859375 2.375 0.388021 1.63542 0.992187 1.03125C1.59635 0.427083 2.33594 0.125 3.21094 0.125C4.08594 0.125 4.82552 0.427083 5.42969 1.03125C6.03385 1.63542 6.33594 2.375 6.33594 3.25C6.33594 4.125 6.03385 4.86458 5.42969 5.46875C4.82552 6.07292 4.08594 6.375 3.21094 6.375ZM3.21094 4.70833C3.61372 4.70833 3.95747 4.56597 4.24219 4.28125C4.52691 3.99653 4.66927 3.65278 4.66927 3.25C4.66927 2.84722 4.52691 2.50347 4.24219 2.21875C3.95747 1.93403 3.61372 1.79167 3.21094 1.79167C2.80816 1.79167 2.46441 1.93403 2.17969 2.21875C1.89497 2.50347 1.7526 2.84722 1.7526 3.25C1.7526 3.65278 1.89497 3.99653 2.17969 4.28125C2.46441 4.56597 2.80816 4.70833 3.21094 4.70833ZM8.0026 4.08333V2.41667H14.6693V4.08333H8.0026Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className="mt-1"> All filters</span>
            </div>
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
