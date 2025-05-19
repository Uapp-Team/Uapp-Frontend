import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { Student } from "../../../../components/core/User";
import post from "../../../../helpers/post";
import "../SearchAndApply.css";
import CareerInfoTable from "./CareerInfoTable";
import CoursesOverviewTable from "./CoursesOverviewTable";
import FeesInfoTable from "./FeesInfoTable";
import { DeleteIcon, HeartIconFill, HeartIconStock } from "./icons";
import RequirementInfoTable from "./RequirementInfoTable";
import UniversityInfoTable from "./UniversityInfoTable";

const CourseComparisonTable = ({
  courses: initialCourses,
  onCoursesUpdate,
}) => {
  const [courses, setCourses] = useState(initialCourses);
  const [showOverview, setShowOverview] = useState(true);
  const [showUniInfo, setShowUniInfo] = useState(true);
  const [showFeesInfo, setShowFeesInfo] = useState(true);
  const [showCareerInfo, setShowCareerInfo] = useState(true);
  const [showRequirementInfo, setShowRequirementInfo] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [leftArrowPosition, setLeftArrowPosition] = useState(250);
  const { addToast } = useToasts();
  const fixedColumnRef = useRef(null);
  const tableContainerRef = useRef(null);

  const handleToogleOverview = () => {
    setShowOverview((prev) => !prev);
  };
  const handleToogleUniInfo = () => {
    setShowUniInfo((prev) => !prev);
  };
  const handleToogleFeesInfo = () => {
    setShowFeesInfo((prev) => !prev);
  };
  const handleToogleCareerInfo = () => {
    setShowCareerInfo((prev) => !prev);
  };
  const handleToogleRequirementInfo = () => {
    setShowRequirementInfo((prev) => !prev);
  };
  const scrollTableRight = () => {
    if (tableContainerRef.current) {
      const scrollAmount = 200;
      tableContainerRef.current.scrollLeft += scrollAmount;

      // Force immediate check of scroll position after scrolling
      setTimeout(() => {
        checkScrollPosition();
      }, 10);
    }
  };

  const scrollTableLeft = () => {
    if (tableContainerRef.current) {
      const scrollAmount = 200;
      tableContainerRef.current.scrollLeft -= scrollAmount;

      // Force immediate check of scroll position after scrolling
      setTimeout(() => {
        checkScrollPosition();
      }, 10);
    }
  };

  const checkScrollPosition = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        tableContainerRef.current;

      // Check if can scroll left (scrolled right at least a bit)
      setCanScrollLeft(scrollLeft > 0);

      // Check if can scroll right (not at the end)
      const canScrollRight = scrollLeft + clientWidth < scrollWidth;
      setIsOverflowing(canScrollRight);

      console.log("Scroll position:", {
        scrollLeft,
        canScrollLeft: scrollLeft > 0,
        canScrollRight,
      });
    }
  };

  // Calculate the position of the left arrow based on the fixed column width
  const calculateLeftArrowPosition = () => {
    if (fixedColumnRef.current) {
      const fixedColumnWidth = fixedColumnRef.current.offsetWidth;
      // Add a small offset (e.g., 20px) to position it slightly to the right of the fixed column
      setLeftArrowPosition(fixedColumnWidth + 20);
    }
  };

  useEffect(() => {
    // Initial calculations
    calculateLeftArrowPosition();
    checkScrollPosition();

    // Recalculate on window resize
    window.addEventListener("resize", () => {
      calculateLeftArrowPosition();
      checkScrollPosition();
    });

    // Add scroll event listener
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", checkScrollPosition);
    }

    return () => {
      window.removeEventListener("resize", calculateLeftArrowPosition);
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleFavourite = (value, subjectId, i) => {
    post(
      `FavoriteSubject/AddOrRemove?subjectId=${encodeURIComponent(subjectId)}`
    )
      .then((res) => {
        if (res.status === 200) {
          const updatedCourses = courses.map((course) => {
            if (course.subjectId === subjectId) {
              return { ...course, isFavorite: !course.isFavorite };
            }
            return course;
          });

          setCourses(updatedCourses);

          localStorage.setItem("courses", JSON.stringify(updatedCourses));

          addToast("Favorite status updated successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        addToast(err.message || "An error occurred", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handleDelete = (subjectId) => {
    const storedCourses =
      JSON.parse(localStorage.getItem("comparedItems")) || [];

    const updatedCourses = storedCourses.filter(
      (course) => course.subjectId !== subjectId
    );

    localStorage.setItem("comparedItems", JSON.stringify(updatedCourses));

    setCourses(updatedCourses);

    if (onCoursesUpdate) {
      onCoursesUpdate(updatedCourses);
    }

    addToast("Course removed from Compare successfully!", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <div className="table-responsive-wrapper">
      <div
        className="table-container fixed-header-table"
        ref={tableContainerRef}
      >
        <table bordered className="comparison-table">
          <thead className="fixed-header">
            <tr>
              <th className="fixed-col top-left" ref={fixedColumnRef}>
                Course selected: {courses.length}
              </th>
              {courses.map((course, index) => (
                <th key={index} className="course-header-cell">
                  <td className="course-header">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="tags">
                        {/* <span className="card-tag fast-track">Fast Track</span> */}
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="mr-1 icon">
                          {Student() ? (
                            course.isFavorite ? (
                              <span
                                onClick={() =>
                                  handleFavourite(
                                    course.isFavorite,
                                    course.subjectId,
                                    index
                                  )
                                }
                                className="cursor-pointer"
                              >
                                <HeartIconFill />
                              </span>
                            ) : (
                              <span
                                onClick={() =>
                                  handleFavourite(
                                    course.isFavorite,
                                    course.subjectId,
                                    index
                                  )
                                }
                                className="cursor-pointer"
                              >
                                <HeartIconStock />
                              </span>
                            )
                          ) : (
                            <div>
                              {course.intakeStatusId === 3 ? (
                                <img src={offline} alt="" />
                              ) : (
                                <img src={online} alt="" />
                              )}
                            </div>
                          )}
                        </span>
                        <span
                          className="icon"
                          onClick={() => handleDelete(course.subjectId)}
                        >
                          <DeleteIcon />
                        </span>
                      </div>
                    </div>

                    <div table-className="course-title">
                      {course.subjectName}
                    </div>
                  </td>
                </th>
              ))}
            </tr>
          </thead>
          <CoursesOverviewTable
            courses={courses}
            handleToggleOverview={handleToogleOverview}
            isVisible={showOverview}
          />
          <UniversityInfoTable
            courses={courses}
            handleToogleUniInfo={handleToogleUniInfo}
            isVisible={showUniInfo}
          />
          <FeesInfoTable
            courses={courses}
            handleToogleFeesInfo={handleToogleFeesInfo}
            isVisible={showFeesInfo}
          />
          <CareerInfoTable
            courses={courses}
            handleToogleCareerInfo={handleToogleCareerInfo}
            isVisible={showCareerInfo}
          />
          <RequirementInfoTable
            courses={courses}
            handleToogleRequirementInfo={handleToogleRequirementInfo}
            isVisible={showRequirementInfo}
          />
          {canScrollLeft && (
            <div
              className="scroll-arrow scroll-left hover-only"
              onClick={scrollTableLeft}
              style={{ left: `${leftArrowPosition}px` }}
            >
              <AiOutlineLeft size={10} className="arrow-icon" />
            </div>
          )}
          {isOverflowing && (
            <div
              className="scroll-arrow scroll-right hover-only"
              onClick={scrollTableRight}
            >
              <AiOutlineRight size={10} className="arrow-icon" />
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default CourseComparisonTable;
