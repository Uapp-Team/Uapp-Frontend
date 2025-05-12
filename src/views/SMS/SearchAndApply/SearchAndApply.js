import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Col, Row } from "reactstrap";
import { Student } from "../../../components/core/User";
import DropdownCircle from "../../../components/Dropdown/DropdownCircle";
import Loader from "../../../components/Loader";
import { optionLabelToName } from "../../../constants/hooks";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useContextData } from "../../../layouts/context/AppContext";
import ApplyCardHor from "./components/ApplyCardHor";
import ApplyCardVar from "./components/ApplyCardVar";
import ResultsToolbar from "./components/ResultsToolbar";
import SearchBox from "./components/SearchBox";
import SearchKeywords from "./components/SearchKeywords";
import SearchPaginations from "./components/SearchPaginations";
import "./SearchAndApply.css";
import SearchFilter from "./SearchFilter";

function SearchAndApply() {
  const value = useContextData();
  const { departmentId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileCard, setMobileCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [data, setData] = useState({});
  const [favorites, setFavorites] = useState(0);

  const screenWidth = window.innerWidth;
  console.log(screenWidth);

  // list
  const [applicationTypelist, setApplicationTypelist] = useState([]);
  const [applicationType, setApplicationType] = useState([]);
  const [applicationTypeSelected, setApplicationTypeSelected] = useState([]);
  const [intakeList, setIntakeList] = useState([]);
  const [studyLevelList, setStudyLevelList] = useState([]);
  const [courseDurationsList, setCourseDurationsList] = useState([]);

  // Filter Data State
  const [filterOpen, setFilterOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [search, setSearch] = useState("");
  const [studentId, setStudentId] = useState(0);
  const [institutionId, setInstitutionId] = useState(0);
  const [studyLevelId, setStudyLevelId] = useState([]);
  const [intakeId, setIntakeId] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [depId, setDepId] = useState(0);
  const [subDepartmentId, setSubDepartmentId] = useState(0);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [applicationTypeIds, setApplicationTypeIds] = useState([]);
  const [loans, setLoans] = useState([]);
  const [courseDurations, setCourseDurations] = useState([]);
  const [isScholarships, setIsScholarships] = useState(false);
  const [isAvailableCourses, setIsAvailableCourses] = useState(false);
  const [isWorkPlacement, setIsWorkPlacement] = useState(false);
  const [studyModes, setStudyModes] = useState([]);
  const [deliveryPattern, setDeliveryPattern] = useState([]);
  const [deliverySchedule, setDeliverySchedule] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // level
  const [studentName, setStudentName] = useState("Select Student");
  const [studyLevelQuery, setStudyLevelQuery] = useState("");
  const [institutionName, setInstitutionName] = useState("Select Institution");
  const [countryName, setCountryName] = useState("Select your destination");
  const [cityName, setCityName] = useState("Select City");
  const [departmentName, setDepartmentName] = useState("Select Department");
  const [subDepartmentName, setSubDepartmentName] = useState(
    "Select Sub Department"
  );
  const referenceId = localStorage.getItem("referenceId");
  const [subjectId, setSubjectId] = useState(0);

  const [depList, setDepList] = useState([]);

  useEffect(() => {
    get(`SearchFilter/StudentTypes/${studentId}`).then((res) => {
      setApplicationTypelist(res);
      applicationTypeIds.length > 0 && setApplicationTypeIds([]);
      loans.length > 0 && setLoans([]);
    });
  }, [studentId]);

  useEffect(() => {
    get("SearchFilter/Departments").then((res) => {
      setDepList([{ id: 0, name: "All Departments" }, ...res]);
    });
  }, []);

  useEffect(() => {
    if (departmentId > 0 && depList && depList?.length > 0) {
      const filterData = depList?.filter((item) => {
        return item.id.toString() === departmentId;
      });
      setDepId(filterData[0]?.id);
      setDepartmentName(filterData[0]?.name);
    }
  }, [data, depList, departmentId]);

  useEffect(() => {
    const listData =
      applicationType.length > 0
        ? optionLabelToName(applicationType)
        : applicationTypelist;
    setApplicationTypeSelected(listData);
  }, [applicationType, applicationTypelist]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isTyping) {
      const subdata = {
        page: currentPage,
        pageSize: dataPerPage,
        studentId: studentId,
        universityId: institutionId,
        campusId: 0,
        countryId: countryId,
        cityId: cityId,
        departmentId: depId,
        subdepartmentId: subDepartmentId,
        educationLevelIds: studyLevelId,
        intakeIds: intakeId,
        tuitionFeeRange: tuitionFee,
        isAcceptHome: applicationTypeIds?.includes(1) ? true : false,
        isAcceptEU_UK: applicationTypeIds?.includes(2) ? true : false,
        isAcceptInternational: applicationTypeIds?.includes(3) ? true : false,
        isGovernmentLoan: loans?.includes(1) ? true : false,
        isPrivateLoan: loans?.includes(2) ? true : false,
        courseDurations: courseDurations,
        isScholarshipAvailable: isScholarships,
        isShowAvailableCoursesOnly: isAvailableCourses,
        isWorkPlacementAvailable: isWorkPlacement,
        studyModes: studyModes,
        deliveryMethods: deliveryPattern,
        deliverySchedules: deliverySchedule,
        searchText: search,
        isFavorite: isFavorite,
      };
      setLoading(true);
      post(`ApplyFilter/FetchPagedData`, subdata).then((res) => {
        setData(res?.data);
        setFavorites(res.data?.items[0]?.favoriteSubjectCount);
        setLoading(false);
      });
    }
  }, [
    applicationTypeIds,
    cityId,
    countryId,
    courseDurations,
    currentPage,
    dataPerPage,
    deliveryPattern,
    deliverySchedule,
    institutionId,
    intakeId,
    isAvailableCourses,
    isFavorite,
    isScholarships,
    isTyping,
    isWorkPlacement,
    loans,
    search,
    studentId,
    studyLevelId,
    studyModes,
    tuitionFee,
    depId,
    subDepartmentId,
  ]);

  const handleFavourite = (value, subjectId, i) => {
    post(
      `FavoriteSubject/AddOrRemove?subjectId=${encodeURIComponent(subjectId)}`
    )
      .then((res) => {
        if (res.status === 200) {
          let modifyData = data;

          if (isFavorite) {
            modifyData.items.splice(i, 1);
            modifyData.total -= 1;
          } else {
            modifyData.items[i].isFavorite = !modifyData.items[i].isFavorite;
          }
          setData(modifyData);
          !value ? setFavorites(favorites + 1) : setFavorites(favorites - 1);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        addToast(err, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handleSubmit = async (
    selectedCampusValue,
    selectedStudyModeId,
    selectedDeliveryPatternId,
    selectedDeliveryScheduleId,
    selectedDurationId,
    selectedIntakeId
  ) => {
    const data = {
      studentId: Student() ? Number(referenceId) : Number(studentId),
      campusId: Number(selectedCampusValue),
      UniversitySubjectId: Number(subjectId),
      intakeId: Number(selectedIntakeId),
      deliveryScheduleId: Number(selectedDeliveryScheduleId),
      StudyMode: Number(selectedStudyModeId),
      DeliveryMethod: Number(selectedDeliveryPatternId),
      durationId: Number(selectedDurationId),
    };

    try {
      const res = await post(`Apply/SubmitApplication`, data);

      if (res?.status === 200) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        history.push(
          `/applicationDetails/${res?.data?.data?.applicationId}/${
            Student() ? referenceId : studentId
          }`
        );
      } else {
        addToast(
          res?.data?.errors[0] || res?.data?.message || "An error occurred",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      }
    } catch (error) {
      addToast("An unexpected error occurred. Please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  return (
    <>
      <div className="search-header">
        <Row className="mt-3 mt-md-0">
          {!Student() && (
            <Col md={3} className="h-40px mb-3">
              <DropdownCircle
                method={get}
                label={studentName}
                setLabel={setStudentName}
                value={studentId}
                setValue={setStudentId}
                selectAll={true}
                all="All Student"
                url="SearchFilter/Students"
              />
            </Col>
          )}
          <Col md={8} className="d-flex h-40px mb-3">
            <SearchBox
              name="search"
              placeholder="Search for courses"
              value={search}
              setValue={setSearch}
              setIsTyping={setIsTyping}
              institutionId={institutionId}
              setInstitutionId={setInstitutionId}
              countryId={countryId}
              setCountryId={setCountryId}
              institutionName={institutionName}
              setInstitutionName={setInstitutionName}
              countryName={countryName}
              setCountryName={setCountryName}
            />

            <button
              className="ml-2 filters-btn d-block d-md-none"
              onClick={() => {
                setFilterOpen(true);
                setIsSearch(true);
                value.setSidebar(true);
              }}
            >
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
            </button>
          </Col>
        </Row>
        {search && (
          <p className="filters-heading">
            <span className="fs-14px">Search results for</span> <br />
            <strong className="fs-20px">{search}</strong>
          </p>
        )}
        <div className="filter-container d-none d-md-block">
          <Row className="mb-3">
            <Col md={9}>
              <SearchKeywords
                state={studyLevelId}
                setState={setStudyLevelId}
                url="SearchFilter/EducationLevels"
              />
            </Col>
            <Col md={3}>
              <SearchKeywords
                state={intakeId}
                setState={setIntakeId}
                url="SearchFilter/Intakes"
                slice={true}
              />
            </Col>
          </Row>
        </div>
        <div ref={sentinelRef} style={{ height: 1 }} />

        <div
          ref={toolbarRef}
          className={`results-toolbar ${isSticky ? "sticky" : ""} ${
            isSticky && screenWidth > 1200
              ? value.sidebar
                ? "w-calc-100-70px"
                : "w-calc-100-180px"
              : "w-100"
          }`}
        >
          <ResultsToolbar
            data={data}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            favorites={favorites}
            mobileCard={mobileCard}
            setMobileCard={setMobileCard}
            setFilterOpen={() => {
              setFilterOpen(true);
              setIsSearch(true);
              value.setSidebar(true);
            }}
          />
        </div>
      </div>

      {loading === true ? (
        <Loader />
      ) : data?.items?.length > 0 ? (
        <>
          <div className="d-block d-md-none">
            <ApplyCardVar
              data={data?.items}
              studentName={studentName}
              applicationTypeSelected={applicationTypeSelected}
              handleSubmit={handleSubmit}
              handleFavourite={handleFavourite}
              setSubjectId={setSubjectId}
            />
          </div>

          <div className="d-none d-md-block">
            {mobileCard ? (
              <ApplyCardVar
                data={data?.items}
                studentName={studentName}
                applicationTypeSelected={applicationTypeSelected}
                handleSubmit={handleSubmit}
                handleFavourite={handleFavourite}
                setSubjectId={setSubjectId}
              />
            ) : (
              <ApplyCardHor
                data={data?.items}
                studentName={studentName}
                applicationTypeSelected={applicationTypeSelected}
                handleSubmit={handleSubmit}
                handleFavourite={handleFavourite}
                setSubjectId={setSubjectId}
              />
            )}
          </div>
        </>
      ) : (
        <h3 className="text-center my-5 py-5">No data Found</h3>
      )}

      {loading ? null : (
        <SearchPaginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataPerPage={dataPerPage}
          setDataPerPage={setDataPerPage}
          totalData={data?.total}
        />
      )}

      {filterOpen && (
        <SearchFilter
          closeModal={() => {
            setFilterOpen(false);
            value.setSidebar(false);
          }}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          institutionId={institutionId}
          setInstitutionId={setInstitutionId}
          studyLevelId={studyLevelId}
          setStudyLevelId={setStudyLevelId}
          intakeId={intakeId}
          setIntakeId={setIntakeId}
          countryId={countryId}
          setCountryId={setCountryId}
          cityId={cityId}
          setCityId={setCityId}
          tuitionFee={tuitionFee}
          setTuitionFee={setTuitionFee}
          applicationTypeIds={applicationTypeIds}
          setApplicationTypeIds={setApplicationTypeIds}
          loans={loans}
          setLoans={setLoans}
          courseDurations={courseDurations}
          setCourseDurations={setCourseDurations}
          isScholarships={isScholarships}
          setIsScholarships={setIsScholarships}
          isAvailableCourses={isAvailableCourses}
          setIsAvailableCourses={setIsAvailableCourses}
          isWorkPlacement={isWorkPlacement}
          setIsWorkPlacement={setIsWorkPlacement}
          studyModes={studyModes}
          setStudyModes={setStudyModes}
          deliveryPattern={deliveryPattern}
          setDeliveryPattern={setDeliveryPattern}
          deliverySchedule={deliverySchedule}
          setDeliverySchedule={setDeliverySchedule}
          studyLevelQuery={studyLevelQuery}
          setStudyLevelQuery={setStudyLevelQuery}
          institutionName={institutionName}
          setInstitutionName={setInstitutionName}
          countryName={countryName}
          setCountryName={setCountryName}
          cityName={cityName}
          setCityName={setCityName}
          applicationTypelist={applicationTypelist}
          applicationType={applicationType}
          setApplicationType={setApplicationType}
          applicationTypeSelected={applicationTypeSelected}
          intakeList={intakeList}
          setIntakeList={setIntakeList}
          studyLevelList={studyLevelList}
          setStudyLevelList={setStudyLevelList}
          courseDurationsList={courseDurationsList}
          setCourseDurationsList={setCourseDurationsList}
          departmentList={depList}
          departmentName={departmentName}
          setDepartmentName={setDepartmentName}
          departmentId={depId}
          setDepartmentId={setDepId}
          subDepartmentName={subDepartmentName}
          setSubDepartmentName={setSubDepartmentName}
          subDepartmentId={subDepartmentId}
          setSubDepartmentId={setSubDepartmentId}
        />
      )}
    </>
  );
}

export default SearchAndApply;
