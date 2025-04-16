import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import ApplyCardHor from "./components/ApplyCardHor";
import ApplyCardVar from "./components/ApplyCardVar";
import ResultsToolbar from "./components/ResultsToolbar";
import SearchBox from "./components/SearchBox";
import SearchFilters from "./components/SearchFilters";
import "./SearchAndApply.css";
import SearchFilter from "./SearchFilter";

function SearchAndApply() {
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileCard, setMobileCard] = useState(true);

  // Filter Data State
  const [filterOpen, setFilterOpen] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [search, setSearch] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [institutionId, setInstitutionId] = useState(0);
  const [studyLevelId, setStudyLevelId] = useState(0);
  const [intakeId, setIntakeId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const [tuitionFee, setTuitionFee] = useState(100000);
  const [applicationTypeIds, setApplicationTypeIds] = useState([]);
  const [courseDurations, setCourseDurations] = useState([]);
  const [isScholarships, setIsScholarships] = useState(false);
  const [isAvailableCourses, setIsAvailableCourses] = useState(false);
  const [isWorkPlacement, setIsWorkPlacement] = useState(false);

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

  const categories = [
    [
      "Undergraduate",
      "Pre-Masters programme",
      "Postgraduate",
      "Short Course",
      "Pre-sessional English",
    ],
    [
      "Research degrees",
      "Pathway Programme",
      "Professional Course",
      "Diploma",
      "Secondary School",
    ],
    ["Higher Secondary School", "HND", "HNC", "Level 3", "Level 4", "Level 5"],
  ];

  const dates = [
    { label: "April 2025" },
    { label: "May 2025" },
    {
      label: "June 2025",
      options: ["June 2025", "July 2025", "August 2025"],
    },
  ];

  const cardData = {
    date: "10 Feb, 25",
    title:
      "Business and Management (Finance) (with Foundation Year option) (Hons)",
    university: "Bournemouth University, UK",
    location: "Greater London, UK",
    tuition: "£28,640",
    deposit: "£5,640",
    fee: "£00",
    type: "Full Time",
    duration: "4 Years",
    intake: "September 2025",
    palcement: "On Campus",
    probability: 40,
    tags: ["Fast Track", "Work Placement", "Scholarship Available"],
  };

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
        eU_TutionFee: 0,
        eU_TutionFeeCurrencyId: 2,
        firstYearTutionFee: 0,
        firstYearTutionFeeCurrencyId: 0,
        internationalTutionFee: 0,
        internationalTutionCurrencyId: 2,
        localTutionFee: 9250,
        localTutionFeeCurrencyId: 2,
        depositFee: 0,
        depositFeeCurrencyId: 0,
        avarageApplicationFee: 0,
        avarageApplicationFeeCurrencyId: 2,
        studyModes: null,
        deliveryPatternIds: "3",
        deliveryPatternNames: "Standard",
        durationIds: null,
        durationNames: null,
        campusIds: "1",
        applicationDeadLines: "2025-05-25 00:00:00.0000000",
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
        summary: "Can apply",
        canApply: true,
        consultantCommissionAmount: 0,
        promotionalCommissionAmount: 0,
        commissionAmount: 0,
        isScholarshipAvailable: false,
        isWorkPlacementAvailable: false,
        totalRows: 652,
      },
    ],
  };

  console.log(applicationTypeIds);
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
      <Row className="mb-3">
        <Col>
          <SearchFilters
            keyword="Search keyword"
            categories={categories}
            // selectedCategory={selectedCategory}
            // setSelectedCategory={setSelectedCategory}
            dates={dates}
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
          />
        </Col>
        <Col>
          <SearchFilters
            keyword="Search keyword"
            categories={categories}
            // selectedCategory={selectedCategory}
            // setSelectedCategory={setSelectedCategory}
            dates={dates}
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
          />
        </Col>
      </Row>
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
        <ApplyCardVar data={cardData} />
      </div>

      <div className="d-none d-md-block">
        {mobileCard ? (
          <ApplyCardVar data={cardData} />
        ) : (
          <ApplyCardHor data={cardData} />
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
        />
      )}
    </>
  );
}

export default SearchAndApply;
