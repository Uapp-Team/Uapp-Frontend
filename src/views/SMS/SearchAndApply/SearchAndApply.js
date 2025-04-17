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

function SearchAndApply() {
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileCard, setMobileCard] = useState(true);
  const [data, setData] = useState([]);

  // Filter Data State
  const [filterOpen, setFilterOpen] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [search, setSearch] = useState();
  const [isTyping, setIsTyping] = useState(false);
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

  console.log(data, "data from API");
  useEffect(() => {
    if (isTyping && !filterOpen) {
      const subdata = {
        page: 1,
        pageSize: 30,
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
      };
      post(`ApplyFilter/FetchPagedData`, subdata).then((res) => {
        console.log(res, "response filter data");
        setData(res);
      });
    }
  }, [
    applicationTypeIds,
    cityId,
    countryId,
    courseDurations,
    deliveryPattern,
    deliverySchedule,
    filterOpen,
    institutionId,
    intakeId,
    isAvailableCourses,
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

  const result = {
    from: 0,
    index: 0,
    size: 30,
    totalFiltered: 0,
    total: 652,
    pages: 22,
    hasPrevious: false,
    hasNext: true,
    title: "Request Success!",
    message: "Success!",
    type: "https://tools.ietf.org/html/rfc7231#section-6.3.1",
    isSuccess: true,
    statusCode: 200,
    errors: [],
    items: [
      {
        subjectId: 3088,
        subjectName:
          "BSc (Hons) Business and Human Resource Management with Foundation Year",
        subjectDescription: "<p>No Placement Year</p>",
        isFavorite: false,
        intakeStatusId: 1,
        eU_TutionFee: 0.0,
        eU_TutionFeeCurrencyId: 2,
        firstYearTutionFee: 0.0,
        firstYearTutionFeeCurrencyId: 0,
        internationalTutionFee: 0.0,
        internationalTutionCurrencyId: 2,
        localTutionFee: 9250.0,
        localTutionFeeCurrencyId: 2,
        depositFee: 0.0,
        depositFeeCurrencyId: 0,
        avarageApplicationFee: 0.0,
        avarageApplicationFeeCurrencyId: 2,
        studyModes: "1,2",
        deliverySchedules: null,
        deliveryMethods: "1, 3, 2",
        durationIds: null,
        durationNames: "4 Years,2 Years",
        campusIds: "1",
        campusNames: "Bournemouth University,University of Sunderland",
        applicationDeadLines: "10 Feb, 25",
        intakeIds: "72",
        intakeNames: "May 2025",
        subject_IsAcceptHome: true,
        subject_IsAcceptEU_UK: true,
        subject_IsAcceptInternational: false,
        universityId: 1,
        universityName: "Anglia Ruskin University, London (ARUL)",
        university_IsAcceptHome: true,
        university_IsAcceptEU_UK: true,
        university_IsAcceptInternational: true,
        summary: "Please select student",
        canApply: false,
        consultantCommissionAmount: 0,
        promotionalCommissionAmount: 0,
        commissionAmount: 0,
        isScholarshipAvailable: true,
        isWorkPlacementAvailable: true,
        totalRows: 658,
      },
      {
        subjectId: 3088,
        subjectName:
          "BSc (Hons) Business and Human Resource Management with Foundation Year",
        subjectDescription: "<p>No Placement Year</p>",
        isFavorite: false,
        intakeStatusId: 3,
        eU_TutionFee: 0.0,
        eU_TutionFeeCurrencyId: 2,
        firstYearTutionFee: 0.0,
        firstYearTutionFeeCurrencyId: 0,
        internationalTutionFee: 0.0,
        internationalTutionCurrencyId: 2,
        localTutionFee: 9250.0,
        localTutionFeeCurrencyId: 2,
        depositFee: 0.0,
        depositFeeCurrencyId: 0,
        avarageApplicationFee: 0.0,
        avarageApplicationFeeCurrencyId: 2,
        studyModes: "1,2",
        deliverySchedules: null,
        deliveryMethods: "1, 3, 2",
        durationIds: null,
        durationNames: "4 Years,2 Years",
        campusIds: "1",
        campusNames: "Bournemouth University,University of Sunderland",
        applicationDeadLines: "10 Feb, 25",
        intakeIds: "72",
        intakeNames: "May 2025,June 2025",
        subject_IsAcceptHome: true,
        subject_IsAcceptEU_UK: true,
        subject_IsAcceptInternational: false,
        universityId: 1,
        universityName: "Anglia Ruskin University, London (ARUL)",
        university_IsAcceptHome: true,
        university_IsAcceptEU_UK: true,
        university_IsAcceptInternational: true,
        summary: "Please select student",
        canApply: false,
        consultantCommissionAmount: 0,
        promotionalCommissionAmount: 0,
        commissionAmount: 0,
        isScholarshipAvailable: false,
        isWorkPlacementAvailable: true,
        totalRows: 658,
      },
    ],
  };

  console.log(applicationTypeIds);

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

  console.log(data);
  return (
    <>
      <Row className="mb-1">
        <Col md={6} className="d-flex h-40px">
          <SearchBox
            name="search"
            placeholder="Search"
            value={search}
            setValue={setSearch}
            setIsTyping={setIsTyping}
            // university={university}
            // setUniversity={setUniversity}
            // universityOptions={["Harvard", "MIT", "Stanford"]}
          />
        </Col>
      </Row>
      <div className="filter-container">
        <p className="filters-heading">
          <span className="fs-14px">Search results for</span> <br />
          <strong className="fs-20px">Search keyword</strong>
        </p>
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
          mobileCard={mobileCard}
          setMobileCard={setMobileCard}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
      </div>

      <div className="d-block d-md-none">
        <ApplyCardVar data={data.items} />
      </div>

      <div className="d-none d-md-block">
        {mobileCard ? (
          <ApplyCardVar data={data.items} />
        ) : (
          <ApplyCardHor data={data.items} />
        )}
      </div>

      {filterOpen && (
        <SearchFilter
          closeModal={() => setFilterOpen(false)}
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
        />
      )}
    </>
  );
}

export default SearchAndApply;
