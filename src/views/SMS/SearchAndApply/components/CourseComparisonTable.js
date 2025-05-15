import React, { useEffect, useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import offline from "../../../../assets/icon/offline.svg";
import online from "../../../../assets/icon/online.svg";
import { Student } from "../../../../components/core/User";
import { deliveryMethods, studyMode } from "../../../../constants/presetData";
import post from "../../../../helpers/post";
import "../SearchAndApply.css";
import CoursesOverviewTable from "./CoursesOverviewTable";
import FeesInfoTable from "./FeesInfoTable";
import { DeleteIcon, HeartIconFill, HeartIconStock } from "./icons";
import UniversityInfoTable from "./UniversityInfoTable";

const CourseComparisonTable = ({ courses: initialCourses }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [showOverview, setShowOverview] = useState(true);
  const [showUniInfo, setShowUniInfo] = useState(true);
  const [showFeesInfo, setShowFeesInfo] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { addToast } = useToasts();
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
  const scrollTable = () => {
    if (tableContainerRef.current) {
      const scrollAmount = 200;
      tableContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const checkOverflow = () => {
    if (tableContainerRef.current) {
      const { scrollWidth, clientWidth } = tableContainerRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
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

    addToast("Course removed from Compare successfully!", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const courseOverviewConfig = [
    { label: "Application Deadline", key: "maxApplicationDeadLine" },
    { label: "Start Date", key: "classStartDate" },
    {
      label: "Duration",
      key: "durationNames",
      subTitle: "Duration Details",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    {
      label: "Study Mode",
      key: "studyModes",
      subTitle: "Available Study Modes",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((id) => {
              const method = studyMode.find(
                (m) => m.id === parseInt(id.trim(), 10)
              );
              return method?.name;
            })
            .filter(Boolean)
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    {
      label: "Delivery Pattern",
      key: "deliveryMethods",
      subTitle: "Delivery Options",
      render: (value) => (
        <ul>
          {value
            ?.split(",")
            .map((id) => {
              const method = deliveryMethods.find(
                (m) => m.id === parseInt(id.trim(), 10)
              );
              return method?.name;
            })
            .filter(Boolean)
            .map((name, index) => <li key={index}>{name}</li>) || "Not Set"}
        </ul>
      ),
    },
    { label: "Schedule", key: "classStartDate" },
  ];

  return (
    <div className="table-responsive-wrapper">
      <div className="table-container" ref={tableContainerRef}>
        <table bordered className="comparison-table">
          <thead>
            <tr>
              <th className="fixed-col top-left">
                Course selected: {courses.length}
              </th>
              {courses.map((course, index) => (
                <th key={index} className="course-header-cell">
                  <div className="course-header">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="tags">
                        {/* <span className="card-tag fast-track">Fast Track</span> */}
                      </div>
                      <div>
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
                  </div>
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
            handleToogleUniInfo={handleToogleFeesInfo}
            isVisible={showFeesInfo}
          />
        </table>
      </div>
      {isOverflowing && (
        <div className="scroll-arrow" onClick={scrollTable}>
          <AiOutlineRight size={10} className="arrow-icon" />
        </div>
      )}
    </div>
  );
};

export default CourseComparisonTable;
