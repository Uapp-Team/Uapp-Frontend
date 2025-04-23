import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import post from "../../../helpers/post";
import ApplyCardHor from "./components/ApplyCardHor";
import ApplyCardVar from "./components/ApplyCardVar";
import ResultsToolbar from "./components/ResultsToolbar";
import SearchBox from "./components/SearchBox";
import SearchKeywords from "./components/SearchKeywords";
import "./SearchAndApply.css";
import SearchFilter from "./SearchFilter";
import DropdownCircle from "../../../components/Dropdown/DropdownCircle";
import get from "../../../helpers/get";
import { FaSlidersH } from "react-icons/fa";
import { Student } from "../../../components/core/User";
import SearchPaginations from "./components/SearchPaginations";
import Loader from "../../../components/Loader";
import { useToasts } from "react-toast-notifications";

function SearchAndApply() {
  const { addToast } = useToasts();
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileCard, setMobileCard] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 15;
  const [data, setData] = useState({});
  const [favorites, setFavorites] = useState(0);

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
  const [tuitionFee, setTuitionFee] = useState(0);
  const [applicationTypeIds, setApplicationTypeIds] = useState([]);
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
  const [countryName, setCountryName] = useState("Select Country");
  const [cityName, setCityName] = useState("Select City");

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
        departmentId: 0,
        subdepartmentId: 0,
        educationLevelIds: studyLevelId,
        intakeIds: intakeId,
        tuitionFeeRange: tuitionFee,
        isAcceptHome: applicationTypeIds?.includes(1) ? true : false,
        isAcceptEU_UK: applicationTypeIds?.includes(2) ? true : false,
        isAcceptInternational: applicationTypeIds?.includes(3) ? true : false,
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
    deliveryPattern,
    deliverySchedule,
    filterOpen,
    institutionId,
    intakeId,
    isAvailableCourses,
    isFavorite,
    isScholarships,
    isTyping,
    isWorkPlacement,
    search,
    studentId,
    studyLevelId,
    studyModes,
    tuitionFee,
  ]);

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

  const handleFavourite = (value, subjectId, i) => {
    console.log(value);
    post(
      `FavoriteSubject/AddOrRemove?subjectId=${encodeURIComponent(subjectId)}`
    )
      .then((res) => {
        if (res.status === 200) {
          setLoading(true);
          let modifyData = data;
          modifyData.items[i].isFavorite = !modifyData.items[i].isFavorite;
          setData(modifyData);
          !value ? setFavorites(favorites + 1) : setFavorites(favorites - 1);
          setLoading(false);
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
              }}
            >
              <FaSlidersH size={18} className="" />
            </button>
          </Col>
        </Row>
        <div className="filter-container d-none d-md-block">
          {search && (
            <p className="filters-heading">
              <span className="fs-14px">Search results for</span> <br />
              <strong className="fs-20px">{search}</strong>
            </p>
          )}
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
              />
            </Col>
          </Row>
        </div>
        <div ref={sentinelRef} style={{ height: 1 }} />

        <div
          ref={toolbarRef}
          className={`results-toolbar ${isSticky ? "sticky" : ""}`}
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
              handleFavourite={handleFavourite}
            />
          </div>

          <div className="d-none d-md-block">
            {mobileCard ? (
              <ApplyCardVar
                data={data?.items}
                handleFavourite={handleFavourite}
              />
            ) : (
              <ApplyCardHor
                data={data?.items}
                handleFavourite={handleFavourite}
              />
            )}
          </div>
        </>
      ) : (
        <h3 className="text-center my-4">No data Found</h3>
      )}

      <SearchPaginations
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dataPerPage={dataPerPage}
        totalData={data?.total}
      />

      {filterOpen && (
        <SearchFilter
          closeModal={() => setFilterOpen(false)}
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
        />
      )}
    </>
  );
}

export default SearchAndApply;
