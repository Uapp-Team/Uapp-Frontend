import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import "./SearchAndApply.css";
import ApplyCardHor from "./components/ApplyCardHor";
import ResultsToolbar from "./components/ResultsToolbar";
import SearchBox from "./components/SearchBox";
import SearchFilters from "./components/SearchFilters";
import ApplyCardVar from "./components/ApplyCardVar";
import SearchFilter from "./SearchFilter";

function SearchAndApply() {
  const sentinelRef = useRef(null);
  const toolbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileCard, setMobileCard] = useState(true);

  // Filter Data State
  const [filterOpen, setFilterOpen] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [search, setSearch] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [universityId, setUniversityId] = useState(0);
  const [intakeId, setIntakeId] = useState(0);
  const [filterData5, setFilterData5] = useState(0);
  const [filterData6, setFilterData6] = useState(0);
  const [filterData7, setFilterData7] = useState(0);
  const [filterData8, setFilterData8] = useState(0);
  const [filterData9, setFilterData9] = useState(0);
  const [filterData10, setFilterData10] = useState(0);

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

      {filterOpen && <SearchFilter closeModal={() => setFilterOpen(false)} />}
    </>
  );
}

export default SearchAndApply;
